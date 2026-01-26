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

// Get all academic achievements
export const getAllAcademicAchievements = async (): Promise<AcademicAchievementDocument[]> => {
  try {
    const q = query(collection(db, 'academicAchievements'), orderBy('year', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AcademicAchievementDocument))
  } catch (error: any) {
    // If orderBy fails (e.g., year field missing), fetch all without ordering
    try {
      const snapshot = await getDocs(collection(db, 'academicAchievements'))
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AcademicAchievementDocument))
    } catch {
      console.error('Error fetching academic achievements:', error?.message || error)
      return []
    }
  }
}

// Get academic achievements by session
export const getAcademicAchievementsBySession = async (session: Session): Promise<AcademicAchievementDocument[]> => {
  try {
    const q = query(
      collection(db, 'academicAchievements'),
      where('session', '==', session),
      orderBy('year', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AcademicAchievementDocument))
  } catch (error: any) {
    // Fallback: fetch all and filter
    try {
      const q = query(collection(db, 'academicAchievements'), where('session', '==', session))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AcademicAchievementDocument))
    } catch {
      console.error('Error fetching academic achievements by session:', error?.message || error)
      return []
    }
  }
}

// Get single academic achievement
export const getAcademicAchievementById = async (id: string): Promise<AcademicAchievementDocument | null> => {
  try {
    const docRef = doc(db, 'academicAchievements', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as AcademicAchievementDocument
  } catch (error: any) {
    console.error('Error fetching academic achievement by ID:', error?.message || error)
    return null
  }
}

// Create academic achievement
export const createAcademicAchievement = async (
  achievementData: Omit<AcademicAchievementDocument, 'id' | 'createdAt' | 'updatedAt'>, 
  creatorEmail?: string
): Promise<string> => {
  const achievementRef = collection(db, 'academicAchievements')
  const { image, ...restData } = achievementData
  const data: any = {
    ...restData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }
  
  // Only include image if it has a value (not undefined or null)
  if (image !== undefined && image !== null && image !== '') {
    data.image = image
  }
  
  const docRef = await addDoc(achievementRef, data)
  return docRef.id
}

// Update academic achievement
export const updateAcademicAchievement = async (
  id: string, 
  achievementData: Partial<AcademicAchievementDocument>, 
  updaterEmail?: string
): Promise<void> => {
  const docRef = doc(db, 'academicAchievements', id)
  const { image, ...restData } = achievementData
  const updateData: any = {
    ...restData,
    updatedAt: Timestamp.now()
  }
  
  // Only include image if it has a value (not undefined)
  // If it's explicitly set to null or empty string, include it to clear the field
  if (image !== undefined) {
    if (image === null || image === '') {
      updateData.image = null
    } else {
      updateData.image = image
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

// Delete academic achievement
export const deleteAcademicAchievement = async (id: string): Promise<void> => {
  const docRef = doc(db, 'academicAchievements', id)
  await deleteDoc(docRef)
}
