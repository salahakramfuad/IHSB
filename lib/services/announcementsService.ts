import { getActiveAnnouncements, getFeaturedAnnouncements } from '../firestore/announcements'
import { AnnouncementDocument } from '../firestore/announcements'

export type { AnnouncementDocument } from '../firestore/announcements'

/**
 * Server-side service for announcements
 * Provides clean interface for data fetching
 */
export async function getActiveAnnouncementsService(): Promise<AnnouncementDocument[]> {
  try {
    return await getActiveAnnouncements()
  } catch (error) {
    return []
  }
}

export async function getFeaturedAnnouncementsService(limit: number = 3): Promise<AnnouncementDocument[]> {
  try {
    return await getFeaturedAnnouncements(limit)
  } catch (error) {
    return []
  }
}
