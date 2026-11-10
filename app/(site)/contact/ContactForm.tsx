'use client'

import React, { useRef, useState } from 'react'
import Button from '@/components/ui/Button'
import Field, { inputClass } from '@/components/ui/Field'
import { getRecaptchaToken } from '@/lib/security/recaptchaClient'

type Status = 'idle' | 'loading' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter an email address like name@example.com.'
  if (values.message.trim().length < 10) errors.message = 'Write at least 10 characters so we can help.'
  return errors
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (errors[name as keyof Errors]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const found = validate(formData)
    setErrors(found)
    const firstInvalid = (['name', 'email', 'message'] as const).find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: await getRecaptchaToken('contact_submit')
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const describe = (field: keyof Errors) => (errors[field] ? `${field}-error` : undefined)

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className='space-y-5'>
      <Field label='Full name' htmlFor='name' required error={errors.name}>
        <input
          id='name'
          name='name'
          type='text'
          autoComplete='name'
          value={formData.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe('name')}
          className={inputClass}
        />
      </Field>
      <Field label='Email address' htmlFor='email' required error={errors.email}>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          spellCheck={false}
          placeholder='name@example.com…'
          value={formData.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe('email')}
          className={inputClass}
        />
      </Field>
      <Field label='Message' htmlFor='message' required error={errors.message}>
        <textarea
          id='message'
          name='message'
          rows={6}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe('message')}
          className={inputClass}
        />
      </Field>

      <Button type='submit' size='lg' loading={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </Button>

      <p aria-live='polite' className='min-h-6 text-[0.9375rem]'>
        {status === 'success' && (
          <span className='font-medium text-brand'>Message sent. We will reply to your email address.</span>
        )}
        {status === 'error' && (
          <span className='font-medium text-danger'>
            The message could not be sent. Check your connection and try again, or phone the front office.
          </span>
        )}
      </p>
      <p className='text-sm text-ink-subtle'>
        This form is protected by reCAPTCHA. Google&rsquo;s Privacy Policy and Terms of Service apply.
      </p>
    </form>
  )
}
