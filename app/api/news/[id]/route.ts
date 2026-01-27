import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { updateNews, deleteNews, getNewsById } from '@/lib/database/news'
import { addNotification } from '@/lib/database/notifications'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const news = await getNewsById(id)
    
    if (!news) {
      return NextResponse.json(
        { error: 'News not found' },
        { status: 404 }
      )
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
    const updateData: any = {}

    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.photos !== undefined) updateData.photos = body.photos
    if (body.category !== undefined) updateData.category = body.category
    if (body.date !== undefined) updateData.date = body.date

    const updaterEmail = decodedToken.email || decodedToken.uid || 'unknown'
    await updateNews(id, updateData, updaterEmail)
    await addNotification({
      type: 'news',
      action: 'updated',
      title: `News updated: ${body.title ?? 'News'}`,
      description: body.title ?? undefined,
      itemId: id,
      itemHref: `/admin/news/${id}`,
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    const updatedNews = await getNewsById(id)
    return NextResponse.json({ news: updatedNews })
  } catch (error: any) {
    console.error('Error updating news:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update news' },
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
    await deleteNews(id)
    await addNotification({
      type: 'news',
      action: 'deleted',
      title: 'News deleted',
      itemId: id,
      itemHref: '/admin/news',
      createdBy: decodedToken.uid || '',
      createdByEmail: decodedToken.email || null,
      createdByName: (decodedToken as { name?: string }).name ?? decodedToken.email ?? null
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting news:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete news' },
      { status: 500 }
    )
  }
}
