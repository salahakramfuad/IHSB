import React from 'react'

const ParentInformation = ({ register, errors }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Parent Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Father's Name Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='fatherName'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Father's Name <span className='text-red-500'>*</span>
          </label>
          <input
            id='fatherName'
            type='text'
            {...register('fatherName')}
            className={`mt-1 block w-full p-2 border ${
              errors.fatherName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.fatherName && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.fatherName.message}
            </p>
          )}
        </div>

        {/* Father's Occupation Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='fatherOccupation'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Father's Occupation
          </label>
          <input
            id='fatherOccupation'
            type='text'
            {...register('fatherOccupation')}
            className={`mt-1 block w-full p-2 border ${
              errors.fatherOccupation ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.fatherOccupation && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.fatherOccupation.message}
            </p>
          )}
        </div>

        {/* Father's Contact Number Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='fatherContact'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Father's Contact Number <span className='text-red-500'>*</span>
          </label>
          <input
            id='fatherContact'
            type='text'
            {...register('fatherContact')}
            className={`mt-1 block w-full p-2 border ${
              errors.fatherContact ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.fatherContact && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.fatherContact.message}
            </p>
          )}
        </div>

        {/* Father's Email Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='fatherEmail'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Father's Email
          </label>
          <input
            id='fatherEmail'
            type='email'
            {...register('fatherEmail')}
            className={`mt-1 block w-full p-2 border ${
              errors.fatherEmail ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.fatherEmail && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.fatherEmail.message}
            </p>
          )}
        </div>

        {/* Mother's Name Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='motherName'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Mother's Name
          </label>
          <input
            id='motherName'
            type='text'
            {...register('motherName')}
            className={`mt-1 block w-full p-2 border ${
              errors.motherName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.motherName && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.motherName.message}
            </p>
          )}
        </div>

        {/* Mother's Occupation Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='motherOccupation'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Mother's Occupation
          </label>
          <input
            id='motherOccupation'
            type='text'
            {...register('motherOccupation')}
            className={`mt-1 block w-full p-2 border ${
              errors.motherOccupation ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.motherOccupation && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.motherOccupation.message}
            </p>
          )}
        </div>

        {/* Mother's Contact Number Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='motherContact'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Mother's Contact Number
          </label>
          <input
            id='motherContact'
            type='text'
            {...register('motherContact')}
            className={`mt-1 block w-full p-2 border ${
              errors.motherContact ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.motherContact && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.motherContact.message}
            </p>
          )}
        </div>

        {/* Mother's Email Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='motherEmail'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Mother's Email
          </label>
          <input
            id='motherEmail'
            type='email'
            {...register('motherEmail')}
            className={`mt-1 block w-full p-2 border ${
              errors.motherEmail ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.motherEmail && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.motherEmail.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ParentInformation
