import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllAnnouncements, getActiveAnnouncements, getFeaturedAnnouncements, createAnnouncement } from '@/lib/firestore/announcements'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active') === 'true'
    const featured = searchParams.get('featured') === 'true'

    let announcements
    
    // Use Admin SDK directly in API route for better reliability
    if (featured) {
      const limitParam = searchParams.get('limit')
      const limit = limitParam ? parseInt(limitParam, 10) : 3
      announcements = await getFeaturedAnnouncements(limit)
    } else if (active) {
      announcements = await getActiveAnnouncements()
    } else {
      // For admin dashboard, get all announcements
      announcements = await getAllAnnouncements()
    }

    return NextResponse.json({ announcements })
  } catch (error: any) {
    console.error('Error fetching announcements:', error?.message || error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch announcements' },
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
    const announcementData = {
      title: body.title,
      content: body.content,
      image: body.image,
      priority: body.priority || 'medium',
      featured: body.featured || false,
      isActive: body.isActive !== undefined ? body.isActive : true,
      expiresAt: body.expiresAt
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createAnnouncement(announcementData, creatorEmail)
    return NextResponse.json({ id, ...announcementData })
  } catch (error: any) {
    console.error('Error creating announcement:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create announcement' },
      { status: 500 }
    )
  }
}
