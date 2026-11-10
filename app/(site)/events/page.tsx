import type { Metadata } from 'next'
import { CalendarDays } from 'lucide-react'
import EventCard, { EVENT_CATEGORY } from '@/components/content/EventCard'
import FilterBar from '@/components/content/FilterBar'
import { PageTransition } from '@/components/motion/Transitions'
import { Tag } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { Event } from '@/data/events'
import { formatDate } from '@/lib/format'
import { getAllEventsService } from '@/lib/services/eventsService'

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Stay updated with upcoming and past events at IHSB - school functions, competitions, cultural programs, and special activities.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events | IHSB',
    description: 'Discover upcoming and past events and activities at International Hope School Bangladesh.'
  }
}

const CATEGORIES = Object.keys(EVENT_CATEGORY) as Array<Event['category']>
const monthKey = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' })

function groupByMonth(events: Event[]) {
  const groups = new Map<string, Event[]>()
  for (const event of events) {
    const key = monthKey.format(new Date(event.date))
    groups.set(key, [...(groups.get(key) ?? []), event])
  }
  return [...groups.entries()]
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: Promise<{ category?: string; view?: string }>
}) {
  const { category: requested, view: requestedView } = await searchParams
  const category = CATEGORIES.find((value) => value === requested)
  const view = requestedView === 'calendar' ? 'calendar' : 'list'

  const all = await getAllEventsService()
  const events = category ? all.filter((event) => event.category === category) : all
  const now = Date.now()
  const upcoming = events.filter((event) => new Date(event.date).getTime() >= now)
  const past = events.filter((event) => new Date(event.date).getTime() < now).reverse()

  const viewHref = (value: 'list' | 'calendar') => {
    const query = new URLSearchParams()
    if (category) query.set('category', category)
    if (value === 'calendar') query.set('view', 'calendar')
    const search = query.toString()
    return search ? `/events?${search}` : '/events'
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title='Events'
          subtitle='Open days, fairs, matches, ceremonies and festivals across our campuses.'
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Events' }]}
          patternSeed={23}
        />

        <Section background='canvas' spacing='sm' aria-labelledby='upcoming-heading'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <FilterBar
              label='Filter events by category'
              basePath='/events'
              param='category'
              selected={category}
              allLabel='All events'
              keep={{ view: view === 'calendar' ? 'calendar' : undefined }}
              options={CATEGORIES.map((value) => ({ value, label: EVENT_CATEGORY[value].label }))}
            />
            <nav aria-label='Choose a layout'>
              <ul className='flex gap-2'>
                <li>
                  <Tag href={viewHref('list')} selected={view === 'list'}>
                    Cards
                  </Tag>
                </li>
                <li>
                  <Tag href={viewHref('calendar')} selected={view === 'calendar'}>
                    By month
                  </Tag>
                </li>
              </ul>
            </nav>
          </div>

          <h2 id='upcoming-heading' className='mt-12 font-display text-display-3 text-ink'>
            Upcoming
          </h2>
          <div className='gold-rule mt-4 w-24' aria-hidden />

          {upcoming.length === 0 ? (
            <EmptyState
              className='mt-8'
              icon={<CalendarDays className='h-6 w-6' />}
              title={category ? 'Nothing scheduled in this category' : 'No upcoming events'}
              description='New dates are added as they are confirmed. The academic calendar has term dates and holidays.'
              action={
                <ButtonLink href={category ? '/events' : '/academics/calendar'} variant='outline'>
                  {category ? 'Show all events' : 'Open the academic calendar'}
                </ButtonLink>
              }
            />
          ) : view === 'calendar' ? (
            <div className='mt-8 space-y-10'>
              {groupByMonth(upcoming).map(([month, monthEvents]) => (
                <section key={month} aria-label={month} className='grid gap-4 md:grid-cols-[12rem_minmax(0,1fr)]'>
                  <h3 className='font-display text-title text-gold'>{month}</h3>
                  <div className='divide-y divide-line border-y border-line'>
                    {monthEvents.map((event) => (
                      <EventCard key={event.id} event={event} variant='row' headingLevel='h3' />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <ul className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {upcoming.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} className='h-full' />
                </li>
              ))}
            </ul>
          )}
        </Section>

        {past.length > 0 && (
          <Section background='sunken' spacing='sm' aria-labelledby='past-heading'>
            <h2 id='past-heading' className='font-display text-display-3 text-ink'>
              Past events
            </h2>
            <div className='gold-rule mt-4 w-24' aria-hidden />
            <ul className='mt-6 grid gap-x-12 md:grid-cols-2'>
              {past.map((event) => (
                <li key={event.id} className='border-b border-line'>
                  <EventCard event={event} variant='row' />
                </li>
              ))}
            </ul>
            <p className='mt-6 text-sm text-ink-subtle'>
              Showing {past.length} past {past.length === 1 ? 'event' : 'events'}, most recent first
              {past[past.length - 1] ? `, back to ${formatDate(past[past.length - 1].date, 'long')}` : ''}.
            </p>
          </Section>
        )}
      </div>
    </PageTransition>
  )
}
