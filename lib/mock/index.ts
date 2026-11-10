/**
 * Mock data mode (server-only).
 *
 * Enabled when USE_MOCK_DATA === 'true', or — outside production only — when
 * the Firebase Admin credentials are missing. It is never auto-enabled in
 * production: there it requires the explicit USE_MOCK_DATA flag.
 */
import { NextResponse } from 'next/server'
import { hasAdminCredentials } from '@/lib/integrations/firebase/admin'

export function isMockMode(): boolean {
  if (process.env.USE_MOCK_DATA === 'true') return true
  if (process.env.NODE_ENV === 'production') return false
  if (process.env.FIRESTORE_EMULATOR_HOST) return false
  return !hasAdminCredentials()
}

export function mockWriteBlockedResponse() {
  return NextResponse.json({ error: 'Mock mode: writes disabled' }, { status: 403 })
}
