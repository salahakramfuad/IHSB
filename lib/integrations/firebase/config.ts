import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { DEV_LOGIN, getDevUser } from '@/lib/auth/devSession'

const firebaseConfig = {
  // Placeholder keeps module evaluation from throwing when the env var is absent
  // (e.g. builds without credentials); sign-in simply fails until it is configured.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'missing-firebase-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
let app: FirebaseApp
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

// Client SDK is used for authentication only. Firestore is accessed exclusively
// on the server through the Admin SDK (see ./admin.ts).
// Development-only local login (lib/auth/devSession.ts): `auth.currentUser` resolves to
// the local session instead of Firebase. DEV_LOGIN is always false in production builds.
const devAuth = {
  get currentUser() {
    return getDevUser()
  }
} as unknown as Auth

export const auth: Auth = DEV_LOGIN ? devAuth : getAuth(app)
export default app
