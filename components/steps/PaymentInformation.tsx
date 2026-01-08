import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface PaymentInformationProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  register,
  errors
}) => {
  return (
    <section className='bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-200'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2'>
          Payment Information
        </h2>
        <p className='text-gray-600 text-sm'>
          Please provide your payment details. We accept SSL (local payments)
          and Visa/Mastercard.
        </p>
      </div>

      {/* Payment Method Selection */}
      <div className='mb-6'>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Payment Method <span className='text-red-500'>*</span>
        </label>
        <div className='flex gap-4'>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='SSL'
              {...register('paymentMethod')}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <span className='ml-2 text-sm text-gray-700'>
              SSL (Local Payment)
            </span>
          </label>
          <label className='inline-flex items-center'>
            <input
              type='radio'
              value='Visa/Mastercard'
              {...register('paymentMethod')}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <span className='ml-2 text-sm text-gray-700'>Visa/Mastercard</span>
          </label>
        </div>
        {errors.paymentMethod && (
          <p className='mt-1 text-sm text-red-500'>
            {(errors.paymentMethod as { message?: string })?.message}
          </p>
        )}
      </div>

      {/* SSL Payment Details */}
      <div className='mb-6'>
        <label
          htmlFor='sslTransactionId'
          className='block text-sm font-medium text-gray-700'
        >
          SSL Transaction ID <span className='text-red-500'>*</span>
        </label>
        <input
          id='sslTransactionId'
          type='text'
          {...register('sslTransactionId')}
          className={`mt-1 block w-full p-2 border ${
            errors.sslTransactionId ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
          placeholder='Enter your SSL transaction ID'
        />
        {errors.sslTransactionId && (
          <p className='mt-1 text-sm text-red-500'>
            {(errors.sslTransactionId as { message?: string })?.message}
          </p>
        )}
      </div>

      {/* Visa/Mastercard Payment Details */}
      <div className='mb-6'>
        <label
          htmlFor='cardNumber'
          className='block text-sm font-medium text-gray-700'
        >
          Card Number <span className='text-red-500'>*</span>
        </label>
        <input
          id='cardNumber'
          type='text'
          {...register('cardNumber')}
          className={`mt-1 block w-full p-2 border ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
          placeholder='Enter your card number'
        />
        {errors.cardNumber && (
          <p className='mt-1 text-sm text-red-500'>
            {(errors.cardNumber as { message?: string })?.message}
          </p>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* Expiry Date */}
        <div>
          <label
            htmlFor='expiryDate'
            className='block text-sm font-medium text-gray-700'
          >
            Expiry Date <span className='text-red-500'>*</span>
          </label>
          <input
            id='expiryDate'
            type='text'
            {...register('expiryDate')}
            className={`mt-1 block w-full p-2 border ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            placeholder='MM/YY'
          />
          {errors.expiryDate && (
            <p className='mt-1 text-sm text-red-500'>
              {(errors.expiryDate as { message?: string })?.message}
            </p>
          )}
        </div>

        {/* CVV */}
        <div>
          <label
            htmlFor='cvv'
            className='block text-sm font-medium text-gray-700'
          >
            CVV <span className='text-red-500'>*</span>
          </label>
          <input
            id='cvv'
            type='text'
            {...register('cvv')}
            className={`mt-1 block w-full p-2 border ${
              errors.cvv ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
            placeholder='Enter CVV'
          />
          {errors.cvv && (
            <p className='mt-1 text-sm text-red-500'>
              {(errors.cvv as { message?: string })?.message}
            </p>
          )}
        </div>
      </div>

      {/* Payment Reference (bKash) */}
      <div className='mb-6'>
        <label
          htmlFor='paymentReference'
          className='block text-sm font-medium text-gray-700'
        >
          Payment Reference (bKash) <span className='text-red-500'>*</span>
        </label>
        <input
          id='paymentReference'
          type='text'
          {...register('paymentReference')}
          className={`mt-1 block w-full p-2 border ${
            errors.paymentReference ? 'border-red-500' : 'border-gray-300'
          } rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300 transition-colors`}
          placeholder='Enter your bKash transaction ID'
        />
        {errors.paymentReference && (
          <p className='mt-1 text-sm text-red-500'>
            {(errors.paymentReference as { message?: string })?.message}
          </p>
        )}
      </div>

      {/* Payment Confirmation */}
      <div className='mt-8 border-t border-gray-200 pt-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          Payment Confirmation
        </h3>
        <div className='flex items-start'>
          <input
            type='checkbox'
            id='paymentConfirmation'
            {...register('paymentConfirmation')}
            className='mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
          />
          <label
            htmlFor='paymentConfirmation'
            className='ml-2 block text-sm text-gray-700'
          >
            I confirm that the payment details provided above are accurate.
          </label>
        </div>
        {errors.paymentConfirmation && (
          <p className='mt-2 text-sm text-red-500'>
            {(errors.paymentConfirmation as { message?: string })?.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default PaymentInformation

