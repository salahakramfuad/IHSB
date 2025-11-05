// app/page.tsx (or pages/index.tsx)
import Image from 'next/image'
import Link from 'next/link'
// Adjust this path if your alias differs:
import { lightTheme, darkTheme } from '/constants/Colors'

// Deterministic helper for placeholder images (swap with /public images later)
const picsum = (seed, w, h) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

// ----- Static content (hydrate-safe)
const highlights = [
  { k: 'Nationalities', v: '48+' },
  { k: 'Student–Teacher', v: '8:1' },
  { k: 'University Offers', v: 'Top 100+' },
  { k: 'IB Avg. Score', v: '35+' }
]

const programs = [
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

const notices = [
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

const news = [
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

const testimonials = [
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

const partners = [
  { name: 'IB World School', img: picsum('partner-ib', 300, 200) },
  { name: 'Cambridge Assessment', img: picsum('partner-cambridge', 300, 200) },
  { name: 'Council of Intl. Schools', img: picsum('partner-cis', 300, 200) },
  { name: 'Eco-Schools', img: picsum('partner-eco', 300, 200) }
]

// Build CSS variables for both themes once (no client-time usage → no hydration issues)
const cssVars = (t) => `
  --primary:${t.primary};
  --secondary:${t.secondary};
  --accent:${t.accent};
  --bg:${t.background};
  --surface:${t.surface};
  --text:${t.text};
  --text-2:${t.textSecondary};
  --border:${t.border};
  --info:${t.info};
  --success:${t.success};
  --warning:${t.warning};
  --error:${t.error};
`

const COPYRIGHT_YEAR = 2025 // keep static or update at deploy time to avoid hydration drift

export default function HomePage() {
  return (
    <>
      {/* Global theme variables (Tailwind dark mode must toggle .dark on <html> or <body>) */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            :root{ ${cssVars(lightTheme)} }
            .dark{ ${cssVars(darkTheme)} }
          `
        }}
      />

      <main className='w-full bg-[var(--bg)] text-[var(--text)]'>
        {/* Hero (full-width) */}
        <section aria-label='Hero' className='relative isolate'>
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
                className='inline-flex items-center rounded-full bg-[var(--warning)] px-6 py-3 font-semibold text-gray-900 shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--warning)]/40'
              >
                Apply Now
              </Link>
              <Link
                href='/visit'
                className='inline-flex items-center rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'
              >
                Book a Campus Tour
              </Link>
            </div>

            {/* Stats */}
            <dl className='mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4'>
              {highlights.map((h) => (
                <div
                  key={h.k}
                  className='rounded-2xl bg-white/10 p-5 backdrop-blur'
                >
                  <dt className='text-sm text-white/80'>{h.k}</dt>
                  <dd className='mt-1 text-3xl font-bold'>{h.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Program pathways */}
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
                  className='overflow-hidden rounded-2xl bg-[var(--surface)] shadow ring-1 ring-[var(--border)] transition-shadow hover:shadow-lg'
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
                      className='mt-4 inline-block font-medium text-[var(--primary)] hover:underline'
                    >
                      Explore program →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Campus life feature grid */}
        <section aria-labelledby='life-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='grid items-center gap-10 lg:grid-cols-2'>
              <div>
                <h2 id='life-h' className='text-3xl font-bold sm:text-4xl'>
                  Beyond the classroom
                </h2>
                <p className='mt-4 text-[var(--text-2)]'>
                  From robotics and Model UN to orchestra, theatre, and
                  competitive sports, students develop leadership and teamwork
                  skills.
                </p>
                <ul className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  {[
                    'STEAM & Design Lab',
                    'Championship Athletics',
                    'Performing Arts',
                    'Residential Life',
                    'Outdoor Education',
                    'Community Service'
                  ].map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <span
                        className='mt-1 inline-block h-2 w-2 rounded-full bg-[var(--primary)]'
                        aria-hidden
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-6 flex gap-4'>
                  <Link
                    href='/campus-life'
                    className='rounded-full bg-[var(--primary)] px-5 py-3 text-white font-semibold hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40'
                  >
                    Explore Campus Life
                  </Link>
                  <Link
                    href='/boarding'
                    className='rounded-full border border-[var(--border)] px-5 py-3 font-semibold hover:bg-[var(--surface)]/60'
                  >
                    Boarding at IHSB
                  </Link>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                {['life1', 'life2', 'life3', 'life4'].map((seed) => (
                  <div
                    key={seed}
                    className='relative aspect-[4/3] overflow-hidden rounded-2xl'
                  >
                    <Image
                      src={picsum(seed, 1200, 900)}
                      alt='Campus life'
                      fill
                      className='object-cover'
                      sizes='(max-width:1024px) 50vw, 33vw'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notices / Upcoming events */}
        <section aria-labelledby='notices-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='flex items-end justify-between gap-4'>
              <h2 id='notices-h' className='text-3xl font-bold sm:text-4xl'>
                Upcoming Events
              </h2>
              <Link
                href='/events'
                className='font-medium text-[var(--primary)] hover:underline'
              >
                View all events →
              </Link>
            </div>
            <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3'>
              {notices.map((n) => (
                <article
                  key={n.title}
                  className='rounded-2xl bg-[var(--surface)] p-6 shadow ring-1 ring-[var(--border)]'
                >
                  <div className='text-sm font-semibold text-[var(--info)]'>
                    {n.date}
                  </div>
                  <h3 className='mt-2 text-lg font-semibold'>{n.title}</h3>
                  <p className='mt-2 text-sm text-[var(--text-2)]'>{n.text}</p>
                  <Link
                    href={n.href}
                    className='mt-3 inline-block font-medium text-[var(--primary)] hover:underline'
                  >
                    Details →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section aria-labelledby='news-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='flex items-end justify-between gap-4'>
              <h2 id='news-h' className='text-3xl font-bold sm:text-4xl'>
                News & Highlights
              </h2>
              <Link
                href='/news'
                className='font-medium text-[var(--primary)] hover:underline'
              >
                Read all news →
              </Link>
            </div>
            <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3'>
              {news.map((item) => (
                <article
                  key={item.title}
                  className='overflow-hidden rounded-2xl bg-[var(--surface)] shadow ring-1 ring-[var(--border)] transition-shadow hover:shadow-lg'
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
                      className='mt-3 inline-block font-medium text-[var(--primary)] hover:underline'
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
                  className='rounded-2xl bg-[var(--surface)] p-6 shadow ring-1 ring-[var(--border)]'
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

        {/* Accreditation & Partners */}
        <section aria-labelledby='partners-h' className='py-16'>
          <div className='mx-auto max-w-7xl px-4'>
            <h2
              id='partners-h'
              className='text-center text-sm font-semibold tracking-wide text-[var(--text-2)]'
            >
              Accredited & Proudly Affiliated
            </h2>
            <div className='mt-6 grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4'>
              {partners.map((p) => (
                <div key={p.name} className='relative h-16 w-36'>
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className='object-contain'
                    sizes='144px'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* International Admissions CTA */}
        <section aria-labelledby='intl-h' className='py-20'>
          <div className='mx-auto max-w-7xl px-4'>
            <div className='grid gap-8 rounded-3xl bg-[color:var(--info)]/10 p-8 ring-1 ring-[var(--info)]/20 sm:grid-cols-2'>
              <div>
                <h2 id='intl-h' className='text-2xl font-bold sm:text-3xl'>
                  International admissions support
                </h2>
                <p className='mt-3 text-[var(--text-2)]'>
                  Moving countries? Our multilingual team assists with visas,
                  placement, language support, and housing.
                </p>
                <ul className='mt-4 list-disc pl-5 text-[var(--text)]'>
                  <li>Rolling admissions and mid-year transfers</li>
                  <li>English language support (EAL)</li>
                  <li>University & career counseling</li>
                  <li>On-campus health & wellbeing center</li>
                </ul>
                <div className='mt-6 flex gap-4'>
                  <Link
                    href='/admissions'
                    className='rounded-full bg-[var(--primary)] px-5 py-3 text-white font-semibold hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40'
                  >
                    Admissions Overview
                  </Link>
                  <Link
                    href='/contact'
                    className='rounded-full border border-[var(--info)] px-5 py-3 font-semibold text-[var(--info)] hover:bg-[var(--surface)]/60'
                  >
                    Talk to an Officer
                  </Link>
                </div>
              </div>
              <div className='relative aspect-[4/3] overflow-hidden rounded-2xl'>
                <Image
                  src={picsum('intl-admissions', 1200, 900)}
                  alt='Admissions officer welcoming a family in the lobby'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby='faq-h' className='py-20'>
          <div className='mx-auto max-w-5xl px-4'>
            <h2 id='faq-h' className='text-3xl font-bold sm:text-4xl'>
              Frequently Asked Questions
            </h2>
            <div className='mt-8 divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]'>
              {[
                {
                  q: 'Which curricula do you offer?',
                  a: 'IB PYP and DP alongside Cambridge IGCSE/A-Levels, with counseling to choose the best pathway.'
                },
                {
                  q: 'Do you provide boarding?',
                  a: 'Yes, weekly and full boarding for Grades 6–12 with supervised study and weekend activities.'
                },
                {
                  q: 'Is financial aid available?',
                  a: 'We offer merit and needs-based scholarships; see Scholarships for deadlines and criteria.'
                },
                {
                  q: 'How do I schedule a visit?',
                  a: 'Book a tour online and our team will confirm your date and send entry instructions.'
                }
              ].map((item) => (
                <details
                  key={item.q}
                  className='group p-6 open:bg-[var(--surface)]'
                >
                  <summary className='flex cursor-pointer list-none items-center justify-between font-medium'>
                    {item.q}
                    <span className='ml-4 rounded-full border border-[var(--border)] px-2 text-xs text-[var(--text-2)] group-open:hidden'>
                      +
                    </span>
                    <span className='ml-4 hidden rounded-full border border-[var(--border)] px-2 text-xs text-[var(--text-2)] group-open:inline'>
                      –
                    </span>
                  </summary>
                  <p className='mt-3 text-[var(--text-2)]'>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter / Lead capture */}
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
                className='w-full flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 shadow focus:border-[var(--primary)] focus:outline-none'
              />
              <button
                type='submit'
                className='rounded-full bg-[var(--primary)] px-6 py-3 font-semibold text-white shadow hover:opacity-90 focus-visible:ring-2 focus-visible:ring-[var(--primary)]/40'
              >
                Subscribe
              </button>
            </form>
            <p className='mt-2 text-xs text-[var(--text-2)]'>
              We respect your privacy and you can unsubscribe anytime.
            </p>
          </div>
        </section>

        {/* JSON-LD (SEO) – static, safe */}
        <script
          type='application/ld+json'
          // Safe because it is static and not user-generated
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
