import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, withId } from './shared'

const featuredAlumni = () => adminDb.collection('featuredAlumni')
const alumniStories = () => adminDb.collection('alumniStories')
const alumniYearStats = () => adminDb.collection('alumniYearStats')

const take = <T>(items: T[], limit?: number): T[] => (limit ? items.slice(0, limit) : items)

// ==================== Featured Alumni ====================

export interface FeaturedAlumniDocument {
  id?: string
  name: string
  description: string  // Job title/role
  achievement: string   // e.g., "Graduated 2015"
  graduationYear: number | string
  imageUrl: string
  email?: string
  linkedin?: string
  company?: string
  location?: string
  featured: boolean  // For highlighting on homepage
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

const OPTIONAL_ALUMNI_FIELDS = ['email', 'linkedin', 'company', 'location'] as const

// Get all featured alumni (newest graduation year first)
export const getAllFeaturedAlumni = async (): Promise<FeaturedAlumniDocument[]> => {
  try {
    const snapshot = await featuredAlumni().get()
    return snapshot.docs
      .map((doc) => withId<FeaturedAlumniDocument>(doc))
      .sort((a, b) => Number(b.graduationYear) - Number(a.graduationYear))
  } catch (error) {
    console.error('Error fetching featured alumni:', error)
    return []
  }
}

// Get featured alumni with optional limit
export const getFeaturedAlumni = async (limit?: number): Promise<FeaturedAlumniDocument[]> => {
  return take(await getAllFeaturedAlumni(), limit)
}

// Get featured alumni by year (graduationYear may be stored as string or number)
export const getFeaturedAlumniByYear = async (year: string): Promise<FeaturedAlumniDocument[]> => {
  const all = await getAllFeaturedAlumni()
  return all.filter((alumni) => String(alumni.graduationYear) === String(year))
}

// Get single featured alumni
export const getFeaturedAlumniById = async (id: string): Promise<FeaturedAlumniDocument | null> => {
  try {
    const snap = await featuredAlumni().doc(id).get()
    return snap.exists ? withId<FeaturedAlumniDocument>(snap) : null
  } catch (error) {
    console.error('Error fetching featured alumni by ID:', error)
    return null
  }
}

// Create featured alumni
export const createFeaturedAlumni = async (
  alumniData: Omit<FeaturedAlumniDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const data: Record<string, unknown> = {
    ...alumniData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }

  // Only include optional fields if they have values
  for (const field of OPTIONAL_ALUMNI_FIELDS) {
    if (!data[field]) delete data[field]
  }

  const docRef = await featuredAlumni().add(cleanForWrite(data))
  return docRef.id
}

// Update featured alumni
export const updateFeaturedAlumni = async (
  id: string,
  alumniData: Omit<Partial<FeaturedAlumniDocument>, (typeof OPTIONAL_ALUMNI_FIELDS)[number]> & {
    [K in (typeof OPTIONAL_ALUMNI_FIELDS)[number]]?: string | null
  },
  updaterEmail?: string
): Promise<void> => {
  const updateData: Record<string, unknown> = {
    ...alumniData,
    updatedAt: Timestamp.now()
  }

  // An explicit null/empty optional field clears it
  for (const field of OPTIONAL_ALUMNI_FIELDS) {
    if (updateData[field] !== undefined) updateData[field] = updateData[field] || null
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await featuredAlumni().doc(id).update(cleanForWrite(updateData))
}

// Delete featured alumni
export const deleteFeaturedAlumni = async (id: string): Promise<void> => {
  await featuredAlumni().doc(id).delete()
}

// ==================== Alumni Stories ====================

export interface AlumniStoryDocument {
  id?: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  imageUrl: string
  date: string  // ISO date string or formatted date
  published: boolean
  featured?: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

// Get all alumni stories (newest first)
export const getAllAlumniStories = async (): Promise<AlumniStoryDocument[]> => {
  try {
    const snapshot = await alumniStories().get()
    return snapshot.docs
      .map((doc) => withId<AlumniStoryDocument>(doc))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  } catch (error) {
    console.error('Error fetching alumni stories:', error)
    return []
  }
}

// Get published alumni stories
export const getPublishedAlumniStories = async (limit?: number): Promise<AlumniStoryDocument[]> => {
  const all = await getAllAlumniStories()
  return take(all.filter((story) => story.published === true), limit)
}

// Get featured alumni stories
export const getFeaturedAlumniStories = async (limit?: number): Promise<AlumniStoryDocument[]> => {
  const all = await getAllAlumniStories()
  return take(all.filter((story) => story.published === true && story.featured === true), limit)
}

// Get single alumni story
export const getAlumniStoryById = async (id: string): Promise<AlumniStoryDocument | null> => {
  try {
    const snap = await alumniStories().doc(id).get()
    return snap.exists ? withId<AlumniStoryDocument>(snap) : null
  } catch (error) {
    console.error('Error fetching alumni story by ID:', error)
    return null
  }
}

// Create alumni story
export const createAlumniStory = async (
  storyData: Omit<AlumniStoryDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const docRef = await alumniStories().add(
    cleanForWrite({
      ...storyData,
      featured: storyData.featured || false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdByEmail: creatorEmail || null,
      createdBy: creatorEmail || null
    })
  )
  return docRef.id
}

// Update alumni story
export const updateAlumniStory = async (
  id: string,
  storyData: Partial<AlumniStoryDocument>,
  updaterEmail?: string
): Promise<void> => {
  const updateData: Record<string, unknown> = {
    ...storyData,
    updatedAt: Timestamp.now()
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await alumniStories().doc(id).update(cleanForWrite(updateData))
}

// Delete alumni story
export const deleteAlumniStory = async (id: string): Promise<void> => {
  await alumniStories().doc(id).delete()
}

// ==================== Year Statistics ====================

export interface AlumniYearStatsDocument {
  id?: string
  year: string  // e.g., "2023"
  count: string  // e.g., "500+"
  autoCalculated: boolean  // If true, count is calculated from featured alumni
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
}

// Get all year statistics (newest year first)
export const getAllAlumniYearStats = async (): Promise<AlumniYearStatsDocument[]> => {
  try {
    const snapshot = await alumniYearStats().get()
    return snapshot.docs
      .map((doc) => withId<AlumniYearStatsDocument>(doc))
      .sort((a, b) => String(b.year).localeCompare(String(a.year)))
  } catch (error) {
    console.error('Error fetching alumni year stats:', error)
    return []
  }
}

// Get year statistics by year
export const getAlumniYearStatsByYear = async (year: string): Promise<AlumniYearStatsDocument | null> => {
  try {
    const snapshot = await alumniYearStats().where('year', '==', year).limit(1).get()
    return snapshot.empty ? null : withId<AlumniYearStatsDocument>(snapshot.docs[0])
  } catch (error) {
    console.error('Error fetching alumni year stats by year:', error)
    return null
  }
}

// Calculate year statistics from featured alumni
export const calculateYearStats = async (year: string): Promise<string> => {
  const alumni = await getFeaturedAlumniByYear(year)
  const count = alumni.length
  return count > 0 ? `${count}+` : '0'
}

// Create or update year statistics
export const createOrUpdateAlumniYearStats = async (
  year: string,
  count: string,
  autoCalculated: boolean,
  creatorEmail?: string
): Promise<string> => {
  const existing = await getAlumniYearStatsByYear(year)

  if (existing?.id) {
    await alumniYearStats().doc(existing.id).update({
      count,
      autoCalculated,
      updatedAt: Timestamp.now()
    })
    return existing.id
  }

  const docRef = await alumniYearStats().add({
    year,
    count,
    autoCalculated,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  })
  return docRef.id
}

// Delete year statistics
export const deleteAlumniYearStats = async (id: string): Promise<void> => {
  await alumniYearStats().doc(id).delete()
}
