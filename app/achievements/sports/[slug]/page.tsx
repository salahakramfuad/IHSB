// app/achievements/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getBySlug } from '../data'
import LightboxGallery from '../../../../components/LightboxGallery'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(iso))
}

export default async function AchievementDetail({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const achievement = getBySlug(slug)

  if (!achievement) {
    return (
      <div className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-2xl font-semibold'>Event not found</h1>
          <p className='mt-2 text-gray-600'>
            The event you’re looking for doesn’t exist.
          </p>
          <Link
            className='mt-6 inline-block rounded-xl bg-blue-600 px-5 py-2.5 text-white'
            href='/achievements'
          >
            Back to Achievements
          </Link>
        </div>
      </div>
    )
  }

  const photos = achievement.photos?.length
    ? achievement.photos
    : [achievement.image]

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0D1117] dark:to-[#0D1117] px-4 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-5xl'>
        <nav className='mb-6 text-sm'>
          <Link href='/achievements' className='text-blue-600 hover:underline'>
            ← All achievements
          </Link>
        </nav>

        <header className='mb-6'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-[#E6EEF2]'>
            {achievement.title}
          </h1>
          <div className='mt-2 flex flex-wrap gap-2 text-sm'>
            <span className='rounded-full bg-blue-50 dark:bg-[#1F2937] px-2.5 py-1 text-blue-700 dark:text-[#95C6E2]'>
              {achievement.sport}
            </span>
            <span className='rounded-full bg-gray-50 dark:bg-[#1F2937] px-2.5 py-1'>
              {achievement.placement}
            </span>
            <span className='rounded-full bg-gray-50 dark:bg-[#1F2937] px-2.5 py-1'>
              {formatDate(achievement.date)}
            </span>
            {achievement.location && (
              <span className='rounded-full bg-gray-50 dark:bg-[#1F2937] px-2.5 py-1'>
                {achievement.location}
              </span>
            )}
          </div>
        </header>

        <div className='overflow-hidden rounded-2xl bg-white dark:bg-[#111827] ring-1 ring-black/5 dark:ring-white/10'>
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
            <p className='text-gray-800 dark:text-[#E6EEF2]/85 leading-relaxed'>
              {achievement.longDescription || achievement.description}
            </p>
          </div>
        </div>

        {photos.length ? (
          <section className='mt-8'>
            <h2 className='mb-3 text-lg font-semibold text-gray-900 dark:text-[#E6EEF2]'>
              Event Photos
            </h2>
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
        ) : null}
      </div>
    </div>
  )
}
