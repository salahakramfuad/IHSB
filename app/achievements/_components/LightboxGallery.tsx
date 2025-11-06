'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useState } from 'react'

type Props = {
  images: string[]
  thumbs?: string[]
  leadTitle?: string
  leadCaption?: string
  className?: string
}

export default function LightboxGallery({
  images,
  thumbs,
  leadTitle,
  leadCaption,
  className
}: Props) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const labelId = useId()
  const descId = useId()

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  )

  // ESC/Arrows + lock scroll only when modal is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [open, close, prev, next])

  if (!images?.length) return null

  const Tile = ({
    src,
    i,
    isLead = false
  }: {
    src: string
    i: number
    isLead?: boolean
  }) => (
    <button
      type='button'
      onClick={() => openAt(i)}
      className={`group relative block overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10 ${
        isLead ? 'aspect-[16/9]' : 'aspect-[4/3]'
      }`}
      aria-label={`Open image ${i + 1}${isLead ? ' (lead)' : ''}`}
    >
      <Image
        src={thumbs?.[i] ?? src}
        alt={leadTitle ? `${leadTitle} - photo ${i + 1}` : `Photo ${i + 1}`}
        fill
        sizes={isLead ? '100vw' : '(max-width: 768px) 50vw, 25vw'}
        className='object-cover transition group-hover:scale-[1.02] group-hover:brightness-95'
        priority={isLead}
      />
      {/* Decorative overlays never intercept clicks */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-black/0' />
      {isLead && (
        <div className='pointer-events-none absolute inset-0 flex items-end'>
          <div className='w-full p-4 sm:p-6'>
            {leadTitle && (
              <h1 className='text-2xl sm:text-3xl font-extrabold text-white drop-shadow'>
                {leadTitle}
              </h1>
            )}
          </div>
        </div>
      )}
      <span className='pointer-events-none absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] text-white opacity-0 group-hover:opacity-100 transition'>
        View
      </span>
    </button>
  )

  return (
    <div className={className}>
      {/* Lead banner with overlaid title; caption below */}
      <div className='overflow-hidden rounded-2xl bg-white dark:bg-[#111827] ring-1 ring-black/5 dark:ring-white/10'>
        <Tile src={images[0]} i={0} isLead />
        {leadCaption && (
          <div className='p-6'>
            <p className='text-gray-800 dark:text-[#E6EEF2]/85 leading-relaxed'>
              {leadCaption}
            </p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <section className='mt-8'>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-[#E6EEF2] mb-3'>
            Event Photos
          </h2>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
            {images.slice(1).map((src, i) => (
              <div key={`${src}-${i + 1}`} className='relative'>
                <Tile src={src} i={i + 1} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal (only renders when open) */}
      {open && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4'
          role='dialog'
          aria-modal='true'
          aria-labelledby={labelId}
          aria-describedby={descId}
          onClick={close} // backdrop closes
        >
          <div
            className='relative w-full max-w-6xl max-h-[90vh] rounded-xl outline-none'
            onClick={(e) => e.stopPropagation()} // keep clicks inside modal from closing
          >
            <div className='relative h-[70vh] w-full'>
              <Image
                src={images[index]}
                alt={`Photo ${index + 1}`}
                fill
                sizes='100vw'
                className='object-contain'
                priority
              />
            </div>
            <div className='mt-3 flex items-center justify-between text-white'>
              <span id={labelId} className='text-sm opacity-80'>
                {index + 1} / {images.length}
              </span>
              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  onClick={prev}
                  className='rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                >
                  ← Prev
                </button>
                <button
                  type='button'
                  onClick={next}
                  className='rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                >
                  Next →
                </button>
                <button
                  type='button'
                  onClick={close}
                  className='rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                  aria-describedby={descId}
                >
                  Close (Esc)
                </button>
              </div>
            </div>
            <p id={descId} className='sr-only'>
              Use left and right arrow keys to navigate. Press Escape to close.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
