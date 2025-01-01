'use client'
import React, { useEffect } from 'react'
import AOS from 'aos'

import 'aos/dist/aos.css'

const HomePage = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className='bg-gray-100 w-full'>
      {/* Hero Section */}
      <section
        className='bg-accent-gradient text-white h-screen flex flex-col justify-center items-center text-center'
        data-aos='fade-up'
      >
        <h2 className='text-5xl font-bold mb-4 text-center'>
          Welcome to Our School
        </h2>
        <p className='text-xl mb-8'>Where learning meets excellence</p>
        <a
          href='#about'
          className='bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition duration-300'
          data-aos='zoom-in'
        >
          Learn More
        </a>
      </section>

      {/* Campus Life Section */}
      <section id='campus-life' className='bg-white py-16' data-aos='fade-up'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-4'>Campus Life</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='fade-up'
            >
              <h3 className='text-2xl font-semibold mb-2'>Classroom</h3>
              <p>
                Convenient student-teacher communication with small class sizes.
              </p>
            </div>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='fade-up'
            >
              <h3 className='text-2xl font-semibold mb-2'>Laboratories</h3>
              <p>Latest technology for practical learning experiences.</p>
            </div>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='fade-up'
            >
              <h3 className='text-2xl font-semibold mb-2'>Library</h3>
              <p>Our library supports the Cambridge and Edexcel curricula.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id='facilities' className='bg-gray-50 py-16' data-aos='fade-up'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-4'>Facilities</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='flip-left'
            >
              <h3 className='text-2xl font-semibold mb-2'>Auditorium</h3>
            </div>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='flip-left'
            >
              <h3 className='text-2xl font-semibold mb-2'>Football Field</h3>
            </div>
            <div
              className='bg-white p-6 rounded-lg shadow-lg'
              data-aos='flip-left'
            >
              <h3 className='text-2xl font-semibold mb-2'>Gymnasium</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section
        id='notice'
        className='bg-blue-600 text-white py-16'
        data-aos='fade-up'
      >
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-semibold mb-4'>Notice</h2>
          <p className='text-lg mb-8'>
            Admission for the 2024-2025 session is now open!
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage
