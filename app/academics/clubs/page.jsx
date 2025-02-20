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

        {/* Description */}
        <div className='mb-12 text-gray-700 space-y-4'>
          <p>
            Working closely with friends, having fun, and learning new things
            about yourself, your peers, community, and the world can all happen
            in IHSB Clubs. Our clubs have a significant impact on many
            whole-school priorities such as behavior, attendance, and
            attainment. IHSB Clubs also provide a means of developing a sense of
            belonging, confidence, and competence in young people that can
            translate to other aspects of school life and priorities, such as
            special educational needs.
          </p>
          <p>
            Int’l Hope School Bangladesh students participate in a variety of
            teams and clubs during the school year. Involvement in these
            activities does require a time commitment and enthusiasm,
            nevertheless, they are a very rewarding and important part of school
            life at IHSB. All students are encouraged to make a difference to
            the school with their ideas and their involvement. The running of
            any club or activity is contingent upon student interest.
          </p>
          <p>
            Our purpose is to provide co-curricular organizations and activities
            to permit all interested students an opportunity to participate.
          </p>
          <p>
            There are numerous clubs that focus on sports, art, dance, and other
            areas to attract active young people and inspire them to participate
            in a range of alternative clubs. We aim to:
          </p>
          <ul className='list-disc list-inside pl-5'>
            <li>Make use of underutilized school facilities more.</li>
            <li>
              Change the attitudes of different-aged pupils towards being
              healthy and active in their everyday lives.
            </li>
          </ul>
        </div>

        {/* Clubs Grid */}
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
