'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faker } from '@faker-js/faker'
import LightboxGallery from '../../../components/shared/LightboxGallery'
import ImageWithLightbox from '../../../components/shared/ImageWithLightbox'
import Button from '../../../components/ui/Button'
import Card from '../../../components/ui/Card'
import Section from '../../../components/ui/Section'
import { schoolInfo } from '@/data/schoolInfo'

type Facility = { name: string; image: string }
type Tab = 'IGCSE' | 'A Levels'

// Set seed for consistent image generation between server and client
faker.seed(67890)
const BASE_IMAGES = Array.from({ length: 8 }).map(() =>
  faker.image.urlPicsumPhotos({
    width: 1200,
    height: 800,
    blur: 0,
    grayscale: false
  })
)
const FACILITIES: Facility[] = [
  {
    name: 'Indoor sports hall, football field, volleyball and basketball courts',
    image: faker.image.urlPicsumPhotos({ width: 800, height: 500, blur: 0 })
  },
  {
    name: 'Mini golf and tennis courts',
    image: faker.image.urlPicsumPhotos({ width: 800, height: 500 })
  },
  {
    name: 'Table tennis facilities and a fitness center',
    image: faker.image.urlPicsumPhotos({ width: 800, height: 500 })
  },
  {
    name: '550-seated auditorium and 130-bedded hostel',
    image: faker.image.urlPicsumPhotos({ width: 800, height: 500 })
  },
  {
    name: 'Smart boards and multimedia systems',
    image: faker.image.urlPicsumPhotos({ width: 800, height: 500 })
  }
]

const IGCSE_SUBJECTS = [
  'Accounting (0452)',
  'Biology (0610)',
  'Business Studies (0450)',
  'Chemistry (0620)',
  'Information and Communication Technology (0417)',
  'Economics (0455)',
  'English as First Language (0500)',
  'English as a Second Language (0510)',
  'Mathematics (0580)',
  'Additional Mathematics (0606)',
  'Physics (0625)',
  'World Literature (0408)',
  'Computer Science (0478)'
]

const ALEVEL_SUBJECTS = [
  'Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)',
  'Further Mathematics',
  'Chemistry',
  'Physics',
  'Biology',
  'Accounting',
  'Business Studies',
  'Economics'
]

/** Generate consistent fake data once per mount */
function useFakerData() {
  const { gallery, testimonials, staff } = useMemo(() => {
    faker.seed(12345)
    const gallery = BASE_IMAGES.map((src) => ({
      src,
      caption: faker.company.catchPhrase()
    }))
    const testimonials = Array.from({ length: 6 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: `https://i.pravatar.cc/100?img=${faker.number.int({
        min: 1,
        max: 70
      })}`,
      text: faker.lorem.sentences(2),
      grade: `${faker.helpers.arrayElement([
        'Grade',
        'Year'
      ])} ${faker.number.int({ min: 7, max: 12 })}`
    }))
    const staff = Array.from({ length: 4 }).map(() => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      role: faker.helpers.arrayElement([
        'Head of Senior Section',
        'IGCSE Coordinator',
        'A Levels Coordinator',
        'Student Affairs Lead'
      ]),
      photo: `https://i.pravatar.cc/200?img=${faker.number.int({
        min: 1,
        max: 70
      })}`
    }))
    return { gallery, testimonials, staff }
  }, [])
  return { gallery, testimonials, staff }
}

const branchInfo = schoolInfo.branches.uttaraSenior

export default function UttaraSeniorSection() {
  const [activeTab, setActiveTab] = useState<Tab>('IGCSE')
  const { gallery, testimonials, staff } = useFakerData()

  // Map your gallery objects to string[] for LightboxGallery
  const photoSrcs = useMemo(() => gallery.map((g) => g.src), [gallery])

  return (
    <div className='min-h-screen bg-white text-gray-900'>
      {/* Enhanced Hero Section */}
      <section className='relative isolate w-full min-h-[85vh] flex items-center overflow-hidden'>
        {/* Background with Parallax */}
        <div className='absolute inset-0 -z-10'>
          <ImageWithLightbox
            src={BASE_IMAGES[0]}
            alt='Uttara Senior Section Campus'
            fill
            priority
            sizes='100vw'
            className='object-cover scale-110'
          />
          {/* Multi-layer Gradient Overlay */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary-green-900/85 via-accent-blue-900/80 to-accent-purple-900/85' />
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
            <motion.div
              className='mb-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-white/90'>
                <span className='w-2 h-2 bg-accent-yellow-400 rounded-full animate-pulse'></span>
                Senior Section - IGCSE & A Levels
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className='text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className='block'>Uttara Senior</span>
              <span className='block bg-gradient-to-r from-white via-accent-yellow-200 to-white bg-clip-text text-transparent mt-2'>
                Section
              </span>
            </motion.h1>

            {/* Location & Contact */}
            <motion.div
              className='mt-8 space-y-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
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
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className='mt-10 flex flex-wrap gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      <Section background='white' container={false}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* About Section - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Card className='border-2 border-primary-green-200 bg-gradient-to-br from-primary-green-50 to-white hover:shadow-2xl transition-all duration-300'>
              <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='flex items-center gap-4 mb-6'>
                <div className='w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-green-500 to-primary-green-600 flex items-center justify-center text-4xl'>
                  🏛️
                </div>
                <h2 className='text-3xl font-bold text-gray-900'>
                  About Our Section
                </h2>
              </div>
              <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                International Hope School Bangladesh is one of the flourishing
                educational institutions of Bangladesh. The Senior Section features
                an indoor stadium, gymnasium, modern labs, a rich library, a
                550-seat auditorium, a 130-bed hostel, and spacious classrooms.
              </p>
              <p className='text-lg text-gray-700 leading-relaxed'>
                The building sits beside the Junior Section with a large playground and
                landscaped gardens. Rooms are air-conditioned with ample natural
                light and equipped with smart boards, multimedia systems, and
                contemporary science laboratories to meet international standards.
              </p>
            </Card>
          </motion.section>

          {/* Curriculum with centered Tabs - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className='bg-gradient-to-br from-gray-50 to-white border-2 border-accent-blue-200 hover:shadow-2xl transition-all duration-300 relative z-10'>
              <div className='h-2 bg-gradient-to-r from-accent-blue-500 via-primary-green-500 to-accent-purple-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='text-center mb-8'>
                <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-green-600 via-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent'>
                  IHSB Senior Section Curriculum
                </h2>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                  Comprehensive Cambridge IGCSE and A Levels programs designed for academic excellence
                </p>
              </div>

              <div
                role='tablist'
                aria-label='Curriculum Tabs'
                className='flex justify-center gap-4 mb-8'
              >
                {(['IGCSE', 'A Levels'] as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    type='button'
                    role='tab'
                    aria-selected={activeTab === tab}
                    aria-controls={`panel-${tab.replace(' ', '')}`}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-3 rounded-xl border-2 font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green-500
                      ${
                        activeTab === tab
                          ? 'border-primary-green-600 text-primary-green-700 shadow-lg bg-white transform scale-105'
                          : 'border-gray-200 text-gray-600 hover:bg-white/70 hover:border-primary-green-300'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode='wait'>
                {activeTab === 'IGCSE' ? (
                  <motion.div
                    key='igcse'
                    id='panel-IGCSE'
                    role='tabpanel'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white/50 rounded-xl p-6 border border-gray-200'
                  >
                    <p className='text-lg text-gray-700 mb-6 leading-relaxed'>
                      Students typically choose 6–11 Cambridge IGCSE subjects.
                      Additional classes may be arranged to resolve timetable
                      conflicts.
                    </p>
                    <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {IGCSE_SUBJECTS.map((s) => (
                        <li
                          key={s}
                          className='pl-4 relative before:content-["✓"] before:absolute before:left-0 before:text-primary-green-600 before:font-bold text-gray-800 bg-gray-50 rounded-lg p-2 hover:bg-primary-green-50 transition-colors'
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : (
                  <motion.div
                    key='alevels'
                    id='panel-ALevels'
                    role='tabpanel'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white/50 rounded-xl p-6 border border-gray-200'
                  >
                    <p className='text-lg text-gray-700 mb-6 leading-relaxed'>
                      IHSB offers Pearson-Edexcel A Levels and plans to commence
                      Cambridge AS & A Levels soon. Students receive structured
                      support for subject selection and university preparation.
                    </p>
                    <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                      {ALEVEL_SUBJECTS.map((s) => (
                        <li
                          key={s}
                          className='pl-4 relative before:content-["✓"] before:absolute before:left-0 before:text-primary-green-600 before:font-bold text-gray-800 bg-gray-50 rounded-lg p-2 hover:bg-primary-green-50 transition-colors'
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.section>

          {/* Facilities - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
                Our Facilities
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                State-of-the-art facilities designed to support academic excellence and holistic development
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {FACILITIES.map((f, idx) => (
                <Card
                  key={f.name}
                  className='overflow-hidden border-2 border-gray-200 hover:border-primary-green-300 hover:shadow-xl transition-all duration-300'
                >
                  <div className='relative aspect-[16/9] overflow-hidden'>
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      className='object-cover transform hover:scale-110 transition-transform duration-300'
                      unoptimized
                      sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                  </div>
                  <div className='p-6'>
                    <h3 className='text-lg font-bold text-gray-900 group-hover:text-primary-green-600 transition-colors'>
                      {f.name}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Gallery - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='text-center mb-8'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-purple-600 to-accent-blue-600 bg-clip-text text-transparent'>
                Campus Gallery
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Explore our vibrant campus life and modern facilities
              </p>
            </div>
            <Card className='border-2 border-accent-purple-200 bg-gradient-to-br from-accent-purple-50 to-white hover:shadow-2xl transition-all duration-300'>
              <div className='h-2 bg-gradient-to-r from-accent-purple-500 to-accent-purple-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <LightboxGallery
                images={photoSrcs}
                thumbs={photoSrcs}
                leadTitle='Uttara Senior Section'
                leadCaption='Campus Gallery'
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              />
            </Card>
          </motion.section>

          {/* Staff - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-green-600 to-accent-purple-600 bg-clip-text text-transparent'>
                Section Leadership
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Meet our dedicated leadership team committed to student success
              </p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {staff.map((m, idx) => (
                <Card
                  key={m.id}
                  className='text-center border-2 border-gray-200 hover:border-primary-green-300 hover:shadow-xl transition-all duration-300'
                >
                  <div className='relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary-green-200 mb-4 transform hover:scale-105 transition-transform duration-300'>
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-2'>
                    {m.name}
                  </h3>
                  <p className='text-primary-green-600 text-sm font-semibold'>
                    {m.role}
                  </p>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Testimonials - Enhanced */}
          <motion.section
            className='mb-16'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='text-center mb-12'>
              <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent'>
                Student Voices
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Hear from our students about their experiences at IHSB Senior Section
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {testimonials.map((t, idx) => (
                <Card
                  key={t.id}
                  className='border-2 border-gray-200 hover:border-primary-green-300 hover:shadow-xl transition-all duration-300'
                >
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary-green-200'>
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className='object-cover'
                        unoptimized
                      />
                    </div>
                    <div>
                      <figcaption className='font-bold text-gray-900'>
                        {t.name}
                      </figcaption>
                      <p className='text-sm text-primary-green-600 font-semibold'>
                        {t.grade}
                      </p>
                    </div>
                  </div>
                  <blockquote className='text-gray-700 leading-relaxed italic'>
                    "{t.text}"
                  </blockquote>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Contact Section */}
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
      <Section background='gray' container={false}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='text-center mb-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
              Find Us
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Visit our Uttara Senior campus located in the heart of Uttara
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className='border-2 border-primary-green-200 bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden'>
              <div className='h-2 bg-gradient-to-r from-primary-green-500 via-accent-blue-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'
                  width='100%'
                  height='500'
                  style={{ border: 0 }}
                  loading='lazy'
                  allowFullScreen
                  referrerPolicy='no-referrer-when-downgrade'
                  title='IHSB Uttara Senior Section Map'
                  className='w-full'
                />
              </div>
              <div className='mt-6 p-4 bg-gradient-to-r from-primary-green-50 to-accent-blue-50 rounded-lg border border-primary-green-200'>
                <p className='text-center text-gray-700 font-medium'>
                  <span className='font-semibold text-primary-green-700'>Location:</span> {branchInfo.address}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
