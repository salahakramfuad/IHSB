'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  AdditiveBlending,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  MathUtils,
  QuadraticBezierCurve3,
  Vector3,
  type Group,
  type Mesh
} from 'three'
import { DHAKA, type GeoPoint } from '@/lib/geo'
import type { SceneRenderProps } from '../SceneFrame'
import { CANVAS_DPR, CANVAS_GL, useScenePalette } from './shared'

const RADIUS = 1.6

/**
 * Coarse land mask: for each 10-degree latitude band, the longitude ranges
 * that are land. Enough to read as continents when drawn as dots.
 */
const LAND: Record<number, Array<[number, number]>> = {
  75: [[-125, -70], [-60, -18], [90, 110]],
  65: [[-168, -62], [-52, -38], [-24, -14], [5, 180], [-180, -170]],
  55: [[-165, -155], [-135, -58], [-10, 2], [5, 140], [155, 162]],
  45: [[-124, -62], [-9, 140], [140, 145]],
  35: [[-121, -76], [-6, 11], [20, 120], [126, 129], [133, 140]],
  25: [[-112, -98], [-82, -80], [-16, 57], [61, 120]],
  15: [[-98, -84], [-17, 40], [43, 55], [74, 80], [93, 109], [120, 124]],
  5: [[-77, -52], [-10, 48], [80, 81], [98, 104], [109, 118]],
  [-5]: [[-80, -35], [12, 40], [102, 106], [110, 117], [120, 123], [132, 150]],
  [-15]: [[-76, -39], [12, 40], [44, 50], [125, 145]],
  [-25]: [[-70, -48], [15, 35], [44, 47], [114, 153]],
  [-35]: [[-72, -54], [18, 26], [116, 118], [136, 150], [173, 176]],
  [-45]: [[-74, -66], [146, 148], [168, 172]],
  [-55]: [[-71, -66]]
}

function isLand(lat: number, lng: number): boolean {
  const band = Math.round((lat - 5) / 10) * 10 + 5
  return (LAND[band] || []).some(([from, to]) => lng >= from && lng <= to)
}

function toVector(lat: number, lng: number, radius = RADIUS): Vector3 {
  const phi = MathUtils.degToRad(90 - lat)
  const theta = MathUtils.degToRad(lng + 180)
  return new Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta))
}

/** Evenly spread candidate dots (Fibonacci sphere), kept only where there is land. */
function landDots(count: number): Float32Array {
  const positions: number[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const lat = MathUtils.radToDeg(Math.asin(y))
    const lng = ((MathUtils.radToDeg(golden * i) % 360) + 540) % 360 - 180
    if (isLand(lat, lng)) {
      const v = toVector(lat, lng)
      positions.push(v.x, v.y, v.z)
    }
  }
  return new Float32Array(positions)
}

interface Arc {
  line: Line
  curve: QuadraticBezierCurve3
  end: Vector3
}

function Arcs({ destinations }: { destinations: GeoPoint[] }) {
  const palette = useScenePalette()
  const pulses = useRef<Array<Mesh | null>>([])

  const arcs = useMemo<Arc[]>(() => {
    const start = toVector(DHAKA.lat, DHAKA.lng)
    // One material shared by every arc
    const material = new LineBasicMaterial({ color: palette.gold, transparent: true, opacity: 0.55 })
    return destinations.map((destination) => {
      const end = toVector(destination.lat, destination.lng)
      const distance = start.distanceTo(end)
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS + distance * 0.42)
      const curve = new QuadraticBezierCurve3(start, mid, end)
      return { curve, end, line: new Line(new BufferGeometry().setFromPoints(curve.getPoints(40)), material) }
    })
  }, [destinations, palette.gold])

  useEffect(
    () => () => {
      arcs.forEach((arc) => arc.line.geometry.dispose())
      ;(arcs[0]?.line.material as LineBasicMaterial | undefined)?.dispose()
    },
    [arcs]
  )

  // A small light travels along each arc, staggered
  useFrame((state) => {
    const time = state.clock.elapsedTime
    arcs.forEach((arc, index) => {
      const pulse = pulses.current[index]
      if (!pulse) return
      const t = (time * 0.22 + index * 0.137) % 1
      arc.curve.getPoint(t, pulse.position)
      pulse.scale.setScalar(0.6 + Math.sin(t * Math.PI) * 0.8)
    })
  })

  const origin = toVector(DHAKA.lat, DHAKA.lng)

  return (
    <>
      {arcs.map((arc, index) => (
        <group key={index}>
          <primitive object={arc.line} />
          <mesh position={arc.end}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshBasicMaterial color={palette.goldLight} />
          </mesh>
          <mesh
            ref={(node) => {
              pulses.current[index] = node
            }}
          >
            <sphereGeometry args={[0.022, 8, 8]} />
            <meshBasicMaterial color={palette.ivory} />
          </mesh>
        </group>
      ))}
      {/* Dhaka */}
      <mesh position={origin}>
        <sphereGeometry args={[0.05, 14, 14]} />
        <meshBasicMaterial color={palette.gold} />
      </mesh>
    </>
  )
}

/** Drag to rotate; auto-rotates again after a short idle. */
function Globe({ destinations }: { destinations: GeoPoint[] }) {
  const palette = useScenePalette()
  const group = useRef<Group>(null)
  const gl = useThree((state) => state.gl)
  const drag = useRef({ active: false, x: 0, y: 0, idleFor: 10, velocity: 0 })
  const dots = useMemo(() => {
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(landDots(5200), 3))
    return geometry
  }, [])

  useEffect(() => () => dots.dispose(), [dots])

  // Pointer handling mutates a ref and the canvas element directly (no React state: it runs every frame)
  /* eslint-disable react-hooks/immutability */
  useEffect(() => {
    const element = gl.domElement
    const state = drag.current
    const onDown = (event: PointerEvent) => {
      state.active = true
      state.x = event.clientX
      state.y = event.clientY
      element.setPointerCapture(event.pointerId)
      element.style.cursor = 'grabbing'
    }
    const onMove = (event: PointerEvent) => {
      if (!state.active || !group.current) return
      const dx = event.clientX - state.x
      const dy = event.clientY - state.y
      state.x = event.clientX
      state.y = event.clientY
      state.velocity = dx * 0.006
      group.current.rotation.y += dx * 0.006
      group.current.rotation.x = MathUtils.clamp(group.current.rotation.x + dy * 0.004, -0.7, 0.7)
      state.idleFor = 0
    }
    const onUp = (event: PointerEvent) => {
      state.active = false
      element.style.cursor = 'grab'
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId)
    }
    element.style.cursor = 'grab'
    element.style.touchAction = 'pan-y'
    element.addEventListener('pointerdown', onDown)
    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerup', onUp)
    element.addEventListener('pointercancel', onUp)
    return () => {
      element.removeEventListener('pointerdown', onDown)
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerup', onUp)
      element.removeEventListener('pointercancel', onUp)
    }
  }, [gl])
  /* eslint-enable react-hooks/immutability */

  useFrame((_, delta) => {
    const state = drag.current
    if (!group.current || state.active) return
    state.idleFor += delta
    // Coast after a drag, then ease back into a slow auto-rotation
    state.velocity = MathUtils.damp(state.velocity, 0, 3, delta)
    const auto = state.idleFor > 1.5 ? 0.12 * Math.min(1, (state.idleFor - 1.5) / 1.5) : 0
    group.current.rotation.y += state.velocity + auto * delta
  })

  return (
    // Start with South Asia facing the viewer
    <group ref={group} rotation={[0.32, -MathUtils.degToRad(DHAKA.lng + 90), 0]}>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 48, 32]} />
        <meshBasicMaterial color={palette.greenDeep} transparent opacity={0.9} />
      </mesh>
      <points geometry={dots}>
        <pointsMaterial color={palette.greenLight} size={0.026} sizeAttenuation transparent opacity={0.95} />
      </points>
      <Arcs destinations={destinations} />
      {/* Atmosphere rim */}
      <mesh scale={1.12}>
        <sphereGeometry args={[RADIUS, 32, 24]} />
        <meshBasicMaterial color={palette.green} transparent opacity={0.16} side={BackSide} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  )
}

export default function GlobeCanvas({ active, onReady, destinations }: SceneRenderProps & { destinations: GeoPoint[] }) {
  return (
    <Canvas
      dpr={CANVAS_DPR}
      gl={CANVAS_GL}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5.4], fov: 40 }}
      onCreated={onReady}
      aria-hidden
    >
      <Globe destinations={destinations} />
    </Canvas>
  )
}
