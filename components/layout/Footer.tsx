'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { schoolInfo } from '@/data/schoolInfo'

/** Keep static to avoid hydration drift around New Year flipovers. */
const COPYRIGHT_YEAR = new Date().getFullYear()

const socialLinks = [
  { href: schoolInfo.socialMedia.facebook, label: 'Facebook', icon: 'facebook' },
  { href: schoolInfo.socialMedia.instagram, label: 'Instagram', icon: 'instagram' },
  { href: schoolInfo.socialMedia.linkedin, label: 'LinkedIn', icon: 'linkedin' },
  { href: schoolInfo.socialMedia.twitter, label: 'Twitter', icon: 'twitter' }
] as const

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Admissions', href: '/admission' },
  { label: 'Academics', href: '/academics/curriculumn' },
  { label: 'Events', href: '/events' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' }
] as const

const exploreLinks = [
  { label: 'Branches', href: '/uttarasenior' },
  { label: 'Achievements', href: '/achievements/academicachievement' },
  { label: 'Apply Online', href: '/admission/apply' }
] as const

const linkClass =
  'text-white/90 hover:text-primary-green-300 hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green-400 rounded transition-colors'
const headingClass =
  'text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary-green-200 border-b border-primary-green-400/40 pb-2 mb-4 inline-block'

export default function Footer() {
  return (
    <footer
      role='contentinfo'
      className='relative bg-gradient-to-br from-primary-900 via-primary-green-900/95 to-primary-800 text-white overflow-hidden'
    >
      {/* Top accent bar */}
      <div
        className='h-1 w-full bg-gradient-to-r from-primary-green-500 via-primary-green-400 to-primary-500'
        aria-hidden
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16'>
        {/* Main content: responsive grid */}
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12 mb-10 sm:mb-12 lg:mb-14'>
          {/* Brand: full name only; logo and name scale with screen size */}
          <div className='text-center sm:text-left lg:col-span-4'>
            <Link
              href='/'
              className='inline-flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 lg:gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 rounded-lg'
              aria-label={`${schoolInfo.name} – Home`}
            >
              <Image
                src='/assets/images/logo.png'
                alt=''
                width={96}
                height={96}
                className='object-contain rounded-lg p-1 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 shrink-0'
              />
              <div className='text-center sm:text-left min-w-0 flex-1'>
                <span className='text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white leading-tight block max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-none mx-auto sm:mx-0'>
                  {schoolInfo.name}
                </span>
              </div>
            </Link>
            <p className='mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-white/80 max-w-sm mx-auto sm:mx-0 leading-relaxed'>
              {schoolInfo.motto}
            </p>
          </div>

          {/* Links block: on mobile = 2 cols (Quick + Explore); sm+ = 2nd col; lg = cols 5–9 */}
          <div className='grid grid-cols-2 gap-6 sm:gap-4 sm:contents lg:contents'>
            <div className='lg:col-span-3'>
              <h3 className={headingClass}>Quick Links</h3>
              <ul className='space-y-2 sm:space-y-2.5'>
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`inline-flex items-center gap-1.5 text-sm sm:text-base ${linkClass} group`}
                    >
                      <ArrowRight className='h-3.5 w-3.5 shrink-0 opacity-0 -ml-4 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity' />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='lg:col-span-2'>
              <h3 className={headingClass}>Explore</h3>
              <ul className='space-y-2 sm:space-y-2.5'>
                {exploreLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={`text-sm sm:text-base ${linkClass}`}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact: full width mobile, then sm col 2 / lg col 10–12 */}
          <div className='sm:col-span-2 lg:col-span-3'>
            <h3 className={headingClass}>Contact</h3>
            <address className='not-italic space-y-4 sm:space-y-5 text-sm text-white/90 leading-relaxed'>
              <p className='flex items-start gap-3'>
                <MapPin className='h-5 w-5 shrink-0 text-primary-green-400 mt-0.5' aria-hidden />
                <span className='leading-snug'>{schoolInfo.address.main}</span>
              </p>
              <p className='flex items-start sm:items-center gap-3'>
                <Phone className='h-5 w-5 shrink-0 text-primary-green-400' aria-hidden />
                <span className='flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-x-2 sm:gap-y-0'>
                  <a
                    href={`tel:${schoolInfo.phone.main.replace(/\D/g, '')}`}
                    className={`${linkClass} w-fit`}
                  >
                    {schoolInfo.phone.main}
                  </a>
                  <span className='hidden sm:inline text-white/50'>|</span>
                  <a
                    href='tel:+8801706054122'
                    className={`${linkClass} w-fit`}
                  >
                    {schoolInfo.phone.uttaraAdmission}
                  </a>
                </span>
              </p>
              <p className='flex items-start sm:items-center gap-3'>
                <Mail className='h-5 w-5 shrink-0 text-primary-green-400' aria-hidden />
                <a
                  href={`mailto:${schoolInfo.email.general}`}
                  className={`${linkClass} break-all`}
                >
                  {schoolInfo.email.general}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom: Social + Copyright */}
        <div className='border-t border-white/20 pt-8 sm:pt-10 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 sm:gap-8'>
          <p className='text-sm text-white/75 text-center sm:text-left order-2 sm:order-1 max-w-xl leading-relaxed'>
            &copy; {COPYRIGHT_YEAR} {schoolInfo.name}. All rights reserved.
          </p>
          <div
            className='flex items-center justify-center sm:justify-end gap-1 sm:gap-2 order-1 sm:order-2'
            aria-label='Social links'
          >
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={icon}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`${label} (opens in a new tab)`}
                className='p-3 sm:p-2.5 rounded-xl text-white/75 hover:text-primary-green-300 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green-400 min-w-[48px] min-h-[48px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center'
              >
                {icon === 'facebook' && (
                  <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                    <path d='M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24h21.351C23.41 24 24 23.41 24 22.675V1.325C24 .59 23.41 0 22.675 0zm-13.676 20.506v-8.541h-2.873v-3.373h2.873v-2.496c0-2.849 1.739-4.401 4.277-4.401 1.214 0 2.257.09 2.558.131v2.963l-1.756.001c-1.376 0-1.643.654-1.643 1.616v2.186h3.285l-.428 3.373h-2.857v8.541h-3.422z' />
                  </svg>
                )}
                {icon === 'instagram' && (
                  <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                    <path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.315 3.608 1.29.975.975 1.228 2.242 1.29 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.315 2.633-1.29 3.608-.975.975-2.242 1.228-3.608 1.29-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.315-3.608-1.29-.975-.975-1.228-2.242-1.29-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.315-2.633 1.29-3.608.975-.975 2.242-1.228 3.608-1.29C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.743 0 8.333.012 7.053.072 5.456.144 4.006.4 2.87 1.536 1.734 2.672 1.478 4.122 1.406 5.719.346 7.999.334 8.409.334 12c0 3.591.012 4.001.072 5.281.072 1.597.328 3.047 1.464 4.183 1.136 1.136 2.586 1.392 4.183 1.464C8.333 22.988 8.743 23 12 23s3.667-.012 4.947-.072c1.597-.072 3.047-.328 4.183-1.464 1.136-1.136 1.392-2.586 1.464-4.183.06-1.281.072-1.691.072-5.281 0-3.591-.012-4.001-.072-5.281-.072-1.597-.328-3.047-1.464-4.183C19.994.4 18.544.144 16.947.072 15.667.012 15.257 0 12 0z' />
                  </svg>
                )}
                {icon === 'linkedin' && (
                  <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                    <path d='M22.225 0h-20.449C.794 0 0 .794 0 1.776v20.449C0 23.207.794 24 1.776 24h20.449C23.207 24 24 23.207 24 22.225V1.776C24 .794 23.207 0 22.225 0zM6.791 20.452H3.116V9.999h3.675v10.453zM4.953 8.477a2.118 2.118 0 110-4.236 2.118 2.118 0 010 4.236zm15.493 11.975h-3.676v-5.678c0-1.352-.025-3.09-1.883-3.09-1.886 0-2.176 1.471-2.176 2.987v5.781h-3.675V9.999h3.529v1.423h.049c.492-.93 1.69-1.914 3.479-1.914 3.717 0 4.405 2.447 4.405 5.623v5.32z' />
                  </svg>
                )}
                {icon === 'twitter' && (
                  <svg className='h-5 w-5' viewBox='0 0 24 24' fill='currentColor' aria-hidden>
                    <path d='M24 4.557a9.831 9.831 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.84 9.84 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.978 13.978 0 01-10.15-5.145 4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.096 4.906 4.906 0 01-2.228-.616c-.053 1.98 1.376 3.838 3.407 4.252a4.903 4.903 0 01-2.224.084 4.923 4.923 0 004.598 3.417 9.865 9.865 0 01-7.27 2.014 13.935 13.935 0 007.548 2.209c9.055 0 14.002-7.496 14.002-13.986 0-.214-.004-.428-.014-.641a9.936 9.936 0 002.451-2.539z' />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
