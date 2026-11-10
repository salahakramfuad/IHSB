import React from 'react'
import { cn } from '../../lib/utils'

interface StatProps {
  /** The figure, e.g. "5000+" or a <CountUp /> */
  value: React.ReactNode
  label: string
  /** Optional line of context under the label */
  note?: string
  size?: 'md' | 'lg'
  className?: string
}

/** A ledger entry: large serif numeral over a gold rule, with its label. Render inside a <dl>. */
export default function Stat({ value, label, note, size = 'lg', className }: StatProps) {
  return (
    <div className={cn('flex flex-col-reverse', className)}>
      <dt className='mt-3 border-t border-gold-500/60 pt-3 text-[0.9375rem] font-medium text-ink-muted'>
        {label}
        {note && <span className='mt-0.5 block text-sm font-normal text-ink-subtle'>{note}</span>}
      </dt>
      <dd className={cn('numeral text-ink', size === 'lg' ? 'text-[clamp(2.75rem,2rem+3.4vw,4.75rem)]' : 'text-[clamp(2rem,1.6rem+1.6vw,3rem)]')}>
        {value}
      </dd>
    </div>
  )
}
