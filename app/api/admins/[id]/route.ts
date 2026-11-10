import { NextRequest } from 'next/server'
import { adminAuth, adminDb } from '@/lib/integrations/firebase/admin'
import { requireSuperadmin } from '@/lib/auth/middleware'
import { isMockMode, mockWriteBlockedResponse } from '@/lib/mock'
import { errorResponse, isValidDocId, json, notFound, parseJsonBody, serverError } from '@/lib/utils/http'
import { updateAdminSchema } from '@/lib/validation/admins'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const guard = await requireSuperadmin(request)
    if (!guard.ok) return guard.response
    if (isMockMode()) return mockWriteBlockedResponse()

    const { id } = await params
    if (id.startsWith('env-')) {
      return errorResponse('Cannot modify superadmins defined in environment.', 400)
    }
    if (!isValidDocId(id)) return notFound('Admin not found')

    const body = await parseJsonBody(request, updateAdminSchema)
    if (!body.ok) return body.response

    const docRef = adminDb.collection('admins').doc(id)
    const existing = await docRef.get()
    if (!existing.exists) return notFound('Admin not found')

    await docRef.update({
      ...body.data,
      updatedAt: new Date().toISOString(),
      updatedBy: guard.admin.uid,
      updatedByEmail: guard.admin.email
    })

    // Deactivation takes effect immediately: existing sessions are revoked.
    if (body.data.active === false) {
      await adminAuth.revokeRefreshTokens(id).catch((error) => {
        console.error('[api] Failed to revoke tokens for deactivated admin:', error)
      })
    }

    return json({ success: true })
  } catch (error) {
    return serverError('PATCH /api/admins/[id]', error, 'Failed to update admin.')
  }
}
