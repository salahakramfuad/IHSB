import React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8125rem] font-semibold leading-none',
  {
    variants: {
      tone: {
        neutral: 'bg-sunken text-ink-muted',
        brand: 'bg-brand-100 text-brand-800 dark:bg-brand-800/70 dark:text-brand-100',
        gold: 'bg-gold-100 text-gold-800 dark:bg-gold-900/70 dark:text-gold-200',
        sky: 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-200',
        danger: 'bg-danger/10 text-danger',
        // On photographs and dark bands
        solid: 'bg-brand-950/80 text-white backdrop-blur-sm'
      }
    },
    defaultVariants: { tone: 'neutral' }
  }
)

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

/** Status or category label. Not interactive (see Tag for a clickable chip). */
export default function Badge({
  tone,
  className,
  children
}: {
  tone?: BadgeTone
  className?: string
  children: React.ReactNode
}) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>
}

interface TagProps {
  children: React.ReactNode
  /** Makes the tag a link (e.g. a filter in the URL) */
  href?: string
  /** Marks the tag as the current filter */
  selected?: boolean
  className?: string
}

/** Chip used for filters and topics. A link when `href` is set. */
export function Tag({ children, href, selected = false, className }: TagProps) {
  const classes = cn(
    'inline-flex min-h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-fast',
    selected
      ? 'border-brand-solid bg-brand-solid text-white'
      : 'border-line-strong text-ink-muted hover:border-brand hover:text-ink',
    className
  )
  if (href) {
    return (
      <Link href={href} scroll={false} aria-current={selected ? 'true' : undefined} className={classes}>
        {children}
      </Link>
    )
  }
  return <span className={classes}>{children}</span>
}
