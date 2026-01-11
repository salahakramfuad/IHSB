import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getFeaturedAlumniById, updateFeaturedAlumni, deleteFeaturedAlumni } from '@/lib/firestore/alumni'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const alumni = await getFeaturedAlumniById(id)
    
    if (!alumni) {
      return NextResponse.json(
        { error: 'Featured alumni not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ alumni })
  } catch (error: any) {
    console.error('Error fetching featured alumni:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured alumni' },
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
    await updateFeaturedAlumni(id, body, updaterEmail)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating featured alumni:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update featured alumni' },
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
    await deleteFeaturedAlumni(id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting featured alumni:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete featured alumni' },
      { status: 500 }
    )
  }
}
