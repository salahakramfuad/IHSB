'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnnouncementDocument } from '@/lib/firestore/announcements'
import { Trash2, Edit, Plus, Megaphone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements')
      const data = await response.json()
      setAnnouncements(data.announcements || [])
    } catch (error) {
      // Silently handle error
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this announcement?')) {
      return
    }

    setDeleting(id)
    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setAnnouncements(announcements.filter(a => a.id !== id))
      } else {
        alert('Failed to delete announcement')
      }
    } catch (error) {
      alert('Failed to delete announcement. Please try again.')
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading announcements...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
              <p className="text-gray-600">Manage school announcements</p>
            </div>
            <Link href="/admin/announcements/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={20} />
                Create Announcement
              </Button>
            </Link>
          </div>

          {announcements.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Megaphone className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first announcement</p>
              <Link href="/admin/announcements/new">
                <Button variant="primary">Create Announcement</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {announcement.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={announcement.image}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                      <div className="flex gap-2">
                        {announcement.featured && (
                          <span className="text-xs bg-accent-yellow-100 text-accent-yellow-800 px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                        {announcement.isActive ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Active
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{announcement.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{announcement.content}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/announcements/${announcement.id}`}
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
                        onClick={() => handleDelete(announcement.id!)}
                        disabled={deleting === announcement.id}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        {deleting === announcement.id ? (
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
