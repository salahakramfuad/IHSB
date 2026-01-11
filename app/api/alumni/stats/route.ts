import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllAlumniYearStats, createOrUpdateAlumniYearStats, calculateYearStats, getAllFeaturedAlumni } from '@/lib/firestore/alumni'

export async function GET() {
  try {
    const stats = await getAllAlumniYearStats()
    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Error fetching alumni year stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alumni year stats' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { year, count, autoCalculated, recalculate } = body

    if (recalculate === true) {
      // Recalculate all years from featured alumni
      const allAlumni = await getAllFeaturedAlumni()
      const yearMap = new Map<string, number>()
      
      // Count alumni by graduation year
      allAlumni.forEach(alumni => {
        const yearStr = String(alumni.graduationYear)
        yearMap.set(yearStr, (yearMap.get(yearStr) || 0) + 1)
      })
      
      // Create or update stats for all years
      const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
      const results = []
      
      for (const [yearStr, countNum] of yearMap.entries()) {
        const countStr = countNum > 0 ? `${countNum}+` : '0'
        await createOrUpdateAlumniYearStats(yearStr, countStr, true, creatorEmail)
        results.push({ year: yearStr, count: countStr, autoCalculated: true })
      }
      
      return NextResponse.json({ success: true, stats: results })
    }

    if (!year || !count) {
      return NextResponse.json(
        { error: 'Year and count are required' },
        { status: 400 }
      )
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createOrUpdateAlumniYearStats(
      year,
      count,
      autoCalculated !== undefined ? autoCalculated : false,
      creatorEmail
    )
    
    return NextResponse.json({ id, year, count, autoCalculated })
  } catch (error: any) {
    console.error('Error creating/updating alumni year stats:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create/update alumni year stats' },
      { status: 500 }
    )
  }
}
