import { defineCollection, z } from 'astro:content'

const actualites = defineCollection({
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

const galleries = defineCollection({
  type: 'content',
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

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
  }),
})

export const collections = {
  actualites,
  galleries,
  projects,
  tags,
}
