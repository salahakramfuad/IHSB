import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllEvents, createEvent } from '@/lib/firestore/events'
import { Event } from '@/data/events'

export async function GET() {
  try {
    const events = await getAllEvents()
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

    const id = await createEvent(eventData)
    return NextResponse.json({ id, ...eventData })
  } catch (error: any) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create event' },
      { status: 500 }
    )
  }
}
