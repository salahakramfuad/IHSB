import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { EVENT_CATEGORY } from '@/components/content/EventCard'
import Badge from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { Event } from '@/data/events'
import { cn } from '@/lib/utils'
import { getAllEventsService } from '@/lib/services/eventsService'

export const metadata: Metadata = {
  title: 'Academic Calendar',
  description:
    'View the academic calendar for International Hope School Bangladesh - important dates, holidays, exams, and events throughout the academic year.',
  alternates: { canonical: '/academics/calendar' },
  openGraph: {
    title: 'Academic Calendar | IHSB',
    description: 'Stay updated with all important dates and events in the IHSB academic calendar.'
  }
}

const TIME_ZONE = 'Asia/Dhaka'
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

/** National days observed every year on a fixed date. */
const NATIONAL_DAYS: Array<{ month: number; day: number; title: string }> = [
  { month: 2, day: 21, title: 'International Mother Language Day' },
  { month: 3, day: 26, title: 'Independence Day' },
  { month: 4, day: 14, title: 'Pohela Boishakh (Bengali New Year)' },
  { month: 5, day: 1, title: 'May Day' },
  { month: 12, day: 16, title: 'Victory Day' }
]

interface Entry {
  day: number
  title: string
  kind: 'holiday' | Event['category']
  href?: string
}

const dhakaParts = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE, year: 'numeric', month: 'numeric', day: 'numeric' })
function dhakaDate(date: Date) {
  const parts = Object.fromEntries(dhakaParts.formatToParts(date).map((part) => [part.type, Number(part.value)]))
  return { year: parts.year, month: parts.month, day: parts.day }
}

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ year?: string }> }) {
  const today = dhakaDate(new Date())
  const { year: requested } = await searchParams
  const parsed = Number(requested)
  const year = Number.isInteger(parsed) && Math.abs(parsed - today.year) <= 5 ? parsed : today.year

  const events = await getAllEventsService()
  const byMonth: Entry[][] = Array.from({ length: 12 }, () => [])
  for (const holiday of NATIONAL_DAYS) {
    byMonth[holiday.month - 1].push({ day: holiday.day, title: holiday.title, kind: 'holiday' })
  }
  for (const event of events) {
    const date = dhakaDate(new Date(event.date))
    if (date.year !== year) continue
    byMonth[date.month - 1].push({ day: date.day, title: event.title, kind: event.category, href: `/events/${event.id}` })
  }
  byMonth.forEach((entries) => entries.sort((a, b) => a.day - b.day))

  const yearLink = (value: number) => (value === today.year ? '/academics/calendar' : `/academics/calendar?year=${value}`)

  return (
    <>
      <PageHeader
        title='Academic calendar'
        subtitle={`School events and national holidays for ${year}. Examination timetables are sent to parents by each section.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }, { label: 'Academic calendar' }]}
        patternSeed={13}
      />

      <Section background='canvas' spacing='sm' aria-label={`Calendar for ${year}`}>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <nav aria-label='Choose a year' className='flex items-center gap-3'>
            <Link href={yearLink(year - 1)} scroll={false} className={buttonStyles({ variant: 'outline', size: 'sm' })}>
              <ChevronLeft className='h-4 w-4' aria-hidden />
              {year - 1}
            </Link>
            <p className='numeral px-2 text-4xl text-ink' aria-current='true'>
              {year}
            </p>
            <Link href={yearLink(year + 1)} scroll={false} className={buttonStyles({ variant: 'outline', size: 'sm' })}>
              {year + 1}
              <ChevronRight className='h-4 w-4' aria-hidden />
            </Link>
          </nav>
          <ul aria-label='Legend' className='flex flex-wrap gap-2'>
            <li>
              <Badge tone='sky'>National holiday</Badge>
            </li>
            <li>
              <Badge tone='brand'>School event</Badge>
            </li>
            <li>
              <Badge tone='gold'>Today</Badge>
            </li>
          </ul>
        </div>

        <ol className='mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {MONTHS.map((name, monthIndex) => {
            const firstWeekday = new Date(Date.UTC(year, monthIndex, 1)).getUTCDay()
            const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate()
            const entries = byMonth[monthIndex]
            const marked = new Map(entries.map((entry) => [entry.day, entry.kind]))
            const isCurrentMonth = today.year === year && today.month === monthIndex + 1

            return (
              <li key={name} className={cn('rounded-xl border bg-paper p-6', isCurrentMonth ? 'border-gold-500' : 'border-line')}>
                <h2 className='font-display text-title text-ink'>
                  {name} <span className='text-ink-subtle'>{year}</span>
                </h2>

                {/* Decorative month grid; the list below carries the same information as text */}
                <div className='mt-4 grid grid-cols-7 gap-y-1 text-center text-sm' aria-hidden>
                  {WEEKDAYS.map((weekday) => (
                    <span key={weekday} className='pb-1 text-xs font-medium text-ink-subtle'>
                      {weekday}
                    </span>
                  ))}
                  {Array.from({ length: firstWeekday }, (_, i) => (
                    <span key={`blank-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1
                    const kind = marked.get(day)
                    const isToday = isCurrentMonth && today.day === day
                    return (
                      <span
                        key={day}
                        className={cn(
                          'mx-auto flex h-8 w-8 items-center justify-center rounded-full tabular-nums text-ink-muted',
                          kind === 'holiday' && 'bg-sky-100 font-semibold text-sky-800 dark:bg-sky-900/70 dark:text-sky-200',
                          kind && kind !== 'holiday' && 'bg-brand-100 font-semibold text-brand-800 dark:bg-brand-800/70 dark:text-brand-100',
                          isToday && 'bg-gold-400 font-semibold text-brand-950'
                        )}
                      >
                        {day}
                      </span>
                    )
                  })}
                </div>

                {entries.length > 0 ? (
                  <ul className='mt-5 space-y-2 border-t border-line pt-4 text-[0.9375rem]'>
                    {entries.map((entry, index) => (
                      <li key={`${entry.day}-${index}`} className='flex gap-3'>
                        <span className='numeral w-7 shrink-0 text-lg text-gold'>{entry.day}</span>
                        <span className='min-w-0 text-ink'>
                          {entry.href ? (
                            <Link href={entry.href} className='link-underline'>
                              {entry.title}
                            </Link>
                          ) : (
                            entry.title
                          )}
                          <span className='block text-sm text-ink-subtle'>
                            {entry.kind === 'holiday' ? 'National holiday' : EVENT_CATEGORY[entry.kind]?.label ?? 'School event'}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='mt-5 border-t border-line pt-4 text-sm text-ink-subtle'>Nothing scheduled yet.</p>
                )}
              </li>
            )
          })}
        </ol>

        <p className='mt-8 max-w-prose text-sm text-ink-subtle'>
          Religious holidays such as Eid follow the lunar calendar and are announced by the school each year. See{' '}
          <Link href='/announcements' className='link-underline text-brand'>
            announcements
          </Link>{' '}
          for confirmed dates.
        </p>
      </Section>
    </>
  )
}
