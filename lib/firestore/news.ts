import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'

export type NewsCategory = 'sports' | 'news' | 'general'

export interface NewsDocument {
  id?: string
  title: string
  description: string
  photos: string[] // Multiple images
  category: NewsCategory
  date: Timestamp | string // ISO date string or Firestore Timestamp
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

// Get all news (sorted by date, newest first)
export const getAllNews = async (): Promise<NewsDocument[]> => {
  try {
    let snapshot
    try {
      const q = query(collection(db, 'news'), orderBy('date', 'desc'))
      snapshot = await getDocs(q)
    } catch (orderError: any) {
      // If orderBy fails, fetch all without ordering
      snapshot = await getDocs(collection(db, 'news'))
    }
    
    const allNews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as NewsDocument))
    
    // Sort by date (newest first) as fallback
    return allNews.sort((a, b) => {
      const getDateValue = (date: any): number => {
        if (!date) return 0
        if (date instanceof Timestamp) return date.toMillis()
        if (date.seconds) return date.seconds * 1000 + (date.nanoseconds || 0) / 1000000
        if (date.toDate) return date.toDate().getTime()
        return new Date(date).getTime()
      }
      return getDateValue(b.date) - getDateValue(a.date)
    })
  } catch (error: any) {
    console.error('Error fetching all news:', error?.message || error)
    return []
  }
}

// Get latest news (sorted by date, newest first)
export const getLatestNews = async (limit: number = 10): Promise<NewsDocument[]> => {
  const allNews = await getAllNews()
  return allNews.slice(0, limit)
}

// Get news by category
export const getNewsByCategory = async (category: NewsCategory): Promise<NewsDocument[]> => {
  const allNews = await getAllNews()
  return allNews.filter(item => item.category === category)
}

// Get latest news from sports and news categories
export const getLatestSportsAndNews = async (limit: number = 3): Promise<NewsDocument[]> => {
  const allNews = await getAllNews()
  const sportsAndNews = allNews.filter(item => 
    item.category === 'sports' || item.category === 'news'
  )
  return sportsAndNews.slice(0, limit)
}

// Get single news item
export const getNewsById = async (id: string): Promise<NewsDocument | null> => {
  try {
    const docRef = doc(db, 'news', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) {
      return null
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as NewsDocument
  } catch (error: any) {
    console.error('Error fetching news by ID:', error?.message || error)
    return null
  }
}

// Create news
export const createNews = async (newsData: Omit<NewsDocument, 'id' | 'createdAt' | 'updatedAt'>, creatorEmail?: string): Promise<string> => {
  const newsRef = collection(db, 'news')
  const data: any = {
    ...newsData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }
  
  // Convert date string to Timestamp if needed
  if (typeof newsData.date === 'string') {
    data.date = Timestamp.fromDate(new Date(newsData.date))
  }
  
  const docRef = await addDoc(newsRef, data)
  return docRef.id
}

// Update news
export const updateNews = async (id: string, newsData: Partial<NewsDocument>, updaterEmail?: string): Promise<void> => {
  const docRef = doc(db, 'news', id)
  const updateData: any = {
    ...newsData,
    updatedAt: Timestamp.now()
  }
  
  // Convert date string to Timestamp if needed
  if (updateData.date && typeof updateData.date === 'string') {
    updateData.date = Timestamp.fromDate(new Date(updateData.date))
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

// Delete news
export const deleteNews = async (id: string): Promise<void> => {
  const docRef = doc(db, 'news', id)
  await deleteDoc(docRef)
}
