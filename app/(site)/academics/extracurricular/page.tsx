import React from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'

export const metadata: Metadata = {
  title: 'Extracurricular Activities',
  description:
    'Discover diverse extracurricular activities at IHSB - from cultural events and sports competitions to field trips and special celebrations.',
  openGraph: {
    title: 'Extracurricular Activities | IHSB',
    description: 'Enriching activities that complement academic performance and refine social skills.'
  }
}

const activities = [
  {
    category: '🎭 Cultural',
    icon: '🎭',
    color: 'from-accent-pink-500 to-accent-purple-600',
    bgColor: 'bg-gradient-to-br from-accent-pink-50 to-accent-purple-50',
    borderColor: 'border-accent-pink-200',
    items: [
      '💃 Dance competitions',
      '🎉 Cultural functions',
      '🎭 Drama and talent shows',
      '🎤 Singing contests',
      '🌍 International culture festivals',
      '📜 Poetry competitions',
      '🎬 Bangla movie day',
      '🇧🇩 Bangla week',
      '🇬🇧 English week'
    ]
  },
  {
    category: '📚 Academic',
    icon: '📚',
    color: 'from-accent-blue-500 to-indigo-600',
    bgColor: 'bg-gradient-to-br from-accent-blue-50 to-indigo-50',
    borderColor: 'border-accent-blue-200',
    items: [
      '✍️ Handwriting competitions',
      '📝 Essay competitions',
      '🗣️ Debate competitions',
      '🐝 Spelling bee',
      '🇧🇩 Bangla olympiad',
      '🧮 Maths olympiad',
      '🌐 International olympiads',
      '📖 Reading competitions',
      '📚 Book Fair'
    ]
  },
  {
    category: '⚽ Sports',
    icon: '⚽',
    color: 'from-primary-green-500 to-accent-teal-600',
    bgColor: 'bg-gradient-to-br from-primary-green-50 to-accent-teal-50',
    borderColor: 'border-primary-green-200',
    items: [
      '🏓 Table tennis tournaments',
      '🏸 Badminton tournaments',
      '⚽ Football matches',
      '🏀 Basketball games',
      '🏐 Volleyball matches',
      '🏃‍♂️ Athletics competitions'
    ]
  },
  {
    category: '🚌 Field Trips',
    icon: '🚌',
    color: 'from-accent-orange-500 to-accent-yellow-600',
    bgColor: 'bg-gradient-to-br from-accent-orange-50 to-accent-yellow-50',
    borderColor: 'border-accent-orange-200',
    items: [
      '🏛️ Visiting museums',
      '🎢 Visiting amusement parks',
      '🏭 Visiting factories',
      '👧 Kids day out',
      '🧺 Picnics',
      '🎨 Hosting or visiting exhibitions'
    ]
  },
  {
    category: '🎉 Special Events',
    icon: '🎉',
    color: 'from-accent-purple-500 to-accent-pink-600',
    bgColor: 'bg-gradient-to-br from-accent-purple-50 to-accent-pink-50',
    borderColor: 'border-accent-purple-200',
    items: [
      '🎶 Kazi Nazrul Islam day',
      '🎪 Kids shows',
      "👩‍👧 Mother's Day special quiz shows",
      '🍲 Traditional food days',
      '🎪 Fun shows',
      '🔬 Science fairs',
      "🎈 Children's festival",
      '👨‍💼 Profession / career days',
      '🍳 Cooking',
      '👨‍👩‍👧 Kids-and-mothers / kids-and-fathers days',
      '👵 Grandparent\'s day'
    ]
  },
  {
    category: '🎨 Creative',
    icon: '🎨',
    color: 'from-accent-pink-500 to-red-500',
    bgColor: 'bg-gradient-to-br from-accent-pink-50 to-red-50',
    borderColor: 'border-accent-pink-200',
    items: ['🪁 Kite making', '🎨 Art competitions']
  }
]

export default function ExtracurricularPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-primary-50/50 via-white to-primary-green-50/50'>
      <Section background='white'>
        <PageHeader
          title='Extracurricular Activities'
          subtitle='Complementing academic performance and refining social skills through diverse activities'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Extracurricular Activities' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Introduction */}
          <div className='bg-gradient-to-br from-primary-green-50 via-accent-blue-50 to-accent-purple-50 rounded-2xl p-8 mb-12 border-2 border-primary-green-200'>
            <div className='max-w-3xl'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                Enriching Student Life Beyond the Classroom 🌟
              </h2>
              <p className='text-gray-700 leading-relaxed text-lg'>
                At IHSB, we believe that education extends far beyond textbooks.
                Our comprehensive extracurricular program offers students opportunities
                to explore interests, develop talents, build friendships, and create
                lasting memories while complementing their academic journey.
              </p>
            </div>
          </div>

          {/* Activities Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {activities.map((activity, index) => (
              <Card
                key={index}
                className={`${activity.bgColor} border-2 ${activity.borderColor} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
              >
                <div className={`h-2 bg-gradient-to-r ${activity.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='text-5xl transform group-hover:scale-110 transition-transform'>
                    {activity.icon}
                  </div>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {activity.category.replace(/^[^\s]+\s/, '')}
                  </h2>
                </div>
                <ul className='space-y-2'>
                  {activity.items.map((item, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2 text-gray-700 hover:text-gray-900 transition-colors'
                    >
                      <span className='text-lg leading-none mt-1'>{item.match(/^[^\s]+/)?.[0]}</span>
                      <span className='flex-1 text-sm leading-relaxed'>{item.replace(/^[^\s]+\s/, '')}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className='mt-12 grid md:grid-cols-3 gap-6'>
            <Card className='bg-gradient-to-br from-accent-blue-50 to-accent-blue-100 border-2 border-accent-blue-200'>
              <div className='h-1 bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
              <div className='text-4xl mb-3'>🎯</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Skill Development</h3>
              <p className='text-gray-700 text-sm'>
                Build leadership, teamwork, and communication skills through hands-on experiences.
              </p>
            </Card>
            <Card className='bg-gradient-to-br from-primary-green-50 to-primary-green-100 border-2 border-primary-green-200'>
              <div className='h-1 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
              <div className='text-4xl mb-3'>🤝</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Social Growth</h3>
              <p className='text-gray-700 text-sm'>
                Form meaningful friendships and learn to work collaboratively with peers.
              </p>
            </Card>
            <Card className='bg-gradient-to-br from-accent-purple-50 to-accent-purple-100 border-2 border-accent-purple-200'>
              <div className='h-1 bg-gradient-to-r from-accent-purple-500 to-accent-purple-600 rounded-t-xl -mx-6 -mt-6 mb-4'></div>
              <div className='text-4xl mb-3'>💡</div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Creative Expression</h3>
              <p className='text-gray-700 text-sm'>
                Explore talents and interests that may not be covered in regular classes.
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </main>
  )
}
