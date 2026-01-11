'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'

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
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  // Parse value to get selected date - memoize to prevent re-renders
  const selectedDate = useMemo(() => {
    if (!value) return null
    const date = new Date(value)
    return isNaN(date.getTime()) ? null : date
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Set current month to selected date or today - only when opening
      if (selectedDate) {
        setCurrentMonth(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
      } else {
        const today = new Date()
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen]) // Only depend on isOpen, not selectedDate

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1))
  }

  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Check if date is selected
  const isSelected = (date: Date) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  // Check if date is disabled
  const isDisabled = (date: Date) => {
    if (min) {
      const minDate = new Date(min)
      minDate.setHours(0, 0, 0, 0)
      if (date < minDate) return true
    }
    if (max) {
      const maxDate = new Date(max)
      maxDate.setHours(23, 59, 59, 999)
      if (date > maxDate) return true
    }
    return false
  }

  // Handle date selection
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    
    if (isDisabled(newDate)) return

    // Format date based on type
    if (type === 'datetime-local') {
      const hours = selectedDate ? selectedDate.getHours() : new Date().getHours()
      const minutes = selectedDate ? selectedDate.getMinutes() : new Date().getMinutes()
      newDate.setHours(hours, minutes, 0, 0)
      const year = newDate.getFullYear()
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const dayStr = String(newDate.getDate()).padStart(2, '0')
      const hoursStr = String(hours).padStart(2, '0')
      const minutesStr = String(minutes).padStart(2, '0')
      onChange(`${year}-${month}-${dayStr}T${hoursStr}:${minutesStr}`)
    } else {
      const year = newDate.getFullYear()
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const dayStr = String(newDate.getDate()).padStart(2, '0')
      onChange(`${year}-${month}-${dayStr}`)
    }
    
    // Close for date type, keep open for datetime-local to allow time selection
    if (type === 'date') {
      setIsOpen(false)
    }
  }

  // Format display date
  const formatDisplayDate = (dateString?: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      
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

  // Get time values for datetime-local
  const getTimeValue = () => {
    if (!selectedDate || isNaN(selectedDate.getTime())) {
      const now = new Date()
      return {
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0')
      }
    }
    return {
      hours: String(selectedDate.getHours()).padStart(2, '0'),
      minutes: String(selectedDate.getMinutes()).padStart(2, '0')
    }
  }

  const handleTimeChange = (hours: string, minutes: string) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) {
      const today = new Date()
      today.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      onChange(`${year}-${month}-${day}T${hours}:${minutes}`)
    } else {
      const newDate = new Date(selectedDate)
      newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
      const year = newDate.getFullYear()
      const month = String(newDate.getMonth() + 1).padStart(2, '0')
      const day = String(newDate.getDate()).padStart(2, '0')
      onChange(`${year}-${month}-${day}T${hours}:${minutes}`)
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days: (number | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-2.5 border border-gray-300 rounded-lg
            focus-within:ring-2 focus-within:ring-primary-green-500 focus-within:border-transparent
            cursor-pointer bg-white text-left
            flex items-center justify-between
            hover:border-primary-green-400 transition-all duration-200
            shadow-sm hover:shadow-md
            ${isOpen ? 'ring-2 ring-primary-green-500 border-primary-green-500' : ''}
          `}
        >
          <span className={value ? 'text-gray-900 font-medium' : 'text-gray-500'}>
            {value ? formatDisplayDate(value) : `Select ${label.toLowerCase()}`}
          </span>
          <div className="flex items-center gap-2">
            {value && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear date"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
            <Calendar className="text-gray-400" size={20} />
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-[fadeIn_0.2s_ease-out,slideDown_0.2s_ease-out]">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-primary-green-50 to-accent-blue-50 border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-700" />
                </button>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="p-1.5 hover:bg-white/60 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} className="text-gray-700" />
                </button>
              </div>
              <button
                type="button"
                onClick={goToToday}
                className="text-xs text-primary-green-600 hover:text-primary-green-700 font-medium"
              >
                Go to Today
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Names Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-xs font-semibold text-gray-500 text-center py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />
                  }

                  const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  const disabled = isDisabled(date)
                  const isSelectedDay = isSelected(date)
                  const isTodayDay = isToday(date)

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      disabled={disabled}
                      className={`
                        aspect-square rounded-lg text-sm font-medium transition-all duration-150
                        flex items-center justify-center
                        ${disabled
                          ? 'text-gray-300 cursor-not-allowed'
                          : isSelectedDay
                          ? 'bg-primary-green-600 text-white shadow-md scale-105'
                          : isTodayDay
                          ? 'bg-primary-green-50 text-primary-green-700 font-semibold ring-2 ring-primary-green-200'
                          : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                        }
                      `}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Picker for datetime-local */}
            {type === 'datetime-local' && (
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Time:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={getTimeValue().hours}
                      onChange={(e) => {
                        const hours = e.target.value.padStart(2, '0')
                        handleTimeChange(hours, getTimeValue().minutes)
                      }}
                      className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={getTimeValue().minutes}
                      onChange={(e) => {
                        const minutes = e.target.value.padStart(2, '0')
                        handleTimeChange(getTimeValue().hours, minutes)
                      }}
                      className="w-16 px-2 py-1.5 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-primary-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange('')
                  setIsOpen(false)
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm bg-primary-green-600 text-white rounded-lg hover:bg-primary-green-700 font-medium transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
