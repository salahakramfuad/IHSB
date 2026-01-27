import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/integrations/firebase/admin'
import { verifyAdminToken } from '@/lib/auth/middleware'

const SUPERADMIN_EMAILS = (process.env.SUPERADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

function isSuperadmin(email?: string | null) {
  if (!email) return false
  return SUPERADMIN_EMAILS.includes(email.toLowerCase())
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded || !isSuperadmin(decoded.email)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { role, active } = body as {
      role?: 'admin' | 'superadmin'
      active?: boolean
    }

    const update: Record<string, unknown> = {
      updatedAt: new Date().toISOString(),
      updatedBy: decoded.uid,
      updatedByEmail: decoded.email || null
    }

    if (role) {
      update.role = role === 'superadmin' ? 'superadmin' : 'admin'
    }
    if (typeof active === 'boolean') {
      update.active = active
    }

    await adminDb.collection('admins').doc(params.id).update(update)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Update admin error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to update admin.' },
      { status: 500 }
    )
  }
}

