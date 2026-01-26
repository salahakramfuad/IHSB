import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllEventsAdmin, createEvent } from '@/lib/database/events'
import { Event } from '@/data/events'

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

    // For admin API, return full document data including creator info
    const events = await getAllEventsAdmin()
    return NextResponse.json({ events })
  } catch (error: any) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
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
    const eventData: Omit<Event, 'id'> = {
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      location: body.location,
      image: body.image,
      category: body.category,
      featured: body.featured || false,
      registrationRequired: body.registrationRequired || false,
      registrationUrl: body.registrationUrl
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createEvent(eventData, creatorEmail)
    return NextResponse.json({ id, ...eventData })
  } catch (error: any) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create event' },
      { status: 500 }
    )
  }
}
