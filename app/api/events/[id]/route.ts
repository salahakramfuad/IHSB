import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getEventByIdAdmin, updateEvent, deleteEvent } from '@/lib/firestore/events'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await getEventByIdAdmin(params.id)
    
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ event })
  } catch (error: any) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
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
    await updateEvent(params.id, body, updaterEmail)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update event' },
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

    await deleteEvent(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete event' },
      { status: 500 }
    )
  }
}
