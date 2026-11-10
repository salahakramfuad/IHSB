import type { Timestamp } from 'firebase-admin/firestore'
import type { NewsDocument } from '../database/news'
import type { SportsAchievementDocument } from '../database/sports'
import { dateToMillis } from '../database/shared'

export interface HighlightItem {
  id: string
  title: string
  description: string
  image: string
  date: Timestamp | string | Date
  type: 'sports' | 'news'
  slug?: string // For sports achievements
  category?: string // For news
  photos?: string[] // For news items with multiple photos
}

const validUrl = (value: unknown): value is string => typeof value === 'string' && value.trim() !== ''

/**
 * Combine sports achievements and news into one list of highlights,
 * newest first. Items without a title or an image are skipped.
 */
export function buildHighlights(
  sports: SportsAchievementDocument[],
  news: NewsDocument[],
  limit: number
): HighlightItem[] {
  const sportsItems: HighlightItem[] = sports.map((achievement) => ({
    id: achievement.id || '',
    title: achievement.title || '',
    description: achievement.description || '',
    image: validUrl(achievement.image) ? achievement.image : (achievement.photos || []).find(validUrl) || '',
    date: achievement.date || achievement.createdAt || new Date().toISOString(),
    type: 'sports' as const,
    slug: achievement.slug
  }))

  const newsItems: HighlightItem[] = news.map((item) => {
    const photos = (Array.isArray(item.photos) ? item.photos : []).filter(validUrl)
    return {
      id: item.id || '',
      title: (item.title || '').trim(),
      description: item.description || '',
      image: photos[0] || '',
      date: item.date,
      type: 'news' as const,
      category: item.category,
      photos: photos.length > 1 ? photos : undefined
    }
  })

  return [...sportsItems, ...newsItems]
    .filter((item) => item.image && item.title)
    .sort((a, b) => dateToMillis(b.date) - dateToMillis(a.date))
    .slice(0, limit)
}
