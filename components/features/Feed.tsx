// components/Feed.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GraduationCap, BookOpen, MapPin, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Section from '../ui/Section'
import AnnouncementsServer from './AnnouncementsServer'
import AnnouncementBanner from '../shared/AnnouncementBanner'
import NewsServer from './NewsServer'
import EventsServer from './EventsServer'
import HighAchieversServer from './HighAchieversServer'
import ImageWithLightbox from '../shared/ImageWithLightbox'
import { schoolStats } from '@/data/stats'

// ---------- Helper ----------
// TODO: Replace with actual school images when available
const picsum = (seed: string, w: number, h: number): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// ---------- Static Data ----------
// IHSB At a Glance stats
const glanceStats: { k: string; v: string; color: string }[] = [
  { k: 'Students', v: schoolStats.students, color: 'from-primary-500 to-primary-600' },
  { k: 'Clubs', v: schoolStats.clubs, color: 'from-primary-green-500 to-primary-green-600' },
  { k: 'Scholarships', v: schoolStats.scholarships, color: 'from-accent-purple-500 to-accent-purple-600' },
  { k: 'Branches', v: schoolStats.branches, color: 'from-accent-orange-500 to-accent-orange-600' }
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
    color: 'from-accent-pink-500 to-accent-pink-600'
  },
  {
    title: 'Primary Years (Grades 1–5)',
    blurb:
      'Transdisciplinary IB PYP with inquiry projects, maker time, and robust literacy & numeracy.',
    img: picsum('primary', 1200, 800),
    href: '/academics/primary',
    color: 'from-primary-500 to-primary-600'
  },
  {
    title: 'Middle Years (Grades 6–8)',
    blurb:
      'Concept-based curriculum, advisory, and digital fluency with design & STEAM labs.',
    img: picsum('middle', 1200, 800),
    href: '/academics/middle',
    color: 'from-primary-green-500 to-primary-green-600'
  },
  {
    title: 'High School (Grades 9–12)',
    blurb:
      'IB DP & A-Level pathways, research capstone, internships, and college counseling.',
    img: picsum('highschool', 1200, 800),
    href: '/academics/high-school',
    color: 'from-accent-purple-500 to-accent-purple-600'
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
    color: 'bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200'
  },
  {
    quote:
      'The design lab and capstone mentorship helped me build a real prototype and a portfolio for university.',
    name: 'Student, Grade 12',
    color: 'bg-gradient-to-br from-accent-purple-50 to-accent-pink-50 border border-accent-purple-200'
  },
  {
    quote:
      'As an expat family, we value the welcoming community and strong college guidance.',
    name: 'Parent, Grade 9',
    color: 'bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border border-accent-yellow-200'
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
      
      {/* Hero — School vibe */}
      <section aria-label='Hero' className='relative isolate w-full min-h-[72vh] flex items-center overflow-hidden'>
        {/* Background */}
        <div className='absolute inset-0 -z-10'>
          <ImageWithLightbox
            src={picsum('hero-campus', 2400, 1400)}
            alt='IHSB campus with students and modern facilities'
            fill
            priority
            sizes='100vw'
            className='object-cover parallax-slow scale-110'
          />
          {/* School-color overlay: blue/green warmth */}
          <div className='absolute inset-0 bg-gradient-to-br from-primary-800/85 via-primary-700/80 to-secondary-800/85' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-primary-900/30' />
          {/* Vibrant orbs */}
          <div className='absolute top-16 left-12 w-72 h-72 bg-accent-yellow-400/25 rounded-full blur-3xl float-animation' />
          <div className='absolute bottom-24 right-16 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl float-animation-delayed' />
          <div className='absolute top-1/2 left-1/4 w-56 h-56 bg-primary-400/15 rounded-full blur-3xl float-animation' style={{ animationDelay: '1.5s' }} />
          {/* Subtle grid — notebook feel */}
          <div
            className='absolute inset-0 opacity-[0.07]'
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-white relative z-10 w-full'>
          <div className='max-w-4xl'>
            {/* School identity badge */}
            <div className='hero-animate-up mb-6' style={{ animationDelay: '0.2s' }}>
              <div className='inline-flex flex-wrap items-center gap-3'>
                <span className='inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-accent-yellow-300/40 text-sm font-semibold text-white'>
                  <GraduationCap className='w-5 h-5 text-accent-yellow-300' aria-hidden />
                  Est. 1996 · Cambridge Curriculum
                </span>
                <span className='inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-accent-yellow-400/25 border border-accent-yellow-400/50 text-accent-yellow-100 text-sm font-medium'>
                  <Sparkles className='w-4 h-4' />
                  Where Future Leaders Grow
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] hero-animate-up' style={{ animationDelay: '0.35s' }}>
              <span className='block'>International</span>
              <span className='block bg-gradient-to-r from-white via-accent-yellow-100 to-white bg-clip-text text-transparent hero-gradient-text'>
                Hope School
              </span>
              <span className='block'>Bangladesh</span>
              <span className='block mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-accent-yellow-300'>
                Learn · Lead · Succeed
              </span>
            </h1>

            {/* Short tagline */}
            <p className='mt-6 max-w-2xl text-lg sm:text-xl text-white/90 leading-relaxed hero-animate-up' style={{ animationDelay: '0.5s' }}>
              A leading English-medium school. Full Cambridge pathway from early years to A-Level, with character, citizenship, and real-world readiness.
            </p>

            {/* CTAs */}
            <div className='mt-10 flex flex-wrap gap-4 hero-animate-up' style={{ animationDelay: '0.65s' }}>
              <Link href='/admission/apply' className='hero-btn-primary'>
                <Button
                  size='lg'
                  variant='primary'
                  className='bg-accent-yellow-400 text-gray-900 hover:bg-accent-yellow-300 shadow-xl text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold inline-flex items-center gap-2'
                >
                  <BookOpen className='w-5 h-5' aria-hidden />
                  Apply for Admission
                </Button>
              </Link>
              <Link href='/contact'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-2 border-white/90 text-white hover:bg-white/15 backdrop-blur-sm text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold inline-flex items-center gap-2'
                >
                  <MapPin className='w-5 h-5' aria-hidden />
                  Book a Campus Tour
                </Button>
              </Link>
            </div>

            {/* School pride stats */}
            <dl className='mt-14 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 hero-animate-scale' style={{ animationDelay: '0.85s' }}>
              {glanceStats.map((h, idx) => (
                <div
                  key={h.k}
                  className={`hero-stat-card rounded-2xl p-4 sm:p-5 ${idx % 2 === 0 ? 'float-animation' : 'float-animation-delayed'}`}
                  style={{ animationDelay: `${1 + idx * 0.15}s` }}
                >
                  <dt className='text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider mb-1'>{h.k}</dt>
                  <dd className={`text-2xl sm:text-3xl font-extrabold bg-gradient-to-r ${h.color} bg-clip-text text-transparent`}>
                    {h.v}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Scroll cue */}
            <div className='mt-12 sm:mt-14 hero-animate-up' style={{ animationDelay: '1.1s' }}>
              <div className='flex flex-col items-center gap-2 text-white/50'>
                <span className='text-xs sm:text-sm font-medium'>Explore our school</span>
                <div className='w-6 h-10 border-2 border-white/25 rounded-full flex justify-center pt-2'>
                  <div className='w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce' style={{ animationDuration: '2s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IHSB At a Glance Section with 3D Cards */}
      <Section background='white' aria-labelledby='glance-h' className='section-3d'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 id='glance-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-green-600 to-accent-purple-600 bg-clip-text text-transparent mb-4 hero-text-3d'>
              IHSB At a Glance
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto depth-1'>
              International Hope School Bangladesh offers a comprehensive Cambridge curriculum that drives academic excellence and critical thinking, preparing students for future success.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {glanceStats.map((stat, idx) => (
              <div
                key={stat.k}
                className={`stat-card-3d text-center p-6 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 ${idx % 2 === 0 ? 'float-animation' : 'float-animation-delayed'}`}
                style={{ animationDelay: `${idx * 0.3}s` }}
              >
                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 transform hover:scale-110 transition-transform duration-300`}>
                  {stat.v}
                </div>
                <div className='text-sm sm:text-base font-semibold text-gray-700 uppercase tracking-wide'>
                  {stat.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Spirit Section with 3D effects */}
      <Section background='gray' aria-labelledby='spirit-h' className='section-3d relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className='absolute top-0 left-0 w-64 h-64 bg-primary-green-200/40 rounded-full blur-3xl float-animation' />
        <div className='absolute bottom-0 right-0 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl float-animation-delayed' />
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h2 id='spirit-h' className='text-4xl md:text-5xl font-bold text-gray-900 mb-6 hero-text-3d'>
            Our Spirit
          </h2>
          <p className='text-2xl md:text-3xl font-semibold text-primary-green-600 mb-8 depth-2 transform hover:scale-105 transition-transform duration-300 inline-block'>
            Nurturing Growth, Inspiring Futures at International Hope School Bangladesh
          </p>
          <div className='prose prose-lg max-w-none text-gray-700 space-y-4 depth-1'>
            <p className='transform hover:translateZ(10px) transition-transform duration-300'>
              International Hope School Bangladesh, established in 1996, is a leading English medium school in Dhaka and Chittagong, with five branches. We offer the full Cambridge curriculum—from toddler to A-Level—focusing on academic excellence and holistic development.
            </p>
            <p className='transform hover:translateZ(10px) transition-transform duration-300'>
              Our experienced educators create a nurturing environment where students grow through critical thinking, creativity, and leadership. With modern classrooms, science and ICT labs, and diverse extracurricular activities, we provide a well-rounded education tailored to each child's potential.
            </p>
          </div>
          <Link href='/about' className='inline-block mt-8 btn-3d'>
            <Button size='lg' variant='primary' className='bg-primary-green-600 hover:bg-primary-green-700 text-white'>
              Read More
            </Button>
          </Link>
        </div>
      </Section>

      {/* Our High Achievers Section */}
      <Section background='white' aria-labelledby='achievers-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 id='achievers-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent-purple-600 via-accent-pink-500 to-accent-orange-500 bg-clip-text text-transparent mb-4'>
              Our High Achievers
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              At IHSB, our students excel in IGCSE and A Levels, achieving top grades with dedicated guidance and a rigorous curriculum. We ensure academic excellence while preparing them for global success.
            </p>
            <p className='text-sm text-gray-500 mt-2 italic'>
              This is subject to change every year after Cambridge IGCSE, IAS, and IAL results.
            </p>
          </div>
          <HighAchieversServer limit={5} />
        </div>
      </Section>

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
            <h2 id='programs-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-green-600 via-primary-600 to-accent-purple-600 bg-clip-text text-transparent mb-4'>
              Academic Pathways
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Multiple entry points with IB and Cambridge options. Small classes,
              caring mentors, and purposeful assessment.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {programs.map((p, idx) => (
              <Card
                key={p.title}
                image={{
                  src: p.img,
                  alt: `${p.title} students learning`
                }}
                className={`card-3d group hover:shadow-2xl transition-all duration-300 ${idx % 2 === 0 ? 'float-animation' : 'float-animation-delayed'}`}
                style={{ animationDelay: `${idx * 0.4}s` }}
              >
                <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-green-600 transition-colors transform group-hover:translateZ(10px)'>{p.title}</h3>
                <p className='text-sm text-gray-600 leading-relaxed'>{p.blurb}</p>
                <Link
                  href={p.href}
                  className={`mt-4 inline-block font-semibold bg-gradient-to-r ${p.color} bg-clip-text text-transparent hover:underline transition-all transform group-hover:translateX(5px)`}
                >
                  Explore program →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Latest Events Section */}
      <Section background='white' aria-labelledby='events-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-end justify-between gap-4 mb-8'>
            <h2 id='events-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-purple-600 bg-clip-text text-transparent'>
              Latest Events
            </h2>
            <Link
              href='/events'
              className='font-semibold text-primary-green-600 hover:text-primary-green-700 transition-colors text-lg'
            >
              See all events →
            </Link>
          </div>
          <EventsServer limit={3} />
        </div>
      </Section>

      {/* News & Highlights */}
      <Section background='white' aria-labelledby='news-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex items-end justify-between gap-4 mb-8'>
            <h2 id='news-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-purple-600 bg-clip-text text-transparent'>
              Latest News
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

      {/* Publications Section */}
      <Section background='gray' aria-labelledby='publications-h'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-12'>
            <h2 id='publications-h' className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-green-600 to-primary-600 bg-clip-text text-transparent mb-4'>
              Our Publications
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              IHSB publishes engaging platforms where students and teachers collaborate to share achievements, insights, and creativity. These publications foster expression, learning, and a strong school community.
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <Card className='card-3d bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200 hover:shadow-2xl transition-all duration-300 float-animation'>
              <div className='h-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='text-center'>
                <div className='text-6xl mb-4 transform hover:scale-110 hover:rotate-12 transition-all duration-300 inline-block'>📖</div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2 transform hover:translateZ(10px) transition-transform duration-300'>The Hopian</h3>
                <p className='text-sm text-gray-600 mb-4'>{'Student magazine showcasing achievements, stories, and creativity'}</p>
                <Link href='/academics/publication' className='btn-3d inline-block w-full'>
                  <Button variant='outline' size='sm' className='w-full'>
                    View Publications
                  </Button>
                </Link>
              </div>
            </Card>
            <Card className='card-3d bg-gradient-to-br from-primary-green-50 to-white border-2 border-primary-green-200 hover:shadow-2xl transition-all duration-300 float-animation-delayed'>
              <div className='h-2 bg-gradient-to-r from-primary-green-500 to-primary-green-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='text-center'>
                <div className='text-6xl mb-4 transform hover:scale-110 hover:rotate-12 transition-all duration-300 inline-block'>📰</div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2 transform hover:translateZ(10px) transition-transform duration-300'>Hope Central</h3>
                <p className='text-sm text-gray-600 mb-4'>{'Central publication featuring school news and updates'}</p>
                <Link href='/academics/publication' className='btn-3d inline-block w-full'>
                  <Button variant='outline' size='sm' className='w-full'>
                    View Publications
                  </Button>
                </Link>
              </div>
            </Card>
            <Card className='card-3d bg-gradient-to-br from-secondary-50 to-white border-2 border-secondary-200 hover:shadow-2xl transition-all duration-300 float-animation'>
              <div className='h-2 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
              <div className='text-center'>
                <div className='text-6xl mb-4 transform hover:scale-110 hover:rotate-12 transition-all duration-300 inline-block'>🌍</div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2 transform hover:translateZ(10px) transition-transform duration-300'>HopeEarth Magazine</h3>
                <p className='text-sm text-gray-600 mb-4'>{'Environmental awareness and sustainability focused publication'}</p>
                <Link href='/academics/publication' className='btn-3d inline-block w-full'>
                  <Button variant='outline' size='sm' className='w-full'>
                    View Publications
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Testimonials - Colorful gradients */}
      <Section background='gray' aria-labelledby='testimonials-h'>
        <div className='max-w-7xl mx-auto'>
          <h2 id='testimonials-h' className='text-4xl md:text-5xl font-bold text-center mb-4'>
            <span className='bg-gradient-to-r from-accent-purple-600 via-accent-pink-500 to-accent-orange-500 bg-clip-text text-transparent'>
              What our community says
            </span>
          </h2>
          <p className='text-center text-gray-600 mb-12 text-lg'>Hear from students and parents</p>

          <div className='grid grid-cols-1 gap-8 sm:grid-cols-3'>
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className={`${t.color} rounded-2xl p-8 shadow-lg card-3d ${idx % 2 === 0 ? 'float-animation' : 'float-animation-delayed'}`}
                style={{ animationDelay: `${idx * 0.5}s` }}
              >
                <div className='text-4xl mb-4 transform hover:scale-110 transition-transform duration-300 inline-block'>❝</div>
                <blockquote className='text-gray-800 text-lg leading-relaxed mb-6 font-medium transform hover:translateZ(10px) transition-transform duration-300'>
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
            <span className='bg-gradient-to-r from-primary-green-600 to-primary-600 bg-clip-text text-transparent'>
              Accreditation & Partners
            </span>
          </h2>
          <p className='text-center text-gray-600 mb-8'>Recognized by leading educational organizations</p>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {partners.map((p, idx) => (
              <div
                key={p.name}
                className={`tilt-3d flex items-center justify-center rounded-xl border-2 p-6 hover:shadow-xl transition-all transform hover:scale-105 ${
                  idx === 0 ? 'border-primary-200 bg-primary-50 float-animation' :
                  idx === 1 ? 'border-primary-green-200 bg-primary-green-50 float-animation-delayed' :
                  idx === 2 ? 'border-accent-purple-200 bg-accent-purple-50 float-animation' :
                  'border-accent-yellow-200 bg-accent-yellow-50 float-animation-delayed'
                }`}
                style={{ animationDelay: `${idx * 0.3}s` }}
              >
                <ImageWithLightbox
                  src={p.img}
                  alt={p.name}
                  width={180}
                  height={100}
                  className='object-contain transform hover:scale-110 transition-transform duration-300'
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter - Colorful */}
      <Section background='green' aria-labelledby='newsletter-h'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='bg-gradient-to-br from-primary-600 via-primary-green-600 to-secondary-600 rounded-3xl p-12 shadow-xl'>
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
              <Button type='submit' variant='primary' size='lg' className='bg-accent-yellow-400 text-gray-900 hover:bg-accent-yellow-300 shadow-lg'>
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