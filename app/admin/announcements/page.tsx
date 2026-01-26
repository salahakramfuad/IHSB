'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnnouncementDocument } from '@/lib/database/announcements'
import { Plus, Megaphone } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const { fetchAuthenticatedData } = await import('@/lib/utils/api')
      const data = await fetchAuthenticatedData<{ announcements: AnnouncementDocument[] }>('/api/announcements')
      setAnnouncements(data.announcements || [])
    } catch (error) {
      console.error('Error fetching announcements:', error)
      setAnnouncements([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (announcement: AnnouncementDocument) => {
    setEditingAnnouncement(announcement)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<AnnouncementDocument>) => {
    if (!editingAnnouncement?.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/announcements/${editingAnnouncement.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update announcement')
      }

      await fetchAnnouncements()
      setIsModalOpen(false)
      setEditingAnnouncement(null)
    } catch (error) {
      console.error('Error updating announcement:', error)
      throw error
    }
  }

  const handleDelete = async (announcement: AnnouncementDocument) => {
    if (!announcement.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/announcements/${announcement.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchAnnouncements()
      } else {
        throw new Error('Failed to delete announcement')
      }
    } catch (error) {
      console.error('Error deleting announcement:', error)
      throw error
    }
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

  const announcementFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'content', label: 'Content', type: 'textarea', required: true, rows: 6 },
    {
      key: 'priority',
      label: 'Priority',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'featured', label: 'Featured Announcement', type: 'checkbox' },
    { key: 'isActive', label: 'Active', type: 'checkbox' },
    { key: 'expiresAt', label: 'Expiration Date', type: 'datetime' }
  ]

  const columns: Column<AnnouncementDocument>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
          {item.content && (
            <div className="text-xs text-gray-500 truncate mt-1 line-clamp-2">{item.content}</div>
          )}
        </div>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (item) => (
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(item.priority)}`}>
          {item.priority}
        </span>
      )
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (item) => (
        item.isActive ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
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

        <DataTable
          data={announcements}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search announcements by title or content..."
          searchKeys={['title', 'content']}
          loading={loading}
          emptyMessage="No announcements found. Create your first announcement to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAnnouncement(null)
          }}
          onSave={handleSave}
          data={editingAnnouncement}
          fields={announcementFields}
          title="Edit Announcement"
          loading={loading}
        />
      </div>
    </div>
  )
}
