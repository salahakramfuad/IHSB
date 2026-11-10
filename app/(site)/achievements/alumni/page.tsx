import type { Metadata } from 'next'
import Image from 'next/image'
import { Linkedin, MapPin, Users } from 'lucide-react'
import AcademicsGlobe from '@/components/three/AcademicsGlobe'
import Accordion, { AccordionItem } from '@/components/ui/Accordion'
import Badge from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import PageHeader from '@/components/ui/PageHeader'
import Section, { SectionHeader } from '@/components/ui/Section'
import { schoolInfo } from '@/data/schoolInfo'
import { formatDate } from '@/lib/format'
import { alumniDestinations } from '@/lib/geo'
import {
  getAllAlumniYearStatsService,
  getAllFeaturedAlumniService,
  getPublishedAlumniStoriesService
} from '@/lib/services/alumniService'

export const metadata: Metadata = {
  title: 'Alumni',
  description: 'IHSB graduates around the world: where they study and work, and their stories in their own words.',
  alternates: { canonical: '/achievements/alumni' },
  openGraph: { title: 'Alumni | IHSB', description: 'IHSB graduates around the world and their stories.' }
}

export const revalidate = 300

export default async function AlumniPage() {
  const [alumni, stories, yearStats] = await Promise.all([
    getAllFeaturedAlumniService(),
    getPublishedAlumniStoriesService(),
    getAllAlumniYearStatsService()
  ])
  const destinations = alumniDestinations(alumni.map((person) => person.location))
  const maxCount = Math.max(1, ...yearStats.map((stat) => parseInt(stat.count, 10) || 0))

  return (
    <>
      <PageHeader
        title='Alumni'
        subtitle='Graduates of IHSB study and work across the world. Many come back to mentor the students who followed them.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Achievements' }, { label: 'Alumni' }]}
        patternSeed={17}
        media={
          destinations.length > 0 ? (
            <AcademicsGlobe destinations={destinations} className='mx-auto hidden aspect-square w-full max-w-sm lg:block' />
          ) : undefined
        }
      />

      <Section background='canvas' aria-labelledby='featured-alumni'>
        <SectionHeader id='featured-alumni' title='Where they are now' description='A few of our graduates, and what they went on to do.' />
        {alumni.length > 0 ? (
          <ul className='grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4'>
            {alumni.map((person) => (
              <li key={person.id}>
                <article>
                  <div className='arch relative aspect-[4/5] overflow-hidden bg-brand-100 dark:bg-brand-800'>
                    {person.imageUrl && (
                      <Image
                        src={person.imageUrl}
                        alt={`Portrait of ${person.name}`}
                        fill
                        sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 22vw'
                        className='object-cover'
                      />
                    )}
                  </div>
                  <p className='mt-4 text-sm font-semibold text-gold'>Class of {person.graduationYear}</p>
                  <h3 className='mt-1 font-display text-title text-ink'>{person.name}</h3>
                  <p className='text-ink-muted'>
                    {person.description}
                    {person.company ? `, ${person.company}` : ''}
                  </p>
                  {person.location && (
                    <p className='mt-2 flex items-center gap-1.5 text-sm text-ink-subtle'>
                      <MapPin className='h-4 w-4 shrink-0' aria-hidden />
                      {person.location}
                    </p>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='link-underline mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand'
                    >
                      <Linkedin className='h-4 w-4' aria-hidden />
                      LinkedIn<span className='sr-only'> profile of {person.name} (opens in a new tab)</span>
                    </a>
                  )}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={<Users className='h-6 w-6' />}
            title='Alumni profiles are on their way'
            description='Are you a graduate of IHSB? Tell us what you are doing now.'
            action={<ButtonLink href='/contact' variant='outline'>Get in touch</ButtonLink>}
          />
        )}
      </Section>

      {yearStats.length > 0 && (
        <Section background='sunken' aria-labelledby='graduates-by-year'>
          <SectionHeader id='graduates-by-year' title='Graduates by year' description='The size of each graduating class.' />
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[26rem]'>
              <caption className='sr-only'>Number of graduates in each year</caption>
              <thead className='sr-only'>
                <tr>
                  <th scope='col'>Year</th>
                  <th scope='col'>Graduates</th>
                </tr>
              </thead>
              <tbody>
                {yearStats.map((stat) => {
                  const count = parseInt(stat.count, 10) || 0
                  return (
                    <tr key={stat.id ?? stat.year} className='border-b border-line'>
                      <th scope='row' className='numeral w-24 py-3 text-left text-2xl font-normal text-ink'>{stat.year}</th>
                      <td className='py-3'>
                        <div className='flex items-center gap-4'>
                          <div className='h-2 rounded-full bg-brand-solid' style={{ width: `${Math.max(4, (count / maxCount) * 78)}%` }} aria-hidden />
                          <span className='numeral text-xl text-gold'>{stat.count}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <Section background='canvas' aria-labelledby='alumni-stories'>
        <SectionHeader id='alumni-stories' title='In their own words' description='Select a story to read it in full.' />
        {stories.length > 0 ? (
          <div className='mx-auto max-w-3xl'>
            <Accordion>
              {stories.map((story, index) => (
                <AccordionItem key={story.id} title={story.title} defaultOpen={index === 0}>
                  <div className='flex flex-wrap items-center gap-3 text-sm text-ink-subtle'>
                    {story.featured && <Badge tone='gold'>Featured</Badge>}
                    <span>
                      {story.author}, {story.authorRole}
                    </span>
                    <span>{formatDate(story.date, 'long', story.date)}</span>
                  </div>
                  {story.imageUrl && (
                    <div className='relative mt-5 aspect-[16/9] overflow-hidden rounded-lg bg-sunken'>
                      <Image src={story.imageUrl} alt='' fill sizes='(max-width: 768px) 100vw, 44rem' className='object-cover' />
                    </div>
                  )}
                  <div className='prose-ihsb mt-5'>
                    <p className='text-ink'>{story.excerpt}</p>
                    {story.content.split(/\n{2,}/).map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ) : (
          <EmptyState title='No stories published yet' description='Alumni stories will appear here.' />
        )}
      </Section>

      <Section background='brand' spacing='sm' aria-labelledby='alumni-contact'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div>
            <h2 id='alumni-contact' className='font-display text-display-3 text-ink'>
              Graduated from IHSB?
            </h2>
            <p className='mt-2 max-w-prose text-ink-muted'>
              Tell the alumni office where you are now, or offer an hour to speak to the current Grade 11 and 12 students.
            </p>
          </div>
          <a href={`mailto:${schoolInfo.email.general}?subject=Alumni`} className='link-underline shrink-0 font-semibold text-gold'>
            {schoolInfo.email.general}
          </a>
        </div>
      </Section>
    </>
  )
}
