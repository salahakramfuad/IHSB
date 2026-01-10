import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllSportsAchievements, createSportsAchievement } from '@/lib/firestore/sports'

export async function GET() {
  try {
    const achievements = await getAllSportsAchievements()
    return NextResponse.json({ achievements })
  } catch (error: any) {
    console.error('Error fetching sports achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sports achievements' },
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
    const id = await createSportsAchievement(body)
    return NextResponse.json({ id, ...body })
  } catch (error: any) {
    console.error('Error creating sports achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create sports achievement' },
      { status: 500 }
    )
  }
}
