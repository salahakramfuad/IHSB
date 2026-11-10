import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getSportsAchievementById, updateSportsAchievement, deleteSportsAchievement } from '@/lib/database/sports'
import { getSportsAchievementByIdService } from '@/lib/services/sportsService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateSportsSchema } from '@/lib/validation/sports'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Achievement not found')

    const admin = await getOptionalAdmin(request)
    const achievement = await getSportsAchievementByIdService(id)
    if (!achievement) return notFound('Achievement not found')

    return json({ achievement: admin ? achievement : toPublic(achievement) })
  } catch (error) {
    return serverError('GET /api/sports/[id]', error, 'Failed to fetch achievement.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Achievement not found')

    const body = await parseJsonBody(request, updateSportsSchema)
    if (!body.ok) return body.response

    const existing = await getSportsAchievementById(id)
    if (!existing) return notFound('Achievement not found')

    await updateSportsAchievement(id, body.data, guard.admin.email)

    const name = body.data.title ?? existing.title
    await notifyAdminAction(guard.admin, {
      type: 'sport',
      action: 'updated',
      title: `Sports achievement updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/sports/${id}`
    })

    return json({ success: true, achievement: await getSportsAchievementById(id) })
  } catch (error) {
    return serverError('PUT /api/sports/[id]', error, 'Failed to update achievement.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Achievement not found')

    await deleteSportsAchievement(id)

    await notifyAdminAction(guard.admin, {
      type: 'sport',
      action: 'deleted',
      title: 'Sports achievement deleted',
      itemId: id,
      itemHref: '/admin/sports'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/sports/[id]', error, 'Failed to delete achievement.')
  }
}
