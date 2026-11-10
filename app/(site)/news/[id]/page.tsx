import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import NewsCard, { NEWS_CATEGORY_LABEL } from '@/components/content/NewsCard'
import { NAV_BACK, PageTransition, SharedElement, transitionName } from '@/components/motion/Transitions'
import LightboxGallery from '@/components/shared/LightboxGallery'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import { excerpt, formatDate, isoDate } from '@/lib/format'
import { getAllNewsService, getNewsByIdService } from '@/lib/services/newsService'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const news = await getNewsByIdService(id)
  if (!news) return { title: 'News not found', robots: { index: false } }
  const description = excerpt(news.description ?? '', 160)
  const image = news.photos?.[0]
  return {
    title: news.title,
    description,
    alternates: { canonical: `/news/${id}` },
    openGraph: {
      type: 'article',
      title: news.title,
      description,
      publishedTime: isoDate(news.date),
      ...(image ? { images: [{ url: image }] } : {})
    }
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  const [news, all] = await Promise.all([getNewsByIdService(id), getAllNewsService()])
  if (!news) notFound()

  const photos = (news.photos ?? []).filter((photo) => typeof photo === 'string' && photo.trim() !== '')
  const [cover, ...more] = photos
  const paragraphs = (news.description ?? '').split(/\n{2,}/).filter(Boolean)
  const related = all.filter((item) => item.id !== news.id).slice(0, 3)

  return (
    <PageTransition>
      <article>
        <PageHeader
          title={news.title}
          eyebrow={
            <>
              {NEWS_CATEGORY_LABEL[news.category] ?? 'News'}
              <span className='mx-2 text-ink-subtle' aria-hidden>
                |
              </span>
              <time dateTime={isoDate(news.date)}>{formatDate(news.date, 'long')}</time>
            </>
          }
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: 'Story' }]}
          patternSeed={11}
        />

        <Section background='canvas' spacing='sm'>
          <div className='mx-auto max-w-3xl'>
            {cover && (
              <SharedElement name={transitionName('news', news.id)}>
                <div className='relative -mt-24 mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-sunken shadow-floating md:-mt-28'>
                  <Image src={cover} alt='' fill priority sizes='(max-width: 768px) 100vw, 48rem' className='object-cover' />
                </div>
              </SharedElement>
            )}

            <div className='prose-ihsb mx-auto'>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className={index === 0 ? 'text-lead text-ink' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            <p className='mx-auto mt-12 max-w-prose'>
              <Link href='/news' transitionTypes={NAV_BACK} className='link-underline inline-flex items-center gap-2 font-semibold text-brand'>
                <ArrowLeft className='h-4 w-4' aria-hidden />
                All news
              </Link>
            </p>
          </div>

          {more.length > 0 && (
            <div className='mt-16'>
              <h2 className='mb-6 font-display text-display-3 text-ink'>Photos</h2>
              <LightboxGallery layout='grid' images={more.map((src, index) => ({ src, caption: `${news.title}, photo ${index + 2}` }))} />
            </div>
          )}
        </Section>

        {related.length > 0 && (
          <Section background='sunken' spacing='sm' aria-labelledby='related-heading'>
            <h2 id='related-heading' className='mb-8 font-display text-display-3 text-ink'>
              More from the school
            </h2>
            <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {related.map((item) => (
                <li key={item.id}>
                  <NewsCard item={item} className='h-full' />
                </li>
              ))}
            </ul>
          </Section>
        )}
      </article>
    </PageTransition>
  )
}
