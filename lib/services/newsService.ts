import { getAllNews, getNewsById } from '../database/news'
import type { NewsCategory, NewsDocument } from '../database/news'
import { dateToMillis } from '../database/shared'
import { mockNews } from '../mock/data'
import { fromSource } from './source'

export type { NewsDocument, NewsCategory } from '../database/news'

/**
 * Server-side service for news (Firestore or mock data, see ./source.ts).
 */
const newestFirst = (items: NewsDocument[]) =>
  [...items].sort((a, b) => dateToMillis(b.date) - dateToMillis(a.date))

export async function getAllNewsService(): Promise<NewsDocument[]> {
  return fromSource('news.all', {
    real: getAllNews,
    mock: () => newestFirst(mockNews),
    empty: []
  })
}

export async function getLatestNewsService(limit: number = 10): Promise<NewsDocument[]> {
  return (await getAllNewsService()).slice(0, limit)
}

export async function getNewsByCategoryService(category: NewsCategory): Promise<NewsDocument[]> {
  return (await getAllNewsService()).filter((item) => item.category === category)
}

export async function getLatestSportsAndNewsService(limit: number = 3): Promise<NewsDocument[]> {
  return (await getAllNewsService())
    .filter((item) => item.category === 'sports' || item.category === 'news')
    .slice(0, limit)
}

export async function getNewsByIdService(id: string): Promise<NewsDocument | null> {
  return fromSource('news.byId', {
    real: () => getNewsById(id),
    mock: () => mockNews.find((item) => item.id === id) ?? null,
    empty: null
  })
}
