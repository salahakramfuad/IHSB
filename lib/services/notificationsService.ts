import { getRecentNotifications } from '../database/notifications'
import type { NotificationDoc } from '../database/notifications'
import { mockNotifications } from '../mock/data'
import { fromSource } from './source'

/** Recent dashboard notifications (admin only). */
export async function getRecentNotificationsService(limit = 30): Promise<NotificationDoc[]> {
  return fromSource('notifications.recent', {
    real: () => getRecentNotifications(limit),
    mock: () => mockNotifications.slice(0, limit),
    empty: []
  })
}
