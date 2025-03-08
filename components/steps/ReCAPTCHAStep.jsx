import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { Controller } from 'react-hook-form'

const ReCAPTCHAStep = ({ control, errors }) => {
  return (
    <section>
      <h2 className='text-xl font-semibold mb-4'>ReCAPTCHA</h2>
      <div className='mb-4'>
        <Controller
          name='recaptcha'
          control={control}
          render={({ field }) => (
            <ReCAPTCHA
              sitekey='YOUR_RECAPTCHA_SITE_KEY'
              onChange={(value) => field.onChange(value)}
              onExpired={() => field.onChange('')}
            />
          )}
        />
        {errors.recaptcha && (
          <p className='mt-1 text-sm text-red-500'>
            {errors.recaptcha.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default ReCAPTCHAStep
