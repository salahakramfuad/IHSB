import React from 'react'

const SchoolInformation = ({ register, errors, control }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>School Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {/* Branch Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='branch'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Branch <span className='text-red-500'>*</span>
          </label>
          <select
            id='branch'
            {...register('branch')}
            className={`mt-1 block w-full p-2 border ${
              errors.branch ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer appearance-none bg-white`}
            style={{ zIndex: 20 }} // Ensure dropdown is above other elements
          >
            <option value=''>Select Branch</option>
            <option value='Branch A'>Branch A</option>
            <option value='Branch B'>Branch B</option>
          </select>
          {errors.branch && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.branch.message}
            </p>
          )}
        </div>

        {/* Academic Year Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='academicYear'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Academic Year <span className='text-red-500'>*</span>
          </label>
          <input
            id='academicYear'
            type='text'
            {...register('academicYear')}
            placeholder='e.g., 2023-2024'
            className={`mt-1 block w-full p-2 border ${
              errors.academicYear ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.academicYear && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.academicYear.message}
            </p>
          )}
        </div>

        {/* Application Number Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='applicationNumber'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Application Number <span className='text-red-500'>*</span>
          </label>
          <input
            id='applicationNumber'
            type='text'
            {...register('applicationNumber')}
            placeholder='e.g., APP123456'
            className={`mt-1 block w-full p-2 border ${
              errors.applicationNumber ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.applicationNumber && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.applicationNumber.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default SchoolInformation
