'use client'

const EventsPage = () => {
  return (
    <main className='bg-gray-100 min-h-screen py-10'>
      {/* Header Section */}
      <section className='text-center bg-blue-600 text-white py-8 px-4'>
        <h1 className='text-4xl font-bold'>Upcoming Events</h1>
        <p className='text-lg mt-2'>
          Stay updated with the latest happenings at International Hope School
          Bangladesh Hostel!
        </p>
      </section>

      {/* Event List Section */}
      <section className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-semibold mb-6'>Upcoming Events</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Sample Event Card */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'
            >
              <div className='overflow-hidden rounded-lg'>
                <img
                  src='/assets/images/event-placeholder.jpg'
                  alt='Event'
                  className='w-full h-40 object-cover rounded-lg'
                />
              </div>
              <h3 className='text-lg font-bold mt-4'>Event Title {i + 1}</h3>
              <p className='text-gray-600 text-sm mt-2'>
                Date: January 10, 2025 <br />
                Time: 10:00 AM - 2:00 PM
              </p>
              <p className='text-gray-700 mt-2'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                euismod, arcu ac facilisis.
              </p>
              <button className='bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700 transition'>
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className='bg-blue-600 text-white text-center py-4'>
        <p>
          &copy; 2024 International Hope School Bangladesh Hostel. All rights
          reserved.
        </p>
      </footer>
    </main>
  )
}

export default EventsPage
