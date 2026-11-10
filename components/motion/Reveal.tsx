'use client'

import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Delay in seconds, for a short stagger inside one group */
  delay?: number
  /** Travel distance in pixels (kept at 16 or less) */
  distance?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Reveals its children once, when they scroll into view.
 *
 * The markup is identical on the server and the client. Reduced motion and
 * no-JavaScript are handled in CSS (`[data-reveal]` in styles/global.css and
 * the <noscript> rule in the root layout), which force the content visible.
 */
export default function Reveal({ children, delay = 0, distance = 14, className, as = 'div' }: RevealProps) {
  const Component = m[as]

  return (
    <LazyMotion features={domAnimation} strict>
      <Component
        data-reveal=''
        className={className}
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.4, ease: EASE, delay }}
      >
        {children}
      </Component>
    </LazyMotion>
  )
}
