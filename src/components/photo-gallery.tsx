'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Gallery, Photo } from '@/lib/content'
import PhotoLightbox from './photo-lightbox'

interface PhotoGalleryProps {
  gallery: Gallery
  maxThumbnails?: number
  className?: string
}

export default function PhotoGallery({
  gallery,
  maxThumbnails = 4,
  className = '',
}: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  if (!gallery.photos || gallery.photos.length === 0) {
    return null
  }

  const displayPhotos = gallery.photos.slice(0, maxThumbnails)
  const hasMorePhotos = gallery.photos.length > maxThumbnails
  const remainingCount = gallery.photos.length - maxThumbnails

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className={className}>
      {/* Gallery Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">{gallery.name}</h3>
        {gallery.description && (
          <p className="text-gray-600">{gallery.description}</p>
        )}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayPhotos.map((photo: Photo, index: number) => {
          const isLastPhoto = index === maxThumbnails - 1
          const showMoreOverlay = hasMorePhotos && isLastPhoto

          return (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
            >
              <Image
                src={photo.image}
                alt={photo.alt || photo.title || 'Photo de galerie'}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Show more overlay on last photo if there are more photos */}
              {showMoreOverlay ? (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">+{remainingCount}</div>
                    <div className="text-sm">Plus de photos</div>
                  </div>
                </div>
              ) : (
                /* Normal hover overlay with photo title */
                <div className="absolute inset-0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                  {photo.title && (
                    <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm font-medium truncate">
                        {photo.title}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={gallery.photos}
          initialIndex={selectedPhotoIndex}
          onClose={() => setLightboxOpen(false)}
          galleryName={gallery.name}
        />
      )}
    </div>
  )
}
