import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getSportsAchievementById, updateSportsAchievement, deleteSportsAchievement } from '@/lib/firestore/sports'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const achievement = await getSportsAchievementById(params.id)
    
    if (!achievement) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ achievement })
  } catch (error: any) {
    console.error('Error fetching achievement:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievement' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const updaterEmail = decodedToken.email || decodedToken.uid || 'unknown'
    await updateSportsAchievement(params.id, body, updaterEmail)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update achievement' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await deleteSportsAchievement(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete achievement' },
      { status: 500 }
    )
  }
}
