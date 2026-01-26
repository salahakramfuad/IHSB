import Link from 'next/link'
import { getAllAcademicAchievements } from '@/lib/firestore/academicAchievements'
import type { AcademicAchievementDocument } from '@/lib/firestore/academicAchievements'
import ImageWithLightbox from './ImageWithLightbox'

interface HighAchieversServerProps {
  limit?: number
}

/**
 * Server-side component for High Achievers section
 * Fetches academic achievements grouped by session type
 */
export default async function HighAchieversServer({ limit = 5 }: HighAchieversServerProps) {
  try {
    const achievements = await getAllAcademicAchievements()
    
    // Group by session type
    const igcse = achievements
      .filter(a => a.session === 'O Level')
      .slice(0, limit)
    
    const ial = achievements
      .filter(a => a.session === 'A Level')
      .slice(0, limit)
    
    const ias = achievements
      .filter(a => a.session === 'AS Level')
      .slice(0, limit)

    const hasAchievements = igcse.length > 0 || ial.length > 0 || ias.length > 0

    if (!hasAchievements) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No achievements available at this time.</p>
        </div>
      )
    }

    const AchievementTab = ({ 
      title, 
      emoji, 
      achievements, 
      id 
    }: { 
      title: string
      emoji: string
      achievements: AcademicAchievementDocument[]
      id: string
    }) => {
      if (achievements.length === 0) return null

      return (
        <div className="mb-8" id={id}>
          <h3 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
            <span className="mr-2" aria-hidden="true">{emoji}</span>
            {title}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {achievements.map((achievement) => (
              <Link
                key={achievement.id}
                href="/achievements/academicachievement"
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                {achievement.image ? (
                  <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                    <ImageWithLightbox
                      src={achievement.image}
                      alt={achievement.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      lightbox={false}
                    />
                  </div>
                ) : (
                  <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-primary-green-50 to-accent-blue-50">
                    <div className="text-center p-4">
                      <div className="text-4xl mb-2">🎓</div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
                        {achievement.name}
                      </h4>
                    </div>
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs text-gray-600 font-semibold mb-1">
                    {achievement.result}
                  </p>
                  <p className="text-xs text-gray-500">
                    {achievement.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div>
        <AchievementTab 
          title="IGCSE" 
          emoji="🏆" 
          achievements={igcse} 
          id="igcse" 
        />
        <AchievementTab 
          title="IAL" 
          emoji="⭐" 
          achievements={ial} 
          id="ial" 
        />
        <AchievementTab 
          title="IAS Achievers" 
          emoji="🌟" 
          achievements={ias} 
          id="ias" 
        />
        <div className="text-center mt-8">
          <Link
            href="/achievements/academicachievement"
            className="inline-block font-semibold text-primary-green-600 hover:text-primary-green-700 transition-colors text-lg"
          >
            View All Achievements →
          </Link>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in HighAchieversServer:', error)
    return (
      <div className="text-center py-8 text-red-500">
        <p>Error loading achievements. Please try again later.</p>
      </div>
    )
  }
}
