import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

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
const admissionSchema = z.object({
  branch: z.string().min(1, 'Branch is required'),
  academicYear: z.string().min(1, 'Academic year is required'),
  applicationNumber: z.string().min(1, 'Application number is required'),

  surname: z.string().min(1, 'Surname is required'),
  studentName: z.string().min(1, 'Student name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  nationality: z.string().min(1, 'Nationality is required'),
  classAppliedFor: z.string().min(1, 'Class applied for is required'),

  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),

  fatherName: z.string().min(1, "Father's name is required"),
  fatherContact: z.string().min(1, "Father's contact is required"),
  fatherEmail: z.string().email('Invalid email format').optional(),
  motherEmail: z.string().email('Invalid email format').optional(),

  onMedication: z.boolean(),
  medicationName: z
    .string()
    .optional()
    .refine((val, ctx) => {
      return ctx.data.onMedication ? val && val.length > 0 : true
    }, 'Medication name is required when on medication'),

  studentPhoto: z.any(),
  birthCertificateImage: z.any(),
  lastYearReportCardImage: z.any().optional(),
  passportImage: z.any().optional(),
  visitingCardImage: z.any().optional(),

  paymentReference: z.string().min(1, 'Payment reference is required'),
  recaptcha: z.string().min(1, 'Captcha is required')
})

const AdmissionForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(admissionSchema),
    mode: 'onBlur'
  })

  const [currentStep, setCurrentStep] = useState(1)
  const onMedication = watch('onMedication')

  const steps = [
    {
      title: 'School Information',
      component: (
        <>
          <SchoolInformation
            register={register}
            errors={errors}
            control={control}
          />
          <StudentInformation
            register={register}
            errors={errors}
            control={control}
          />
          <AddressInformation
            register={register}
            errors={errors}
            control={control}
          />
        </>
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

  const nextStep = () =>
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))

  const onSubmit = async (data) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    })

    try {
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
      className='max-w-4xl mx-auto p-6 shadow-lg rounded-lg'
    >
      <h1 className='text-2xl font-bold text-center mb-6'>
        ADMISSION APPLICATION FORM
      </h1>
      <div className='space-y-8'>{steps[currentStep - 1].component}</div>
      <div className='flex justify-between mt-8'>
        {currentStep > 1 && (
          <button
            type='button'
            onClick={prevStep}
            className='py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 z-10'
          >
            Previous
          </button>
        )}
        {currentStep < steps.length && (
          <button
            type='button'
            onClick={nextStep}
            className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 z-10'
          >
            Next
          </button>
        )}
        {currentStep === steps.length && (
          <button
            type='submit'
            disabled={isSubmitting}
            className='py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400'
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </form>
  )
}

export default AdmissionForm
