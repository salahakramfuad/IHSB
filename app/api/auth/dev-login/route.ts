import { NextRequest } from 'next/server'
import { z } from 'zod'
import { devSignIn, isDevLoginEnabled } from '@/lib/auth/devLogin'
import { enforceRateLimit } from '@/lib/security/rateLimit'
import { errorResponse, json, notFound, parseJsonBody, serverError } from '@/lib/utils/http'

const schema = z.object({
  email: z.string().trim().min(1).max(254),
  password: z.string().min(1).max(200)
})

/**
 * POST /api/auth/dev-login
 * Development-only sign-in (see lib/auth/devLogin.ts). Responds 404 in any
 * production build, and whenever DEV_ADMIN_EMAIL / DEV_ADMIN_PASSWORD are unset.
 */
export async function POST(request: NextRequest) {
  try {
    if (!isDevLoginEnabled()) return notFound()

    const limited = enforceRateLimit(request, 'dev-login', { limit: 10, windowMs: 5 * 60 * 1000 })
    if (limited) return limited

    const body = await parseJsonBody(request, schema)
    if (!body.ok) return body.response

    const session = devSignIn(body.data.email, body.data.password)
    if (!session) return errorResponse('User not found or incorrect password.', 401)

    return json({ token: session.token, ...session.identity })
  } catch (error) {
    return serverError('POST /api/auth/dev-login', error, 'An error occurred during login.')
  }
}
