'use client'

import React, { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'
import { format, startOfYear, addMonths, isSameDay, parseISO } from 'date-fns'

export default function CalendarPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null)

  // Sample academic events - replace with actual data
  const academicEvents = useMemo(() => {
    const events: Record<string, Array<{ title: string; color: string }>> = {}
    
    // Add some sample events
    const sampleEvents = [
      { date: '2025-01-15', title: 'School Reopens', color: 'bg-primary-green-500' },
      { date: '2025-02-20', title: 'Mid-term Exams', color: 'bg-accent-blue-500' },
      { date: '2025-03-26', title: 'Independence Day', color: 'bg-accent-orange-500' },
      { date: '2025-04-14', title: 'Bengali New Year', color: 'bg-accent-yellow-500' },
      { date: '2025-05-01', title: 'May Day', color: 'bg-accent-purple-500' },
      { date: '2025-06-15', title: 'Final Exams Begin', color: 'bg-red-500' },
      { date: '2025-07-01', title: 'Summer Break Starts', color: 'bg-accent-teal-500' }
    ]

    sampleEvents.forEach((event) => {
      if (!events[event.date]) {
        events[event.date] = []
      }
      events[event.date].push({ title: event.title, color: event.color })
    })

    return events
  }, [])

  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(currentYear, 0))
    return Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i))
  }, [currentYear])

  const getDaysInMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const days: (Date | null)[] = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i))
    }

    return days
  }

  const monthColors = [
    'from-accent-blue-500 to-accent-blue-600',
    'from-accent-pink-500 to-accent-pink-600',
    'from-primary-green-500 to-primary-green-600',
    'from-accent-yellow-500 to-accent-orange-500',
    'from-accent-purple-500 to-accent-purple-600',
    'from-accent-teal-500 to-cyan-600',
    'from-accent-blue-500 to-indigo-600',
    'from-accent-orange-500 to-red-500',
    'from-primary-green-500 to-emerald-600',
    'from-accent-purple-500 to-pink-600',
    'from-accent-yellow-500 to-amber-600',
    'from-accent-blue-500 to-primary-green-600'
  ]

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Academic Calendar'
          subtitle={`Academic Year ${currentYear} | Important dates, events, and holidays`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Academic Calendar' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-7xl mx-auto'>
          {/* Year Navigation */}
          <div className='flex justify-between items-center mb-8 bg-white rounded-xl p-6 shadow-lg border-2 border-primary-green-200'>
            <button
              onClick={() => setCurrentYear(currentYear - 1)}
              className='px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors'
            >
              ← {currentYear - 1}
            </button>
            <div className='text-center'>
              <h2 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-green-600 to-accent-blue-600 bg-clip-text text-transparent'>
                {currentYear}
              </h2>
              <p className='text-gray-600'>Academic Calendar</p>
            </div>
            <button
              onClick={() => setCurrentYear(currentYear + 1)}
              className='px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 transition-colors'
            >
              {currentYear + 1} →
            </button>
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {months.map((month, index) => {
              const days = getDaysInMonth(month)
              const monthKey = format(month, 'yyyy-MM')
              const today = new Date()

              return (
                <Card
                  key={index}
                  className='hover:shadow-xl transition-all duration-300 border-2 border-gray-200'
                >
                  <div
                    className={`h-2 bg-gradient-to-r ${monthColors[index]} rounded-t-xl -mx-6 -mt-6 mb-4`}
                  ></div>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-xl font-bold text-gray-900'>
                      {format(month, 'MMMM')}
                    </h3>
                    <span className='text-sm text-gray-500'>{format(month, 'yyyy')}</span>
                  </div>
                  <div className='grid grid-cols-7 gap-1 mb-2'>
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div
                        key={day}
                        className='text-center text-xs font-bold text-gray-600 py-1'
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className='grid grid-cols-7 gap-1'>
                    {days.map((date, i) => {
                      if (!date) {
                        return <div key={`empty-${i}`} className='aspect-square' />
                      }

                      const dateKey = format(date, 'yyyy-MM-dd')
                      const events = academicEvents[dateKey] || []
                      const isToday = isSameDay(date, today)
                      const isPast = date < today && !isToday

                      return (
                        <div
                          key={i}
                          className={`aspect-square flex flex-col items-center justify-start p-1 rounded cursor-pointer transition-all hover:bg-primary-green-50 ${
                            isToday
                              ? 'bg-primary-green-100 border-2 border-primary-green-500'
                              : isPast
                              ? 'opacity-60'
                              : ''
                          }`}
                          onClick={() => setSelectedMonth(month)}
                        >
                          <span
                            className={`text-xs font-medium ${
                              isToday
                                ? 'text-primary-green-700 font-bold'
                                : isPast
                                ? 'text-gray-400'
                                : 'text-gray-700'
                            }`}
                          >
                            {date.getDate()}
                          </span>
                          {events.length > 0 && (
                            <div className='flex gap-0.5 mt-0.5'>
                              {events.slice(0, 2).map((event, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1.5 h-1.5 rounded-full ${event.color}`}
                                  title={event.title}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {selectedMonth && format(selectedMonth, 'MMMM yyyy') === format(month, 'MMMM yyyy') && (
                    <div className='mt-4 pt-4 border-t border-gray-200'>
                      <h4 className='text-sm font-semibold text-gray-700 mb-2'>
                        Events this month:
                      </h4>
                      <ul className='space-y-1'>
                        {Object.entries(academicEvents)
                          .filter(([date]) => date.startsWith(monthKey))
                          .map(([date, eventList]) => (
                            <li key={date} className='text-xs text-gray-600'>
                              <span className='font-medium'>{format(parseISO(date), 'MMM d')}:</span>{' '}
                              {eventList.map((e) => e.title).join(', ')}
                            </li>
                          ))}
                        {Object.entries(academicEvents).filter(([date]) =>
                          date.startsWith(monthKey)
                        ).length === 0 && (
                          <li className='text-xs text-gray-500 italic'>No events scheduled</li>
                        )}
                      </ul>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Legend */}
          <Card className='mt-8 bg-gradient-to-br from-gray-50 to-white border-2 border-primary-green-200'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <h3 className='text-xl font-bold text-gray-900 mb-4'>Legend</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {[
                { label: 'Today', color: 'bg-primary-green-100 border-primary-green-500' },
                { label: 'School Events', color: 'bg-primary-green-500' },
                { label: 'Examinations', color: 'bg-accent-blue-500' },
                { label: 'Holidays', color: 'bg-accent-orange-500' }
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <div className={`w-4 h-4 rounded ${item.color} border-2`}></div>
                  <span className='text-sm text-gray-700'>{item.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
