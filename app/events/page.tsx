import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Stay updated with upcoming events, activities, and important dates at International Hope School Bangladesh.',
  openGraph: {
    title: 'Events | IHSB',
    description: 'Upcoming events and activities at International Hope School Bangladesh.'
  }
}

// TODO: Replace with actual event data from data/events.ts
const events = [
  {
    id: 1,
    title: 'Admissions Open Day',
    date: 'January 15, 2025',
    time: '10:00 AM - 2:00 PM',
    description:
      'Join us for a campus tour, meet our faculty, and learn about our academic programs.',
    image: '/assets/images/event-placeholder.jpg'
  },
  {
    id: 2,
    title: 'Science Fair 2025',
    date: 'February 20, 2025',
    time: '9:00 AM - 4:00 PM',
    description:
      'Students showcase their innovative science projects and experiments.',
    image: '/assets/images/event-placeholder.jpg'
  },
  {
    id: 3,
    title: 'Annual Sports Day',
    date: 'March 10, 2025',
    time: '8:00 AM - 5:00 PM',
    description:
      'Celebrate athletic achievements and school spirit at our annual sports day.',
    image: '/assets/images/event-placeholder.jpg'
  },
  {
    id: 4,
    title: 'Cultural Festival',
    date: 'April 5, 2025',
    time: '11:00 AM - 6:00 PM',
    description:
      'Experience the diverse cultures represented in our school community.',
    image: '/assets/images/event-placeholder.jpg'
  },
  {
    id: 5,
    title: 'Graduation Ceremony',
    date: 'May 25, 2025',
    time: '3:00 PM - 6:00 PM',
    description: 'Celebrate the achievements of our graduating class.',
    image: '/assets/images/event-placeholder.jpg'
  },
  {
    id: 6,
    title: 'Parent-Teacher Conference',
    date: 'June 10, 2025',
    time: '9:00 AM - 3:00 PM',
    description:
      'Opportunity for parents to meet with teachers and discuss student progress.',
    image: '/assets/images/event-placeholder.jpg'
  }
]

export default function EventsPage() {
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

          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {events.map((event) => (
              <Card
                key={event.id}
                image={{
                  src: event.image,
                  alt: event.title
                }}
              >
                <div className='text-sm text-primary-green-600 font-medium mb-2'>
                  {event.date}
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  {event.title}
                </h3>
                <p className='text-gray-600 text-sm mb-3'>
                  <span className='font-medium'>Time:</span> {event.time}
                </p>
                <p className='text-gray-700 mb-4'>{event.description}</p>
                <Button variant='outline' size='sm' className='w-full'>
                  Learn More
                </Button>
              </Card>
            ))}
          </div>

          {events.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-600 text-lg'>
                No upcoming events scheduled at this time. Please check back
                later.
              </p>
            </div>
          )}
        </div>
      </Section>
    </main>
  )
}
