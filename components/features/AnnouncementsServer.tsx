import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedAnnouncementsService } from '@/lib/services/announcementsService'
import type { AnnouncementDocument } from '@/lib/services/announcementsService'
import ImageWithLightbox from '../shared/ImageWithLightbox'

interface AnnouncementsServerProps {
  limit?: number
}

/**
 * Server-side announcements component
 * Fetches data on the server for better performance
 */
export default async function AnnouncementsServer({ limit = 3 }: AnnouncementsServerProps) {
  try {
    // Get all active announcements (sorted by date, newest first)
    const { getActiveAnnouncementsService } = await import('@/lib/services/announcementsService')
    const allAnnouncements = await getActiveAnnouncementsService()
    
    // Take only the first 'limit' announcements (already sorted by date)
    const announcements = allAnnouncements.slice(0, limit)

    if (announcements.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p className="mb-2">No announcements available at this time.</p>
          <p className="text-xs text-gray-400">
            Announcements must have isActive=true (or field not set) and not be expired to appear here.
          </p>
        </div>
      )
    }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date not available'
    const date = timestamp instanceof Object && 'seconds' in timestamp
      ? new Date(timestamp.seconds * 1000)
      : typeof timestamp === 'string'
      ? new Date(timestamp)
      : timestamp instanceof Date
      ? timestamp
      : new Date()
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {announcements.map((announcement) => (
        <Link
          key={announcement.id}
          href="/announcements"
          className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-primary-green-300 active:scale-[0.98] flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:ring-offset-2"
        >
          {announcement.image && (
            <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
              <ImageWithLightbox
                src={announcement.image}
                alt={announcement.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
                lightbox={false}
              />
            </div>
          )}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-semibold text-primary-green-600 bg-primary-green-50 px-3 py-1 rounded-full">
              {formatDate(announcement.createdAt)}
            </span>
            {announcement.priority === 'high' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                High Priority
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-green-600 transition-colors">{announcement.title}</h3>
          <p className="text-sm text-gray-700 mb-4 line-clamp-3 flex-1">{announcement.content}</p>
          <span className="inline-block text-sm font-semibold text-primary-green-600 group-hover:text-primary-green-700 transition-colors mt-auto">
            Read more →
          </span>
        </Link>
      ))}
    </div>
  )
  } catch (error) {
    console.error('Error in AnnouncementsServer:', error)
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading announcements. Please try again later.</p>
      </div>
    )
  }
}
