/**
 * Shared zod building blocks. All object schemas use zod's default behaviour
 * of stripping unknown keys, so only the fields listed here can reach Firestore.
 */
import { z } from 'zod'

const CONTROL_CHARS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g

/** Trimmed text without control characters. */
export const text = (max: number, min = 1) =>
  z
    .string()
    .transform((value) => value.replace(CONTROL_CHARS, '').trim())
    .pipe(z.string().min(min, min === 1 ? 'is required' : `must be at least ${min} characters`).max(max))

/** Optional text; empty strings become undefined. */
export const optionalText = (max: number) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value) => (typeof value === 'string' ? value.replace(CONTROL_CHARS, '').trim() : ''))
    .pipe(z.string().max(max))
    .transform((value) => (value === '' ? undefined : value))

/** http(s) URL (max 2048 chars). Blocks javascript:, data: and friends. */
export const httpUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    try {
      const url = new URL(value)
      return url.protocol === 'https:' || url.protocol === 'http:'
    } catch {
      return false
    }
  }, 'must be a valid http(s) URL')

/** Optional URL: '' / null / undefined are passed through so fields can be cleared. */
export const optionalUrl = z.union([z.literal(''), z.null(), httpUrl]).optional()

/** URL that must point at this project's Cloudinary delivery host. */
export const cloudinaryUrl = httpUrl.refine((value) => {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com'
  } catch {
    return false
  }
}, 'must be an uploaded file URL')

export const email = z.string().trim().toLowerCase().max(200).pipe(z.email('must be a valid email'))

export const optionalEmail = z
  .union([z.literal(''), z.null(), email])
  .optional()
  .transform((value) => value || undefined)

type TimestampLike = { seconds?: number; _seconds?: number }

/**
 * Date input -> ISO string. Accepts date strings and serialized Firestore
 * timestamps (`{ seconds }` / `{ _seconds }`) that edit forms echo back.
 */
export const dateInput = z
  .union([
    z.string().trim().min(1).max(64),
    z.object({ seconds: z.number() }),
    z.object({ _seconds: z.number() })
  ])
  .transform((value, ctx) => {
    const date =
      typeof value === 'string'
        ? new Date(value)
        : new Date(((value as TimestampLike).seconds ?? (value as TimestampLike)._seconds ?? NaN) * 1000)
    if (Number.isNaN(date.getTime())) {
      ctx.addIssue({ code: 'custom', message: 'must be a valid date' })
      return z.NEVER
    }
    return date.toISOString()
  })

export const photoList = z.array(httpUrl).max(30)

/** Year as number or numeric string, e.g. 2024 or "2024". */
export const year = z
  .union([z.number().int(), z.string().trim().regex(/^\d{4}$/, 'must be a 4-digit year')])
  .refine((value) => {
    const n = Number(value)
    return n >= 1990 && n <= 2100
  }, 'must be a valid year')

export const recaptchaToken = z.string().max(4096).optional()
