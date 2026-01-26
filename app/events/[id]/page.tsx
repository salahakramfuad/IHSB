import Image from 'next/image'
import Link from 'next/link'
import { getEventById } from '@/lib/database/events'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import ImageWithLightbox from '@/components/shared/ImageWithLightbox'
import type { Event } from '@/data/events'

export default async function EventDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id: eventId } = await params
  // Server-side fetch for better performance
  const event = await getEventById(eventId)

  if (!event) {
    return (
      <main className='min-h-screen bg-gray-50'>
        <Section background='gray'>
          <div className='max-w-4xl mx-auto text-center py-12'>
            <h1 className='text-2xl font-semibold mb-4'>Event not found</h1>
            <p className='text-gray-600 mb-6'>The event you're looking for doesn't exist.</p>
            <Link href='/events'>
              <Button variant='primary'>Back to Events</Button>
            </Link>
          </div>
        </Section>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-gray-50'>
      <Section background='green' className='bg-primary-green-600'>
        <div className='max-w-4xl mx-auto text-white'>
          <Link href='/events' className='inline-block mb-4 text-white/80 hover:text-white'>
            ← Back to Events
          </Link>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{event.title}</h1>
          <div className='flex flex-wrap gap-4 text-lg'>
            <div>
              <span className='font-semibold'>Date:</span>{' '}
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {event.time && (
              <div>
                <span className='font-semibold'>Time:</span> {event.time}
              </div>
            )}
            {event.location && (
              <div>
                <span className='font-semibold'>Location:</span> {event.location}
              </div>
            )}
          </div>
        </div>
      </Section>

      <Section background='gray'>
        <div className='max-w-4xl mx-auto'>
          {event.image && event.image.trim() !== '' && (
            <div className='relative h-96 w-full rounded-lg overflow-hidden mb-8'>
              <ImageWithLightbox
                src={event.image}
                alt={event.title}
                fill
                className='object-cover'
              />
            </div>
          )}

          <div className='bg-white rounded-lg border border-gray-200 p-8'>
            <div className='flex flex-wrap gap-2 mb-6'>
              <span className='px-3 py-1 bg-primary-green-100 text-primary-green-800 rounded-full text-sm font-medium'>
                {event.category}
              </span>
              {event.featured && (
                <span className='px-3 py-1 bg-accent-yellow-100 text-accent-yellow-800 rounded-full text-sm font-medium'>
                  Featured
                </span>
              )}
              {event.registrationRequired && (
                <span className='px-3 py-1 bg-accent-blue-100 text-accent-blue-800 rounded-full text-sm font-medium'>
                  Registration Required
                </span>
              )}
            </div>

            <div className='prose max-w-none'>
              <p className='text-lg text-gray-700 leading-relaxed mb-6'>
                {event.description}
              </p>
            </div>

            {event.registrationRequired && event.registrationUrl && (
              <div className='mt-8 pt-8 border-t border-gray-200'>
                <a
                  href={event.registrationUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Button variant='primary' size='lg' className='w-full sm:w-auto'>
                    Register Now
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>
    </main>
  )
}
