import { NextRequest } from 'next/server'
import { getOptionalAdmin, requireAdminWrite } from '@/lib/auth/middleware'
import { createOrUpdateAlumniYearStats, getAllFeaturedAlumni } from '@/lib/database/alumni'
import { getAllAlumniYearStatsService } from '@/lib/services/alumniService'
import { json, parseJsonBody, serverError, toPublic } from '@/lib/utils/http'
import { alumniStatsPostSchema } from '@/lib/validation/alumni'

export async function GET(request: NextRequest) {
  try {
    const admin = await getOptionalAdmin(request)
    const stats = await getAllAlumniYearStatsService()
    return json({ stats: admin ? stats : stats.map(toPublic) })
  } catch (error) {
    return serverError('GET /api/alumni/stats', error, 'Failed to fetch alumni year stats.')
  }
}

export async function POST(request: NextRequest) {
  try {
    const guard = await requireAdminWrite(request)
    if (!guard.ok) return guard.response

    const body = await parseJsonBody(request, alumniStatsPostSchema)
    if (!body.ok) return body.response

    if ('recalculate' in body.data) {
      // Recalculate every year from the featured alumni list
      const yearCounts = new Map<string, number>()
      for (const alumni of await getAllFeaturedAlumni()) {
        const year = String(alumni.graduationYear)
        yearCounts.set(year, (yearCounts.get(year) || 0) + 1)
      }

      const results = []
      for (const [year, total] of yearCounts) {
        const count = total > 0 ? `${total}+` : '0'
        await createOrUpdateAlumniYearStats(year, count, true, guard.admin.email)
        results.push({ year, count, autoCalculated: true })
      }
      return json({ success: true, stats: results })
    }

    const { year, count, autoCalculated } = body.data
    const id = await createOrUpdateAlumniYearStats(year, count, autoCalculated, guard.admin.email)
    return json({ id, year, count, autoCalculated })
  } catch (error) {
    return serverError('POST /api/alumni/stats', error, 'Failed to save alumni year stats.')
  }
}
