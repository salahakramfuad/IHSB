/**
 * Server-side Google reCAPTCHA v3 verification.
 *
 * Fails closed: when RECAPTCHA_SECRET_KEY is missing the check fails, except
 * outside production where it is skipped so local development works without
 * keys. Verification can never be skipped in production.
 */
const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify'
const DEFAULT_MIN_SCORE = 0.5

export interface RecaptchaResult {
  ok: boolean
  /** Machine-readable reason for failures (logged, never sent to clients). */
  reason?: string
}

interface SiteVerifyResponse {
  success?: boolean
  score?: number
  action?: string
  hostname?: string
  'error-codes'?: string[]
}

function minScore(): number {
  const parsed = Number.parseFloat(process.env.RECAPTCHA_MIN_SCORE || '')
  return Number.isFinite(parsed) && parsed > 0 && parsed <= 1 ? parsed : DEFAULT_MIN_SCORE
}

export async function verifyRecaptcha(
  token: unknown,
  expectedAction: string,
  remoteIp?: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!secret) {
    if (process.env.NODE_ENV !== 'production') {
      return { ok: true, reason: 'skipped-no-secret-dev' }
    }
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY is not set; rejecting request')
    return { ok: false, reason: 'not-configured' }
  }

  if (typeof token !== 'string' || token.length === 0 || token.length > 4096) {
    return { ok: false, reason: 'missing-token' }
  }

  try {
    const params = new URLSearchParams({ secret, response: token })
    if (remoteIp && remoteIp !== 'unknown') params.set('remoteip', remoteIp)

    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
      signal: AbortSignal.timeout(5000),
      cache: 'no-store'
    })
    if (!res.ok) return { ok: false, reason: `siteverify-http-${res.status}` }

    const data = (await res.json()) as SiteVerifyResponse
    if (!data.success) {
      return { ok: false, reason: `rejected:${(data['error-codes'] || []).join(',')}` }
    }
    if (data.action !== expectedAction) return { ok: false, reason: 'action-mismatch' }
    if (typeof data.score !== 'number' || data.score < minScore()) {
      return { ok: false, reason: 'low-score' }
    }
    return { ok: true }
  } catch (error) {
    console.error('[recaptcha] verification request failed:', error)
    return { ok: false, reason: 'verify-error' }
  }
}
