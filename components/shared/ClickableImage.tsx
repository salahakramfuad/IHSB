'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import ImageLightbox from './ImageLightbox'

interface ClickableImageProps extends Omit<ImageProps, 'onClick'> {
  images?: string[] // If provided, allows navigation through multiple images
  onClick?: () => void // Optional custom click handler
  lightbox?: boolean // Enable/disable lightbox (default: true)
}

export default function ClickableImage({
  images,
  onClick,
  lightbox = true,
  src,
  alt,
  ...imageProps
}: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const imageArray = images || (src ? [typeof src === 'string' ? src : (typeof src === 'object' && 'src' in src && typeof src.src === 'string' ? src.src : '')] : []).filter((img: string) => img !== '')

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }

    if (lightbox && imageArray.length > 0) {
      // Find the index of the current image
      const currentSrc = typeof src === 'string' 
        ? src 
        : (typeof src === 'object' && src && 'src' in src && typeof src.src === 'string' ? src.src : '')
      const index = imageArray.findIndex((img) => img === currentSrc)
      setCurrentIndex(index >= 0 ? index : 0)
      setIsOpen(true)
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer transition-opacity hover:opacity-90"
      >
        <Image src={src} alt={alt || ''} {...imageProps} />
      </div>

      {lightbox && isOpen && imageArray.length > 0 && (
        <ImageLightbox
          images={imageArray}
          currentIndex={currentIndex}
          onClose={() => setIsOpen(false)}
          alt={alt}
        />
      )}
    </>
  )
}
