'use client'

import React from 'react'
import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface OverlayProps {
  open: boolean
  onClose: () => void
  title: string
  /** Hide the title visually when the content already makes it obvious */
  hideTitle?: boolean
  children: React.ReactNode
  className?: string
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type='button'
      onClick={onClose}
      aria-label='Close'
      className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-sunken hover:text-ink'
    >
      <X className='h-5 w-5' aria-hidden />
    </button>
  )
}

/** Centred modal dialog (focus trap, Escape and backdrop close, scroll lock). */
export function Dialog({ open, onClose, title, hideTitle, children, className }: OverlayProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className='relative z-modal'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-base data-[closed]:opacity-0'
      />
      <div className='fixed inset-0 flex items-center justify-center overflow-y-auto overscroll-contain p-4'>
        <DialogPanel
          transition
          className={cn(
            'w-full max-w-lg rounded-xl border border-line bg-paper p-6 shadow-floating transition-[opacity,transform] duration-base ease-out data-[closed]:translate-y-3 data-[closed]:opacity-0',
            className
          )}
        >
          <div className='mb-4 flex items-start justify-between gap-4'>
            <DialogTitle className={cn('font-display text-title text-ink', hideTitle && 'sr-only')}>{title}</DialogTitle>
            <CloseButton onClose={onClose} />
          </div>
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  )
}

/** Panel that slides in from the right edge. */
export function Drawer({ open, onClose, title, hideTitle, children, className }: OverlayProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className='relative z-modal'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-base data-[closed]:opacity-0'
      />
      <div className='fixed inset-0 flex justify-end'>
        <DialogPanel
          transition
          className={cn(
            'flex h-full w-[min(26rem,90vw)] flex-col overscroll-contain bg-paper shadow-floating transition-transform duration-base ease-out data-[closed]:translate-x-full motion-reduce:transition-none',
            className
          )}
        >
          <div className='flex h-nav shrink-0 items-center justify-between gap-4 border-b border-line px-5'>
            <DialogTitle className={cn('font-display text-lg font-semibold text-ink', hideTitle && 'sr-only')}>
              {title}
            </DialogTitle>
            <CloseButton onClose={onClose} />
          </div>
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  )
}
