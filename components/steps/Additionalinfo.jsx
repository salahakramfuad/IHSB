import React from 'react'

const AdditionalInformation = ({ register, errors, onMedication }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Additional Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Last School Attended Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='lastSchoolAttended'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Last School Attended
          </label>
          <input
            id='lastSchoolAttended'
            type='text'
            {...register('lastSchoolAttended')}
            className={`mt-1 block w-full p-2 border ${
              errors.lastSchoolAttended ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.lastSchoolAttended && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.lastSchoolAttended.message}
            </p>
          )}
        </div>

        {/* Language Spoken at Home Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='languageSpokenAtHome'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Language Spoken at Home
          </label>
          <input
            id='languageSpokenAtHome'
            type='text'
            {...register('languageSpokenAtHome')}
            className={`mt-1 block w-full p-2 border ${
              errors.languageSpokenAtHome ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure input is above other elements
          />
          {errors.languageSpokenAtHome && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.languageSpokenAtHome.message}
            </p>
          )}
        </div>

        {/* Student Living With Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='studentLivingWith'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Student Living With
          </label>
          <select
            id='studentLivingWith'
            {...register('studentLivingWith')}
            className={`mt-1 block w-full p-2 border ${
              errors.studentLivingWith ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer appearance-none bg-white`}
            style={{ zIndex: 20 }} // Ensure select is above other elements
          >
            <option value=''>Select Option</option>
            <option value='Both Parents'>Both Parents</option>
            <option value='Mother'>Mother</option>
            <option value='Father'>Father</option>
            <option value='Guardian'>Guardian</option>
          </select>
          {errors.studentLivingWith && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.studentLivingWith.message}
            </p>
          )}
        </div>

        {/* Allergies or Special Needs Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='allergiesOrSpecialNeeds'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Allergies, Physical Difficulties, or Special Needs
          </label>
          <textarea
            id='allergiesOrSpecialNeeds'
            {...register('allergiesOrSpecialNeeds')}
            rows='3'
            className={`mt-1 block w-full p-2 border ${
              errors.allergiesOrSpecialNeeds
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }} // Ensure textarea is above other elements
          />
          {errors.allergiesOrSpecialNeeds && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.allergiesOrSpecialNeeds.message}
            </p>
          )}
        </div>

        {/* Medication Name Field (Conditional) */}
        {onMedication && (
          <div className='mb-4 relative z-10'>
            <label
              htmlFor='medicationName'
              className='block text-sm font-medium text-gray-700 cursor-pointer'
            >
              Name of Medication <span className='text-red-500'>*</span>
            </label>
            <input
              id='medicationName'
              type='text'
              {...register('medicationName')}
              className={`mt-1 block w-full p-2 border ${
                errors.medicationName ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
              style={{ zIndex: 20 }} // Ensure input is above other elements
            />
            {errors.medicationName && (
              <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
                {errors.medicationName.message}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default AdditionalInformation
