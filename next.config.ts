import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Removed output: 'export' to enable hybrid static/dynamic rendering
  // Static pages will still be generated, but pages with searchParams can be dynamic
  images: {
    // Enable optimization - Netlify handles this automatically with Edge Functions
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typedRoutes: true,
}

export default nextConfig
