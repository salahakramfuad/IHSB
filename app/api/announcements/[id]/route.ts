import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAnnouncementById, updateAnnouncement, deleteAnnouncement } from '@/lib/firestore/announcements'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const announcement = await getAnnouncementById(params.id)
    
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
    await updateAnnouncement(params.id, body)
    
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

    await deleteAnnouncement(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete announcement' },
      { status: 500 }
    )
  }
}
