import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarPlus, Clock, Download, MapPin } from 'lucide-react'
import { EVENT_CATEGORY } from '@/components/content/EventCard'
import { NAV_BACK, PageTransition, SharedElement, transitionName } from '@/components/motion/Transitions'
import Badge from '@/components/ui/Badge'
import { ButtonLink, buttonStyles } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { Event } from '@/data/events'
import { schoolInfo } from '@/data/schoolInfo'
import { excerpt, formatDate, isoDate } from '@/lib/format'
import { getEventByIdService } from '@/lib/services/eventsService'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const event = await getEventByIdService(id)
  if (!event) return { title: 'Event not found', robots: { index: false } }
  const description = excerpt(event.description ?? '', 160)
  return {
    title: event.title,
    description,
    alternates: { canonical: `/events/${id}` },
    openGraph: { title: event.title, description, ...(event.image ? { images: [{ url: event.image }] } : {}) }
  }
}

/** Calendar links. The school does not store end times, so events are added as all-day entries. */
function calendarLinks(event: Event) {
  const start = new Date(event.date)
  const day = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '')
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000)
  const details = [event.time ? `Time: ${event.time}` : '', event.description].filter(Boolean).join('\n\n')
  const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')

  const google = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${day(start)}/${day(end)}`,
    details,
    location: event.location ?? ''
  })}`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//IHSB//Events//EN',
    'BEGIN:VEVENT',
    `UID:${event.id}@ihsb.edu.bd`,
    `DTSTAMP:${day(start)}T000000Z`,
    `DTSTART;VALUE=DATE:${day(start)}`,
    `DTEND;VALUE=DATE:${day(end)}`,
    `SUMMARY:${escape(event.title)}`,
    `DESCRIPTION:${escape(details)}`,
    event.location ? `LOCATION:${escape(event.location)}` : '',
    'END:VEVENT',
    'END:VCALENDAR'
  ]
    .filter(Boolean)
    .join('\r\n')

  return { google, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` }
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const event = await getEventByIdService(id)
  if (!event) notFound()

  const category = EVENT_CATEGORY[event.category] ?? EVENT_CATEGORY.other
  const isPast = new Date(event.date).getTime() < Date.now()
  const links = calendarLinks(event)
  const registrationHref = event.registrationUrl || '/contact'
  const externalRegistration = /^https?:\/\//.test(registrationHref)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: isoDate(event.date),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: { '@type': 'Place', name: event.location ?? schoolInfo.name, address: schoolInfo.address.main },
    organizer: { '@type': 'Organization', name: schoolInfo.name, url: schoolInfo.website },
    ...(event.image ? { image: [event.image] } : {})
  }

  return (
    <PageTransition>
      <article>
        <PageHeader
          title={event.title}
          eyebrow={<time dateTime={isoDate(event.date)}>{formatDate(event.date, 'weekday')}</time>}
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events', href: '/events' }, { label: 'Event' }]}
          patternSeed={23}
        >
          <div className='mt-6 flex flex-wrap gap-2'>
            <Badge tone='solid'>{category.label}</Badge>
            {isPast && <Badge tone='solid'>This event has taken place</Badge>}
          </div>
        </PageHeader>

        <Section background='canvas' spacing='sm'>
          <div className='grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16'>
            <div>
              {event.image && (
                <SharedElement name={transitionName('event', event.id)}>
                  <div className='relative mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-sunken'>
                    <Image src={event.image} alt='' fill priority sizes='(max-width: 1024px) 100vw, 60vw' className='object-cover' />
                  </div>
                </SharedElement>
              )}
              <h2 className='font-display text-display-3 text-ink'>About this event</h2>
              <div className='prose-ihsb mt-4'>
                {(event.description ?? '').split(/\n{2,}/).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className='mt-10'>
                <Link href='/events' transitionTypes={NAV_BACK} className='link-underline inline-flex items-center gap-2 font-semibold text-brand'>
                  <ArrowLeft className='h-4 w-4' aria-hidden />
                  All events
                </Link>
              </p>
            </div>

            <aside aria-label='Event details' className='h-fit rounded-xl border border-line bg-paper p-6 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]'>
              <dl className='space-y-5'>
                <div>
                  <dt className='text-sm text-ink-subtle'>Date</dt>
                  <dd className='mt-1 font-display text-title text-ink'>{formatDate(event.date, 'long')}</dd>
                </div>
                {event.time && (
                  <div>
                    <dt className='flex items-center gap-2 text-sm text-ink-subtle'>
                      <Clock className='h-4 w-4' aria-hidden />
                      Time
                    </dt>
                    <dd className='mt-1 text-ink'>{event.time}</dd>
                  </div>
                )}
                {event.location && (
                  <div>
                    <dt className='flex items-center gap-2 text-sm text-ink-subtle'>
                      <MapPin className='h-4 w-4' aria-hidden />
                      Place
                    </dt>
                    <dd className='mt-1 text-ink'>{event.location}</dd>
                  </div>
                )}
              </dl>

              {!isPast && (
                <div className='mt-7 space-y-3 border-t border-line pt-6'>
                  {event.registrationRequired && (
                    <ButtonLink
                      href={registrationHref}
                      variant='secondary'
                      className='w-full'
                      {...(externalRegistration ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      Register for this event
                    </ButtonLink>
                  )}
                  <a
                    href={links.google}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={buttonStyles({ variant: 'outline', className: 'w-full' })}
                  >
                    <CalendarPlus className='h-4 w-4' aria-hidden />
                    Add to Google Calendar
                    <span className='sr-only'> (opens in a new tab)</span>
                  </a>
                  <a href={links.ics} download={`${event.id}.ics`} className={buttonStyles({ variant: 'ghost', className: 'w-full' })}>
                    <Download className='h-4 w-4' aria-hidden />
                    Download calendar file (.ics)
                  </a>
                </div>
              )}
            </aside>
          </div>
        </Section>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </article>
    </PageTransition>
  )
}
