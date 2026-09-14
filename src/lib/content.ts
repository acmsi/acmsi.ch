import { getCollection, getEntry, type CollectionEntry } from 'astro:content'

// Types derived from Astro v6 generated content types
export type NewsArticle = CollectionEntry<'actualites'>
export type GalleryEntry = CollectionEntry<'galleries'>
export type BudgetProject = CollectionEntry<'projects'>
export type Tag = CollectionEntry<'tags'>

// Sub-types extracted from collection schemas
export type Photo = NonNullable<GalleryEntry['data']['photos']>[number]
export type GalleryType = GalleryEntry['data']['type']
export type DateDisplayFormat = NonNullable<
  BudgetProject['data']['echeance_format']
>

// Flat gallery data type for components (data extracted from GalleryEntry)
export interface GalleryData {
  name: string
  slug?: string
  type: GalleryType
  description?: string
  photos: Photo[]
  order: number
  published: boolean
}

// Keep Gallery as alias for backwards compatibility
export type Gallery = GalleryEntry

// Extended project type with calculated fields
export interface BudgetProjectWithCalculations {
  entry: BudgetProject
  pourcentage_completion: number
}

// Project summary type
export interface ProjectSummary {
  projet_global: BudgetProjectWithCalculations
  sous_projets: BudgetProjectWithCalculations[]
  total_objectif: number
  total_leve: number
  pourcentage_global: number
  derniere_maj_globale: Date
}

/**
 * Get all published news articles, sorted by date (newest first)
 */
export async function getAllNews(): Promise<NewsArticle[]> {
  const articles = await getCollection(
    'actualites',
    ({ data }) => data.published,
  )
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/**
 * Get all unique tags from published news articles
 */
export async function getAllNewsTags(): Promise<string[]> {
  const articles = await getAllNews()
  const tagSet = new Set<string>()
  articles.forEach(article => {
    article.data.tags.forEach((tag: string) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Get news articles filtered by tag
 */
export async function getNewsByTag(tag: string): Promise<NewsArticle[]> {
  const articles = await getAllNews()
  return articles.filter(article => article.data.tags.includes(tag))
}

/**
 * Get a single news article by slug
 */
export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | undefined> {
  return getEntry('actualites', slug)
}

/**
 * Get all published galleries, sorted by order
 */
export async function getAllGalleries(): Promise<Gallery[]> {
  const galleries = await getCollection(
    'galleries',
    ({ data }) => data.published,
  )
  return galleries.sort((a, b) => a.data.order - b.data.order)
}

/**
 * Get galleries by type
 */
export async function getGalleriesByType(
  type: Gallery['data']['type'],
): Promise<Gallery[]> {
  const galleries = await getAllGalleries()
  return galleries.filter(gallery => gallery.data.type === type)
}

/**
 * Get a single gallery by slug
 */
export async function getGallery(slug: string): Promise<Gallery | undefined> {
  return getEntry('galleries', slug)
}

/**
 * Calculate completion percentage for a project
 */
function calculatePercentage(montant_leve: number, objectif: number): number {
  if (objectif <= 0) return 0
  return Math.round((montant_leve / objectif) * 100 * 10) / 10
}

/**
 * Get a single project by slug with calculated fields
 */
export async function getProject(
  slug: string,
): Promise<BudgetProjectWithCalculations | null> {
  const entry = await getEntry('projects', slug)
  if (!entry) return null

  return {
    entry,
    pourcentage_completion: calculatePercentage(
      entry.data.montant_leve,
      entry.data.objectif,
    ),
  }
}

/**
 * Get project summary - simplified for single acquisition project
 */
export async function getProjectSummary(): Promise<ProjectSummary | null> {
  const acquisitionProject = await getProject('acquisition-mosquee-nur')

  if (!acquisitionProject) {
    return null
  }

  const total_objectif = acquisitionProject.entry.data.objectif
  const total_leve = acquisitionProject.entry.data.montant_leve
  const pourcentage_global = calculatePercentage(total_leve, total_objectif)

  return {
    projet_global: acquisitionProject,
    sous_projets: [],
    total_objectif,
    total_leve,
    pourcentage_global,
    derniere_maj_globale: acquisitionProject.entry.data.derniere_maj,
  }
}

/**
 * Get all tags from the tags collection
 */
export async function getAllTags(): Promise<Tag[]> {
  return getCollection('tags')
}
