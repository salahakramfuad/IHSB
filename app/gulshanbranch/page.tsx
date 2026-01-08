import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import PageHeader from '../../components/ui/PageHeader'
import Section from '../../components/ui/Section'
import Card from '../../components/ui/Card'
import LightboxGallery from '../../components/LightboxGallery'

export const metadata: Metadata = {
  title: 'Gulshan Branch',
  description:
    'Gulshan Primary & Middle Section of IHSB - Providing quality pre and primary-school education in a caring, stimulating environment.',
  openGraph: {
    title: 'Gulshan Branch | IHSB',
    description: 'Discover our Gulshan campus offering preschool, primary, and middle section programs.'
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
    title: 'Caring Environment',
    description:
      'A stimulating environment where children develop physical, intellectual, emotional, and social skills.',
    icon: '❤️',
    color: 'from-accent-pink-400 to-accent-pink-600'
  },
  {
    title: 'Confident Teachers',
    description:
      'Well-trained, confident teachers who deliver curriculum fostering each child\'s uniqueness.',
    icon: '👩‍🏫',
    color: 'from-accent-blue-400 to-accent-blue-600'
  },
  {
    title: 'Independent Learning',
    description:
      'Children are encouraged to become independent learners through structured and spontaneous activities.',
    icon: '🚀',
    color: 'from-primary-green-400 to-primary-green-600'
  },
  {
    title: 'Fun Learning',
    description:
      'Discovering that learning is fun through engaging activities and experiences.',
    icon: '🎉',
    color: 'from-accent-yellow-400 to-accent-orange-500'
  }
]

export default function GulshanBranchPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-pink-50/30'>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-br from-primary-green-600 via-accent-teal-600 to-accent-blue-600 text-white py-20 md:py-28'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6'>
              Gulshan Primary & Middle Section
            </h1>
            <p className='text-lg sm:text-xl text-green-50 mb-4'>
              House: 9, Road: 111, Gulshan-2, Dhaka-1212
            </p>
            <p className='text-base sm:text-lg text-green-100'>
              Tel: +880 2 222284242, +88 01791715556
            </p>
          </div>
        </div>
      </section>

      <Section background='white'>
        <div className='max-w-6xl mx-auto'>
          {/* About Section */}
          <Card className='mb-8 border-2 border-primary-green-200 bg-primary-green-50'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
              <span className='text-4xl'>🏛️</span>
              About Our Section
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              The early years are crucial for children's holistic development. A
              quality pre and primary-school education provides children with
              opportunities to build self-confidence, learn social skills, and
              develop learning dispositions. These build a strong foundation for
              children's future learning and success.
            </p>
          </Card>

          {/* Our Aim Section */}
          <Card className='mb-8 border-2 border-accent-pink-200 bg-accent-pink-50'>
            <div className='h-2 bg-gradient-to-r from-accent-pink-500 to-accent-pink-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
              <span className='text-4xl'>🎯</span>
              Our Aim
            </h2>
            <p className='text-lg text-gray-700 leading-relaxed'>
              The School provides a caring, stimulating environment where your
              child will be given the time and opportunity to develop his/her
              physical, intellectual, emotional, and social skills. Our
              well-trained, confident teachers deliver the curriculum in ways that
              foster a child's uniqueness and individuality as they work towards
              common goals. Children are encouraged to become independent learners
              and to discover that learning is fun through structured and
              spontaneous activities.
            </p>
          </Card>

          {/* Features Grid */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-green-600 to-accent-pink-600 bg-clip-text text-transparent'>
              What We Offer
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
          <Card className='mb-8 border-2 border-accent-blue-200'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3'>
              <span className='text-4xl'>📸</span>
              Campus Life
            </h2>
            <LightboxGallery
              images={campusImages}
              className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
            />
          </Card>

          {/* Contact Section */}
          <Card className='mb-8 bg-gradient-to-br from-accent-blue-50 to-primary-green-50 border-2 border-accent-blue-200'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-primary-green-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3'>
              <span className='text-4xl'>📞</span>
              Contact Us
            </h2>
            <div className='space-y-3 text-lg text-gray-700'>
              <p>
                <strong>Address:</strong> House: 9, Road: 111, Gulshan-2, Dhaka-1212
              </p>
              <p>
                <strong>Tel:</strong> +880 2 222284242, +88 01791715556
              </p>
            </div>
          </Card>
        </div>
      </Section>

      {/* Map Section */}
      <Section background='gray'>
        <div className='max-w-6xl mx-auto'>
          <Card className='border-2 border-primary-green-200'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h2 className='text-2xl font-bold text-center text-gray-900 mb-6'>
              Gulshan Primary & Middle Section Location
            </h2>
            <div className='rounded-lg overflow-hidden shadow-lg'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7964749134976!2d90.41484727539148!3d23.79026077864317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c701d7d26cdb%3A0xdfc79709eafbc5df!2sInternational%20Hope%20School%20Bangladesh%20Gulshan%20Branch!5e0!3m2!1sen!2sbd!4v1738794555096!5m2!1sen!2sbd'
                width='100%'
                height='450'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Gulshan Branch Map'
                className='w-full'
              />
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
