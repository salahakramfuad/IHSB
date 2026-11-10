/**
 * Browser helper for Google reCAPTCHA v3.
 * The script is loaded on demand (only on pages that submit a protected form).
 * Tokens are always verified on the server (lib/security/recaptcha.ts).
 */
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

interface Grecaptcha {
  ready(callback: () => void): void
  execute(siteKey: string, options: { action: string }): Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(siteKey: string): Promise<void> {
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null
      reject(new Error('Failed to load reCAPTCHA'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

/**
 * Returns a fresh token for `action` (tokens expire after 2 minutes and are
 * single-use, so request one right before each submit). Returns undefined when
 * no site key is configured (local development).
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  if (!SITE_KEY || typeof window === 'undefined') return undefined

  await loadScript(SITE_KEY)
  const grecaptcha = window.grecaptcha
  if (!grecaptcha) throw new Error('reCAPTCHA is unavailable')

  await new Promise<void>((resolve) => grecaptcha.ready(resolve))
  return grecaptcha.execute(SITE_KEY, { action })
}
