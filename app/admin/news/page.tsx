'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NewsDocument } from '@/lib/firestore/news'
import { Plus, Newspaper } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function NewsPage() {
  const [news, setNews] = useState<NewsDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingNews, setEditingNews] = useState<NewsDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleEdit = (item: NewsDocument) => {
    setEditingNews(item)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<NewsDocument>) => {
    if (!editingNews?.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/news/${editingNews.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update news')
    }

    await fetchNews()
    setIsModalOpen(false)
    setEditingNews(null)
  }

  const handleDelete = async (item: NewsDocument) => {
    if (!item.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/news/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      await fetchNews()
    } else {
      throw new Error('Failed to delete news')
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

  const formatDate = (value: any): string => {
    if (!value) return 'N/A'
    try {
      if (value instanceof Date) {
        return value.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
      if (value && typeof value === 'object' && 'seconds' in value) {
        return new Date(value.seconds * 1000).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
      if (typeof value === 'string') {
        return new Date(value).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        })
      }
      return 'N/A'
    } catch {
      return 'N/A'
    }
  }

  const newsFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true, rows: 6 },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'sports', label: 'Sports' },
        { value: 'news', label: 'News' },
        { value: 'general', label: 'General' }
      ]
    },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'photos', label: 'Photos', type: 'images' }
  ]

  const columns: Column<NewsDocument>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
          {item.description && (
            <div className="text-xs text-gray-500 truncate mt-1 line-clamp-2">{item.description}</div>
          )}
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
          {item.category}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (item) => (
        <span className="text-sm text-gray-600">{formatDate(item.date)}</span>
      )
    },
    {
      key: 'photos',
      label: 'Photos',
      render: (item) => (
        <span className="text-sm text-gray-600">
          {item.photos && Array.isArray(item.photos) ? item.photos.length : 0} photo(s)
        </span>
      )
    },
    {
      key: 'createdByEmail',
      label: 'Created By',
      render: (item) => (
        <span className="text-sm text-gray-600">
          {item.createdByEmail || item.createdBy || 'Unknown'}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (item) => (
        <span className="text-sm text-gray-500">{formatDate(item.createdAt)}</span>
      )
    }
  ]

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

        <DataTable
          data={news}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search news by title or description..."
          searchKeys={['title', 'description']}
          loading={loading}
          emptyMessage="No news found. Create your first news item to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingNews(null)
          }}
          onSave={handleSave}
          data={editingNews}
          fields={newsFields}
          title="Edit News"
          loading={loading}
        />
      </div>
    </div>
  )
}
