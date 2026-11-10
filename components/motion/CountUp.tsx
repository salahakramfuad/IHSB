'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  /** Final figure as written, e.g. "5000+", "25+", "5" */
  value: string
  /** Duration in milliseconds */
  duration?: number
}

const format = new Intl.NumberFormat('en-GB')

/**
 * Counts up to a figure the first time it scrolls into view.
 * The final value is what the server renders, so it is correct without
 * JavaScript and under reduced motion.
 */
export default function CountUp({ value, duration = 1400 }: CountUpProps) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/)
  const target = match ? Number(match[2].replace(/,/g, '')) : NaN
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState<number | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || Number.isNaN(target)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 4)
          setDisplay(Math.round(target * eased))
          if (progress < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target, duration])

  if (!match || Number.isNaN(target)) return <span>{value}</span>

  return (
    <span ref={ref}>
      {/* Screen readers get the final figure once, not every intermediate number */}
      <span className='sr-only'>{value}</span>
      <span aria-hidden>
        {match[1]}
        {format.format(display ?? target)}
        {match[3]}
      </span>
    </span>
  )
}
