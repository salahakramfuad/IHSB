import { NextRequest } from 'next/server'
import { requireAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getActiveAnnouncements, getFeaturedAnnouncements, getAllAnnouncements, createAnnouncement } from '@/lib/database/announcements'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, parseLimit, serverError, toPublic } from '@/lib/utils/http'
import { createAnnouncementSchema } from '@/lib/validation/announcements'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    if (searchParams.get('featured') === 'true') {
      const announcements = await getFeaturedAnnouncements(parseLimit(searchParams.get('limit'), 3))
      return json({ announcements: announcements.map(toPublic) })
    }
    if (searchParams.get('active') === 'true') {
      const announcements = await getActiveAnnouncements()
      return json({ announcements: announcements.map(toPublic) })
    }

    // Everything (including inactive/expired): admin dashboard only
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response
    return json({ announcements: await getAllAnnouncements() })
  } catch (error) {
    return serverError('GET /api/announcements', error, 'Failed to fetch announcements.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createAnnouncementSchema)
    if (!body.ok) return body.response

    const id = await createAnnouncement(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'announcement',
      action: 'created',
      title: `Announcement created: ${body.data.title}`,
      description: body.data.title,
      itemId: id,
      itemHref: `/admin/announcements/${id}`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/announcements', error, 'Failed to create announcement.')
  }
}
