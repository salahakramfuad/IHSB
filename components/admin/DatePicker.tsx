'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Calendar } from 'lucide-react'

interface DatePickerProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  min?: string
  max?: string
  type?: 'date' | 'datetime-local'
}

export default function DatePicker({
  value,
  onChange,
  label = 'Date',
  required = false,
  type = 'date',
  min,
  max
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      // Handle datetime-local format (YYYY-MM-DDTHH:mm) or ISO string
      let date: Date
      if (dateString.includes('T') && dateString.length === 16) {
        // datetime-local format
        date = new Date(dateString)
      } else {
        date = new Date(dateString)
      }
      
      if (isNaN(date.getTime())) return dateString // Return original if invalid
      
      if (type === 'date') {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } else {
        return date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    } catch {
      return dateString
    }
  }

  const getInputValue = () => {
    if (!value) return ''
    // If already in datetime-local format, return as is
    if (typeof value === 'string' && value.length === 16 && value.includes('T')) {
      return value
    }
    // Otherwise convert to datetime-local format
    try {
      const date = new Date(value)
      if (isNaN(date.getTime())) return ''
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      return `${year}-${month}-${day}T${hours}:${minutes}`
    } catch {
      return ''
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(false)
  }

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <div
          onClick={() => {
            setIsOpen(!isOpen)
            inputRef.current?.focus()
          }}
          className={`
            w-full px-4 py-2 border border-gray-300 rounded-lg
            focus-within:ring-2 focus-within:ring-primary-green-500 focus-within:border-transparent
            cursor-pointer bg-white
            flex items-center justify-between
            hover:border-primary-green-400 transition-colors
          `}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {value ? formatDisplayDate(value) : `Select ${label.toLowerCase()}`}
          </span>
          <Calendar className="text-gray-400" size={20} />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4">
            <input
              ref={inputRef}
              type={type}
              value={getInputValue()}
              onChange={handleDateChange}
              min={min}
              max={max}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
              autoFocus
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm bg-primary-green-600 text-white rounded-lg hover:bg-primary-green-700"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <input
        type="hidden"
        value={value || ''}
        onChange={() => {}}
      />
    </div>
  )
}
