'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'

type SubLink = { title: string; href: string }
type MenuItem = { title: string; href?: string; subLinks?: SubLink[] }

function useTheme() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)'
    ).matches
    const initial: 'light' | 'dark' = saved || (systemDark ? 'dark' : 'light')
    setTheme(initial)
    document.documentElement.classList.toggle('dark', initial === 'dark')
    setMounted(true)
  }, [])

  const toggle = () => {
    setTheme((prev) => {
      const next: 'light' | 'dark' = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', next === 'dark')
      localStorage.setItem('theme', next)
      return next
    })
  }

  return { theme, toggle, mounted }
}

export default function Nav() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [dropdownOpenIdx, setDropdownOpenIdx] = useState<number | null>(null)
  const [mobileDropdownOpenIdx, setMobileDropdownOpenIdx] = useState<
    number | null
  >(null)

  const navRef = useRef<HTMLElement | null>(null)
  const drawerRef = useRef<HTMLElement | null>(null)

  const { theme, toggle, mounted } = useTheme()

  const menuItems: MenuItem[] = useMemo(
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

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      const insideNav = navRef.current?.contains(t)
      const insideDrawer = drawerRef.current?.contains(t)
      if (!insideNav) setDropdownOpenIdx(null)
      if (isDrawerOpen && !insideDrawer) setIsDrawerOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
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

  useEffect(() => {
    if (!isDrawerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isDrawerOpen])

  const toggleDropdown = (idx: number) =>
    setDropdownOpenIdx((prev) => (prev === idx ? null : idx))
  const toggleMobileDropdown = (idx: number) =>
    setMobileDropdownOpenIdx((prev) => (prev === idx ? null : idx))

  return (
    <nav
      ref={navRef as React.RefObject<HTMLElement>}
      className='bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700'
    >
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
          <div className='hidden md:flex flex-col text-xl font-semibold text-slate-800 dark:text-slate-100 leading-tight'>
            <span className='text-center'>International Hope</span>
            <span className='text-center'>School Bangladesh</span>
          </div>
        </Link>

        {/* Desktop menu + SWITCH on same row */}
        <div className='hidden md:block'>
          <ul className='flex items-center gap-6'>
            {menuItems.map((item, idx) => (
              <li key={idx} className='relative'>
                {item.subLinks ? (
                  <>
                    <button
                      className='flex items-center gap-2 py-2 px-1 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                      aria-haspopup='menu'
                      aria-expanded={dropdownOpenIdx === idx}
                      onClick={() => toggleDropdown(idx)}
                      onKeyDown={(
                        e: React.KeyboardEvent<HTMLButtonElement>
                      ) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggleDropdown(idx)
                        }
                      }}
                      type='button'
                    >
                      {item.title}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpenIdx === idx ? 'rotate-180' : ''
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
                    {dropdownOpenIdx === idx && (
                      <div
                        role='menu'
                        className='absolute left-0 top-full mt-2 w-56 rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black/5 dark:ring-white/10 z-50'
                      >
                        <ul className='py-2 text-sm text-slate-700 dark:text-slate-200'>
                          {item.subLinks.map((sub, sIdx) => (
                            <li key={sIdx}>
                              <Link
                                href={sub.href}
                                className='block px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded'
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
                    href={item.href as string}
                    className='py-2 px-1 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}

            {/* THEME SWITCH (desktop) */}
            <li className='ml-2'>
              {mounted && (
                <button
                  type='button'
                  role='switch'
                  aria-checked={theme === 'dark'}
                  onClick={toggle}
                  className='inline-flex items-center gap-2 group select-none'
                  title={
                    theme === 'dark'
                      ? 'Switch to light mode'
                      : 'Switch to dark mode'
                  }
                >
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                        theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </span>
                </button>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile burger (switch is inside the drawer header) */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:focus-visible:ring-slate-600'
          aria-controls='mobile-drawer'
          aria-expanded={isDrawerOpen}
          aria-label='Open main menu'
          type='button'
        >
          <svg className='w-5 h-5' viewBox='0 0 17 14' fill='none'>
            <path
              d='M1 1h15M1 7h15M1 13h15'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <button
          aria-label='Close menu'
          onClick={() => setIsDrawerOpen(false)}
          className='fixed inset-0 z-40 bg-black/30 md:hidden'
          type='button'
        />
      )}

      {/* Mobile drawer */}
      <aside
        id='mobile-drawer'
        ref={drawerRef as React.RefObject<HTMLElement>}
        className={`fixed right-0 top-0 h-full w-4/5 max-w-sm z-50 transform bg-slate-50 dark:bg-slate-900 shadow-xl transition-transform duration-200 md:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className='p-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-slate-800 dark:text-slate-100'>
              Menu
            </span>

            {/* THEME SWITCH (mobile) */}
            {mounted && (
              <button
                type='button'
                role='switch'
                aria-checked={theme === 'dark'}
                onClick={toggle}
                className='inline-flex items-center gap-2 group select-none'
                title={
                  theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
              >
                <span className='text-xs text-slate-700 dark:text-slate-300 hidden sm:inline'>
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </span>
              </button>
            )}
          </div>

          <nav className='grid gap-2'>
            {menuItems.map((item, idx) => (
              <div key={idx} className='space-y-2'>
                {item.subLinks ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(idx)}
                      className='flex w-full items-center justify-between p-2 text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100'
                      aria-expanded={mobileDropdownOpenIdx === idx}
                      aria-controls={`mobile-sub-${idx}`}
                      type='button'
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
                          className='block p-2 text-sm rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href as string}
                    onClick={() => setIsDrawerOpen(false)}
                    className='block p-2 text-sm font-medium rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100'
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
