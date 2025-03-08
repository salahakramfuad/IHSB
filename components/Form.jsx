'use client'

import { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-green-300 rounded-lg shadow-md p-6 z-30'
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Name:
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Email:
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            Message:
          </label>
          <textarea
            name='message'
            value={formData.message}
            onChange={handleChange}
            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            rows='4'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
