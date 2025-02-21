'use client'
import { useState } from 'react'

const AlumniComponent = () => {
  const alumniYearData = [
    { year: '2023', count: '500+' },
    { year: '2022', count: '450+' },
    { year: '2021', count: '400+' }
  ]

  const totalAlumni = alumniYearData.reduce((total, item) => {
    const numericCount = parseInt(item.count.replace('+', ''), 10)
    return total + numericCount
  }, 0)

  const highlightedAlumni = [
    {
      id: 1,
      name: 'John Doe',
      description: 'CEO at TechCorp',
      imageUrl: 'https://picsum.photos/seed/alumni1/150' // Alternative placeholder image
    },
    {
      id: 2,
      name: 'Jane Smith',
      description: 'Founder of InnovateX',
      imageUrl: 'https://picsum.photos/seed/alumni2/150' // Alternative placeholder image
    },
    {
      id: 3,
      name: 'Alex Johnson',
      description: 'Lead Engineer at FutureTech',
      imageUrl: 'https://picsum.photos/seed/alumni3/150' // Alternative placeholder image
    }
  ]

  const alumniStories = [
    {
      id: 1,
      title: 'My Journey After Graduation',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae nisi nec nisi tincidunt...',
      content:
        'Full article content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae nisi nec nisi tincidunt...',
      imageUrl: 'https://picsum.photos/seed/story1/300/200' // Alternative placeholder image
    },
    {
      id: 2,
      title: 'How My Alma Mater Shaped Me',
      excerpt:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae...',
      content:
        'Full article content goes here. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae...',
      imageUrl: 'https://picsum.photos/seed/story2/300/200' // Alternative placeholder image
    },
    {
      id: 3,
      title: 'From Campus to Corporate Life',
      excerpt:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...',
      content:
        'Full article content goes here. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...',
      imageUrl: 'https://picsum.photos/seed/story3/300/200' // Alternative placeholder image
    }
  ]

  // State to manage the currently selected story
  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <div className='bg-gray-100 min-h-screen py-12'>
      {/* Title Section */}
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Our Proud Alumni Network
          </h1>
          <p className='mt-2 text-lg text-gray-600'>
            Connecting past, present, and future generations.
          </p>
        </div>

        {/* Total Alumni Information */}
        <div className='mb-16 text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-4'>
            Total Alumni
          </h2>
          <p className='text-5xl font-bold text-blue-600'>{totalAlumni}+</p>
        </div>

        {/* Yearwise Alumni Data Section */}
        <div className='mb-16'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>
            Alumni Yearwise Statistics
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {alumniYearData.map((item, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-md p-6 text-center'
              >
                <h3 className='text-xl font-semibold text-gray-800'>
                  {item.year}
                </h3>
                <p className='text-2xl font-bold text-blue-600 mt-2'>
                  {item.count}
                </p>
                <p className='text-sm text-gray-600 mt-1'>Alumni</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Alumni Section */}
        <div className='mb-16'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>
            Featured Alumni
          </h2>
          <div className='flex flex-wrap justify-center gap-8'>
            {highlightedAlumni.map((alumni) => (
              <div key={alumni.id} className='text-center'>
                <img
                  src={alumni.imageUrl}
                  alt={alumni.name}
                  className='w-32 h-32 rounded-full object-cover mx-auto'
                />
                <h3 className='text-lg font-semibold text-gray-800 mt-4'>
                  {alumni.name}
                </h3>
                <p className='text-sm text-gray-600'>{alumni.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni Stories/Blogs Section */}
        <div>
          <h2 className='text-3xl font-semibold text-gray-800 mb-6 text-center'>
            Stories from Our Alumni
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {alumniStories.map((story) => (
              <div
                key={story.id}
                className='bg-white rounded-lg shadow-md overflow-hidden'
              >
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                    {story.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{story.excerpt}</p>
                  <button
                    onClick={() => setSelectedStory(story)}
                    className='text-blue-600 font-medium hover:underline focus:outline-none'
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Full Story */}
        {selectedStory && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg w-full max-w-2xl p-6 relative'>
              <button
                onClick={() => setSelectedStory(null)}
                className='absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                {selectedStory.title}
              </h2>
              <img
                src={selectedStory.imageUrl}
                alt={selectedStory.title}
                className='w-full h-64 object-cover mb-4'
              />
              <p className='text-gray-700'>{selectedStory.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlumniComponent
