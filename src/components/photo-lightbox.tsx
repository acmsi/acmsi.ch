'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import {
  X,
  ArrowLeft,
  ArrowRight,
  ArrowsOut,
  ArrowsIn,
} from '@phosphor-icons/react'
import type { Photo } from '@/lib/content'

interface PhotoLightboxProps {
  photos: Photo[]
  initialIndex: number
  onClose: () => void
  galleryName: string
}

export default function PhotoLightbox({
  photos,
  initialIndex,
  onClose,
  galleryName,
}: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const currentPhoto = photos[currentIndex]
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % photos.length)
  }, [photos.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goToPhoto = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prev => !prev)
  }, [])

  // Scroll current thumbnail into view
  useEffect(() => {
    const currentThumbnail = thumbnailRefs.current[currentIndex]
    if (currentThumbnail) {
      currentThumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrevious()
          break
        case 'f':
        case 'F':
          toggleFullScreen()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, onClose, toggleFullScreen])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Header - hidden in full screen mode */}
      {!isFullScreen && (
        <div className="absolute top-0 left-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4 pb-0">
          <div className="flex items-center justify-between text-white">
            <div className="flex gap-3 text-gray-300 items-baseline">
              <h2 className="text-lg font-medium text-gray-300">
                {galleryName}
              </h2>
              <span className="text-sm">
                {currentIndex + 1} sur {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Controls - always visible */}
      <div className="absolute z-10 top-4 right-4 flex gap-2">
        <button
          onClick={toggleFullScreen}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={isFullScreen ? 'Quitter le plein écran' : 'Plein écran'}
        >
          {isFullScreen ? (
            <ArrowsIn className="w-6 h-6" />
          ) : (
            <ArrowsOut className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Fermer la galerie"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center ${
          isFullScreen ? 'p-0' : 'pt-12 pb-24 md:px-12'
        }`}
      >
        <div className="relative max-h-full mx-4 h-full w-full flex-4">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
        {/* Photo Details - hidden in full screen mode */}
        {!isFullScreen && (
          <div className="text-white text-left w-full line-clamp-2 py-2 bg-gradient-to-b from-black/1 to-black/80">
            <h3 className="text-base text-balance font-medium text-gray-300 line-clamp-2">
              {currentPhoto.title}
            </h3>
            {currentPhoto.description && (
              <p className="text-gray-300 text-balance text-sm mb-2 line-clamp-2">
                {currentPhoto.description}
              </p>
            )}
          </div>
        )}

        {/* Navigation Arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Photo précédente"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Photo suivante"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Photo Info & Thumbnail Strip - hidden in full screen mode */}
      {!isFullScreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Thumbnail Strip */}
          {photos.length > 1 && (
            <div className="overflow-x-auto">
              <div className="flex gap-2 p-2 md:px-8">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    ref={el => {
                      thumbnailRefs.current[index] = el
                    }}
                    onClick={() => goToPhoto(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                      index === currentIndex
                        ? 'ring-2 ring-white scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Fermer la galerie"
      />
    </div>
  )
}
