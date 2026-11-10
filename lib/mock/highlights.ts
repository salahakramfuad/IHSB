import { buildHighlights, type HighlightItem } from '@/lib/services/highlightsBuilder'
import { mockNews } from './news'
import { mockSports } from './sports'

/** Latest sports achievements and news combined, newest first. */
export const mockHighlights: HighlightItem[] = buildHighlights(mockSports, mockNews, mockSports.length + mockNews.length)
