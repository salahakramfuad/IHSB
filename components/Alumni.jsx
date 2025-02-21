import React from 'react'

const AlumniComponent = () => {
  // Sample data for yearwise alumni statistics
  const alumniYearData = [
    { year: '2023', count: '500+' },
    { year: '2022', count: '450+' },
    { year: '2021', count: '400+' }
  ]

  // Sample data for alumni stories/blogs
  const alumniStories = [
    {
      id: 1,
      title: 'My Journey After Graduation',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae nisi nec nisi tincidunt...',
      imageUrl: 'https://via.placeholder.com/400x200',
      link: '#'
    },
    {
      id: 2,
      title: 'How My Alma Mater Shaped Me',
      excerpt:
        'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae...',
      imageUrl: 'https://via.placeholder.com/400x200',
      link: '#'
    },
    {
      id: 3,
      title: 'From Campus to Corporate Life',
      excerpt:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque...',
      imageUrl: 'https://via.placeholder.com/400x200',
      link: '#'
    }
  ]

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
                  <a
                    href={story.link}
                    className='text-blue-600 font-medium hover:underline'
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlumniComponent
