'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [dropdownOpenIdx, setDropdownOpenIdx] = useState(null)
  const [mobileDropdownOpenIdx, setMobileDropdownOpenIdx] = useState(null)

  const navRef = useRef(null)
  const drawerRef = useRef(null)

  const menuItems = useMemo(
    () => [
      { title: 'Home', href: '/' },
      {
        title: 'Branches',
        subLinks: [
          { title: 'Uttara Senior Section', href: '/uttarasenior' },
          { title: 'Uttara Junior Section', href: '/uttarajunior' },
          { title: 'Gulshan Primary & Middle Section', href: '/gulshanbranch' }
        ]
      },
      {
        title: 'Achievements',
        subLinks: [
          { title: '  Sports  ', href: '/achievements/sports' },
          {
            title: 'Academic Achievements',
            href: '/achievements/academicachievement'
          },
          { title: 'Alumni', href: '/achievements/alumni' }
        ]
      },
      {
        title: 'Academics',
        subLinks: [
          { title: 'Curriculumn', href: '/academics/curriculumn' },
          { title: 'Academic Calendar', href: '/academics/calendar' },
          {
            title: 'Extracurricular Activities',
            href: '/academics/extracurricular'
          },
          { title: 'Clubs', href: '/academics/clubs' },
          { title: 'Scholarship', href: '/academics/scholarship' },
          { title: 'Publicstions', href: '/academics/publication' }
        ]
      },
      {
        title: 'Admissions',
        subLinks: [
          {
            title: 'Admission Procedure',
            href: '/admission/admissionprocedure'
          },
          { title: 'Fees', href: '/admission/fees' },
          { title: 'Apply Online', href: '/admission/apply' }
        ]
      },
      { title: 'About', href: '/about' },
      { title: 'Events', href: '/events' },
      { title: 'Contact', href: '/contact' }
    ],
    []
  )

  // Close on outside click (dropdowns + drawer) & on Escape
  useEffect(() => {
    const onDocMouseDown = (e) => {
      const t = e.target
      const insideNav = navRef.current && navRef.current.contains(t)
      const insideDrawer = drawerRef.current && drawerRef.current.contains(t)
      if (!insideNav) setDropdownOpenIdx(null)
      if (isDrawerOpen && !insideDrawer) setIsDrawerOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpenIdx(null)
        setIsDrawerOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [isDrawerOpen])

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDrawerOpen])

  const toggleDropdown = (idx) => {
    setDropdownOpenIdx((prev) => (prev === idx ? null : idx))
  }
  const toggleMobileDropdown = (idx) => {
    setMobileDropdownOpenIdx((prev) => (prev === idx ? null : idx))
  }

  return (
    <nav ref={navRef} className='bg-slate-50 border-b border-gray-200'>
      <div className='mx-auto max-w-screen-xl flex items-center justify-between p-4'>
        <Link href='/' className='flex items-center gap-3'>
          <Image
            src='/assets/images/logo.png'
            alt='Logo'
            width={60}
            height={60}
            priority
            className='object-contain'
          />
          <div className='hidden md:flex flex-col text-xl font-semibold text-slate-800 leading-tight'>
            <span className='text-center'>International Hope</span>
            <span className='text-center'>School Bangladesh</span>
          </div>
        </Link>

        {/* Mobile burger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300'
          aria-controls='mobile-drawer'
          aria-expanded={isDrawerOpen}
          aria-label='Open main menu'
        >
          <svg
            className='w-5 h-5'
            viewBox='0 0 17 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1 1h15M1 7h15M1 13h15'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        {/* Desktop menu */}
        <div className='hidden md:block'>
          <ul className='flex items-center gap-6'>
            {menuItems.map((item, idx) => (
              <li key={idx} className='relative'>
                {item.subLinks ? (
                  <>
                    <button
                      className='flex items-center gap-2 py-2 px-1 text-slate-700 hover:text-blue-600 transition-colors'
                      aria-haspopup='menu'
                      aria-expanded={dropdownOpenIdx === idx}
                      onClick={() => toggleDropdown(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleDropdown(idx)
                        }
                      }}
                    >
                      {item.title}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpenIdx === idx ? 'rotate-180' : ''
                        }`}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M19 9l-7 7-7-7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                    {dropdownOpenIdx === idx && (
                      <div
                        role='menu'
                        className='absolute left-0 top-full mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black/5 z-50'
                      >
                        <ul className='py-2 text-sm text-gray-700'>
                          {item.subLinks.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                href={sub.href}
                                className='block px-4 py-2 hover:bg-gray-100'
                                onClick={() => setDropdownOpenIdx(null)}
                              >
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className='py-2 px-1 text-slate-700 hover:text-blue-600 transition-colors'
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <button
          aria-label='Close menu'
          onClick={() => setIsDrawerOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 md:hidden'
        />
      )}

      {/* Mobile drawer */}
      <aside
        id='mobile-drawer'
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-4/5 max-w-sm z-50 transform bg-slate-50 shadow-xl transition-transform duration-200 md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className='p-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-slate-800'>Menu</span>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className='p-2 rounded hover:bg-gray-100'
              aria-label='Close menu'
            >
              <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M6 18L18 6M6 6l12 12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>

          <nav className='grid gap-2'>
            {menuItems.map((item, idx) => (
              <div key={idx} className='space-y-2'>
                {item.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(idx)}
                      className='flex w-full items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-gray-100'
                      aria-expanded={mobileDropdownOpenIdx === idx}
                      aria-controls={`mobile-sub-${idx}`}
                    >
                      <span>{item.title}</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          mobileDropdownOpenIdx === idx ? 'rotate-180' : ''
                        }`}
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M19 9l-7 7-7-7'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                    <div
                      id={`mobile-sub-${idx}`}
                      className={`${
                        mobileDropdownOpenIdx === idx ? 'block' : 'hidden'
                      } ml-3`}
                    >
                      {item.subLinks.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className='block p-2 text-sm rounded-md hover:bg-gray-100'
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className='block p-2 text-sm font-medium rounded-md hover:bg-gray-100'
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </nav>
  )
}
