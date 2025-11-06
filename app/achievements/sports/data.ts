// app/achievements/data.ts

export type Sport = 'Football' | 'Basketball' | 'Badminton' | 'Chess' | 'Events'
export type Placement = 'Champion' | 'Runner-up' | 'Participant' | 'Award'

export type Achievement = {
  id: string
  slug: string
  title: string
  sport: Sport
  placement: Placement
  description: string
  date: string // ISO
  image: string
  location?: string
  photos?: string[] // gallery for detail page
  longDescription?: string
}

function toISO(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m - 1, d)).toISOString()
}

const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1600',
  'https://images.unsplash.com/photo-1517646331032-6f9990f1f3c9?q=80&w=1600',
  'https://picsum.photos/seed/ihsb-1/1600/900',
  'https://picsum.photos/seed/ihsb-2/1600/900',
  'https://picsum.photos/seed/ihsb-3/1600/900'
]

function hashToIndex(s: string, mod: number) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h) % mod
}
function randomImage(seed: string) {
  return IMAGE_POOL[hashToIndex(seed, IMAGE_POOL.length)]
}
function randomGallery(seed: string, count = 8): string[] {
  const urls: string[] = []
  for (let i = 0; i < count; i++) {
    const fromPool = IMAGE_POOL[hashToIndex(`${seed}:${i}`, IMAGE_POOL.length)]
    urls.push(fromPool)
    const picsum = `https://picsum.photos/seed/${encodeURIComponent(
      `${seed}-${i}`
    )}/1600/900`
    urls.push(picsum)
  }
  return Array.from(new Set(urls)).slice(0, count)
}

const BASE: Achievement[] = [
  {
    id: 'ihsb-super-cup-2019',
    slug: 'ihsb-super-cup-2019',
    title: 'IHSB SUPER CUP',
    sport: 'Football',
    placement: 'Champion',
    description:
      'U-19 Boys champions; U-14 Boys runners-up; Girls unbeaten champions. U-19 top scorer: Ariful Amin; Player of the Tournament: Ahosanul Karim.',
    date: toISO(2019, 3, 15),
    image: randomImage('ihsb-super-cup-2019'),
    location: 'Dhaka',
    longDescription:
      'The IHSB Super Cup in March 2019 showcased depth across age groups. Tactical discipline and set-piece routines were decisive in knockout stages.',
    photos: randomGallery('ihsb-super-cup-2019', 10)
  },
  {
    id: 'sunbeams-super-cup-2019',
    slug: 'sunbeams-super-cup-2019',
    title: 'SUNBEAMS SUPER CUP',
    sport: 'Football',
    placement: 'Runner-up',
    description:
      '25–27 Mar 2019. U-16 Boys and Girls finished runners-up with outstanding effort.',
    date: toISO(2019, 3, 27),
    image: randomImage('sunbeams-super-cup-2019'),
    location: 'Dhaka',
    longDescription:
      'A strong defensive unit carried the teams deep into the bracket; shootout variance decided the finale.',
    photos: randomGallery('sunbeams-super-cup-2019', 8)
  },
  {
    id: 'bangamata-u19-2019',
    slug: 'bangamata-u19-2019',
    title: 'Bangamata U-19 Women’s International Gold Cup',
    sport: 'Events',
    placement: 'Award',
    description:
      '12 Apr 2019. Elif (Grade 8) selected in the nationwide Best XI.',
    date: toISO(2019, 4, 12),
    image: randomImage('bangamata-u19-2019'),
    longDescription:
      'Recognition at the national level highlighted player development and school coaching standards.',
    photos: randomGallery('bangamata-u19-2019', 6)
  },
  {
    id: 'sjws-cup-2019',
    slug: 'sjws-cup-2019',
    title: 'SJWS CUP 2019',
    sport: 'Football',
    placement: 'Champion',
    description:
      '19–20 Oct 2019. U-16 Boys unbeaten champions. Multiple individual awards across positions.',
    date: toISO(2019, 10, 20),
    image: randomImage('sjws-cup-2019'),
    location: 'Dhaka',
    longDescription:
      'Pressing structure and transitions created a steady xG advantage throughout the tournament.',
    photos: randomGallery('sjws-cup-2019', 10)
  },
  {
    id: 'dps-basketball-2018',
    slug: 'dps-basketball-2018',
    title: 'DPS INTER SCHOOL BASKETBALL TOURNAMENT',
    sport: 'Basketball',
    placement: 'Runner-up',
    description: '8–10 Nov 2018. Girls’ team finished runners-up.',
    date: toISO(2018, 11, 10),
    image: randomImage('dps-basketball-2018'),
    longDescription:
      'Half-court sets and rebounding were key strengths; perimeter shooting variance hurt in the final.',
    photos: randomGallery('dps-basketball-2018', 8)
  },
  {
    id: 'aga-khan-2018',
    slug: 'aga-khan-2018',
    title: 'AGA KHAN INTER SCHOOL FOOTBALL TOURNAMENT',
    sport: 'Football',
    placement: 'Champion',
    description:
      '8–11 Nov 2018. Girls team champions; Nalan Zehra Carpan Best Player.',
    date: toISO(2018, 11, 11),
    image: randomImage('aga-khan-2018'),
    longDescription:
      'Cohesive midfield triangles and quick wide switches broke lines repeatedly.',
    photos: randomGallery('aga-khan-2018', 8)
  }
]

export function getBaseAchievements(): Achievement[] {
  return [...BASE].sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
export function getBySlug(slug: string): Achievement | undefined {
  return getBaseAchievements().find((a) => a.slug === slug)
}
export function deriveStats(data: Achievement[]) {
  const base: Record<Sport, { champion: number; runnerUp: number }> = {
    Football: { champion: 0, runnerUp: 0 },
    Basketball: { champion: 0, runnerUp: 0 },
    Badminton: { champion: 0, runnerUp: 0 },
    Chess: { champion: 0, runnerUp: 0 },
    Events: { champion: 0, runnerUp: 0 }
  }
  for (const a of data) {
    const b = base[a.sport]
    if (a.placement === 'Champion') b.champion++
    if (a.placement === 'Runner-up') b.runnerUp++
  }
  return base
}
