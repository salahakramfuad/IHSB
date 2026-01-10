'use client'

import { useState, useMemo } from 'react'
import { Edit, Trash2, ChevronUp, ChevronDown, Search, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export interface Column<T> {
  key: string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: string[]
  loading?: boolean
  emptyMessage?: string
  getItemId: (item: T) => string
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  searchable = true,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  loading = false,
  emptyMessage = 'No data available',
  getItemId
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm || searchKeys.length === 0) return data

    const term = searchTerm.toLowerCase()
    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key]
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(term)
      })
    )
  }, [data, searchTerm, searchKeys])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      // Handle null/undefined
      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      // Handle dates
      if (aValue instanceof Date || (typeof aValue === 'object' && 'seconds' in aValue)) {
        const aDate = aValue instanceof Date ? aValue : new Date(aValue.seconds * 1000)
        const bDate = bValue instanceof Date ? bValue : new Date(bValue.seconds * 1000)
        return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime()
      }

      // Handle strings
      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()

      if (sortDirection === 'asc') {
        return aStr.localeCompare(bStr)
      } else {
        return bStr.localeCompare(aStr)
      }
    })
  }, [filteredData, sortColumn, sortDirection])

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const handleDelete = async (item: T) => {
    if (!onDelete) return
    
    if (!confirm('Are you sure you want to delete this item?')) {
      return
    }

    const id = getItemId(item)
    setDeletingId(id)
    try {
      await onDelete(item)
    } finally {
      setDeletingId(null)
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

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Search Bar */}
      {searchable && searchKeys.length > 0 && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''
                  } ${column.className || ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable !== false && sortColumn === column.key && (
                      sortDirection === 'asc' ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((item) => {
                const itemId = getItemId(item)
                return (
                  <tr key={itemId} className="hover:bg-gray-50 transition-colors">
                    {columns.map((column) => (
                      <td key={column.key} className={`px-6 py-4 whitespace-nowrap text-sm ${column.className || ''}`}>
                        {column.render ? (
                          column.render(item)
                        ) : (
                          <span className="text-gray-900">
                            {item[column.key] !== null && item[column.key] !== undefined
                              ? String(item[column.key])
                              : 'N/A'}
                          </span>
                        )}
                      </td>
                    ))}
                    {(onEdit || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onEdit(item)}
                              className="flex items-center gap-1"
                            >
                              <Edit size={14} />
                              Edit
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(item)}
                              disabled={deletingId === itemId}
                              className="text-red-600 hover:text-red-700 hover:border-red-300 flex items-center gap-1"
                            >
                              {deletingId === itemId ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                              ) : (
                                <>
                                  <Trash2 size={14} />
                                  Delete
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Results Count */}
      {searchTerm && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-600">
          Showing {sortedData.length} of {data.length} results
        </div>
      )}
    </div>
  )
}
