import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getFeaturedAlumniById, updateFeaturedAlumni, deleteFeaturedAlumni } from '@/lib/database/alumni'
import { getFeaturedAlumniByIdService } from '@/lib/services/alumniService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateFeaturedAlumniSchema } from '@/lib/validation/alumni'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Featured alumni not found')

    const admin = await getOptionalAdmin(request)
    const alumni = await getFeaturedAlumniByIdService(id)
    if (!alumni) return notFound('Featured alumni not found')

    return json({ alumni: admin ? alumni : toPublic(alumni) })
  } catch (error) {
    return serverError('GET /api/alumni/featured/[id]', error, 'Failed to fetch featured alumni.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Featured alumni not found')

    const body = await parseJsonBody(request, updateFeaturedAlumniSchema)
    if (!body.ok) return body.response

    const existing = await getFeaturedAlumniById(id)
    if (!existing) return notFound('Featured alumni not found')

    await updateFeaturedAlumni(id, body.data, guard.admin.email)

    const name = body.data.name ?? existing.name
    await notifyAdminAction(guard.admin, {
      type: 'alumni_featured',
      action: 'updated',
      title: `Featured alumni updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/alumni/featured`
    })

    return json({ success: true, alumni: await getFeaturedAlumniById(id) })
  } catch (error) {
    return serverError('PUT /api/alumni/featured/[id]', error, 'Failed to update featured alumni.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Featured alumni not found')

    await deleteFeaturedAlumni(id)

    await notifyAdminAction(guard.admin, {
      type: 'alumni_featured',
      action: 'deleted',
      title: 'Featured alumni deleted',
      itemId: id,
      itemHref: '/admin/alumni/featured'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/alumni/featured/[id]', error, 'Failed to delete featured alumni.')
  }
}
