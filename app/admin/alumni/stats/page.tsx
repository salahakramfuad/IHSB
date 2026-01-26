'use client'

import { useEffect, useState } from 'react'
import { AlumniYearStatsDocument } from '@/lib/database/alumni'
import { RefreshCw, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import DataTable, { Column } from '@/components/admin/DataTable'
import EditModal, { FormField } from '@/components/admin/EditModal'

export default function AlumniStatsPage() {
  const [stats, setStats] = useState<AlumniYearStatsDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [recalculating, setRecalculating] = useState(false)
  const [editingStat, setEditingStat] = useState<AlumniYearStatsDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { fetchAuthenticatedData } = await import('@/lib/utils/api')
      const data = await fetchAuthenticatedData<{ stats: AlumniYearStatsDocument[] }>('/api/alumni/stats')
      setStats(data.stats || [])
    } catch (error) {
      console.error('Error fetching alumni stats:', error)
      setStats([])
    } finally {
      setLoading(false)
    }
  }

  const handleRecalculateAll = async () => {
    if (!confirm('This will recalculate all year statistics from featured alumni. Continue?')) {
      return
    }

    setRecalculating(true)
    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch('/api/alumni/stats', {
        method: 'POST',
        body: JSON.stringify({ recalculate: true })
      })

      if (!response.ok) {
        throw new Error('Failed to recalculate statistics')
      }

      await fetchStats()
      alert('Statistics recalculated successfully!')
    } catch (error: any) {
      alert(error.message || 'Failed to recalculate statistics')
    } finally {
      setRecalculating(false)
    }
  }

  const handleRecalculateYear = async (year: string) => {
    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/alumni/stats/${year}`, {
        method: 'PUT',
        body: JSON.stringify({ recalculate: true })
      })

      if (!response.ok) {
        throw new Error('Failed to recalculate year statistics')
      }

      await fetchStats()
    } catch (error: any) {
      alert(error.message || 'Failed to recalculate year statistics')
    }
  }

  const handleEdit = (stat: AlumniYearStatsDocument) => {
    setEditingStat(stat)
    setIsModalOpen(true)
  }

  const handleSave = async (data: Partial<AlumniYearStatsDocument>) => {
    if (!editingStat?.year) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/alumni/stats/${editingStat.year}`, {
        method: 'PUT',
        body: JSON.stringify({
          count: data.count,
          autoCalculated: false // Manual edit disables auto-calculation
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update year statistics')
      }

      await fetchStats()
      setIsModalOpen(false)
      setEditingStat(null)
    } catch (error) {
      console.error('Error updating year statistics:', error)
      throw error
    }
  }

  const handleDelete = async (stat: AlumniYearStatsDocument) => {
    if (!stat.id || !stat.year) return

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch(`/api/alumni/stats/${stat.year}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await fetchStats()
      } else {
        throw new Error('Failed to delete year statistics')
      }
    } catch (error) {
      console.error('Error deleting year statistics:', error)
      throw error
    }
  }

  const handleAddNew = () => {
    setEditingStat({
      year: '',
      count: '',
      autoCalculated: false
    } as AlumniYearStatsDocument)
    setIsModalOpen(true)
  }

  const handleSaveNew = async (data: Partial<AlumniYearStatsDocument>) => {
    if (!data.year || !data.count) {
      throw new Error('Year and count are required')
    }

    try {
      const { authenticatedFetch } = await import('@/lib/utils/api')
      const response = await authenticatedFetch('/api/alumni/stats', {
        method: 'POST',
        body: JSON.stringify({
          year: String(data.year),
          count: String(data.count),
          autoCalculated: data.autoCalculated !== undefined ? data.autoCalculated : false
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create year statistics')
      }

      await fetchStats()
      setIsModalOpen(false)
      setEditingStat(null)
    } catch (error) {
      console.error('Error creating year statistics:', error)
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
      return 'N/A'
    } catch {
      return 'N/A'
    }
  }

  const statFields: FormField[] = [
    { key: 'year', label: 'Year', type: 'text', required: true, placeholder: 'e.g., 2023' },
    { key: 'count', label: 'Count', type: 'text', required: true, placeholder: 'e.g., 500+' },
    { key: 'autoCalculated', label: 'Auto-Calculated', type: 'checkbox' }
  ]

  const columns: Column<AlumniYearStatsDocument>[] = [
    {
      key: 'year',
      label: 'Year',
      render: (item) => (
        <span className="text-lg font-semibold text-gray-900">{item.year}</span>
      )
    },
    {
      key: 'count',
      label: 'Count',
      render: (item) => (
        <span className="text-lg font-bold text-primary-green-600">{item.count}</span>
      )
    },
    {
      key: 'autoCalculated',
      label: 'Auto-Calculated',
      render: (item) => (
        item.autoCalculated ? (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Yes
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Manual
          </span>
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Alumni Year Statistics</h1>
            <p className="text-gray-600">Manage alumni statistics by graduation year</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRecalculateAll}
              disabled={recalculating}
              className="flex items-center gap-2"
            >
              <RefreshCw size={20} className={recalculating ? 'animate-spin' : ''} />
              {recalculating ? 'Recalculating...' : 'Recalculate All'}
            </Button>
            <Button
              variant="primary"
              onClick={handleAddNew}
              className="flex items-center gap-2"
            >
              <Plus size={20} />
              Add Year
            </Button>
          </div>
        </div>

        <DataTable
          data={stats}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          searchable={true}
          searchPlaceholder="Search by year..."
          searchKeys={['year', 'count']}
          loading={loading}
          emptyMessage="No year statistics found. Add your first year or recalculate from featured alumni."
          getItemId={(item) => item.id || item.year || ''}
        />

        {/* Add Recalculate Year action to table rows */}
        {stats.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            <p>Tip: Click "Edit" on a row to manually update the count, or use the recalculate function to auto-calculate from featured alumni.</p>
          </div>
        )}

        <EditModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingStat(null)
          }}
          onSave={editingStat?.id ? handleSave : handleSaveNew}
          data={editingStat}
          fields={statFields}
          title={editingStat?.id ? 'Edit Year Statistics' : 'Add Year Statistics'}
          loading={loading}
        />
      </div>
    </div>
  )
}
