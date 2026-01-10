'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EventDocument } from '@/lib/firestore/events'
import { Plus, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function EventsPage() {
  const [events, setEvents] = useState<EventDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<EventDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      // Map events to include full document data
      setEvents(data.events || [])
    } catch (error) {
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (event: EventDocument) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<EventDocument>) => {
    if (!editingEvent?.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/events/${editingEvent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to update event')
    }

    await fetchEvents()
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  const handleDelete = async (event: EventDocument) => {
    if (!event.id) return

    const token = await getAuthToken()
    const response = await fetch(`/api/events/${event.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.ok) {
      await fetchEvents()
    } else {
      throw new Error('Failed to delete event')
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

  const eventFields: FormField[] = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'time', label: 'Time', type: 'text', placeholder: 'e.g., 10:00 AM - 2:00 PM' },
    { key: 'location', label: 'Location', type: 'text' },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'academic', label: 'Academic' },
        { value: 'sports', label: 'Sports' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'admission', label: 'Admission' },
        { value: 'other', label: 'Other' }
      ]
    },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'featured', label: 'Featured Event', type: 'checkbox' },
    { key: 'registrationRequired', label: 'Registration Required', type: 'checkbox' },
    { key: 'registrationUrl', label: 'Registration URL', type: 'url' }
  ]

  const columns: Column<EventDocument>[] = [
    {
      key: 'title',
      label: 'Title',
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
          {item.description && (
            <div className="text-xs text-gray-500 truncate mt-1">{item.description}</div>
          )}
        </div>
      )
    },
    {
      key: 'date',
      label: 'Date',
      render: (item) => (
        <div>
          <div className="text-sm text-gray-900">{formatDate(item.date)}</div>
          {item.time && <div className="text-xs text-gray-500">{item.time}</div>}
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      render: (item) => <span className="text-sm text-gray-600">{item.location || 'N/A'}</span>
    },
    {
      key: 'category',
      label: 'Category',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-green-100 text-primary-green-800">
          {item.category}
        </span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
            <p className="text-gray-600">Manage school events and activities</p>
          </div>
          <Link href="/admin/events/new">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus size={20} />
              Create Event
            </Button>
          </Link>
        </div>

        <DataTable
          data={events}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search events by title, description, location..."
          searchKeys={['title', 'description', 'location']}
          loading={loading}
          emptyMessage="No events found. Create your first event to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
          }}
          onSave={handleSave}
          data={editingEvent}
          fields={eventFields}
          title="Edit Event"
          loading={loading}
        />
      </div>
    </div>
  )
}
