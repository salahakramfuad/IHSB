/**
 * Chooses between Firestore and mock data for every service function.
 *
 * - Mock mode (see lib/mock): always mock data.
 * - Otherwise Firestore. In development only, an empty result or an error
 *   falls back to mock data so pages are never blank while building.
 * - In production an error returns the provided `empty` value (and is logged);
 *   mock data is never substituted.
 */
import { isMockMode } from '@/lib/mock'

const isDevelopment = process.env.NODE_ENV === 'development'

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || (Array.isArray(value) && value.length === 0)
}

export async function fromSource<T>(
  label: string,
  options: { real: () => Promise<T>; mock: () => T; empty: T }
): Promise<T> {
  if (isMockMode()) return options.mock()

  try {
    const result = await options.real()
    if (isDevelopment && isEmpty(result)) return options.mock()
    return result
  } catch (error) {
    console.error(`[service] ${label} failed:`, error)
    return isDevelopment ? options.mock() : options.empty
  }
}
