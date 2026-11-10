import React from 'react'
import Link from 'next/link'
import { cn } from '../../lib/utils'

export type SectionTone = 'canvas' | 'paper' | 'sunken' | 'brand'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  /** Surface. Legacy names map onto the tones: white -> canvas, gray -> sunken, green -> brand. */
  background?: SectionTone | 'white' | 'gray' | 'green'
  container?: boolean
  /** Vertical rhythm: `lg` for landing sections, `sm` for compact bands */
  spacing?: 'sm' | 'lg'
}

const tones: Record<SectionTone, string> = {
  canvas: 'bg-canvas',
  paper: 'bg-paper',
  sunken: 'bg-sunken',
  brand: 'on-dark bg-brand-900'
}

const legacy: Record<string, SectionTone> = { white: 'canvas', gray: 'sunken', green: 'brand' }

export default function Section({
  children,
  background = 'canvas',
  container = true,
  spacing = 'lg',
  className,
  ...props
}: SectionProps) {
  const tone = (legacy[background] ?? background) as SectionTone

  return (
    <section
      className={cn('relative', spacing === 'lg' ? 'py-section' : 'py-section-sm', tones[tone], className)}
      {...props}
    >
      {container ? <div className='container'>{children}</div> : children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string
  /** id for aria-labelledby on the parent section */
  id?: string
  /** Short label above the title. Optional: use only when it adds information. */
  eyebrow?: string
  description?: React.ReactNode
  /** Link shown beside the heading, e.g. "All news" */
  action?: { label: string; href: string }
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
  className?: string
}

/** Section title over a gold rule, with optional eyebrow, description and link. */
export function SectionHeader({
  title,
  id,
  eyebrow,
  description,
  action,
  align = 'left',
  as: Heading = 'h2',
  className
}: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-5 md:mb-14',
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && <p className='mb-3 text-sm font-semibold text-gold'>{eyebrow}</p>}
        <Heading id={id} className='font-display text-display-2 text-ink'>
          {title}
        </Heading>
        <div className={cn('mt-5 w-28', centered ? 'gold-rule-center mx-auto' : 'gold-rule')} aria-hidden />
        {description && <p className='mt-5 text-lead text-ink-muted'>{description}</p>}
      </div>

      {action && (
        <Link href={action.href} className='link-underline shrink-0 pb-1 text-[0.9375rem] font-semibold text-brand'>
          {action.label}
        </Link>
      )}
    </div>
  )
}
