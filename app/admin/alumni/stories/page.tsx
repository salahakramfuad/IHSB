'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlumniStoryDocument } from '@/lib/firestore/alumni'
import { Plus, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function AlumniStoriesPage() {
  const [stories, setStories] = useState<AlumniStoryDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingStory, setEditingStory] = useState<AlumniStoryDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/alumni/stories')
      const data = await response.json()
      setStories(data.stories || [])
    } catch (error) {
      setStories([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (story: AlumniStoryDocument) => {
    setEditingStory(story)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<AlumniStoryDocument>) => {
    if (!editingStory?.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/alumni/stories/${editingStory.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update alumni story')
    }

    await fetchStories()
    setIsModalOpen(false)
    setEditingStory(null)
  }

  const handleDelete = async (story: AlumniStoryDocument) => {
    if (!story.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/alumni/stories/${story.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      await fetchStories()
    } else {
      throw new Error('Failed to delete alumni story')
    }
  }

  const getAuthToken = async () => {
    const { auth } = await import('@/lib/firebase/config')
    const user = auth.currentUser
    if (!user) throw new Error('Not authenticated')
    return user.getIdToken()
  }

  const formatDate = (value: any): string => {
    if (!value) return 'N/A'
    try {
      if (typeof value === 'string') {
        return value
      }
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
      return 'N/A'
    } catch {
      return 'N/A'
    }
  }

  const storyFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', required: true, rows: 3 },
    { key: 'content', label: 'Content', type: 'textarea', required: true, rows: 8 },
    { key: 'author', label: 'Author', type: 'text', required: true },
    { key: 'authorRole', label: 'Author Role', type: 'text', required: true, placeholder: 'e.g., Software Engineer' },
    { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
    { key: 'date', label: 'Date', type: 'text', required: true, placeholder: 'e.g., March 2024' },
    { key: 'published', label: 'Published', type: 'checkbox' },
    { key: 'featured', label: 'Featured', type: 'checkbox' }
  ]

  const columns: Column<AlumniStoryDocument>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
          {item.excerpt && (
            <div className="text-xs text-gray-500 truncate mt-1 line-clamp-2">{item.excerpt}</div>
          )}
        </div>
      )
    },
    {
      key: 'author',
      label: 'Author',
      render: (item) => (
        <div>
          <div className="text-sm font-medium text-gray-900">{item.author}</div>
          {item.authorRole && (
            <div className="text-xs text-gray-500">{item.authorRole}</div>
          )}
        </div>
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
      key: 'published',
      label: 'Published',
      render: (item) => (
        item.published ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            No
          </span>
        )
      )
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (item) => (
        item.featured ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-yellow-100 text-accent-yellow-800">
            Yes
          </span>
        ) : (
          <span className="text-xs text-gray-400">No</span>
        )
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Stories</h1>
            <p className="text-gray-600">Manage alumni stories and testimonials</p>
          </div>
          <Link href="/admin/alumni/stories/new">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus size={20} />
              Add Story
            </Button>
          </Link>
        </div>

        <DataTable
          data={stories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search stories by title, author, content..."
          searchKeys={['title', 'author', 'content', 'excerpt']}
          loading={loading}
          emptyMessage="No alumni stories found. Add your first story to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStory(null)
          }}
          onSave={handleSave}
          data={editingStory}
          fields={storyFields}
          title="Edit Alumni Story"
          loading={loading}
        />
      </div>
    </div>
  )
}
