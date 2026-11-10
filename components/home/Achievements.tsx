import type { AcademicAchievementDocument } from '@/lib/database/academicAchievements'
import AchieverCard from '../content/AchieverCard'
import AchievementTrophy from '../three/AchievementTrophy'
import { ButtonLink } from '../ui/Button'
import Carousel from '../ui/Carousel'
import Section from '../ui/Section'

export default function Achievements({ achievements }: { achievements: AcademicAchievementDocument[] }) {
  if (achievements.length === 0) return null

  return (
    <Section background='brand' aria-labelledby='achievers-heading' className='overflow-hidden'>
      <div className='tessellate absolute inset-0' aria-hidden />
      <div className='relative grid gap-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-14'>
        <div>
          <AchievementTrophy className='mx-auto mb-6 hidden aspect-[4/5] w-44 md:block lg:mx-0' />
          <h2 id='achievers-heading' className='font-display text-display-2 text-ink'>
            Our high achievers
          </h2>
          <div className='gold-rule mt-5 w-28' aria-hidden />
          <p className='mt-5 text-ink-muted'>
            Top grades in Cambridge IGCSE, AS and A Level. The list changes every year when the results arrive.
          </p>
          <ButtonLink href='/achievements/academicachievement' variant='inverse' className='mt-7'>
            All academic results
          </ButtonLink>
        </div>

        <Carousel label='High achievers' slideClassName='w-[70%] xs:w-[55%] sm:w-[40%] xl:w-[30%]' className='min-w-0'>
          {achievements.map((achievement) => (
            <AchieverCard key={achievement.id} achievement={achievement} />
          ))}
        </Carousel>
      </div>
    </Section>
  )
}
