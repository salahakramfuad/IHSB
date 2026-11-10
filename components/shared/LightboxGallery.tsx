'use client'

import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog as HeadlessDialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GalleryImage {
  src: string
  /** Describes the photo; also shown as the caption in the viewer */
  caption: string
}

interface LightboxGalleryProps {
  images: GalleryImage[]
  /** `masonry` = columns of mixed heights, `grid` = even tiles */
  layout?: 'masonry' | 'grid'
  className?: string
}

/** Tile heights that repeat down the masonry columns */
const RATIOS = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[16/11]']

/**
 * Photo gallery with a full-screen viewer. Thumbnails are buttons; the viewer
 * is a modal dialog with Previous/Next buttons and Left/Right arrow keys.
 */
export default function LightboxGallery({ images, layout = 'masonry', className }: LightboxGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)
  const open = index !== null
  const count = images.length

  const step = useCallback(
    (direction: 1 | -1) => setIndex((current) => (current === null ? current : (current + direction + count) % count)),
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

  if (count === 0) return null
  const current = index !== null ? images[index] : null
  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-fast hover:bg-white/25'

  return (
    <>
      <ul
        className={cn(
          layout === 'masonry' ? 'columns-2 gap-4 md:columns-3 lg:columns-4 [&>li]:mb-4' : 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4',
          className
        )}
      >
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`} className='break-inside-avoid'>
            <button
              type='button'
              onClick={() => setIndex(i)}
              aria-label={`View photo: ${image.caption}`}
              className={cn(
                'group relative block w-full overflow-hidden rounded-lg bg-sunken',
                layout === 'masonry' ? RATIOS[i % RATIOS.length] : 'aspect-[4/3]'
              )}
            >
              <Image
                src={image.src}
                alt={image.caption}
                fill
                sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className='object-cover transition-transform duration-slow ease-out group-hover:scale-105'
              />
              <span className='absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-brand-950/90 to-transparent px-3 pb-3 pt-10 text-left text-sm text-white opacity-0 transition-[opacity,transform] duration-base group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'>
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <HeadlessDialog open={open} onClose={() => setIndex(null)} className='relative z-modal'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-brand-950/95 transition-opacity duration-base data-[closed]:opacity-0'
        />
        <div className='fixed inset-0 flex flex-col overscroll-contain p-4 sm:p-6'>
          <DialogPanel className='on-dark flex min-h-0 flex-1 flex-col'>
            <div className='flex items-center justify-between gap-4'>
              <DialogTitle className='text-sm text-ink-muted'>
                Photo {index !== null ? index + 1 : 1} of {count}
              </DialogTitle>
              <button type='button' onClick={() => setIndex(null)} aria-label='Close viewer' className={controlClass}>
                <X className='h-5 w-5' aria-hidden />
              </button>
            </div>

            {current && (
              <figure className='flex min-h-0 flex-1 flex-col items-center justify-center gap-4 py-4'>
                <div className='relative min-h-0 w-full flex-1'>
                  <Image key={current.src} src={current.src} alt={current.caption} fill sizes='100vw' className='object-contain' />
                </div>
                <figcaption aria-live='polite' className='max-w-2xl text-center text-[0.9375rem] text-ink'>
                  {current.caption}
                </figcaption>
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
    </>
  )
}
