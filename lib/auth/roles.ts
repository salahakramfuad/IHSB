/**
 * Admin role resolution (server-only).
 * Single source of truth for "who may use the admin dashboard / admin APIs".
 */
import { adminDb } from '@/lib/integrations/firebase/admin'

export type AdminRole = 'admin' | 'superadmin'

export type AdminAccess =
  | { allowed: true; role: AdminRole }
  | { allowed: false; reason: 'not-admin' | 'inactive' }

/** Lower-cased superadmin emails from the server-only SUPERADMIN_EMAILS env var. */
export function getSuperadminEmails(): string[] {
  return (process.env.SUPERADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isSuperadminEmail(email?: string | null): boolean {
  if (!email) return false
  return getSuperadminEmails().includes(email.toLowerCase())
}

/**
 * Resolve dashboard access for a verified email:
 * - listed in SUPERADMIN_EMAILS -> superadmin
 * - active document in the `admins` collection -> that document's role
 * - otherwise denied
 */
export async function resolveAdminAccess(email: string): Promise<AdminAccess> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return { allowed: false, reason: 'not-admin' }

  if (isSuperadminEmail(normalized)) {
    return { allowed: true, role: 'superadmin' }
  }

  const snapshot = await adminDb.collection('admins').where('email', '==', normalized).limit(1).get()
  const doc = snapshot.docs[0]
  if (!doc) return { allowed: false, reason: 'not-admin' }

  const data = doc.data() as { active?: boolean; role?: string }
  if (data.active === false) return { allowed: false, reason: 'inactive' }

  return { allowed: true, role: data.role === 'superadmin' ? 'superadmin' : 'admin' }
}
