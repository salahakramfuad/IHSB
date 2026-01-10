'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Event } from '@/data/events'
import { Trash2, Edit, Plus, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'
import Image from 'next/image'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      const data = await response.json()
      setEvents(data.events || [])
    } catch (error) {
      // Silently handle error
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return
    }

    setDeleting(id)
    try {
      const token = await getAuthToken()
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setEvents(events.filter(e => e.id !== id))
      } else {
        alert('Failed to delete event')
      }
    } catch (error) {
      alert('Failed to delete event. Please try again.')
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
          <p className="mt-4 text-gray-600">Loading events...</p>
        </div>
      </div>
    )
  }

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

          {events.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first event</p>
              <Link href="/admin/events/new">
                <Button variant="primary">Create Event</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {event.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary-green-600">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      {event.featured && (
                        <span className="text-xs bg-accent-yellow-100 text-accent-yellow-800 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/events/${event.id}`}
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
                        onClick={() => handleDelete(event.id!)}
                        disabled={deleting === event.id}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        {deleting === event.id ? (
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
