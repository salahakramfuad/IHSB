'use client'
import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

import { Card, CardContent } from '*/components/ui/card.jsx'

const students = [
  {
    name: 'John Doe',
    image: '/john.jpg',
    university: 'Harvard',
    country: 'USA'
  },
  {
    name: 'Alice Smith',
    image: '/alice.jpg',
    university: 'Oxford',
    country: 'UK'
  },
  {
    name: 'Liam Brown',
    image: '/liam.jpg',
    university: 'Toronto University',
    country: 'Canada'
  },
  {
    name: 'Sophia Wilson',
    image: '/sophia.jpg',
    university: 'Melbourne University',
    country: 'Australia'
  },
  {
    name: 'David Lee',
    image: '/david.jpg',
    university: 'National University of Singapore',
    country: 'Singapore'
  }
]

const countryCounts = students.reduce((acc, student) => {
  acc[student.country] = (acc[student.country] || 0) + 1
  return acc
}, {})

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountryClick = (geo) => {
    setSelectedCountry(geo.properties.NAME)
  }

  return (
    <div className='flex flex-col items-center p-5'>
      <h1 className='text-2xl font-bold mb-4'>Student Distribution Map</h1>
      <ComposableMap
        projectionConfig={{ scale: 150 }}
        className='w-full h-[500px]'
      >
        <Geographies geography='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.NAME
              const studentCount = countryCounts[countryName] || 0
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => handleCountryClick(geo)}
                  className='transition duration-200'
                  style={{
                    default: {
                      fill:
                        studentCount > 0
                          ? `rgba(34, 197, 94, ${0.3 + studentCount * 0.2})`
                          : '#D6D6DA',
                      stroke: '#FFF',
                      strokeWidth: 0.5
                    },
                    hover: { fill: '#6366F1' },
                    pressed: { fill: '#4F46E5' }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
      {selectedCountry && (
        <div className='mt-5 w-full max-w-lg'>
          <h2 className='text-xl font-semibold'>
            Students in {selectedCountry}
          </h2>
          {students.filter((s) => s.country === selectedCountry).length > 0 ? (
            students
              .filter((s) => s.country === selectedCountry)
              .map((student, index) => (
                <Card
                  key={index}
                  className='my-2 p-3 flex items-center border rounded-lg shadow'
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className='w-12 h-12 rounded-full mr-3'
                  />
                  <CardContent>
                    <p className='text-lg font-medium'>{student.name}</p>
                    <p className='text-sm text-gray-600'>
                      {student.university}
                    </p>
                  </CardContent>
                </Card>
              ))
          ) : (
            <p className='text-gray-500'>No students found in this country.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default WorldMap
