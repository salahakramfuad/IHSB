import {
  compareAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  isAnnouncementActive
} from '../database/announcements'
import type { AnnouncementDocument } from '../database/announcements'
import { dateToMillis } from '../database/shared'
import { mockAnnouncements } from '../mock/data'
import { fromSource } from './source'

export type { AnnouncementDocument } from '../database/announcements'

/**
 * Server-side service for announcements (Firestore or mock data, see ./source.ts).
 */
export async function getAllAnnouncementsService(): Promise<AnnouncementDocument[]> {
  return fromSource('announcements.all', {
    real: getAllAnnouncements,
    mock: () => [...mockAnnouncements].sort((a, b) => dateToMillis(b.createdAt) - dateToMillis(a.createdAt)),
    empty: []
  })
}

/** Active = not explicitly inactive and not expired; newest first, then by priority. */
export async function getActiveAnnouncementsService(): Promise<AnnouncementDocument[]> {
  const now = Date.now()
  return (await getAllAnnouncementsService())
    .filter((announcement) => isAnnouncementActive(announcement, now))
    .sort(compareAnnouncements)
}

export async function getFeaturedAnnouncementsService(limit: number = 3): Promise<AnnouncementDocument[]> {
  return (await getActiveAnnouncementsService()).slice(0, limit)
}

export async function getAnnouncementByIdService(id: string): Promise<AnnouncementDocument | null> {
  return fromSource('announcements.byId', {
    real: () => getAnnouncementById(id),
    mock: () => mockAnnouncements.find((announcement) => announcement.id === id) ?? null,
    empty: null
  })
}
