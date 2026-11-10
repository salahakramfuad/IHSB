/**
 * Simple in-memory sliding-window rate limiter (per key, usually per IP).
 *
 * Note: state lives in the memory of a single server instance. On serverless
 * platforms each instance keeps its own window, so this is a first line of
 * defence (together with reCAPTCHA), not a hard global quota.
 */
import { NextRequest, NextResponse } from 'next/server'

interface RateLimitOptions {
  /** Maximum number of requests allowed inside the window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  /** Seconds until the next request would be allowed (0 when allowed). */
  retryAfterSeconds: number
}

const MAX_TRACKED_KEYS = 10_000
const hits = new Map<string, number[]>()

function prune(now: number, windowMs: number) {
  for (const [key, timestamps] of hits) {
    if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] >= windowMs) {
      hits.delete(key)
    }
  }
  // Hard cap so a flood of unique keys cannot grow memory without bound.
  if (hits.size > MAX_TRACKED_KEYS) {
    const excess = hits.size - MAX_TRACKED_KEYS
    let removed = 0
    for (const key of hits.keys()) {
      hits.delete(key)
      if (++removed >= excess) break
    }
  }
}

export function rateLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs
  const recent = (hits.get(key) || []).filter((timestamp) => timestamp > windowStart)

  if (recent.length >= limit) {
    hits.set(key, recent)
    const retryAfterMs = recent[0] + windowMs - now
    return { allowed: false, remaining: 0, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) }
  }

  recent.push(now)
  hits.set(key, recent)
  if (hits.size > MAX_TRACKED_KEYS / 2) prune(now, windowMs)

  return { allowed: true, remaining: limit - recent.length, retryAfterSeconds: 0 }
}

/**
 * Best-effort client IP. Prefers the address set by the hosting platform's
 * proxy; the left-most X-Forwarded-For entry can be spoofed when the app is
 * exposed without a trusted proxy in front of it.
 */
export function getClientIp(request: NextRequest): string {
  const vercel = request.headers.get('x-vercel-forwarded-for')
  if (vercel) return vercel.split(',')[0].trim()

  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  return 'unknown'
}

/**
 * Apply a per-IP limit for a named bucket. Returns a 429 response when the
 * caller is over the limit, otherwise null.
 */
export function enforceRateLimit(
  request: NextRequest,
  bucket: string,
  options: RateLimitOptions
): NextResponse | null {
  const result = rateLimit(`${bucket}:${getClientIp(request)}`, options)
  if (result.allowed) return null

  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(result.retryAfterSeconds) } }
  )
}
