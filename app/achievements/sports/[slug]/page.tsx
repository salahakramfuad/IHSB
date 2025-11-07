// app/achievements/sports/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getBySlug } from '../data'
import LightboxGallery from '../../../../components/LightboxGallery'

function formatDate(iso?: string) {
  if (!iso) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(iso))
}

export default async function SportsAchievementDetail({
  params
}: {
  params: { slug: string }
}) {
  const achievement = getBySlug(params.slug)

  if (!achievement) {
    return (
      <div className='px-4 py-16 sm:px-6 lg:px-8 bg-[var(--background)] [color:var(--text)]'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-2xl font-semibold'>Event not found</h1>
          <p className='mt-2 text-[var(--textSecondary)]'>
            The event you’re looking for doesn’t exist.
          </p>
          <Link
            href='/achievements/sports'
            className='mt-6 inline-block rounded-xl px-5 py-2.5 text-white'
            style={{ background: 'var(--primary)' }}
          >
            Back to Sports Achievements
          </Link>
        </div>
      </div>
    )
  }

  const photos: string[] = achievement.photos?.length
    ? achievement.photos
    : [achievement.image]

  return (
    <div className='relative z-10 px-4 py-10 sm:px-6 lg:px-8 bg-[var(--background)] [color:var(--text)]'>
      <div className='mx-auto max-w-5xl relative isolate'>
        <nav className='mb-6 text-sm'>
          <Link
            href='/achievements/sports'
            className='cursor-pointer hover:underline'
            style={{ color: 'var(--primary)' }}
            aria-label='Back to all sports achievements'
          >
            ← All sports achievements
          </Link>
        </nav>

        <header className='mb-6'>
          <h1 className='text-3xl md:text-4xl font-extrabold'>
            {achievement.title}
          </h1>

          <div className='mt-2 flex flex-wrap gap-2 text-sm'>
            {achievement.sport && (
              <span
                className='rounded-full px-2.5 py-1 ring-1'
                style={{
                  background:
                    'color-mix(in oklab, var(--primary) 12%, transparent)',
                  color: 'var(--primary)',
                  borderColor:
                    'color-mix(in oklab, var(--primary) 35%, transparent)'
                }}
              >
                {achievement.sport}
              </span>
            )}

            {achievement.placement && (
              <span className='rounded-full px-2.5 py-1 ring-1 ring-[var(--border)] bg-[var(--surface)]'>
                {achievement.placement}
              </span>
            )}

            {achievement.date && (
              <span className='rounded-full px-2.5 py-1 ring-1 ring-[var(--border)] bg-[var(--surface)]'>
                {formatDate(achievement.date)}
              </span>
            )}

            {achievement.location && (
              <span className='rounded-full px-2.5 py-1 ring-1 ring-[var(--border)] bg-[var(--surface)]'>
                {achievement.location}
              </span>
            )}
          </div>
        </header>

        <article className='overflow-hidden rounded-2xl ring-1 ring-[var(--border)] bg-[var(--surface)]'>
          <div className='relative h-72 w-full'>
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              sizes='100vw'
              className='object-cover'
              priority
            />
          </div>
          <div className='p-6'>
            <p className='leading-relaxed text-[var(--textSecondary)]'>
              {achievement.longDescription || achievement.description}
            </p>
          </div>
        </article>

        {photos.length > 0 && (
          <section className='mt-8 relative z-10'>
            <h2 className='mb-3 text-lg font-semibold'>Event Photos</h2>
            <LightboxGallery
              images={photos}
              thumbs={photos}
              leadTitle={achievement.title}
              leadCaption={`${formatDate(achievement.date)}${
                achievement.location ? ' • ' + achievement.location : ''
              }`}
              className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
            />
          </section>
        )}
      </div>
    </div>
  )
}
