// components/Publications.js
import React from 'react'

const Publications = () => {
  const publications = [
    {
      title: 'The Hopian',
      issues: [
        { name: 'The Hopian Issue-3', link: '/pdfs/hopian-issue-3.pdf' },
        { name: 'The Hopian Issue-4', link: '/pdfs/hopian-issue-4.pdf' }
      ]
    },
    {
      title: 'Hope Central',
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
      issues: [
        {
          name: 'Issue - October 2021',
          link: '/pdfs/hopeearth-october-2021.pdf'
        }
      ]
    }
  ]

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
            Publications of International Hope School
          </h1>
          <p className='text-xl text-gray-700'>
            Explore our latest publications and magazines.
          </p>
        </header>

        {/* Publications Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {publications.map((publication, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='p-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2'>
                  {publication.title}
                </h2>
                <ul className='space-y-4'>
                  {publication.issues.map((issue, i) => (
                    <li key={i}>
                      <a
                        href={issue.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300'
                      >
                        <span className='mr-2'>📄</span>
                        <span>{issue.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Publications
