import React from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

export const metadata: Metadata = {
  title: 'Clubs',
  description:
    'Join one of our many student clubs at IHSB - from sports to arts, technology to culture. Explore your passions and connect with peers.',
  openGraph: {
    title: 'Student Clubs | IHSB',
    description: 'Explore diverse student clubs and activities at International Hope School Bangladesh.'
  }
}

const clubs = [
  { name: 'Art Club', icon: '🎨', color: 'from-accent-pink-400 to-accent-pink-600' },
  { name: 'Book Club', icon: '📚', color: 'from-accent-blue-400 to-accent-blue-600' },
  { name: 'Chess Club', icon: '♟️', color: 'from-gray-600 to-gray-800' },
  { name: 'Cultural Club', icon: '🌍', color: 'from-primary-green-400 to-primary-green-600' },
  { name: 'Cooking Club', icon: '🍳', color: 'from-accent-orange-400 to-accent-orange-600' },
  { name: 'Dance Club', icon: '💃', color: 'from-accent-purple-400 to-accent-purple-600' },
  { name: 'Debate Club', icon: '🗣️', color: 'from-accent-blue-500 to-accent-blue-700' },
  { name: 'Drama Club', icon: '🎭', color: 'from-accent-pink-500 to-accent-pink-700' },
  { name: 'French Club', icon: '🇫🇷', color: 'from-blue-400 to-blue-600' },
  { name: 'Guidance Club', icon: '🎓', color: 'from-primary-green-500 to-primary-green-700' },
  { name: 'Karate Club', icon: '🥋', color: 'from-red-500 to-red-700' },
  { name: 'Library Club', icon: '🏛️', color: 'from-amber-400 to-amber-600' },
  { name: 'Maths Club', icon: '➗', color: 'from-indigo-400 to-indigo-600' },
  { name: 'Music Club', icon: '🎵', color: 'from-violet-400 to-violet-600' },
  { name: 'Programming Club', icon: '💻', color: 'from-cyan-400 to-cyan-600' },
  { name: 'Robotics Club', icon: '🤖', color: 'from-accent-purple-500 to-accent-purple-700' },
  { name: "Rubik's Cube Club", icon: '🟥', color: 'from-red-400 to-red-600' },
  { name: 'Science Club', icon: '🔬', color: 'from-accent-blue-400 to-accent-blue-600' },
  { name: 'Sewing & Craft Club', icon: '🧵', color: 'from-accent-pink-400 to-accent-pink-600' },
  { name: 'Speakers Club', icon: '🎙️', color: 'from-gray-500 to-gray-700' },
  { name: 'Tidiness Club', icon: '🧹', color: 'from-accent-teal-400 to-accent-teal-600' },
  { name: 'Guitar Club', icon: '🎸', color: 'from-brown-400 to-brown-600' },
  { name: 'Table Tennis Club', icon: '🏓', color: 'from-accent-yellow-400 to-accent-yellow-600' },
  { name: 'Badminton Club', icon: '🏸', color: 'from-green-400 to-green-600' },
  { name: 'Football Club', icon: '⚽', color: 'from-accent-blue-500 to-accent-blue-700' },
  { name: 'Basketball Club', icon: '🏀', color: 'from-orange-500 to-orange-700' }
]

const clubCategories = [
  {
    name: 'Arts & Culture',
    clubs: clubs.filter((c) =>
      ['Art Club', 'Cultural Club', 'Dance Club', 'Drama Club', 'Music Club', 'Guitar Club', 'Book Club'].includes(
        c.name
      )
    ),
    gradient: 'from-accent-pink-500 to-accent-purple-600'
  },
  {
    name: 'Sports',
    clubs: clubs.filter((c) =>
      ['Karate Club', 'Table Tennis Club', 'Badminton Club', 'Football Club', 'Basketball Club'].includes(c.name)
    ),
    gradient: 'from-primary-green-500 to-accent-blue-600'
  },
  {
    name: 'Academic',
    clubs: clubs.filter((c) =>
      ['Maths Club', 'Science Club', 'Debate Club', 'Speakers Club', 'Library Club', "Rubik's Cube Club"].includes(
        c.name
      )
    ),
    gradient: 'from-accent-blue-500 to-indigo-600'
  },
  {
    name: 'Technology',
    clubs: clubs.filter((c) =>
      ['Programming Club', 'Robotics Club'].includes(c.name)
    ),
    gradient: 'from-cyan-500 to-accent-purple-600'
  },
  {
    name: 'Life Skills',
    clubs: clubs.filter((c) =>
      ['Cooking Club', 'Sewing & Craft Club', 'Tidiness Club', 'Chess Club', 'French Club', 'Guidance Club'].includes(
        c.name
      )
    ),
    gradient: 'from-accent-orange-500 to-accent-yellow-600'
  }
]

export default function ClubsPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Student Clubs'
          subtitle='Explore your passions, develop new skills, and connect with peers through our diverse range of student clubs'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Clubs' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Introduction */}
          <div className='bg-gradient-to-br from-primary-green-50 to-accent-blue-50 rounded-2xl p-8 mb-12 border-2 border-primary-green-200'>
            <div className='max-w-3xl'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                Why Join a Club? 🌟
              </h2>
              <p className='text-gray-700 mb-4 leading-relaxed'>
                IHSB Clubs offer fun, learning, and personal growth. They impact
                behavior, attendance, and achievement, fostering a sense of
                belonging and confidence.
              </p>
              <p className='text-gray-700 mb-4 leading-relaxed'>
                Students engage in various teams and clubs, requiring commitment and
                enthusiasm. These activities are rewarding and vital to school life,
                encouraging student involvement and ideas.
              </p>
              <div className='bg-white/80 rounded-xl p-6 border-2 border-primary-green-200'>
                <p className='text-gray-800 font-semibold mb-2'>Our goals include:</p>
                <ul className='list-disc list-inside text-gray-700 space-y-1'>
                  <li>Utilizing school facilities more effectively.</li>
                  <li>Promoting healthy, active lifestyles among students.</li>
                  <li>Providing co-curricular opportunities for all interested students.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Clubs by Category */}
          {clubCategories.map((category, catIndex) => (
            <div key={category.name} className='mb-12'>
              <div className='flex items-center gap-4 mb-6'>
                <div className={`h-1 flex-1 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-900 whitespace-nowrap'>
                  {category.name}
                </h3>
                <div className={`h-1 flex-1 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {category.clubs.map((club, index) => (
                  <Card
                    key={club.name}
                    className={`group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-gray-200 cursor-pointer`}
                  >
                    <div className={`h-1 bg-gradient-to-r ${club.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                    <div className='text-center'>
                      <div className='text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300'>
                        {club.icon}
                      </div>
                      <h4 className='text-base font-bold text-gray-900 group-hover:text-primary-green-600 transition-colors'>
                        {club.name}
                      </h4>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* All Clubs Grid (Alternative view) */}
          <div className='mt-12'>
            <h3 className='text-2xl font-bold text-center text-gray-900 mb-8'>
              Browse All Clubs
            </h3>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
              {clubs.map((club, index) => (
                <Card
                  key={index}
                  className={`group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 cursor-pointer text-center p-4`}
                >
                  <div className={`h-1 bg-gradient-to-r ${club.color} rounded-t-xl -mx-6 -mt-4 mb-3`}></div>
                  <div className='text-4xl mb-2 transform group-hover:scale-110 transition-transform'>
                    {club.icon}
                  </div>
                  <h4 className='text-sm font-semibold text-gray-900 group-hover:text-primary-green-600 transition-colors leading-tight'>
                    {club.name}
                  </h4>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <div className='mt-12 text-center p-6 bg-accent-yellow-50 rounded-xl border-2 border-accent-yellow-200'>
            <p className='text-gray-700 font-medium'>
              <span className='text-2xl mr-2'>📌</span>
              <strong>Note:</strong> Available clubs may vary from one branch to another.
              Contact your branch office for specific club availability.
            </p>
          </div>
        </div>
      </Section>
    </main>
  )
}
