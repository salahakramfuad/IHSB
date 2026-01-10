import { getLatestNews, getLatestSportsAndNews, getAllNews, getNewsByCategory } from '../firestore/news'
import { NewsDocument } from '../firestore/news'

export type { NewsDocument, NewsCategory } from '../firestore/news'

/**
 * Server-side service for news
 * Provides clean interface for data fetching
 */
export async function getLatestNewsService(limit: number = 10): Promise<NewsDocument[]> {
  try {
    return await getLatestNews(limit)
  } catch (error) {
    return []
  }
}

export async function getLatestSportsAndNewsService(limit: number = 3): Promise<NewsDocument[]> {
  try {
    return await getLatestSportsAndNews(limit)
  } catch (error) {
    return []
  }
}

export async function getAllNewsService(): Promise<NewsDocument[]> {
  try {
    return await getAllNews()
  } catch (error) {
    return []
  }
}

export async function getNewsByCategoryService(category: 'sports' | 'news' | 'general'): Promise<NewsDocument[]> {
  try {
    return await getNewsByCategory(category)
  } catch (error) {
    return []
  }
}
