import { NextRequest, NextResponse } from 'next/server'
import type { DecodedIdToken } from 'firebase-admin/auth'
import { adminAuth } from '../integrations/firebase/admin'
import { isMockMode, mockWriteBlockedResponse } from '../mock'
import { resolveAdminAccess, type AdminRole } from './roles'

/**
 * Verifies the Firebase ID token only (authentication, NOT authorization).
 * Any signed-in Firebase user passes this check, so API routes must use
 * `requireAdmin` / `requireSuperadmin` instead.
 */
export async function verifyAdminToken(request: NextRequest): Promise<DecodedIdToken | null> {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    // checkRevoked: disabled/deleted accounts and revoked sessions are rejected.
    return await adminAuth.verifyIdToken(token, true)
  } catch {
    return null
  }
}

export interface AdminIdentity {
  uid: string
  /** Verified email exactly as stored in Firebase Auth. */
  email: string
  role: AdminRole
  /** Display name, falling back to the email. */
  name: string
}

export type AdminGuardResult =
  | { ok: true; admin: AdminIdentity }
  | { ok: false; response: NextResponse }

export function createUnauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export function createForbiddenResponse(message = 'Forbidden') {
  return NextResponse.json({ error: message }, { status: 403 })
}

/**
 * Authenticate AND authorize an admin request.
 * Passes only when the ID token is valid and the email is either listed in the
 * server env SUPERADMIN_EMAILS or has an active document in the `admins`
 * collection (same rule as GET /api/auth/me).
 */
export async function requireAdmin(request: NextRequest): Promise<AdminGuardResult> {
  const decoded = await verifyAdminToken(request)
  if (!decoded || !decoded.email) {
    return { ok: false, response: createUnauthorizedResponse() }
  }

  let access
  try {
    access = await resolveAdminAccess(decoded.email)
  } catch (error) {
    console.error('requireAdmin: failed to resolve admin access', error)
    return {
      ok: false,
      response: NextResponse.json({ error: 'Failed to verify access.' }, { status: 500 })
    }
  }

  if (!access.allowed) {
    const message =
      access.reason === 'inactive'
        ? 'Your admin account is inactive.'
        : 'You do not have access to the admin dashboard.'
    return { ok: false, response: createForbiddenResponse(message) }
  }

  return {
    ok: true,
    admin: {
      uid: decoded.uid,
      email: decoded.email,
      role: access.role,
      name: (decoded.name as string | undefined) || decoded.email
    }
  }
}

/** Like `requireAdmin`, but only superadmins pass. */
export async function requireSuperadmin(request: NextRequest): Promise<AdminGuardResult> {
  const result = await requireAdmin(request)
  if (result.ok && result.admin.role !== 'superadmin') {
    return { ok: false, response: createForbiddenResponse() }
  }
  return result
}

/**
 * Guard for state-changing admin routes (POST/PUT/PATCH/DELETE).
 * In mock-data mode every write is rejected with 403.
 */
export async function requireAdminWrite(request: NextRequest): Promise<AdminGuardResult> {
  if (isMockMode()) return { ok: false, response: mockWriteBlockedResponse() }
  return requireAdmin(request)
}

/**
 * For public GET routes that return more to admins: resolves the admin when a
 * valid admin token is sent, otherwise null (never an error).
 */
export async function getOptionalAdmin(request: NextRequest): Promise<AdminIdentity | null> {
  if (!request.headers.get('authorization')) return null
  const result = await requireAdmin(request)
  return result.ok ? result.admin : null
}
