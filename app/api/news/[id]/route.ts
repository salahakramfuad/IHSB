import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getNewsById, updateNews, deleteNews } from '@/lib/database/news'
import { getNewsByIdService } from '@/lib/services/newsService'
import { notifyAdminAction } from '@/lib/database/notifications'
import { isValidDocId, json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { updateNewsSchema } from '@/lib/validation/news'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!isValidDocId(id)) return notFound('News not found')

    const admin = await getOptionalAdmin(request)
    const news = await getNewsByIdService(id)
    if (!news) return notFound('News not found')

    return json({ news: admin ? news : toPublic(news) })
  } catch (error) {
    return serverError('GET /api/news/[id]', error, 'Failed to fetch news.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('News not found')

    const body = await parseJsonBody(request, updateNewsSchema)
    if (!body.ok) return body.response

    const existing = await getNewsById(id)
    if (!existing) return notFound('News not found')

    await updateNews(id, body.data, guard.admin.email)

    const name = body.data.title ?? existing.title
    await notifyAdminAction(guard.admin, {
      type: 'news',
      action: 'updated',
      title: `News updated: ${name}`,
      description: name,
      itemId: id,
      itemHref: `/admin/news/${id}`
    })

    return json({ success: true, news: await getNewsById(id) })
  } catch (error) {
    return serverError('PUT /api/news/[id]', error, 'Failed to update news.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { id } = await params
    if (!isValidDocId(id)) return notFound('News not found')

    await deleteNews(id)

    await notifyAdminAction(guard.admin, {
      type: 'news',
      action: 'deleted',
      title: 'News deleted',
      itemId: id,
      itemHref: '/admin/news'
    })

    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/news/[id]', error, 'Failed to delete news.')
  }
}
