import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAcademicAchievementById, updateAcademicAchievement, deleteAcademicAchievement } from '@/lib/firestore/academicAchievements'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const achievement = await getAcademicAchievementById(params.id)
    
    if (!achievement) {
      return NextResponse.json(
        { error: 'Academic achievement not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ achievement })
  } catch (error: any) {
    console.error('Error fetching academic achievement:', error)
    return NextResponse.json(
      { error: 'Failed to fetch academic achievement' },
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
    await updateAcademicAchievement(params.id, body, updaterEmail)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating academic achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update academic achievement' },
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

    await deleteAcademicAchievement(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting academic achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete academic achievement' },
      { status: 500 }
    )
  }
}
