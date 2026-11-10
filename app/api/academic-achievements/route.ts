import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAllAcademicAchievements, createAcademicAchievement } from '@/lib/database/academicAchievements'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { createAcademicAchievementSchema } from '@/lib/validation/academicAchievements'

export async function GET(request: NextRequest) {
  try {
    // Public read so the achievements page can display data
    const admin = await getOptionalAdmin(request)
    const achievements = await getAllAcademicAchievements()
    return json({ achievements: admin ? achievements : achievements.map(toPublic) })
  } catch (error) {
    return serverError('GET /api/academic-achievements', error, 'Failed to fetch academic achievements.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createAcademicAchievementSchema)
    if (!body.ok) return body.response

    const id = await createAcademicAchievement(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'academic_achievement',
      action: 'created',
      title: `Academic achievement created: ${body.data.name}`,
      description: body.data.name,
      itemId: id,
      itemHref: `/admin/academic-achievements`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/academic-achievements', error, 'Failed to create academic achievement.')
  }
}
