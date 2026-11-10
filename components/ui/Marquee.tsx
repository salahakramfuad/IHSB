'use client'

import React, { useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { cn } from '../../lib/utils'

interface MarqueeProps {
  /** Describes the list for assistive technology */
  label: string
  children: React.ReactNode
  className?: string
}

/**
 * Slowly scrolling row. The content is rendered twice for a seamless loop (the
 * copy is hidden from assistive tech). Pauses on hover and focus, has a pause
 * button, and is a static, sideways-scrollable row under reduced motion.
 */
export default function Marquee({ label, children, className }: MarqueeProps) {
  const [paused, setPaused] = useState(false)
  const playState = paused ? 'paused' : undefined

  return (
    <div className={cn('group/marquee relative', className)}>
      {/* Reduced motion: no animation; the single row can be scrolled sideways instead */}
      <div className='scrollbar-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]'>
        <div
          className='flex w-max animate-marquee items-center group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none'
          style={{ animationPlayState: playState }}
        >
          <ul aria-label={label} className='flex shrink-0 items-center gap-x-12 px-6'>
            {children}
          </ul>
          <ul aria-hidden className='flex shrink-0 items-center gap-x-12 px-6 motion-reduce:hidden'>
            {children}
          </ul>
        </div>
      </div>
      <button
        type='button'
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label='Pause scrolling'
        className='absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-ink-muted opacity-0 shadow-soft focus-visible:opacity-100 group-hover/marquee:opacity-100 motion-reduce:hidden'
      >
        {paused ? <Play className='h-3.5 w-3.5' aria-hidden /> : <Pause className='h-3.5 w-3.5' aria-hidden />}
      </button>
    </div>
  )
}
