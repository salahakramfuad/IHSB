// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ThemeCSSVars from './ThemeCSSVars' // injects CSS variables for light/dark themes

// ---------- Helper ----------
const picsum = (seed: string, w: number, h: number): string =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// ---------- Static Data ----------
const highlights: { k: string; v: string }[] = [
  { k: 'Nationalities', v: '48+' },
  { k: 'Student–Teacher', v: '8:1' },
  { k: 'University Offers', v: 'Top 100+' },
  { k: 'IB Avg. Score', v: '35+' }
]

const programs: {
  title: string
  blurb: string
  img: string
  href: string
}[] = [
  {
    title: 'Early Years (Ages 3–5)',
    blurb:
      'Reggio-inspired, play-based learning that builds curiosity, language, and social skills.',
    img: picsum('early-years', 1200, 800),
    href: '/academics/early-years'
  },
  {
    title: 'Primary Years (Grades 1–5)',
    blurb:
      'Transdisciplinary IB PYP with inquiry projects, maker time, and robust literacy & numeracy.',
    img: picsum('primary', 1200, 800),
    href: '/academics/primary'
  },
  {
    title: 'Middle Years (Grades 6–8)',
    blurb:
      'Concept-based curriculum, advisory, and digital fluency with design & STEAM labs.',
    img: picsum('middle', 1200, 800),
    href: '/academics/middle'
  },
  {
    title: 'High School (Grades 9–12)',
    blurb:
      'IB DP & A-Level pathways, research capstone, internships, and college counseling.',
    img: picsum('highschool', 1200, 800),
    href: '/academics/high-school'
  }
]

const notices: { date: string; title: string; text: string; href: string }[] = [
  {
    date: 'Nov 25',
    title: 'Admissions Open Day',
    text: 'Campus tours, Q&A with faculty, and student panels. RSVP required.',
    href: '/admissions/events/open-day'
  },
  {
    date: 'Dec 04',
    title: 'Scholarship Webinar',
    text: 'Merit and needs-based awards overview with live counseling.',
    href: '/admissions/events/scholarships'
  },
  {
    date: 'Jan 10',
    title: 'IB Diploma Info Night',
    text: 'Subject choices, CAS, EE & TOK—parents and Grade 9–10 students welcome.',
    href: '/academics/ib-dp/info-night'
  }
]

const news: { title: string; img: string; href: string }[] = [
  {
    title: 'IHSB Robotics Wins Regional Championship',
    img: picsum('robotics-team', 1200, 800),
    href: '/news/robotics-regional-champs'
  },
  {
    title: 'Student Art Featured at International Biennale',
    img: picsum('student-art', 1200, 800),
    href: '/news/art-biennale-feature'
  },
  {
    title: 'Model UN Delegation Earns Outstanding Team Award',
    img: picsum('model-un', 1200, 800),
    href: '/news/mun-outstanding-team'
  }
]

const testimonials: { quote: string; name: string }[] = [
  {
    quote:
      'Our daughter found her voice at IHSB. The IB program and teachers nurtured her curiosity and resilience.',
    name: 'Parent, Class of 2025'
  },
  {
    quote:
      'The design lab and capstone mentorship helped me build a real prototype and a portfolio for university.',
    name: 'Student, Grade 12'
  },
  {
    quote:
      'As an expat family, we value the welcoming community and strong college guidance.',
    name: 'Parent, Grade 9'
  }
]

const partners: { name: string; img: string }[] = [
  { name: 'IB World School', img: picsum('partner-ib', 300, 200) },
  { name: 'Cambridge Assessment', img: picsum('partner-cambridge', 300, 200) },
  { name: 'Council of Intl. Schools', img: picsum('partner-cis', 300, 200) },
  { name: 'Eco-Schools', img: picsum('partner-eco', 300, 200) }
]

// ---------- Page ----------
export default function Feed() {
  return (
    <>
      <ThemeCSSVars />

      <main className='w-full'>
        <section aria-label='Hero' className='relative isolate w-full'>
          <div className='absolute inset-0 -z-10'>
            <Image
              src={picsum('hero-campus', 2400, 1400)}
              alt='Students walking across a modern green campus with sunlight'
              fill
              priority
              sizes='100vw'
              className='object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60' />
          </div>

          <div className='mx-auto max-w-7xl px-4 py-28 sm:py-36 text-white'>
            <h1 className='text-4xl sm:text-6xl font-bold tracking-tight'>
              International learning for a changing world
            </h1>
            <p className='mt-6 max-w-2xl text-lg sm:text-xl text-white/90'>
              IHSB blends rigorous academics with character education, global
              citizenship, and real-world experiences from Early Years to Grade
              12.
            </p>
            <div className='mt-10 flex flex-wrap gap-4'>
              <Link
                href='/admissions/apply'
                className='inline-flex items-center rounded-full px-6 py-3 font-semibold shadow focus:outline-none focus-visible:ring-2'
                style={{
                  background: 'var(--warning)',
                  color: '#0b1220',
                  boxShadow:
                    '0 8px 24px -8px color-mix(in oklab, var(--warning) 60%, transparent)'
                }}
              >
                Apply Now
              </Link>
              <Link
                href='/visit'
                className='inline-flex items-center rounded-full px-6 py-3 font-semibold focus:outline-none focus-visible:ring-2'
                style={{
                  border: '1px solid rgba(255,255,255,.7)',
                  color: 'white',
                  background: 'transparent'
                }}
              >
                Book a Campus Tour
              </Link>
            </div>

            <dl className='mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4'>
              {highlights.map((h) => (
                <div
                  key={h.k}
                  className='rounded-2xl p-5 backdrop-blur'
                  style={{
                    background:
                      'color-mix(in oklab, var(--surface) 10%, transparent)',
                    border:
                      '1px solid color-mix(in oklab, var(--border) 60%, transparent)'
                  }}
                >
                  <dt className='text-sm text-white/80'>{h.k}</dt>
                  <dd className='mt-1 text-3xl font-bold text-white'>{h.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Academic Pathways */}
        <section aria-labelledby='programs-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 id='programs-h' className='text-3xl font-bold sm:text-4xl'>
              Academic Pathways
            </h2>
            <p className='mt-3 max-w-2xl text-[var(--text-2)]'>
              Multiple entry points with IB and Cambridge options. Small
              classes, caring mentors, and purposeful assessment.
            </p>

            <div className='mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
              {programs.map((p) => (
                <article
                  key={p.title}
                  className='overflow-hidden rounded-2xl shadow transition-shadow hover:shadow-lg ring-1'
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className='relative h-40'>
                    <Image
                      src={p.img}
                      alt={`${p.title} students learning`}
                      fill
                      className='object-cover'
                      sizes='(max-width:768px) 100vw, 25vw'
                      loading='lazy'
                    />
                  </div>
                  <div className='p-5'>
                    <h3 className='text-xl font-semibold'>{p.title}</h3>
                    <p className='mt-2 text-sm text-[var(--text-2)]'>
                      {p.blurb}
                    </p>
                    <Link
                      href={p.href}
                      className='mt-4 inline-block font-medium hover:underline'
                      style={{ color: 'var(--primary)' }}
                    >
                      Explore program →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Notices */}
        <section aria-labelledby='notices-h' className='py-4'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 id='notices-h' className='text-2xl font-semibold'>
              Notices
            </h2>
            <ul className='mt-4 grid gap-4 sm:grid-cols-3'>
              {notices.map((n) => (
                <li
                  key={n.title}
                  className='rounded-2xl ring-1 p-4'
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className='text-sm' style={{ color: 'var(--primary)' }}>
                    {n.date}
                  </div>
                  <div className='mt-1 font-medium'>{n.title}</div>
                  <p className='mt-1 text-sm text-[var(--text-2)]'>{n.text}</p>
                  <Link
                    href={n.href}
                    className='mt-2 inline-block text-sm font-medium hover:underline'
                    style={{ color: 'var(--primary)' }}
                  >
                    Details →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* News & Highlights */}
        <section aria-labelledby='news-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='flex items-end justify-between gap-4'>
              <h2 id='news-h' className='text-3xl font-bold sm:text-4xl'>
                News & Highlights
              </h2>
              <Link
                href='/news'
                className='font-medium hover:underline'
                style={{ color: 'var(--primary)' }}
              >
                Read all news →
              </Link>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3'>
              {news.map((item) => (
                <article
                  key={item.title}
                  className='overflow-hidden rounded-2xl shadow transition-shadow hover:shadow-lg ring-1'
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <div className='relative h-44'>
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className='object-cover'
                      sizes='(max-width:768px) 100vw, 33vw'
                      loading='lazy'
                    />
                  </div>
                  <div className='p-5'>
                    <h3 className='text-lg font-semibold'>{item.title}</h3>
                    <Link
                      href={item.href}
                      className='mt-3 inline-block font-medium hover:underline'
                      style={{ color: 'var(--primary)' }}
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section aria-labelledby='testimonials-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 id='testimonials-h' className='text-3xl font-bold sm:text-4xl'>
              What our community says
            </h2>

            <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3'>
              {testimonials.map((t, idx) => (
                <figure
                  key={idx}
                  className='rounded-2xl p-6 shadow ring-1'
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption className='mt-4 text-sm font-medium text-[var(--text-2)]'>
                    {t.name}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section aria-labelledby='partners-h' className='py-12'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2 id='partners-h' className='text-xl font-semibold'>
              Accreditation & Partners
            </h2>
            <div className='mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4'>
              {partners.map((p) => (
                <div
                  key={p.name}
                  className='flex items-center justify-center rounded-xl ring-1 p-4'
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <Image
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
        </section>

        {/* Newsletter */}
        <section aria-labelledby='newsletter-h' className='py-20'>
          <div className='mx-auto max-w-3xl px-4 text-center'>
            <h2 id='newsletter-h' className='text-2xl font-bold sm:text-3xl'>
              Stay in the loop
            </h2>
            <p className='mt-2 text-[var(--text-2)]'>
              Get admissions deadlines, event invites, and school news in your
              inbox.
            </p>
            <form
              action='/api/newsletter'
              method='post'
              className='mt-6 flex gap-3'
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
                className='w-full flex-1 rounded-full px-4 py-3 shadow focus:outline-none'
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)'
                }}
              />
              <button
                type='submit'
                className='rounded-full px-6 py-3 font-semibold shadow hover:opacity-90 focus-visible:ring-2'
                style={{ background: 'var(--primary)', color: 'white' }}
              >
                Subscribe
              </button>
            </form>
            <p className='mt-2 text-xs text-[var(--text-2)]'>
              We respect your privacy and you can unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* SEO Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'School',
              name: 'IHSB – International Hope School Bangladesh',
              url: 'https://ihsbd.net',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'BD',
                addressLocality: 'Dhaka',
                streetAddress:
                  'Plot:07,Road:06,Sector:04, House-25 Rd-06, Dhaka 1230'
              },
              telephone: '+880-1XXX-XXXXXX',
              sameAs: [
                'https://www.facebook.com/ihsb',
                'https://www.instagram.com/ihsb'
              ],
              logo: 'https://ihsb.edu/logo.png',
              foundingDate: '1996'
            })
          }}
        />
      </main>
    </>
  )
}
