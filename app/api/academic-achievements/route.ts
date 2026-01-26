import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllAcademicAchievements, createAcademicAchievement } from '@/lib/database/academicAchievements'

export async function GET(request: NextRequest) {
  try {
    // Verify admin token for admin API access
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const achievements = await getAllAcademicAchievements()
    return NextResponse.json({ achievements })
  } catch (error: any) {
    console.error('Error fetching academic achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch academic achievements' },
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
    const achievementData = {
      name: body.name,
      result: body.result,
      year: body.year,
      session: body.session,
      image: body.image || undefined
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createAcademicAchievement(achievementData, creatorEmail)
    return NextResponse.json({ id, ...achievementData })
  } catch (error: any) {
    console.error('Error creating academic achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create academic achievement' },
      { status: 500 }
    )
  }
}
