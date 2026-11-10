import type { Metadata } from 'next'
import { Newspaper } from 'lucide-react'
import FilterBar from '@/components/content/FilterBar'
import NewsCard, { NEWS_CATEGORY_LABEL } from '@/components/content/NewsCard'
import { PageTransition } from '@/components/motion/Transitions'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import type { NewsCategory } from '@/lib/database/news'
import { getAllNewsService } from '@/lib/services/newsService'

export const metadata: Metadata = {
  title: 'News',
  description: 'News from International Hope School Bangladesh: results, competitions, sport and community stories.',
  alternates: { canonical: '/news' },
  openGraph: { title: 'News | IHSB', description: 'Stories from the IHSB school community.' }
}

const CATEGORIES = Object.keys(NEWS_CATEGORY_LABEL) as NewsCategory[]

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: requested } = await searchParams
  const category = CATEGORIES.find((value) => value === requested)
  const all = await getAllNewsService()
  const news = category ? all.filter((item) => item.category === category) : all
  const [lead, ...rest] = news

  return (
    <PageTransition>
      <div>
        <PageHeader
          title='News'
          subtitle='Results, competitions, sport and stories from the school community.'
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
          patternSeed={11}
        />

        <Section background='canvas' spacing='sm' aria-label='News stories'>
          <FilterBar
            label='Filter news by category'
            basePath='/news'
            param='category'
            selected={category}
            allLabel='All news'
            options={CATEGORIES.map((value) => ({ value, label: NEWS_CATEGORY_LABEL[value] }))}
          />

          {lead ? (
            <>
              <div className='mt-8'>
                <NewsCard item={lead} variant='feature' headingLevel='h2' priority />
              </div>
              {rest.length > 0 && (
                <ul className='mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {rest.map((item) => (
                    <li key={item.id}>
                      <NewsCard item={item} headingLevel='h2' className='h-full' />
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <EmptyState
              className='mt-10'
              icon={<Newspaper className='h-6 w-6' />}
              title={category ? 'No stories in this category yet' : 'No news yet'}
              description='New stories are published during term. Announcements for parents are on a separate page.'
              action={
                <ButtonLink href={category ? '/news' : '/announcements'} variant='outline'>
                  {category ? 'Show all news' : 'Read announcements'}
                </ButtonLink>
              }
            />
          )}
        </Section>
      </div>
    </PageTransition>
  )
}
