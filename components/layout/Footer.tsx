import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { footerNavigation } from '@/data/navigation'
import { schoolInfo } from '@/data/schoolInfo'
import { isMockMode } from '@/lib/mock'
import NewsletterForm from './NewsletterForm'

const socialLinks = [
  { label: 'Facebook', href: schoolInfo.socialMedia.facebook, Icon: Facebook },
  { label: 'Instagram', href: schoolInfo.socialMedia.instagram, Icon: Instagram },
  { label: 'LinkedIn', href: schoolInfo.socialMedia.linkedin, Icon: Linkedin }
] as const

const branches = [
  schoolInfo.branches.uttaraSenior,
  schoolInfo.branches.uttaraPreschoolPrimary,
  schoolInfo.branches.gulshanPrimaryMiddle,
  schoolInfo.branches.gulshanPreschool,
  schoolInfo.branches.chattogram
]

/** Curricula and examinations the school teaches (shown as wordmarks until logo files are supplied). */
const curricula = [
  'Cambridge Early Years',
  'Cambridge Primary',
  'Cambridge Lower Secondary',
  'Cambridge IGCSE',
  'Cambridge International AS & A Level'
]

const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`
const mapHref = (branch: { name: string; address: string }) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${schoolInfo.name} ${branch.name} ${branch.address}`)}`

const linkClass = 'link-underline text-ink-muted hover:text-ink'

function LinkColumn({ title, links }: { title: string; links: ReadonlyArray<{ title: string; href: string }> }) {
  return (
    <nav aria-label={title}>
      <h2 className='font-display text-lg font-semibold text-ink'>{title}</h2>
      <ul className='mt-4 space-y-2.5 text-[0.9375rem]'>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  // "Demo data" badge: only while developing, and only when mock data is being served
  const demoData = process.env.NODE_ENV !== 'production' && isMockMode()

  return (
    <footer className='on-dark relative isolate overflow-hidden bg-brand-950'>
      <div className='tessellate absolute inset-0 -z-10' aria-hidden />

      <div className='container py-section-sm'>
        {/* ---- Identity, newsletter, link columns ---- */}
        <div className='grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,2fr)]'>
          <div>
            <Link href='/' className='inline-flex items-center gap-4' aria-label={`${schoolInfo.name}, home`}>
              <Image src='/assets/images/logo.png' alt='' width={64} height={64} className='h-16 w-16 object-contain' />
              <span className='max-w-[16rem] font-display text-2xl font-semibold leading-tight text-ink' translate='no'>
                {schoolInfo.name}
              </span>
            </Link>
            <p className='mt-5 max-w-md text-ink-muted'>{schoolInfo.motto}.</p>
            <div className='mt-8'>
              <NewsletterForm />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-10 sm:grid-cols-4'>
            <LinkColumn title='School' links={footerNavigation.school} />
            <LinkColumn title='Academics' links={footerNavigation.academics} />
            <LinkColumn title='Admissions' links={footerNavigation.admissions} />
            <div>
              <h2 className='font-display text-lg font-semibold text-ink'>Contact</h2>
              <address className='mt-4 space-y-3 text-[0.9375rem] not-italic text-ink-muted'>
                <p className='flex gap-2.5'>
                  <Phone className='mt-0.5 h-4 w-4 shrink-0 text-gold' aria-hidden />
                  <a href={telHref(schoolInfo.phone.main)} className={linkClass}>
                    {schoolInfo.phone.main}
                  </a>
                </p>
                <p className='flex gap-2.5'>
                  <Mail className='mt-0.5 h-4 w-4 shrink-0 text-gold' aria-hidden />
                  <a href={`mailto:${schoolInfo.email.general}`} className={`${linkClass} break-all`}>
                    {schoolInfo.email.general}
                  </a>
                </p>
                <p className='flex gap-2.5'>
                  <Mail className='mt-0.5 h-4 w-4 shrink-0 text-gold' aria-hidden />
                  <a href={`mailto:${schoolInfo.email.admission}`} className={`${linkClass} break-all`}>
                    {schoolInfo.email.admission}
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>

        {/* ---- Branches ---- */}
        <div className='gold-rule my-12' aria-hidden />
        <section aria-labelledby='footer-branches'>
          <h2 id='footer-branches' className='font-display text-lg font-semibold text-ink'>
            Our branches
          </h2>
          <ul className='mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5'>
            {branches.map((branch) => (
              <li key={branch.name} className='text-sm'>
                <p className='font-semibold text-ink'>{branch.name}</p>
                <p className='mt-1.5 text-ink-subtle'>{branch.address}</p>
                <p className='mt-2'>
                  <a href={telHref(branch.phone[0])} className={linkClass}>
                    {branch.phone[0]}
                  </a>
                </p>
                <p className='mt-1'>
                  <a
                    href={mapHref(branch)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={`${linkClass} inline-flex items-center gap-1.5`}
                  >
                    <MapPin className='h-3.5 w-3.5 text-gold' aria-hidden />
                    Open in Maps<span className='sr-only'> (opens in a new tab)</span>
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Curricula ---- */}
        <div className='gold-rule my-12' aria-hidden />
        <ul aria-label='Curricula taught' className='flex flex-wrap items-center gap-x-8 gap-y-3 font-display text-base text-ink-muted'>
          {curricula.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        {/* ---- Legal row ---- */}
        <div className='mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center'>
          <p className='flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-subtle'>
            <span>
              &copy; {year} {schoolInfo.name}. All rights reserved.
            </span>
            {demoData && (
              <span
                className='inline-flex items-center rounded-full border border-gold-400/60 bg-gold-400/15 px-2.5 py-0.5 text-xs font-semibold text-gold-200'
                title='Mock mode is on: this content is sample data, not from the database'
              >
                Demo data
              </span>
            )}
          </p>

          <ul className='flex items-center gap-2' aria-label='Social media'>
            {socialLinks.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={`${label} (opens in a new tab)`}
                  className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-fast hover:border-gold-400 hover:text-gold'
                >
                  <Icon className='h-5 w-5' aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
