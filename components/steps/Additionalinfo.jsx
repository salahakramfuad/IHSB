import React from 'react'

const AdditionalInformation = ({ register, errors, onMedication }) => {
  return (
    <section className='bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-200'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Additional Information
        </h2>
        <p className='text-gray-600 text-sm'>
          Please provide additional details about the student.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Last School Attended */}
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
          />
          {errors.lastSchoolAttended && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.lastSchoolAttended.message}
            </p>
          )}
        </div>

        {/* Language Spoken at Home */}
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
          />
          {errors.languageSpokenAtHome && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.languageSpokenAtHome.message}
            </p>
          )}
        </div>

        {/* Student Living With */}
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
          >
            <option value=''>Select Option</option>
            <option value='Both Parents'>Both Parents</option>
            <option value='Mother'>Mother</option>
            <option value='Father'>Father</option>
            <option value='Guardian'>Guardian</option>
          </select>
          {errors.studentLivingWith && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.studentLivingWith.message}
            </p>
          )}
        </div>

        {/* Allergies or Special Needs */}
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
          />
          {errors.allergiesOrSpecialNeeds && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.allergiesOrSpecialNeeds.message}
            </p>
          )}
        </div>

        {/* Medication Section */}
        <div className='mb-4 relative z-10'>
          <label className='block text-sm font-medium text-gray-700 cursor-pointer'>
            Is the student on medication?
          </label>
          <div className='mt-1 flex gap-4'>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                value='Yes'
                {...register('onMedication')}
                className='form-radio h-4 w-4 text-blue-600'
              />
              <span className='ml-2 text-sm text-gray-700'>Yes</span>
            </label>
            <label className='inline-flex items-center'>
              <input
                type='radio'
                value='No'
                {...register('onMedication')}
                className='form-radio h-4 w-4 text-blue-600'
              />
              <span className='ml-2 text-sm text-gray-700'>No</span>
            </label>
          </div>
        </div>

        {/* Medication Name (Conditional) */}
        {onMedication === 'Yes' && (
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
            />
            {errors.medicationName && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.medicationName.message}
              </p>
            )}
          </div>
        )}

        {/* Siblings Section */}
        <div className='mb-4 relative z-10 col-span-full'>
          <label className='block text-sm font-medium text-gray-700 cursor-pointer'>
            Siblings (in IHSB)
          </label>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-2'>
            {/* Sibling 1 */}
            <div className='space-y-2'>
              <input
                type='text'
                {...register('sibling1Name')}
                placeholder="Brother's/Sister's Name"
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
              <input
                type='text'
                {...register('sibling1IHSBNo')}
                placeholder='IHSB No'
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
              <input
                type='text'
                {...register('sibling1Class')}
                placeholder='Class'
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
            </div>

            {/* Sibling 2 */}
            <div className='space-y-2'>
              <input
                type='text'
                {...register('sibling2Name')}
                placeholder="Brother's/Sister's Name"
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
              <input
                type='text'
                {...register('sibling2IHSBNo')}
                placeholder='IHSB No'
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
              <input
                type='text'
                {...register('sibling2Class')}
                placeholder='Class'
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors'
              />
            </div>
          </div>
        </div>

        {/* Guardian Details */}
        <div className='mb-4 relative z-10 col-span-full'>
          <label
            htmlFor='guardianDetails'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Guardian Name & Relationship (if applicable)
          </label>
          <input
            id='guardianDetails'
            type='text'
            {...register('guardianDetails')}
            className={`mt-1 block w-full p-2 border ${
              errors.guardianDetails ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
          />
          {errors.guardianDetails && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.guardianDetails.message}
            </p>
          )}
        </div>

        {/* Any Other Relevant Information */}
        <div className='mb-4 relative z-10 col-span-full'>
          <label
            htmlFor='otherRelevantInfo'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Any Other Relevant Information
          </label>
          <textarea
            id='otherRelevantInfo'
            {...register('otherRelevantInfo')}
            rows='3'
            className={`mt-1 block w-full p-2 border ${
              errors.otherRelevantInfo ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
          />
          {errors.otherRelevantInfo && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.otherRelevantInfo.message}
            </p>
          )}
        </div>
      </div>

      {/* Declaration Form */}
      <div className='mt-8 border-t border-gray-200 pt-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Declaration
        </h3>
        <div className='flex items-start'>
          <input
            type='checkbox'
            id='declaration'
            {...register('declaration')}
            className='mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          />
          <label
            htmlFor='declaration'
            className='ml-2 block text-sm text-gray-700'
          >
            I hereby declare that the information provided above is true and
            accurate to the best of my knowledge.
          </label>
        </div>
        {errors.declaration && (
          <p className='mt-2 text-sm text-red-500'>
            {errors.declaration.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default AdditionalInformation
