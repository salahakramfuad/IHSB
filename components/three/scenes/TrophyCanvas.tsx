'use client'

import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { LatheGeometry, MathUtils, Vector2, type Group } from 'three'
import type { SceneRenderProps } from '../SceneFrame'
import { CANVAS_DPR, CANVAS_GL, StudioEnvironment, useScenePalette } from './shared'

/** Cup profile (radius, height) turned on a lathe. */
const CUP_PROFILE: Array<[number, number]> = [
  [0.0, 0.0],
  [0.34, 0.0],
  [0.36, 0.05],
  [0.12, 0.14],
  [0.09, 0.5],
  [0.16, 0.62],
  [0.42, 0.86],
  [0.62, 1.3],
  [0.68, 1.78],
  [0.7, 1.84],
  [0.64, 1.84],
  [0.58, 1.34],
  [0.38, 0.94],
  [0.0, 0.8]
]

function Trophy({ hovered }: { hovered: boolean }) {
  const palette = useScenePalette()
  const spin = useRef<Group>(null)
  const tilt = useRef<Group>(null)
  const cup = useMemo(() => new LatheGeometry(CUP_PROFILE.map(([x, y]) => new Vector2(x, y)), 40), [])

  useFrame((state, delta) => {
    if (spin.current) spin.current.rotation.y += delta * (hovered ? 1.1 : 0.45)
    if (tilt.current) {
      // Tilt toward the pointer while hovered, settle upright otherwise
      tilt.current.rotation.z = MathUtils.damp(tilt.current.rotation.z, hovered ? -state.pointer.x * 0.28 : 0, 4, delta)
      tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, hovered ? state.pointer.y * 0.2 : 0, 4, delta)
    }
  })

  const gold = <meshStandardMaterial color={palette.gold} metalness={1} roughness={0.22} />

  return (
    <group ref={tilt} position={[0, -1.2, 0]}>
      {/* Plinth */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.62, 0.7, 0.24, 6]} />
        <meshStandardMaterial color={palette.greenDeep} roughness={0.5} flatShading />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.46, 0.54, 0.14, 6]} />
        <meshStandardMaterial color={palette.green} roughness={0.5} flatShading />
      </mesh>

      <group ref={spin} position={[0, 0.37, 0]}>
        <mesh geometry={cup}>{gold}</mesh>
        {/* Handles */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.66, 1.42, 0]} rotation={[0, 0, side * -Math.PI / 2]}>
            <torusGeometry args={[0.26, 0.045, 10, 24, Math.PI]} />
            {gold}
          </mesh>
        ))}
        {/* Star finial */}
        <mesh position={[0, 2.12, 0]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.17, 0]} />
          <meshStandardMaterial color={palette.goldLight} metalness={1} roughness={0.15} flatShading />
        </mesh>
      </group>
    </group>
  )
}

export default function TrophyCanvas({ active, onReady }: SceneRenderProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Canvas
      dpr={CANVAS_DPR}
      gl={CANVAS_GL}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.35, 5.2], fov: 34 }}
      onCreated={onReady}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      aria-hidden
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={2.4} color='#fff1d0' />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} color='#bfe3d2' />
      <StudioEnvironment intensity={1.1} />
      <Trophy hovered={hovered} />
    </Canvas>
  )
}
