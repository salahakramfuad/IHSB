'use client'

import React from 'react'

const UttaraPreschoolPrimary = () => {
  const campusImages = [
    '/images/uttara1.jpg',
    '/images/uttara2.jpg',
    '/images/uttara3.jpg',
    '/images/uttara4.jpg',
    '/images/uttara5.jpg',
    '/images/uttara6.jpg'
  ]

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='bg-blue-600 text-white py-8 shadow-md'>
        <div className='container mx-auto px-6 text-center'>
          <h1 className='text-4xl font-bold'>
            Uttara Preschool & Primary Section
          </h1>
          <p className='text-lg mt-2'>
            Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230
          </p>
          <p className='text-lg'>Tel: +880.2.48956999, 017 7596 6264</p>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-6 py-10'>
        {/* About Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4'>
            About Us
          </h2>
          <p className='text-gray-700 text-justify leading-relaxed'>
            Our preschool and primary section provide a nurturing and engaging
            learning environment where children develop cognitive, social, and
            emotional skills through innovative teaching and interactive
            experiences.
          </p>
        </section>

        {/* Our Aim Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4'>Our Aim</h2>
          <p className='text-gray-700 text-justify leading-relaxed'>
            We strive to foster a love for learning in a safe and inclusive
            atmosphere. Our dedicated teachers encourage curiosity, creativity,
            and confidence, preparing students for a bright academic journey.
          </p>
        </section>

        {/* Campus Life Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4'>
            Campus Life
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {campusImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Campus Life ${index + 1}`}
                className='w-full h-40 object-cover rounded-lg shadow-md'
              />
            ))}
          </div>
        </section>

        {/* Google Map Section */}
        <section className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
          <h2 className='text-2xl font-semibold text-center mb-6 text-blue-600'>
            Uttara Preschool & Primary Section Location
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
    </div>
  )
}

export default UttaraPreschoolPrimary
