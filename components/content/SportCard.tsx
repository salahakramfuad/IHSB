import Image from 'next/image'
import Link from 'next/link'
import type { Placement, SportsAchievementDocument } from '@/lib/database/sports'
import { formatDate, isoDate } from '@/lib/format'
import { NAV_FORWARD, SharedElement, transitionName } from '../motion/Transitions'
import Badge, { type BadgeTone } from '../ui/Badge'
import Card from '../ui/Card'

export const PLACEMENT_TONE: Record<Placement, BadgeTone> = {
  Champion: 'gold',
  'Runner-up': 'brand',
  Award: 'sky',
  Participant: 'neutral'
}

export default function SportCard({ achievement, className }: { achievement: SportsAchievementDocument; className?: string }) {
  return (
    <Card interactive className={className}>
      <SharedElement name={transitionName('sport', achievement.slug)}>
        <div className='relative aspect-[16/10] w-full overflow-hidden bg-brand-800'>
          {achievement.image && (
            <Image
              src={achievement.image}
              alt=''
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              className='object-cover transition-transform duration-slow ease-out group-hover/card:scale-[1.03]'
            />
          )}
        </div>
      </SharedElement>
      <Card.Body>
        <div className='mb-3 flex flex-wrap items-center gap-2'>
          <Badge tone={PLACEMENT_TONE[achievement.placement] ?? 'neutral'}>{achievement.placement}</Badge>
          <Badge>{achievement.sport === 'Events' ? 'Other sports' : achievement.sport}</Badge>
        </div>
        <h2 className='font-display text-title text-ink'>
          <Link href={`/achievements/sports/${achievement.slug}`} transitionTypes={NAV_FORWARD} className='after:absolute after:inset-0'>
            {achievement.title}
          </Link>
        </h2>
        <p className='mt-2 line-clamp-3 text-ink-muted'>{achievement.description}</p>
        <Card.Meta>
          <time dateTime={isoDate(achievement.date)}>{formatDate(achievement.date, 'long')}</time>
          {achievement.location && <span>{achievement.location}</span>}
        </Card.Meta>
      </Card.Body>
    </Card>
  )
}
