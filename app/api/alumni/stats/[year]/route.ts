import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAlumniYearStatsByYear, createOrUpdateAlumniYearStats, calculateYearStats, deleteAlumniYearStats, getAllAlumniYearStats } from '@/lib/firestore/alumni'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const { year } = await params
    const stats = await getAlumniYearStatsByYear(year)
    
    if (!stats) {
      return NextResponse.json(
        { error: 'Year statistics not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Error fetching alumni year stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alumni year stats' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { year } = await params
    const body = await request.json()
    const { count, autoCalculated, recalculate } = body

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'

    if (recalculate === true) {
      // Auto-calculate for this year
      const calculatedCount = await calculateYearStats(year)
      await createOrUpdateAlumniYearStats(year, calculatedCount, true, creatorEmail)
      return NextResponse.json({ success: true, year, count: calculatedCount, autoCalculated: true })
    }

    if (!count) {
      return NextResponse.json(
        { error: 'Count is required' },
        { status: 400 }
      )
    }

    await createOrUpdateAlumniYearStats(
      year,
      count,
      autoCalculated !== undefined ? autoCalculated : false,
      creatorEmail
    )
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating alumni year stats:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update alumni year stats' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { year } = await params
    const stats = await getAlumniYearStatsByYear(year)
    if (!stats || !stats.id) {
      return NextResponse.json(
        { error: 'Year statistics not found' },
        { status: 404 }
      )
    }

    await deleteAlumniYearStats(stats.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting alumni year stats:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete alumni year stats' },
      { status: 500 }
    )
  }
}
