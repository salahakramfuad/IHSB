import { NextRequest } from 'next/server'
import { z } from 'zod'
import { requireAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getLatestNews, getNewsByCategory, getAllNews, createNews } from '@/lib/database/news'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, parseLimit, serverError, toPublic } from '@/lib/utils/http'
import { createNewsSchema } from '@/lib/validation/news'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const category = z.enum(['sports', 'news', 'general']).safeParse(searchParams.get('category'))

    if (category.success) {
      const news = await getNewsByCategory(category.data)
      return json({ news: news.map(toPublic) })
    }
    if (limit) {
      const news = await getLatestNews(parseLimit(limit, 10))
      return json({ news: news.map(toPublic) })
    }

    // The full list (with audit fields) is for the admin dashboard only
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response
    return json({ news: await getAllNews() })
  } catch (error) {
    return serverError('GET /api/news', error, 'Failed to fetch news.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createNewsSchema)
    if (!body.ok) return body.response

    const newsData = { ...body.data, date: body.data.date ?? new Date().toISOString() }
    const id = await createNews(newsData, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'news',
      action: 'created',
      title: `News created: ${newsData.title}`,
      description: newsData.title,
      itemId: id,
      itemHref: `/admin/news/${id}`
    })

    return json({ id, ...newsData })
  } catch (error) {
    return serverError('POST /api/news', error, 'Failed to create news.')
  }
}
