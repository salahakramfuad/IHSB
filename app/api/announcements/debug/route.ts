import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { adminDb } from '@/lib/firebase/admin'

/**
 * Debug endpoint to check announcements in Firestore
 * Only accessible to admins
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const decodedToken = await verifyAdminToken(request)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const snapshot = await adminDb.collection('announcements').get()
    const allDocs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[]

    // Analyze the data
    const analysis = {
      total: allDocs.length,
      featured: allDocs.filter((d: any) => d.featured === true).length,
      active: allDocs.filter((d: any) => d.isActive !== false).length,
      activeAndFeatured: allDocs.filter((d: any) => d.featured === true && d.isActive !== false).length,
      withExpiration: allDocs.filter((d: any) => d.expiresAt).length,
      documents: allDocs.map((doc: any) => ({
        id: doc.id,
        title: doc.title || 'N/A',
        featured: doc.featured ?? 'not set',
        isActive: doc.isActive ?? 'not set',
        priority: doc.priority || 'not set',
        createdAt: doc.createdAt 
          ? (doc.createdAt.seconds ? new Date(doc.createdAt.seconds * 1000).toISOString() : doc.createdAt)
          : 'not set',
        expiresAt: doc.expiresAt
          ? (doc.expiresAt.seconds ? new Date(doc.expiresAt.seconds * 1000).toISOString() : doc.expiresAt)
          : 'not set'
      }))
    }

    return NextResponse.json(analysis)
  } catch (error: any) {
    console.error('Debug error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to debug announcements' },
      { status: 500 }
    )
  }
}
