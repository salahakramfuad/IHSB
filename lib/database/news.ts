import { Timestamp } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { cleanForWrite, dateToMillis, withId } from './shared'

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

const news = () => adminDb.collection('news')

// Get all news (sorted by date, newest first)
export const getAllNews = async (): Promise<NewsDocument[]> => {
  try {
    const snapshot = await news().get()
    return snapshot.docs
      .map((doc) => withId<NewsDocument>(doc))
      .sort((a, b) => dateToMillis(b.date) - dateToMillis(a.date))
  } catch (error) {
    console.error('Error fetching all news:', error)
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
  return allNews.filter((item) => item.category === category)
}

// Get latest news from sports and news categories
export const getLatestSportsAndNews = async (limit: number = 3): Promise<NewsDocument[]> => {
  const allNews = await getAllNews()
  return allNews
    .filter((item) => item.category === 'sports' || item.category === 'news')
    .slice(0, limit)
}

// Get single news item
export const getNewsById = async (id: string): Promise<NewsDocument | null> => {
  try {
    const snap = await news().doc(id).get()
    return snap.exists ? withId<NewsDocument>(snap) : null
  } catch (error) {
    console.error('Error fetching news by ID:', error)
    return null
  }
}

// Create news
export const createNews = async (
  newsData: Omit<NewsDocument, 'id' | 'createdAt' | 'updatedAt'>,
  creatorEmail?: string
): Promise<string> => {
  const data: Record<string, unknown> = {
    ...newsData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  }

  if (typeof newsData.date === 'string') {
    data.date = Timestamp.fromDate(new Date(newsData.date))
  }

  const docRef = await news().add(cleanForWrite(data))
  return docRef.id
}

// Update news
export const updateNews = async (
  id: string,
  newsData: Partial<NewsDocument>,
  updaterEmail?: string
): Promise<void> => {
  const updateData: Record<string, unknown> = {
    ...newsData,
    updatedAt: Timestamp.now()
  }

  if (typeof updateData.date === 'string') {
    updateData.date = Timestamp.fromDate(new Date(updateData.date))
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await news().doc(id).update(cleanForWrite(updateData))
}

// Delete news
export const deleteNews = async (id: string): Promise<void> => {
  await news().doc(id).delete()
}
