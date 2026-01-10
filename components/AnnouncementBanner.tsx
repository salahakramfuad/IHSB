import Link from 'next/link'
import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'
import type { AnnouncementDocument } from '@/lib/services/announcementsService'

/**
 * Server-side announcement banner component
 * Displays high-priority announcements prominently at the top of homepage
 */
export default async function AnnouncementBanner() {
  const announcements = await getActiveAnnouncementsService()
  
  // Get high-priority announcements for banner
  const highPriorityAnnouncements = announcements
    .filter(a => a.priority === 'high' && a.isActive)
    .slice(0, 1) // Show only the most recent high-priority announcement

  if (highPriorityAnnouncements.length === 0) {
    return null
  }

  const announcement = highPriorityAnnouncements[0]

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex-shrink-0">
              <span className="inline-block w-3 h-3 bg-white rounded-full animate-pulse"></span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg mb-1">{announcement.title}</h3>
              <p className="text-sm text-white/90 line-clamp-1">{announcement.content}</p>
            </div>
          </div>
          <Link
            href="/events"
            className="flex-shrink-0 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold text-sm transition-colors"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </div>
  )
}
