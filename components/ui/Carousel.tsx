'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

interface CarouselProps {
  /** Names the carousel, e.g. "High achievers" */
  label: string
  children: React.ReactNode
  /** Classes for each slide's width, e.g. 'w-[80%] sm:w-[45%] lg:w-[30%]' */
  slideClassName?: string
  className?: string
}

/**
 * Horizontal, touch-friendly carousel built on native scroll snapping.
 * Swipe or scroll works without JavaScript; the buttons and the Left/Right
 * arrow keys move one "page" at a time.
 */
export default function Carousel({ label, children, slideClassName = 'w-[82%] sm:w-[46%] lg:w-[31%]', className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 4)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [update])

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth * 0.9, behavior: reduce ? 'auto' : 'smooth' })
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByPage(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByPage(-1)
    }
  }

  const slides = React.Children.toArray(children)
  const buttonClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-fast hover:border-brand hover:bg-sunken disabled:opacity-35 disabled:hover:bg-transparent'

  return (
    <section aria-roledescription='carousel' aria-label={label} className={className}>
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className='scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 motion-reduce:scroll-auto sm:-mx-6 sm:px-6'
      >
        {slides.map((slide, index) => (
          <li
            key={index}
            aria-roledescription='slide'
            aria-label={`${index + 1} of ${slides.length}`}
            className={cn('shrink-0 snap-start', slideClassName)}
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className='mt-6 flex items-center gap-3'>
        <button type='button' onClick={() => scrollByPage(-1)} disabled={!canPrev} aria-label='Previous' className={buttonClass}>
          <ChevronLeft className='h-5 w-5' aria-hidden />
        </button>
        <button type='button' onClick={() => scrollByPage(1)} disabled={!canNext} aria-label='Next' className={buttonClass}>
          <ChevronRight className='h-5 w-5' aria-hidden />
        </button>
      </div>
    </section>
  )
}
