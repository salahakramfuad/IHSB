import { getActiveAnnouncements, getFeaturedAnnouncements } from '../database/announcements'
import { AnnouncementDocument } from '../database/announcements'

export type { AnnouncementDocument } from '../database/announcements'

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
