import React from 'react'
import { cn } from '../../lib/utils'

/**
 * Ordered sequence: a history, a process, a schedule.
 *   <Timeline>
 *     <Timeline.Item marker='1996' title='Founded'>…</Timeline.Item>
 *   </Timeline>
 */
function TimelineRoot({ className, children }: { className?: string; children: React.ReactNode }) {
  return <ol className={cn('relative space-y-10 border-l border-line-strong pl-8 md:pl-10', className)}>{children}</ol>
}

interface TimelineItemProps {
  /** What sits on the line: a year, a step number, a date */
  marker: React.ReactNode
  title: string
  children?: React.ReactNode
  className?: string
}

function TimelineItem({ marker, title, children, className }: TimelineItemProps) {
  return (
    <li className={cn('relative', className)}>
      <span
        className='absolute -left-8 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold-500 bg-canvas md:-left-10'
        aria-hidden
      />
      <p className='numeral text-2xl text-gold'>{marker}</p>
      <h3 className='mt-1 font-display text-title text-ink'>{title}</h3>
      {children && <div className='mt-2 max-w-prose text-ink-muted'>{children}</div>}
    </li>
  )
}

const Timeline = Object.assign(TimelineRoot, { Item: TimelineItem })
export default Timeline
