// components/ExtraCurricularActivities.js
import React from 'react'

const ExtraCurricularActivities = () => {
  const activities = [
    {
      category: '🎭 Cultural',
      items: [
        '💃 Dance competitions',
        '🎉 Cultural functions',
        '🎭 Drama and talent shows',
        '🎤 Singing contests',
        '🌍 International culture festivals',
        '📜 Poetry competitions',
        '🎬 Bangla movie day',
        '🇧🇩 Bangla week',
        '🇬🇧 English week'
      ]
    },
    {
      category: '📚 Academic',
      items: [
        '✍️ Handwriting competitions',
        '📝 Essay competitions',
        '🗣️ Debate competitions',
        '🐝 Spelling bee',
        '🇧🇩 Bangla olympiad',
        '🧮 Maths olympiad',
        '🌐 International olympiads',
        '📖 Reading competitions',
        '📚 Book Fair'
      ]
    },
    {
      category: '⚽ Sports',
      items: [
        '🏓 Table tennis tournaments',
        '🏸 Badminton tournaments',
        '⚽ Football matches',
        '🏀 Basketball games',
        '🏐 Volleyball matches',
        '🏃‍♂️ Athletics competitions'
      ]
    },
    {
      category: '🚌 Field Trips',
      items: [
        '🏛️ Visiting museums',
        '🎢 Visiting amusement parks',
        '🏭 Visiting factories',
        '👧 Kids day out',
        '🧺 Picnics',
        '🎨 Hosting or visiting exhibitions'
      ]
    },
    {
      category: '🎉 Special Events',
      items: [
        '🎶 Kazi Nazrul Islam day',
        '🎪 Kids shows',
        "👩‍👧 Mother's Day special quiz shows",
        '🍲 Traditional food days',
        '🎪 Fun shows',
        '🔬 Science fairs',
        "🎈 Children's festival",
        '👨‍💼 Profession / career days',
        '🍳 Cooking',
        '👨‍👩‍👧 Kids-and-mothers / kids-and-fathers days',
        '👵 Grandparent’s day'
      ]
    },
    {
      category: '🎨 Creative',
      items: ['🪁 Kite making', '🎨 Art competitions']
    }
  ]

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-4'>
            Extra-Curricular Activities
          </h1>
          <p className='text-xl text-gray-700'>
            Complementing academic performance and refining social skills
            through diverse activities.
          </p>
        </header>

        {/* Activities Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {activities.map((activity, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <div className='p-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2'>
                  {activity.category}
                </h2>
                <ul className='list-disc list-inside text-gray-600 space-y-2'>
                  {activity.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExtraCurricularActivities
