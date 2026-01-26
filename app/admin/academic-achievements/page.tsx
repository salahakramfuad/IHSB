'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AcademicAchievementDocument } from '@/lib/database/academicAchievements'
import { Plus, GraduationCap } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function AcademicAchievementsPage() {
  const [achievements, setAchievements] = useState<AcademicAchievementDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAchievement, setEditingAchievement] = useState<AcademicAchievementDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const { fetchAuthenticatedData } = await import('@/lib/utils/api')
      const data = await fetchAuthenticatedData<{ achievements: AcademicAchievementDocument[] }>('/api/academic-achievements')
      setAchievements(data.achievements || [])
    } catch (error) {
      console.error('Error fetching academic achievements:', error)
      setAchievements([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (achievement: AcademicAchievementDocument) => {
    setEditingAchievement(achievement)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<AcademicAchievementDocument>) => {
    if (!editingAchievement?.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/academic-achievements/${editingAchievement.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error('Failed to update academic achievement')
      }

      await fetchAchievements()
      setIsModalOpen(false)
      setEditingAchievement(null)
    } catch (error) {
      console.error('Error updating academic achievement:', error)
      throw error
    }
  }

  const handleDelete = async (achievement: AcademicAchievementDocument) => {
    if (!achievement.id) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/academic-achievements/${achievement.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchAchievements()
      } else {
        throw new Error('Failed to delete academic achievement')
      }
    } catch (error) {
      console.error('Error deleting academic achievement:', error)
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

  const achievementFields: FormField[] = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'result', label: 'Result', type: 'text', required: true, placeholder: 'e.g., 6A* 2A' },
    { key: 'year', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2024' },
    {
      key: 'session',
      label: 'Session',
      type: 'select',
      required: true,
      options: [
        { value: 'O Level', label: 'O Level' },
        { value: 'AS Level', label: 'AS Level' },
        { value: 'A Level', label: 'A Level' }
      ]
    },
    { key: 'image', label: 'Image (Optional)', type: 'image' }
  ]

  const columns: Column<AcademicAchievementDocument>[] = [
    {
      key: 'name',
      label: 'Name',
      render: (item) => (
        <div className="font-medium text-gray-900">{item.name}</div>
      )
    },
    {
      key: 'result',
      label: 'Result',
      render: (item) => (
        <span className="text-sm text-gray-900 font-semibold">{item.result}</span>
      )
    },
    {
      key: 'year',
      label: 'Year',
      render: (item) => (
        <span className="text-sm text-gray-600">{item.year}</span>
      )
    },
    {
      key: 'session',
      label: 'Session',
      render: (item) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-green-100 text-primary-green-800">
          {item.session}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Achievements</h1>
            <p className="text-gray-600">Manage student academic achievements</p>
          </div>
          <Link href="/admin/academic-achievements/new">
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
          searchPlaceholder="Search achievements by name, result, year..."
          searchKeys={['name', 'result', 'year', 'session']}
          loading={loading}
          emptyMessage="No academic achievements found. Add your first achievement to get started."
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
          fields={achievementFields}
          title="Edit Academic Achievement"
          loading={loading}
        />
      </div>
    </div>
  )
}
