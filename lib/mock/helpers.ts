/**
 * Helpers shared by the mock data files.
 * Dates are expressed relative to "today" (start of the current day) so the
 * demo always has both recent and upcoming content.
 */
import { Timestamp } from 'firebase-admin/firestore'

const DAY_MS = 24 * 60 * 60 * 1000

/** Window the mock content is spread across: last ~6 months to next ~3 months. */
export const PAST_WINDOW_DAYS = 183
export const FUTURE_WINDOW_DAYS = 92

function startOfToday(): Date {
  const now = new Date()
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
}

/** ISO string for `days` from today (negative = past) at `hour`:`minute` Dhaka-friendly UTC time. */
export function daysFromNow(days: number, hour = 4, minute = 0): string {
  return new Date(startOfToday().getTime() + days * DAY_MS + (hour * 60 + minute) * 60 * 1000).toISOString()
}

/**
 * Day offset of the occurrence of a fixed calendar date (e.g. Victory Day,
 * 16 December) that falls inside the mock window. When no occurrence is inside
 * the window, `fallbackDays` is used so every item stays in range.
 */
export function annualOffset(month: number, day: number, fallbackDays: number): number {
  const today = startOfToday()
  const year = today.getUTCFullYear()
  const candidates = [year - 1, year, year + 1].map((y) =>
    Math.round((Date.UTC(y, month - 1, day) - today.getTime()) / DAY_MS)
  )
  const inWindow = candidates
    .filter((offset) => offset >= -PAST_WINDOW_DAYS && offset <= FUTURE_WINDOW_DAYS)
    .sort((a, b) => Math.abs(a) - Math.abs(b))
  return inWindow.length > 0 ? inWindow[0] : fallbackDays
}

/** Firestore Timestamp for an ISO string (a plain value object; needs no Firebase app). */
export function ts(iso: string): Timestamp {
  return Timestamp.fromDate(new Date(iso))
}

/** Calendar year `offset` years from the current one (for results and graduation years). */
export function yearFromNow(offset: number): number {
  return new Date().getUTCFullYear() + offset
}
