import { getAllEvents, getAllEventsAdmin, getEventById, getEventByIdAdmin } from '../database/events'
import type { EventDocument } from '../database/events'
import { mockEvents } from '../mock/data'
import { Event } from '@/data/events'
import { fromSource } from './source'

export type { Event } from '@/data/events'

/**
 * Server-side service for events (Firestore or mock data, see ./source.ts).
 */
const byDateAsc = (events: Event[]) =>
  [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export async function getAllEventsService(): Promise<Event[]> {
  return fromSource('events.all', {
    real: getAllEvents,
    mock: () => byDateAsc(mockEvents),
    empty: []
  })
}

export async function getFeaturedEventsService(): Promise<Event[]> {
  return (await getAllEventsService()).filter((event) => event.featured)
}

export async function getUpcomingEventsService(limit?: number): Promise<Event[]> {
  const now = Date.now()
  const upcoming = (await getAllEventsService()).filter((event) => new Date(event.date).getTime() >= now)
  return limit ? upcoming.slice(0, limit) : upcoming
}

export async function getEventsByCategoryService(category: Event['category']): Promise<Event[]> {
  return (await getAllEventsService()).filter((event) => event.category === category)
}

export async function getEventByIdService(id: string): Promise<Event | null> {
  return fromSource('events.byId', {
    real: () => getEventById(id),
    mock: () => mockEvents.find((event) => event.id === id) ?? null,
    empty: null
  })
}

/** Full documents (with audit fields) for the admin dashboard. */
export async function getAllEventsAdminService(): Promise<EventDocument[]> {
  return fromSource<EventDocument[]>('events.allAdmin', {
    real: getAllEventsAdmin,
    mock: () => byDateAsc(mockEvents),
    empty: []
  })
}

export async function getEventByIdAdminService(id: string): Promise<EventDocument | null> {
  return fromSource<EventDocument | null>('events.byIdAdmin', {
    real: () => getEventByIdAdmin(id),
    mock: () => mockEvents.find((event) => event.id === id) ?? null,
    empty: null
  })
}
