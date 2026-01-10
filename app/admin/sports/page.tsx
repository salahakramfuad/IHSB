'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SportsAchievementDocument } from '@/lib/firestore/sports'
import { Plus, Trophy } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function SportsPage() {
  const [achievements, setAchievements] = useState<SportsAchievementDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAchievement, setEditingAchievement] = useState<SportsAchievementDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/sports')
      const data = await response.json()
      setAchievements(data.achievements || [])
    } catch (error) {
      setAchievements([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (achievement: SportsAchievementDocument) => {
    setEditingAchievement(achievement)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<SportsAchievementDocument>) => {
    if (!editingAchievement?.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/sports/${editingAchievement.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update achievement')
    }

    await fetchAchievements()
    setIsModalOpen(false)
    setEditingAchievement(null)
  }

  const handleDelete = async (achievement: SportsAchievementDocument) => {
    if (!achievement.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/sports/${achievement.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      await fetchAchievements()
    } else {
      throw new Error('Failed to delete achievement')
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

  const sportsFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'url-friendly-slug' },
    {
      key: 'sport',
      label: 'Sport',
      type: 'select',
      required: true,
      options: [
        { value: 'Football', label: 'Football' },
        { value: 'Basketball', label: 'Basketball' },
        { value: 'Badminton', label: 'Badminton' },
        { value: 'Chess', label: 'Chess' },
        { value: 'Events', label: 'Events' }
      ]
    },
    {
      key: 'placement',
      label: 'Placement',
      type: 'select',
      required: true,
      options: [
        { value: 'Champion', label: 'Champion' },
        { value: 'Runner-up', label: 'Runner-up' },
        { value: 'Participant', label: 'Participant' },
        { value: 'Award', label: 'Award' }
      ]
    },
    { key: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
    { key: 'longDescription', label: 'Long Description', type: 'textarea', rows: 6 },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'image', label: 'Main Image', type: 'image', required: true },
    { key: 'photos', label: 'Additional Photos', type: 'images' }
  ]

  const columns: Column<SportsAchievementDocument>[] = [
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
      key: 'sport',
      label: 'Sport',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-green-100 text-primary-green-800">
          {item.sport}
        </span>
      )
    },
    {
      key: 'placement',
      label: 'Placement',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-yellow-100 text-accent-yellow-800">
          {item.placement}
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
      key: 'location',
      label: 'Location',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.location || 'N/A'}</span>
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
        <span className="text-sm text-gray-500">
          {item.createdAt && typeof item.createdAt === 'object' && 'seconds' in item.createdAt
            ? formatDate(new Date(item.createdAt.seconds * 1000))
            : formatDate(item.createdAt)}
        </span>
      )
    }
  ]

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

        <DataTable
          data={achievements}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search achievements by title, description, or location..."
          searchKeys={['title', 'description', 'location', 'sport']}
          loading={loading}
          emptyMessage="No achievements found. Add your first sports achievement to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAchievement(null)
          }}
          onSave={handleSave}
          data={editingAchievement}
          fields={sportsFields}
          title="Edit Sports Achievement"
          loading={loading}
        />
      </div>
    </div>
  )
}
