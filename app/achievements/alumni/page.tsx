'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

// Alumni data - can be moved to a separate data file later
const alumniYearData = [
  { year: '2023', count: '500+' },
  { year: '2022', count: '450+' },
  { year: '2021', count: '400+' },
  { year: '2020', count: '380+' },
  { year: '2019', count: '350+' }
]

interface HighlightedAlumni {
  id: number
  name: string
  description: string
  achievement: string
  imageUrl: string
}

const highlightedAlumni: HighlightedAlumni[] = [
  {
    id: 1,
    name: 'Dr. Sarah Ahmed',
    description: 'Cardiologist at Apollo Hospital',
    achievement: 'Graduated 2015',
    imageUrl: 'https://picsum.photos/seed/alumni1/300/300'
  },
  {
    id: 2,
    name: 'Mohammad Rahman',
    description: 'Software Engineer at Google',
    achievement: 'Graduated 2016',
    imageUrl: 'https://picsum.photos/seed/alumni2/300/300'
  },
  {
    id: 3,
    name: 'Fatima Khan',
    description: 'Investment Banker at Goldman Sachs',
    achievement: 'Graduated 2017',
    imageUrl: 'https://picsum.photos/seed/alumni3/300/300'
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    description: 'Entrepreneur & Founder of TechStart BD',
    achievement: 'Graduated 2018',
    imageUrl: 'https://picsum.photos/seed/alumni4/300/300'
  },
  {
    id: 5,
    name: 'Ayesha Chowdhury',
    description: 'Research Scientist at MIT',
    achievement: 'Graduated 2014',
    imageUrl: 'https://picsum.photos/seed/alumni5/300/300'
  },
  {
    id: 6,
    name: 'Tariq Islam',
    description: 'Architect & Urban Planner',
    achievement: 'Graduated 2019',
    imageUrl: 'https://picsum.photos/seed/alumni6/300/300'
  }
]

interface AlumniStory {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  imageUrl: string
  date: string
}

const alumniStories: AlumniStory[] = [
  {
    id: 1,
    title: 'From IHSB to Global Impact',
    excerpt:
      'My journey at IHSB laid the foundation for my career in medicine. The rigorous academic program and supportive teachers prepared me for the challenges ahead.',
    content:
      'My journey at IHSB laid the foundation for my career in medicine. The rigorous academic program and supportive teachers prepared me for the challenges ahead. The school\'s emphasis on critical thinking and problem-solving skills has been invaluable in my medical practice. I am grateful for the opportunities IHSB provided and the lifelong friendships I made.',
    author: 'Dr. Sarah Ahmed',
    authorRole: 'Cardiologist',
    imageUrl: 'https://picsum.photos/seed/story1/600/400',
    date: 'March 2024'
  },
  {
    id: 2,
    title: 'Building a Tech Career',
    excerpt:
      'The computer science program at IHSB sparked my passion for technology. Today, I work on cutting-edge projects that impact millions of users worldwide.',
    content:
      'The computer science program at IHSB sparked my passion for technology. Today, I work on cutting-edge projects that impact millions of users worldwide. The hands-on projects and coding competitions organized by the school helped me develop strong problem-solving skills. IHSB\'s focus on innovation and creativity continues to inspire my work.',
    author: 'Mohammad Rahman',
    authorRole: 'Software Engineer',
    imageUrl: 'https://picsum.photos/seed/story2/600/400',
    date: 'February 2024'
  },
  {
    id: 3,
    title: 'Leadership Lessons from Campus',
    excerpt:
      'Participating in student council and various clubs at IHSB taught me valuable leadership skills that I use every day in my finance career.',
    content:
      'Participating in student council and various clubs at IHSB taught me valuable leadership skills that I use every day in my finance career. The school encouraged us to take initiative and work collaboratively. These experiences shaped my approach to teamwork and decision-making in high-pressure environments.',
    author: 'Fatima Khan',
    authorRole: 'Investment Banker',
    imageUrl: 'https://picsum.photos/seed/story3/600/400',
    date: 'January 2024'
  }
]

export default function AlumniPage() {
  const [selectedStory, setSelectedStory] = useState<AlumniStory | null>(null)

  const totalAlumni = alumniYearData.reduce((total, item) => {
    const numericCount = parseInt(item.count.replace('+', ''), 10)
    return total + numericCount
  }, 0)

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Our Proud Alumni Network'
          subtitle='Connecting past, present, and future generations of IHSB students'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Achievements', href: '/achievements' },
            { label: 'Alumni' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Total Alumni Hero Section */}
          <div className='mb-16'>
            <div className='bg-gradient-to-br from-primary-green-50 via-accent-blue-50 to-accent-purple-50 rounded-3xl p-8 md:p-12 border-2 border-primary-green-200 shadow-xl'>
              <div className='text-center'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  Total Alumni Network
                </h2>
                <div className='inline-block'>
                  <p className='text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-primary-green-600 via-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent'>
                    {totalAlumni}+
                  </p>
                  <p className='text-lg text-gray-600 mt-2'>
                    Graduates making their mark worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Yearwise Statistics */}
          <div className='mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center'>
              Alumni by Graduation Year
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6'>
              {alumniYearData.map((item, index) => (
                <Card
                  key={index}
                  className='bg-white border-2 border-gray-200 hover:border-primary-green-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-center group'
                >
                  <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-4 group-hover:h-3 transition-all'></div>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                    {item.year}
                  </h3>
                  <p className='text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent mb-1'>
                    {item.count}
                  </p>
                  <p className='text-sm text-gray-600'>Alumni</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Featured Alumni Section */}
          <div className='mb-16'>
            <div className='text-center mb-10'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                Featured Alumni
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Celebrating the achievements of our distinguished graduates
              </p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8'>
              {highlightedAlumni.map((alumni) => (
                <Card
                  key={alumni.id}
                  className='bg-white border-2 border-gray-200 hover:border-primary-green-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-center group overflow-hidden'
                >
                  <div className='relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary-green-100 group-hover:ring-primary-green-300 transition-all'>
                    <Image
                      src={alumni.imageUrl}
                      alt={alumni.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 96px, 112px'
                    />
                  </div>
                  <h3 className='text-base md:text-lg font-bold text-gray-900 mb-1 line-clamp-2'>
                    {alumni.name}
                  </h3>
                  <p className='text-xs md:text-sm text-gray-600 mb-2 line-clamp-2'>
                    {alumni.description}
                  </p>
                  <p className='text-xs text-primary-green-600 font-medium'>
                    {alumni.achievement}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Alumni Stories Section */}
          <div>
            <div className='text-center mb-10'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                Stories from Our Alumni
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Read about the journeys and experiences of our graduates
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {alumniStories.map((story) => (
                <Card
                  key={story.id}
                  className='bg-white border-2 border-gray-200 hover:border-primary-green-300 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl overflow-hidden group cursor-pointer'
                  onClick={() => setSelectedStory(story)}
                >
                  <div className='relative h-48 w-full overflow-hidden'>
                    <Image
                      src={story.imageUrl}
                      alt={story.title}
                      fill
                      className='object-cover group-hover:scale-110 transition-transform duration-300'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-3 line-clamp-2'>
                      {story.title}
                    </h3>
                    <p className='text-gray-600 mb-4 line-clamp-3 leading-relaxed'>
                      {story.excerpt}
                    </p>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm font-semibold text-gray-900'>
                          {story.author}
                        </p>
                        <p className='text-xs text-gray-600'>{story.authorRole}</p>
                      </div>
                      <button className='text-primary-green-600 font-medium hover:text-primary-green-700 transition-colors flex items-center gap-1 group-hover:gap-2'>
                        Read More
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-4 w-4'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 5l7 7-7 7'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Modal for Full Story */}
      {selectedStory && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4'
          onClick={() => setSelectedStory(null)}
        >
          <div
            className='bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10'>
              <h2 className='text-2xl font-bold text-gray-900'>
                {selectedStory.title}
              </h2>
              <button
                onClick={() => setSelectedStory(null)}
                className='text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full'
                aria-label='Close modal'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='p-6'>
              <div className='relative h-64 w-full rounded-xl overflow-hidden mb-6'>
                <Image
                  src={selectedStory.imageUrl}
                  alt={selectedStory.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, 768px'
                />
              </div>
              <div className='mb-6 pb-6 border-b border-gray-200'>
                <p className='text-gray-700 leading-relaxed text-lg'>
                  {selectedStory.content}
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-lg font-semibold text-gray-900'>
                    {selectedStory.author}
                  </p>
                  <p className='text-sm text-gray-600'>{selectedStory.authorRole}</p>
                </div>
                <p className='text-sm text-gray-500'>{selectedStory.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

