import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/middleware'
import { getRecentNotifications } from '@/lib/database/notifications'

/**
 * GET /api/notifications
 * Returns recent dashboard notifications (changes/additions by admins).
 * Requires auth; visible to all admins and superadmins.
 */
export async function GET(request: NextRequest) {
  try {
    const decoded = await verifyAdminToken(request)
    if (!decoded?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get('limit')) || 30, 50)
    const notifications = await getRecentNotifications(limit)
    return NextResponse.json({ notifications })
  } catch (error: unknown) {
    console.error('GET /api/notifications error:', error)
    return NextResponse.json(
      { error: (error as Error)?.message || 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
