'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'
import DatePicker from '@/components/admin/DatePicker'
import Button from '@/components/ui/Button'
import { AnnouncementDocument } from '@/lib/firestore/announcements'

export default function EditAnnouncementPage() {
  const router = useRouter()
  const params = useParams()
  const announcementId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<Omit<AnnouncementDocument, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    content: '',
    image: '',
    priority: 'medium',
    featured: false,
    isActive: true,
    expiresAt: undefined
  })

  useEffect(() => {
    fetchAnnouncement()
  }, [announcementId])

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch(`/api/announcements/${announcementId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch announcement')
      }

      const announcement = data.announcement
      setFormData({
        ...announcement,
        isActive: announcement.isActive !== undefined ? announcement.isActive : true,
        expiresAt: announcement.expiresAt 
          ? (announcement.expiresAt.seconds 
              ? new Date(announcement.expiresAt.seconds * 1000).toISOString().slice(0, 16)
              : new Date(announcement.expiresAt).toISOString().slice(0, 16))
          : undefined
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/announcements/${announcementId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update announcement')
      }

      router.push('/admin/announcements')
    } catch (err: any) {
      setError(err.message)
      setSaving(false)
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
          <p className="mt-4 text-gray-600">Loading announcement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Announcement</h1>
            <p className="text-gray-600">Update announcement information</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Announcement Image (Optional)"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300 text-primary-green-600 focus:ring-primary-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Featured Announcement</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-primary-green-600 focus:ring-primary-green-500"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>

            <div>
              <DatePicker
                value={formData.expiresAt 
                  ? (typeof formData.expiresAt === 'string' 
                      ? formData.expiresAt.includes('T') && formData.expiresAt.length === 16
                        ? formData.expiresAt
                        : new Date(formData.expiresAt).toISOString().slice(0, 16)
                      : typeof formData.expiresAt === 'object' && 'seconds' in formData.expiresAt
                        ? new Date(formData.expiresAt.seconds * 1000).toISOString().slice(0, 16)
                        : new Date(formData.expiresAt).toISOString().slice(0, 16))
                  : ''}
                onChange={(value) => {
                  if (value) {
                    const isoString = new Date(value).toISOString()
                    setFormData({ ...formData, expiresAt: isoString })
                  } else {
                    setFormData({ ...formData, expiresAt: undefined })
                  }
                }}
                label="Expiration Date (Optional)"
                type="datetime-local"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={saving}
                className="flex-1"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
    </div>
  )
}
