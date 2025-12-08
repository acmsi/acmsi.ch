import { defineCollection, z } from 'astro:content'

// Photo schema for galleries
const photoSchema = z.object({
  image: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  photographer: z.string().optional(),
  date: z.string().optional(),
  alt: z.string().optional(),
})

// News articles collection (actualites)
const actualitesCollection = defineCollection({
  type: 'content',
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

// Galleries collection
const galleriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(), // Optional - Astro uses filename as ID
    type: z.enum(['mosque', 'renovations', 'historical', 'events', 'other']),
    description: z.string().optional(),
    photos: z.array(photoSchema).default([]),
    order: z.number().default(99),
    published: z.boolean().default(true),
  }),
})

// Projects collection (budget/fundraising)
const projectsCollection = defineCollection({
  type: 'content',
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

// Tags collection (metadata for news)
const tagsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(), // Optional - Astro uses filename as ID
    description: z.string().optional(),
  }),
})

export const collections = {
  actualites: actualitesCollection,
  galleries: galleriesCollection,
  projects: projectsCollection,
  tags: tagsCollection,
}

// Re-export types for use in components
export type Photo = z.infer<typeof photoSchema>
export type GalleryType =
  | 'mosque'
  | 'renovations'
  | 'historical'
  | 'events'
  | 'other'
export type DateDisplayFormat = 'full' | 'month' | 'quarter'
