'use client'
import { useEffect } from 'react'
import AOS from 'aos'
import Image from 'next/image'
import 'aos/dist/aos.css'

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true // Whether animation should happen only once
    })
  }, [])

  return (
    <div className='bg-gray-100 w-full'>
      {/* Hero Section */}
      <section className='relative text-green-400 font-extrabold font-serif h-screen flex flex-col justify-center items-center text-center overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0'>
          <Image
            src='/assets/images/ihsb.png'
            alt='Campus Background'
            layout='fill'
            objectFit='cover'
            priority // Ensure the hero image loads first
          />
        </div>
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/30'></div>
        {/* Content */}
        <div className='relative z-10'>
          <h2
            className='text-5xl md:text-6xl font-bold mb-4 text-center text-white'
            data-aos='fade-down'
          >
            Welcome to IHSB
          </h2>
          <p
            className='text-xl md:text-2xl text-yellow-50 mb-8'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            Where learning meets excellence
          </p>
          <a
            href='/about'
            className='bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition duration-300 bg-opacity-80 cursor-pointer hover:bg-opacity-95 relative z-10'
            data-aos='zoom-in'
            data-aos-delay='400'
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Campus Life Section */}
      <section id='campus-life' className='bg-white py-16' data-aos='fade-up'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-800 mb-8'>Campus Life</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Classroom Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='fade-up'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Classroom'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Classroom
              </h3>
              <p className='text-gray-600'>
                Convenient student-teacher communication with small class sizes.
              </p>
            </div>
            {/* Laboratories Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='fade-up'
              data-aos-delay='200'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Laboratories'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Laboratories
              </h3>
              <p className='text-gray-600'>
                Latest technology for practical learning experiences.
              </p>
            </div>
            {/* Library Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='fade-up'
              data-aos-delay='400'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Library'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Library
              </h3>
              <p className='text-gray-600'>
                Our library supports the Cambridge and Edexcel curricula.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id='facilities' className='bg-gray-50 py-16' data-aos='fade-up'>
        <div className='container mx-auto text-center'>
          <h2 className='text-4xl font-bold text-gray-800 mb-8'>Facilities</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Auditorium Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='flip-left'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Auditorium'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Auditorium
              </h3>
              <p className='text-gray-600'>
                A state-of-the-art auditorium for events and performances.
              </p>
            </div>
            {/* Football Field Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='flip-left'
              data-aos-delay='200'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Football Field'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Football Field
              </h3>
              <p className='text-gray-600'>
                A spacious football field for sports and recreational
                activities.
              </p>
            </div>
            {/* Gymnasium Card */}
            <div
              className='bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
              data-aos='flip-left'
              data-aos-delay='400'
            >
              <div className='w-full h-48 relative overflow-hidden rounded-t-lg mb-4'>
                <Image
                  src='/assets/images/students.png'
                  alt='Gymnasium'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
              <h3 className='text-2xl font-semibold text-gray-800 mb-2'>
                Gymnasium
              </h3>
              <p className='text-gray-600'>
                Fully equipped gymnasium for fitness enthusiasts.
              </p>
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
          <h2 className='text-4xl font-bold mb-4'>Notice</h2>
          <p className='text-lg mb-8'>
            Admission for the 2024-2025 session is now open!
          </p>
          <button
            className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300'
            data-aos='zoom-in'
          >
            Apply Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage
