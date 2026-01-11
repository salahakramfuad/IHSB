import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAlumniStoryById, updateAlumniStory, deleteAlumniStory } from '@/lib/firestore/alumni'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const story = await getAlumniStoryById(id)
    
    if (!story) {
      return NextResponse.json(
        { error: 'Alumni story not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ story })
  } catch (error: any) {
    console.error('Error fetching alumni story:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alumni story' },
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
    await updateAlumniStory(id, body, updaterEmail)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating alumni story:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update alumni story' },
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
    await deleteAlumniStory(id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting alumni story:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete alumni story' },
      { status: 500 }
    )
  }
}
