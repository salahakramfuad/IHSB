// data/events.ts
// Event data structure for easy content management

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

// Example events - replace with actual data
export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Admissions Open Day',
    description:
      'Join us for a campus tour, meet our faculty, and learn about our academic programs.',
    date: '2025-01-15',
    time: '10:00 AM - 2:00 PM',
    location: 'Main Campus',
    category: 'admission',
    featured: true,
    registrationRequired: true
  },
  {
    id: '2',
    title: 'Science Fair 2025',
    description:
      'Students showcase their innovative science projects and experiments.',
    date: '2025-02-20',
    time: '9:00 AM - 4:00 PM',
    category: 'academic',
    featured: true
  },
  {
    id: '3',
    title: 'Annual Sports Day',
    description:
      'Celebrate athletic achievements and school spirit at our annual sports day.',
    date: '2025-03-10',
    time: '8:00 AM - 5:00 PM',
    category: 'sports',
    featured: true
  }
]

export const pastEvents: Event[] = [
  // Add past events here
]

export function getFeaturedEvents(): Event[] {
  return upcomingEvents.filter((event) => event.featured)
}

export function getEventsByCategory(
  category: Event['category']
): Event[] {
  return upcomingEvents.filter((event) => event.category === category)
}

