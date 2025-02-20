'use client'
import { useState, useEffect, useMemo } from 'react'
import {
  format,
  startOfYear,
  addMonths,
  isSameDay,
  parseISO,
  isValid
} from 'date-fns'
import {
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaEdit,
  FaPlus
} from 'react-icons/fa'

const YearlyCalendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [events, setEvents] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    category: 'default',
    color: '#4F46E5'
  })

  useEffect(() => {
    const storedEvents = localStorage.getItem('calendarEvents')
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events))
  }, [events])

  const months = useMemo(() => {
    const yearStart = startOfYear(new Date(currentYear, 0))
    return Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i))
  }, [currentYear])

  const getDaysInMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const days = []

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i))
    }

    return days
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setEventForm({
      title: '',
      description: '',
      startTime: '',
      endTime: '',
      category: 'default',
      color: '#4F46E5'
    })
    setShowEventModal(true)
  }

  const handleEventSubmit = (e) => {
    e.preventDefault()
    if (!eventForm.title || !eventForm.startTime || !eventForm.endTime) {
      alert('Please fill in all required fields')
      return
    }

    const newEvent = {
      ...eventForm,
      date: selectedDate,
      id: selectedEvent ? selectedEvent.id : Date.now()
    }

    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id ? newEvent : event
        )
      )
    } else {
      setEvents([...events, newEvent])
    }

    setShowEventModal(false)
  }

  const handleEventDelete = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setShowEventModal(false)
  }

  const EventModal = () => (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4'>
          {selectedEvent ? 'Edit Event' : 'Add New Event'}
        </h2>
        <form onSubmit={handleEventSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Title</label>
            <input
              type='text'
              value={eventForm.title}
              onChange={(e) =>
                setEventForm({ ...eventForm, title: e.target.value })
              }
              className='w-full border rounded px-3 py-2'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Description</label>
            <textarea
              value={eventForm.description}
              onChange={(e) =>
                setEventForm({ ...eventForm, description: e.target.value })
              }
              className='w-full border rounded px-3 py-2'
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-gray-700 mb-2'>Start Time</label>
              <input
                type='time'
                value={eventForm.startTime}
                onChange={(e) =>
                  setEventForm({ ...eventForm, startTime: e.target.value })
                }
                className='w-full border rounded px-3 py-2'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 mb-2'>End Time</label>
              <input
                type='time'
                value={eventForm.endTime}
                onChange={(e) =>
                  setEventForm({ ...eventForm, endTime: e.target.value })
                }
                className='w-full border rounded px-3 py-2'
                required
              />
            </div>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Category</label>
            <select
              value={eventForm.category}
              onChange={(e) =>
                setEventForm({ ...eventForm, category: e.target.value })
              }
              className='w-full border rounded px-3 py-2'
            >
              <option value='default'>Default</option>
              <option value='meeting'>Meeting</option>
              <option value='personal'>Personal</option>
              <option value='holiday'>Holiday</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Color</label>
            <input
              type='color'
              value={eventForm.color}
              onChange={(e) =>
                setEventForm({ ...eventForm, color: e.target.value })
              }
              className='w-full'
            />
          </div>
          <div className='flex justify-end gap-2'>
            <button
              type='button'
              onClick={() => setShowEventModal(false)}
              className='px-4 py-2 bg-gray-200 rounded'
            >
              Cancel
            </button>
            {selectedEvent && (
              <button
                type='button'
                onClick={() => handleEventDelete(selectedEvent.id)}
                className='px-4 py-2 bg-red-500 text-white rounded'
              >
                Delete
              </button>
            )}
            <button
              type='submit'
              className='px-4 py-2 bg-indigo-600 text-white rounded'
            >
              {selectedEvent ? 'Update' : 'Add'} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold'>{currentYear} Calendar</h1>
        <div className='flex gap-4'>
          <button
            onClick={() => setCurrentYear(currentYear - 1)}
            className='p-2 rounded hover:bg-gray-100'
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setCurrentYear(currentYear + 1)}
            className='p-2 rounded hover:bg-gray-100'
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {months.map((month, index) => (
          <div key={index} className='border rounded-lg p-4 shadow-sm'>
            <h2 className='text-xl font-semibold mb-4'>
              {format(month, 'MMMM')}
            </h2>
            <div className='grid grid-cols-7 gap-1'>
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className='text-center text-sm font-medium'>
                  {day}
                </div>
              ))}
              {getDaysInMonth(month).map((date, i) => {
                if (!date) return <div key={`empty-${i}`} className='h-8' />

                const dayEvents = events.filter((event) =>
                  isSameDay(parseISO(event.date), date)
                )

                return (
                  <div
                    key={i}
                    onClick={() => handleDateClick(date.toISOString())}
                    className={`h-8 flex items-center justify-center relative cursor-pointer hover:bg-gray-100 rounded
                      ${isSameDay(date, new Date()) ? 'bg-indigo-100' : ''}
                    `}
                  >
                    <span className='text-sm'>{date.getDate()}</span>
                    {dayEvents.length > 0 && (
                      <div
                        className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full'
                        style={{ backgroundColor: dayEvents[0].color }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {showEventModal && <EventModal />}
    </div>
  )
}

export default YearlyCalendar
