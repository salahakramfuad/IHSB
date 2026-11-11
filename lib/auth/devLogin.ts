/**
 * Development-only admin login (server-only).
 *
 * Lets a developer sign in to the dashboard without a Firebase project, using
 * DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD from .env.local.
 *
 * It is active ONLY under `next dev` (NODE_ENV === 'development'). `next build`
 * and `next start` always run with NODE_ENV=production, so a deployed site can
 * never accept these credentials or tokens, whatever its env vars say.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

export const DEV_ADMIN_UID = 'dev-admin'
const TOKEN_PREFIX = 'dev.'
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000

export interface DevIdentity {
  uid: string
  email: string
  name: string
}

function credentials(): { email: string; password: string } | null {
  if (process.env.NODE_ENV !== 'development' || process.env.VERCEL) return null
  const email = (process.env.DEV_ADMIN_EMAIL || '').trim().toLowerCase()
  const password = process.env.DEV_ADMIN_PASSWORD || ''
  if (!email || password.length < 8) return null
  return { email, password }
}

export function isDevLoginEnabled(): boolean {
  return credentials() !== null
}

function digest(value: string): Buffer {
  return createHash('sha256').update(value).digest()
}

function sign(payload: string, password: string): string {
  return createHmac('sha256', `ihsb-dev-login:${password}`).update(payload).digest('base64url')
}

/** Checks the submitted email/password and returns a session token, or null. */
export function devSignIn(email: string, password: string): { token: string; identity: DevIdentity } | null {
  const creds = credentials()
  if (!creds) return null

  const emailOk = timingSafeEqual(digest(email.trim().toLowerCase()), digest(creds.email))
  const passwordOk = timingSafeEqual(digest(password), digest(creds.password))
  if (!emailOk || !passwordOk) return null

  const payload = Buffer.from(
    JSON.stringify({ email: creds.email, exp: Date.now() + TOKEN_TTL_MS })
  ).toString('base64url')
  return {
    token: `${TOKEN_PREFIX}${payload}.${sign(payload, creds.password)}`,
    identity: { uid: DEV_ADMIN_UID, email: creds.email, name: 'Local Admin' }
  }
}

export function isDevToken(token: string): boolean {
  return token.startsWith(TOKEN_PREFIX)
}

/** Verifies a token issued by `devSignIn`. Returns null when disabled, forged or expired. */
export function verifyDevToken(token: string): DevIdentity | null {
  const creds = credentials()
  if (!creds || !isDevToken(token)) return null

  const [payload, signature, ...rest] = token.slice(TOKEN_PREFIX.length).split('.')
  if (!payload || !signature || rest.length > 0) return null

  const expected = Buffer.from(sign(payload, creds.password))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { email?: string; exp?: number }
    if (data.email !== creds.email || typeof data.exp !== 'number' || data.exp < Date.now()) return null
    return { uid: DEV_ADMIN_UID, email: creds.email, name: 'Local Admin' }
  } catch {
    return null
  }
}
