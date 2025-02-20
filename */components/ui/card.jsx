import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Card, CardContent } from '/*/components/ui/card'

const studentsData = {
  USA: [{ name: 'John Doe', age: 20, course: 'Computer Science' }],
  India: [{ name: 'Aarav Patel', age: 22, course: 'Engineering' }],
  Canada: [{ name: 'Emily Smith', age: 21, course: 'Mathematics' }]
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountryClick = (geo) => {
    const countryName = geo.properties.NAME
    if (studentsData[countryName]) {
      setSelectedCountry({
        name: countryName,
        students: studentsData[countryName]
      })
    } else {
      setSelectedCountry(null)
    }
  }

  return (
    <div className='flex flex-col items-center p-4'>
      hellya
      <ComposableMap className='w-full max-w-4xl'>
        <Geographies geography='https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleCountryClick(geo)}
                className='cursor-pointer'
                style={{
                  default: {
                    fill: studentsData[geo.properties.NAME]
                      ? '#4f46e5'
                      : '#e5e7eb',
                    outline: 'none'
                  },
                  hover: {
                    fill: '#6366f1',
                    outline: 'none'
                  },
                  pressed: {
                    fill: '#4338ca',
                    outline: 'none'
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {selectedCountry && (
        <Card className='mt-4 w-96 p-4 shadow-lg'>
          <CardContent>
            <h2 className='text-lg font-bold'>
              Students in {selectedCountry.name}
            </h2>
            <ul className='mt-2'>
              {selectedCountry.students.map((student, index) => (
                <li key={index} className='border-b py-2'>
                  <p className='text-sm'>Name: {student.name}</p>
                  <p className='text-sm'>Age: {student.age}</p>
                  <p className='text-sm'>Course: {student.course}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default WorldMap
