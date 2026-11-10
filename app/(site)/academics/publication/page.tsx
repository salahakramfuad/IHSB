import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Section from '@/components/ui/Section'
import { schoolInfo } from '@/data/schoolInfo'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Explore IHSB publications including The Hopian, Hope Central, and HopeEarth Magazine - showcasing student work and school activities.',
  alternates: { canonical: '/academics/publication' },
  openGraph: {
    title: 'Publications | IHSB',
    description: 'Read our latest school publications and magazines featuring student achievements and school events.'
  }
}

const publications = [
  {
    title: 'The Hopian',
    description: 'Student magazine showcasing achievements, stories, and creativity',
    issues: [
      { name: 'The Hopian Issue-3', link: '/pdfs/hopian-issue-3.pdf' },
      { name: 'The Hopian Issue-4', link: '/pdfs/hopian-issue-4.pdf' }
    ]
  },
  {
    title: 'Hope Central',
    description: 'Central publication featuring school news and updates',
    issues: [
      { name: 'HopeCentral - Issue 1', link: '/pdfs/hopecentral-issue-1.pdf' },
      { name: 'HopeCentral - Issue 2', link: '/pdfs/hopecentral-issue-2.pdf' },
      { name: 'HopeCentral - Issue 3', link: '/pdfs/hopecentral-issue-3.pdf' }
    ]
  },
  {
    title: 'HopeEarth Magazine',
    description: 'Environmental awareness and sustainability focused publication',
    issues: [{ name: 'Issue - October 2021', link: '/pdfs/hopeearth-october-2021.pdf' }]
  }
]

export default function PublicationPage() {
  return (
    <>
      <PageHeader
        title='Publications'
        subtitle='Magazines written and edited by students and teachers: their work, their achievements and the life of the school.'
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }, { label: 'Publications' }]}
        patternSeed={43}
      />

      <Section background='canvas' aria-label='Publications'>
        <div className='divide-y divide-line border-y border-line'>
          {publications.map((publication) => (
            <article key={publication.title} className='grid gap-6 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16'>
              <div>
                <h2 className='font-display text-display-3 text-ink' translate='no'>
                  {publication.title}
                </h2>
                <p className='mt-2 max-w-prose text-ink-muted'>{publication.description}.</p>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-gold'>
                  {publication.issues.length} {publication.issues.length === 1 ? 'issue' : 'issues'} to read
                </h3>
                <ul className='mt-3 divide-y divide-line border-t border-line'>
                  {publication.issues.map((issue) => (
                    <li key={issue.link}>
                      <a
                        href={issue.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group flex items-center gap-4 py-4 text-ink'
                      >
                        <FileText className='h-5 w-5 shrink-0 text-brand' aria-hidden />
                        <span className='link-underline font-medium'>{issue.name}</span>
                        <span className='ml-auto text-sm text-ink-subtle'>
                          PDF<span className='sr-only'>, opens in a new tab</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section background='brand' spacing='sm' aria-labelledby='contribute-heading'>
        <div className='flex flex-col items-start justify-between gap-6 md:flex-row md:items-center'>
          <div>
            <h2 id='contribute-heading' className='font-display text-display-3 text-ink'>
              Want to contribute?
            </h2>
            <p className='mt-2 max-w-prose text-ink-muted'>
              Students, teachers, and parents are welcome to contribute articles, stories, artwork, and photographs to
              our publications. Contact the school office for submission guidelines.
            </p>
          </div>
          <a href={`mailto:${schoolInfo.email.general}?subject=Publication%20submission`} className='link-underline shrink-0 font-semibold text-gold'>
            {schoolInfo.email.general}
          </a>
        </div>
      </Section>
    </>
  )
}
