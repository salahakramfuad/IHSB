/**
 * Date helpers shared by server and client components.
 * A fixed locale and time zone (Dhaka) keep server and browser output identical.
 */
const TIME_ZONE = 'Asia/Dhaka'

type DateInput = string | number | Date | { seconds?: number; _seconds?: number; toDate?: () => Date } | null | undefined

export function toDate(value: DateInput): Date | null {
  if (value === null || value === undefined || value === '') return null
  let date: Date
  if (value instanceof Date) date = value
  else if (typeof value === 'string' || typeof value === 'number') date = new Date(value)
  else if (typeof value.toDate === 'function') date = value.toDate()
  else {
    const seconds = value.seconds ?? value._seconds
    if (typeof seconds !== 'number') return null
    date = new Date(seconds * 1000)
  }
  return Number.isNaN(date.getTime()) ? null : date
}

const formatters = {
  long: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TIME_ZONE }),
  short: new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TIME_ZONE }),
  weekday: new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TIME_ZONE }),
  day: new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: TIME_ZONE }),
  month: new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: TIME_ZONE }),
  year: new Intl.DateTimeFormat('en-GB', { year: 'numeric', timeZone: TIME_ZONE })
}

export type DateStyle = keyof typeof formatters

export function formatDate(value: DateInput, style: DateStyle = 'long', fallback = ''): string {
  const date = toDate(value)
  return date ? formatters[style].format(date) : fallback
}

/** ISO string for <time dateTime>, or undefined when the value is not a date. */
export function isoDate(value: DateInput): string | undefined {
  return toDate(value)?.toISOString()
}

/** Plain-text excerpt cut at a word boundary. */
export function excerpt(text: string, maxLength: number): string {
  const plain = text.replace(/\s+/g, ' ').trim()
  if (plain.length <= maxLength) return plain
  const cut = plain.slice(0, maxLength)
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), maxLength - 24)).trimEnd()}…`
}
