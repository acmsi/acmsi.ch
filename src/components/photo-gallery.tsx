'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Gallery, Photo } from '@/lib/content'
import PhotoLightbox from './photo-lightbox'

type Breakpoint = 'default' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface ResponsiveConfig {
  default: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

interface PhotoGalleryProps {
  gallery: Gallery
  cols?: number | ResponsiveConfig
  rows?: number | ResponsiveConfig
  maxCols?: number | ResponsiveConfig
  maxRows?: number | ResponsiveConfig
  className?: string
}

export default function PhotoGallery({
  gallery,
  cols,
  rows,
  maxCols,
  maxRows,
  className = '',
}: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  if (!gallery.photos || gallery.photos.length === 0) {
    return null
  }

  // Validate that cols and maxCols are not both defined
  if (cols !== undefined && maxCols !== undefined) {
    throw new Error(
      'PhotoGallery: Cannot use both "cols" and "maxCols" props. Use "cols" for fixed columns or "maxCols" for adaptive columns.',
    )
  }

  // Validate that rows and maxRows are not both defined
  if (rows !== undefined && maxRows !== undefined) {
    throw new Error(
      'PhotoGallery: Cannot use both "rows" and "maxRows" props. Use "rows" for fixed rows or "maxRows" for adaptive rows.',
    )
  }

  // Use fixed or adaptive, with defaults
  const colsToUse = cols ?? maxCols ?? 3
  const rowsToUse = rows ?? maxRows ?? 2
  const isFixedRows = rows !== undefined

  // Normalize configs to objects
  const colsConfig: ResponsiveConfig =
    typeof colsToUse === 'number' ? { default: colsToUse } : colsToUse
  const rowsConfig: ResponsiveConfig =
    typeof rowsToUse === 'number' ? { default: rowsToUse } : rowsToUse

  // Calculate max thumbnails for each breakpoint
  const calculateMaxThumbnails = (
    bp: Breakpoint,
  ): { breakpoint: Breakpoint; cols: number; rows: number; limit: number } => {
    const cols = colsConfig[bp] ?? colsConfig.default
    const rows = rowsConfig[bp] ?? rowsConfig.default
    return {
      breakpoint: bp,
      cols,
      rows,
      limit: cols * rows,
    }
  }

  // Get all defined breakpoints and their limits
  const breakpoints = (
    ['default', 'sm', 'md', 'lg', 'xl', '2xl'] as Breakpoint[]
  )
    .map(calculateMaxThumbnails)
    .filter(
      item =>
        colsConfig[item.breakpoint] !== undefined ||
        rowsConfig[item.breakpoint] !== undefined ||
        item.breakpoint === 'default',
    )

  // Calculate the maximum number of thumbnails to display across all breakpoints
  const effectiveMaxThumbnails = Math.max(...breakpoints.map(bp => bp.limit))

  const displayPhotos = gallery.photos.slice(0, effectiveMaxThumbnails)

  // Helper to calculate actual thumbnails to show at a breakpoint
  const getActualThumbnailCount = (
    cols: number,
    rows: number,
    isFixed: boolean,
  ): number => {
    const maxPossible = cols * rows
    const totalPhotos = gallery.photos.length

    // If using fixed rows/cols, always show maxPossible
    if (isFixed) {
      return maxPossible
    }

    // Adaptive mode: avoid showing incomplete last row
    // If we have fewer photos than one full row, show all photos (one row)
    if (totalPhotos <= cols) {
      return totalPhotos
    }

    // Try to fill complete rows only
    // Find the last complete row that fits within maxRows
    for (let row = rows; row >= 1; row--) {
      const photosInCompleteRows = cols * row
      // If we have enough photos to fill this many complete rows, use it
      if (totalPhotos >= photosInCompleteRows) {
        return photosInCompleteRows
      }
    }

    // Fallback: show first row (shouldn't happen given logic above)
    return cols
  }

  // Calculate remaining photos for a given limit
  const getRemainingCount = (limit: number) => gallery.photos.length - limit

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index)
    setLightboxOpen(true)
  }

  // Helper to get Tailwind class prefix for breakpoint
  const getBreakpointPrefix = (bp: Breakpoint): string => {
    return bp === 'default' ? '' : `${bp}:`
  }

  // Generate grid column classes
  // Classes are safelisted in global.css to prevent purging
  const getGridColsClasses = (): string => {
    const classes: string[] = []

    for (const { breakpoint, cols } of breakpoints) {
      const prefix = getBreakpointPrefix(breakpoint)

      if (cols < 1 || cols > 12) {
        throw new Error(
          `PhotoGallery: Unsupported grid column count: ${cols}. Supported values are 1-12.`,
        )
      }

      classes.push(`${prefix}grid-cols-${cols}`)
    }

    return classes.join(' ')
  }

  // Helper to get hide/show classes for a breakpoint  // Pattern: Always use flex (for centering), toggle visibility with invisible/visible
  // This works because we're ADDING classes at breakpoints, not trying to override
  const getBreakpointVisibilityClasses = (
    currentBp: Breakpoint,
    nextBp: Breakpoint | null,
  ): string => {
    const prefix = getBreakpointPrefix(currentBp)
    const nextPrefix = nextBp ? getBreakpointPrefix(nextBp) : null

    if (currentBp === 'default') {
      // Default is visible, hide at next breakpoint if exists
      return nextPrefix ? `flex ${nextPrefix}invisible` : 'flex'
    }

    // For responsive breakpoints: invisible below, visible at this bp, invisible at next
    // Always use flex so items-center/justify-center work
    if (nextPrefix) {
      return `flex invisible ${prefix}visible ${nextPrefix}invisible`
    }

    // Last breakpoint: invisible below, visible at this bp
    return `flex invisible ${prefix}visible`
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
      <div className={`grid ${getGridColsClasses()} gap-4`}>
        {displayPhotos.map((photo: Photo, index: number) => {
          // Build visibility classes for this thumbnail based on actual counts
          const visibilityClasses: string[] = []

          // For each breakpoint, check if this photo should be visible
          for (const { breakpoint, cols, rows } of breakpoints) {
            const actualCount = getActualThumbnailCount(cols, rows, isFixedRows)

            if (index >= actualCount) {
              const prefix = getBreakpointPrefix(breakpoint)
              visibilityClasses.push(`${prefix}hidden`)
            }
          }

          // Determine which breakpoints show overlay on this thumbnail
          const overlayBreakpoints = breakpoints
            .map(({ breakpoint, cols, rows }) => {
              const actualCount = getActualThumbnailCount(
                cols,
                rows,
                isFixedRows,
              )
              const isLastVisible = index === actualCount - 1
              const hasMore = gallery.photos.length > actualCount

              return {
                breakpoint,
                cols,
                rows,
                actualCount,
                shouldShowOverlay: hasMore && isLastVisible,
              }
            })
            .filter(bp => bp.shouldShowOverlay)

          const hasOverlay = overlayBreakpoints.length > 0

          return (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative aspect-square overflow-hidden rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${visibilityClasses.join(' ')}`}
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

              {/* Generate overlay for each breakpoint that shows it */}
              {overlayBreakpoints.map(
                ({ breakpoint, actualCount }, bpIndex) => {
                  const nextBp =
                    bpIndex < overlayBreakpoints.length - 1
                      ? overlayBreakpoints[bpIndex + 1].breakpoint
                      : (breakpoints[
                          breakpoints.indexOf(
                            breakpoints.find(b => b.breakpoint === breakpoint)!,
                          ) + 1
                        ]?.breakpoint ?? null)

                  return (
                    <div
                      key={breakpoint}
                      className={`absolute inset-0 bg-black/60 items-center justify-center ${getBreakpointVisibilityClasses(breakpoint, nextBp)}`}
                    >
                      <div className="text-white text-center">
                        <div className="text-2xl font-bold">
                          +{getRemainingCount(actualCount)}
                        </div>
                        <div className="text-sm">Plus de photos</div>
                      </div>
                    </div>
                  )
                },
              )}

              {/* Normal hover overlay with photo title - hide when showing "more" overlay */}
              {!hasOverlay && (
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
