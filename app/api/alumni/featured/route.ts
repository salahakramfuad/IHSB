import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { getFeaturedAlumniByYear, getAllFeaturedAlumni, createFeaturedAlumni } from '@/lib/database/alumni'
import { notifyAdminAction } from '@/lib/database/notifications'
import { json, parseJsonBody, parseLimit, serverError, toPublic } from '@/lib/utils/http'
import { createFeaturedAlumniSchema } from '@/lib/validation/alumni'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const year = searchParams.get('year')
    const admin = await getOptionalAdmin(request)

    let alumni = year && /^\d{4}$/.test(year) ? await getFeaturedAlumniByYear(year) : await getAllFeaturedAlumni()

    if (searchParams.get('featured') === 'true') {
      alumni = alumni.filter((item) => item.featured === true)
    }
    if (limit) alumni = alumni.slice(0, parseLimit(limit, 6))

    return json({ alumni: admin ? alumni : alumni.map(toPublic) })
  } catch (error) {
    return serverError('GET /api/alumni/featured', error, 'Failed to fetch featured alumni.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, createFeaturedAlumniSchema)
    if (!body.ok) return body.response

    const id = await createFeaturedAlumni(body.data, guard.admin.email)

    await notifyAdminAction(guard.admin, {
      type: 'alumni_featured',
      action: 'created',
      title: `Featured alumni created: ${body.data.name}`,
      description: body.data.name,
      itemId: id,
      itemHref: `/admin/alumni/featured`
    })

    return json({ id, ...body.data })
  } catch (error) {
    return serverError('POST /api/alumni/featured', error, 'Failed to create featured alumni.')
  }
}
