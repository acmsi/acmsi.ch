// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.acmsi.ch',

  // Hybrid rendering: static by default, opt-in to server rendering
  output: 'static',

  // Cloudflare Pages adapter
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),

  integrations: [
    // React integration for interactive islands
    react(),
  ],

  // Image optimization
  image: {
    domains: ['www.acmsi.ch'],
    remotePatterns: [
      {
        protocol: 'https',
      },
    ],
  },

  // Vite configuration for Tailwind CSS v4
  vite: {
    css: {
      postcss: './postcss.config.mjs',
    },
    // Exclude dev dependencies from SSR bundle
    ssr: {
      external: [
        'playwright',
        'playwright-core',
        '@playwright/test',
        '@playwright/experimental-ct-react',
        'fsevents',
        'lightningcss',
        'chromium-bidi',
      ],
      // Prevent Vite from trying to optimize these
      noExternal: [],
    },
    optimizeDeps: {
      exclude: [
        'playwright',
        'playwright-core',
        '@playwright/test',
        '@playwright/experimental-ct-react',
        'fsevents',
        'lightningcss',
        'chromium-bidi',
      ],
    },
  },
})
