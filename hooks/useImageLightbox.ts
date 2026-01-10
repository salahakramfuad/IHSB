'use client'

import { useState, useCallback } from 'react'

interface UseImageLightboxReturn {
  openLightbox: (images: string[], initialIndex?: number) => void
  closeLightbox: () => void
  isOpen: boolean
  images: string[]
  currentIndex: number
  goToNext: () => void
  goToPrevious: () => void
}

export function useImageLightbox(): UseImageLightboxReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = useCallback((imageArray: string[], initialIndex = 0) => {
    setImages(imageArray)
    setCurrentIndex(initialIndex)
    setIsOpen(true)
    document.documentElement.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    document.documentElement.style.overflow = ''
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  return {
    openLightbox,
    closeLightbox,
    isOpen,
    images,
    currentIndex,
    goToNext,
    goToPrevious
  }
}
