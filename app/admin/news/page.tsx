'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NewsDocument } from '@/lib/firestore/news'
import { Trash2, Edit, Plus, Newspaper } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function NewsPage() {
  const [news, setNews] = useState<NewsDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      const data = await response.json()
      setNews(data.news || [])
    } catch (error) {
      setNews([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return
    }

    setDeleting(id)
    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setNews(news.filter(n => n.id !== id))
      } else {
        alert('Failed to delete news')
      }
    } catch (error) {
      alert('Failed to delete news. Please try again.')
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sports':
        return 'bg-blue-100 text-blue-700'
      case 'news':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Date not available'
    const date = timestamp instanceof Object && 'seconds' in timestamp
      ? new Date(timestamp.seconds * 1000)
      : typeof timestamp === 'string'
      ? new Date(timestamp)
      : new Date()
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">News</h1>
              <p className="text-gray-600">Manage news and highlights</p>
            </div>
            <Link href="/admin/news/new">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus size={20} />
                Create News
              </Button>
            </Link>
          </div>

          {news.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Newspaper className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No news yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first news item</p>
              <Link href="/admin/news/new">
                <Button variant="primary">Create News</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => {
                const mainImage = item.photos && item.photos.length > 0 ? item.photos[0] : null
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {mainImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={mainImage}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                        {item.photos && item.photos.length > 1 && (
                          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
                            {item.photos.length} photos
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{item.description}</p>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/news/${item.id}`}
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
                          onClick={() => handleDelete(item.id!)}
                          disabled={deleting === item.id}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          {deleting === item.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
    </div>
  )
}
