import { NextRequest } from 'next/server'
import { requireAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAdmissionById, updateAdmission } from '@/lib/database/admissions'
import { getAdmissionByIdService } from '@/lib/services/admissionsService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError } from '@/lib/utils/http'
import { updateAdmissionSchema } from '@/lib/validation/admissions'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    // Applications contain personal data: admins only
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Admission not found')

    const admission = await getAdmissionByIdService(id)
    if (!admission) return notFound('Admission not found')

    return json({ admission })
  } catch (error) {
    return serverError('GET /api/admissions/[id]', error, 'Failed to fetch admission.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Admission not found')

    const body = await parseJsonBody(request, updateAdmissionSchema)
    if (!body.ok) return body.response

    const existing = await getAdmissionById(id)
    if (!existing) return notFound('Admission not found')

    await updateAdmission(id, body.data)

    const { status } = body.data
    await notifyAdminAction(guard.admin, {
      type: 'admission',
      action: 'updated',
      title: `Admission updated${status ? ` (${status})` : ''}`,
      description: status ? `Status: ${status}` : undefined,
      itemId: id,
      itemHref: `/admin/admissions/${id}`
    })

    return json({ success: true })
  } catch (error) {
    return serverError('PUT /api/admissions/[id]', error, 'Failed to update admission.')
  }
}
