import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAnnouncementById, updateAnnouncement, deleteAnnouncement } from '@/lib/database/announcements'
import { getAnnouncementByIdService } from '@/lib/services/announcementsService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateAnnouncementSchema } from '@/lib/validation/announcements'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Announcement not found')

    const admin = await getOptionalAdmin(request)
    const announcement = await getAnnouncementByIdService(id)
    if (!announcement) return notFound('Announcement not found')

    return json({ announcement: admin ? announcement : toPublic(announcement) })
  } catch (error) {
    return serverError('GET /api/announcements/[id]', error, 'Failed to fetch announcement.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Announcement not found')

    const body = await parseJsonBody(request, updateAnnouncementSchema)
    if (!body.ok) return body.response

    const existing = await getAnnouncementById(id)
    if (!existing) return notFound('Announcement not found')

    await updateAnnouncement(id, body.data, guard.admin.email)

    const name = body.data.title ?? existing.title
    await notifyAdminAction(guard.admin, {
      type: 'announcement',
      action: 'updated',
      title: `Announcement updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/announcements/${id}`
    })

    return json({ success: true, announcement: await getAnnouncementById(id) })
  } catch (error) {
    return serverError('PUT /api/announcements/[id]', error, 'Failed to update announcement.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Announcement not found')

    await deleteAnnouncement(id)

    await notifyAdminAction(guard.admin, {
      type: 'announcement',
      action: 'deleted',
      title: 'Announcement deleted',
      itemId: id,
      itemHref: '/admin/announcements'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/announcements/[id]', error, 'Failed to delete announcement.')
  }
}
