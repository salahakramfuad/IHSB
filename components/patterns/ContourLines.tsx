import { cn } from '@/lib/utils'

/**
 * Generative background: contour lines that bend around a few invisible
 * "hills", like a survey map of the delta. Seeded, so a given seed always
 * draws the same field. Rendered once on the server as static SVG: no canvas,
 * no animation, nothing to pause for reduced motion.
 */

/** Small seeded PRNG (mulberry32). */
function random(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const WIDTH = 1440
const HEIGHT = 720
const STEP = 96

function buildPaths(seed: number, lines: number): string[] {
  const rand = random(seed)

  // Hills push the lines apart; each has a centre, a radius and a height
  const hills = Array.from({ length: 4 }, () => ({
    x: rand() * WIDTH,
    y: rand() * HEIGHT,
    radius: 180 + rand() * 260,
    height: (rand() > 0.5 ? 1 : -1) * (40 + rand() * 70)
  }))
  const waves = Array.from({ length: 3 }, () => ({
    frequency: 0.002 + rand() * 0.003,
    phase: rand() * Math.PI * 2,
    amplitude: 6 + rand() * 12
  }))

  const paths: string[] = []
  for (let line = 0; line < lines; line++) {
    const baseY = -40 + (line / (lines - 1)) * (HEIGHT + 80)
    const points: Array<[number, number]> = []

    for (let x = -STEP; x <= WIDTH + STEP; x += STEP) {
      let y = baseY
      for (const wave of waves) y += Math.sin(x * wave.frequency + wave.phase + line * 0.22) * wave.amplitude
      for (const hill of hills) {
        const dx = x - hill.x
        const dy = baseY - hill.y
        y += hill.height * Math.exp(-(dx * dx + dy * dy) / (2 * hill.radius * hill.radius)) * Math.sign(dy || 1)
      }
      points.push([x, y])
    }

    // Smooth curve through the midpoints
    let d = `M${points[0][0]} ${points[0][1].toFixed(1)}`
    for (let i = 1; i < points.length - 1; i++) {
      const [x, y] = points[i]
      const [nextX, nextY] = points[i + 1]
      d += `Q${x} ${y.toFixed(1)} ${((x + nextX) / 2).toFixed(0)} ${((y + nextY) / 2).toFixed(1)}`
    }
    paths.push(d)
  }
  return paths
}

interface ContourLinesProps {
  seed?: number
  /** Number of lines; fewer is quieter */
  lines?: number
  className?: string
}

export default function ContourLines({ seed = 1996, lines = 14, className }: ContourLinesProps) {
  const paths = buildPaths(seed, lines)

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio='xMidYMid slice'
      fill='none'
      aria-hidden
      focusable='false'
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {paths.map((d, index) => (
        <path
          key={index}
          d={d}
          stroke='currentColor'
          strokeWidth={index % 5 === 0 ? 1.4 : 0.8}
          strokeOpacity={index % 5 === 0 ? 0.5 : 0.28}
          vectorEffect='non-scaling-stroke'
        />
      ))}
    </svg>
  )
}
