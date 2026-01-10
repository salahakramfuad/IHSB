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

  const imageArray = images || (src ? [typeof src === 'string' ? src : src.src] : [])

  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }

    if (lightbox && imageArray.length > 0) {
      // Find the index of the current image
      const index = imageArray.findIndex(
        (img) => img === (typeof src === 'string' ? src : src?.src)
      )
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
