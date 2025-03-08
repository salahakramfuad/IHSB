import React from 'react'

const AddressInformation = ({ register, errors }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Address Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Present Address Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='presentAddress'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Present Address <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='presentAddress'
            {...register('presentAddress')}
            rows='3'
            className={`mt-1 block w-full p-2 border ${
              errors.presentAddress ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure textarea is above other elements
          />
          {errors.presentAddress && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.presentAddress.message}
            </p>
          )}
        </div>

        {/* Permanent Address Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='permanentAddress'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Permanent Address <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='permanentAddress'
            {...register('permanentAddress')}
            rows='3'
            className={`mt-1 block w-full p-2 border ${
              errors.permanentAddress ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure textarea is above other elements
          />
          {errors.permanentAddress && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.permanentAddress.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AddressInformation
