// data/events.ts
// Event shape shared by the public site, the admin dashboard and the data layer.
// Event content itself comes from lib/services/eventsService.ts (Firestore or mock data).

export interface Event {
  id: string
  title: string
  description: string
  date: string // ISO date string
  time?: string
  location?: string
  image?: string
  category: 'academic' | 'sports' | 'cultural' | 'admission' | 'other'
  featured?: boolean
  registrationRequired?: boolean
  registrationUrl?: string
}
