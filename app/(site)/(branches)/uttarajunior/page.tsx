import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import LightboxGallery from '../../../components/shared/LightboxGallery'
import ImageWithLightbox from '../../../components/shared/ImageWithLightbox'
import { schoolInfo } from '@/data/schoolInfo'

export const metadata: Metadata = {
  title: 'Uttara Junior Section | Preschool & Primary',
  description:
    'Uttara Preschool & Primary Section of IHSB - Nurturing young minds with innovative teaching and engaging learning experiences in a caring environment.',
  openGraph: {
    title: 'Uttara Junior Section | IHSB',
    description: 'Discover our preschool and primary section campus in Uttara, offering quality early years education with experienced educators.'
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
      'A safe and inclusive atmosphere that encourages curiosity, creativity, and confidence through play-based learning and structured activities.',
    icon: '🌟',
    color: 'from-accent-yellow-400 to-accent-orange-500',
    bgColor: 'bg-accent-yellow-50',
    borderColor: 'border-accent-yellow-200'
  },
  {
    title: 'Innovative Teaching',
    description:
      'Interactive and engaging teaching methods that make learning fun and effective, using modern technology and hands-on experiences.',
    icon: '💡',
    color: 'from-accent-blue-400 to-accent-blue-600',
    bgColor: 'bg-accent-blue-50',
    borderColor: 'border-accent-blue-200'
  },
  {
    title: 'Holistic Development',
    description:
      'Focus on cognitive, social, and emotional skills development to prepare well-rounded individuals ready for future challenges.',
    icon: '🌱',
    color: 'from-primary-green-400 to-primary-green-600',
    bgColor: 'bg-primary-green-50',
    borderColor: 'border-primary-green-200'
  },
  {
    title: 'Dedicated Teachers',
    description:
      'Experienced and caring educators committed to your child\'s success, providing personalized attention and support.',
    icon: '👨‍🏫',
    color: 'from-accent-purple-400 to-accent-purple-600',
    bgColor: 'bg-accent-purple-50',
    borderColor: 'border-accent-purple-200'
  }
]

const programs = [
  {
    title: 'Preschool',
    description: 'Early years foundation for ages 3-5 with play-based learning',
    age: 'Ages 3-5',
    icon: '🎨'
  },
  {
    title: 'Primary',
    description: 'Grades 1-5 with Cambridge curriculum and interactive learning',
    age: 'Grades 1-5',
    icon: '📚'
  }
]

const branchInfo = schoolInfo.branches.uttaraPreschoolPrimary

export default function UttaraJuniorPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-primary-green-50/50'>
      {/* Enhanced Hero Section */}
      <section className='relative isolate w-full min-h-[85vh] flex items-center overflow-hidden'>
        {/* Background with Parallax */}
        <div className='absolute inset-0 -z-10'>
          <ImageWithLightbox
            src='/assets/images/ihsb.png'
            alt='Uttara Junior Section Campus'
            fill
            priority
            sizes='100vw'
            className='object-cover scale-110'
          />
          {/* Multi-layer Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-accent-blue-900/85 via-primary-green-900/80 to-accent-purple-900/85' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
          {/* Dark overlay for better text readability */}
          <div className='absolute inset-0 bg-black/40' />
          
          {/* Background Decorative Elements */}
          <div className='absolute top-20 left-10 w-64 h-64 bg-accent-yellow-400/10 rounded-full blur-3xl' />
          <div className='absolute bottom-20 right-10 w-80 h-80 bg-accent-purple-400/10 rounded-full blur-3xl' />
          <div className='absolute top-1/2 left-1/3 w-48 h-48 bg-accent-blue-400/10 rounded-full blur-3xl' />
        </div>

        {/* Content */}
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 text-white relative z-10 w-full'>
          <div className='max-w-4xl'>
            {/* Badge */}
            <div className='mb-6'>
              <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-white/90'>
                <span className='w-2 h-2 bg-accent-yellow-400 rounded-full animate-pulse'></span>
                Preschool & Primary Section
              </span>
            </div>

            {/* Main Heading */}
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]'>
              <span className='block'>Uttara Junior</span>
              <span className='block bg-gradient-to-r from-white via-accent-yellow-200 to-white bg-clip-text text-transparent mt-2'>
                Preschool & Primary
              </span>
            </h1>

            {/* Location & Contact */}
            <div className='mt-8 space-y-4'>
              <div className='flex items-start gap-3 text-lg sm:text-xl text-white/90'>
                <svg className='w-6 h-6 mt-1 flex-shrink-0 text-accent-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
                <p className='leading-relaxed'>{branchInfo.address}</p>
              </div>
              <div className='flex items-center gap-3 text-lg sm:text-xl text-white/90'>
                <svg className='w-6 h-6 flex-shrink-0 text-accent-yellow-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                </svg>
                <div className='flex flex-wrap gap-2'>
                  {branchInfo.phone.map((phone, idx) => (
                    <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className='hover:text-accent-yellow-400 transition-colors'>
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='mt-10 flex flex-wrap gap-4'>
              <Link href='/admission/apply'>
                <Button 
                  size='lg' 
                  variant='primary' 
                  className='bg-accent-yellow-400 text-gray-900 hover:bg-accent-yellow-500 shadow-2xl text-lg px-8 py-4 rounded-xl font-bold'
                >
                  Apply Now ✨
                </Button>
              </Link>
              <Link href='/contact'>
                <Button 
                  size='lg' 
                  variant='outline' 
                  className='border-2 border-white/90 text-white hover:bg-white/20 backdrop-blur-md text-lg px-8 py-4 rounded-xl font-semibold'
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Modern Design */}
      <Section background='white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-8 mb-16'>
            {/* About Card */}
            <Card className='border-2 border-accent-blue-200 bg-gradient-to-br from-accent-blue-50 to-white hover:shadow-2xl transition-all duration-300'>
              <div className='h-2 bg-gradient-to-r from-accent-blue-500 to-accent-blue-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue-500 to-accent-blue-600 flex items-center justify-center text-4xl'>
                  🏫
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>
                  About Our Section
                </h2>
              </div>
              <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                Our preschool and primary section provide a nurturing and engaging
                learning environment where children develop cognitive, social, and
                emotional skills through innovative teaching and interactive
                experiences.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed'>
                We believe in creating a foundation for lifelong learning and success, 
                preparing each child for their academic journey ahead.
              </p>
            </Card>

            {/* Our Aim Card */}
            <Card className='border-2 border-primary-green-200 bg-gradient-to-br from-primary-green-50 to-white hover:shadow-2xl transition-all duration-300'>
              <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-green-500 to-primary-green-600 flex items-center justify-center text-4xl'>
                  🎯
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>
                  Our Aim
                </h2>
              </div>
              <p className='text-lg text-gray-700 leading-relaxed'>
                We strive to foster a love for learning in a safe and inclusive
                atmosphere. Our dedicated teachers encourage curiosity, creativity,
                and confidence, preparing students for a bright academic journey.
                Every child is valued, respected, and given opportunities to shine.
              </p>
            </Card>
          </div>

          {/* Programs Offered */}
          <div className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-blue-600 via-primary-green-600 to-accent-purple-600 bg-clip-text text-transparent'>
                Programs Offered
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Comprehensive early years education designed to nurture young minds from preschool through primary school
              </p>
            </div>
            <div className='grid md:grid-cols-2 gap-6 max-w-4xl mx-auto'>
              {programs.map((program, idx) => (
                <Card
                  key={idx}
                  className='text-center border-2 border-gray-200 hover:border-accent-blue-300 hover:shadow-xl transition-all duration-300'
                >
                  <div className='h-2 bg-gradient-to-r from-accent-blue-500 via-primary-green-500 to-accent-purple-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
                  <div className='text-6xl mb-4 transform hover:scale-110 transition-transform duration-300 inline-block'>{program.icon}</div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>{program.title}</h3>
                  <p className='text-sm text-primary-green-600 font-semibold mb-3'>{program.age}</p>
                  <p className='text-gray-600 leading-relaxed'>{program.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid - Enhanced */}
          <div className='mb-16'>
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-yellow-500 to-accent-purple-600 bg-clip-text text-transparent'>
                What Makes Us Special
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Our comprehensive approach ensures every child receives the support and opportunities they need to thrive
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`text-center hover:shadow-2xl transition-all duration-300 border-2 ${feature.borderColor} ${feature.bgColor}`}
                >
                  <div className={`h-2 bg-gradient-to-r ${feature.color} rounded-t-xl -mx-6 -mt-6 mb-6`}></div>
                  <div className='text-6xl mb-4 transform hover:scale-110 hover:rotate-12 transition-all duration-300 inline-block'>{feature.icon}</div>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-gray-700 leading-relaxed'>
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Campus Life Gallery - Enhanced */}
          <div className='mb-16'>
            <div className='text-center mb-8'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-purple-600 to-accent-blue-600 bg-clip-text text-transparent'>
                Campus Life
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Experience the vibrant learning environment at our Uttara Junior campus
              </p>
            </div>
            <Card className='border-2 border-accent-purple-200 bg-gradient-to-br from-accent-purple-50 to-white hover:shadow-2xl transition-all duration-300'>
              <div className='h-2 bg-gradient-to-r from-accent-purple-500 to-accent-purple-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <LightboxGallery
                images={campusImages}
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              />
            </Card>
          </div>

          {/* Contact Section - Modern Design */}
          <Card className='mb-8 bg-gradient-to-br from-accent-blue-50 via-primary-green-50 to-accent-purple-50 border-2 border-accent-blue-200 hover:shadow-2xl transition-all duration-300'>
            <div className='h-2 bg-gradient-to-r from-accent-blue-500 via-primary-green-500 to-accent-purple-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue-500 to-primary-green-500 flex items-center justify-center text-4xl'>
                📞
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>
                Contact Us
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <svg className='w-6 h-6 mt-1 text-primary-green-600 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Address</h3>
                    <p className='text-gray-700'>{branchInfo.address}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <svg className='w-6 h-6 mt-1 text-primary-green-600 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                  </svg>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Phone</h3>
                    <div className='space-y-1'>
                      {branchInfo.phone.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className='block text-primary-green-600 hover:text-primary-green-700 transition-colors'>
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <svg className='w-6 h-6 mt-1 text-primary-green-600 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                  </svg>
                  <div>
                    <h3 className='font-semibold text-gray-900 mb-1'>Email</h3>
                    <a href={`mailto:${branchInfo.email}`} className='text-primary-green-600 hover:text-primary-green-700 transition-colors'>
                      {branchInfo.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Link href='/contact' className='w-full'>
                  <Button size='lg' variant='primary' className='w-full bg-primary-green-600 hover:bg-primary-green-700 text-white text-lg py-4 rounded-xl font-semibold'>
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Map Section - Enhanced */}
      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-8'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
              Find Us
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Visit our Uttara Junior campus located in the heart of Uttara
            </p>
          </div>
            <Card className='border-2 border-primary-green-200 bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 via-accent-blue-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'
                width='100%'
                height='500'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Uttara Preschool & Primary Section Map'
                className='w-full'
              />
            </div>
            <div className='mt-6 p-4 bg-gradient-to-r from-primary-green-50 to-accent-blue-50 rounded-lg border border-primary-green-200'>
              <p className='text-center text-gray-700 font-medium'>
                <span className='font-semibold text-primary-green-700'>Location:</span> {branchInfo.address}
              </p>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
