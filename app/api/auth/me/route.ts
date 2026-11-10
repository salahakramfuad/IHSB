import { NextRequest } from 'next/server'
import { requireAdmin } from '@/lib/auth/middleware'
import { json, serverError } from '@/lib/utils/http'

/**
 * GET /api/auth/me
 * Returns the current admin identity and role when the caller is allowed to use
 * the dashboard (email in SUPERADMIN_EMAILS, or an active `admins` document).
 * The dashboard UI reads the role from here; it is never derived client-side.
 */
export async function GET(request: NextRequest) {
  try {
    const guard = await requireAdmin(request)
    if (!guard.ok) return guard.response

    const { role, email, uid } = guard.admin
    return json({ role, email, uid })
  } catch (error) {
    return serverError('GET /api/auth/me', error, 'Failed to verify access.')
  }
}
