'use client'

import dynamic from 'next/dynamic'
import SceneFrame from './SceneFrame'
import { HeroPoster } from './posters'

// Client-only and split into its own chunk: three.js never loads for visitors who get the poster
const HeroSceneCanvas = dynamic(() => import('./scenes/HeroSceneCanvas'), { ssr: false })

/**
 * Hero illustration: an open book, a graduation cap and a small globe floating
 * with a few geometric shapes in the school's green and gold. Decorative.
 */
export default function HeroScene({ className }: { className?: string }) {
  return (
    <SceneFrame className={className} poster={<HeroPoster />} rootMargin='0px'>
      {(props) => <HeroSceneCanvas {...props} />}
    </SceneFrame>
  )
}
