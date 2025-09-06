'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  X,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Camera,
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
  const currentPhoto = photos[currentIndex]

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % photos.length)
  }, [photos.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  const goToPhoto = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

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
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious, onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h2 className="text-lg font-medium">{galleryName}</h2>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} sur {photos.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Fermer la galerie"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="absolute inset-0 flex items-center justify-center pt-20 pb-32">
        <div className="relative max-w-7xl max-h-full w-full h-full mx-4">
          <Image
            src={currentPhoto.image}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

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

      {/* Photo Info & Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Photo Details */}
        <div className="text-white mb-4">
          <h3 className="text-xl font-medium mb-2">{currentPhoto.title}</h3>
          {currentPhoto.description && (
            <p className="text-gray-300 mb-2">{currentPhoto.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {currentPhoto.photographer && (
              <div className="flex items-center gap-1">
                <Camera className="w-4 h-4" />
                <span>{currentPhoto.photographer}</span>
              </div>
            )}
            {currentPhoto.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(currentPhoto.date).toLocaleDateString('fr-CH')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {photos.map((photo, index) => (
                <button
                  key={index}
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

      {/* Click outside to close */}
      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Fermer la galerie"
      />
    </div>
  )
}
