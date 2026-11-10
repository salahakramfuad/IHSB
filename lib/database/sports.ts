import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, withId } from './shared'

export type Sport = 'Football' | 'Basketball' | 'Badminton' | 'Chess' | 'Events'
export type Placement = 'Champion' | 'Runner-up' | 'Participant' | 'Award'

export interface SportsAchievementDocument {
  id?: string
  slug: string
  title: string
  sport: Sport
  placement: Placement
  description: string
  date: string // ISO
  image: string
  location?: string
  photos?: string[]
  longDescription?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

const sports = () => adminDb.collection('sports')

// Get all sports achievements
export const getAllSportsAchievements = async (): Promise<SportsAchievementDocument[]> => {
  const snapshot = await sports().orderBy('date', 'desc').get()
  return snapshot.docs.map((doc) => withId<SportsAchievementDocument>(doc))
}

// Get single achievement
export const getSportsAchievementById = async (id: string): Promise<SportsAchievementDocument | null> => {
  const snap = await sports().doc(id).get()
  return snap.exists ? withId<SportsAchievementDocument>(snap) : null
}

// Get by slug
export const getSportsAchievementBySlug = async (slug: string): Promise<SportsAchievementDocument | null> => {
  const snapshot = await sports().where('slug', '==', slug).limit(1).get()
  return snapshot.empty ? null : withId<SportsAchievementDocument>(snapshot.docs[0])
}

// Create achievement
export const createSportsAchievement = async (
  achievementData: Omit<SportsAchievementDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const docRef = await sports().add(
    cleanForWrite({
      ...achievementData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdByEmail: creatorEmail || null,
      createdBy: creatorEmail || null
    })
  )
  return docRef.id
}

// Update achievement
export const updateSportsAchievement = async (
  id: string,
  achievementData: Partial<SportsAchievementDocument>,
  updaterEmail?: string
): Promise<void> => {
  const updateData: Record<string, unknown> = {
    ...achievementData,
    updatedAt: Timestamp.now()
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await sports().doc(id).update(cleanForWrite(updateData))
}

// Delete achievement
export const deleteSportsAchievement = async (id: string): Promise<void> => {
  await sports().doc(id).delete()
}
