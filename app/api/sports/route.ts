import { NextRequest } from 'next/server'
import { requireAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { createSportsAchievement } from '@/lib/database/sports'
import { getSportsAchievements } from '@/lib/services/sportsService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, serverError } from '@/lib/utils/http'
import { createSportsSchema } from '@/lib/validation/sports'

export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response
    return json({ achievements: await getSportsAchievements() })
  } catch (error) {
    return serverError('GET /api/sports', error, 'Failed to fetch achievements.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createSportsSchema)
    if (!body.ok) return body.response

    const id = await createSportsAchievement(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'sport',
      action: 'created',
      title: `Sports achievement created: ${body.data.title}`,
      description: body.data.title,
      itemId: id,
      itemHref: `/admin/sports/${id}`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/sports', error, 'Failed to create achievement.')
  }
}
