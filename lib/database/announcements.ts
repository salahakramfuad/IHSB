import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, dateToMillis, withId } from './shared'

export interface AnnouncementDocument {
  id?: string
  title: string
  content: string
  image?: string
  priority: 'low' | 'medium' | 'high'
  featured: boolean
  isActive: boolean
  expiresAt?: Timestamp | string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

const announcements = () => adminDb.collection('announcements')

const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 } as const

/** Only excludes explicitly inactive or expired announcements. */
export function isAnnouncementActive(announcement: AnnouncementDocument, now = Date.now()): boolean {
  if (announcement.isActive === false) return false
  if (announcement.expiresAt) {
    const expires = dateToMillis(announcement.expiresAt)
    if (expires && expires <= now) return false
  }
  return true
}

/** Newest first, then by priority. */
export function compareAnnouncements(a: AnnouncementDocument, b: AnnouncementDocument): number {
  const dateDiff = dateToMillis(b.createdAt) - dateToMillis(a.createdAt)
  if (dateDiff !== 0) return dateDiff
  return (PRIORITY_ORDER[b.priority] || 2) - (PRIORITY_ORDER[a.priority] || 2)
}

// Get all announcements (admin dashboard)
export const getAllAnnouncements = async (): Promise<AnnouncementDocument[]> => {
  try {
    const snapshot = await announcements().get()
    return snapshot.docs
      .map((doc) => withId<AnnouncementDocument>(doc))
      .sort((a, b) => dateToMillis(b.createdAt) - dateToMillis(a.createdAt))
  } catch (error) {
    console.error('Error fetching all announcements:', error)
    return []
  }
}

// Get active announcements (isActive !== false and not expired)
export const getActiveAnnouncements = async (): Promise<AnnouncementDocument[]> => {
  const all = await getAllAnnouncements()
  const now = Date.now()
  return all.filter((announcement) => isAnnouncementActive(announcement, now)).sort(compareAnnouncements)
}

// Get featured announcements (all active announcements, sorted by date, limited)
export const getFeaturedAnnouncements = async (limit: number = 3): Promise<AnnouncementDocument[]> => {
  const active = await getActiveAnnouncements()
  return active.slice(0, limit)
}

// Get single announcement
export const getAnnouncementById = async (id: string): Promise<AnnouncementDocument | null> => {
  const snap = await announcements().doc(id).get()
  return snap.exists ? withId<AnnouncementDocument>(snap) : null
}

// Create announcement
export const createAnnouncement = async (
  announcementData: Omit<AnnouncementDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const { expiresAt, ...restData } = announcementData
  const data: Record<string, unknown> = {
    ...restData,
    isActive: announcementData.isActive !== undefined ? announcementData.isActive : true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }

  if (expiresAt !== undefined && expiresAt !== null) {
    data.expiresAt = typeof expiresAt === 'string' ? Timestamp.fromDate(new Date(expiresAt)) : expiresAt
  }

  const docRef = await announcements().add(cleanForWrite(data))
  return docRef.id
}

// Update announcement
export const updateAnnouncement = async (
  id: string,
  announcementData: Omit<Partial<AnnouncementDocument>, 'expiresAt'> & { expiresAt?: Timestamp | string | null },
  updaterEmail?: string
): Promise<void> => {
  const { expiresAt, ...restData } = announcementData
  const updateData: Record<string, unknown> = {
    ...restData,
    updatedAt: Timestamp.now()
  }

  // An explicit null clears the expiry
  if (expiresAt !== undefined) {
    updateData.expiresAt =
      expiresAt === null
        ? null
        : typeof expiresAt === 'string'
          ? Timestamp.fromDate(new Date(expiresAt))
          : expiresAt
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await announcements().doc(id).update(cleanForWrite(updateData))
}

// Delete announcement
export const deleteAnnouncement = async (id: string): Promise<void> => {
  await announcements().doc(id).delete()
}
