import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAllAlumniStories, createAlumniStory } from '@/lib/database/alumni'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, parseLimit, serverError, toPublic } from '@/lib/utils/http'
import { createAlumniStorySchema } from '@/lib/validation/alumni'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const admin = await getOptionalAdmin(request)

    let stories = await getAllAlumniStories()

    // Drafts are only visible to admins
    if (!admin || searchParams.get('published') === 'true' || searchParams.get('featured') === 'true') {
      stories = stories.filter((story) => story.published === true)
    }
    if (searchParams.get('featured') === 'true') {
      stories = stories.filter((story) => story.featured === true)
    }
    if (limit) stories = stories.slice(0, parseLimit(limit, 3))

    return json({ stories: admin ? stories : stories.map(toPublic) })
  } catch (error) {
    return serverError('GET /api/alumni/stories', error, 'Failed to fetch alumni stories.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createAlumniStorySchema)
    if (!body.ok) return body.response

    const id = await createAlumniStory(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'alumni_story',
      action: 'created',
      title: `Alumni story created: ${body.data.title}`,
      description: body.data.title,
      itemId: id,
      itemHref: `/admin/alumni/stories`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/alumni/stories', error, 'Failed to create alumni story.')
  }
}
