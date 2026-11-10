'use client'

import React from 'react'
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  /** Delay in seconds, for a short stagger inside one group */
  delay?: number
  /** Travel distance in pixels */
  distance?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Reveals its children once, when they scroll into view.
 * With reduced motion the content is rendered as-is.
 */
export default function Reveal({ children, delay = 0, distance = 14, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const Component = m[as]

  if (reduceMotion) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <Component
        data-reveal=''
        className={className}
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -12% 0px' }}
        transition={{ duration: 0.4, ease: EASE, delay }}
      >
        {children}
      </Component>
    </LazyMotion>
  )
}
