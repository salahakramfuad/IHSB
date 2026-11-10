/**
 * Seed the Firestore EMULATOR with the mock data set.
 *
 *   firebase emulators:start --only firestore     (in another terminal)
 *   pnpm seed:emulator
 *
 * Safety: this script refuses to run unless FIRESTORE_EMULATOR_HOST points at a
 * local address, and it never loads service-account credentials, so it cannot
 * write to a production project.
 */
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import {
  mockAcademicAchievements,
  mockAdmissions,
  mockAlumniStories,
  mockAlumniYearStats,
  mockAnnouncements,
  mockEvents,
  mockFeaturedAlumni,
  mockNews,
  mockNotifications,
  mockSports
} from '../lib/mock/data'

const DEFAULT_EMULATOR_HOST = '127.0.0.1:8080'
const LOCAL_HOSTS = new Set(['127.0.0.1', 'localhost', '[::1]'])

function requireLocalEmulator(): string {
  const host = (process.env.FIRESTORE_EMULATOR_HOST ||= DEFAULT_EMULATOR_HOST)
  const hostname = host.replace(/:\d+$/, '')
  if (!LOCAL_HOSTS.has(hostname)) {
    throw new Error(
      `Refusing to seed: FIRESTORE_EMULATOR_HOST is "${host}", which is not a local emulator address.`
    )
  }
  return host
}

type Doc = { id?: string }

/** Fields the real data layer stores as Timestamps but the mock/public shape keeps as ISO strings. */
const DATE_FIELDS: Record<string, string[]> = {
  events: ['date'],
  news: ['date'],
  announcements: ['expiresAt']
}

function prepare(collection: string, doc: Doc): Record<string, unknown> {
  const data: Record<string, unknown> = { ...doc }
  delete data.id
  for (const field of DATE_FIELDS[collection] || []) {
    const value = data[field]
    if (typeof value === 'string') data[field] = Timestamp.fromDate(new Date(value))
  }
  return Object.fromEntries(Object.entries(data).filter(([, value]) => value !== undefined))
}

async function main() {
  const host = requireLocalEmulator()
  const projectId = process.env.GCLOUD_PROJECT || process.env.FIREBASE_ADMIN_PROJECT_ID || 'demo-ihsb'

  // No credential is passed on purpose: only the emulator accepts this.
  const db = getFirestore(initializeApp({ projectId }))

  const collections: Record<string, Doc[]> = {
    news: mockNews,
    events: mockEvents,
    sports: mockSports,
    announcements: mockAnnouncements,
    featuredAlumni: mockFeaturedAlumni,
    alumniStories: mockAlumniStories,
    alumniYearStats: mockAlumniYearStats,
    academicAchievements: mockAcademicAchievements,
    admissions: mockAdmissions,
    notifications: mockNotifications
  }

  console.log(`Seeding Firestore emulator at ${host} (project "${projectId}")`)

  for (const [name, docs] of Object.entries(collections)) {
    const batch = db.batch()
    docs.forEach((doc, index) => {
      const id = doc.id || `${name}-${index + 1}`
      batch.set(db.collection(name).doc(id), prepare(name, doc))
    })
    await batch.commit()
    console.log(`  ${name.padEnd(22)} ${docs.length} documents`)
  }

  console.log('Done. Gallery, faculty and testimonials have no collection and are not seeded.')
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
