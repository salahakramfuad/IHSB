import type { Metadata } from 'next'
import Image from 'next/image'
import { Megaphone } from 'lucide-react'
import FilterBar from '@/components/content/FilterBar'
import Badge, { type BadgeTone } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { AnnouncementDocument } from '@/lib/database/announcements'
import { formatDate, isoDate } from '@/lib/format'
import { getActiveAnnouncementsService } from '@/lib/services/announcementsService'

export const metadata: Metadata = {
  title: 'Announcements',
  description: 'Current notices for IHSB parents and students: admissions, examinations, holidays, uniform and transport.',
  alternates: { canonical: '/announcements' },
  openGraph: { title: 'Announcements | IHSB', description: 'Current notices for IHSB parents and students.' }
}

export const revalidate = 300

type Priority = AnnouncementDocument['priority']
const PRIORITY: Record<Priority, { label: string; tone: BadgeTone }> = {
  high: { label: 'Important', tone: 'gold' },
  medium: { label: 'Notice', tone: 'brand' },
  low: { label: 'For information', tone: 'neutral' }
}
const PRIORITIES = Object.keys(PRIORITY) as Priority[]

function Notice({ announcement, featured = false }: { announcement: AnnouncementDocument; featured?: boolean }) {
  const priority = PRIORITY[announcement.priority] ?? PRIORITY.medium
  const expires = announcement.expiresAt ? formatDate(announcement.expiresAt, 'long') : ''

  return (
    <article
      id={announcement.id}
      className={
        featured
          ? 'grid scroll-mt-28 overflow-hidden rounded-xl border border-line bg-paper shadow-soft md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]'
          : 'scroll-mt-28 py-8'
      }
    >
      <div className={featured ? 'p-7 md:p-10' : undefined}>
        <div className='flex flex-wrap items-center gap-3'>
          <Badge tone={priority.tone}>{priority.label}</Badge>
          <time dateTime={isoDate(announcement.createdAt)} className='text-sm text-ink-subtle'>
            {formatDate(announcement.createdAt, 'long', 'Recently posted')}
          </time>
        </div>
        <h2 className={featured ? 'mt-4 font-display text-display-3 text-ink' : 'mt-3 font-display text-title text-ink'}>
          {announcement.title}
        </h2>
        <div className='prose-ihsb mt-3 whitespace-pre-line'>
          <p>{announcement.content}</p>
        </div>
        {expires && <p className='mt-4 text-sm text-ink-subtle'>This notice applies until {expires}.</p>}
      </div>
      {featured && announcement.image && (
        <div className='relative min-h-56 bg-sunken'>
          <Image src={announcement.image} alt='' fill sizes='(max-width: 768px) 100vw, 22rem' className='object-cover' />
        </div>
      )}
    </article>
  )
}

export default async function AnnouncementsPage({ searchParams }: { searchParams: Promise<{ priority?: string }> }) {
  const { priority: requested } = await searchParams
  const priority = PRIORITIES.find((value) => value === requested)
  const all = await getActiveAnnouncementsService()
  const announcements = priority ? all.filter((item) => item.priority === priority) : all
  const [lead, ...rest] = announcements

  return (
    <>
      <PageHeader
        title='Announcements'
        subtitle='Current notices for parents and students. Expired notices are removed automatically.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Announcements' }]}
        patternSeed={31}
      />
      <Section background='canvas' spacing='sm' aria-label='Notices'>
        <FilterBar
          label='Filter announcements'
          basePath='/announcements'
          param='priority'
          selected={priority}
          allLabel='All notices'
          options={PRIORITIES.map((value) => ({ value, label: PRIORITY[value].label }))}
        />

        {lead ? (
          <>
            <div className='mt-8'>
              <Notice announcement={lead} featured />
            </div>
            {rest.length > 0 && (
              <div className='mx-auto mt-6 max-w-3xl divide-y divide-line'>
                {rest.map((announcement) => (
                  <Notice key={announcement.id} announcement={announcement} />
                ))}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            className='mt-10'
            icon={<Megaphone className='h-6 w-6' />}
            title={priority ? 'No notices of this kind right now' : 'There are no current announcements'}
            description='When the school posts a notice it appears here and in the bar at the top of every page.'
            action={
              <ButtonLink href={priority ? '/announcements' : '/events'} variant='outline'>
                {priority ? 'Show all notices' : 'See upcoming events'}
              </ButtonLink>
            }
          />
        )}
      </Section>
    </>
  )
}
