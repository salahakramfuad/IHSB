import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../integrations/firebase/config'

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

// Get all featured alumni
export const getAllFeaturedAlumni = async (): Promise<FeaturedAlumniDocument[]> => {
  try {
    const q = query(collection(db, 'featuredAlumni'), orderBy('graduationYear', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FeaturedAlumniDocument))
  } catch (error: any) {
    // If orderBy fails, fetch all without ordering
    try {
      const snapshot = await getDocs(collection(db, 'featuredAlumni'))
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FeaturedAlumniDocument))
    } catch {
      console.error('Error fetching featured alumni:', error?.message || error)
      return []
    }
  }
}

// Get featured alumni with optional limit
export const getFeaturedAlumni = async (limit?: number): Promise<FeaturedAlumniDocument[]> => {
  const allAlumni = await getAllFeaturedAlumni()
  if (limit) {
    return allAlumni.slice(0, limit)
  }
  return allAlumni
}

// Get featured alumni by year
export const getFeaturedAlumniByYear = async (year: string): Promise<FeaturedAlumniDocument[]> => {
  try {
    const q = query(
      collection(db, 'featuredAlumni'),
      where('graduationYear', '==', year)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as FeaturedAlumniDocument))
  } catch (error: any) {
    console.error('Error fetching featured alumni by year:', error?.message || error)
    return []
  }
}

// Get single featured alumni
export const getFeaturedAlumniById = async (id: string): Promise<FeaturedAlumniDocument | null> => {
  try {
    const docRef = doc(db, 'featuredAlumni', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as FeaturedAlumniDocument
  } catch (error: any) {
    console.error('Error fetching featured alumni by ID:', error?.message || error)
    return null
  }
}

// Create featured alumni
export const createFeaturedAlumni = async (
  alumniData: Omit<FeaturedAlumniDocument, 'id' | 'createdAt' | 'updatedAt'>, 
  creatorEmail?: string
): Promise<string> => {
  const alumniRef = collection(db, 'featuredAlumni')
  const { email, linkedin, company, location, ...restData } = alumniData
  const data: any = {
    ...restData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }
  
  // Only include optional fields if they have values
  if (email !== undefined && email !== null && email !== '') {
    data.email = email
  }
  if (linkedin !== undefined && linkedin !== null && linkedin !== '') {
    data.linkedin = linkedin
  }
  if (company !== undefined && company !== null && company !== '') {
    data.company = company
  }
  if (location !== undefined && location !== null && location !== '') {
    data.location = location
  }
  
  const docRef = await addDoc(alumniRef, data)
  return docRef.id
}

// Update featured alumni
export const updateFeaturedAlumni = async (
  id: string, 
  alumniData: Partial<FeaturedAlumniDocument>, 
  updaterEmail?: string
): Promise<void> => {
  const docRef = doc(db, 'featuredAlumni', id)
  const { email, linkedin, company, location, ...restData } = alumniData
  const updateData: any = {
    ...restData,
    updatedAt: Timestamp.now()
  }
  
  // Handle optional fields
  if (email !== undefined) {
    if (email === null || email === '') {
      updateData.email = null
    } else {
      updateData.email = email
    }
  }
  if (linkedin !== undefined) {
    if (linkedin === null || linkedin === '') {
      updateData.linkedin = null
    } else {
      updateData.linkedin = linkedin
    }
  }
  if (company !== undefined) {
    if (company === null || company === '') {
      updateData.company = null
    } else {
      updateData.company = company
    }
  }
  if (location !== undefined) {
    if (location === null || location === '') {
      updateData.location = null
    } else {
      updateData.location = location
    }
  }
  
  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }
  
  // Remove id if present
  delete updateData.id
  
  // Remove any undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) {
      delete updateData[key]
    }
  })
  
  await updateDoc(docRef, updateData)
}

// Delete featured alumni
export const deleteFeaturedAlumni = async (id: string): Promise<void> => {
  const docRef = doc(db, 'featuredAlumni', id)
  await deleteDoc(docRef)
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

// Get all alumni stories
export const getAllAlumniStories = async (): Promise<AlumniStoryDocument[]> => {
  try {
    const q = query(collection(db, 'alumniStories'), orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AlumniStoryDocument))
  } catch (error: any) {
    // If orderBy fails, fetch all without ordering
    try {
      const snapshot = await getDocs(collection(db, 'alumniStories'))
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AlumniStoryDocument))
    } catch {
      console.error('Error fetching alumni stories:', error?.message || error)
      return []
    }
  }
}

// Get published alumni stories
export const getPublishedAlumniStories = async (limit?: number): Promise<AlumniStoryDocument[]> => {
  try {
    const q = query(
      collection(db, 'alumniStories'),
      where('published', '==', true),
      orderBy('date', 'desc')
    )
    const snapshot = await getDocs(q)
    const stories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AlumniStoryDocument))
    
    if (limit) {
      return stories.slice(0, limit)
    }
    return stories
  } catch (error: any) {
    // Fallback: fetch all and filter
    try {
      const snapshot = await getDocs(collection(db, 'alumniStories'))
      const allStories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AlumniStoryDocument))
      const published = allStories.filter(s => s.published === true)
      if (limit) {
        return published.slice(0, limit)
      }
      return published
    } catch {
      console.error('Error fetching published alumni stories:', error?.message || error)
      return []
    }
  }
}

// Get featured alumni stories
export const getFeaturedAlumniStories = async (limit?: number): Promise<AlumniStoryDocument[]> => {
  try {
    const q = query(
      collection(db, 'alumniStories'),
      where('published', '==', true),
      where('featured', '==', true),
      orderBy('date', 'desc')
    )
    const snapshot = await getDocs(q)
    const stories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AlumniStoryDocument))
    
    if (limit) {
      return stories.slice(0, limit)
    }
    return stories
  } catch (error: any) {
    // Fallback: fetch all and filter
    const allStories = await getAllAlumniStories()
    const featured = allStories.filter(s => s.published === true && s.featured === true)
    if (limit) {
      return featured.slice(0, limit)
    }
    return featured
  }
}

// Get single alumni story
export const getAlumniStoryById = async (id: string): Promise<AlumniStoryDocument | null> => {
  try {
    const docRef = doc(db, 'alumniStories', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as AlumniStoryDocument
  } catch (error: any) {
    console.error('Error fetching alumni story by ID:', error?.message || error)
    return null
  }
}

// Create alumni story
export const createAlumniStory = async (
  storyData: Omit<AlumniStoryDocument, 'id' | 'createdAt' | 'updatedAt'>, 
  creatorEmail?: string
): Promise<string> => {
  const storyRef = collection(db, 'alumniStories')
  const data: any = {
    ...storyData,
    featured: storyData.featured || false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }
  
  const docRef = await addDoc(storyRef, data)
  return docRef.id
}

// Update alumni story
export const updateAlumniStory = async (
  id: string, 
  storyData: Partial<AlumniStoryDocument>, 
  updaterEmail?: string
): Promise<void> => {
  const docRef = doc(db, 'alumniStories', id)
  const updateData: any = {
    ...storyData,
    updatedAt: Timestamp.now()
  }
  
  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }
  
  // Remove id if present
  delete updateData.id
  
  // Remove any undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) {
      delete updateData[key]
    }
  })
  
  await updateDoc(docRef, updateData)
}

// Delete alumni story
export const deleteAlumniStory = async (id: string): Promise<void> => {
  const docRef = doc(db, 'alumniStories', id)
  await deleteDoc(docRef)
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

// Get all year statistics
export const getAllAlumniYearStats = async (): Promise<AlumniYearStatsDocument[]> => {
  try {
    const q = query(collection(db, 'alumniYearStats'), orderBy('year', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AlumniYearStatsDocument))
  } catch (error: any) {
    // If orderBy fails, fetch all without ordering
    try {
      const snapshot = await getDocs(collection(db, 'alumniYearStats'))
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AlumniYearStatsDocument))
    } catch {
      console.error('Error fetching alumni year stats:', error?.message || error)
      return []
    }
  }
}

// Get year statistics by year
export const getAlumniYearStatsByYear = async (year: string): Promise<AlumniYearStatsDocument | null> => {
  try {
    const q = query(
      collection(db, 'alumniYearStats'),
      where('year', '==', year)
    )
    const snapshot = await getDocs(q)
    
    if (snapshot.empty) {
      return null
    }
    
    return {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } as AlumniYearStatsDocument
  } catch (error: any) {
    console.error('Error fetching alumni year stats by year:', error?.message || error)
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
  
  if (existing) {
    // Update existing
    const docRef = doc(db, 'alumniYearStats', existing.id!)
    await updateDoc(docRef, {
      count,
      autoCalculated,
      updatedAt: Timestamp.now()
    })
    return existing.id!
  } else {
    // Create new
    const statsRef = collection(db, 'alumniYearStats')
    const docRef = await addDoc(statsRef, {
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
}

// Delete year statistics
export const deleteAlumniYearStats = async (id: string): Promise<void> => {
  const docRef = doc(db, 'alumniYearStats', id)
  await deleteDoc(docRef)
}
