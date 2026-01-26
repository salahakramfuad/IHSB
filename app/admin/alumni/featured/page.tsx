'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FeaturedAlumniDocument } from '@/lib/database/alumni'
import { Plus, GraduationCap } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function FeaturedAlumniPage() {
  const [alumni, setAlumni] = useState<FeaturedAlumniDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAlumni, setEditingAlumni] = useState<FeaturedAlumniDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const { fetchAuthenticatedData } = await import('@/lib/utils/api')
      const data = await fetchAuthenticatedData<{ alumni: FeaturedAlumniDocument[] }>('/api/alumni/featured')
      setAlumni(data.alumni || [])
    } catch (error) {
      console.error('Error fetching featured alumni:', error)
      setAlumni([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (alumniItem: FeaturedAlumniDocument) => {
    setEditingAlumni(alumniItem)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<FeaturedAlumniDocument>) => {
    if (!editingAlumni?.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/alumni/featured/${editingAlumni.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update featured alumni')
      }

      await fetchAlumni()
      setIsModalOpen(false)
      setEditingAlumni(null)
    } catch (error) {
      console.error('Error updating featured alumni:', error)
      throw error
    }
  }

  const handleDelete = async (alumniItem: FeaturedAlumniDocument) => {
    if (!alumniItem.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/alumni/featured/${alumniItem.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchAlumni()
      } else {
        throw new Error('Failed to delete featured alumni')
      }
    } catch (error) {
      console.error('Error deleting featured alumni:', error)
      throw error
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

  const alumniFields: FormField[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'description', label: 'Description (Job Title/Role)', type: 'text', required: true },
    { key: 'achievement', label: 'Achievement', type: 'text', required: true, placeholder: 'e.g., Graduated 2015' },
    { key: 'graduationYear', label: 'Graduation Year', type: 'text', required: true, placeholder: 'e.g., 2015' },
    { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
    { key: 'email', label: 'Email', type: 'text', placeholder: 'Optional' },
    { key: 'linkedin', label: 'LinkedIn URL', type: 'url', placeholder: 'Optional' },
    { key: 'company', label: 'Company', type: 'text', placeholder: 'Optional' },
    { key: 'location', label: 'Location', type: 'text', placeholder: 'Optional' },
    { key: 'featured', label: 'Featured', type: 'checkbox' }
  ]

  const columns: Column<FeaturedAlumniDocument>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (item) => (
        <div className="font-medium text-gray-900">{item.name}</div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.description}</span>
      )
    },
    {
      key: 'company',
      label: 'Company',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.company || 'N/A'}</span>
      )
    },
    {
      key: 'graduationYear',
      label: 'Graduation Year',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.graduationYear}</span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Alumni</h1>
            <p className="text-gray-600">Manage featured alumni profiles</p>
          </div>
          <Link href="/admin/alumni/featured/new">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus size={20} />
              Add Alumni
            </Button>
          </Link>
        </div>

        <DataTable
          data={alumni}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search alumni by name, description, company..."
          searchKeys={['name', 'description', 'company', 'achievement']}
          loading={loading}
          emptyMessage="No featured alumni found. Add your first alumni profile to get started."
          getItemId={(item) => item.id || ''}
        />

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingAlumni(null)
          }}
          onSave={handleSave}
          data={editingAlumni}
          fields={alumniFields}
          title="Edit Featured Alumni"
          loading={loading}
        />
      </div>
    </div>
  )
}
