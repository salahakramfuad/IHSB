import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'
import LightboxGallery from '../../components/LightboxGallery'

export const metadata: Metadata = {
  title: 'Uttara Junior Section',
  description:
    'Uttara Preschool & Primary Section of IHSB - Nurturing young minds with innovative teaching and engaging learning experiences.',
  openGraph: {
    title: 'Uttara Junior Section | IHSB',
    description: 'Discover our preschool and primary section campus in Uttara.'
  }
}

// Sample images - replace with actual school images
const campusImages = [
  '/assets/images/ihsb.png',
  '/assets/images/teachers.png',
  '/assets/images/students.png',
  '/assets/images/ihsb.jpg'
]

const features = [
  {
    title: 'Nurturing Environment',
    description:
      'A safe and inclusive atmosphere that encourages curiosity, creativity, and confidence.',
    icon: '🌟',
    color: 'from-accent-yellow-400 to-accent-orange-500'
  },
  {
    title: 'Innovative Teaching',
    description:
      'Interactive and engaging teaching methods that make learning fun and effective.',
    icon: '💡',
    color: 'from-accent-blue-400 to-accent-blue-600'
  },
  {
    title: 'Holistic Development',
    description:
      'Focus on cognitive, social, and emotional skills development.',
    icon: '🌱',
    color: 'from-primary-green-400 to-primary-green-600'
  },
  {
    title: 'Dedicated Teachers',
    description:
      'Experienced and caring educators committed to your child\'s success.',
    icon: '👨‍🏫',
    color: 'from-accent-purple-400 to-accent-purple-600'
  }
]

export default function UttaraJuniorPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-blue-50/30'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-accent-blue-600 via-accent-blue-700 to-primary-green-600 text-white py-20 md:py-28'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6'>
              Uttara Preschool & Primary Section
            </h1>
            <p className='text-lg sm:text-xl text-blue-50 mb-4'>
              Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230
            </p>
            <p className='text-base sm:text-lg text-blue-100'>
              Tel: +880.2.48956999, 017 7596 6264
            </p>
          </div>
        </div>
      </section>

      <Section background='white'>
        <div className='max-w-6xl mx-auto'>
          {/* About Section */}
          <Card className='mb-8 border-2 border-accent-blue-200 bg-accent-blue-50'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
              <span className='text-4xl'>🏫</span>
              About Our Section
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              Our preschool and primary section provide a nurturing and engaging
              learning environment where children develop cognitive, social, and
              emotional skills through innovative teaching and interactive
              experiences. We believe in creating a foundation for lifelong
              learning and success.
            </p>
          </Card>

          {/* Our Aim Section */}
          <Card className='mb-8 border-2 border-primary-green-200 bg-primary-green-50'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
              <span className='text-4xl'>🎯</span>
              Our Aim
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              We strive to foster a love for learning in a safe and inclusive
              atmosphere. Our dedicated teachers encourage curiosity, creativity,
              and confidence, preparing students for a bright academic journey.
              Every child is valued, respected, and given opportunities to shine.
            </p>
          </Card>

          {/* Features Grid */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-accent-blue-600 to-primary-green-600 bg-clip-text text-transparent'>
              What Makes Us Special
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className='text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200'
                >
                  <div className={`h-1 bg-gradient-to-r ${feature.color} rounded-t-xl -mx-6 -mt-6 mb-4`}></div>
                  <div className='text-5xl mb-4'>{feature.icon}</div>
                  <h3 className='text-lg font-bold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Campus Life Gallery */}
          <Card className='mb-8 border-2 border-accent-purple-200'>
            <div className='h-2 bg-gradient-to-r from-accent-purple-500 to-accent-purple-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
              <span className='text-4xl'>📸</span>
              Campus Life
            </h2>
            <LightboxGallery
              images={campusImages}
              className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            />
          </Card>
        </div>
      </Section>

      {/* Map Section */}
      <Section background='gray'>
        <div className='max-w-6xl mx-auto'>
          <Card className='border-2 border-primary-green-200'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
              Uttara Preschool & Primary Section Location
            </h2>
            <div className='rounded-lg overflow-hidden shadow-lg'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'
                width='100%'
                height='450'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Uttara Preschool & Primary Section Map'
                className='w-full'
              />
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
