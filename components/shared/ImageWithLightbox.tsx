'use client'

import { useCallback, useEffect, useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageWithLightboxProps extends Omit<ImageProps, 'onClick'> {
  gallery?: string[]
  lightbox?: boolean
}

function toSrc(src: ImageProps['src']): string {
  if (typeof src === 'string') return src
  if (src && typeof src === 'object') {
    if ('src' in src && typeof src.src === 'string') return src.src
    if ('default' in src && typeof src.default === 'string') return src.default
  }
  return ''
}

export default function ImageWithLightbox({
  src,
  alt,
  gallery,
  lightbox = true,
  className = '',
  ...props
}: ImageWithLightboxProps) {
  const [index, setIndex] = useState<number | null>(null)
  const imageSrc = toSrc(src)
  const images = (gallery?.filter((item) => typeof item === 'string' && item.trim() !== '') ?? []).length
    ? gallery!.filter((item) => typeof item === 'string' && item.trim() !== '')
    : imageSrc
      ? [imageSrc]
      : []

  const open = index !== null
  const count = images.length
  const current = index !== null ? images[index] : null

  const step = useCallback(
    (direction: 1 | -1) => setIndex((currentIndex) => (currentIndex === null ? currentIndex : (currentIndex + direction + count) % count)),
    [count]
  )

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, step])

  if (!imageSrc) return null

  const usingFill = props.fill !== undefined
  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'

  return (
    <>
      <div
        className={cn(usingFill && 'relative h-full w-full', lightbox && 'cursor-pointer', className)}
        role={lightbox ? 'button' : undefined}
        tabIndex={lightbox ? 0 : undefined}
        aria-label={lightbox ? `View photo: ${alt || 'Image'}` : undefined}
        onClick={() => {
          if (!lightbox || images.length === 0) return
          const found = images.findIndex((item) => item === imageSrc)
          setIndex(found >= 0 ? found : 0)
        }}
        onKeyDown={(event) => {
          if (!lightbox) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            const found = images.findIndex((item) => item === imageSrc)
            setIndex(found >= 0 ? found : 0)
          }
        }}
      >
        <Image src={imageSrc} alt={alt || ''} className={className} {...props} />
      </div>

      {lightbox && (
        <HeadlessDialog open={open} onClose={() => setIndex(null)} className='relative z-modal'>
          <DialogBackdrop transition className='fixed inset-0 bg-brand-950/95 transition-opacity data-[closed]:opacity-0' />
          <div className='fixed inset-0 flex flex-col p-4 sm:p-6'>
            <DialogPanel className='flex min-h-0 flex-1 flex-col text-white'>
              <div className='flex items-center justify-between gap-4'>
                <DialogTitle className='text-sm text-white/70'>
                  Photo {index !== null ? index + 1 : 1} of {count}
                </DialogTitle>
                <button type='button' onClick={() => setIndex(null)} aria-label='Close viewer' className={controlClass}>
                  <X className='h-5 w-5' aria-hidden />
                </button>
              </div>
              {current && (
                <figure className='relative flex min-h-0 flex-1 items-center justify-center py-4'>
                  <Image src={current} alt={alt || ''} fill sizes='100vw' className='object-contain' />
                </figure>
              )}
              {count > 1 && (
                <div className='flex items-center justify-center gap-3'>
                  <button type='button' onClick={() => step(-1)} aria-label='Previous photo' className={controlClass}>
                    <ChevronLeft className='h-5 w-5' aria-hidden />
                  </button>
                  <button type='button' onClick={() => step(1)} aria-label='Next photo' className={controlClass}>
                    <ChevronRight className='h-5 w-5' aria-hidden />
                  </button>
                </div>
              )}
            </DialogPanel>
          </div>
        </HeadlessDialog>
      )}
    </>
  )
}
