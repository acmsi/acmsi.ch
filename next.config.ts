import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Removed output: 'export' to enable hybrid static/dynamic rendering
  // Static pages will still be generated, but pages with searchParams can be dynamic
  images: {
    unoptimized: true,
  },
  typedRoutes: true,
}

export default nextConfig
