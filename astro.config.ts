import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.acmsi.ch',

  redirects: {
    '/parking': '/contact#parking-info',
  },

  // Ensure consistent URLs without trailing slashes
  trailingSlash: 'never',

  // Build pages as /contact.html instead of /contact/index.html
  build: {
    format: 'file',
  },

  // Hybrid rendering: static by default, opt-in to server rendering
  output: 'static',

  // Environment variables schema for OAuth
  env: {
    schema: {
      GITHUB_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      GITHUB_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },

  // Cloudflare Pages adapter
  adapter: cloudflare({
    imageService: 'cloudflare-binding',
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
        'chromium-bidi', 'chromium-bidi/lib/cjs/bidiMapper/BidiMapper', 'chromium-bidi/lib/cjs/cdp/CdpConnection',
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
        'chromium-bidi', 'chromium-bidi/lib/cjs/bidiMapper/BidiMapper', 'chromium-bidi/lib/cjs/cdp/CdpConnection',
      ],
    },
  },
})
