import Image from 'next/image'
import Link from 'next/link'
import type { NewsDocument } from '@/lib/database/news'
import { excerpt, formatDate, isoDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import { NAV_FORWARD, SharedElement, transitionName } from '../motion/Transitions'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

export const NEWS_CATEGORY_LABEL: Record<NewsDocument['category'], string> = {
  news: 'School news',
  sports: 'Sports',
  general: 'Community'
}

interface NewsCardProps {
  item: NewsDocument
  /** `feature` = large card for the lead story, `row` = compact horizontal item */
  variant?: 'card' | 'feature' | 'row'
  headingLevel?: 'h2' | 'h3'
  priority?: boolean
  className?: string
}

/** A news story. The whole card is one link; the image morphs into the article's hero image. */
export default function NewsCard({ item, variant = 'card', headingLevel = 'h3', priority, className }: NewsCardProps) {
  const href = `/news/${item.id}`
  const image = item.photos?.find((photo) => typeof photo === 'string' && photo.trim() !== '')
  const date = (
    <time dateTime={isoDate(item.date)} className='text-sm text-ink-subtle'>
      {formatDate(item.date, 'long', 'Date to be confirmed')}
    </time>
  )
  const Heading = headingLevel

  if (variant === 'row') {
    return (
      <article className={cn('group relative flex gap-4 py-5', className)}>
        {image && (
          <div className='relative h-20 w-24 shrink-0 overflow-hidden rounded-md bg-sunken sm:h-24 sm:w-32'>
            <Image src={image} alt='' fill sizes='128px' className='object-cover' />
          </div>
        )}
        <div className='min-w-0'>
          {date}
          <Heading className='mt-1 font-display text-lg leading-snug text-ink'>
            <Link href={href} transitionTypes={NAV_FORWARD} className='after:absolute after:inset-0 group-hover:text-brand'>
              {item.title}
            </Link>
          </Heading>
        </div>
      </article>
    )
  }

  const feature = variant === 'feature'

  return (
    <Card bare interactive className={cn(feature && 'lg:grid lg:grid-cols-[1.15fr_1fr]', className)}>
      {image && (
        <SharedElement name={transitionName('news', item.id)}>
          <div className={cn('relative w-full overflow-hidden bg-sunken', feature ? 'aspect-[16/10] lg:aspect-auto lg:min-h-[24rem]' : 'aspect-[16/10]')}>
            <Image
              src={image}
              alt=''
              fill
              priority={priority}
              sizes={feature ? '(max-width: 1024px) 100vw, 55vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
              className='object-cover transition-transform duration-slow ease-out group-hover/card:scale-[1.03]'
            />
          </div>
        </SharedElement>
      )}
      <Card.Body className={cn(feature && 'justify-center lg:p-10')}>
        <div className='mb-3 flex flex-wrap items-center gap-3'>
          <Badge tone={item.category === 'sports' ? 'gold' : item.category === 'news' ? 'brand' : 'sky'}>
            {NEWS_CATEGORY_LABEL[item.category] ?? 'News'}
          </Badge>
          {date}
        </div>
        <Heading className={cn('font-display text-ink', feature ? 'text-display-3' : 'text-title')}>
          <Link href={href} transitionTypes={NAV_FORWARD} className='after:absolute after:inset-0'>
            {item.title}
          </Link>
        </Heading>
        <p className={cn('mt-3 text-ink-muted', feature ? 'line-clamp-4 text-lead' : 'line-clamp-3')}>
          {excerpt(item.description ?? '', feature ? 260 : 150)}
        </p>
      </Card.Body>
    </Card>
  )
}
