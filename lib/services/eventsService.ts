import { getFeaturedEvents, getUpcomingEvents } from '../database/events'
import { Event } from '@/data/events'

export type { Event } from '@/data/events'

/**
 * Server-side service for events
 * Provides clean interface for data fetching
 */
export async function getFeaturedEventsService(): Promise<Event[]> {
  try {
    return await getFeaturedEvents()
  } catch (error) {
    return []
  }
}

export async function getUpcomingEventsService(): Promise<Event[]> {
  try {
    return await getUpcomingEvents()
  } catch (error) {
    return []
  }
}
