'use client'

import React, { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' }) // Clear form
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <main className='bg-gray-50 min-h-screen py-12'>
      <section className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto text-center mb-12'>
          <h1 className='text-4xl font-bold text-teal-700 mb-4'>Contact Us</h1>
          <p className='text-lg text-gray-700'>
            We'd love to hear from you! Reach out to us using the information
            below or fill out the contact form.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='space-y-6'>
            <div>
              <h2 className='text-2xl font-semibold text-teal-600 mb-2'>
                International Hope School Bangladesh
              </h2>
              <p className='text-gray-700'>
                Plot: 7, Road: 6, Sector: 4 <br />
                Uttara, Dhaka-1230
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-teal-600 mb-2'>
                Phone Numbers
              </h3>
              <ul className='space-y-1 text-gray-700'>
                <li>Tel: +880.2.48956999, 48953722-3</li>
                <li>
                  Uttara Pre. & Pri. Front Office: +880.2.48956999, 017 7596
                  6264
                </li>
                <li>Uttara Pre. & Pri. Admission Office: 017 0605 4122</li>
                <li>Uttara Senior Section: +8801329685901, +8801329685902</li>
                <li>Gulshan Pre. & Pri.: +8801791715556</li>
                <li>Chattogram Branch: +8801772511783</li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-teal-600 mb-2'>Fax</h3>
              <p className='text-gray-700'>+880.2.48954242</p>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-teal-600 mb-2'>
                Email
              </h3>
              <ul className='space-y-1 text-gray-700'>
                <li>General Inquiry: info@ihsb.edu.bd</li>
                <li>Admission Inquiry: admission@ihsb.edu.bd</li>
              </ul>
            </div>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold text-teal-600 mb-4'>
              Send Us a Message
            </h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Full Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Your Name'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='your.email@example.com'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows='4'
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Write your message here...'
                  className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-300'
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Submit'}
              </button>
            </form>
            {status === 'success' && (
              <p className='text-green-600 mt-2 text-center'>
                Message sent successfully!
              </p>
            )}
            {status === 'error' && (
              <p className='text-red-600 mt-2 text-center'>
                Failed to send message. Try again later.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
        <h2 className='text-2xl font-semibold text-teal-600 text-center mb-6'>
          Our Location
        </h2>
        <div className='rounded-lg overflow-hidden shadow-lg'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.797609401391!2d90.39961447539362!3d23.861319578594895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c42256771bad%3A0x662d13081edbb710!2sInternational%20Hope%20School%20Bangladesh!5e0!3m2!1sen!2sbd!4v1738793777927!5m2!1sen!2sbd'
            width='100%'
            height='450'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
            title='Google Map Location'
          ></iframe>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
