import React, { useState } from 'react'

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    guardianName: '',
    contactNumber: ''
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
    // Add form submission logic here huuhuhuhuhu
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto p-4 bg-white shadow-md rounded'
    >
      <div className='mb-4'>
        <label className='block text-gray-700'>Name:</label>
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='w-full px-3 py-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Age:</label>
        <input
          type='number'
          name='age'
          value={formData.age}
          onChange={handleChange}
          required
          className='w-full px-3 py-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Grade:</label>
        <input
          type='text'
          name='grade'
          value={formData.grade}
          onChange={handleChange}
          required
          className='w-full px-3 py-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Guardian's Name:</label>
        <input
          type='text'
          name='guardianName'
          value={formData.guardianName}
          onChange={handleChange}
          required
          className='w-full px-3 py-2 border rounded'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Contact Number:</label>
        <input
          type='text'
          name='contactNumber'
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className='w-full px-3 py-2 border rounded'
        />
      </div>
      <button
        type='submit'
        className='w-full bg-blue-500 text-white py-2 rounded'
      >
        Submit
      </button>
    </form>
  )
}

export default AdmissionForm
