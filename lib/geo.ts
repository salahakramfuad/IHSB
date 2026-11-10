/**
 * Coordinates for the alumni globe. Alumni records only store a free-text
 * "City, Country" location, so cities are resolved through this small table.
 */
export interface GeoPoint {
  label: string
  lat: number
  lng: number
}

export const DHAKA: GeoPoint = { label: 'Dhaka, Bangladesh', lat: 23.81, lng: 90.41 }

const CITIES: Record<string, [number, number]> = {
  london: [51.51, -0.13],
  zurich: [47.37, 8.54],
  'new york': [40.71, -74.01],
  istanbul: [41.01, 28.98],
  singapore: [1.35, 103.82],
  toronto: [43.65, -79.38],
  nagoya: [35.18, 136.91],
  tokyo: [35.68, 139.69],
  copenhagen: [55.68, 12.57],
  melbourne: [-37.81, 144.96],
  sydney: [-33.87, 151.21],
  dubai: [25.2, 55.27],
  'kuala lumpur': [3.14, 101.69],
  berlin: [52.52, 13.4],
  paris: [48.86, 2.35],
  boston: [42.36, -71.06],
  'san francisco': [37.77, -122.42],
  vancouver: [49.28, -123.12],
  ankara: [39.93, 32.86],
  doha: [25.29, 51.53],
  chattogram: [22.36, 91.78],
  dhaka: [DHAKA.lat, DHAKA.lng]
}

/** Resolve "City, Country" to coordinates; null when the city is not in the table. */
export function locate(location: string | undefined | null): GeoPoint | null {
  if (!location) return null
  const city = location.split(',')[0].trim().toLowerCase()
  const match = CITIES[city]
  return match ? { label: location, lat: match[0], lng: match[1] } : null
}

/** Unique destinations (excluding Dhaka itself) for a list of location strings. */
export function alumniDestinations(locations: Array<string | undefined | null>): GeoPoint[] {
  const seen = new Set<string>()
  const points: GeoPoint[] = []
  for (const location of locations) {
    const point = locate(location)
    if (!point) continue
    const key = `${point.lat},${point.lng}`
    if (seen.has(key) || (point.lat === DHAKA.lat && point.lng === DHAKA.lng)) continue
    seen.add(key)
    points.push(point)
  }
  return points
}
