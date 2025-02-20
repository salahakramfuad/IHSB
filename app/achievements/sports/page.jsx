import React from 'react'

const Achievements = () => {
  const achievements = [
    {
      title: 'IHSB SUPER CUP',
      description:
        'IHSB SUPER CUP was held in March 2019. It was a successful event with the help of all the volunteers and teachers. In this tournament, our U-19 boys team became champions, U-14 boys team became runners-up, and our girls team became unbeaten champions. In the U-19 category, Ariful Amin became the top scorer, and Ahosanul Karim was selected as the player of the tournament.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    },
    {
      title: 'SUNBEAMS SUPER CUP',
      description:
        'SUNBEAMS SUPER CUP was organized by Sunbeams School from 25th to 27th March. Unfortunately, none of our teams were able to lift the "Champion" trophy. However, the U-16 boys and girls teams became runners-up in their respective categories, and their great efforts were noticeable.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    },
    {
      title: 'Great Achievement by One of Our Students',
      description:
        'A few of our girl footballers participated in the Bangamata U-19 Women’s International Gold Cup on 12th April 2019. Elif from Grade 8 was selected for the best 11 squad among all the players around Bangladesh.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    },
    {
      title: 'SJWS CUP 2019',
      description:
        'SJWS CUP 2019 was organized by Sir John Wilson School for the first time on 19th and 20th October. Our school participated in 3 categories: U-16 Boys, U-19 Boys, and Girls. The U-16 boys were unbeaten champions. Our goalkeeper, Rejoan Ahmed, was awarded top scorer and best goalkeeper at the same time, and Sanik was awarded best defender. Our girls team became runners-up, with Nalan Zehra Carpan (Grade 12) awarded best player and Sumeyra (Grade 9) awarded best goalkeeper.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    },
    {
      title: 'AGA KHAN INTER SCHOOL FOOTBALL TOURNAMENT',
      description:
        'The AGA KHAN INTER SCHOOL FOOTBALL TOURNAMENT was organized in November 2018 from the 8th to the 11th. Our U-19 boys team and girls team participated in this tournament. Our girls team became champions, and Nalan Zehra Carpan was awarded best player.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    },
    {
      title: 'DPS INTER SCHOOL BASKETBALL TOURNAMENT',
      description:
        'The DPS INTER SCHOOL BASKETBALL TOURNAMENT was organized from 8th to 10th November 2018. This was the only tournament our girls basketball team participated in outside our school, where they came out as runners-up.',
      image: '/assets/images/ihsb.jpg' // Corrected path
    }
  ]

  return (
    <div className='bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <header className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4'>
            Celebrating Our Achievements
          </h1>
          <p className='text-lg md:text-xl text-gray-700'>
            Honoring the hard work and success of our students in various
            tournaments and competitions.
          </p>
        </header>

        {/* Achievements Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden transform hover:-translate-y-2 transition-transform duration-300'
            >
              {/* Image Section */}
              <div className='relative h-48 w-full'>
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-black bg-opacity-30 flex items-end p-4'>
                  <h2 className='text-xl font-bold text-white'>
                    {achievement.title}
                  </h2>
                </div>
              </div>

              {/* Content Section */}
              <div className='p-6 space-y-4'>
                <p className='text-gray-700'>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achievements
