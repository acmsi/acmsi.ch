import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const contentDirectory = path.join(process.cwd(), 'content')

export interface NewsArticle {
  slug: string
  title: string
  date: string
  author: string
  featured_image?: string
  excerpt?: string
  content: string
  published: boolean
  tags?: string[]
}

export interface Photo {
  image: string
  title?: string
  description?: string
  photographer?: string
  date?: string
  alt?: string
}

export interface Gallery {
  slug: string
  name: string
  type: 'mosque' | 'renovations' | 'historical' | 'events' | 'other'
  description?: string
  photos: Photo[]
  order: number
  published: boolean
  content: string
}

// Type for date display format
export type DateDisplayFormat = 'full' | 'month' | 'quarter'

export interface BudgetProject {
  slug: string
  type: 'projet_global' | 'sous_projet'
  nom: string
  description?: string
  objectif: number
  montant_leve: number
  derniere_maj: string
  priorite?: number
  date_accomplissement?: string
  date_fin_prevue?: string
  echeance_format?: DateDisplayFormat
  gallery?: string
  content: string
  pourcentage_completion: number
}

export interface ProjectSummary {
  projet_global: BudgetProject
  sous_projets: BudgetProject[]
  total_objectif: number
  total_leve: number
  pourcentage_global: number
  derniere_maj_globale: string
}

// Get project summary - simplified for single acquisition project
export async function getProjectSummary(): Promise<ProjectSummary | null> {
  try {
    // Get the acquisition project directly
    const acquisitionProject = await getProject('acquisition-mosquee-nur')

    if (!acquisitionProject) {
      return null
    }

    // Calculate totals based on the acquisition project
    const total_objectif = acquisitionProject.objectif
    const total_leve = acquisitionProject.montant_leve
    const pourcentage_global =
      total_objectif > 0
        ? Math.round((total_leve / total_objectif) * 100 * 10) / 10
        : 0

    return {
      projet_global: acquisitionProject,
      sous_projets: [], // No sub-projects anymore
      total_objectif,
      total_leve,
      pourcentage_global,
      derniere_maj_globale: acquisitionProject.derniere_maj,
    }
  } catch (error) {
    console.error('Error loading project summary:', error)
    return null
  }
}

// Get a single project by slug
export async function getProject(slug: string): Promise<BudgetProject | null> {
  try {
    const fullPath = path.join(contentDirectory, 'projects', `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    // Calculate percentage
    const pourcentage_completion =
      data.objectif > 0
        ? Math.round((data.montant_leve / data.objectif) * 100 * 10) / 10
        : 0

    return {
      slug,
      type: data.type,
      nom: data.nom || '',
      description: data.description,
      objectif: data.objectif || 0,
      montant_leve: data.montant_leve || 0,
      derniere_maj: data.derniere_maj || '',
      priorite: data.priorite,
      date_accomplissement: data.date_accomplissement,
      date_fin_prevue: data.date_fin_prevue,
      echeance_format: data.echeance_format,
      content: contentHtml,
      pourcentage_completion,
      gallery: data.gallery,
    } as BudgetProject
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error)
    return null
  }
}

// Get all news articles
export async function getAllNews(): Promise<NewsArticle[]> {
  const newsDirectory = path.join(contentDirectory, 'actualites')

  if (!fs.existsSync(newsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(newsDirectory)
  const allNewsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          author: data.author || '',
          featured_image: data.featured_image,
          excerpt: data.excerpt,
          content: contentHtml,
          published: data.published !== false,
          tags: data.tags || [],
        } as NewsArticle
      }),
  )

  // Filter published articles and sort by date (newest first)
  return allNewsData
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single news article by slug
export async function getNewsArticle(
  slug: string,
): Promise<NewsArticle | null> {
  try {
    const fullPath = path.join(contentDirectory, 'actualites', `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      author: data.author || '',
      featured_image: data.featured_image,
      excerpt: data.excerpt,
      content: contentHtml,
      published: data.published !== false,
      tags: data.tags || [],
    } as NewsArticle
  } catch (error) {
    console.error(`Error reading news article ${slug}:`, error)
    return null
  }
}

// Get all galleries
export async function getAllGalleries(): Promise<Gallery[]> {
  const galleriesDirectory = path.join(contentDirectory, 'galleries')

  if (!fs.existsSync(galleriesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(galleriesDirectory)
  const allGalleryData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(galleriesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert markdown to HTML
        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          name: data.name || '',
          type: data.type || 'other',
          description: data.description,
          photos: data.photos || [],
          order: data.order || 99,
          published: data.published !== false,
          content: contentHtml,
        } as Gallery
      }),
  )

  // Filter published galleries and sort by order
  return allGalleryData
    .filter(gallery => gallery.published)
    .sort((a, b) => a.order - b.order)
}

// Get a single gallery by slug
export async function getGallery(slug: string): Promise<Gallery | null> {
  try {
    const fullPath = path.join(contentDirectory, 'galleries', `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      name: data.name || '',
      type: data.type || 'other',
      description: data.description,
      photos: data.photos || [],
      order: data.order || 99,
      published: data.published !== false,
      content: contentHtml,
    } as Gallery
  } catch (error) {
    console.error(`Error reading gallery ${slug}:`, error)
    return null
  }
}

// Get galleries by type
export async function getGalleriesByType(
  type: Gallery['type'],
): Promise<Gallery[]> {
  const allGalleries = await getAllGalleries()
  return allGalleries.filter(gallery => gallery.type === type)
}
