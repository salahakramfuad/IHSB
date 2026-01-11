import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { getAllEvents } from '@/lib/firestore/events'
import type { Event } from '@/data/events'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Stay updated with upcoming events at IHSB - school functions, competitions, cultural programs, and special activities.',
  openGraph: {
    title: 'Events | IHSB',
    description: 'Discover upcoming events and activities at International Hope School Bangladesh.'
  }
}

export default async function EventsPage() {
  // Server-side fetch for better performance
  const events = await getAllEvents()
  return (
    <main className='min-h-screen bg-gray-50'>
      <Section background='green' className='bg-primary-green-600'>
        <div className='max-w-4xl mx-auto text-center text-white'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            Upcoming Events
          </h1>
          <p className='text-lg md:text-xl text-primary-green-50'>
            Stay updated with the latest events at International Hope School
            Bangladesh!
          </p>
        </div>
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          <PageHeader
            title='School Events & Activities'
            subtitle='Join us for these exciting upcoming events and activities'
          />

          {events.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-600 text-lg'>
                No upcoming events scheduled at this time. Please check back later.
              </p>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {events.map((event) => (
                <Card
                  key={event.id}
                  image={event.image ? {
                    src: event.image,
                    alt: event.title
                  } : undefined}
                >
                  <div className='text-sm text-primary-green-600 font-medium mb-2'>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-2'>
                    {event.title}
                  </h3>
                  {event.time && (
                    <p className='text-gray-600 text-sm mb-3'>
                      <span className='font-medium'>Time:</span> {event.time}
                    </p>
                  )}
                  {event.location && (
                    <p className='text-gray-600 text-sm mb-3'>
                      <span className='font-medium'>Location:</span> {event.location}
                    </p>
                  )}
                  <p className='text-gray-700 mb-4'>{event.description}</p>
                  <Link href={`/events/${event.id}`}>
                    <Button variant='outline' size='sm' className='w-full'>
                      View Details
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
