'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navigationMenu, type MenuItem } from '@/data/navigation'
import { schoolInfo } from '@/data/schoolInfo'
import { cn } from '@/lib/utils'
import { buttonStyles } from '../ui/Button'
import ThemeToggle from '../theme/ThemeToggle'

const EASE = [0.22, 1, 0.36, 1] as const

const isActive = (pathname: string, item: MenuItem) =>
  Boolean(item.subLinks?.some((sub) => pathname === sub.href || pathname.startsWith(`${sub.href}/`)))

/**
 * Site navigation. Transparent over the dark page hero, then a solid, blurred
 * bar once the page scrolls. Desktop: mega-menu. Mobile: full-height drawer.
 */
export default function Navbar() {
  const pathname = usePathname() || '/'
  const reduceMotion = useReducedMotion()
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const panelId = useId()

  // Close menus on navigation (state adjusted during render, not in an effect)
  const [lastPathname, setLastPathname] = useState(pathname)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    setOpenMenu(null)
    setDrawerOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mega-menu: close on outside click and Escape (focus returns to the trigger)
  useEffect(() => {
    if (openMenu === null) return
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        triggerRefs.current[openMenu]?.focus()
        setOpenMenu(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openMenu])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])
  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 180)
  }, [cancelClose])
  useEffect(() => cancelClose, [cancelClose])

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpenMenu(index)
      requestAnimationFrame(() => {
        document.getElementById(`${panelId}-${index}`)?.querySelector<HTMLElement>('a')?.focus()
      })
    }
  }

  // Leaving the header with the keyboard closes the open panel
  const onHeaderBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (openMenu !== null && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null)
    }
  }

  const solid = scrolled || openMenu !== null
  const activePanel = openMenu !== null ? navigationMenu[openMenu] : null

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        ref={headerRef}
        onBlur={onHeaderBlur}
        className={cn(
          // Sticky with a negative margin: the page hero slides underneath the bar
          'sticky top-0 z-nav -mb-[var(--nav-height)] border-b transition-[background-color,border-color,box-shadow,color] duration-base',
          solid
            ? 'border-line bg-canvas/90 text-ink shadow-soft backdrop-blur-md'
            : 'on-dark border-transparent bg-transparent'
        )}
      >
        <a
          href='#main'
          className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-overlay focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-brand-950'
        >
          Skip to main content
        </a>

        <div className='container flex h-nav items-center justify-between gap-4'>
          <Link href='/' className='flex min-w-0 items-center gap-3' aria-label={`${schoolInfo.name}, home`}>
            <Image
              src='/assets/images/logo.png'
              alt=''
              width={48}
              height={48}
              priority
              className='h-11 w-11 shrink-0 object-contain'
            />
            <span className='min-w-0 leading-tight' translate='no'>
              <span className='block truncate font-display text-[1.0625rem] font-semibold text-ink sm:text-lg'>
                International Hope School
              </span>
              <span className='block text-xs font-medium text-ink-subtle'>Bangladesh</span>
            </span>
          </Link>

          {/* ---- Desktop navigation ---- */}
          <nav aria-label='Main' className='hidden lg:block'>
            <ul className='flex items-center'>
              {navigationMenu.map((item, index) => {
                const active = isActive(pathname, item)
                return (
                  <li key={item.title}>
                    <button
                      ref={(node) => {
                        triggerRefs.current[index] = node
                      }}
                      type='button'
                      aria-expanded={openMenu === index}
                      aria-controls={`${panelId}-${index}`}
                      onClick={() => setOpenMenu((current) => (current === index ? null : index))}
                      onMouseEnter={() => {
                        cancelClose()
                        setOpenMenu(index)
                      }}
                      onMouseLeave={scheduleClose}
                      onKeyDown={(event) => onTriggerKeyDown(event, index)}
                      className={cn(
                        'relative inline-flex h-10 items-center gap-1 rounded-full px-3 text-[0.9375rem] font-medium text-ink-muted transition-colors duration-fast hover:text-ink xl:px-4',
                        (active || openMenu === index) && 'text-ink'
                      )}
                    >
                      {item.title}
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform duration-fast', openMenu === index && 'rotate-180')}
                        aria-hidden
                      />
                      {active && <span className='absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-gold-400 xl:inset-x-4' aria-hidden />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className='flex shrink-0 items-center gap-1 sm:gap-2'>
            <ThemeToggle className={solid ? undefined : 'hover:bg-white/10'} />
            <Link href='/admission/apply' className={buttonStyles({ variant: 'secondary', size: 'sm' })}>
              Apply now
            </Link>
            <button
              type='button'
              onClick={() => setDrawerOpen(true)}
              aria-haspopup='dialog'
              aria-expanded={drawerOpen}
              aria-controls='mobile-menu'
              aria-label='Open menu'
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden',
                solid ? 'hover:bg-sunken' : 'hover:bg-white/10'
              )}
            >
              <Menu className='h-6 w-6' aria-hidden />
            </button>
          </div>
        </div>

        {/* ---- Mega-menu panel ---- */}
        <AnimatePresence>
          {activePanel?.subLinks && openMenu !== null && (
            <m.div
              key={openMenu}
              id={`${panelId}-${openMenu}`}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: EASE }}
              className='absolute inset-x-0 top-full hidden border-b border-line bg-paper text-ink shadow-raised lg:block'
            >
              <div className='container grid grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,17rem)] gap-10 py-9'>
                <div>
                  <p className='font-display text-display-3 text-ink'>{activePanel.title}</p>
                  <div className='gold-rule mt-4 w-16' aria-hidden />
                  {activePanel.blurb && <p className='mt-4 text-ink-muted'>{activePanel.blurb}</p>}
                </div>

                <ul className='grid grid-cols-2 content-start gap-x-6 gap-y-1'>
                  {activePanel.subLinks.map((sub) => {
                    const current = pathname === sub.href
                    return (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          aria-current={current ? 'page' : undefined}
                          className={cn(
                            'block rounded-md px-4 py-3 transition-colors duration-fast hover:bg-sunken',
                            current && 'bg-sunken'
                          )}
                        >
                          <span className='block font-semibold text-ink'>{sub.title}</span>
                          {sub.description && <span className='mt-0.5 block text-sm text-ink-subtle'>{sub.description}</span>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>

                {activePanel.featured && (
                  <Link
                    href={activePanel.featured.href}
                    className='group relative isolate flex min-h-52 flex-col justify-end overflow-hidden rounded-lg p-5 text-white'
                  >
                    <Image
                      src={activePanel.featured.image}
                      alt=''
                      fill
                      sizes='272px'
                      className='-z-20 object-cover transition-transform duration-slow ease-out group-hover:scale-105'
                    />
                    <span className='absolute inset-0 -z-10 bg-gradient-to-t from-brand-950 via-brand-950/60 to-transparent' aria-hidden />
                    <span className='font-display text-xl font-semibold'>{activePanel.featured.title}</span>
                    <span className='mt-1 text-sm text-white/85'>{activePanel.featured.description}</span>
                  </Link>
                )}
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {drawerOpen && <MobileDrawer pathname={pathname} onClose={() => setDrawerOpen(false)} />}
      </AnimatePresence>
    </LazyMotion>
  )
}

/* ------------------------------------------------------------------ */
/* Mobile drawer                                                        */
/* ------------------------------------------------------------------ */

function MobileDrawer({ pathname, onClose }: { pathname: string; onClose: () => void }) {
  const reduceMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<number | null>(() => {
    const index = navigationMenu.findIndex((item) => isActive(pathname, item))
    return index === -1 ? 0 : index
  })

  // Focus trap, Escape to close, scroll lock, and focus restore
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter(
        (element) => element.offsetParent !== null
      )
    focusables()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div className='fixed inset-0 z-modal lg:hidden'>
      <m.div
        className='absolute inset-0 bg-brand-950/60 backdrop-blur-sm'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-hidden
      />
      <m.div
        ref={panelRef}
        id='mobile-menu'
        role='dialog'
        aria-modal='true'
        aria-label='Menu'
        className='absolute inset-y-0 right-0 flex h-dvh w-[min(24rem,90vw)] flex-col bg-paper pb-[env(safe-area-inset-bottom)] shadow-floating'
        initial={reduceMotion ? { opacity: 0 } : { x: '100%' }}
        animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { x: '100%' }}
        transition={{ duration: 0.32, ease: EASE }}
      >
        <div className='flex h-nav shrink-0 items-center justify-between border-b border-line px-5'>
          <span className='font-display text-lg font-semibold text-ink'>Menu</span>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close menu'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sunken'
          >
            <X className='h-6 w-6' aria-hidden />
          </button>
        </div>

        <nav aria-label='Main' className='flex-1 overflow-y-auto overscroll-contain px-3 py-4'>
          <ul className='space-y-1'>
            <li>
              <Link
                href='/'
                aria-current={pathname === '/' ? 'page' : undefined}
                onClick={onClose}
                className='flex min-h-12 items-center rounded-md px-3 text-base font-semibold text-ink hover:bg-sunken'
              >
                Home
              </Link>
            </li>
            {navigationMenu.map((item, index) => {
              const open = expanded === index
              return (
                <li key={item.title}>
                  <button
                    type='button'
                    aria-expanded={open}
                    aria-controls={`mobile-sub-${index}`}
                    onClick={() => setExpanded(open ? null : index)}
                    className='flex min-h-12 w-full items-center justify-between rounded-md px-3 text-left text-base font-semibold text-ink hover:bg-sunken'
                  >
                    {item.title}
                    <ChevronDown className={cn('h-5 w-5 transition-transform duration-fast', open && 'rotate-180')} aria-hidden />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.ul
                        id={`mobile-sub-${index}`}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: EASE }}
                        className='overflow-hidden'
                      >
                        {item.subLinks?.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              aria-current={pathname === sub.href ? 'page' : undefined}
                              onClick={onClose}
                              className={cn(
                                'ml-3 flex min-h-11 items-center border-l-2 border-line pl-4 pr-3 text-[0.9375rem] text-ink-muted hover:border-gold-500 hover:text-ink',
                                pathname === sub.href && 'border-gold-500 font-semibold text-ink'
                              )}
                            >
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </m.ul>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className='shrink-0 space-y-3 border-t border-line p-5'>
          <Link href='/admission/apply' onClick={onClose} className={buttonStyles({ variant: 'secondary', className: 'w-full' })}>
            Apply now
          </Link>
          <a href={`tel:${schoolInfo.phone.uttaraAdmission}`} className='block text-center text-sm text-ink-muted'>
            Admissions office: <span className='font-semibold text-ink'>{schoolInfo.phone.uttaraAdmission}</span>
          </a>
        </div>
      </m.div>
    </div>
  )
}
