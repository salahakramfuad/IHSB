import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'

// Step Components
import SchoolInformation from 'components/steps/SchoolInformation.jsx'
import StudentInformation from 'components/steps/StudentInformation.jsx'
import AddressInformation from 'components/steps/AddressInformation.jsx'
import ParentInformation from 'components/steps/ParentsInformation.jsx'
import DocumentUploads from 'components/steps/DocumentUpload.jsx'
import AdditionalInformation from 'components/steps/Additionalinfo.jsx'
import PaymentInformation from 'components/steps/PaymentInformation.jsx'
import ReCAPTCHAStep from 'components/steps/ReCAPTCHAStep.jsx'

// Validation Schema
const admissionSchema = yup.object().shape({
  // School Information
  branch: yup.string().required('Branch is required'),
  academicYear: yup.string().required('Academic year is required'),
  applicationNumber: yup.string().required('Application number is required'),

  // Student Information
  surname: yup.string().required('Surname is required'),
  studentName: yup.string().required('Student name is required'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  religion: yup.string(),
  nationality: yup.string().required('Nationality is required'),
  classAppliedFor: yup.string().required('Class applied for is required'),
  bloodGroup: yup.string(),
  passport: yup.string(),

  // Address Information
  presentAddress: yup.string().required('Present address is required'),
  permanentAddress: yup.string().required('Permanent address is required'),

  // Parent Information
  fatherName: yup.string().required("Father's name is required"),
  fatherOccupation: yup.string(),
  fatherContact: yup.string().required("Father's contact is required"),
  fatherEmail: yup.string().email('Invalid email format'),
  motherName: yup.string(),
  motherOccupation: yup.string(),
  motherContact: yup.string(),
  motherEmail: yup.string().email('Invalid email format'),

  // Medical Information
  onMedication: yup.boolean(),
  medicationName: yup.string().when('onMedication', {
    is: true,
    then: yup
      .string()
      .required('Medication name is required when on medication')
  }),

  // Documents
  studentPhoto: yup.mixed().required('Student photo is required'),
  birthCertificateImage: yup.mixed().required('Birth certificate is required'),
  lastYearReportCardImage: yup.mixed(),
  passportImage: yup.mixed(),
  visitingCardImage: yup.mixed(),

  // Additional Information
  lastSchoolAttended: yup.string(),
  languageSpokenAtHome: yup.string(),
  studentLivingWith: yup.string(),
  allergiesOrSpecialNeeds: yup.string(),
  paymentReference: yup.string().required('Payment reference is required'),
  recaptcha: yup.string().required('Captcha is required')
})

const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(admissionSchema),
    mode: 'onBlur'
  })

  const [currentStep, setCurrentStep] = useState(1)
  const onMedication = watch('onMedication')

  // Steps Configuration
  const steps = [
    {
      title: 'School Information',
      component: (
        <SchoolInformation
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'Student Information',
      component: (
        <StudentInformation
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'Address Information',
      component: (
        <AddressInformation
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'Parent Information',
      component: (
        <ParentInformation
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'Document Uploads',
      component: (
        <DocumentUploads
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'Additional Information',
      component: (
        <AdditionalInformation
          register={register}
          errors={errors}
          control={control}
          onMedication={onMedication}
        />
      )
    },
    {
      title: 'Payment Information',
      component: (
        <PaymentInformation
          register={register}
          errors={errors}
          control={control}
        />
      )
    },
    {
      title: 'ReCAPTCHA',
      component: <ReCAPTCHAStep control={control} errors={errors} />
    }
  ]

  // Navigation Functions
  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  // Form Submission
  const onSubmit = async (data) => {
    const formData = new FormData()

    // Append all form data
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    })

    try {
      // Submit to API
      const response = await fetch('/api/admissions', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) throw new Error('Submission failed')
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Error submitting form. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg'
    >
      <h1 className='text-2xl font-bold text-center mb-6'>
        ADMISSION APPLICATION FORM
      </h1>

      {/* Current Step Content */}
      <div className='space-y-8'>{steps[currentStep - 1].component}</div>

      {/* Navigation Buttons */}
      <div className='flex justify-between mt-8'>
        {currentStep > 1 && (
          <button
            type='button'
            onClick={prevStep}
            className='py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 z-10'
          >
            Previous
          </button>
        )}
        {currentStep < steps.length && (
          <button
            type='button'
            onClick={nextStep}
            className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10'
          >
            Next
          </button>
        )}
        {currentStep === steps.length && (
          <button
            type='submit'
            disabled={isSubmitting}
            className='py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </form>
  )
}

export default AdmissionForm
