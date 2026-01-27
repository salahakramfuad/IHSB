import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllAcademicAchievements, createAcademicAchievement } from '@/lib/database/academicAchievements'
import { addNotification } from '@/lib/database/notifications'

export async function GET() {
  try {
    // Public read: allow unauthenticated GET so the achievements page can display data
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
    await addNotification({
      type: 'academic_achievement',
      action: 'created',
      title: `Academic achievement created: ${achievementData.name || 'Untitled'}`,
      description: achievementData.name || undefined,
      itemId: id,
      itemHref: `/admin/academic-achievements`,
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    return NextResponse.json({ id, ...achievementData })
  } catch (error: any) {
    console.error('Error creating academic achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create academic achievement' },
      { status: 500 }
    )
  }
}
