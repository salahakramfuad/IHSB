import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAcademicAchievementById, updateAcademicAchievement, deleteAcademicAchievement } from '@/lib/database/academicAchievements'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateAcademicAchievementSchema } from '@/lib/validation/academicAchievements'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Academic achievement not found')

    const admin = await getOptionalAdmin(request)
    const achievement = await getAcademicAchievementById(id)
    if (!achievement) return notFound('Academic achievement not found')

    return json({ achievement: admin ? achievement : toPublic(achievement) })
  } catch (error) {
    return serverError('GET /api/academic-achievements/[id]', error, 'Failed to fetch academic achievement.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Academic achievement not found')

    const body = await parseJsonBody(request, updateAcademicAchievementSchema)
    if (!body.ok) return body.response

    const existing = await getAcademicAchievementById(id)
    if (!existing) return notFound('Academic achievement not found')

    await updateAcademicAchievement(id, body.data, guard.admin.email)

    const name = body.data.name ?? existing.name
    await notifyAdminAction(guard.admin, {
      type: 'academic_achievement',
      action: 'updated',
      title: `Academic achievement updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/academic-achievements`
    })

    return json({ success: true, achievement: await getAcademicAchievementById(id) })
  } catch (error) {
    return serverError('PUT /api/academic-achievements/[id]', error, 'Failed to update academic achievement.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Academic achievement not found')

    await deleteAcademicAchievement(id)

    await notifyAdminAction(guard.admin, {
      type: 'academic_achievement',
      action: 'deleted',
      title: 'Academic achievement deleted',
      itemId: id,
      itemHref: '/admin/academic-achievements'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/academic-achievements/[id]', error, 'Failed to delete academic achievement.')
  }
}
