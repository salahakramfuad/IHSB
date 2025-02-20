import React from 'react'

const AcademicAchievements = () => {
  // Sample data for students
  const students = {
    oLevel: [
      {
        name: 'John Doe',
        result: '6A* 2A',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'Jane Smith',
        result: '5A* 3A',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'Alice Johnson',
        result: '7A* 1A',
        image: '/assets/images/students.png' // Updated path
      }
    ],
    asLevel: [
      {
        name: 'Michael Brown',
        result: '3A 1B',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'Emily Davis',
        result: '4A',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'Daniel Wilson',
        result: '2A* 2A',
        image: '/assets/images/students.png' // Updated path
      }
    ],
    aLevel: [
      {
        name: 'Sophia Martinez',
        result: '4A*',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'James Anderson',
        result: '3A* 1A',
        image: '/assets/images/students.png' // Updated path
      },
      {
        name: 'Olivia Taylor',
        result: '2A* 2A',
        image: '/assets/images/students.png' // Updated path
      }
    ]
  }

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4'>
            Academic Achievements
          </h1>
          <p className='text-lg md:text-xl text-gray-700'>
            Celebrating the outstanding academic success of our students.
          </p>
        </header>

        {/* O Level Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center'>
            <span className='mr-2'>🎓</span> O Level Achievements
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {students.oLevel.map((student, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
              >
                <div className='relative h-48 w-full'>
                  <img
                    src={student.image}
                    alt={student.name}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-30 flex items-end p-4'>
                    <h3 className='text-xl font-bold text-white'>
                      {student.name}
                    </h3>
                  </div>
                </div>
                <div className='p-6'>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Result:</span>{' '}
                    {student.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AS Level Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center'>
            <span className='mr-2'>📚</span> AS Level Achievements
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {students.asLevel.map((student, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
              >
                <div className='relative h-48 w-full'>
                  <img
                    src={student.image}
                    alt={student.name}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-30 flex items-end p-4'>
                    <h3 className='text-xl font-bold text-white'>
                      {student.name}
                    </h3>
                  </div>
                </div>
                <div className='p-6'>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Result:</span>{' '}
                    {student.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* A Level Section */}
        <section className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-6 flex items-center'>
            <span className='mr-2'>🏆</span> A Level Achievements
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {students.aLevel.map((student, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
              >
                <div className='relative h-48 w-full'>
                  <img
                    src={student.image}
                    alt={student.name}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-30 flex items-end p-4'>
                    <h3 className='text-xl font-bold text-white'>
                      {student.name}
                    </h3>
                  </div>
                </div>
                <div className='p-6'>
                  <p className='text-gray-700'>
                    <span className='font-semibold'>Result:</span>{' '}
                    {student.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AcademicAchievements
