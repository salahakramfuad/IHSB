import React from 'react'
import Link from 'next/link'
import ContourLines from '../patterns/ContourLines'
import { cn } from '../../lib/utils'

export interface Breadcrumb {
  label: string
  href?: string
}

export interface PageHeaderProps {
  title: string
  subtitle?: React.ReactNode
  breadcrumbs?: Breadcrumb[]
  /** Small line above the title (a date, a category) */
  eyebrow?: React.ReactNode
  /** Buttons or links under the subtitle */
  actions?: React.ReactNode
  /** Slot beside the text on wide screens: an image, key facts, or a 3D scene */
  media?: React.ReactNode
  /** Seed for the contour-line pattern, so sections of the site differ slightly */
  patternSeed?: number
  className?: string
  children?: React.ReactNode
}

export function Breadcrumbs({ items, className }: { items: Breadcrumb[]; className?: string }) {
  if (items.length === 0) return null
  return (
    <nav aria-label='Breadcrumb' className={className}>
      <ol className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-subtle'>
        {items.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className='flex items-center gap-2'>
            {index > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className='link-underline hover:text-ink'>
                {crumb.label}
              </Link>
            ) : (
              <span aria-current='page' className='text-ink-muted'>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Page hero. Every public page starts with one: a deep green band that sits
 * under the transparent navbar, with breadcrumbs, the page's single <h1>, a
 * short lead, and optional actions and media.
 */
export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  eyebrow,
  actions,
  media,
  patternSeed = 7,
  className,
  children
}: PageHeaderProps) {
  return (
    <header className={cn('on-dark relative isolate overflow-hidden bg-brand-900', className)}>
      <div
        className='absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_88%_0%,rgb(var(--brand-600)/0.6),transparent_62%)]'
        aria-hidden
      />
      <ContourLines seed={patternSeed} lines={12} className='-z-10 text-gold-300 opacity-40' />

      <div
        className={cn(
          'container grid items-end gap-10 pb-14 pt-[calc(var(--nav-height)+2.75rem)] md:pb-20 md:pt-[calc(var(--nav-height)+4rem)]',
          media && 'lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]'
        )}
      >
        <div className='max-w-3xl'>
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} className='mb-6' />}
          {eyebrow && <p className='mb-3 text-sm font-semibold text-gold'>{eyebrow}</p>}
          <h1 className='font-display text-display-1 text-ink'>{title}</h1>
          <div className='gold-rule mt-6 w-32' aria-hidden />
          {subtitle && <p className='mt-6 max-w-2xl text-lead text-ink-muted'>{subtitle}</p>}
          {actions && <div className='mt-8 flex flex-wrap gap-3'>{actions}</div>}
          {children}
        </div>
        {media && <div className='w-full lg:justify-self-end'>{media}</div>}
      </div>
    </header>
  )
}
