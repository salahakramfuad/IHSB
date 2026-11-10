import {
  getAllAlumniStories,
  getAllAlumniYearStats,
  getAllFeaturedAlumni,
  getAlumniStoryById,
  getAlumniYearStatsByYear,
  getFeaturedAlumniById
} from '../database/alumni'
import type { AlumniStoryDocument, AlumniYearStatsDocument, FeaturedAlumniDocument } from '../database/alumni'
import { mockAlumniStories, mockAlumniYearStats, mockFeaturedAlumni } from '../mock/data'
import { fromSource } from './source'

export type { AlumniStoryDocument, AlumniYearStatsDocument, FeaturedAlumniDocument } from '../database/alumni'

/**
 * Server-side service for alumni content (Firestore or mock data, see ./source.ts).
 */

// ---- Featured alumni (newest graduation year first) ----
export async function getAllFeaturedAlumniService(): Promise<FeaturedAlumniDocument[]> {
  return fromSource('alumni.featured', {
    real: getAllFeaturedAlumni,
    mock: () => [...mockFeaturedAlumni].sort((a, b) => Number(b.graduationYear) - Number(a.graduationYear)),
    empty: []
  })
}

export async function getFeaturedAlumniByYearService(year: string): Promise<FeaturedAlumniDocument[]> {
  return (await getAllFeaturedAlumniService()).filter((alumni) => String(alumni.graduationYear) === String(year))
}

export async function getFeaturedAlumniByIdService(id: string): Promise<FeaturedAlumniDocument | null> {
  return fromSource('alumni.featuredById', {
    real: () => getFeaturedAlumniById(id),
    mock: () => mockFeaturedAlumni.find((alumni) => alumni.id === id) ?? null,
    empty: null
  })
}

// ---- Stories (newest first; includes drafts, callers filter on `published`) ----
export async function getAllAlumniStoriesService(): Promise<AlumniStoryDocument[]> {
  return fromSource('alumni.stories', {
    real: getAllAlumniStories,
    mock: () => [...mockAlumniStories].sort((a, b) => String(b.date).localeCompare(String(a.date))),
    empty: []
  })
}

export async function getPublishedAlumniStoriesService(limit?: number): Promise<AlumniStoryDocument[]> {
  const published = (await getAllAlumniStoriesService()).filter((story) => story.published === true)
  return limit ? published.slice(0, limit) : published
}

export async function getAlumniStoryByIdService(id: string): Promise<AlumniStoryDocument | null> {
  return fromSource('alumni.storyById', {
    real: () => getAlumniStoryById(id),
    mock: () => mockAlumniStories.find((story) => story.id === id) ?? null,
    empty: null
  })
}

// ---- Graduates per year (newest year first) ----
export async function getAllAlumniYearStatsService(): Promise<AlumniYearStatsDocument[]> {
  return fromSource('alumni.yearStats', {
    real: getAllAlumniYearStats,
    mock: () => [...mockAlumniYearStats].sort((a, b) => b.year.localeCompare(a.year)),
    empty: []
  })
}

export async function getAlumniYearStatsByYearService(year: string): Promise<AlumniYearStatsDocument | null> {
  return fromSource('alumni.yearStatsByYear', {
    real: () => getAlumniYearStatsByYear(year),
    mock: () => mockAlumniYearStats.find((stats) => stats.year === year) ?? null,
    empty: null
  })
}
