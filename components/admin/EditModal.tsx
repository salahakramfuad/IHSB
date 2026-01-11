'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'
import ImageUpload from './ImageUpload'
import DatePicker from './DatePicker'
import MultiImageUpload from './MultiImageUpload'

export interface FormField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'datetime' | 'checkbox' | 'image' | 'images' | 'url'
  required?: boolean
  options?: { value: string; label: string }[]
  placeholder?: string
  rows?: number
}

interface EditModalProps<T> {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Partial<T>) => Promise<void>
  data: T | null
  fields: FormField[]
  title: string
  loading?: boolean
}

export default function EditModal<T extends Record<string, any>>({
  isOpen,
  onClose,
  onSave,
  data,
  fields,
  title,
  loading = false
}: EditModalProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>({})
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data && isOpen) {
      // Initialize form data with existing data
      const initialData: any = {}
      fields.forEach((field) => {
        if (data[field.key] !== undefined && data[field.key] !== null) {
          // Handle date fields
          if (field.type === 'date' || field.type === 'datetime') {
            const dateValue = data[field.key]
            if (dateValue) {
              try {
                let date: Date
                if (dateValue instanceof Date) {
                  date = dateValue
                } else if (typeof dateValue === 'object' && 'seconds' in dateValue) {
                  date = new Date(dateValue.seconds * 1000)
                } else if (typeof dateValue === 'string') {
                  date = new Date(dateValue)
                } else {
                  return
                }
                
                if (!isNaN(date.getTime())) {
                  let formattedDate: string
                  if (field.type === 'date') {
                    formattedDate = date.toISOString().split('T')[0]
                  } else {
                    // datetime-local format: YYYY-MM-DDTHH:mm
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    const hours = String(date.getHours()).padStart(2, '0')
                    const minutes = String(date.getMinutes()).padStart(2, '0')
                    formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`
                  }
                  (initialData as any)[field.key] = formattedDate
                }
              } catch {
                // Skip invalid dates
              }
            }
          } else {
            (initialData as any)[field.key] = data[field.key]
          }
        } else if (field.type === 'checkbox') {
          initialData[field.key] = false as any
        }
      })
      setFormData(initialData)
      setError('')
    } else if (!data && isOpen) {
      // Reset form for new item
      setFormData({})
      setError('')
    }
  }, [data, isOpen, fields])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      // Validate required fields
      for (const field of fields) {
        if (field.required && !formData[field.key]) {
          throw new Error(`${field.label} is required`)
        }
      }

      // Prepare data for API
      const submitData: any = { ...formData }

      // Convert date strings to proper format
      fields.forEach((field) => {
        if ((field.type === 'date' || field.type === 'datetime') && submitData[field.key]) {
          const dateValue = submitData[field.key] as string
          if (dateValue) {
            try {
              // Convert to ISO string for API
              const date = new Date(dateValue)
              if (!isNaN(date.getTime())) {
                submitData[field.key] = date.toISOString() as any
              }
            } catch {
              // Skip invalid dates
            }
          }
        }
      })

      await onSave(submitData)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleFieldChange = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => {
              // Conditionally show registrationUrl only when registrationRequired is true
              if (field.key === 'registrationUrl' && !formData['registrationRequired']) {
                return null
              }
              
              return (
                <div
                  key={field.key}
                  className={field.type === 'textarea' || field.type === 'image' || field.type === 'images' ? 'md:col-span-2' : ''}
                >
                {field.type === 'textarea' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <textarea
                      required={field.required}
                      rows={field.rows || 4}
                      value={(formData[field.key] as string) || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    />
                  </div>
                ) : field.type === 'select' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <select
                      required={field.required}
                      value={(formData[field.key] as string) || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : field.type === 'date' || field.type === 'datetime' ? (
                  <DatePicker
                    value={(formData[field.key] as string) || ''}
                    onChange={(value) => handleFieldChange(field.key, value)}
                    label={field.label}
                    required={field.required}
                    type={field.type === 'datetime' ? 'datetime-local' : 'date'}
                  />
                ) : field.type === 'checkbox' ? (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(formData[field.key] as boolean) || false}
                      onChange={(e) => handleFieldChange(field.key, e.target.checked)}
                      className="rounded border-gray-300 text-primary-green-600 focus:ring-primary-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                  </label>
                ) : field.type === 'image' ? (
                  <ImageUpload
                    value={(formData[field.key] as string) || ''}
                    onChange={(url) => handleFieldChange(field.key, url)}
                    label={field.label}
                    required={field.required}
                  />
                ) : field.type === 'images' ? (
                  <MultiImageUpload
                    value={(formData[field.key] as string[]) || []}
                    onChange={(urls) => handleFieldChange(field.key, urls)}
                    label={field.label}
                    required={field.required}
                  />
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={(formData[field.key] as string) || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <Button
              type="submit"
              variant="primary"
              disabled={saving || loading}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
