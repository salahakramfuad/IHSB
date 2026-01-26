'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import FullscreenImageModal from './FullscreenImageModal'

interface ImageWithLightboxProps extends Omit<ImageProps, 'onClick'> {
  gallery?: string[] // Optional array of images for gallery navigation
  lightbox?: boolean // Enable/disable lightbox (default: true)
}

export default function ImageWithLightbox({
  src,
  alt,
  gallery,
  lightbox = true,
  className = '',
  ...props
}: ImageWithLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Normalize src to string
  let imageSrc = ''
  if (typeof src === 'string') {
    imageSrc = src
  } else if (src && typeof src === 'object') {
    if ('src' in src && typeof src.src === 'string') {
      imageSrc = src.src
    } else if ('default' in src && typeof src.default === 'string') {
      imageSrc = src.default
    }
  }

  // Validate that we have a valid image source
  if (!imageSrc || typeof imageSrc !== 'string' || imageSrc.trim() === '') {
    return null
  }

  // Filter out empty strings and normalize gallery images
  const normalizeImage = (img: any): string => {
    if (typeof img === 'string') return img.trim()
    if (img && typeof img === 'object') {
      if ('src' in img && typeof img.src === 'string') return img.src.trim()
      if ('default' in img && typeof img.default === 'string') return img.default.trim()
    }
    return ''
  }

  const validGallery = gallery?.filter(img => {
    const normalized = normalizeImage(img)
    return normalized !== ''
  }).map(normalizeImage) || []
  
  const imageArray = validGallery.length > 0 ? validGallery : [imageSrc].filter(img => img && img.trim() !== '')

  // If no valid images, don't render
  if (imageArray.length === 0) {
    return null
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lightbox || imageArray.length === 0) return
    
    // Don't open lightbox if inside a clickable parent (safety check)
    const isInsideClickable = containerRef.current?.closest('a, button, [role="link"], [role="button"]')
    if (isInsideClickable) {
      return
    }
    
    e.stopPropagation() // Prevent event from bubbling to parent
    
    // Find current image index in gallery (normalize for comparison)
    const normalizedSrc = imageSrc.trim()
    const index = imageArray.findIndex((img) => {
      const normalizedImg = normalizeImage(img).trim()
      return normalizedImg === normalizedSrc || img === normalizedSrc || img === imageSrc
    })
    setCurrentIndex(index >= 0 ? index : 0)
    setIsOpen(true)
  }

  // Check if className contains transform classes (for hover effects)
  const hasTransform = className.includes('scale') || className.includes('transform')
  
  // Check if using fill prop (requires relative positioning)
  const usingFill = props.fill !== undefined
  
  return (
    <>
      <div
        ref={containerRef}
        onClick={handleClick}
        className={`next-image-wrapper ${usingFill ? 'relative w-full h-full' : ''} ${lightbox ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''} ${className}`}
        role={lightbox ? 'button' : undefined}
        tabIndex={lightbox ? 0 : undefined}
        aria-label={lightbox ? `Open image lightbox: ${alt || 'Image'}` : undefined}
        onKeyDown={(e) => {
          if (lightbox && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            handleClick(e as any)
          }
        }}
        style={{
          // Prevent flickering on transforms - use GPU acceleration
          ...(hasTransform && {
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)'
          })
        }}
      >
        <Image 
          src={imageSrc} 
          alt={alt || ''} 
          {...props}
          style={{
            ...props.style,
            // Ensure smooth rendering
            ...(hasTransform && {
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            })
          }}
        />
      </div>

      {lightbox && isOpen && imageArray.length > 0 && isMounted && (
        <FullscreenImageModal
          images={imageArray}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          alt={alt}
        />
      )}
    </>
  )
}
