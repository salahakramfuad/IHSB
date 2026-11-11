/**
 * Development-only admin session (browser side). See lib/auth/devLogin.ts.
 *
 * `process.env.NODE_ENV` is inlined at build time, so in a production bundle
 * `DEV_LOGIN` is the constant `false` and none of this is reachable.
 */
import type { User } from 'firebase/auth'

export const DEV_LOGIN =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_LOGIN === 'true'

const STORAGE_KEY = 'ihsb-dev-session'

interface StoredSession {
  token: string
  uid: string
  email: string
  name: string
}

type Listener = (user: User | null) => void

const listeners = new Set<Listener>()
let cached: { raw: string; user: User } | null = null

function read(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

/** The signed-in dev user, shaped like the parts of a Firebase `User` the dashboard reads. */
export function getDevUser(): User | null {
  const raw = read()
  if (!raw) {
    cached = null
    return null
  }
  // Same object for the same session, so React effects keyed on `user` stay stable
  if (cached?.raw === raw) return cached.user

  try {
    const session = JSON.parse(raw) as StoredSession
    if (!session.token || !session.email) return null
    const user = {
      uid: session.uid,
      email: session.email,
      displayName: session.name,
      photoURL: null,
      emailVerified: true,
      getIdToken: async () => session.token
    } as unknown as User
    cached = { raw, user }
    return user
  } catch {
    return null
  }
}

function write(session: StoredSession | null) {
  try {
    if (session) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable: the session simply does not persist
  }
  const user = getDevUser()
  listeners.forEach((listener) => listener(user))
}

export async function devSignIn(email: string, password: string) {
  try {
    const res = await fetch('/api/auth/dev-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      const message =
        res.status === 404
          ? 'Local login is not configured. Set DEV_ADMIN_EMAIL and DEV_ADMIN_PASSWORD in .env.local.'
          : data?.error || 'An error occurred during login.'
      return { user: null, error: message as string }
    }
    write({ token: data.token, uid: data.uid, email: data.email, name: data.name })
    return { user: getDevUser(), error: null }
  } catch {
    return { user: null, error: 'Network error. Please check your connection.' }
  }
}

export function devSignOut() {
  write(null)
}

export function onDevAuthChange(callback: Listener) {
  listeners.add(callback)
  // Async like Firebase's onAuthStateChanged: never call back during subscribe
  queueMicrotask(() => {
    if (listeners.has(callback)) callback(getDevUser())
  })
  return () => {
    listeners.delete(callback)
  }
}

export function updateDevDisplayName(name: string) {
  const raw = read()
  if (!raw) throw new Error('No authenticated user.')
  write({ ...(JSON.parse(raw) as StoredSession), name })
}
