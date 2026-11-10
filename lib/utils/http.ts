/**
 * Helpers for API route handlers (server-only).
 */
import { NextRequest, NextResponse } from 'next/server'
import type { z } from 'zod'

/**
 * Convert Firestore Timestamps (Admin SDK) into the `{ seconds, nanoseconds }`
 * wire shape the dashboard already understands, recursively.
 */
export function serialize<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value
  if (value instanceof Date) return value
  if (Array.isArray(value)) return value.map((item) => serialize(item)) as unknown as T

  const maybeTimestamp = value as { toDate?: unknown; seconds?: unknown; nanoseconds?: unknown }
  if (
    typeof maybeTimestamp.toDate === 'function' &&
    typeof maybeTimestamp.seconds === 'number' &&
    typeof maybeTimestamp.nanoseconds === 'number'
  ) {
    return { seconds: maybeTimestamp.seconds, nanoseconds: maybeTimestamp.nanoseconds } as unknown as T
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).map(([key, item]) => [key, serialize(item)])
  ) as T
}

/** JSON response with Firestore values serialized. */
export function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(serialize(data), init)
}

export function errorResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers })
}

/**
 * Log the real error on the server and return a generic message to the client.
 * Never forwards `error.message` (it can leak internals).
 */
export function serverError(context: string, error: unknown, message = 'Something went wrong. Please try again.') {
  console.error(`[api] ${context}:`, error)
  return errorResponse(message, 500)
}

type ParseResult<T> = { ok: true; data: T } | { ok: false; response: NextResponse }

const MAX_JSON_BYTES = 256 * 1024

/**
 * Parse and validate a JSON request body against a zod schema.
 * Unknown keys are stripped by the schema, which prevents mass assignment.
 */
export async function parseJsonBody<S extends z.ZodType>(
  request: NextRequest,
  schema: S
): Promise<ParseResult<z.infer<S>>> {
  let raw: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_JSON_BYTES) {
      return { ok: false, response: errorResponse('Request body is too large.', 413) }
    }
    raw = JSON.parse(text)
  } catch {
    return { ok: false, response: errorResponse('Invalid JSON body.', 400) }
  }

  const result = schema.safeParse(raw)
  if (!result.success) {
    const issue = result.error.issues[0]
    const field = issue?.path.join('.')
    const message = issue ? (field ? `${field}: ${issue.message}` : issue.message) : 'Invalid request.'
    return { ok: false, response: errorResponse(`Invalid request. ${message}`, 400) }
  }

  return { ok: true, data: result.data }
}

/** Firestore document ids: no slashes, not dot-only, bounded length. */
export function isValidDocId(id: string): boolean {
  return /^[A-Za-z0-9_-]{1,128}$/.test(id)
}

/** Parse a positive integer query param, clamped to [1, max]. */
export function parseLimit(value: string | null, fallback: number, max = 100): number {
  const parsed = Number.parseInt(value ?? '', 10)
  if (!Number.isFinite(parsed) || parsed < 1) return fallback
  return Math.min(parsed, max)
}

const AUDIT_FIELDS = ['createdBy', 'createdByEmail', 'updatedBy', 'updatedByEmail'] as const

/** Remove internal audit fields (admin emails/ids) before returning a document publicly. */
export function toPublic<T extends object>(doc: T): T {
  const copy = { ...doc } as Record<string, unknown>
  for (const field of AUDIT_FIELDS) delete copy[field]
  return copy as T
}

export function notFound(message = 'Not found') {
  return errorResponse(message, 404)
}
