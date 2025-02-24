'use client' // Add this directive at the top

import React, { useEffect, useState } from 'react'

const AboutPage = () => {
  const [showSection, setShowSection] = useState(false)

  useEffect(() => {
    setShowSection(true)
  }, [])

  return (
    <main className='about-page bg-gradient-to-r from-blue-50 to-teal-100 py-16 px-6'>
      {/* Hero Section */}
      <section className='hero bg-cover bg-center relative h-[80vh] text-white flex items-center justify-center overflow-hidden'>
        {/* Background Image */}
        <div className='absolute inset-0 bg-[url(/assets/images/ihsb.png)] bg-cover bg-center bg-no-repeat'></div>

        {/* Overlay with Vibrant Gradient */}
        <div className='absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-teal-900 opacity-75'></div>

        {/* Content */}
        <div className='z-10 text-center px-6'>
          <h1 className='text-5xl sm:text-6xl font-extrabold leading-tight tracking-wide text-teal-200 animate__animated animate__fadeIn animate__delay-1s'>
            Welcome to International Hope School Bangladesh
          </h1>
          <p className='mt-4 text-lg sm:text-xl text-teal-100 animate__animated animate__fadeIn animate__delay-2s'>
            Inspiring Future Leaders with Excellence and Compassion
          </p>
          <p className='mt-6 text-xl sm:text-2xl text-teal-50 max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-3s'>
            At International Hope School Bangladesh, we are dedicated to
            nurturing young minds in an environment of academic excellence,
            creativity, and ethical growth. Our committed teachers and holistic
            approach empower students to excel in both their studies and
            personal development. Join us on a journey of exploration,
            innovation, and values-driven education.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        className={`mission-vision mt-5 mb-20 ${
          showSection ? 'animate__animated animate__fadeInUp' : ''
        }`}
      >
        <div className='section-header text-center mb-10'>
          <h2 className='text-3xl font-extrabold text-teal-700 hover:text-teal-500'>
            Mission & Vision of IHSB
          </h2>
        </div>
        <div className='section-content text-lg text-gray-700 max-w-4xl mx-auto'>
          <p className='mb-6'>
            Our experienced teachers and management aim to impart education of
            the highest standard. Our goal is not solely to achieve academic
            excellence but to foster well-rounded graduates who are ready to
            face the challenges of the 21st century.
          </p>
          <p>
            Our students are encouraged to engage wholeheartedly in any activity
            they choose, be it in science, business, the humanities, or family
            life, with strong moral values.
          </p>
        </div>
      </section>

      {/* Why IHSB Section */}
      <section
        className={`why-ihsb mb-20 ${
          showSection ? 'animate__animated animate__fadeInUp' : ''
        }`}
      >
        <div className='section-header text-center mb-8'>
          <h2 className='text-3xl font-extrabold text-teal-700 hover:text-teal-500'>
            Why Choose IHSB?
          </h2>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-lg text-gray-700 max-w-6xl mx-auto'>
          <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <h3 className='text-xl font-semibold text-teal-600'>
              Build Confidence
            </h3>
            <p className='mt-4'>
              We focus on reinforcing self-esteem and the confidence of students
              to overcome life's challenges.
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <h3 className='text-xl font-semibold text-teal-600'>
              Fostering Respect
            </h3>
            <p className='mt-4'>
              We encourage mutual respect and understanding in an environment
              conducive to both academic and moral development.
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <h3 className='text-xl font-semibold text-teal-600'>
              Academic Excellence
            </h3>
            <p className='mt-4'>
              We provide a diverse and reliable curriculum designed to ensure
              academic success in a global context.
            </p>
          </div>
        </div>
      </section>

      {/* Chairman's Message Section */}
      <section
        className={`chairman-message ${
          showSection ? 'animate__animated animate__fadeInLeft' : ''
        } mb-20`}
      >
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-teal-50'>
          <img
            src='/assets/images/chairman.png'
            alt='Chairman'
            className='w-40 h-40 rounded-full object-cover border-4 border-teal-600 shadow-lg transform transition-all duration-300 hover:scale-110'
          />
          <div className='text-center md:text-left max-w-2xl'>
            <h3 className='text-2xl font-semibold text-teal-600'>
              Message from the Chairman
            </h3>
            <p className='mt-6 text-lg text-gray-700'>
              A great school is where wisdom shines, and a teacher is the
              guiding light. We strive to create such an environment to nurture
              young minds and shape future leaders.
            </p>
            <p className='font-semibold'>Timothy Doland Fisher</p>
            <p>Chairman, International Hope School Bangladesh</p>
          </div>
        </div>
      </section>

      {/* Principal's Message Section */}
      <section
        className={`principal-message ${
          showSection ? 'animate__animated animate__slideInRight' : ''
        } mb-20`}
      >
        <div className='flex flex-col md:flex-row justify-center items-center gap-10 bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-teal-50'>
          <img
            src='/assets/images/principal.png'
            alt='Principal'
            className='w-40 h-40 rounded-full object-cover border-4 border-teal-600 shadow-lg transform transition-all duration-300 hover:scale-110'
          />
          <div className='text-center md:text-left max-w-2xl'>
            <h3 className='text-2xl font-semibold text-teal-600'>
              Message from the Principal
            </h3>
            <p className='mt-6 text-lg text-gray-700'>
              We aim to cultivate lifelong learners who are not only
              academically proficient but also ready to contribute to society in
              meaningful ways.
            </p>
            <p className='mt-6 text-lg text-gray-700'>
              Our community of students, parents, and faculty come together to
              create a supportive environment for growth and success.
            </p>
            <div className='mt-6 text-lg text-gray-700'>
              <p className='font-semibold'>Roksana Zarin</p>
              <p>Principal, International Hope School Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section
        className={`images ${
          showSection ? 'animate__animated animate__fadeIn' : ''
        } mb-20`}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          <img
            src='/assets/images/ihsb.png'
            alt='International Hope School'
            className='rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'
          />
          <img
            src='/assets/images/teachers.png'
            alt='IHSB Team'
            className='rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'
          />
          <img
            src='/assets/images/teachers.png'
            alt='IHSB Students'
            className='rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl'
          />
        </div>
      </section>
    </main>
  )
}

export default AboutPage
