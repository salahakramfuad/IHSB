import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAllNews, createNews } from '@/lib/firestore/news'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const category = searchParams.get('category') as 'sports' | 'news' | 'general' | null

    let news
    if (category) {
      const { getNewsByCategory } = await import('@/lib/firestore/news')
      news = await getNewsByCategory(category)
    } else if (limit) {
      const { getLatestNews } = await import('@/lib/firestore/news')
      news = await getLatestNews(parseInt(limit, 10))
    } else {
      // Getting all news requires admin authentication
      const decodedToken = await verifyAdminToken(request)
      if (!decodedToken) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
      news = await getAllNews()
    }

    return NextResponse.json({ news })
  } catch (error: any) {
    console.error('Error fetching news:', error?.message || error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch news' },
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
    const newsData = {
      title: body.title,
      description: body.description,
      photos: body.photos || [],
      category: body.category || 'general',
      date: body.date || new Date().toISOString()
    }

    const creatorEmail = decodedToken.email || decodedToken.uid || 'unknown'
    const id = await createNews(newsData, creatorEmail)
    return NextResponse.json({ id, ...newsData })
  } catch (error: any) {
    console.error('Error creating news:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create news' },
      { status: 500 }
    )
  }
}
