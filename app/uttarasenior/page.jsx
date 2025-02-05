'use client'
import React, { useState } from 'react'

const images = [
  'https://via.placeholder.com/600x400?text=Classroom',
  'https://via.placeholder.com/600x400?text=Library',
  'https://via.placeholder.com/600x400?text=Sports+Ground',
  'https://via.placeholder.com/600x400?text=Computer+Lab',
  'https://via.placeholder.com/600x400?text=Auditorium',
  'https://via.placeholder.com/600x400?text=Gymnasium',
  'https://via.placeholder.com/600x400?text=Garden',
  'https://via.placeholder.com/600x400?text=Playground'
]

const facilities = [
  {
    name: 'Indoor sports hall, football field, volleyball and basketball courts',
    image: 'https://via.placeholder.com/600x400?text=Sports+Facilities'
  },
  {
    name: 'Mini golf and tennis courts',
    image: 'https://via.placeholder.com/600x400?text=Golf+and+Tennis'
  },
  {
    name: 'Table tennis facilities and a fitness center',
    image: 'https://via.placeholder.com/600x400?text=Fitness+Center'
  },
  {
    name: '550-seated auditorium and 130-bedded hostel',
    image: 'https://via.placeholder.com/600x400?text=Auditorium+and+Hostel'
  },
  {
    name: 'Smart boards and multimedia systems',
    image: 'https://via.placeholder.com/600x400?text=Smart+Boards'
  }
]

const curriculum = [
  {
    level: 'Cambridge IGCSE Curriculum',
    subjects: [
      'Accounting (0452)',
      'Biology (0610)',
      'Business Studies(0450)',
      'Chemistry (0620)',
      'Information and Communication Technology (0417)',
      'Economics (0455)',
      'English as First language (0500)',
      'English as a second language (0510)',
      'Mathematics  (0580)',
      'Additional Mathematics (0606)',
      'Physics(0625)',
      'World Literature(0408)',
      'Computer Science (0478)'
    ]
  },
  {
    level: 'Cambridge O level Curriculum',
    subjects: ['Bengali (3204)']
  },
  {
    level: 'Pearson-Edexcel A Levels',
    subjects: [
      'Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)',
      'Further Mathematics',
      'Chemistry',
      'Physics',
      'Biology',
      'Accounting',
      'Business Studies',
      'Economics'
    ]
  }
]

const UttaraSeniorSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('IGCSE') // Add activeTab state

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <header className='bg-blue-600 text-white py-8 shadow-md'>
        <div className='container mx-auto px-6 text-center'>
          <h1 className='text-4xl font-bold animate-bounce'>
            Uttara Senior Section
          </h1>
          <p className='text-lg mt-2 animate-fade-in'>
            Plot: 7, Road: 6, Sector: 4, Uttara, Dhaka-1230
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-6 py-10'>
        {/* About Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4 animate-fade-in-up'>
            About Us
          </h2>
          <p className='text-gray-700 text-justify leading-relaxed animate-fade-in'>
            International Hope School Bangladesh is one of the flourishing
            educational institutions of Bangladesh. In its Senior Section
            Building there is an indoor stadium, a gymnasium, physics,
            chemistry, biology labs, a library, a 550-seated auditorium, a
            130-bedded hostel, and lots of classrooms. Just right beside the
            Junior Section, Senior Section of IHSB is a beautiful building with
            a massive playground and eye-catching gardens. The interiors of the
            building are extraordinarily befitting for any idealistic
            international standard school. It has the most up-to-date
            educational equipment including smart boards, modern science
            laboratories, multimedia systems, enormous auditorium, and playrooms
            for young learners, a rich library, meeting rooms, art and music
            rooms, and other facilities. All the rooms are air-conditioned and
            also have wide windows to let enough light and air in.
          </p>
        </section>

        {/* Curriculum Section */}
        <section className='bg-gray-100 py-10 relative z-10'>
          <div className='container mx-auto px-6 text-center'>
            <h2 className='text-3xl font-semibold text-blue-600 mb-6'>
              IHSB Senior Section Curriculum
            </h2>

            {/* Tabs for Curriculum Selection */}
            <div className='mb-8 flex justify-center gap-6 relative z-10'>
              <button
                className={`px-6 py-3 font-semibold text-lg border-b-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  activeTab === 'IGCSE'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent'
                }`}
                onClick={() => toggleTab('IGCSE')}
              >
                IGCSE
              </button>
              <button
                className={`px-6 py-3 font-semibold text-lg border-b-4 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  activeTab === 'A Levels'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent'
                }`}
                onClick={() => toggleTab('A Levels')}
              >
                A Levels
              </button>
            </div>

            {/* Content for IGCSE */}
            {activeTab === 'IGCSE' && (
              <div className='animate__animated animate__fadeIn'>
                <p className='text-gray-700 text-justify mb-4'>
                  INTERNATIONAL HOPE SCHOOL BANGLADESH (IHSB) offers Cambridge
                  IGCSE curriculum for a variety of subjects. Students can
                  choose from a minimum of six to a maximum of eleven subjects,
                  with additional classes provided to address scheduling
                  conflicts.
                </p>
                <ul className='list-disc text-left mx-auto max-w-xl text-gray-700'>
                  <li>Accounting (0452)</li>
                  <li>Biology (0610)</li>
                  <li>Business Studies (0450)</li>
                  <li>Chemistry (0620)</li>
                  <li>Information and Communication Technology (0417)</li>
                  <li>Economics (0455)</li>
                  <li>English as First Language (0500)</li>
                  <li>English as a Second Language (0510)</li>
                  <li>Mathematics (0580)</li>
                  <li>Additional Mathematics (0606)</li>
                  <li>Physics (0625)</li>
                  <li>World Literature (0408)</li>
                  <li>Computer Science (0478)</li>
                </ul>
              </div>
            )}

            {/* Content for A Levels */}
            {activeTab === 'A Levels' && (
              <div className='animate__animated animate__fadeIn'>
                <p className='text-gray-700 text-justify mb-4'>
                  IHSB offers Pearson-Edexcel A Levels and plans to commence
                  Cambridge AS & A Levels soon. Students are supported through
                  structured activities, university application guidance, and
                  personalized subject selection.
                </p>
                <ul className='list-disc text-left mx-auto max-w-xl text-gray-700'>
                  <li>Mathematics (P1, P2, P3, P4, M1, S1, M2, S2)</li>
                  <li>Further Mathematics</li>
                  <li>Chemistry</li>
                  <li>Physics</li>
                  <li>Biology</li>
                  <li>Accounting</li>
                  <li>Business Studies</li>
                  <li>Economics</li>
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Facilities Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4 animate-fade-in-left'>
            Facilities
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-right'>
            {facilities.map((facility, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-lg overflow-hidden'
              >
                <img
                  src={facility.image}
                  alt={facility.name}
                  className='w-full h-40 object-cover'
                />
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {facility.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className='mb-10'>
          <h2 className='text-3xl font-semibold text-blue-600 mb-4 animate-fade-in'>
            Gallery
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {images.map((src, index) => (
              <div
                key={index}
                className='cursor-pointer group relative'
                onClick={() => {
                  setPhotoIndex(index)
                  setIsOpen(true)
                }}
              >
                <img
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  className='rounded-lg shadow-md transform transition-transform group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span className='text-white font-semibold'>View Image</span>
                </div>
              </div>
            ))}
          </div>

          {isOpen && (
            <div
              className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'
              onClick={() => setIsOpen(false)}
            >
              <button
                className='absolute top-4 right-4 text-white text-3xl'
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
              <img
                src={images[photoIndex]}
                alt={`Gallery Image ${photoIndex + 1}`}
                className='max-w-4xl max-h-screen object-contain'
              />
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default UttaraSeniorSection
