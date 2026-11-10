import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PLACEMENT_TONE } from '@/components/content/SportCard'
import { NAV_BACK, PageTransition, SharedElement, transitionName } from '@/components/motion/Transitions'
import LightboxGallery from '@/components/shared/LightboxGallery'
import Badge from '@/components/ui/Badge'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import { formatDate, isoDate } from '@/lib/format'
import { getSportsAchievement } from '@/lib/services/sportsService'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const achievement = await getSportsAchievement(slug)
  if (!achievement) return { title: 'Achievement not found', robots: { index: false } }
  return {
    title: `${achievement.title} (${achievement.placement})`,
    description: achievement.description,
    alternates: { canonical: `/achievements/sports/${slug}` },
    openGraph: {
      title: achievement.title,
      description: achievement.description,
      ...(achievement.image ? { images: [{ url: achievement.image }] } : {})
    }
  }
}

export default async function SportsDetailPage({ params }: Props) {
  const { slug } = await params
  const achievement = await getSportsAchievement(slug)
  if (!achievement) notFound()

  const photos = (achievement.photos ?? []).filter((photo) => photo && photo !== achievement.image)

  return (
    <PageTransition>
      <article>
        <PageHeader
          title={achievement.title}
          eyebrow={
            <>
              {achievement.sport === 'Events' ? 'Sports' : achievement.sport}
              <span className='mx-2 text-ink-subtle' aria-hidden>
                |
              </span>
              <time dateTime={isoDate(achievement.date)}>{formatDate(achievement.date, 'long')}</time>
            </>
          }
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Sports', href: '/achievements/sports' },
            { label: 'Result' }
          ]}
          patternSeed={5}
        >
          <div className='mt-6 flex flex-wrap gap-2'>
            <Badge tone={PLACEMENT_TONE[achievement.placement] ?? 'neutral'}>{achievement.placement}</Badge>
            {achievement.location && <Badge tone='solid'>{achievement.location}</Badge>}
          </div>
        </PageHeader>

        <Section background='canvas' spacing='sm'>
          <div className='mx-auto max-w-3xl'>
            {achievement.image && (
              <SharedElement name={transitionName('sport', achievement.slug)}>
                <div className='relative -mt-24 mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-sunken shadow-floating md:-mt-28'>
                  <Image src={achievement.image} alt='' fill priority sizes='(max-width: 768px) 100vw, 48rem' className='object-cover' />
                </div>
              </SharedElement>
            )}
            <div className='prose-ihsb mx-auto'>
              <p className='text-lead text-ink'>{achievement.description}</p>
              {(achievement.longDescription ?? '').split(/\n{2,}/).filter(Boolean).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className='mx-auto mt-12 max-w-prose'>
              <Link
                href='/achievements/sports'
                transitionTypes={NAV_BACK}
                className='link-underline inline-flex items-center gap-2 font-semibold text-brand'
              >
                <ArrowLeft className='h-4 w-4' aria-hidden />
                All sports achievements
              </Link>
            </p>
          </div>

          {photos.length > 0 && (
            <div className='mt-16'>
              <h2 className='mb-6 font-display text-display-3 text-ink'>Photos</h2>
              <LightboxGallery layout='grid' images={photos.map((src, index) => ({ src, caption: `${achievement.title}, photo ${index + 1}` }))} />
            </div>
          )}
        </Section>
      </article>
    </PageTransition>
  )
}
