import type { Metadata } from 'next'
import { Trophy } from 'lucide-react'
import FilterBar from '@/components/content/FilterBar'
import SportCard from '@/components/content/SportCard'
import { PageTransition } from '@/components/motion/Transitions'
import AchievementTrophy from '@/components/three/AchievementTrophy'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { Sport } from '@/lib/database/sports'
import { calculateSportsStats, getSportsAchievements } from '@/lib/services/sportsService'

export const metadata: Metadata = {
  title: 'Sports Achievements',
  description: 'Trophies, tournaments and team results from IHSB football, basketball, badminton, chess and more.',
  alternates: { canonical: '/achievements/sports' },
  openGraph: { title: 'Sports Achievements | IHSB', description: 'Trophies, tournaments and team results from IHSB.' }
}

const SPORTS: Sport[] = ['Football', 'Basketball', 'Badminton', 'Chess', 'Events']
const sportLabel = (sport: Sport) => (sport === 'Events' ? 'Other sports' : sport)

export default async function SportsPage({ searchParams }: { searchParams: Promise<{ sport?: string }> }) {
  const { sport: requested } = await searchParams
  const sport = SPORTS.find((value) => value === requested)
  const all = await getSportsAchievements()
  const achievements = sport ? all.filter((item) => item.sport === sport) : all
  const stats = calculateSportsStats(all)
  const champions = all.filter((item) => item.placement === 'Champion').length

  return (
    <PageTransition>
      <div>
        <PageHeader
          title='Sports achievements'
          subtitle='Tournaments our teams have played in, and the trophies they brought home.'
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Achievements' }, { label: 'Sports' }]}
          patternSeed={5}
          media={<AchievementTrophy className='mx-auto hidden aspect-[4/5] w-56 lg:block' />}
        />

        {all.length > 0 && (
          <Section background='sunken' spacing='sm' aria-labelledby='tally-heading'>
            <h2 id='tally-heading' className='sr-only'>
              Titles by sport
            </h2>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[30rem] text-left'>
                <caption className='mb-4 text-left text-ink-muted'>
                  {champions} championship {champions === 1 ? 'title' : 'titles'} recorded on this page.
                </caption>
                <thead>
                  <tr className='border-b border-line-strong text-sm text-ink-subtle'>
                    <th scope='col' className='py-3 pr-4 font-medium'>Sport</th>
                    <th scope='col' className='px-4 py-3 text-right font-medium'>Champion</th>
                    <th scope='col' className='py-3 pl-4 text-right font-medium'>Runner-up</th>
                  </tr>
                </thead>
                <tbody>
                  {SPORTS.map((name) => (
                    <tr key={name} className='border-b border-line'>
                      <th scope='row' className='py-3 pr-4 font-display text-lg font-normal text-ink'>{sportLabel(name)}</th>
                      <td className='numeral px-4 py-3 text-right text-2xl text-gold'>{stats[name]?.champion ?? 0}</td>
                      <td className='numeral py-3 pl-4 text-right text-2xl text-ink'>{stats[name]?.runnerUp ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        <Section background='canvas' spacing='sm' aria-label='Achievements'>
          <FilterBar
            label='Filter achievements by sport'
            basePath='/achievements/sports'
            param='sport'
            selected={sport}
            allLabel='All sports'
            options={SPORTS.map((value) => ({ value, label: sportLabel(value) }))}
          />
          {achievements.length > 0 ? (
            <ul className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {achievements.map((achievement) => (
                <li key={achievement.id ?? achievement.slug}>
                  <SportCard achievement={achievement} className='h-full' />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              className='mt-10'
              icon={<Trophy className='h-6 w-6' />}
              title={sport ? `No ${sportLabel(sport).toLowerCase()} results yet` : 'No sports results yet'}
              description='Results are added after each tournament.'
              action={
                <ButtonLink href={sport ? '/achievements/sports' : '/events'} variant='outline'>
                  {sport ? 'Show all sports' : 'See upcoming fixtures'}
                </ButtonLink>
              }
            />
          )}
        </Section>
      </div>
    </PageTransition>
  )
}
