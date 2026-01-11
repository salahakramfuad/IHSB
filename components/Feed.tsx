// components/Feed.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Button from './ui/Button'
import Card from './ui/Card'
import Section from './ui/Section'
import AnnouncementsServer from './AnnouncementsServer'
import AnnouncementBanner from './AnnouncementBanner'
import NewsServer from './NewsServer'
import ImageWithLightbox from './ImageWithLightbox'

// ---------- Helper ----------
// TODO: Replace with actual school images when available
const picsum = (seed: string, w: number, h: number): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// ---------- Static Data ----------
const highlights: { k: string; v: string; color: string }[] = [
  { k: 'Nationalities', v: '48+', color: 'from-accent-blue-500 to-accent-blue-600' },
  { k: 'Student–Teacher', v: '8:1', color: 'from-primary-green-500 to-primary-green-600' },
  { k: 'University Offers', v: 'Top 100+', color: 'from-accent-purple-500 to-accent-purple-600' },
  { k: 'IB Avg. Score', v: '35+', color: 'from-accent-yellow-400 to-accent-orange-500' }
]

const programs: {
  title: string
  blurb: string
  img: string
  href: string
  color: string
}[] = [
  {
    title: 'Early Years (Ages 3–5)',
    blurb:
      'Reggio-inspired, play-based learning that builds curiosity, language, and social skills.',
    img: picsum('early-years', 1200, 800),
    href: '/academics/early-years',
    color: 'from-accent-pink-400 to-accent-pink-600'
  },
  {
    title: 'Primary Years (Grades 1–5)',
    blurb:
      'Transdisciplinary IB PYP with inquiry projects, maker time, and robust literacy & numeracy.',
    img: picsum('primary', 1200, 800),
    href: '/academics/primary',
    color: 'from-accent-blue-400 to-accent-blue-600'
  },
  {
    title: 'Middle Years (Grades 6–8)',
    blurb:
      'Concept-based curriculum, advisory, and digital fluency with design & STEAM labs.',
    img: picsum('middle', 1200, 800),
    href: '/academics/middle',
    color: 'from-primary-green-400 to-primary-green-600'
  },
  {
    title: 'High School (Grades 9–12)',
    blurb:
      'IB DP & A-Level pathways, research capstone, internships, and college counseling.',
    img: picsum('highschool', 1200, 800),
    href: '/academics/high-school',
    color: 'from-accent-purple-400 to-accent-purple-600'
  }
]

// Notices are now fetched dynamically from Firestore via Announcements component

const news: { title: string; img: string; href: string }[] = [
  {
    title: 'IHSB Robotics Wins Regional Championship',
    img: picsum('robotics-team', 1200, 800),
    href: '/achievements'
  },
  {
    title: 'Student Art Featured at International Biennale',
    img: picsum('student-art', 1200, 800),
    href: '/achievements'
  },
  {
    title: 'Model UN Delegation Earns Outstanding Team Award',
    img: picsum('model-un', 1200, 800),
    href: '/achievements'
  }
]

const testimonials: { quote: string; name: string; color: string }[] = [
  {
    quote:
      'Our daughter found her voice at IHSB. The IB program and teachers nurtured her curiosity and resilience.',
    name: 'Parent, Class of 2025',
    color: 'bg-gradient-to-br from-accent-blue-50 to-primary-green-50'
  },
  {
    quote:
      'The design lab and capstone mentorship helped me build a real prototype and a portfolio for university.',
    name: 'Student, Grade 12',
    color: 'bg-gradient-to-br from-accent-purple-50 to-accent-pink-50'
  },
  {
    quote:
      'As an expat family, we value the welcoming community and strong college guidance.',
    name: 'Parent, Grade 9',
    color: 'bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50'
  }
]

const partners: { name: string; img: string }[] = [
  { name: 'IB World School', img: picsum('partner-ib', 300, 200) },
  {
    name: 'Cambridge Assessment',
    img: picsum('partner-cambridge', 300, 200)
  },
  {
    name: 'Council of Intl. Schools',
    img: picsum('partner-cis', 300, 200)
  },
  { name: 'Eco-Schools', img: picsum('partner-eco', 300, 200) }
]

// ---------- Page ----------
export default function Feed() {
  return (
    <div className='w-full'>
      {/* High-Priority Announcement Banner */}
      <div>
        <AnnouncementBanner />
      </div>
      
      {/* Hero Section with vibrant gradient */}
      <section aria-label='Hero' className='relative isolate w-full overflow-hidden'>
        <div className='absolute inset-0 -z-10'>
          <ImageWithLightbox
            src={picsum('hero-campus', 2400, 1400)}
            alt='IHSB campus with students and modern facilities'
            fill
            priority
            sizes='100vw'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-br from-primary-green-700/90 via-accent-blue-700/85 to-accent-purple-700/90' />
        </div>

        <div className='mx-auto max-w-7xl px-4 py-28 sm:py-36 text-white relative'>
          <div className='max-w-3xl'>
            <h1 className='text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight'>
              International learning for a{' '}
              <span className='text-accent-yellow-400'>changing</span> world
            </h1>
            <p className='mt-6 max-w-2xl text-lg sm:text-xl text-white/95 leading-relaxed'>
              IHSB blends rigorous academics with character education, global
              citizenship, and real-world experiences from Early Years to Grade
              12.
            </p>
            <div className='mt-10 flex flex-wrap gap-4'>
              <Link href='/admission/apply'>
                <Button size='lg' variant='primary' className='bg-accent-yellow-400 text-gray-900 hover:bg-accent-yellow-500 shadow-lg shadow-accent-yellow-500/50 text-lg px-8 py-4'>
                  Apply Now ✨
                </Button>
              </Link>
              <Link href='/contact'>
                <Button size='lg' variant='outline' className='border-2 border-white/90 text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-4'>
                  Book a Campus Tour
                </Button>
              </Link>
            </div>

            <dl className='mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4'>
              {highlights.map((h) => (
                <div
                  key={h.k}
                  className={`rounded-2xl p-5 backdrop-blur-md bg-white/15 border border-white/20 hover:bg-white/25 transition-all transform hover:scale-105`}
                >
                  <dt className='text-xs sm:text-sm text-white/90 font-medium uppercase tracking-wide'>{h.k}</dt>
                  <dd className={`mt-2 text-2xl sm:text-3xl font-bold bg-gradient-to-r ${h.color} bg-clip-text text-transparent`}>{h.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Announcements - Server-side rendered from Firestore */}
      <Section background='gray' aria-labelledby='announcements-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-center justify-between mb-8'>
            <h2 id='announcements-h' className='text-3xl md:text-4xl font-bold text-gray-900'>
              Important Announcements
            </h2>
            <Link
              href='/announcements'
              className='font-semibold text-primary-green-600 hover:text-primary-green-700 transition-colors text-lg'
            >
              See All →
            </Link>
          </div>
          <AnnouncementsServer limit={3} />
        </div>
      </Section>

      {/* Academic Pathways - Colorful */}
      <Section background='white' aria-labelledby='programs-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 id='programs-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-green-600 via-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent mb-4'>
              Academic Pathways
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Multiple entry points with IB and Cambridge options. Small classes,
              caring mentors, and purposeful assessment.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {programs.map((p) => (
              <Card
                key={p.title}
                image={{
                  src: p.img,
                  alt: `${p.title} students learning`
                }}
                className='group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
              >
                <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-green-600 transition-colors'>{p.title}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{p.blurb}</p>
                <Link
                  href={p.href}
                  className={`mt-4 inline-block font-semibold bg-gradient-to-r ${p.color} bg-clip-text text-transparent hover:underline transition-all`}
                >
                  Explore program →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* News & Highlights */}
      <Section background='white' aria-labelledby='news-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-end justify-between gap-4 mb-8'>
            <h2 id='news-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-blue-600 to-accent-purple-600 bg-clip-text text-transparent'>
              News & Highlights
            </h2>
            <Link
              href='/news'
              className='font-semibold text-primary-green-600 hover:text-primary-green-700 transition-colors text-lg'
            >
              See all news →
            </Link>
          </div>

          <NewsServer limit={3} />
        </div>
      </Section>

      {/* Testimonials - Colorful gradients */}
      <Section background='gray' aria-labelledby='testimonials-h'>
        <div className='max-w-7xl mx-auto'>
          <h2 id='testimonials-h' className='text-4xl md:text-5xl font-bold text-center mb-4'>
            <span className='bg-gradient-to-r from-accent-purple-600 via-accent-pink-600 to-accent-orange-500 bg-clip-text text-transparent'>
              What our community says
            </span>
          </h2>
          <p className='text-center text-gray-600 mb-12 text-lg'>Hear from students and parents</p>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className={`${t.color} rounded-2xl p-8 shadow-lg border-2 border-white/50 hover:shadow-2xl transition-all transform hover:-translate-y-1`}
              >
                <div className='text-4xl mb-4'>❝</div>
                <blockquote className='text-gray-800 text-lg leading-relaxed mb-6 font-medium'>
                  {t.quote}
                </blockquote>
                <figcaption className='text-sm font-bold text-gray-700'>
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* Partners */}
      <Section background='white' aria-labelledby='partners-h'>
        <div className='max-w-7xl mx-auto'>
          <h2 id='partners-h' className='text-2xl font-bold text-center mb-2'>
            <span className='bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
              Accreditation & Partners
            </span>
          </h2>
          <p className='text-center text-gray-600 mb-8'>Recognized by leading educational organizations</p>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {partners.map((p, idx) => (
              <div
                key={p.name}
                className={`flex items-center justify-center rounded-xl border-2 p-6 hover:shadow-xl transition-all transform hover:scale-105 ${
                  idx === 0 ? 'border-accent-blue-200 bg-accent-blue-50' :
                  idx === 1 ? 'border-primary-green-200 bg-primary-green-50' :
                  idx === 2 ? 'border-accent-purple-200 bg-accent-purple-50' :
                  'border-accent-yellow-200 bg-accent-yellow-50'
                }`}
              >
                <ImageWithLightbox
                  src={p.img}
                  alt={p.name}
                  width={180}
                  height={100}
                  className='object-contain'
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter - Colorful */}
      <Section background='green' aria-labelledby='newsletter-h'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='bg-gradient-to-br from-accent-blue-500 to-primary-green-500 rounded-3xl p-12 shadow-2xl'>
            <h2 id='newsletter-h' className='text-3xl sm:text-4xl font-bold text-white mb-4'>
              Stay in the loop
            </h2>
            <p className='text-lg text-white/90 mb-8'>
              Get admissions deadlines, event invites, and school news in your
              inbox.
            </p>
            <form
              action='/api/newsletter'
              method='post'
              className='mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto'
            >
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                placeholder='you@example.com'
                className='flex-1 rounded-full px-6 py-4 border-2 border-white/30 bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 focus:bg-white'
              />
              <Button type='submit' variant='primary' size='lg' className='bg-accent-yellow-400 text-gray-900 hover:bg-accent-yellow-500 shadow-lg'>
                Subscribe
              </Button>
            </form>
            <p className='mt-4 text-sm text-white/80'>
              We respect your privacy and you can unsubscribe anytime.
            </p>
          </div>
        </div>
      </Section>

      {/* SEO Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'School',
            name: 'IHSB – International Hope School Bangladesh',
            url: 'https://ihsb.edu.bd',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BD',
              addressLocality: 'Dhaka',
              streetAddress:
                'Plot:07,Road:06,Sector:04, House-25 Rd-06, Dhaka 1230'
            },
            telephone: '+880-2-4895-6999',
            sameAs: [
              'https://www.facebook.com/ihsbd.net',
              'https://www.instagram.com/lifeatihsb'
            ],
            logo: 'https://ihsb.edu.bd/logo.png',
            foundingDate: '1996'
          })
        }}
      />
    </div>
  )
}