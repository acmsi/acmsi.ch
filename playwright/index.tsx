// Import global styles for component tests
import '../src/app/global.css'

// Mock Next.js Image component for component tests
import React from 'react'

// Simple mock for next/image
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MockImage = (props: any) => {
  const { src, alt, className, ...rest } = props
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} {...rest} />
}

// Override Next.js Image globally
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(globalThis as any).Image = MockImage

// Export for Playwright to use
export {}
