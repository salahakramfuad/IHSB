import Link from 'next/link'
import { getAllEvents } from '@/lib/firestore/events'
import type { Event } from '@/data/events'
import Card from './ui/Card'
import Button from './ui/Button'
import ImageWithLightbox from './ImageWithLightbox'

interface EventsServerProps {
  limit?: number
}

/**
 * Server-side component for Events section
 * Fetches latest events from Firestore
 */
export default async function EventsServer({ limit = 3 }: EventsServerProps) {
  try {
    const allEvents = await getAllEvents()
    
    // Filter upcoming events and sort by date
    const now = new Date()
    const upcomingEvents = allEvents
      .filter(event => {
        const eventDate = new Date(event.date)
        return eventDate >= now
      })
      .sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA.getTime() - dateB.getTime()
      })
      .slice(0, limit)

    // If no upcoming events, show featured or latest events
    const events = upcomingEvents.length > 0 
      ? upcomingEvents 
      : allEvents
          .filter(event => event.featured)
          .slice(0, limit)

    if (events.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No events available at this time.</p>
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
        {events.map((event, idx) => (
          <Card
            key={event.id}
            image={event.image ? {
              src: event.image,
              alt: event.title
            } : undefined}
            className='group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
          >
            <div className='text-sm text-primary-green-600 font-medium mb-2'>
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {event.time && (
              <p className='text-gray-600 text-sm mb-2'>
                <span className='font-medium'>Time:</span> {event.time}
              </p>
            )}
            <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-green-600 transition-colors'>
              {event.title}
            </h3>
            {event.location && (
              <p className='text-gray-600 text-sm mb-3'>
                <span className='font-medium'>Location:</span> {event.location}
              </p>
            )}
            <p className='text-gray-700 mb-4 line-clamp-3'>{event.description}</p>
            <Link href={`/events/${event.id}`}>
              <Button variant='outline' size='sm' className='w-full'>
                View Details
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error in EventsServer:', error)
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading events. Please try again later.</p>
      </div>
    )
  }
}
