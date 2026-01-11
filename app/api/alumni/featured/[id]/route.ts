import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getFeaturedAlumniById, updateFeaturedAlumni, deleteFeaturedAlumni } from '@/lib/firestore/alumni'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const alumni = await getFeaturedAlumniById(params.id)
    
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
    await updateFeaturedAlumni(params.id, body, updaterEmail)
    
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

    await deleteFeaturedAlumni(params.id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting featured alumni:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete featured alumni' },
      { status: 500 }
    )
  }
}
