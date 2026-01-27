import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getSportsAchievementById, updateSportsAchievement, deleteSportsAchievement } from '@/lib/database/sports'
import { addNotification } from '@/lib/database/notifications'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const achievement = await getSportsAchievementById(id)
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const updaterEmail = decodedToken.email || decodedToken.uid || 'unknown'
    await updateSportsAchievement(id, body, updaterEmail)
    await addNotification({
      type: 'sport',
      action: 'updated',
      title: `Sports achievement updated: ${body.title ?? body.name ?? 'Achievement'}`,
      description: body.title ?? body.name ?? undefined,
      itemId: id,
      itemHref: `/admin/sports/${id}`,
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    await deleteSportsAchievement(id)
    await addNotification({
      type: 'sport',
      action: 'deleted',
      title: 'Sports achievement deleted',
      itemId: id,
      itemHref: '/admin/sports',
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting achievement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete achievement' },
      { status: 500 }
    )
  }
}
