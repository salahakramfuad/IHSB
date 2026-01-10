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
import { db } from '../firebase/config'

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
}

// Get all sports achievements
export const getAllSportsAchievements = async (): Promise<SportsAchievementDocument[]> => {
  const q = query(collection(db, 'sports'), orderBy('date', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as SportsAchievementDocument))
}

// Get single achievement
export const getSportsAchievementById = async (id: string): Promise<SportsAchievementDocument | null> => {
  const docRef = doc(db, 'sports', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as SportsAchievementDocument
}

// Get by slug
export const getSportsAchievementBySlug = async (slug: string): Promise<SportsAchievementDocument | null> => {
  const q = query(
    collection(db, 'sports'),
    where('slug', '==', slug)
  )
  const snapshot = await getDocs(q)
  
  if (snapshot.empty) {
    return null
  }
  
  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data()
  } as SportsAchievementDocument
}

// Create achievement
export const createSportsAchievement = async (achievementData: Omit<SportsAchievementDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const achievementRef = collection(db, 'sports')
  const docRef = await addDoc(achievementRef, {
    ...achievementData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

// Update achievement
export const updateSportsAchievement = async (id: string, achievementData: Partial<SportsAchievementDocument>): Promise<void> => {
  const docRef = doc(db, 'sports', id)
  const updateData: any = {
    ...achievementData,
    updatedAt: Timestamp.now()
  }
  
  delete updateData.id
  
  await updateDoc(docRef, updateData)
}

// Delete achievement
export const deleteSportsAchievement = async (id: string): Promise<void> => {
  const docRef = doc(db, 'sports', id)
  await deleteDoc(docRef)
}
