'use client'

import { useEffect, useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

/**
 * Soft studio image-based lighting generated procedurally (no HDR download).
 * Gives metallic and glossy materials something to reflect.
 */
export function StudioEnvironment({ intensity = 0.9 }: { intensity?: number }) {
  const gl = useThree((state) => state.gl)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const room = new RoomEnvironment()
    const target = pmrem.fromScene(room, 0.04)
    scene.environment = target.texture
    scene.environmentIntensity = intensity
    return () => {
      scene.environment = null
      target.dispose()
      pmrem.dispose()
      room.dispose()
    }
  }, [gl, scene, intensity])

  return null
}

export interface ScenePalette {
  green: string
  greenLight: string
  greenDeep: string
  gold: string
  goldLight: string
  ivory: string
  sky: string
}

const FALLBACK: ScenePalette = {
  green: 'rgb(27,102,74)',
  greenLight: 'rgb(78,155,120)',
  greenDeep: 'rgb(11,51,39)',
  gold: 'rgb(217,170,54)',
  goldLight: 'rgb(240,217,141)',
  ivory: 'rgb(251,248,241)',
  sky: 'rgb(92,151,188)'
}

/** Brand colours for the scenes, read from the design tokens (CSS variables). */
export function useScenePalette(): ScenePalette {
  return useMemo(() => {
    if (typeof window === 'undefined') return FALLBACK
    const styles = getComputedStyle(document.documentElement)
    const read = (name: string, fallback: string) => {
      const channels = styles.getPropertyValue(name).trim().split(/\s+/)
      return channels.length === 3 ? `rgb(${channels.join(',')})` : fallback
    }
    return {
      green: read('--brand-600', FALLBACK.green),
      greenLight: read('--brand-400', FALLBACK.greenLight),
      greenDeep: read('--brand-900', FALLBACK.greenDeep),
      gold: read('--gold-400', FALLBACK.gold),
      goldLight: read('--gold-200', FALLBACK.goldLight),
      ivory: read('--gold-50', FALLBACK.ivory),
      sky: read('--sky-400', FALLBACK.sky)
    }
  }, [])
}

/** Shared <Canvas> settings: capped pixel ratio, transparent background. */
export const CANVAS_DPR: [number, number] = [1, 1.5]
export const CANVAS_GL = { antialias: true, alpha: true, powerPreference: 'default' as const }
