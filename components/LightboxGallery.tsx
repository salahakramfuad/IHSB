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
  const thumbsArr = thumbs?.length ? thumbs : images

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
    document.documentElement.style.overflow = 'hidden'
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    document.documentElement.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft')
        setIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length, close])

  return (
    <>
      {/* Clickable thumbnails */}
      <div
        className={
          className ?? 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'
        }
      >
        {thumbsArr.map((src, i) => (
          <button
            key={i}
            type='button'
            onClick={() => openAt(i)}
            className='group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-primary-green-500'
          >
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              fill
              sizes='(max-width: 768px) 50vw, 25vw'
              className='object-cover transition-transform duration-300 group-hover:scale-105'
              // unoptimized
            />
          </button>
        ))}
      </div>

      {/* Overlay/backdrop: ONLY mounted when open */}
      {open && (
        <div
          role='dialog'
          aria-modal='true'
          aria-labelledby={labelId}
          aria-describedby={descId}
          className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
          onClick={close}
        >
          <div
            className='absolute inset-0 flex items-center justify-center p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative w-full max-w-5xl aspect-[16/10]'>
              <Image
                src={images[index]}
                alt={`Photo ${index + 1}`}
                fill
                sizes='100vw'
                className='object-contain'
                priority
              />
            </div>

            <button
              type='button'
              onClick={close}
              className='absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-white'
              aria-label='Close'
            >
              Close
            </button>
            <button
              type='button'
              onClick={() =>
                setIndex((i) => (i - 1 + images.length) % images.length)
              }
              className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-white'
              aria-label='Previous image'
            >
              ‹
            </button>
            <button
              type='button'
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-gray-900 hover:bg-white'
              aria-label='Next image'
            >
              ›
            </button>

            {(leadTitle || leadCaption) && (
              <div className='absolute bottom-4 left-1/2 w-[min(90vw,56rem)] -translate-x-1/2 rounded-xl bg-black/60 p-3 text-center text-white'>
                {leadTitle && (
                  <div id={labelId} className='text-sm font-semibold'>
                    {leadTitle}
                  </div>
                )}
                {leadCaption && (
                  <div id={descId} className='text-xs opacity-90'>
                    {leadCaption}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
