'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float } from '@react-three/drei'
import { MathUtils, type Group } from 'three'
import type { SceneRenderProps } from '../SceneFrame'
import { CANVAS_DPR, CANVAS_GL, StudioEnvironment, useScenePalette, type ScenePalette } from './shared'

/** Open book: two cover boards and two page blocks, angled like a book lying open. */
function Book({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[0, -0.55, 0]} rotation={[0.18, -0.35, 0]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.86, 0, 0]} rotation={[0, 0, side * -0.16]}>
          <mesh position={[0, -0.09, 0]}>
            <boxGeometry args={[1.78, 0.07, 2.36]} />
            <meshStandardMaterial color={palette.green} roughness={0.55} flatShading />
          </mesh>
          <mesh position={[side * -0.03, 0.03, 0]}>
            <boxGeometry args={[1.66, 0.17, 2.2]} />
            <meshStandardMaterial color={palette.ivory} roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
      {/* Ribbon bookmark */}
      <mesh position={[0.12, 0.13, 0.5]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.12, 0.02, 1.7]} />
        <meshStandardMaterial color={palette.gold} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  )
}

/** Mortarboard: skull cap, flat board, button and tassel. */
function GraduationCap({ palette }: { palette: ScenePalette }) {
  return (
    <group position={[0.15, 0.75, 0.1]} rotation={[0.28, 0.5, -0.12]}>
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.5, 0.56, 0.36, 8]} />
        <meshStandardMaterial color={palette.greenDeep} roughness={0.6} flatShading />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.07, 1.5]} />
        <meshStandardMaterial color={palette.greenDeep} roughness={0.5} flatShading />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 8]} />
        <meshStandardMaterial color={palette.gold} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0.36, 0.05, 0.36]} rotation={[0, -Math.PI / 4, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 1.02, 5]} />
        <meshStandardMaterial color={palette.gold} roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0.72, -0.2, 0.72]}>
        <coneGeometry args={[0.07, 0.42, 6]} />
        <meshStandardMaterial color={palette.gold} roughness={0.45} metalness={0.5} flatShading />
      </mesh>
    </group>
  )
}

/** Small low-poly globe with an orbit ring. */
function MiniGlobe({ palette }: { palette: ScenePalette }) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.35
  })
  return (
    <group position={[-1.75, 0.55, -0.3]}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial color={palette.greenLight} roughness={0.45} flatShading />
        </mesh>
      </group>
      <mesh rotation={[1.15, 0.25, 0]}>
        <torusGeometry args={[0.78, 0.014, 6, 48]} />
        <meshStandardMaterial color={palette.gold} roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}

function FloatingShapes({ palette }: { palette: ScenePalette }) {
  return (
    <>
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.1}>
        <mesh position={[1.9, 1.15, -0.4]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={palette.gold} roughness={0.25} metalness={0.9} flatShading />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.9} floatIntensity={1.4}>
        <mesh position={[2.05, -0.35, 0.5]} rotation={[0.6, 0.3, 0]}>
          <torusGeometry args={[0.24, 0.085, 8, 20]} />
          <meshStandardMaterial color={palette.greenLight} roughness={0.4} flatShading />
        </mesh>
      </Float>
      <Float speed={1.7} rotationIntensity={1.5} floatIntensity={0.9}>
        <mesh position={[-1.5, -0.6, 0.9]}>
          <tetrahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color={palette.goldLight} roughness={0.35} metalness={0.5} flatShading />
        </mesh>
      </Float>
      <Float speed={0.9} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-0.7, 1.75, -0.8]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color={palette.sky} roughness={0.5} flatShading />
        </mesh>
      </Float>
    </>
  )
}

/** Everything leans a few degrees toward the pointer. */
function Composition() {
  const palette = useScenePalette()
  const rig = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!rig.current) return
    const x = MathUtils.clamp(state.pointer.x, -1.5, 1.5)
    const y = MathUtils.clamp(state.pointer.y, -1.5, 1.5)
    rig.current.rotation.y = MathUtils.damp(rig.current.rotation.y, x * 0.18, 3, delta)
    rig.current.rotation.x = MathUtils.damp(rig.current.rotation.x, -y * 0.1, 3, delta)
  })

  return (
    <group ref={rig}>
      <Float speed={1} rotationIntensity={0.25} floatIntensity={0.5}>
        <Book palette={palette} />
      </Float>
      <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.9}>
        <GraduationCap palette={palette} />
      </Float>
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.8}>
        <MiniGlobe palette={palette} />
      </Float>
      <FloatingShapes palette={palette} />
    </group>
  )
}

export default function HeroSceneCanvas({ active, onReady }: SceneRenderProps) {
  return (
    <Canvas
      dpr={CANVAS_DPR}
      gl={CANVAS_GL}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.5, 6.4], fov: 38 }}
      // Listen on the whole window so the parallax follows the pointer across the hero
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix='client'
      onCreated={onReady}
      aria-hidden
    >
      {/* Soft studio set-up: key, fill, rim + procedural environment */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color='#fff4dc' />
      <directionalLight position={[-5, 2, 3]} intensity={0.55} color='#cfe8dc' />
      <directionalLight position={[-3, 4, -6]} intensity={1.1} color='#f0d98d' />
      <StudioEnvironment intensity={0.7} />

      <Composition />

      <ContactShadows position={[0, -1.55, 0]} opacity={0.42} scale={9} blur={2.6} far={3.2} resolution={256} frames={1} color='#04140f' />
    </Canvas>
  )
}
