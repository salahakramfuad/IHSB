import { mockHighlights } from '../mock/data'
import { buildHighlights, type HighlightItem } from './highlightsBuilder'
import { getAllNews } from '../database/news'
import { getAllSportsAchievements } from '../database/sports'
import { fromSource } from './source'

export type { HighlightItem } from './highlightsBuilder'

/**
 * Get latest highlights combining sports achievements and news
 * Sorted by date (newest first)
 */
export async function getLatestHighlights(limit: number = 3): Promise<HighlightItem[]> {
  return fromSource('highlights.latest', {
    real: async () => {
      const [sports, news] = await Promise.all([getAllSportsAchievements(), getAllNews()])
      return buildHighlights(sports, news, limit)
    },
    mock: () => mockHighlights.slice(0, limit),
    empty: []
  })
}
