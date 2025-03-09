import React from 'react'

const DocumentUploads = ({ register, errors }) => {
  return (
    <section className='bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-200'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Document Uploads
        </h2>
        <p className='text-gray-600 text-sm'>
          Please upload clear scans of the required documents (Max 5MB each,
          supported formats: JPEG, PNG, PDF)
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Student Photo */}
        <div className='relative group'>
          <div
            className={`border-2 border-dashed ${
              errors.studentPhoto
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 group-hover:border-blue-400'
            } rounded-lg p-4 transition-all duration-200 ease-in-out`}
          >
            <label
              htmlFor='studentPhoto'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Student Photo
              <span className='text-red-500 ml-1'>*</span>
              <span className='block text-xs text-gray-500 mt-1'>
                (JPEG/PNG)
              </span>
            </label>
            <div className='relative'>
              <input
                id='studentPhoto'
                type='file'
                accept='image/*'
                {...register('studentPhoto')}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex items-center justify-between px-4 py-2 bg-white border rounded-md border-gray-300 group-hover:border-blue-400'>
                <span className='text-sm text-gray-500 truncate'>
                  Choose file...
                </span>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
            </div>
            {errors.studentPhoto && (
              <div className='mt-2 flex items-center text-red-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {errors.studentPhoto.message}
              </div>
            )}
          </div>
        </div>

        {/* Birth Certificate */}
        <div className='relative group'>
          <div
            className={`border-2 border-dashed ${
              errors.birthCertificateImage
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 group-hover:border-blue-400'
            } rounded-lg p-4 transition-all duration-200 ease-in-out`}
          >
            <label
              htmlFor='birthCertificateImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Birth Certificate
              <span className='text-red-500 ml-1'>*</span>
              <span className='block text-xs text-gray-500 mt-1'>
                (JPEG/PNG)
              </span>
            </label>
            <div className='relative'>
              <input
                id='birthCertificateImage'
                type='file'
                accept='image/*'
                {...register('birthCertificateImage')}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex items-center justify-between px-4 py-2 bg-white border rounded-md border-gray-300 group-hover:border-blue-400'>
                <span className='text-sm text-gray-500 truncate'>
                  Choose file...
                </span>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
            </div>
            {errors.birthCertificateImage && (
              <div className='mt-2 flex items-center text-red-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {errors.birthCertificateImage.message}
              </div>
            )}
          </div>
        </div>

        {/* Last Year's Report Card */}
        <div className='relative group'>
          <div
            className={`border-2 border-dashed ${
              errors.lastYearReportCardImage
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 group-hover:border-blue-400'
            } rounded-lg p-4 transition-all duration-200 ease-in-out`}
          >
            <label
              htmlFor='lastYearReportCardImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Last Year's Report Card
              <span className='block text-xs text-gray-500 mt-1'>
                (PDF/JPEG/PNG)
              </span>
            </label>
            <div className='relative'>
              <input
                id='lastYearReportCardImage'
                type='file'
                accept='image/*,application/pdf'
                {...register('lastYearReportCardImage')}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex items-center justify-between px-4 py-2 bg-white border rounded-md border-gray-300 group-hover:border-blue-400'>
                <span className='text-sm text-gray-500 truncate'>
                  Choose file...
                </span>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
            </div>
            {errors.lastYearReportCardImage && (
              <div className='mt-2 flex items-center text-red-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {errors.lastYearReportCardImage.message}
              </div>
            )}
          </div>
        </div>

        {/* Passport Copy */}
        <div className='relative group'>
          <div
            className={`border-2 border-dashed ${
              errors.passportImage
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 group-hover:border-blue-400'
            } rounded-lg p-4 transition-all duration-200 ease-in-out`}
          >
            <label
              htmlFor='passportImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Passport Copy
              <span className='block text-xs text-gray-500 mt-1'>
                (PDF/JPEG/PNG)
              </span>
            </label>
            <div className='relative'>
              <input
                id='passportImage'
                type='file'
                accept='image/*,application/pdf'
                {...register('passportImage')}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex items-center justify-between px-4 py-2 bg-white border rounded-md border-gray-300 group-hover:border-blue-400'>
                <span className='text-sm text-gray-500 truncate'>
                  Choose file...
                </span>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
            </div>
            {errors.passportImage && (
              <div className='mt-2 flex items-center text-red-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {errors.passportImage.message}
              </div>
            )}
          </div>
        </div>

        {/* Visiting/Business Card */}
        <div className='relative group'>
          <div
            className={`border-2 border-dashed ${
              errors.visitingCardImage
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 group-hover:border-blue-400'
            } rounded-lg p-4 transition-all duration-200 ease-in-out`}
          >
            <label
              htmlFor='visitingCardImage'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Visiting/Business Card
              <span className='block text-xs text-gray-500 mt-1'>
                (JPEG/PNG)
              </span>
            </label>
            <div className='relative'>
              <input
                id='visitingCardImage'
                type='file'
                accept='image/*'
                {...register('visitingCardImage')}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex items-center justify-between px-4 py-2 bg-white border rounded-md border-gray-300 group-hover:border-blue-400'>
                <span className='text-sm text-gray-500 truncate'>
                  Choose file...
                </span>
                <svg
                  className='w-5 h-5 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
            </div>
            {errors.visitingCardImage && (
              <div className='mt-2 flex items-center text-red-600 text-sm'>
                <svg
                  className='w-4 h-4 mr-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
                {errors.visitingCardImage.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar (Example) */}
      <div className='mt-8'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-700'>
            Upload Progress
          </span>
          <span className='text-sm text-gray-500'>0%</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-500 h-2 rounded-full transition-all duration-300'
            style={{ width: '0%' }}
          />
        </div>
      </div>

      <p className='mt-6 text-sm text-gray-500'>
        Need help with document uploads?
        <a href='#help' className='text-blue-600 hover:text-blue-800 ml-1'>
          View our guide
        </a>
      </p>
    </section>
  )
}

export default DocumentUploads
