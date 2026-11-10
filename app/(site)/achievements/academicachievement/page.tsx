import type { Metadata } from 'next'
import { GraduationCap } from 'lucide-react'
import AchieverCard, { SESSION_LABEL } from '@/components/content/AchieverCard'
import FilterBar from '@/components/content/FilterBar'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import Stat from '@/components/ui/Stat'
import type { Session } from '@/lib/database/academicAchievements'
import { getAllAcademicAchievementsService } from '@/lib/services/academicAchievementsService'

export const metadata: Metadata = {
  title: 'Academic Achievements',
  description: 'Celebrating outstanding student results across O Level, AS Level, and A Level.',
  alternates: { canonical: '/achievements/academicachievement' },
  openGraph: {
    title: 'Academic Achievements | IHSB',
    description: 'Celebrating outstanding student results across O Level, AS Level, and A Level.'
  }
}

const SESSIONS: Session[] = ['A Level', 'AS Level', 'O Level']

export default async function AcademicAchievementsPage({
  searchParams
}: {
  searchParams: Promise<{ session?: string; year?: string }>
}) {
  const { session: requestedSession, year: requestedYear } = await searchParams
  const all = await getAllAcademicAchievementsService()
  const session = SESSIONS.find((value) => value === requestedSession)
  const years = [...new Set(all.map((item) => String(item.year)))].sort((a, b) => Number(b) - Number(a))
  const year = years.find((value) => value === requestedYear)

  const achievements = all.filter(
    (item) => (!session || item.session === session) && (!year || String(item.year) === year)
  )
  const groups = SESSIONS.map((name) => ({ name, items: achievements.filter((item) => item.session === name) })).filter(
    (group) => group.items.length > 0
  )

  return (
    <>
      <PageHeader
        title='Academic achievements'
        subtitle='Top grades in Cambridge IGCSE, AS and A Level. The list is updated each year when results are published.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Achievements' }, { label: 'Academic' }]}
        patternSeed={3}
      />

      {all.length > 0 && (
        <Section background='sunken' spacing='sm' aria-label='Results in numbers'>
          <dl className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <Stat size='md' value={all.length} label='High achievers listed' />
            {SESSIONS.map((name) => (
              <Stat key={name} size='md' value={all.filter((item) => item.session === name).length} label={SESSION_LABEL[name]} />
            ))}
          </dl>
        </Section>
      )}

      <Section background='canvas' spacing='sm' aria-label='High achievers'>
        <div className='flex flex-col gap-4'>
          <FilterBar
            label='Filter by qualification'
            basePath='/achievements/academicachievement'
            param='session'
            selected={session}
            allLabel='All qualifications'
            keep={{ year }}
            options={SESSIONS.map((value) => ({ value, label: SESSION_LABEL[value] }))}
          />
          {years.length > 1 && (
            <FilterBar
              label='Filter by year'
              basePath='/achievements/academicachievement'
              param='year'
              selected={year}
              allLabel='All years'
              keep={{ session }}
              options={years.map((value) => ({ value, label: value }))}
            />
          )}
        </div>

        {groups.length > 0 ? (
          groups.map((group) => (
            <section key={group.name} aria-labelledby={`session-${group.name.replace(/\s/g, '-')}`} className='mt-14 first:mt-10'>
              <h2 id={`session-${group.name.replace(/\s/g, '-')}`} className='font-display text-display-3 text-ink'>
                {SESSION_LABEL[group.name]}
              </h2>
              <div className='gold-rule mt-4 w-24' aria-hidden />
              <ul className='mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {group.items.map((achievement) => (
                  <li key={achievement.id}>
                    <AchieverCard achievement={achievement} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        ) : (
          <EmptyState
            className='mt-10'
            icon={<GraduationCap className='h-6 w-6' />}
            title='No results match these filters'
            description='Try another qualification or year.'
            action={
              <ButtonLink href='/achievements/academicachievement' variant='outline'>
                Clear filters
              </ButtonLink>
            }
          />
        )}
      </Section>
    </>
  )
}
