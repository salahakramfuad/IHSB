'use client'

import React from 'react'

const GulshanPrimaryMiddleSection = () => {
  const campusImages = [
    '/images/campus1.jpg',
    '/images/campus2.jpg',
    '/images/campus3.jpg',
    '/images/campus4.jpg',
    '/images/campus5.jpg',
    '/images/campus6.jpg'
  ]

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='bg-blue-600 text-white py-8 shadow-md'>
        <div className='container mx-auto px-6 text-center'>
          <h1 className='text-4xl font-bold'>
            Gulshan Primary & Middle Section
          </h1>
          <p className='text-lg mt-2'>
            House: 9, Road: 111, Gulshan-2, Dhaka-1212
          </p>
          <p className='text-lg'>Tel: +880 2 222284242, +88 01791715556</p>
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
            The early years are crucial for children’s holistic development. A
            quality pre and primary-school education provides children with
            opportunities to build self-confidence, learn social skills, and
            develop learning dispositions. These build a strong foundation for
            children’s future learning.
          </p>
        </section>

        {/* Our Aim Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4'>Our Aim</h2>
          <p className='text-gray-700 text-justify leading-relaxed'>
            The School provides a caring, stimulating environment where your
            child will be given the time and opportunity to develop his/her
            physical, intellectual, emotional, and social skills. Our
            well-trained, confident teachers deliver the curriculum in ways that
            foster a child's uniqueness and individuality as they work towards
            common goals. Children are encouraged to become independent learners
            and to discover that learning is fun through structured and
            spontaneous activities.
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

        {/* Contact Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4'>
            Contact Us
          </h2>
          <p className='text-gray-700'>
            Address: House: 9, Road: 111, Gulshan-2, Dhaka-1212
          </p>
          <p className='text-gray-700'>
            Tel: +880 2 222284242, +88 01791715556
          </p>
        </section>

        {/* Google Map Section */}
        <section className='container mx-auto px-4 sm:px-6 lg:px-8 mt-12'>
          <h2 className='text-2xl font-semibold text-center mb-6 text-blue-600'>
            Gulshan Primary & Middle Section Location
          </h2>
          <div className='rounded-lg overflow-hidden shadow-lg'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.7964749134976!2d90.41484727539148!3d23.79026077864317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c701d7d26cdb%3A0xdfc79709eafbc5df!2sInternational%20Hope%20School%20Bangladesh%20Gulshan%20Branch!5e0!3m2!1sen!2sbd!4v1738794555096!5m2!1sen!2sbd'
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

export default GulshanPrimaryMiddleSection
