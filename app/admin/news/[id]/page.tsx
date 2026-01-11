'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import MultiImageUpload from '@/components/admin/MultiImageUpload'
import DatePicker from '@/components/admin/DatePicker'
import Button from '@/components/ui/Button'
import { NewsDocument } from '@/lib/firestore/news'

export default function EditNewsPage() {
  const router = useRouter()
  const params = useParams()
  const newsId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState<Omit<NewsDocument, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    photos: [],
    category: 'general',
    date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchNews()
  }, [newsId])

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news/${newsId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch news')
      }

      const news = data.news
      const dateValue = news.date 
        ? (news.date.seconds 
            ? new Date(news.date.seconds * 1000).toISOString().split('T')[0]
            : typeof news.date === 'string'
            ? news.date.split('T')[0]
            : new Date(news.date).toISOString().split('T')[0])
        : new Date().toISOString().split('T')[0]

      setFormData({
        title: news.title || '',
        description: news.description || '',
        photos: news.photos || [],
        category: news.category || 'general',
        date: dateValue
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
    
    if (formData.photos.length === 0) {
      setError('Please upload at least one image')
      return
    }

    setSaving(true)

    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/news/${newsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          date: formData.date 
            ? (typeof formData.date === 'string' 
                ? new Date(formData.date).toISOString() 
                : new Date().toISOString())
            : new Date().toISOString()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update news')
      }

      router.push('/admin/news')
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit News</h1>
            <p className="text-gray-600">Update news item details</p>
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
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'sports' | 'news' | 'general' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              >
                <option value="general">General</option>
                <option value="sports">Sports</option>
                <option value="news">News</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                value={typeof formData.date === 'string' ? formData.date : ''}
                onChange={(date) => setFormData({ ...formData, date: date || new Date().toISOString().split('T')[0] })}
                type="date"
              />
            </div>

            <div>
              <MultiImageUpload
                value={formData.photos}
                onChange={(urls) => setFormData({ ...formData, photos: urls })}
                label="Upload Images"
                required
                maxImages={10}
              />
              <p className="mt-1 text-xs text-gray-500">
                First image will be used as the main/featured image
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </div>
    </div>
  )
}
