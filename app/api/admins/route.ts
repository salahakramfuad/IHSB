import { NextRequest } from 'next/server'
import { adminAuth, adminDb } from '@/lib/integrations/firebase/admin'
import { requireSuperadmin } from '@/lib/auth/middleware'
import { getSuperadminEmails } from '@/lib/auth/roles'
import { isMockMode, mockWriteBlockedResponse } from '@/lib/mock'
import { errorResponse, json, parseJsonBody, serverError } from '@/lib/utils/http'
import { createAdminSchema } from '@/lib/validation/admins'

interface AdminListItem {
  id: string
  email: string
  role: 'admin' | 'superadmin'
  active: boolean
  displayName: string | null
  createdAt: string | null
  createdByEmail: string | null
}

export async function GET(request: NextRequest) {
  try {
    const guard = await requireSuperadmin(request)
    if (!guard.ok) return guard.response

    let fromDb: AdminListItem[] = []
    try {
      const snapshot = await adminDb.collection('admins').orderBy('email').get()
      fromDb = snapshot.docs.map((doc) => {
        const data = doc.data()
        const rawCreated = data.createdAt
        const createdAt =
          rawCreated?.toDate?.()?.toISOString?.() ?? (typeof rawCreated === 'string' ? rawCreated : null)
        return {
          id: doc.id,
          email: String(data.email || '').toLowerCase(),
          role: data.role === 'superadmin' ? 'superadmin' : 'admin',
          active: data.active !== false,
          displayName: data.displayName || null,
          createdAt,
          createdByEmail: data.createdByEmail || null
        }
      })
    } catch (error) {
      console.error('[api] Firestore admins list error:', error)
    }

    const emailsFromDb = new Set(fromDb.map((admin) => admin.email))
    const fromEnv: AdminListItem[] = getSuperadminEmails()
      .filter((email) => !emailsFromDb.has(email))
      .map((email, i) => ({
        id: `env-${i}-${email.replace(/[^a-z0-9]/gi, '-')}`,
        email,
        role: 'superadmin',
        active: true,
        displayName: null,
        createdAt: null,
        createdByEmail: null
      }))

    const admins = [...fromEnv, ...fromDb].sort((a, b) =>
      a.email.localeCompare(b.email, undefined, { sensitivity: 'base' })
    )

    return json({ admins })
  } catch (error) {
    return serverError('GET /api/admins', error, 'Failed to list admins.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireSuperadmin(request)
    if (!guard.ok) {
      return guard.response.status === 403
        ? errorResponse('Only superadmins can create new admins.', 403)
        : guard.response
    }
    if (isMockMode()) return mockWriteBlockedResponse()

    const body = await parseJsonBody(request, createAdminSchema)
    if (!body.ok) return body.response
    const { email, password, role, displayName } = body.data

    let userRecord
    try {
      userRecord = await adminAuth.createUser({
        email,
        password,
        displayName,
        emailVerified: false
      })
    } catch (firebaseError) {
      const code = (firebaseError as { code?: string })?.code || ''
      if (code === 'auth/email-already-exists' || code === 'auth/uid-already-exists') {
        return errorResponse('A user with this email already exists.', 400)
      }
      if (code === 'auth/invalid-email') return errorResponse('Invalid email format.', 400)
      if (code === 'auth/weak-password' || code === 'auth/invalid-password') {
        return errorResponse('Password is too weak. Use at least 8 characters.', 400)
      }
      return serverError('POST /api/admins createUser', firebaseError, 'Failed to create user account.')
    }

    const docRef = adminDb.collection('admins').doc(userRecord.uid)
    await docRef.set({
      email,
      role,
      active: true,
      displayName: displayName ?? null,
      createdAt: new Date().toISOString(),
      createdBy: guard.admin.uid,
      createdByEmail: guard.admin.email
    })

    return json({ id: docRef.id, email, role }, { status: 201 })
  } catch (error) {
    return serverError('POST /api/admins', error, 'Failed to create admin.')
  }
}
