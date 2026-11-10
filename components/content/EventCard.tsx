import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin } from 'lucide-react'
import type { Event } from '@/data/events'
import { excerpt, formatDate, isoDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import { NAV_FORWARD, SharedElement, transitionName } from '../motion/Transitions'
import Badge, { type BadgeTone } from '../ui/Badge'
import Card from '../ui/Card'

export const EVENT_CATEGORY: Record<Event['category'], { label: string; tone: BadgeTone }> = {
  academic: { label: 'Academic', tone: 'brand' },
  sports: { label: 'Sports', tone: 'gold' },
  cultural: { label: 'Cultural', tone: 'sky' },
  admission: { label: 'Admissions', tone: 'gold' },
  other: { label: 'School', tone: 'neutral' }
}

/** Calendar-leaf date block: day over month. */
export function DateBlock({ date, className }: { date: string; className?: string }) {
  return (
    <time
      dateTime={isoDate(date)}
      className={cn('flex h-[4.5rem] w-16 shrink-0 flex-col items-center justify-center rounded-md border border-line bg-paper text-center', className)}
    >
      <span className='numeral text-3xl text-ink'>{formatDate(date, 'day', '–')}</span>
      <span className='mt-1 text-xs font-semibold text-gold'>{formatDate(date, 'month')}</span>
    </time>
  )
}

export function EventMeta({ event, className }: { event: Event; className?: string }) {
  if (!event.time && !event.location) return null
  return (
    <p className={cn('flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-subtle', className)}>
      {event.time && (
        <span className='inline-flex items-center gap-1.5'>
          <Clock className='h-4 w-4' aria-hidden />
          {event.time}
        </span>
      )}
      {event.location && (
        <span className='inline-flex items-center gap-1.5'>
          <MapPin className='h-4 w-4' aria-hidden />
          {event.location}
        </span>
      )}
    </p>
  )
}

interface EventCardProps {
  event: Event
  /** `row` = date block + text, for timelines and lists */
  variant?: 'card' | 'row'
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export default function EventCard({ event, variant = 'card', headingLevel: Heading = 'h3', className }: EventCardProps) {
  const href = `/events/${event.id}`
  const category = EVENT_CATEGORY[event.category] ?? EVENT_CATEGORY.other

  if (variant === 'row') {
    return (
      <article className={cn('group relative flex gap-5 py-5', className)}>
        <DateBlock date={event.date} />
        <div className='min-w-0'>
          <Heading className='font-display text-lg leading-snug text-ink'>
            <Link href={href} transitionTypes={NAV_FORWARD} className='after:absolute after:inset-0 group-hover:text-brand'>
              {event.title}
            </Link>
          </Heading>
          <EventMeta event={event} className='mt-1.5' />
        </div>
      </article>
    )
  }

  return (
    <Card interactive className={className}>
      <SharedElement name={transitionName('event', event.id)}>
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-brand-800'>
          {event.image ? (
            <Image
              src={event.image}
              alt=''
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover transition-transform duration-slow ease-out group-hover/card:scale-[1.03]'
            />
          ) : (
            <div className='tessellate on-dark absolute inset-0' aria-hidden />
          )}
        </div>
      </SharedElement>
      <DateBlock date={event.date} className='absolute left-4 top-4 shadow-raised' />
      <Card.Body>
        <div className='mb-3 flex flex-wrap items-center gap-2'>
          <Badge tone={category.tone}>{category.label}</Badge>
          {event.registrationRequired && <Badge tone='neutral'>Registration required</Badge>}
        </div>
        <Heading className='font-display text-title text-ink'>
          <Link href={href} transitionTypes={NAV_FORWARD} className='after:absolute after:inset-0'>
            {event.title}
          </Link>
        </Heading>
        <p className='mt-2 line-clamp-2 text-ink-muted'>{excerpt(event.description ?? '', 130)}</p>
        <EventMeta event={event} className='mt-4' />
      </Card.Body>
    </Card>
  )
}
