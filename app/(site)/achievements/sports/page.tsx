// app/achievements/sports/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getSportsAchievements, calculateSportsStats } from '@/lib/services/sportsService'
import type { SportsAchievementDocument } from '@/lib/services/sportsService'
import ImageWithLightbox from '@/components/shared/ImageWithLightbox'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(iso))
}

export default async function AchievementsPage() {
  // Fetch from Firestore (server-side)
  const data = await getSportsAchievements()
  const stats = calculateSportsStats(data)

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <header className='mb-8 text-center'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-green-600 to-accent-blue-600'>
              Sports Achievements
            </span>
          </h1>
          <p className='mt-3 text-gray-700 max-w-2xl mx-auto'>
            Latest achievements first. Tap an event to view details and photos.
          </p>
        </header>

        {/* Stats: champions & runner-up by sport */}
        <section
          aria-label='Sport statistics'
          className='mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5'
        >
          {(
            [
              ['Football', '⚽️'],
              ['Basketball', '🏀'],
              ['Badminton', '🏸'],
              ['Chess', '♟️'],
              ['Events', '🏅']
            ] as const
          ).map(([sport, emoji]) => (
            <div
              key={sport}
              className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-sm font-semibold text-gray-900'>
                  {emoji} {sport}
                </h2>
              </div>
              <dl className='mt-3 grid grid-cols-2 gap-2 text-center'>
                <div className='rounded-xl bg-primary-green-50 p-2'>
                  <dt className='text-[11px] text-gray-600'>
                    Champions
                  </dt>
                  <dd className='text-lg font-bold text-primary-green-700'>
                    {stats[sport as keyof typeof stats].champion}
                  </dd>
                </div>
                <div className='rounded-xl bg-gray-50 p-2'>
                  <dt className='text-[11px] text-gray-600'>
                    Runner-up
                  </dt>
                  <dd className='text-lg font-bold text-gray-900'>
                    {stats[sport as keyof typeof stats].runnerUp}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </section>

        {/* Cards */}
        {data.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg'>
              No sports achievements available at this time.
            </p>
          </div>
        ) : (
          <div
            role='list'
            className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {data.map((a) => (
            <Link
              key={a.id}
              href={`/achievements/sports/${a.slug}`}
              className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-2xl z-10'
              aria-label={`Open ${a.title}`}
            >
              <article
                role='listitem'
                className='relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition
                   transform-gpu will-change-[transform] group-hover:-translate-y-1 group-hover:shadow-xl'
              >
                {/* Media */}
                <div className='relative h-48 w-full'>
                  {a.image && (
                    <ImageWithLightbox
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className='object-cover'
                      priority={false}
                      gallery={a.photos && a.photos.length > 0 ? [a.image, ...a.photos.filter(p => p && p.trim() !== '')] : undefined}
                    />
                  )}
                  {/* Decorative layers must not intercept pointer */}
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
                  <div className='pointer-events-none absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2'>
                    <h3 className='text-lg font-semibold text-white drop-shadow-sm'>
                      {a.title}
                    </h3>
                    <span className='rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-900'>
                      {formatDate(a.date)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className='space-y-3 p-5'>
                  <div className='flex items-center gap-2'>
                    <span className='rounded-full bg-primary-green-50 px-2.5 py-1 text-xs font-medium text-primary-green-700'>
                      {a.sport}
                    </span>
                    <span className='rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-900'>
                      {a.placement}
                    </span>
                    {a.location && (
                      <span className='rounded-full bg-gray-50 px-2.5 py-1 text-xs text-gray-700'>
                        {a.location}
                      </span>
                    )}
                  </div>
                  <p className='text-gray-700 leading-relaxed line-clamp-3'>
                    {a.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}
