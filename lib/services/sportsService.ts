import { getAllSportsAchievements, getSportsAchievementBySlug } from '../firestore/sports'
import { SportsAchievementDocument } from '../firestore/sports'

export type { SportsAchievementDocument, Sport, Placement } from '../firestore/sports'

/**
 * Server-side service for sports achievements
 * Provides clean interface for data fetching
 */
export async function getSportsAchievements(): Promise<SportsAchievementDocument[]> {
  try {
    return await getAllSportsAchievements()
  } catch (error) {
    // Return empty array on error to prevent page crashes
    return []
  }
}

export async function getSportsAchievement(slug: string): Promise<SportsAchievementDocument | null> {
  try {
    return await getSportsAchievementBySlug(slug)
  } catch (error) {
    return null
  }
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
