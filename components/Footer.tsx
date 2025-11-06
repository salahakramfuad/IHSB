'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

/** Keep static to avoid hydration drift around New Year flipovers. */
const COPYRIGHT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer
      role='contentinfo'
      className='bg-slate-900 text-slate-100 border-t border-slate-700'
    >
      <div className='container mx-auto px-4 py-10'>
        {/* Top: Logo / Quick Links / Contact */}
        <div className='flex flex-wrap gap-8 mb-10 justify-center lg:justify-between'>
          {/* Logo & Desc */}
          <div className='basis-60 grow text-center'>
            <Link
              href='/'
              className='flex justify-center'
              aria-label='IHSB Home'
            >
              <Image
                src='/assets/images/logo.png'
                alt='International Hope School Bangladesh logo'
                width={80}
                height={80}
                priority={false}
                className='object-contain'
              />
            </Link>
            <p className='mt-4 text-slate-400 text-sm'>
              International Hope School Bangladesh
            </p>
          </div>

          {/* Quick Links */}
          <nav
            aria-label='Footer quick links'
            className='basis-60 grow text-center sm:text-left'
          >
            <h3 className='font-semibold mb-4 text-slate-100'>Quick Links</h3>
            <ul className='space-y-2 text-slate-400'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/admissions'
                  className='hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
                >
                  Admissions
                </Link>
              </li>
              <li>
                <Link
                  href='/academics'
                  className='hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
                >
                  Academics
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className='basis-60 grow text-center sm:text-left'>
            <h3 className='font-semibold mb-4 text-slate-100'>
              Contact Information
            </h3>
            <address className='not-italic text-sm text-slate-400 space-y-2'>
              <p>
                <strong className='font-semibold text-slate-200'>
                  Address:
                </strong>{' '}
                Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230
              </p>
              <p>
                <strong className='font-semibold text-slate-200'>Phone:</strong>{' '}
                <a href='tel:+880248956999' className='hover:text-blue-400'>
                  +880 2 4895 6999
                </a>
                {', '}
                <a href='tel:+8801706054122' className='hover:text-blue-400'>
                  017 0605 4122
                </a>
              </p>
              <p>
                <strong className='font-semibold text-slate-200'>Email:</strong>{' '}
                <a
                  href='mailto:info@ihsb.edu.bd'
                  className='hover:text-blue-400'
                >
                  info@ihsb.edu.bd
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom: Social + Copyright */}
        <div className='border-t border-slate-700 pt-6 text-center'>
          <div
            className='flex justify-center gap-5 mb-4'
            aria-label='Social links'
          >
            {/* External links: <a> with rel+target and a11y */}
            <a
              href='https://www.facebook.com/ihsbd.net'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Facebook (opens in a new tab)'
              className='text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
            >
              <svg
                className='h-6 w-6'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24h21.351C23.41 24 24 23.41 24 22.675V1.325C24 .59 23.41 0 22.675 0zm-13.676 20.506v-8.541h-2.873v-3.373h2.873v-2.496c0-2.849 1.739-4.401 4.277-4.401 1.214 0 2.257.09 2.558.131v2.963l-1.756.001c-1.376 0-1.643.654-1.643 1.616v2.186h3.285l-.428 3.373h-2.857v8.541h-3.422z' />
              </svg>
            </a>

            <a
              href='https://www.twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Twitter (opens in a new tab)'
              className='text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
            >
              <svg
                className='h-6 w-6'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M24 4.557a9.831 9.831 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.84 9.84 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482 13.978 13.978 0 01-10.15-5.145 4.822 4.822 0 00-.666 2.475 4.92 4.92 0 002.188 4.096 4.906 4.906 0 01-2.228-.616c-.053 1.98 1.376 3.838 3.407 4.252a4.903 4.903 0 01-2.224.084 4.923 4.923 0 004.598 3.417 9.865 9.865 0 01-7.27 2.014 13.935 13.935 0 007.548 2.209c9.055 0 14.002-7.496 14.002-13.986 0-.214-.004-.428-.014-.641a9.936 9.936 0 002.451-2.539z' />
              </svg>
            </a>

            <a
              href='https://www.instagram.com/lifeatihsb'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram (opens in a new tab)'
              className='text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
            >
              <svg
                className='h-6 w-6'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.315 3.608 1.29.975.975 1.228 2.242 1.29 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.315 2.633-1.29 3.608-.975.975-2.242 1.228-3.608 1.29-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.315-3.608-1.29-.975-.975-1.228-2.242-1.29-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.315-2.633 1.29-3.608.975-.975 2.242-1.228 3.608-1.29C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.743 0 8.333.012 7.053.072 5.456.144 4.006.4 2.87 1.536 1.734 2.672 1.478 4.122 1.406 5.719.346 7.999.334 8.409.334 12c0 3.591.012 4.001.072 5.281.072 1.597.328 3.047 1.464 4.183 1.136 1.136 2.586 1.392 4.183 1.464C8.333 22.988 8.743 23 12 23s3.667-.012 4.947-.072c1.597-.072 3.047-.328 4.183-1.464 1.136-1.136 1.392-2.586 1.464-4.183.06-1.281.072-1.691.072-5.281 0-3.591-.012-4.001-.072-5.281-.072-1.597-.328-3.047-1.464-4.183C19.994.4 18.544.144 16.947.072 15.667.012 15.257 0 12 0z' />
              </svg>
            </a>

            <a
              href='https://www.linkedin.com/company/international-hope-school-bangladesh'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn (opens in a new tab)'
              className='text-slate-400 hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded'
            >
              <svg
                className='h-6 w-6'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
              >
                <path d='M22.225 0h-20.449C.794 0 0 .794 0 1.776v20.449C0 23.207.794 24 1.776 24h20.449C23.207 24 24 23.207 24 22.225V1.776C24 .794 23.207 0 22.225 0zM6.791 20.452H3.116V9.999h3.675v10.453zM4.953 8.477a2.118 2.118 0 110-4.236 2.118 2.118 0 010 4.236zm15.493 11.975h-3.676v-5.678c0-1.352-.025-3.09-1.883-3.09-1.886 0-2.176 1.471-2.176 2.987v5.781h-3.675V9.999h3.529v1.423h.049c.492-.93 1.69-1.914 3.479-1.914 3.717 0 4.405 2.447 4.405 5.623v5.32z' />
              </svg>
            </a>
          </div>

          <p className='text-sm text-slate-400'>
            &copy; {COPYRIGHT_YEAR} International Hope School Bangladesh. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
