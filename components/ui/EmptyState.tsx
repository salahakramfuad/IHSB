import React from 'react'
import { cn } from '../../lib/utils'

interface EmptyStateProps {
  title: string
  description?: string
  /** A link or button that gives the visitor somewhere to go next */
  action?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

/** Shown when a list has nothing in it yet. Says what is missing and what to do next. */
export default function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-xl flex-col items-center rounded-xl border border-dashed border-line-strong bg-paper px-6 py-14 text-center',
        className
      )}
    >
      {icon && (
        <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sunken text-brand' aria-hidden>
          {icon}
        </div>
      )}
      <h2 className='font-display text-title text-ink'>{title}</h2>
      {description && <p className='mt-2 text-ink-muted'>{description}</p>}
      {action && <div className='mt-6'>{action}</div>}
    </div>
  )
}
