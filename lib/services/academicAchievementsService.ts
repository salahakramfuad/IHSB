import { getAcademicAchievementById, getAllAcademicAchievements } from '../database/academicAchievements'
import type { AcademicAchievementDocument, Session } from '../database/academicAchievements'
import { mockAcademicAchievements } from '../mock/data'
import { fromSource } from './source'

export type { AcademicAchievementDocument, Session } from '../database/academicAchievements'

/**
 * Server-side service for academic achievements (Firestore or mock data, see ./source.ts).
 * Sorted by year, newest first.
 */
export async function getAllAcademicAchievementsService(): Promise<AcademicAchievementDocument[]> {
  return fromSource('academicAchievements.all', {
    real: getAllAcademicAchievements,
    mock: () => [...mockAcademicAchievements].sort((a, b) => Number(b.year) - Number(a.year)),
    empty: []
  })
}

export async function getAcademicAchievementsBySessionService(session: Session): Promise<AcademicAchievementDocument[]> {
  return (await getAllAcademicAchievementsService()).filter((achievement) => achievement.session === session)
}

export async function getAcademicAchievementByIdService(id: string): Promise<AcademicAchievementDocument | null> {
  return fromSource('academicAchievements.byId', {
    real: () => getAcademicAchievementById(id),
    mock: () => mockAcademicAchievements.find((achievement) => achievement.id === id) ?? null,
    empty: null
  })
}
