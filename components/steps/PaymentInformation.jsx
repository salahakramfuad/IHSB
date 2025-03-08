import React from 'react'

const PaymentInformation = ({ register, errors }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>
      <div className='mb-4'>
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
          } rounded-md focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.paymentReference && (
          <p className='mt-1 text-sm text-red-500'>
            {errors.paymentReference.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default PaymentInformation
