/**
 * Shared helpers for the Firestore data layer.
 * All data access goes through the Admin SDK (server-only); Firestore security
 * rules deny every client read/write.
 */
import type { DocumentData, QueryDocumentSnapshot, DocumentSnapshot } from 'firebase-admin/firestore'

/** Map a document snapshot to `{ id, ...data }`. */
export function withId<T>(doc: QueryDocumentSnapshot<DocumentData> | DocumentSnapshot<DocumentData>): T {
  return { id: doc.id, ...doc.data() } as T
}

/** Firestore rejects `undefined`; drop those keys (and never persist `id`). */
export function cleanForWrite(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => key !== 'id' && value !== undefined)
  )
}

/** Milliseconds for a Timestamp, serialized timestamp, Date or date string. */
export function dateToMillis(value: unknown): number {
  if (!value) return 0
  if (value instanceof Date) return value.getTime()
  if (typeof value === 'string' || typeof value === 'number') {
    const ms = new Date(value).getTime()
    return Number.isNaN(ms) ? 0 : ms
  }
  if (typeof value === 'object') {
    const v = value as {
      toMillis?: () => number
      seconds?: number
      nanoseconds?: number
      _seconds?: number
      _nanoseconds?: number
    }
    if (typeof v.toMillis === 'function') return v.toMillis()
    const seconds = v.seconds ?? v._seconds
    if (typeof seconds === 'number') {
      return seconds * 1000 + (v.nanoseconds ?? v._nanoseconds ?? 0) / 1e6
    }
  }
  return 0
}
