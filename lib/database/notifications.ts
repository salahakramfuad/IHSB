/**
 * Dashboard notifications: changes/additions by admins, visible to all admins and superadmins.
 * Uses Firebase Admin SDK (server-only). Call from API routes after create/update/delete.
 */
import { adminDb } from '@/lib/integrations/firebase/admin'

export type NotificationType =
  | 'event'
  | 'announcement'
  | 'admission'
  | 'news'
  | 'sport'
  | 'academic_achievement'
  | 'alumni_featured'
  | 'alumni_story'
  | 'alumni_stats'

export type NotificationAction = 'created' | 'updated' | 'deleted'

export interface NotificationRecord {
  id?: string
  type: NotificationType
  action: NotificationAction
  title: string
  description?: string
  itemId: string
  itemHref: string
  createdBy: string
  createdByEmail: string | null
  createdAt: string
}

const COLLECTION = 'notifications'

/**
 * Add a notification. Call from API routes after create/update/delete.
 */
export async function addNotification(params: {
  type: NotificationType
  action: NotificationAction
  title: string
  description?: string
  itemId: string
  itemHref: string
  createdBy: string
  createdByEmail: string | null
  createdByName?: string | null
}): Promise<void> {
  try {
    await adminDb.collection(COLLECTION).add({
      type: params.type,
      action: params.action,
      title: params.title,
      description: params.description ?? null,
      itemId: params.itemId,
      itemHref: params.itemHref,
      createdBy: params.createdBy,
      createdByEmail: params.createdByEmail,
      createdByName: params.createdByName ?? null,
      createdAt: new Date().toISOString()
    })
  } catch (e) {
    console.error('addNotification error:', e)
  }
}

export interface NotificationDoc {
  id: string
  type: NotificationType
  action: NotificationAction
  title: string
  description: string | null
  itemId: string
  itemHref: string
  createdBy: string
  createdByEmail: string | null
  createdByName: string | null
  createdAt: string
}

/**
 * Get recent notifications for dashboard. Visible to all admins/superadmins.
 */
export async function getRecentNotifications(limit = 30): Promise<NotificationDoc[]> {
  try {
    const snapshot = await adminDb
      .collection(COLLECTION)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
    return snapshot.docs.map((doc) => {
      const d = doc.data()
      return {
        id: doc.id,
        type: (d.type as NotificationType) || 'announcement',
        action: (d.action as NotificationAction) || 'updated',
        title: d.title || '',
        description: d.description ?? null,
        itemId: d.itemId || '',
        itemHref: d.itemHref || '#',
        createdBy: d.createdBy || '',
        createdByEmail: d.createdByEmail ?? null,
        createdByName: d.createdByName ?? null,
        createdAt: typeof d.createdAt === 'string' ? d.createdAt : (d.createdAt?.toDate?.()?.toISOString?.() ?? '')
      }
    })
  } catch (e) {
    console.error('getRecentNotifications error:', e)
    return []
  }
}
