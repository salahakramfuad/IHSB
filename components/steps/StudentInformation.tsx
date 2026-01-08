import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface StudentInformationProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

const StudentInformation: React.FC<StudentInformationProps> = ({
  register,
  errors
}) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Student Information</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Student Name Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='studentName'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Student Name <span className='text-red-500'>*</span>
          </label>
          <input
            id='studentName'
            type='text'
            {...register('studentName')}
            className={`mt-1 block w-full p-2 border ${
              errors.studentName ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.studentName && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.studentName as { message?: string })?.message}
            </p>
          )}
        </div>
        {/* Surname Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='surname'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Surname <span className='text-red-500'>*</span>
          </label>
          <input
            id='surname'
            type='text'
            {...register('surname')}
            className={`mt-1 block w-full p-2 border ${
              errors.surname ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.surname && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.surname as { message?: string })?.message}
            </p>
          )}
        </div>
        {/* Date of Birth Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='dateOfBirth'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Date of Birth <span className='text-red-500'>*</span>
          </label>
          <input
            id='dateOfBirth'
            type='date'
            {...register('dateOfBirth')}
            className={`mt-1 block w-full p-2 border ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.dateOfBirth && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.dateOfBirth as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='gender'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Gender <span className='text-red-500'>*</span>
          </label>
          <select
            id='gender'
            {...register('gender')}
            className={`mt-1 block w-full p-2 border ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer appearance-none bg-white`}
            style={{ zIndex: 20 }}
          >
            <option value=''>Select Gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          {errors.gender && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.gender as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Religion Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='religion'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Religion
          </label>
          <input
            id='religion'
            type='text'
            {...register('religion')}
            className={`mt-1 block w-full p-2 border ${
              errors.religion ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.religion && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.religion as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Nationality Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='nationality'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Nationality <span className='text-red-500'>*</span>
          </label>
          <input
            id='nationality'
            type='text'
            {...register('nationality')}
            className={`mt-1 block w-full p-2 border ${
              errors.nationality ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.nationality && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.nationality as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Class Applied For Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='classAppliedFor'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Class Applied For <span className='text-red-500'>*</span>
          </label>
          <select
            id='classAppliedFor'
            {...register('classAppliedFor')}
            className={`mt-1 block w-full p-2 border ${
              errors.classAppliedFor ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer appearance-none bg-white`}
            style={{ zIndex: 20 }}
          >
            <option value=''>Select Class</option>
            <option value='Class 1'>Class 1</option>
            <option value='Class 2'>Class 2</option>
            <option value='Class 3'>Class 3</option>
          </select>
          {errors.classAppliedFor && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.classAppliedFor as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Blood Group Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='bloodGroup'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Blood Group
          </label>
          <select
            id='bloodGroup'
            {...register('bloodGroup')}
            className={`mt-1 block w-full p-2 border ${
              errors.bloodGroup ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors cursor-pointer appearance-none bg-white`}
            style={{ zIndex: 20 }}
          >
            <option value=''>Select Blood Group</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
          </select>
          {errors.bloodGroup && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.bloodGroup as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* Passport Field */}
        <div className='mb-4 relative z-10'>
          <label
            htmlFor='passport'
            className='block text-sm font-medium text-gray-700 cursor-pointer'
          >
            Passport (If any)
          </label>
          <input
            id='passport'
            type='text'
            {...register('passport')}
            className={`mt-1 block w-full p-2 border ${
              errors.passport ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            style={{ zIndex: 20 }}
          />
          {errors.passport && (
            <p className='mt-1 text-sm text-red-500' style={{ zIndex: 30 }}>
              {(errors.passport as { message?: string })?.message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default StudentInformation

