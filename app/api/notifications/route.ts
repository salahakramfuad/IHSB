import { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/auth/middleware'
import { getRecentNotificationsService } from '@/lib/services/notificationsService'
import { json, parseLimit, serverError } from '@/lib/utils/http'

/**
 * GET /api/notifications
 * Recent dashboard notifications (changes made by admins). Admins only.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response

    const limit = parseLimit(new URL(request.url).searchParams.get('limit'), 30, 50)
    return json({ notifications: await getRecentNotificationsService(limit) })
  } catch (error) {
    return serverError('GET /api/notifications', error, 'Failed to fetch notifications.')
  }
}
