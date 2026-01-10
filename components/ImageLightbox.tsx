'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  alt?: string
}

export default function ImageLightbox({
  images,
  currentIndex: initialIndex,
  onClose,
  alt = 'Image'
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Focus trap and accessibility
  useEffect(() => {
    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    // Focus the close button when lightbox opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    // Focus trap: keep focus within lightbox
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !lightboxRef.current) return

      const focusableElements = lightboxRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keydown', handleTabKey)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keydown', handleTabKey)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [onClose, goToPrevious, goToNext])

  if (images.length === 0) return null

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${alt} ${currentIndex + 1} of ${images.length}`}
      style={{
        animation: 'fadeIn 0.2s ease-in-out forwards'
      }}
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/90"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/90"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/90"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image Container */}
      <div
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'zoomIn 0.3s ease-out forwards'
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    </div>
  )
}
