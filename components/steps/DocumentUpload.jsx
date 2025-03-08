import React from 'react'

const DocumentUploads = ({ register, errors }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Document Uploads</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Student Photo Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='studentPhoto'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Student Photo (JPEG/PNG) <span className='text-red-500'>*</span>
          </label>
          <input
            id='studentPhoto'
            type='file'
            accept='image/*'
            {...register('studentPhoto')}
            className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors'
            style={{ zIndex: 20 }} // Ensure file input is above other elements
          />
          {errors.studentPhoto && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.studentPhoto.message}
            </p>
          )}
        </div>

        {/* Birth Certificate Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='birthCertificateImage'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Birth Certificate (JPEG/PNG) <span className='text-red-500'>*</span>
          </label>
          <input
            id='birthCertificateImage'
            type='file'
            accept='image/*'
            {...register('birthCertificateImage')}
            className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors'
            style={{ zIndex: 20 }} // Ensure file input is above other elements
          />
          {errors.birthCertificateImage && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.birthCertificateImage.message}
            </p>
          )}
        </div>

        {/* Last Year's Report Card Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='lastYearReportCardImage'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Last Year's Report Card (PDF/JPEG/PNG)
          </label>
          <input
            id='lastYearReportCardImage'
            type='file'
            accept='image/*,application/pdf'
            {...register('lastYearReportCardImage')}
            className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors'
            style={{ zIndex: 20 }} // Ensure file input is above other elements
          />
          {errors.lastYearReportCardImage && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.lastYearReportCardImage.message}
            </p>
          )}
        </div>

        {/* Passport Copy Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='passportImage'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Passport Copy (PDF/JPEG/PNG)
          </label>
          <input
            id='passportImage'
            type='file'
            accept='image/*,application/pdf'
            {...register('passportImage')}
            className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors'
            style={{ zIndex: 20 }} // Ensure file input is above other elements
          />
          {errors.passportImage && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.passportImage.message}
            </p>
          )}
        </div>

        {/* Visiting/Business Card Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='visitingCardImage'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Visiting/Business Card (JPEG/PNG)
          </label>
          <input
            id='visitingCardImage'
            type='file'
            accept='image/*'
            {...register('visitingCardImage')}
            className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors'
            style={{ zIndex: 20 }} // Ensure file input is above other elements
          />
          {errors.visitingCardImage && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {errors.visitingCardImage.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default DocumentUploads
