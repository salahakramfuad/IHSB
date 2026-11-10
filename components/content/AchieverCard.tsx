import Image from 'next/image'
import type { AcademicAchievementDocument, Session } from '@/lib/database/academicAchievements'
import { cn } from '@/lib/utils'

export const SESSION_LABEL: Record<Session, string> = {
  'O Level': 'IGCSE / O Level',
  'AS Level': 'AS Level',
  'A Level': 'A Level'
}

/** A student's result, with the portrait in the arch frame. */
export default function AchieverCard({
  achievement,
  headingLevel: Heading = 'h3',
  className
}: {
  achievement: AcademicAchievementDocument
  headingLevel?: 'h3' | 'h4'
  className?: string
}) {
  const initials = achievement.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  return (
    <article className={cn('flex h-full flex-col', className)}>
      <div className='arch relative aspect-[4/5] overflow-hidden bg-brand-100 dark:bg-brand-800'>
        {achievement.image ? (
          <Image
            src={achievement.image}
            alt={`Portrait of ${achievement.name}`}
            fill
            sizes='(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 22vw'
            className='object-cover'
          />
        ) : (
          <span className='absolute inset-0 flex items-center justify-center font-display text-5xl text-brand' aria-hidden>
            {initials}
          </span>
        )}
      </div>
      <p className='mt-4 text-sm font-semibold text-gold'>
        {SESSION_LABEL[achievement.session] ?? achievement.session}, {achievement.year}
      </p>
      <Heading className='mt-1 font-display text-title text-ink'>{achievement.name}</Heading>
      <p className='mt-1 text-ink-muted'>{achievement.result}</p>
    </article>
  )
}
