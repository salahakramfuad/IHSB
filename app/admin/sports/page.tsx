'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SportsAchievementDocument } from '@/lib/firestore/sports'
import { Trash2, Edit, Plus, Trophy } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function SportsPage() {
  const [achievements, setAchievements] = useState<SportsAchievementDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/sports')
      const data = await response.json()
      setAchievements(data.achievements || [])
    } catch (error) {
      // Silently handle error
      setAchievements([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement?')) {
      return
    }

    setDeleting(id)
    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/sports/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setAchievements(achievements.filter(a => a.id !== id))
      } else {
        alert('Failed to delete achievement')
      }
    } catch (error) {
      alert('Failed to delete achievement. Please try again.')
    } finally {
      setDeleting(null)
    }
  }

  const getAuthToken = async () => {
    const { auth } = await import('@/lib/firebase/config')
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    return user.getIdToken()
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading achievements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sports & Achievements</h1>
              <p className="text-gray-600">Manage sports achievements and events</p>
            </div>
            <Link href="/admin/sports/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={20} />
                Add Achievement
              </Button>
            </Link>
          </div>

          {achievements.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No achievements yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first sports achievement</p>
              <Link href="/admin/sports/new">
                <Button variant="primary">Add Achievement</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {achievement.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={achievement.image}
                        alt={achievement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-primary-green-100 text-primary-green-800">
                        {achievement.sport}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-accent-yellow-100 text-accent-yellow-800">
                        {achievement.placement}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{achievement.description}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/sports/${achievement.id}`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                          <Edit size={16} />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(achievement.id!)}
                        disabled={deleting === achievement.id}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        {deleting === achievement.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}
