'use client'
import { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'
import { FaSearch } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { motion, AnimatePresence } from 'framer-motion'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [tooltipContent, setTooltipContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Dummy country data
  const dummyCountryData = [
    {
      cca3: 'USA',
      name: { common: 'United States' },
      capital: ['Washington, D.C.'],
      population: 331002651,
      region: 'Americas',
      languages: { eng: 'English' },
      flags: { png: 'https://flagcdn.com/us.png' }
    },
    {
      cca3: 'CAN',
      name: { common: 'Canada' },
      capital: ['Ottawa'],
      population: 38005238,
      region: 'Americas',
      languages: { eng: 'English', fra: 'French' },
      flags: { png: 'https://flagcdn.com/ca.png' }
    },
    {
      cca3: 'GBR',
      name: { common: 'United Kingdom' },
      capital: ['London'],
      population: 67886011,
      region: 'Europe',
      languages: { eng: 'English' },
      flags: { png: 'https://flagcdn.com/gb.png' }
    },
    {
      cca3: 'IND',
      name: { common: 'India' },
      capital: ['New Delhi'],
      population: 1380004385,
      region: 'Asia',
      languages: { hin: 'Hindi', eng: 'English' },
      flags: { png: 'https://flagcdn.com/in.png' }
    },
    {
      cca3: 'AUS',
      name: { common: 'Australia' },
      capital: ['Canberra'],
      population: 25499884,
      region: 'Oceania',
      languages: { eng: 'English' },
      flags: { png: 'https://flagcdn.com/au.png' }
    }
  ]

  const handleCountryClick = (geo) => {
    const country = dummyCountryData.find(
      (c) => c.cca3 === geo.properties.ISO_A3
    )
    setSelectedCountry(country)
  }

  const filteredCountries = dummyCountryData.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Search Bar */}
        <div className='mb-6 relative'>
          <div className='flex items-center bg-white rounded-lg shadow-md p-3'>
            <FaSearch className='text-gray-400 mr-3' />
            <input
              type='text'
              placeholder='Search countries...'
              className='w-full outline-none'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Map and Details Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Map Section */}
          <div className='lg:col-span-2 bg-white rounded-lg shadow-md p-4'>
            <ComposableMap data-tip='' projectionConfig={{ scale: 147 }}>
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          setTooltipContent(geo.properties.name)
                        }}
                        onMouseLeave={() => {
                          setTooltipContent('')
                        }}
                        onClick={() => handleCountryClick(geo)}
                        style={{
                          default: {
                            fill: '#D6D6DA',
                            outline: 'none'
                          },
                          hover: {
                            fill: '#A5D6A7',
                            outline: 'none'
                          },
                          pressed: {
                            fill: '#2E7D32',
                            outline: 'none'
                          }
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip>{tooltipContent}</ReactTooltip>
          </div>

          {/* Country Details Section */}
          <div className='bg-white rounded-lg shadow-md p-4'>
            <AnimatePresence>
              {selectedCountry ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='space-y-4'
                >
                  <div className='flex items-center justify-between'>
                    <h2 className='text-2xl font-bold'>
                      {selectedCountry.name.common}
                    </h2>
                    <img
                      src={selectedCountry.flags.png}
                      alt={`${selectedCountry.name.common} flag`}
                      className='w-12 h-8 object-cover rounded'
                    />
                  </div>
                  <div className='space-y-2'>
                    <p>
                      <span className='font-semibold'>Capital:</span>{' '}
                      {selectedCountry.capital?.[0] || 'N/A'}
                    </p>
                    <p>
                      <span className='font-semibold'>Population:</span>{' '}
                      {selectedCountry.population.toLocaleString()}
                    </p>
                    <p>
                      <span className='font-semibold'>Region:</span>{' '}
                      {selectedCountry.region}
                    </p>
                    <p>
                      <span className='font-semibold'>Languages:</span>{' '}
                      {Object.values(selectedCountry.languages || {}).join(
                        ', '
                      ) || 'N/A'}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className='text-center text-gray-500'>
                  <p>Select a country on the map to view details</p>
                </div>
              )}
            </AnimatePresence>

            {/* Search Results */}
            {searchQuery && (
              <div className='mt-4'>
                <h3 className='font-semibold mb-2'>Search Results:</h3>
                <div className='max-h-60 overflow-y-auto'>
                  {filteredCountries.map((country) => (
                    <button
                      key={country.cca3}
                      onClick={() => setSelectedCountry(country)}
                      className='w-full text-left p-2 hover:bg-gray-100 rounded'
                    >
                      {country.name.common}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorldMap
