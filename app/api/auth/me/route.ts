import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { adminDb } from '@/lib/integrations/firebase/admin'

const SUPERADMIN_EMAILS = (process.env.SUPERADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

function isSuperadmin(email?: string | null) {
  if (!email) return false
  return SUPERADMIN_EMAILS.includes(email.toLowerCase())
}

/**
 * GET /api/auth/me
 * Returns current admin identity if the user is allowed dashboard access:
 * - email is in SUPERADMIN_EMAILS, or
 * - user has an active record in the admins collection.
 * Used by login and ProtectedRoute to ensure only allowed admins can use the dashboard.
 */
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded || !decoded.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = decoded.email.toLowerCase()

    if (isSuperadmin(decoded.email)) {
      return NextResponse.json({
        role: 'superadmin',
        email: decoded.email,
        uid: decoded.uid
      })
    }

    const snapshot = await adminDb
      .collection('admins')
      .where('email', '==', decoded.email)
      .limit(1)
      .get()

    const doc = snapshot.docs[0]
    if (!doc) {
      return NextResponse.json(
        { error: 'You do not have access to the admin dashboard.' },
        { status: 403 }
      )
    }

    const data = doc.data() as { active?: boolean; role?: string }
    if (data.active === false) {
      return NextResponse.json(
        { error: 'Your admin account is inactive.' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      role: data.role === 'superadmin' ? 'superadmin' : 'admin',
      email: decoded.email,
      uid: decoded.uid
    })
  } catch (error: any) {
    console.error('Auth me error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to verify access.' },
      { status: 500 }
    )
  }
}
