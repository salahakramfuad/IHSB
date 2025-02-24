// components/Clubs.js
'use client'
import React from 'react'

const Clubs = () => {
  // List of clubs with associated icons
  const clubs = [
    { name: 'Art Club', icon: '🎨' },
    { name: 'Book Club', icon: '📚' },
    { name: 'Chess Club', icon: '♟️' },
    { name: 'Cultural Club', icon: '🌍' },
    { name: 'Cooking Club', icon: '🍳' },
    { name: 'Dance Club', icon: '💃' },
    { name: 'Debate Club', icon: '🗣️' },
    { name: 'Drama Club', icon: '🎭' },
    { name: 'French Club', icon: '🇫🇷' },
    { name: 'Guidance Club', icon: '🎓' },
    { name: 'Karate Club', icon: '🥋' },
    { name: 'Library Club', icon: '🏛️' },
    { name: 'Maths Club', icon: '➗' },
    { name: 'Music Club', icon: '🎵' },
    { name: 'Programming Club', icon: '💻' },
    { name: 'Robotics Club', icon: '🤖' },
    { name: "Rubik's Cube Club", icon: '🟥' },
    { name: 'Science Club', icon: '🔬' },
    { name: 'Sewing & Craft Club', icon: '🧵' },
    { name: 'Speakers Club', icon: '🎙️' },
    { name: 'Tidiness Club', icon: '🧹' },
    { name: 'Guitar Club', icon: '🎸' },
    { name: 'Table Tennis Club', icon: '🏓' },
    { name: 'Badminton Club', icon: '🏸' },
    { name: 'Football Club', icon: '⚽' },
    { name: 'Basketball Club', icon: '🏀' }
  ]

  return (
    <div className='bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-blue-900 mb-4'>
            Clubs of International Hope School
          </h1>
          <p className='text-xl text-gray-700'>
            Explore your passions and join a club that inspires you!
          </p>
        </header>

        <div className='mb-12 text-gray-700 space-y-4'>
          <p>
            IHSB Clubs offer fun, learning, and personal growth. They impact
            behavior, attendance, and achievement, fostering a sense of
            belonging and confidence.
          </p>
          <p>
            Students engage in various teams and clubs, requiring commitment and
            enthusiasm. These activities are rewarding and vital to school life,
            encouraging student involvement and ideas.
          </p>
          <p>
            Our goal is to provide co-curricular opportunities for all
            interested students.
          </p>
          <p>
            We offer clubs in sports, art, dance, and more to inspire active
            participation. Our aims include:
          </p>
          <ul className='list-disc list-inside pl-5'>
            <li>Utilizing school facilities more effectively.</li>
            <li>Promoting healthy, active lifestyles among students.</li>
          </ul>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {clubs.map((club, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md p-4 flex items-center space-x-4 hover:bg-green-300 hover:shadow-lg transition-shadow duration-300'
            >
              <div className='text-3xl'>{club.icon}</div>
              <div className='text-gray-800 font-medium'>{club.name}</div>
            </div>
          ))}
        </div>
        {/* Footer Note */}
        <p className='text-center text-gray-600 mt-8 text-sm'>
          * Clubs may vary from one branch to another.
        </p>
      </div>
    </div>
  )
}

export default Clubs
