import { getAllSportsAchievements, getSportsAchievementById, getSportsAchievementBySlug } from '../database/sports'
import type { SportsAchievementDocument } from '../database/sports'
import { mockSports } from '../mock/data'
import { fromSource } from './source'

export type { SportsAchievementDocument, Sport, Placement } from '../database/sports'

/**
 * Server-side service for sports achievements (Firestore or mock data, see ./source.ts).
 */
const newestFirst = (items: SportsAchievementDocument[]) =>
  [...items].sort((a, b) => String(b.date).localeCompare(String(a.date)))

export async function getSportsAchievements(): Promise<SportsAchievementDocument[]> {
  return fromSource('sports.all', {
    real: getAllSportsAchievements,
    mock: () => newestFirst(mockSports),
    empty: []
  })
}

export async function getSportsAchievement(slug: string): Promise<SportsAchievementDocument | null> {
  return fromSource('sports.bySlug', {
    real: () => getSportsAchievementBySlug(slug),
    mock: () => mockSports.find((item) => item.slug === slug) ?? null,
    empty: null
  })
}

export async function getSportsAchievementByIdService(id: string): Promise<SportsAchievementDocument | null> {
  return fromSource('sports.byId', {
    real: () => getSportsAchievementById(id),
    mock: () => mockSports.find((item) => item.id === id) ?? null,
    empty: null
  })
}

/**
 * Calculate statistics from achievements
 */
export function calculateSportsStats(achievements: SportsAchievementDocument[]) {
  const stats: Record<string, { champion: number; runnerUp: number }> = {
    Football: { champion: 0, runnerUp: 0 },
    Basketball: { champion: 0, runnerUp: 0 },
    Badminton: { champion: 0, runnerUp: 0 },
    Chess: { champion: 0, runnerUp: 0 },
    Events: { champion: 0, runnerUp: 0 }
  }

  for (const achievement of achievements) {
    const sport = achievement.sport
    if (stats[sport]) {
      if (achievement.placement === 'Champion') {
        stats[sport].champion++
      } else if (achievement.placement === 'Runner-up') {
        stats[sport].runnerUp++
      }
    }
  }

  return stats
}
