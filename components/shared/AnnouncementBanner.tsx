import { excerpt } from '@/lib/format'
import { getFeaturedAnnouncementsService } from '@/lib/services/announcementsService'
import NotificationStrip from './NotificationStrip'

/**
 * Server side: loads the most recent active announcements for the notice bar.
 * Only plain strings cross to the client component (no Firestore Timestamps).
 */
export default async function AnnouncementBanner() {
  const announcements = await getFeaturedAnnouncementsService(5)
  if (announcements.length === 0) return null

  return (
    <NotificationStrip
      announcements={announcements.map((announcement) => ({
        id: announcement.id,
        title: excerpt(announcement.title ?? '', 70),
        content: excerpt(announcement.content ?? '', 110),
        priority: announcement.priority
      }))}
    />
  )
}
