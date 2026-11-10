'use client'

import React, { useId, useState } from 'react'
import { schoolInfo } from '@/data/schoolInfo'
import Button from '../ui/Button'

/**
 * Newsletter sign-up. There is no mailing-list service connected yet, so this
 * opens the visitor's e-mail app with a ready-made request to the school office.
 * Replace the handler when a provider is chosen.
 */
export default function NewsletterForm() {
  const id = useId()
  const [sent, setSent] = useState(false)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = String(new FormData(event.currentTarget).get('email') || '').trim()
    if (!email) return
    const subject = encodeURIComponent('Newsletter sign-up')
    const body = encodeURIComponent(`Please add ${email} to the IHSB newsletter.`)
    window.location.href = `mailto:${schoolInfo.email.general}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className='max-w-md'>
      <label htmlFor={id} className='font-display text-lg font-semibold text-ink'>
        School news by email
      </label>
      <p className='mt-1 text-sm text-ink-subtle'>Admission dates, events and results, a few times a term.</p>
      <div className='mt-4 flex flex-col gap-2 xs:flex-row'>
        <input
          id={id}
          name='email'
          type='email'
          required
          autoComplete='email'
          spellCheck={false}
          placeholder='you@example.com…'
          className='min-h-11 w-full min-w-0 flex-1 rounded-full border border-line-strong bg-white/5 px-4 text-[0.9375rem] text-ink placeholder:text-ink-subtle'
        />
        <Button type='submit' variant='secondary'>
          Subscribe
        </Button>
      </div>
      <p aria-live='polite' className='mt-2 min-h-5 text-sm text-gold'>
        {sent ? 'Your email app has opened. Send the message to finish signing up.' : ''}
      </p>
    </form>
  )
}
