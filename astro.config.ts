import { defineConfig, envField } from 'astro/config'
import react from '@astrojs/react'
import cloudflare from '@astrojs/cloudflare'
import { z, defineCollection } from 'astro:content'

const actualites = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('ACMSI'),
    featured_image: z.string().optional(),
    excerpt: z.string().optional(),
    published: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
})

const galleries = defineCollection({
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    type: z.enum(['mosque', 'renovations', 'historical', 'events', 'other']),
    description: z.string().optional(),
    photos: z
      .array(
        z.object({
          image: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          photographer: z.string().optional(),
          date: z.string().optional(),
          alt: z.string().optional(),
        }),
      )
      .default([]),
    order: z.number().default(99),
    published: z.boolean().default(true),
  }),
})

const projects = defineCollection({
  schema: z.object({
    type: z.enum(['projet_global', 'sous_projet']),
    nom: z.string(),
    description: z.string().optional(),
    objectif: z.number(),
    montant_leve: z.number(),
    derniere_maj: z.coerce.date(),
    priorite: z.number().optional(),
    date_accomplissement: z.coerce.date().optional(),
    date_fin_prevue: z.coerce.date().optional(),
    echeance_format: z.enum(['full', 'month', 'quarter']).optional(),
    gallery: z.string().optional(),
  }),
})

const tags = defineCollection({
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
  }),
})

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

  content: {
    collections: {
      actualites,
      galleries,
      projects,
      tags,
    },
  },

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
