import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllAlumniStories, getPublishedAlumniStories, getFeaturedAlumniStories, createAlumniStory } from '@/lib/database/alumni'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const published = searchParams.get('published')
    const featured = searchParams.get('featured')

    let stories

    if (featured === 'true') {
      stories = await getFeaturedAlumniStories(limit ? parseInt(limit, 10) : undefined)
    } else if (published === 'true') {
      stories = await getPublishedAlumniStories(limit ? parseInt(limit, 10) : undefined)
    } else if (limit) {
      const allStories = await getAllAlumniStories()
      stories = allStories.slice(0, parseInt(limit, 10))
    } else {
      stories = await getAllAlumniStories()
    }

    return NextResponse.json({ stories })
  } catch (error: any) {
    console.error('Error fetching alumni stories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alumni stories' },
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
    const storyData = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      authorRole: body.authorRole,
      imageUrl: body.imageUrl,
      date: body.date || new Date().toISOString(),
      published: body.published !== undefined ? body.published : false,
      featured: body.featured || false
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createAlumniStory(storyData, creatorEmail)
    return NextResponse.json({ id, ...storyData })
  } catch (error: any) {
    console.error('Error creating alumni story:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create alumni story' },
      { status: 500 }
    )
  }
}
