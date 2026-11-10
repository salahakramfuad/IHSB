import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import {
  getAlumniYearStatsByYear,
  createOrUpdateAlumniYearStats,
  calculateYearStats,
  deleteAlumniYearStats
} from '@/lib/database/alumni'
import { getAlumniYearStatsByYearService } from '@/lib/services/alumniService'
import { json, notFound, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { alumniStatsPutSchema, alumniYearParam } from '@/lib/validation/alumni'

type RouteContext = { params: Promise<{ year: string }> }

const isYear = (value: string) => alumniYearParam.safeParse(value).success

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { year } = await params
    if (!isYear(year)) return notFound('Year statistics not found')

    const stats = await getAlumniYearStatsByYearService(year)
    if (!stats) return notFound('Year statistics not found')

    const admin = await getOptionalAdmin(request)
    return json({ stats: admin ? stats : toPublic(stats) })
  } catch (error) {
    return serverError('GET /api/alumni/stats/[year]', error, 'Failed to fetch alumni year stats.')
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { year } = await params
    if (!isYear(year)) return notFound('Year statistics not found')

    const body = await parseJsonBody(request, alumniStatsPutSchema)
    if (!body.ok) return body.response

    if ('recalculate' in body.data) {
      const count = await calculateYearStats(year)
      await createOrUpdateAlumniYearStats(year, count, true, guard.admin.email)
      return json({ success: true, year, count, autoCalculated: true })
    }

    await createOrUpdateAlumniYearStats(year, body.data.count, body.data.autoCalculated, guard.admin.email)
    return json({ success: true })
  } catch (error) {
    return serverError('PUT /api/alumni/stats/[year]', error, 'Failed to update alumni year stats.')
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const { year } = await params
    if (!isYear(year)) return notFound('Year statistics not found')

    const stats = await getAlumniYearStatsByYear(year)
    if (!stats?.id) return notFound('Year statistics not found')

    await deleteAlumniYearStats(stats.id)
    return json({ success: true })
  } catch (error) {
    return serverError('DELETE /api/alumni/stats/[year]', error, 'Failed to delete alumni year stats.')
  }
}
