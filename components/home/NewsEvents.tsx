import type { Event } from '@/data/events'
import type { NewsDocument } from '@/lib/database/news'
import EventCard from '../content/EventCard'
import NewsCard from '../content/NewsCard'
import Reveal from '../motion/Reveal'
import { ButtonLink } from '../ui/Button'
import EmptyState from '../ui/EmptyState'
import Section, { SectionHeader } from '../ui/Section'

export default function NewsEvents({ news, events }: { news: NewsDocument[]; events: Event[] }) {
  const [lead, ...rest] = news

  return (
    <Section background='canvas' aria-labelledby='news-heading'>
      <SectionHeader
        id='news-heading'
        title='News and events'
        description='What has happened at school lately, and what is coming up.'
        action={{ label: 'All news', href: '/news' }}
      />

      {lead ? (
        <Reveal>
          <NewsCard item={lead} variant='feature' />
        </Reveal>
      ) : (
        <EmptyState
          title='No news yet'
          description='Stories from the school community will appear here.'
          action={<ButtonLink href='/announcements' variant='outline'>Read announcements</ButtonLink>}
        />
      )}

      <div className='mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16'>
        <div>
          <h3 className='font-display text-display-3 text-ink'>More stories</h3>
          <div className='mt-2 divide-y divide-line border-y border-line'>
            {rest.length > 0 ? (
              rest.map((item) => <NewsCard key={item.id} item={item} variant='row' headingLevel='h3' />)
            ) : (
              <p className='py-6 text-ink-muted'>More stories will be published soon.</p>
            )}
          </div>
        </div>

        <div>
          <div className='flex items-end justify-between gap-4'>
            <h3 className='font-display text-display-3 text-ink'>Coming up</h3>
            <ButtonLink href='/events' variant='link'>
              Full calendar
            </ButtonLink>
          </div>
          <div className='mt-2 divide-y divide-line border-y border-line'>
            {events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} variant='row' />)
            ) : (
              <p className='py-6 text-ink-muted'>No events are scheduled right now. Check the calendar again soon.</p>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
