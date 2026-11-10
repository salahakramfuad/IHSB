import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getEventByIdAdmin, updateEvent, deleteEvent } from '@/lib/database/events'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateEventSchema } from '@/lib/validation/events'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Event not found')

    const admin = await getOptionalAdmin(request)
    const event = await getEventByIdAdmin(id)
    if (!event) return notFound('Event not found')

    return json({ event: admin ? event : toPublic(event) })
  } catch (error) {
    return serverError('GET /api/events/[id]', error, 'Failed to fetch event.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Event not found')

    const body = await parseJsonBody(request, updateEventSchema)
    if (!body.ok) return body.response

    const existing = await getEventByIdAdmin(id)
    if (!existing) return notFound('Event not found')

    await updateEvent(id, body.data, guard.admin.email)

    const name = body.data.title ?? existing.title
    await notifyAdminAction(guard.admin, {
      type: 'event',
      action: 'updated',
      title: `Event updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/events/${id}`
    })

    return json({ success: true, event: await getEventByIdAdmin(id) })
  } catch (error) {
    return serverError('PUT /api/events/[id]', error, 'Failed to update event.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Event not found')

    await deleteEvent(id)

    await notifyAdminAction(guard.admin, {
      type: 'event',
      action: 'deleted',
      title: 'Event deleted',
      itemId: id,
      itemHref: '/admin/events'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/events/[id]', error, 'Failed to delete event.')
  }
}
