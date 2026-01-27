import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'
import NotificationStrip from './NotificationStrip'

/**
 * Server-side: fetches the 7 most recent active announcements and renders
 * a left-to-right scrolling notification strip at the top.
 * Serializes to plain objects so Firestore Timestamps etc. are not passed to the client.
 */
export default async function AnnouncementBanner() {
  const announcements = await getActiveAnnouncementsService()
  const recent = announcements.slice(0, 7)

  if (recent.length === 0) {
    return null
  }

  const plain = recent.map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    priority: a.priority
  }))

  return <NotificationStrip announcements={plain} />
}
