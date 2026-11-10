'use client'

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

/**
 * Decides whether a WebGL scene may run on this device, and when.
 *
 * A scene is only mounted when ALL of these hold:
 *  - viewport at least 768px wide
 *  - the visitor has not asked for reduced motion
 *  - the device reports more than 4 GB of memory (when it reports at all)
 *  - WebGL is available
 *  - the frame has scrolled near the viewport (IntersectionObserver)
 * Otherwise the static poster stays. The poster is also what is shown while
 * the 3D code loads, so the scene never blocks first paint or LCP.
 */

const QUERIES = ['(min-width: 768px)', '(prefers-reduced-motion: reduce)'] as const

let webglSupport: boolean | null = null
function hasWebGL(): boolean {
  if (webglSupport === null) {
    try {
      const canvas = document.createElement('canvas')
      webglSupport = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      webglSupport = false
    }
  }
  return webglSupport
}

function subscribeCapability(listener: () => void) {
  const lists = QUERIES.map((query) => window.matchMedia(query))
  lists.forEach((list) => list.addEventListener('change', listener))
  return () => lists.forEach((list) => list.removeEventListener('change', listener))
}

function getCapability(): boolean {
  if (!window.matchMedia(QUERIES[0]).matches) return false
  if (window.matchMedia(QUERIES[1]).matches) return false
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  if (typeof memory === 'number' && memory <= 4) return false
  return hasWebGL()
}

function subscribeVisibility(listener: () => void) {
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
}
const getTabVisible = () => document.visibilityState === 'visible'

export interface SceneRenderProps {
  /** False while the scene is off screen or the tab is hidden: stop the render loop */
  active: boolean
  /** Call once the first frame is ready so the poster can fade out */
  onReady: () => void
}

interface SceneFrameProps {
  /** Static SVG/image shown as the fallback and while the scene loads */
  poster: React.ReactNode
  /** Renders the (dynamically imported) scene */
  children: (props: SceneRenderProps) => React.ReactNode
  className?: string
  /** How far outside the viewport to start loading */
  rootMargin?: string
}

export default function SceneFrame({ poster, children, className, rootMargin = '200px' }: SceneFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const capable = useSyncExternalStore(subscribeCapability, getCapability, () => false)
  const tabVisible = useSyncExternalStore(subscribeVisibility, getTabVisible, () => true)
  const [inView, setInView] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame || !capable) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setMounted(true)
      },
      { rootMargin }
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [capable, rootMargin])

  const show = capable && mounted

  return (
    <div ref={frameRef} className={cn('relative', className)}>
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-slow ease-out',
          show && ready ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
        aria-hidden={show && ready ? true : undefined}
      >
        {poster}
      </div>
      {show && (
        <div className={cn('absolute inset-0 transition-opacity duration-slow ease-out', ready ? 'opacity-100' : 'opacity-0')}>
          {children({ active: inView && tabVisible, onReady: () => setReady(true) })}
        </div>
      )}
    </div>
  )
}
