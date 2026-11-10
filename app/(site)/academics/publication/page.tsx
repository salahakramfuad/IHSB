import React from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

export const metadata: Metadata = {
  title: 'Publications',
  description:
    'Explore IHSB publications including The Hopian, Hope Central, and HopeEarth Magazine - showcasing student work and school activities.',
  openGraph: {
    title: 'Publications | IHSB',
    description: 'Read our latest school publications and magazines featuring student achievements and school events.'
  }
}

const publications = [
  {
    title: 'The Hopian',
    description: 'Student magazine showcasing achievements, stories, and creativity',
    icon: '📖',
    color: 'from-accent-blue-500 to-accent-blue-600',
    bgColor: 'bg-accent-blue-50',
    borderColor: 'border-accent-blue-200',
    issues: [
      { name: 'The Hopian Issue-3', link: '/pdfs/hopian-issue-3.pdf' },
      { name: 'The Hopian Issue-4', link: '/pdfs/hopian-issue-4.pdf' }
    ]
  },
  {
    title: 'Hope Central',
    description: 'Central publication featuring school news and updates',
    icon: '📰',
    color: 'from-primary-green-500 to-primary-green-600',
    bgColor: 'bg-primary-green-50',
    borderColor: 'border-primary-green-200',
    issues: [
      {
        name: 'HopeCentral - Issue 1',
        link: '/pdfs/hopecentral-issue-1.pdf'
      },
      {
        name: 'HopeCentral - Issue 2',
        link: '/pdfs/hopecentral-issue-2.pdf'
      },
      { name: 'HopeCentral - Issue 3', link: '/pdfs/hopecentral-issue-3.pdf' }
    ]
  },
  {
    title: 'HopeEarth Magazine',
    description: 'Environmental awareness and sustainability focused publication',
    icon: '🌍',
    color: 'from-accent-teal-500 to-accent-teal-600',
    bgColor: 'bg-accent-teal-50',
    borderColor: 'border-accent-teal-200',
    issues: [
      {
        name: 'Issue - October 2021',
        link: '/pdfs/hopeearth-october-2021.pdf'
      }
    ]
  }
]

export default function PublicationPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-primary-green-50/50'>
      <Section background='white'>
        <PageHeader
          title='Publications'
          subtitle='Explore our latest publications and magazines featuring student work, achievements, and school activities'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Publications' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {publications.map((publication, index) => (
              <Card
                key={index}
                className={`${publication.bgColor} border-2 ${publication.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
              >
                <div className={`h-2 bg-gradient-to-r ${publication.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <div className='text-center mb-4'>
                  <div className='text-6xl mb-4'>{publication.icon}</div>
                  <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                    {publication.title}
                  </h2>
                  <p className='text-sm text-gray-600'>{publication.description}</p>
                </div>
                <div className='border-t-2 border-gray-200 pt-4 mt-4'>
                  <h3 className='text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                    Available Issues
                  </h3>
                  <ul className='space-y-2'>
                    {publication.issues.map((issue, i) => (
                      <li key={i}>
                        <a
                          href={issue.link}
                          target='_blank'
                          rel='noopener noreferrer'
                          className={`flex items-center gap-2 p-2 rounded-lg hover:bg-white/80 transition-all group`}
                        >
                          <span className='text-lg'>📄</span>
                          <span className='text-sm font-medium text-gray-700 group-hover:text-primary-green-700 transition-colors flex-1'>
                            {issue.name}
                          </span>
                          <span className='text-primary-green-600 opacity-0 group-hover:opacity-100 transition-opacity'>
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className='mt-12 bg-gradient-to-br from-primary-green-50 to-accent-blue-50 border-2 border-primary-green-200'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='text-center'>
              <div className='text-5xl mb-4'>📚</div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Want to Contribute?
              </h3>
              <p className='text-gray-700 mb-6 max-w-2xl mx-auto'>
                Students, teachers, and parents are welcome to contribute articles,
                stories, artwork, and photographs to our publications. Contact the
                school office for submission guidelines.
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
