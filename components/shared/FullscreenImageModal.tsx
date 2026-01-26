'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface FullscreenImageModalProps {
  images: string[]
  currentIndex: number
  onClose: () => void
  alt?: string
}

export default function FullscreenImageModal({
  images,
  currentIndex: initialIndex,
  onClose,
  alt = 'Image'
}: FullscreenImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isMounted, setIsMounted] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [images.length])

  useEffect(() => {
    setIsMounted(true)
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }, [currentIndex])

  // Handle zoom
  const handleZoom = useCallback((delta: number) => {
    setZoom((prev) => {
      const newZoom = Math.max(1, Math.min(5, prev + delta))
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 })
      }
      return newZoom
    })
  }, [])

  // Handle drag when zoomed
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1 && e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      })
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1 && e.touches.length === 1) {
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Focus trap and accessibility
  useEffect(() => {
    if (!isMounted) return

    previousActiveElement.current = document.activeElement as HTMLElement

    if (closeButtonRef.current) {
      closeButtonRef.current.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      } else if (e.key === '+' || e.key === '=') {
        handleZoom(0.2)
      } else if (e.key === '-') {
        handleZoom(-0.2)
      } else if (e.key === '0') {
        setZoom(1)
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        handleZoom(e.deltaY > 0 ? -0.1 : 0.1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [isMounted, onClose, goToPrevious, goToNext, handleZoom])

  // Don't render if not mounted or no images
  if (!isMounted) return null
  if (!images || images.length === 0) return null

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={(e) => {
        if (e.target === modalRef.current) {
          onClose()
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen image viewer: ${alt} ${currentIndex + 1} of ${images.length}`}
      style={{
        animation: 'fadeIn 0.15s ease-out forwards'
      }}
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Close image viewer"
      >
        <X size={28} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleZoom(-0.2)
          }}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          aria-label="Zoom out"
          disabled={zoom <= 1}
        >
          <ZoomOut size={20} />
        </button>
        <span className="text-white text-sm font-medium min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleZoom(0.2)
          }}
          className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
          aria-label="Zoom in"
          disabled={zoom >= 5}
        >
          <ZoomIn size={20} />
        </button>
        {zoom > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              setZoom(1)
              setPosition({ x: 0, y: 0 })
            }}
            className="ml-2 px-3 py-1 text-xs text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Reset zoom"
          >
            Reset
          </button>
        )}
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div 
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image Container */}
      <div
        ref={imageRef}
        className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: zoom > 1 ? 'none' : 'auto'
        }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1} of ${images.length}`}
            fill
            className="object-contain"
            priority
            sizes="100vw"
            quality={95}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs text-center space-y-1 pointer-events-none">
        <p>Use mouse wheel + Ctrl/Cmd to zoom • Arrow keys to navigate • ESC to close</p>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
