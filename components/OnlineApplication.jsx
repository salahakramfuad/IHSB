import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'

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

  const [recaptchaKey, setRecaptchaKey] = useState(Date.now())
  const [currentStep, setCurrentStep] = useState(1)
  const onMedication = watch('onMedication')

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

  // Reusable Form Components
  const FormInput = ({
    label,
    name,
    type = 'text',
    required = false,
    ...rest
  }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className={`mt-1 block w-full p-2 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:ring-blue-500 focus:border-blue-500`}
        {...rest}
      />
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  )

  const FormSelect = ({ label, name, options, required = false }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`mt-1 block w-full p-2 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:ring-blue-500 focus:border-blue-500`}
      >
        <option value=''>Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  )

  const FormFileInput = ({ label, name, accept, required = false }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <input
        id={name}
        type='file'
        accept={accept}
        {...register(name)}
        className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
      />
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  )

  const FormCheckbox = ({ label, name }) => (
    <label
      htmlFor={name}
      className='inline-flex items-center mt-3'
      style={{ zIndex: 10 }}
    >
      <input
        id={name}
        type='checkbox'
        {...register(name)}
        className='form-checkbox h-4 w-4 text-blue-600'
      />
      <span className='ml-2 text-sm text-gray-700'>{label}</span>
    </label>
  )

  const FormRadioGroup = ({ label, name, options, required = false }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label className='block text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <div className='flex gap-4 mt-2'>
        {options.map((option) => (
          <label key={option.value} className='inline-flex items-center'>
            <input
              type='radio'
              value={option.value}
              {...register(name)}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <span className='ml-2 text-sm text-gray-700'>{option.label}</span>
          </label>
        ))}
      </div>
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  )

  const FormTextarea = ({ label, name, required = false }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label} {required && <span className='text-red-500'>*</span>}
      </label>
      <textarea
        id={name}
        {...register(name)}
        rows='3'
        className={`mt-1 block w-full p-2 border ${
          errors[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:ring-blue-500 focus:border-blue-500`}
      ></textarea>
      {errors[name] && (
        <p className='mt-1 text-sm text-red-500'>{errors[name].message}</p>
      )}
    </div>
  )

  const FormCheckboxGroup = ({ label, options }) => (
    <div className='mb-4' style={{ zIndex: 10 }}>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='flex flex-wrap gap-4 mt-2'>
        {options.map((option) => (
          <FormCheckbox
            key={option.name}
            label={option.label}
            name={option.name}
          />
        ))}
      </div>
    </div>
  )

  const SiblingFields = ({ prefix }) => (
    <div
      className='grid grid-cols-1 md:grid-cols-3 gap-4'
      style={{ zIndex: 10 }}
    >
      <FormInput label='Name' name={`${prefix}Name`} />
      <FormInput label='IHSB No' name={`${prefix}IHSBNo`} />
      <FormInput label='Class' name={`${prefix}Class`} />
    </div>
  )

  const steps = [
    {
      title: 'School Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>School Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <FormSelect
              label='Branch'
              name='branch'
              options={[
                { value: 'Branch A', label: 'Branch A' },
                { value: 'Branch B', label: 'Branch B' }
              ]}
              required
            />
            <FormInput label='Academic Year' name='academicYear' required />
            <FormInput
              label='Application Number'
              name='applicationNumber'
              required
            />
          </div>
        </section>
      )
    },
    {
      title: 'Student Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Student Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormInput
              label='Surname (As per birth certificate)'
              name='surname'
              required
            />
            <FormInput label='Student Name' name='studentName' required />
            <FormInput
              label='Date of Birth'
              name='dateOfBirth'
              type='date'
              required
            />
            <FormSelect
              label='Gender'
              name='gender'
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
              required
            />
            <FormInput label='Religion' name='religion' />
            <FormSelect
              label='Nationality'
              name='nationality'
              options={[
                { value: 'Bangladeshi', label: 'Bangladeshi' },
                { value: 'Other', label: 'Other' }
              ]}
              required
            />
            <FormSelect
              label='Class Applied For'
              name='classAppliedFor'
              options={[
                { value: 'Class 1', label: 'Class 1' },
                { value: 'Class 2', label: 'Class 2' },
                { value: 'Class 3', label: 'Class 3' }
              ]}
              required
            />
            <FormSelect
              label='Blood Group'
              name='bloodGroup'
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' }
              ]}
            />
            <FormInput label='Passport (If any)' name='passport' />
          </div>
        </section>
      )
    },
    {
      title: 'Address Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Address Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormTextarea
              label='Present Address'
              name='presentAddress'
              required
            />
            <FormTextarea
              label='Permanent Address'
              name='permanentAddress'
              required
            />
          </div>
        </section>
      )
    },
    {
      title: 'Parent Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Parent Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormInput label="Father's Name" name='fatherName' required />
            <FormInput label="Father's Occupation" name='fatherOccupation' />
            <FormInput
              label="Father's Contact Number"
              name='fatherContact'
              required
            />
            <FormInput label="Father's Email" name='fatherEmail' type='email' />
            <FormInput label="Mother's Name" name='motherName' />
            <FormInput label="Mother's Occupation" name='motherOccupation' />
            <FormInput label="Mother's Contact Number" name='motherContact' />
            <FormInput label="Mother's Email" name='motherEmail' type='email' />
          </div>
        </section>
      )
    },
    {
      title: 'Document Uploads',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Document Uploads</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormFileInput
              label='Student Photo (JPEG/PNG)'
              name='studentPhoto'
              accept='image/*'
              required
            />
            <FormFileInput
              label='Birth Certificate (JPEG/PNG)'
              name='birthCertificateImage'
              accept='image/*'
              required
            />
            <FormFileInput
              label="Last Year's Report Card"
              name='lastYearReportCardImage'
              accept='image/*,application/pdf'
            />
            <FormFileInput
              label='Passport Copy'
              name='passportImage'
              accept='image/*,application/pdf'
            />
            <FormFileInput
              label='Visiting/Business Card'
              name='visitingCardImage'
              accept='image/*'
            />
          </div>
        </section>
      )
    },
    {
      title: 'Additional Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Additional Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormInput label='Last School Attended' name='lastSchoolAttended' />
            <FormInput label='Last School Class' name='lastSchoolClass' />
            <FormInput label='Last School Year' name='lastSchoolYear' />
            <FormInput
              label='Language Spoken at Home'
              name='languageSpokenAtHome'
            />
          </div>

          <FormCheckboxGroup
            label='Check If Applicable:'
            options={[
              { name: 'fatherDeceased', label: 'Father Deceased' },
              { name: 'motherDeceased', label: 'Mother Deceased' },
              { name: 'parentsSeparated', label: 'Parents Separated' },
              { name: 'fatherRemarried', label: 'Father Remarried' },
              { name: 'parentsDivorced', label: 'Parents Divorced' },
              { name: 'motherRemarried', label: 'Mother Remarried' }
            ]}
          />

          <FormSelect
            label='Student Living With'
            name='studentLivingWith'
            options={[
              { value: 'Both Parents', label: 'Both Parents' },
              { value: 'Mother', label: 'Mother' },
              { value: 'Father', label: 'Father' },
              { value: 'Guardian', label: 'Guardian' }
            ]}
          />

          <FormRadioGroup
            label='Is the student on medication?'
            name='onMedication'
            options={[
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ]}
          />

          {onMedication && (
            <FormInput
              label='Name of Medication'
              name='medicationName'
              required
            />
          )}

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Siblings (in IHSB)
            </label>
            <SiblingFields prefix='sibling1' />
            <SiblingFields prefix='sibling2' />
          </div>

          <FormTextarea
            label='Allergies, Physical Difficulties, or Special Needs'
            name='allergiesOrSpecialNeeds'
          />

          <FormTextarea
            label='Any Other Relevant Information'
            name='otherRelevantInfo'
          />
        </section>
      )
    },
    {
      title: 'Payment Information',
      content: (
        <section>
          <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>
          <FormInput
            label='Payment Reference (bKash)'
            name='paymentReference'
            required
          />
        </section>
      )
    },
    {
      title: 'ReCAPTCHA',
      content: (
        <section>
          <Controller
            name='recaptcha'
            control={control}
            render={({ field }) => (
              <ReCAPTCHA
                sitekey='YOUR_RECAPTCHA_SITE_KEY'
                onChange={(value) => field.onChange(value)}
                onExpired={() => field.onChange('')}
                key={recaptchaKey}
              />
            )}
          />
          {errors.recaptcha && (
            <p className='mt-1 text-sm text-red-500'>
              {errors.recaptcha.message}
            </p>
          )}
        </section>
      )
    }
  ]

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
  }

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg'
    >
      <h1 className='text-2xl font-bold text-center mb-6'>
        ADMISSION APPLICATION FORM
      </h1>

      <div className='space-y-8'>
        {steps[currentStep - 1].content}

        <div className='flex justify-between'>
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
      </div>
    </form>
  )
}

export default AdmissionForm
