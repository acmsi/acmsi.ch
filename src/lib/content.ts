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

export interface BudgetProject {
  slug: string
  type: 'projet_global' | 'sous_projet'
  nom: string
  description?: string
  objectif: number
  montant_leve: number
  derniere_maj: string
  priorite?: number
  statut?: 'termine' | 'active'
  date_fin_prevue?: string
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

// Get all budget projects
export async function getAllBudgetProjects(): Promise<BudgetProject[]> {
  const budgetDirectory = path.join(contentDirectory, 'budget')
  
  if (!fs.existsSync(budgetDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(budgetDirectory)
  const allBudgetData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(budgetDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert markdown to HTML
        const processedContent = await remark()
          .use(html)
          .process(content)
        const contentHtml = processedContent.toString()

        // Calculate percentage
        const pourcentage_completion = data.objectif > 0 
          ? Math.round((data.montant_leve / data.objectif) * 100) 
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
          statut: data.statut || 'active',
          date_fin_prevue: data.date_fin_prevue,
          content: contentHtml,
          pourcentage_completion,
        } as BudgetProject
      })
  )

  return allBudgetData
}

// Get project summary with global project and sub-projects
export async function getProjectSummary(): Promise<ProjectSummary | null> {
  try {
    const allProjects = await getAllBudgetProjects()
    
    const projet_global = allProjects.find(p => p.type === 'projet_global')
    const sous_projets = allProjects
      .filter(p => p.type === 'sous_projet')
      .sort((a, b) => (a.priorite || 99) - (b.priorite || 99))

    if (!projet_global) {
      return null
    }

    // Calculate totals
    const total_objectif = projet_global.objectif
    const total_leve = projet_global.montant_leve + sous_projets.reduce((sum, p) => sum + p.montant_leve, 0)
    const pourcentage_global = total_objectif > 0 ? Math.round((total_leve / total_objectif) * 100) : 0

    // Find most recent update
    const dates = [projet_global.derniere_maj, ...sous_projets.map(p => p.derniere_maj)]
      .filter(date => date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    const derniere_maj_globale = dates[0] || projet_global.derniere_maj

    return {
      projet_global,
      sous_projets,
      total_objectif,
      total_leve,
      pourcentage_global,
      derniere_maj_globale,
    }
  } catch (error) {
    console.error('Error loading project summary:', error)
    return null
  }
}

// Get a single budget project by slug
export async function getBudgetProject(slug: string): Promise<BudgetProject | null> {
  try {
    const fullPath = path.join(contentDirectory, 'budget', `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
    const contentHtml = processedContent.toString()

    // Calculate percentage
    const pourcentage_completion = data.objectif > 0 
      ? Math.round((data.montant_leve / data.objectif) * 100) 
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
      statut: data.statut || 'active',
      date_fin_prevue: data.date_fin_prevue,
      content: contentHtml,
      pourcentage_completion,
    } as BudgetProject
  } catch (error) {
    console.error(`Error reading budget project ${slug}:`, error)
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
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        // Convert markdown to HTML
        const processedContent = await remark()
          .use(html)
          .process(content)
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
      })
  )

  // Filter published articles and sort by date (newest first)
  return allNewsData
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single news article by slug
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const fullPath = path.join(contentDirectory, 'actualites', `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(content)
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
