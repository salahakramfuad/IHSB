'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import DatePicker from '@/components/admin/DatePicker'
import { 
  User, 
  Calendar, 
  MapPin, 
  Users, 
  FileText, 
  CreditCard,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { schoolInfo } from '@/data/schoolInfo'

interface FormData {
  // Basic Information
  branch: string
  academicYear: string
  classAppliedFor: string
  
  // Student Information
  surname: string
  studentName: string
  dateOfBirth: string
  gender: string
  nationality: string
  
  // Address Information
  presentAddress: string
  permanentAddress: string
  
  // Parent Information
  fatherName: string
  fatherContact: string
  fatherEmail: string
  motherName: string
  motherContact: string
  motherEmail: string
  
  // Medical Information
  onMedication: boolean
  medicationName: string
  
  // Payment
  paymentReference: string
  
  // Documents (URLs after upload)
  studentPhoto?: string
  birthCertificateImage?: string
  lastYearReportCardImage?: string
  passportImage?: string
  visitingCardImage?: string
}

const initialFormData: FormData = {
  branch: '',
  academicYear: new Date().getFullYear().toString(),
  classAppliedFor: '',
  surname: '',
  studentName: '',
  dateOfBirth: '',
  gender: '',
  nationality: '',
  presentAddress: '',
  permanentAddress: '',
  fatherName: '',
  fatherContact: '',
  fatherEmail: '',
  motherName: '',
  motherContact: '',
  motherEmail: '',
  onMedication: false,
  medicationName: '',
  paymentReference: ''
}

const branches = [
  { value: 'uttaraPreschoolPrimary', label: 'Uttara Preschool & Primary Section' },
  { value: 'uttaraSenior', label: 'Uttara Senior Section' },
  { value: 'gulshanPreschool', label: 'Gulshan Preschool' },
  { value: 'gulshanPrimaryMiddle', label: 'Gulshan Primary & Middle Section' },
  { value: 'chattogram', label: 'Chattogram Branch' }
]

const classes = [
  'Playgroup', 'Nursery', 'KG-1', 'KG-2', 'Grade 1', 'Grade 2', 'Grade 3',
  'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
  'Grade 11', 'Grade 12'
]

// File Upload Field Component
interface FileUploadFieldProps {
  name: string
  accept: string
  uploadState: FileUploadState
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRemove: (name: string) => void
  description?: string
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  accept,
  uploadState,
  onFileChange,
  onRemove,
  description
}) => {
  return (
    <div>
      <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-green-400 transition-colors'>
        {uploadState.url ? (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 flex-1'>
              <CheckCircle2 className='w-5 h-5 text-primary-green-600 flex-shrink-0' />
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>
                  {uploadState.file?.name || 'File uploaded'}
                </p>
                <p className='text-xs text-gray-500 mt-1'>Upload successful</p>
              </div>
            </div>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => onRemove(name)}
              className='text-red-600 hover:text-red-700'
            >
              Remove
            </Button>
          </div>
        ) : uploadState.uploading ? (
          <div className='flex items-center gap-3'>
            <Loader2 className='w-5 h-5 text-primary-green-600 animate-spin' />
            <div className='flex-1'>
              <p className='text-sm font-medium text-gray-900'>
                Uploading {uploadState.file?.name}...
              </p>
              <p className='text-xs text-gray-500 mt-1'>Please wait</p>
            </div>
          </div>
        ) : (
          <div>
            <label
              htmlFor={name}
              className='flex flex-col items-center justify-center cursor-pointer'
            >
              <div className='flex flex-col items-center gap-2'>
                <div className='w-12 h-12 bg-primary-green-100 rounded-full flex items-center justify-center'>
                  <Upload className='w-6 h-6 text-primary-green-600' />
                </div>
                <div className='text-center'>
                  <span className='text-sm font-medium text-primary-green-600 hover:text-primary-green-700'>
                    Click to upload
                  </span>
                  <span className='text-sm text-gray-500'> or drag and drop</span>
                </div>
                <p className='text-xs text-gray-500'>
                  JPEG, PNG, WebP, or PDF (Max 5MB)
                </p>
              </div>
              <input
                type='file'
                id={name}
                name={name}
                accept={accept}
                onChange={onFileChange}
                className='hidden'
              />
            </label>
          </div>
        )}
        {uploadState.error && (
          <div className='mt-3 flex items-center gap-2 text-sm text-red-600'>
            <AlertCircle className='w-4 h-4' />
            <span>{uploadState.error}</span>
          </div>
        )}
        {description && !uploadState.url && !uploadState.uploading && (
          <p className='mt-3 text-xs text-gray-500 text-center'>{description}</p>
        )}
      </div>
    </div>
  )
}

interface FileUploadState {
  file: File | null
  url: string | null
  uploading: boolean
  error: string | null
}

export default function AdmissionApplyPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [sameAddress, setSameAddress] = useState(false)
  
  // File upload states
  const [fileUploads, setFileUploads] = useState<Record<string, FileUploadState>>({
    studentPhoto: { file: null, url: null, uploading: false, error: null },
    birthCertificateImage: { file: null, url: null, uploading: false, error: null },
    lastYearReportCardImage: { file: null, url: null, uploading: false, error: null },
    passportImage: { file: null, url: null, uploading: false, error: null },
    visitingCardImage: { file: null, url: null, uploading: false, error: null }
  })

  const totalSteps = 5

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    const file = e.target.files?.[0]
    
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      setFileUploads(prev => ({
        ...prev,
        [name]: { file: null, url: null, uploading: false, error: 'Invalid file type. Only JPEG, PNG, WebP, and PDF are allowed.' }
      }))
      return
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setFileUploads(prev => ({
        ...prev,
        [name]: { file: null, url: null, uploading: false, error: 'File size exceeds 5MB limit' }
      }))
      return
    }

    // Set file and start upload
    setFileUploads(prev => ({
      ...prev,
      [name]: { file, url: null, uploading: true, error: null }
    }))

    try {
      // Upload file
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const uploadResponse = await fetch('/api/admissions/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const uploadResult = await uploadResponse.json()

      if (uploadResponse.ok && uploadResult.url) {
        // Update file upload state
        setFileUploads(prev => ({
          ...prev,
          [name]: { file, url: uploadResult.url, uploading: false, error: null }
        }))

        // Update form data with URL
        setFormData(prev => ({
          ...prev,
          [name]: uploadResult.url
        }))
      } else {
        setFileUploads(prev => ({
          ...prev,
          [name]: { file: null, url: null, uploading: false, error: uploadResult.error || 'Upload failed' }
        }))
      }
    } catch (error) {
      setFileUploads(prev => ({
        ...prev,
        [name]: { file: null, url: null, uploading: false, error: 'An error occurred during upload' }
      }))
    }
  }

  const removeFile = (name: string) => {
    setFileUploads(prev => ({
      ...prev,
      [name]: { file: null, url: null, uploading: false, error: null }
    }))
    setFormData(prev => ({
      ...prev,
      [name]: undefined
    }))
  }

  const handleSameAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setSameAddress(checked)
    if (checked) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.presentAddress
      }))
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.branch && formData.academicYear && formData.classAppliedFor)
      case 2:
        return !!(
          formData.surname &&
          formData.studentName &&
          formData.dateOfBirth &&
          formData.gender &&
          formData.nationality
        )
      case 3:
        return !!(formData.presentAddress && formData.permanentAddress)
      case 4:
        return !!(
          formData.fatherName &&
          formData.fatherContact &&
          formData.motherName &&
          formData.motherContact
        )
      case 5:
        return !!(
          formData.paymentReference &&
          formData.studentPhoto &&
          formData.birthCertificateImage &&
          formData.lastYearReportCardImage
        )
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) {
      setErrorMessage('Please fill in all required fields')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      // Prepare form data for submission
      const submissionData = {
        ...formData,
        onMedication: formData.onMedication || false,
        medicationName: formData.onMedication ? formData.medicationName : undefined,
        motherName: formData.motherName || undefined,
        motherContact: formData.motherContact || undefined,
        motherEmail: formData.motherEmail || undefined,
        fatherEmail: formData.fatherEmail || undefined,
        // File URLs are already in formData
        studentPhoto: formData.studentPhoto || undefined,
        birthCertificateImage: formData.birthCertificateImage || undefined,
        lastYearReportCardImage: formData.lastYearReportCardImage || undefined,
        passportImage: formData.passportImage || undefined,
        visitingCardImage: formData.visitingCardImage || undefined
      }

      const dataToSubmit = submissionData

      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSubmit)
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setFormData(initialFormData)
        setCurrentStep(1)
      } else {
        setStatus('error')
        setErrorMessage(result.error || 'Failed to submit application')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('An error occurred. Please try again later.')
    }
  }

  const inputClassName = 'w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-green-500 focus:border-primary-green-500 transition-all'
  const labelClassName = 'block text-sm font-semibold text-gray-700 mb-2'

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50'>
      {/* Hero Section */}
      <Section background='green' className='bg-gradient-to-br from-primary-green-600 via-primary-green-700 to-accent-blue-700 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl'></div>
        </div>
        <div className='max-w-4xl mx-auto text-center text-white relative z-10'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6'>
            <FileText className='w-8 h-8 text-white' />
          </div>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6'>
            Admission Application
          </h1>
          <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed'>
            Apply for admission to International Hope School Bangladesh. Fill out the form below to begin your journey with us.
          </p>
        </div>
      </Section>

      <Section background='gray' className='py-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Progress Bar */}
          <div className='mb-8'>
            <div className='flex items-center justify-between mb-4'>
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className='flex items-center flex-1'>
                  <div className='flex flex-col items-center flex-1'>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        step <= currentStep
                          ? 'bg-primary-green-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step < currentStep ? (
                        <CheckCircle2 className='w-6 h-6' />
                      ) : (
                        step
                      )}
                    </div>
                    <div className={`mt-2 text-xs font-medium text-center ${
                      step <= currentStep ? 'text-primary-green-600' : 'text-gray-500'
                    }`}>
                      {step === 1 && 'Basic Info'}
                      {step === 2 && 'Student Info'}
                      {step === 3 && 'Address'}
                      {step === 4 && 'Parents'}
                      {step === 5 && 'Payment & Docs'}
                    </div>
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        step < currentStep ? 'bg-primary-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Success Message */}
          {status === 'success' && (
            <Card className='mb-8 border-2 border-primary-green-500 bg-primary-green-50'>
              <div className='flex items-center gap-4'>
                <CheckCircle2 className='w-12 h-12 text-primary-green-600 flex-shrink-0' />
                <div>
                  <h3 className='text-xl font-bold text-primary-green-900 mb-1'>
                    Application Submitted Successfully!
                  </h3>
                  <p className='text-primary-green-700'>
                    Thank you for your application. We will review it and contact you soon.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Error Message */}
          {status === 'error' && errorMessage && (
            <Card className='mb-8 border-2 border-red-500 bg-red-50'>
              <div className='flex items-center gap-4'>
                <AlertCircle className='w-12 h-12 text-red-600 flex-shrink-0' />
                <div>
                  <h3 className='text-xl font-bold text-red-900 mb-1'>
                    Submission Failed
                  </h3>
                  <p className='text-red-700'>{errorMessage}</p>
                </div>
              </div>
            </Card>
          )}

          <form onSubmit={handleSubmit}>
            <Card className='border-2 border-gray-200 shadow-xl'>
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className='space-y-6 min-h-[600px]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-900'>Basic Information</h2>
                  </div>

                  <div>
                    <label htmlFor='branch' className={labelClassName}>
                      Branch <span className='text-red-500'>*</span>
                    </label>
                    <select
                      id='branch'
                      name='branch'
                      value={formData.branch}
                      onChange={handleChange}
                      className={inputClassName}
                      required
                    >
                      <option value=''>Select a branch</option>
                      {branches.map(branch => (
                        <option key={branch.value} value={branch.value}>
                          {branch.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor='academicYear' className={labelClassName}>
                      Academic Year <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='academicYear'
                      name='academicYear'
                      value={formData.academicYear}
                      onChange={handleChange}
                      placeholder='e.g., 2024-2025'
                      className={inputClassName}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor='classAppliedFor' className={labelClassName}>
                      Class Applied For <span className='text-red-500'>*</span>
                    </label>
                    <select
                      id='classAppliedFor'
                      name='classAppliedFor'
                      value={formData.classAppliedFor}
                      onChange={handleChange}
                      className={inputClassName}
                      required
                    >
                      <option value=''>Select a class</option>
                      {classes.map(className => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Student Information */}
              {currentStep === 2 && (
                <div className='space-y-6 min-h-[600px]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-900'>Student Information</h2>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label htmlFor='surname' className={labelClassName}>
                        Surname <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        id='surname'
                        name='surname'
                        value={formData.surname}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor='studentName' className={labelClassName}>
                        Student Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        id='studentName'
                        name='studentName'
                        value={formData.studentName}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <DatePicker
                        value={formData.dateOfBirth}
                        onChange={(value) => setFormData(prev => ({ ...prev, dateOfBirth: value }))}
                        label='Date of Birth'
                        required
                        type='date'
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <label htmlFor='gender' className={labelClassName}>
                        Gender <span className='text-red-500'>*</span>
                      </label>
                      <select
                        id='gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      >
                        <option value=''>Select gender</option>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor='nationality' className={labelClassName}>
                      Nationality <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='nationality'
                      name='nationality'
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder='e.g., Bangladeshi'
                      className={inputClassName}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Address Information */}
              {currentStep === 3 && (
                <div className='space-y-6 min-h-[600px]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-900'>Address Information</h2>
                  </div>

                  <div>
                    <label htmlFor='presentAddress' className={labelClassName}>
                      Present Address <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      id='presentAddress'
                      name='presentAddress'
                      value={formData.presentAddress}
                      onChange={handleChange}
                      rows={4}
                      className={inputClassName}
                      required
                    />
                  </div>

                  <div className='flex items-center gap-2 mb-4'>
                    <input
                      type='checkbox'
                      id='sameAddress'
                      checked={sameAddress}
                      onChange={handleSameAddressChange}
                      className='w-4 h-4 text-primary-green-600 border-gray-300 rounded focus:ring-primary-green-500'
                    />
                    <label htmlFor='sameAddress' className='text-sm font-medium text-gray-700'>
                      Same as present address
                    </label>
                  </div>

                  <div>
                    <label htmlFor='permanentAddress' className={labelClassName}>
                      Permanent Address <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      id='permanentAddress'
                      name='permanentAddress'
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      rows={4}
                      className={inputClassName}
                      required
                      disabled={sameAddress}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Parent Information */}
              {currentStep === 4 && (
                <div className='space-y-6 min-h-[600px]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-900'>Parent Information</h2>
                  </div>

                  <div className='bg-blue-50 p-4 rounded-lg border-2 border-blue-200 mb-6'>
                    <h3 className='font-bold text-blue-900 mb-2'>Father's Information</h3>
                    <div className='space-y-4'>
                      <div>
                        <label htmlFor='fatherName' className={labelClassName}>
                          Father's Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          id='fatherName'
                          name='fatherName'
                          value={formData.fatherName}
                          onChange={handleChange}
                          className={inputClassName}
                          required
                        />
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label htmlFor='fatherContact' className={labelClassName}>
                            Contact Number <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='tel'
                            id='fatherContact'
                            name='fatherContact'
                            value={formData.fatherContact}
                            onChange={handleChange}
                            className={inputClassName}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor='fatherEmail' className={labelClassName}>
                            Email Address
                          </label>
                          <input
                            type='email'
                            id='fatherEmail'
                            name='fatherEmail'
                            value={formData.fatherEmail}
                            onChange={handleChange}
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bg-purple-50 p-4 rounded-lg border-2 border-purple-200'>
                    <h3 className='font-bold text-purple-900 mb-2'>Mother's Information</h3>
                    <div className='space-y-4'>
                      <div>
                        <label htmlFor='motherName' className={labelClassName}>
                          Mother's Name <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          id='motherName'
                          name='motherName'
                          value={formData.motherName}
                          onChange={handleChange}
                          className={inputClassName}
                          required
                        />
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <label htmlFor='motherContact' className={labelClassName}>
                            Contact Number <span className='text-red-500'>*</span>
                          </label>
                          <input
                            type='tel'
                            id='motherContact'
                            name='motherContact'
                            value={formData.motherContact}
                            onChange={handleChange}
                            className={inputClassName}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor='motherEmail' className={labelClassName}>
                            Email Address
                          </label>
                          <input
                            type='email'
                            id='motherEmail'
                            name='motherEmail'
                            value={formData.motherEmail}
                            onChange={handleChange}
                            className={inputClassName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200'>
                    <h3 className='font-bold text-yellow-900 mb-4'>Medical Information</h3>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2'>
                        <input
                          type='checkbox'
                          id='onMedication'
                          name='onMedication'
                          checked={formData.onMedication}
                          onChange={handleChange}
                          className='w-4 h-4 text-primary-green-600 border-gray-300 rounded focus:ring-primary-green-500'
                        />
                        <label htmlFor='onMedication' className='text-sm font-medium text-gray-700'>
                          Student is currently on medication
                        </label>
                      </div>

                      {formData.onMedication && (
                        <div>
                          <label htmlFor='medicationName' className={labelClassName}>
                            Medication Name
                          </label>
                          <input
                            type='text'
                            id='medicationName'
                            name='medicationName'
                            value={formData.medicationName}
                            onChange={handleChange}
                            className={inputClassName}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Payment */}
              {currentStep === 5 && (
                <div className='space-y-6 min-h-[600px]'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-1 h-8 bg-gradient-to-b from-primary-green-500 to-accent-blue-500 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-900'>Payment & Documents</h2>
                  </div>

                  <div className='bg-green-50 p-6 rounded-lg border-2 border-green-200 mb-6'>
                    <div className='flex items-center gap-3 mb-4'>
                      <CreditCard className='w-6 h-6 text-green-700' />
                      <h3 className='font-bold text-green-900 text-lg'>
                        Application Fee: $17.7
                      </h3>
                    </div>
                    <p className='text-green-800 text-sm mb-4'>
                      Please make the payment at the school office and enter the payment reference number below.
                    </p>
                  </div>

                  <div>
                    <label htmlFor='paymentReference' className={labelClassName}>
                      Payment Reference Number <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='paymentReference'
                      name='paymentReference'
                      value={formData.paymentReference}
                      onChange={handleChange}
                      placeholder='Enter payment reference number'
                      className={inputClassName}
                      required
                    />
                    <p className='mt-2 text-sm text-gray-500'>
                      This is the reference number provided when you made the payment at the school office.
                    </p>
                  </div>

                  <div className='bg-blue-50 p-6 rounded-lg border-2 border-blue-200'>
                    <div className='flex items-center gap-3 mb-4'>
                      <Upload className='w-6 h-6 text-blue-700' />
                      <h3 className='font-bold text-blue-900 text-lg'>Document Uploads</h3>
                    </div>
                    <p className='text-blue-800 text-sm mb-6'>
                      Please upload the following documents. All files must be in JPEG, PNG, WebP, or PDF format and under 5MB.
                    </p>

                    <div className='space-y-6'>
                      {/* Student Photo */}
                      <div>
                        <label className={labelClassName}>
                          Student Photo (Passport Size) <span className='text-red-500'>*</span>
                        </label>
                        <FileUploadField
                          name='studentPhoto'
                          accept='image/*'
                          uploadState={fileUploads.studentPhoto}
                          onFileChange={handleFileChange}
                          onRemove={removeFile}
                          description='Recent passport-size photo of the student (in color)'
                        />
                      </div>

                      {/* Birth Certificate */}
                      <div>
                        <label className={labelClassName}>
                          Birth Certificate <span className='text-red-500'>*</span>
                        </label>
                        <FileUploadField
                          name='birthCertificateImage'
                          accept='image/*,.pdf'
                          uploadState={fileUploads.birthCertificateImage}
                          onFileChange={handleFileChange}
                          onRemove={removeFile}
                          description='Photocopy of Birth Certificate attested by a Notary Public'
                        />
                      </div>

                      {/* Report Card */}
                      <div>
                        <label className={labelClassName}>
                          Last Year&apos;s Report Card <span className='text-red-500'>*</span>
                        </label>
                        <FileUploadField
                          name='lastYearReportCardImage'
                          accept='image/*,.pdf'
                          uploadState={fileUploads.lastYearReportCardImage}
                          onFileChange={handleFileChange}
                          onRemove={removeFile}
                          description="Photocopy of last year&apos;s report card"
                        />
                      </div>

                      {/* Passport (Optional) */}
                      <div>
                        <label className={labelClassName}>
                          Passport Copy (Optional)
                        </label>
                        <FileUploadField
                          name='passportImage'
                          accept='image/*,.pdf'
                          uploadState={fileUploads.passportImage}
                          onFileChange={handleFileChange}
                          onRemove={removeFile}
                          description='Passport photocopy of the student (if available)'
                        />
                      </div>

                      {/* Visiting Card (Optional) */}
                      <div>
                        <label className={labelClassName}>
                          Parent's Business Card (Optional)
                        </label>
                        <FileUploadField
                          name='visitingCardImage'
                          accept='image/*,.pdf'
                          uploadState={fileUploads.visitingCardImage}
                          onFileChange={handleFileChange}
                          onRemove={removeFile}
                          description='Business cards of parents or guardians (if available)'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className='flex items-center justify-between mt-8 pt-6 border-t border-gray-200'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type='button'
                    variant='primary'
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    variant='primary'
                    disabled={status === 'loading' || !validateStep(currentStep)}
                    className='min-w-[120px]'
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </Button>
                )}
              </div>
            </Card>
          </form>

          {/* Contact Information */}
          <Card className='mt-8 bg-gradient-to-br from-primary-green-50 to-accent-blue-50 border-2 border-primary-green-200'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                Need Help?
              </h3>
              <p className='text-gray-700 mb-4'>
                If you have any questions about the admission process, please contact us:
              </p>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-700'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Email:</span>
                  <a
                    href={`mailto:${schoolInfo.email.admission}`}
                    className='text-primary-green-600 hover:text-primary-green-700 font-medium'
                  >
                    {schoolInfo.email.admission}
                  </a>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Phone:</span>
                  <a
                    href={`tel:${schoolInfo.phone.uttaraAdmission}`}
                    className='text-primary-green-600 hover:text-primary-green-700 font-medium'
                  >
                    {schoolInfo.phone.uttaraAdmission}
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </main>
  )
}
