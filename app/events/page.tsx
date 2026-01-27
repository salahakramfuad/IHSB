import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CalendarDays } from 'lucide-react'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { getAllEvents } from '@/lib/database/events'
import type { Event } from '@/data/events'

const BANNER_PATTERN = `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#ffffff" fill-opacity="0.06"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')}")`

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Stay updated with upcoming and past events at IHSB - school functions, competitions, cultural programs, and special activities.',
  openGraph: {
    title: 'Events | IHSB',
    description: 'Discover upcoming and past events and activities at International Hope School Bangladesh.'
  }
}

function splitByDate(events: Event[]) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming: Event[] = []
  const past: Event[] = []
  for (const e of events) {
    const d = new Date(e.date)
    d.setHours(0, 0, 0, 0)
    if (d >= today) upcoming.push(e)
    else past.push(e)
  }
  past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return { upcoming, past }
}

function EventCard({ event }: { event: Event }) {
  return (
    <Card
      image={event.image ? { src: event.image, alt: event.title } : undefined}
    >
      <div className='text-sm text-primary-green-600 font-medium mb-2'>
        {new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
      <h3 className='text-lg font-bold text-gray-900 mb-2'>{event.title}</h3>
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
      <p className='text-gray-700 mb-4 line-clamp-3'>{event.description}</p>
      <Link href={`/events/${event.id}`}>
        <Button variant='outline' size='sm' className='w-full'>
          View Details
        </Button>
      </Link>
    </Card>
  )
}

export default async function EventsPage() {
  const events = await getAllEvents()
  const { upcoming, past } = splitByDate(events)

  return (
    <main className='min-h-screen bg-gradient-to-b from-primary-50/60 via-white to-secondary-50/50'>
      {/* Banner */}
      <section className='relative overflow-hidden bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white'>
        <div
          className='absolute inset-0 opacity-40'
          style={{ backgroundImage: BANNER_PATTERN, backgroundSize: '60px 60px' }}
          aria-hidden
        />
        <div className='container relative z-10 mx-auto px-4 py-8 sm:px-6 sm:py-10'>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/15'>
              <CalendarDays className='h-4 w-4 text-white' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>
              Events
            </h1>
            <p className='mt-2 text-sm text-white/90 sm:text-base'>
              Upcoming and past events at International Hope School Bangladesh
            </p>
            <div className='mt-3 flex flex-wrap items-center justify-center gap-2'>
              <span className='inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium'>
                <span className='h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse' aria-hidden />
                {upcoming.length} upcoming
              </span>
              <span className='inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-white/80'>
                {past.length} past
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
            Upcoming Events
          </h2>
          <p className='text-gray-600 mb-8'>
            Join us for these events happening soon.
          </p>
          {upcoming.length === 0 ? (
            <div className='text-center py-12 rounded-xl bg-white/60 border border-gray-200'>
              <p className='text-gray-600 text-lg'>
                No upcoming events scheduled at this time. Please check back later.
              </p>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Past Events */}
      <Section background='white'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
            Past Events
          </h2>
          <p className='text-gray-600 mb-8'>
            A look back at recent events and activities.
          </p>
          {past.length === 0 ? (
            <div className='text-center py-12 rounded-xl bg-gray-50/80 border border-gray-200'>
              <p className='text-gray-600 text-lg'>
                No past events to display yet.
              </p>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
