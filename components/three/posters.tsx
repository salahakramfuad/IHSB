import { DHAKA, type GeoPoint } from '@/lib/geo'

/**
 * Static SVG posters. They are what small screens, low-memory devices,
 * reduced-motion visitors and browsers without WebGL see, and what everyone
 * sees while the 3D code loads.
 */
const svgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  'aria-hidden': true,
  focusable: 'false' as const,
  className: 'h-full w-full'
}

export function HeroPoster() {
  return (
    <svg viewBox='0 0 520 440' {...svgProps}>
      <ellipse cx='262' cy='392' rx='170' ry='16' fill='rgb(var(--brand-950))' opacity='.45' />
      {/* Open book */}
      <path d='M262 300 96 262v40l166 40 166-40v-40z' fill='rgb(var(--brand-600))' />
      <path d='M262 290 108 252v30l154 38z' fill='rgb(var(--gold-50))' />
      <path d='M262 290l154-38v30l-154 38z' fill='rgb(var(--gold-100))' />
      <path d='M262 290v30' stroke='rgb(var(--brand-800))' strokeWidth='2' />
      <path d='M270 286l10-2v62l-5 6-5-6z' fill='rgb(var(--gold-400))' />
      {/* Mortarboard */}
      <path d='M272 118 142 168l130 50 130-50z' fill='rgb(var(--brand-950))' />
      <path d='M206 196v40c0 16 30 28 66 28s66-12 66-28v-40l-66 26z' fill='rgb(var(--brand-800))' />
      <circle cx='272' cy='168' r='7' fill='rgb(var(--gold-400))' />
      <path d='M272 168h96v62' stroke='rgb(var(--gold-400))' strokeWidth='3' />
      <path d='M368 226l-9 34h18z' fill='rgb(var(--gold-400))' />
      {/* Globe */}
      <circle cx='92' cy='150' r='42' fill='rgb(var(--brand-400))' />
      <path d='M62 132l22-14 26 8 10 22-14 20-28 4-18-16z' fill='rgb(var(--brand-300))' opacity='.7' />
      <ellipse cx='92' cy='150' rx='64' ry='20' transform='rotate(-22 92 150)' stroke='rgb(var(--gold-400))' strokeWidth='2' />
      {/* Floating shapes */}
      <path d='M444 92l22 26-22 26-22-26z' fill='rgb(var(--gold-400))' />
      <path d='M444 92l22 26h-44z' fill='rgb(var(--gold-200))' />
      <circle cx='452' cy='262' r='22' stroke='rgb(var(--brand-400))' strokeWidth='12' />
      <path d='M118 318l26 40H92z' fill='rgb(var(--gold-200))' />
      <path d='M212 46l18 10v20l-18 10-18-10V56z' fill='rgb(var(--sky-400))' />
    </svg>
  )
}

export function TrophyPoster() {
  return (
    <svg viewBox='0 0 240 300' {...svgProps}>
      <path d='M70 262h100l-10-22H80z' fill='rgb(var(--brand-900))' />
      <path d='M86 240h68l-8-16H94z' fill='rgb(var(--brand-600))' />
      <path d='M112 224h16v-44h-16z' fill='rgb(var(--gold-500))' />
      <path d='M64 60h112c0 62-18 122-56 122S64 122 64 60z' fill='rgb(var(--gold-400))' />
      <path d='M64 60h112c0 14-1 28-3 40H67c-2-12-3-26-3-40z' fill='rgb(var(--gold-300))' />
      <path d='M64 76c-30 0-36 46 4 58M176 76c30 0 36 46-4 58' stroke='rgb(var(--gold-400))' strokeWidth='9' strokeLinecap='round' />
      <path d='M120 22l10 14-10 14-10-14z' fill='rgb(var(--gold-200))' />
      <path d='M88 78c2 34 8 60 18 78' stroke='rgb(var(--gold-50))' strokeWidth='5' strokeLinecap='round' opacity='.6' />
    </svg>
  )
}

/** Orthographic projection of a point for a globe centred on (centerLat, centerLng). */
function project(point: { lat: number; lng: number }, centerLat: number, centerLng: number) {
  const rad = Math.PI / 180
  const lat = point.lat * rad
  const lat0 = centerLat * rad
  const dLng = (point.lng - centerLng) * rad
  const cosC = Math.sin(lat0) * Math.sin(lat) + Math.cos(lat0) * Math.cos(lat) * Math.cos(dLng)
  return {
    x: 200 + 150 * Math.cos(lat) * Math.sin(dLng),
    y: 200 - 150 * (Math.cos(lat0) * Math.sin(lat) - Math.sin(lat0) * Math.cos(lat) * Math.cos(dLng)),
    visible: cosC > 0.05
  }
}

export function GlobePoster({ destinations }: { destinations: GeoPoint[] }) {
  const center = { lat: 30, lng: 62 }
  const origin = project(DHAKA, center.lat, center.lng)
  const graticule: Array<{ x: number; y: number }> = []
  for (let lat = -75; lat <= 75; lat += 7.5) {
    for (let lng = -180; lng < 180; lng += 7.5) {
      const p = project({ lat, lng }, center.lat, center.lng)
      if (p.visible) graticule.push({ x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 })
    }
  }
  const ends = destinations.map((destination) => project(destination, center.lat, center.lng)).filter((p) => p.visible)

  return (
    <svg viewBox='0 0 400 400' {...svgProps}>
      <circle cx='200' cy='200' r='166' fill='rgb(var(--brand-600))' opacity='.18' />
      <circle cx='200' cy='200' r='150' fill='rgb(var(--brand-950))' />
      {graticule.map((p, index) => (
        <circle key={index} cx={p.x} cy={p.y} r='1.3' fill='rgb(var(--brand-400))' opacity='.7' />
      ))}
      {ends.map((end, index) => {
        const midX = (origin.x + end.x) / 2
        const midY = (origin.y + end.y) / 2 - Math.hypot(end.x - origin.x, end.y - origin.y) * 0.28
        return (
          <g key={index}>
            <path
              d={`M${origin.x.toFixed(1)} ${origin.y.toFixed(1)}Q${midX.toFixed(1)} ${midY.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`}
              stroke='rgb(var(--gold-400))'
              strokeWidth='1.2'
              opacity='.7'
            />
            <circle cx={end.x} cy={end.y} r='3' fill='rgb(var(--gold-200))' />
          </g>
        )
      })}
      <circle cx={origin.x} cy={origin.y} r='5.5' fill='rgb(var(--gold-400))' />
      <circle cx={origin.x} cy={origin.y} r='10' stroke='rgb(var(--gold-400))' opacity='.5' />
    </svg>
  )
}
