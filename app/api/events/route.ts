import { NextRequest } from 'next/server'
import { requireAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAllEventsAdmin, createEvent } from '@/lib/database/events'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, serverError } from '@/lib/utils/http'
import { createEventSchema } from '@/lib/validation/events'

export async function GET(request: NextRequest) {
  try {
    // Full documents including creator info: admin dashboard only
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response
    return json({ events: await getAllEventsAdmin() })
  } catch (error) {
    return serverError('GET /api/events', error, 'Failed to fetch events.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createEventSchema)
    if (!body.ok) return body.response

    const id = await createEvent(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'event',
      action: 'created',
      title: `Event created: ${body.data.title}`,
      description: body.data.title,
      itemId: id,
      itemHref: `/admin/events/${id}`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/events', error, 'Failed to create event.')
  }
}
