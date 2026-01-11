import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getAdmissionById, updateAdmission } from '@/lib/firestore/admissions'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const admission = await getAdmissionById(id)
    
    if (!admission) {
      return NextResponse.json(
        { error: 'Admission not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ admission })
  } catch (error: any) {
    console.error('Error fetching admission:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admission' },
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
    await updateAdmission(id, body)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error updating admission:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update admission' },
      { status: 500 }
    )
  }
}
