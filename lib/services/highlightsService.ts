import { getAllNews } from '../database/news'
import { getAllSportsAchievements } from '../database/sports'
import { NewsDocument } from '../database/news'
import { SportsAchievementDocument } from '../database/sports'
import { Timestamp } from 'firebase/firestore'

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

/**
 * Get latest highlights combining sports achievements and news
 * Sorted by date (newest first)
 */
export async function getLatestHighlights(limit: number = 3): Promise<HighlightItem[]> {
  try {
    // Fetch both sports achievements and news
    const [sportsAchievements, news] = await Promise.all([
      getAllSportsAchievements(),
      getAllNews()
    ])

    // Convert sports achievements to highlight items
    const sportsItems: HighlightItem[] = sportsAchievements
      .filter(achievement => {
        // Only include achievements with valid images
        const hasImage = achievement.image && typeof achievement.image === 'string' && achievement.image.trim() !== ''
        const hasPhotos = achievement.photos && achievement.photos.length > 0 && achievement.photos.some(p => p && typeof p === 'string' && p.trim() !== '')
        return hasImage || hasPhotos
      })
      .map(achievement => {
        const validImage = achievement.image && typeof achievement.image === 'string' && achievement.image.trim() !== ''
          ? achievement.image 
          : (achievement.photos && achievement.photos.length > 0 
              ? achievement.photos.find(p => p && typeof p === 'string' && p.trim() !== '') || '' 
              : '')
        
        return {
          id: achievement.id || '',
          title: achievement.title || '',
          description: achievement.description || '',
          image: validImage,
          date: achievement.date || (achievement.createdAt ? achievement.createdAt : new Date().toISOString()),
          type: 'sports' as const,
          slug: achievement.slug
        }
      })
      .filter(item => item.image && item.image.trim() !== '' && item.title) // Filter out items with empty images or titles

    // Convert news to highlight items
    const newsItems: HighlightItem[] = news
      .filter(item => {
        // Only include news with valid images and title
        const hasPhotos = item.photos && Array.isArray(item.photos) && item.photos.length > 0 && item.photos.some(p => p && typeof p === 'string' && p.trim() !== '')
        return hasPhotos && item.title && item.title.trim() !== ''
      })
      .map(item => {
        const validPhotos = item.photos?.filter(p => p && typeof p === 'string' && p.trim() !== '') || []
        return {
          id: item.id || '',
          title: item.title || '',
          description: item.description || '',
          image: validPhotos.length > 0 ? validPhotos[0] : '',
          date: item.date,
          type: 'news' as const,
          category: item.category,
          photos: validPhotos.length > 1 ? validPhotos : undefined // Only store if more than 1 photo
        }
      })
      .filter(item => item.image && item.image.trim() !== '' && item.title) // Filter out items with empty images or titles

    // Combine and sort by date (newest first)
    const allItems = [...sportsItems, ...newsItems]
    
    const sortedItems = allItems.sort((a, b) => {
      const getDateValue = (date: any): number => {
        if (!date) return 0
        if (date instanceof Timestamp) return date.toMillis()
        if (date.seconds) return date.seconds * 1000 + (date.nanoseconds || 0) / 1000000
        if (date.toDate) return date.toDate().getTime()
        if (typeof date === 'string') {
          // Handle ISO date strings
          return new Date(date).getTime()
        }
        if (date instanceof Date) return date.getTime()
        return 0
      }
      
      return getDateValue(b.date) - getDateValue(a.date)
    })

    // Return the latest N items
    return sortedItems.slice(0, limit)
  } catch (error) {
    console.error('Error fetching highlights:', error)
    return []
  }
}
