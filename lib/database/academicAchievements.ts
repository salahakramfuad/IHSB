import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, withId } from './shared'

export type Session = 'O Level' | 'AS Level' | 'A Level'

export interface AcademicAchievementDocument {
  id?: string
  name: string
  result: string
  year: number | string
  session: Session
  image?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

const achievements = () => adminDb.collection('academicAchievements')

const byYearDesc = (a: AcademicAchievementDocument, b: AcademicAchievementDocument) =>
  Number(b.year) - Number(a.year)

// Get all academic achievements
export const getAllAcademicAchievements = async (): Promise<AcademicAchievementDocument[]> => {
  try {
    const snapshot = await achievements().get()
    return snapshot.docs.map((doc) => withId<AcademicAchievementDocument>(doc)).sort(byYearDesc)
  } catch (error) {
    console.error('Error fetching academic achievements:', error)
    return []
  }
}

// Get academic achievements by session
export const getAcademicAchievementsBySession = async (session: Session): Promise<AcademicAchievementDocument[]> => {
  try {
    const snapshot = await achievements().where('session', '==', session).get()
    return snapshot.docs.map((doc) => withId<AcademicAchievementDocument>(doc)).sort(byYearDesc)
  } catch (error) {
    console.error('Error fetching academic achievements by session:', error)
    return []
  }
}

// Get single academic achievement
export const getAcademicAchievementById = async (id: string): Promise<AcademicAchievementDocument | null> => {
  try {
    const snap = await achievements().doc(id).get()
    return snap.exists ? withId<AcademicAchievementDocument>(snap) : null
  } catch (error) {
    console.error('Error fetching academic achievement by ID:', error)
    return null
  }
}

// Create academic achievement
export const createAcademicAchievement = async (
  achievementData: Omit<AcademicAchievementDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const { image, ...restData } = achievementData
  const data: Record<string, unknown> = {
    ...restData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }

  // Only include image if it has a value
  if (image) data.image = image

  const docRef = await achievements().add(cleanForWrite(data))
  return docRef.id
}

// Update academic achievement
export const updateAcademicAchievement = async (
  id: string,
  achievementData: Omit<Partial<AcademicAchievementDocument>, 'image'> & { image?: string | null },
  updaterEmail?: string
): Promise<void> => {
  const { image, ...restData } = achievementData
  const updateData: Record<string, unknown> = {
    ...restData,
    updatedAt: Timestamp.now()
  }

  // An explicit null/empty image clears the field
  if (image !== undefined) updateData.image = image || null

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await achievements().doc(id).update(cleanForWrite(updateData))
}

// Delete academic achievement
export const deleteAcademicAchievement = async (id: string): Promise<void> => {
  await achievements().doc(id).delete()
}
