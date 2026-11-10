'use client'

import dynamic from 'next/dynamic'
import type { GeoPoint } from '@/lib/geo'
import SceneFrame from './SceneFrame'
import { GlobePoster } from './posters'

const GlobeCanvas = dynamic(() => import('./scenes/GlobeCanvas'), { ssr: false })

/**
 * Dotted globe with arcs from Dhaka to the cities where alumni live.
 * Drag to rotate; it turns slowly on its own when left alone.
 * The same places are listed as text next to it, so the canvas is decorative.
 */
export default function AcademicsGlobe({ destinations, className }: { destinations: GeoPoint[]; className?: string }) {
  return (
    <SceneFrame className={className} poster={<GlobePoster destinations={destinations} />}>
      {(props) => <GlobeCanvas {...props} destinations={destinations} />}
    </SceneFrame>
  )
}
