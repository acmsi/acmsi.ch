type Variant = 'thumb' | 'medium' | 'large'

/**
 * Returns the path to an optimized WebP variant of an uploaded image.
 * Falls back to the original path if no optimized version would exist.
 *
 * @param originalPath - CMS path like "/images/uploads/photo.jpg"
 * @param variant - "thumb" (400w), "medium" (800w), or "large" (1600w)
 */
export function optimizedSrc(originalPath: string, variant: Variant): string {
  // Only process paths from /images/uploads/
  if (!originalPath.startsWith('/images/uploads/')) return originalPath

  const filename = originalPath.split('/').pop()
  if (!filename) return originalPath

  // Strip extension to get basename
  const lastDot = filename.lastIndexOf('.')
  if (lastDot === -1) return originalPath

  const basename = filename.substring(0, lastDot)
  return `/images/optimized/${basename}/${variant}.webp`
}
