import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getAlumniStoryById, updateAlumniStory, deleteAlumniStory } from '@/lib/database/alumni'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateAlumniStorySchema } from '@/lib/validation/alumni'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('Alumni story not found')

    const admin = await getOptionalAdmin(request)
    const story = await getAlumniStoryById(id)
    if (!story || (!admin && story.published !== true)) return notFound('Alumni story not found')

    return json({ story: admin ? story : toPublic(story) })
  } catch (error) {
    return serverError('GET /api/alumni/stories/[id]', error, 'Failed to fetch alumni story.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Alumni story not found')

    const body = await parseJsonBody(request, updateAlumniStorySchema)
    if (!body.ok) return body.response

    const existing = await getAlumniStoryById(id)
    if (!existing) return notFound('Alumni story not found')

    await updateAlumniStory(id, body.data, guard.admin.email)

    const name = body.data.title ?? existing.title
    await notifyAdminAction(guard.admin, {
      type: 'alumni_story',
      action: 'updated',
      title: `Alumni story updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/alumni/stories`
    })

    return json({ success: true, story: await getAlumniStoryById(id) })
  } catch (error) {
    return serverError('PUT /api/alumni/stories/[id]', error, 'Failed to update alumni story.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('Alumni story not found')

    await deleteAlumniStory(id)

    await notifyAdminAction(guard.admin, {
      type: 'alumni_story',
      action: 'deleted',
      title: 'Alumni story deleted',
      itemId: id,
      itemHref: '/admin/alumni/stories'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/alumni/stories/[id]', error, 'Failed to delete alumni story.')
  }
}
