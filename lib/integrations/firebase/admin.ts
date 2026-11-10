import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getAuth, Auth } from 'firebase-admin/auth'

/**
 * Firebase Admin SDK (server-only).
 *
 * Initialisation is lazy so that importing this module never throws when the
 * credentials are missing (e.g. during `next build` or in mock-data mode).
 * The first real use of `adminDb` / `adminAuth` initialises the app.
 */

/** True when all Firebase Admin credentials are present in the server env. */
export function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
  )
}

/** True when the Firestore/Auth emulators are targeted (no credentials needed). */
function usingEmulator(): boolean {
  return Boolean(process.env.FIRESTORE_EMULATOR_HOST)
}

function getAdminApp(): App {
  const existing = getApps()[0]
  if (existing) return existing

  // The Auth emulator accepts unsigned tokens; it must never be reachable from a production build.
  if (
    process.env.NODE_ENV === 'production' &&
    (process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST)
  ) {
    throw new Error('Firebase emulator hosts must not be set in production')
  }

  if (usingEmulator() && !hasAdminCredentials()) {
    return initializeApp({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.GCLOUD_PROJECT || 'demo-ihsb'
    })
  }

  if (!hasAdminCredentials()) {
    throw new Error('Firebase Admin credentials are not configured')
  }

  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
    }),
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID
  })
}

/** Proxy that resolves the real instance on first property access. */
function lazy<T extends object>(resolve: () => T): T {
  let instance: T | undefined
  return new Proxy({} as T, {
    get(_target, prop) {
      instance ??= resolve()
      const value = Reflect.get(instance, prop, instance)
      return typeof value === 'function' ? value.bind(instance) : value
    }
  })
}

export const adminDb: Firestore = lazy(() => getFirestore(getAdminApp()))
export const adminAuth: Auth = lazy(() => getAuth(getAdminApp()))
