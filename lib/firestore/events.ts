import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { Event } from '@/data/events'

export interface EventDocument extends Omit<Event, 'date'> {
  date: Timestamp | string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  createdBy?: string
  createdByEmail?: string
  updatedBy?: string
  updatedByEmail?: string
}

// Convert Firestore document to Event
const docToEvent = (doc: any): Event => {
  const data = doc.data()
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
  const q = query(collection(db, 'events'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToEvent)
}

// Get all events with full document data (for admin use)
export const getAllEventsAdmin = async (): Promise<EventDocument[]> => {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as EventDocument))
}

// Get featured events
export const getFeaturedEvents = async (): Promise<Event[]> => {
  const q = query(
    collection(db, 'events'),
    where('featured', '==', true),
    orderBy('date', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToEvent)
}

// Get events by category
export const getEventsByCategory = async (category: Event['category']): Promise<Event[]> => {
  const q = query(
    collection(db, 'events'),
    where('category', '==', category),
    orderBy('date', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToEvent)
}

// Get upcoming events
export const getUpcomingEvents = async (): Promise<Event[]> => {
  const now = new Date()
  const q = query(
    collection(db, 'events'),
    orderBy('date', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs
    .map(docToEvent)
    .filter(event => new Date(event.date) >= now)
}

// Get single event (for public use)
export const getEventById = async (id: string): Promise<Event | null> => {
  const docRef = doc(db, 'events', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return docToEvent(docSnap)
}

// Get single event with full document data (for admin use)
export const getEventByIdAdmin = async (id: string): Promise<EventDocument | null> => {
  const docRef = doc(db, 'events', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return {
    id: docSnap.id,
    ...docSnap.data()
  } as EventDocument
}

// Create event
export const createEvent = async (eventData: Omit<Event, 'id'>, creatorEmail?: string): Promise<string> => {
  const eventRef = collection(db, 'events')
  const docRef = await addDoc(eventRef, {
    ...eventData,
    date: Timestamp.fromDate(new Date(eventData.date)),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    createdByEmail: creatorEmail || null,
    createdBy: creatorEmail || null
  })
  return docRef.id
}

// Update event
export const updateEvent = async (id: string, eventData: Partial<Event>, updaterEmail?: string): Promise<void> => {
  const docRef = doc(db, 'events', id)
  const updateData: any = {
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
  
  // Remove any undefined values
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === undefined) {
      delete updateData[key]
    }
  })
  
  await updateDoc(docRef, updateData)
}

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  const docRef = doc(db, 'events', id)
  await deleteDoc(docRef)
}
