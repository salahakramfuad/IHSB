'use client'

import dynamic from 'next/dynamic'
import SceneFrame from './SceneFrame'
import { TrophyPoster } from './posters'

const TrophyCanvas = dynamic(() => import('./scenes/TrophyCanvas'), { ssr: false })

/** Slowly rotating gold trophy that tilts toward the pointer on hover. Decorative. */
export default function AchievementTrophy({ className }: { className?: string }) {
  return (
    <SceneFrame className={className} poster={<TrophyPoster />}>
      {(props) => <TrophyCanvas {...props} />}
    </SceneFrame>
  )
}
