'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faker } from '@faker-js/faker'

type Facility = { name: string; image: string }
type Tab = 'IGCSE' | 'A Levels'

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

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}

export default function UttaraSeniorSection() {
  const [activeTab, setActiveTab] = useState<Tab>('IGCSE')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const { gallery, testimonials, staff } = useFakerData()
  useBodyScrollLock(lightboxOpen)

  const openLightbox = useCallback((idx: number) => {
    setPhotoIndex(idx)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  const onKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') setPhotoIndex((p) => (p + 1) % gallery.length)
      if (e.key === 'ArrowLeft')
        setPhotoIndex((p) => (p - 1 + gallery.length) % gallery.length)
    },
    [lightboxOpen, gallery.length, closeLightbox]
  )

  const lightboxRef = useRef<HTMLDivElement | null>(null)

  return (
    <div
      className='min-h-screen bg-white text-[#11181C] dark:bg-[#0D1117] dark:text-[#E6EEF2]'
      onKeyDown={onKey}
    >
      {/* Hero */}
      <section className='relative overflow-hidden'>
        {/* Make overlay ignore clicks so tabs are clickable */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-700 to-blue-500' />
        <div className='relative container mx-auto px-6 py-16'>
          <motion.h1
            className='text-4xl md:text-5xl font-extrabold text-white text-center'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Uttara Senior Section
          </motion.h1>
          <motion.p
            className='text-blue-50 text-center mt-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Plot 7, Road 6, Sector 4, Uttara, Dhaka-1230
          </motion.p>
        </div>
      </section>

      <main className='container mx-auto px-6 py-12'>
        {/* About */}
        <motion.section
          className='mb-12'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-4'>
            About Us
          </h2>
          <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
            International Hope School Bangladesh is one of the flourishing
            educational institutions of Bangladesh. The Senior Section features
            an indoor stadium, gymnasium, modern labs, a rich library, a
            550-seat auditorium, a 130-bed hostel, and spacious classrooms. The
            building sits beside the Junior Section with a large playground and
            landscaped gardens. Rooms are air-conditioned with ample natural
            light and equipped with smart boards, multimedia systems, and
            contemporary science laboratories to meet international standards.
          </p>
        </motion.section>

        {/* Curriculum with centered Tabs */}
        <motion.section
          className='mb-12 bg-gray-50 dark:bg-[#111827] rounded-2xl p-6 relative z-10'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-6 text-center'>
            IHSB Senior Section Curriculum
          </h2>

          <div
            role='tablist'
            aria-label='Curriculum Tabs'
            className='flex justify-center gap-3 mb-6'
          >
            {(['IGCSE', 'A Levels'] as Tab[]).map((tab) => (
              <button
                key={tab}
                type='button'
                role='tab'
                aria-selected={activeTab === tab}
                aria-controls={`panel-${tab.replace(' ', '')}`}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl border transition focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                  ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-700 dark:text-[#95C6E2] shadow-sm bg-white dark:bg-[#15202B]'
                      : 'border-gray-200 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/5'
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  Students typically choose 6–11 Cambridge IGCSE subjects.
                  Additional classes may be arranged to resolve timetable
                  conflicts.
                </p>
                <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-800 dark:text-gray-200'>
                  {IGCSE_SUBJECTS.map((s) => (
                    <li
                      key={s}
                      className='pl-3 relative before:content-["•"] before:absolute before:-left-0.5 before:text-blue-600'
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className='text-gray-700 dark:text-gray-300 mb-4'>
                  IHSB offers Pearson-Edexcel A Levels and plans to commence
                  Cambridge AS & A Levels soon. Students receive structured
                  support for subject selection and university preparation.
                </p>
                <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-800 dark:text-gray-200'>
                  {ALEVEL_SUBJECTS.map((s) => (
                    <li
                      key={s}
                      className='pl-3 relative before:content-["•"] before:absolute before:-left-0.5 before:text-blue-600'
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Facilities */}
        <motion.section
          className='mb-12'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-4'>
            Facilities
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {FACILITIES.map((f) => (
              <article
                key={f.name}
                className='bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden'
              >
                <div className='relative aspect-[16/9]'>
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className='object-cover'
                    unoptimized
                    sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
                    {f.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        {/* Gallery */}
        <motion.section
          className='mb-12'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-4'>
            Gallery
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {gallery.map((g, idx) => (
              <button
                key={g.src}
                onClick={() => openLightbox(idx)}
                className='group relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                aria-label={`Open image: ${g.caption}`}
              >
                <div className='relative aspect-[4/3]'>
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    className='object-cover transition-transform group-hover:scale-105'
                    unoptimized
                    sizes='(max-width:768px) 50vw, (max-width:1200px) 25vw, 25vw'
                  />
                </div>
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center'>
                  <span className='text-white text-sm font-medium'>View</span>
                </div>
              </button>
            ))}
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                ref={lightboxRef}
                className='fixed inset-0 z-50 bg-black/90 backdrop-blur-sm grid place-items-center p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role='dialog'
                aria-modal='true'
                aria-label='Image viewer'
                onClick={(e) => {
                  if (e.target === lightboxRef.current) closeLightbox()
                }}
              >
                <button
                  onClick={closeLightbox}
                  className='absolute top-4 right-4 text-white/90 hover:text-white text-3xl'
                  aria-label='Close'
                >
                  ×
                </button>
                <div className='w-full max-w-5xl'>
                  <div className='relative w-full aspect-[16/9]'>
                    <Image
                      src={gallery[photoIndex].src}
                      alt={gallery[photoIndex].caption}
                      fill
                      className='object-contain'
                      unoptimized
                      sizes='100vw'
                    />
                  </div>
                  <p className='text-white/90 mt-3 text-center'>
                    {gallery[photoIndex].caption}
                  </p>
                  <div className='mt-4 flex items-center justify-between'>
                    <button
                      onClick={() =>
                        setPhotoIndex(
                          (p) => (p - 1 + gallery.length) % gallery.length
                        )
                      }
                      className='px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white'
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() =>
                        setPhotoIndex((p) => (p + 1) % gallery.length)
                      }
                      className='px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white'
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Staff (faker) */}
        <motion.section
          className='mb-12'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-4'>
            Section Leadership
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {staff.map((m) => (
              <div
                key={m.id}
                className='bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-4 text-center'
              >
                <div className='relative w-28 h-28 mx-auto rounded-full overflow-hidden'>
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className='object-cover'
                    unoptimized
                  />
                </div>
                <h3 className='mt-3 font-semibold text-gray-900 dark:text-gray-100'>
                  {m.name}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm'>
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials (faker) */}
        <motion.section
          className='mb-12'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-3xl font-semibold text-blue-700 dark:text-[#95C6E2] mb-4'>
            Student Voices
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className='bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-5'
              >
                <div className='flex items-center gap-3'>
                  <div className='relative w-12 h-12 rounded-full overflow-hidden'>
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>
                  <div>
                    <figcaption className='font-medium text-gray-900 dark:text-gray-100'>
                      {t.name}
                    </figcaption>
                    <p className='text-xs text-gray-600 dark:text-gray-300'>
                      {t.grade}
                    </p>
                  </div>
                </div>
                <blockquote className='mt-3 text-gray-700 dark:text-gray-300'>
                  {t.text}
                </blockquote>
              </figure>
            ))}
          </div>
        </motion.section>

        {/* Map */}
        <motion.section
          className='mb-4'
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className='text-2xl font-semibold text-teal-700 dark:text-[#95C6E2] mb-3 text-center'>
            Uttara Senior Section Location
          </h2>
          <div className='rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10 bg-white dark:bg-[#111827]'>
            <div className='aspect-[16/9]'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'
                className='w-full h-full'
                style={{ border: 0 }}
                loading='lazy'
                allowFullScreen
                referrerPolicy='no-referrer-when-downgrade'
                title='IHSB Uttara Senior Section Map'
              />
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
