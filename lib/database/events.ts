import { Timestamp } from 'firebase-admin/firestore'
import type { DocumentData, DocumentSnapshot } from 'firebase-admin/firestore'
import { adminDb } from '../integrations/firebase/admin'
import { Event } from '@/data/events'
import { cleanForWrite, withId } from './shared'

export interface EventDocument extends Omit<Event, 'date'> {
  date: Timestamp | string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

const events = () => adminDb.collection('events')

// Convert Firestore document to Event
const docToEvent = (doc: DocumentSnapshot<DocumentData>): Event => {
  const data = doc.data() || {}
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    date: data.date?.toDate?.().toISOString() || data.date,
    time: data.time,
    location: data.location,
    image: data.image,
    category: data.category,
    featured: data.featured || false,
    registrationRequired: data.registrationRequired || false,
    registrationUrl: data.registrationUrl
  }
}

// Get all events (for public use - returns Event type)
export const getAllEvents = async (): Promise<Event[]> => {
  const snapshot = await events().orderBy('date', 'asc').get()
  return snapshot.docs.map(docToEvent)
}

// Get all events with full document data (for admin use)
export const getAllEventsAdmin = async (): Promise<EventDocument[]> => {
  const snapshot = await events().orderBy('date', 'asc').get()
  return snapshot.docs.map((doc) => withId<EventDocument>(doc))
}

// Get featured events
export const getFeaturedEvents = async (): Promise<Event[]> => {
  const all = await getAllEvents()
  return all.filter((event) => event.featured)
}

// Get events by category
export const getEventsByCategory = async (category: Event['category']): Promise<Event[]> => {
  const all = await getAllEvents()
  return all.filter((event) => event.category === category)
}

// Get upcoming events
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const now = new Date()
  const all = await getAllEvents()
  return all.filter((event) => new Date(event.date) >= now)
}

// Get single event (for public use)
export const getEventById = async (id: string): Promise<Event | null> => {
  const snap = await events().doc(id).get()
  return snap.exists ? docToEvent(snap) : null
}

// Get single event with full document data (for admin use)
export const getEventByIdAdmin = async (id: string): Promise<EventDocument | null> => {
  const snap = await events().doc(id).get()
  return snap.exists ? withId<EventDocument>(snap) : null
}

// Create event
export const createEvent = async (eventData: Omit<Event, 'id'>, creatorEmail?: string): Promise<string> => {
  const docRef = await events().add(
    cleanForWrite({
      ...eventData,
      date: Timestamp.fromDate(new Date(eventData.date)),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdByEmail: creatorEmail || null,
      createdBy: creatorEmail || null
    })
  )
  return docRef.id
}

// Update event
export const updateEvent = async (id: string, eventData: Partial<Event>, updaterEmail?: string): Promise<void> => {
  const updateData: Record<string, unknown> = {
    ...eventData,
    updatedAt: Timestamp.now()
  }

  if (eventData.date) {
    updateData.date = Timestamp.fromDate(new Date(eventData.date))
  }

  if (updaterEmail) {
    updateData.updatedByEmail = updaterEmail
    updateData.updatedBy = updaterEmail
  }

  await events().doc(id).update(cleanForWrite(updateData))
}

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  await events().doc(id).delete()
}
