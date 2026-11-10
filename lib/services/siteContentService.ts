/**
 * Gallery, faculty and testimonials.
 *
 * These have no Firestore collection yet, so the only source today is the demo
 * set in lib/mock. It is served in mock mode and in development. In production
 * with real data the lists are empty and the sections hide themselves: fictional
 * staff and quotes must never appear on the live site.
 */
import { isMockMode } from '../mock'
import { mockFaculty, mockGallery, mockTestimonials } from '../mock/data'
import type { FacultyMember, GalleryItem, Testimonial } from '../mock/data'
import { schoolStats, type SchoolStats } from '@/data/stats'

export type { FacultyMember, GalleryItem, Testimonial } from '../mock/data'

const demoContentEnabled = () => isMockMode() || process.env.NODE_ENV === 'development'

export async function getGalleryService(limit?: number): Promise<GalleryItem[]> {
  const items = demoContentEnabled() ? mockGallery : []
  return limit ? items.slice(0, limit) : items
}

export async function getFacultyService(limit?: number): Promise<FacultyMember[]> {
  const items = demoContentEnabled() ? mockFaculty : []
  return limit ? items.slice(0, limit) : items
}

export async function getTestimonialsService(limit?: number): Promise<Testimonial[]> {
  const items = demoContentEnabled() ? mockTestimonials : []
  return limit ? items.slice(0, limit) : items
}

/** Headline school figures (real configuration from data/stats.ts). */
export async function getSchoolStatsService(): Promise<SchoolStats> {
  return schoolStats
}
