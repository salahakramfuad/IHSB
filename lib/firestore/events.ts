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

// Get all events
export const getAllEvents = async (): Promise<Event[]> => {
  const q = query(collection(db, 'events'), orderBy('date', 'asc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(docToEvent)
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

// Get single event
export const getEventById = async (id: string): Promise<Event | null> => {
  const docRef = doc(db, 'events', id)
  const docSnap = await getDoc(docRef)
  
  if (!docSnap.exists()) {
    return null
  }
  
  return docToEvent(docSnap)
}

// Create event
export const createEvent = async (eventData: Omit<Event, 'id'>): Promise<string> => {
  const eventRef = collection(db, 'events')
  const docRef = await addDoc(eventRef, {
    ...eventData,
    date: Timestamp.fromDate(new Date(eventData.date)),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  })
  return docRef.id
}

// Update event
export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<void> => {
  const docRef = doc(db, 'events', id)
  const updateData: any = {
    ...eventData,
    updatedAt: Timestamp.now()
  }
  
  if (eventData.date) {
    updateData.date = Timestamp.fromDate(new Date(eventData.date))
  }
  
  await updateDoc(docRef, updateData)
}

// Delete event
export const deleteEvent = async (id: string): Promise<void> => {
  const docRef = doc(db, 'events', id)
  await deleteDoc(docRef)
}
