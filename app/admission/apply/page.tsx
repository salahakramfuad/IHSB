'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import PageHeader from '../../../components/ui/PageHeader'
import Section from '../../../components/ui/Section'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'

// Step Components
import SchoolInformation from '../../../components/steps/SchoolInformation'
import StudentInformation from '../../../components/steps/StudentInformation'
import AddressInformation from '../../../components/steps/AddressInformation'
import ParentsInformation from '../../../components/steps/ParentsInformation'
import DocumentUpload from '../../../components/steps/DocumentUpload'
import Additionalinfo from '../../../components/steps/Additionalinfo'
import PaymentInformation from '../../../components/steps/PaymentInformation'
import ReCAPTCHAStep from '../../../components/steps/ReCAPTCHAStep'

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
  medicationName: z.string().optional(),

  studentPhoto: z.any(),
  birthCertificateImage: z.any(),
  lastYearReportCardImage: z.any().optional(),
  passportImage: z.any().optional(),
  visitingCardImage: z.any().optional(),

  paymentReference: z.string().min(1, 'Payment reference is required'),
  recaptcha: z.string().min(1, 'Captcha is required')
}).superRefine((data, ctx) => {
  if (data.onMedication && (!data.medicationName || data.medicationName.length === 0)) {
    ctx.addIssue({
      code: 'custom',
      message: 'Medication name is required when on medication',
      path: ['medicationName']
    })
  }
})

const steps = [
  {
    title: 'School & Student Info',
    icon: '📚',
    color: 'from-accent-blue-500 to-accent-blue-600'
  },
  {
    title: 'Parent Information',
    icon: '👨‍👩‍👧',
    color: 'from-primary-green-500 to-primary-green-600'
  },
  {
    title: 'Documents',
    icon: '📄',
    color: 'from-accent-purple-500 to-accent-purple-600'
  },
  {
    title: 'Additional Info',
    icon: '➕',
    color: 'from-accent-orange-500 to-accent-orange-600'
  },
  {
    title: 'Payment',
    icon: '💳',
    color: 'from-accent-yellow-500 to-accent-yellow-600'
  },
  {
    title: 'Verification',
    icon: '✓',
    color: 'from-primary-green-500 to-accent-teal-500'
  }
]

export default function ApplyPage() {
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

  const formSteps = [
    {
      title: 'School & Student Information',
      component: (
        <>
          <SchoolInformation register={register} errors={errors} control={control} />
          <StudentInformation register={register} errors={errors} control={control} />
          <AddressInformation register={register} errors={errors} control={control} />
        </>
      )
    },
    {
      title: 'Parent Information',
      component: (
        <ParentsInformation register={register} errors={errors} control={control} />
      )
    },
    {
      title: 'Document Uploads',
      component: (
        <DocumentUpload register={register} errors={errors} control={control} />
      )
    },
    {
      title: 'Additional Information',
      component: (
        <Additionalinfo
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
        <PaymentInformation register={register} errors={errors} control={control} />
      )
    },
    {
      title: 'ReCAPTCHA',
      component: <ReCAPTCHAStep control={control} errors={errors} />
    }
  ]

  const nextStep = () =>
    setCurrentStep((prevStep) => Math.min(prevStep + 1, formSteps.length))
  const prevStep = () => setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof FileList) {
        formData.append(key, value[0])
      } else {
        formData.append(key, value as string)
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

  const progress = (currentStep / formSteps.length) * 100

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-green-50/20'>
      <Section background='white'>
        <PageHeader
          title='Online Admission Application'
          subtitle='Complete your application in 6 simple steps. Fill out all required information carefully.'
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Admissions', href: '/admission' },
            { label: 'Apply Online' }
          ]}
        />
      </Section>

      <Section background='gray'>
        <div className='max-w-5xl mx-auto'>
          {/* Progress Bar */}
          <Card className='mb-8 border-2 border-primary-green-200 bg-white'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='mb-4'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-semibold text-gray-700'>
                  Step {currentStep} of {formSteps.length}
                </span>
                <span className='text-sm font-semibold text-primary-green-600'>
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
                <div
                  className='h-full bg-gradient-to-r from-primary-green-500 to-accent-blue-500 transition-all duration-300 rounded-full'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Step Indicators */}
            <div className='flex justify-between items-center'>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center flex-1 relative'
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      index + 1 <= currentStep
                        ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1 < currentStep ? '✓' : step.icon}
                  </div>
                  <span
                    className={`text-xs mt-2 text-center font-medium ${
                      index + 1 <= currentStep
                        ? 'text-gray-900'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        index + 1 < currentStep
                          ? 'bg-gradient-to-r from-primary-green-500 to-accent-blue-500'
                          : 'bg-gray-200'
                      }`}
                      style={{ transform: 'translateX(50%)' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Form Card */}
          <Card className='border-2 border-primary-green-200 bg-white'>
            <div className='h-2 bg-gradient-to-r from-primary-green-500 to-accent-blue-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  {formSteps[currentStep - 1].title}
                </h2>
                <p className='text-gray-600'>
                  Please fill in all required fields marked with *
                </p>
              </div>

              <div className='space-y-6 mb-8'>{formSteps[currentStep - 1].component}</div>

              {/* Navigation Buttons */}
              <div className='flex justify-between items-center pt-6 border-t border-gray-200'>
                {currentStep > 1 ? (
                  <Button
                    type='button'
                    onClick={prevStep}
                    variant='outline'
                    size='lg'
                    className='px-6'
                  >
                    ← Previous
                  </Button>
                ) : (
                  <div></div>
                )}

                {currentStep < formSteps.length ? (
                  <Button
                    type='button'
                    onClick={nextStep}
                    variant='primary'
                    size='lg'
                    className='px-8 bg-gradient-to-r from-primary-green-600 to-accent-blue-600 hover:from-primary-green-700 hover:to-accent-blue-700'
                  >
                    Next →
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    disabled={isSubmitting}
                    variant='primary'
                    size='lg'
                    className='px-8 bg-gradient-to-r from-primary-green-600 to-accent-blue-600 hover:from-primary-green-700 hover:to-accent-blue-700 disabled:opacity-50'
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application ✨'}
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* Help Section */}
          <Card className='mt-8 bg-gradient-to-br from-accent-yellow-50 to-accent-orange-50 border-2 border-accent-yellow-200'>
            <div className='h-2 bg-gradient-to-r from-accent-yellow-400 to-accent-orange-500 rounded-t-xl -mx-6 -mt-6 mb-6'></div>
            <div className='flex items-start gap-4'>
              <div className='text-4xl'>💡</div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  Need Help?
                </h3>
                <p className='text-gray-700 mb-2'>
                  If you encounter any issues while filling out the form, please
                  contact our admissions office.
                </p>
                <p className='text-gray-700'>
                  <strong>Email:</strong> admissions@ihsb.edu.bd |{' '}
                  <strong>Phone:</strong> +880 2 4895 6999
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
