import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAnnouncementById, updateAnnouncement, deleteAnnouncement } from '@/lib/database/announcements'
import { addNotification } from '@/lib/database/notifications'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const announcement = await getAnnouncementById(id)
    
    if (!announcement) {
      return NextResponse.json(
        { error: 'Announcement not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ announcement })
  } catch (error: any) {
    console.error('Error fetching announcement:', error)
    return NextResponse.json(
      { error: 'Failed to fetch announcement' },
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
    await updateAnnouncement(id, body, updaterEmail)
    await addNotification({
      type: 'announcement',
      action: 'updated',
      title: `Announcement updated: ${body.title || 'Announcement'}`,
      description: body.title || undefined,
      itemId: id,
      itemHref: `/admin/announcements/${id}`,
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating announcement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update announcement' },
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
    await deleteAnnouncement(id)
    await addNotification({
      type: 'announcement',
      action: 'deleted',
      title: 'Announcement deleted',
      itemId: id,
      itemHref: '/admin/announcements',
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}
