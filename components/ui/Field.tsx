import React from 'react'
import { cn } from '../../lib/utils'

/** Shared look for text inputs, selects and textareas. */
export const inputClass =
  'block min-h-11 w-full rounded-md border border-line-strong bg-paper px-3.5 py-2.5 text-base text-ink placeholder:text-ink-subtle transition-[border-color,box-shadow] duration-fast hover:border-ink-subtle aria-[invalid=true]:border-danger'

export const labelClass = 'mb-1.5 block text-[0.9375rem] font-semibold text-ink'

interface FieldProps {
  label: string
  /** id of the control inside; connects the label, hint and error */
  htmlFor: string
  required?: boolean
  hint?: string
  error?: string | null
  className?: string
  children: React.ReactNode
}

/**
 * Label + control + hint + inline error. Give the control
 * `aria-describedby={`${id}-hint ${id}-error`}` and `aria-invalid` when it has an error.
 */
export default function Field({ label, htmlFor, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
        {required && (
          <span className='ml-1 text-danger' aria-hidden>
            *
          </span>
        )}
        {required && <span className='sr-only'> (required)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className='mt-1.5 text-sm text-ink-subtle'>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${htmlFor}-error`} role='alert' className='mt-1.5 text-sm font-medium text-danger'>
          {error}
        </p>
      )}
    </div>
  )
}
