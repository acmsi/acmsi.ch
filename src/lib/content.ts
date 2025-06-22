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

export interface PageContent {
  [key: string]: any
}

export interface GeneralSettings {
  site_title: string
  site_description: string
  address: string
  phone?: string
  email: string
  social_media: {
    facebook?: string
    instagram?: string
    youtube?: string
  }
}

export interface PrayerTimes {
  fajr: string
  dhuhr: string
  asr: string
  maghrib: string
  isha: string
  jumah_khutbah: string
  jumah_prayer: string
  note?: string
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
        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          content: contentHtml,
          ...data,
        } as NewsArticle
      })
  )

  // Sort by date (newest first) and filter published articles
  return allNewsData
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a single news article by slug
export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const fullPath = path.join(contentDirectory, 'actualites', `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      content: contentHtml,
      ...data,
    } as NewsArticle
  } catch (error) {
    return null
  }
}

// Get page content
export async function getPageContent(pageName: string): Promise<PageContent | null> {
  try {
    const fullPath = path.join(contentDirectory, 'pages', `${pageName}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Convert markdown content fields to HTML
    const processedData = { ...data }
    
    // Process markdown fields
    for (const [key, value] of Object.entries(processedData)) {
      if (typeof value === 'string' && (key.includes('content') || key === 'body')) {
        const processedContent = await remark().use(html).process(value)
        processedData[key] = processedContent.toString()
      }
    }

    return processedData
  } catch (error) {
    console.error(`Error loading page content for ${pageName}:`, error)
    return null
  }
}

// Get general settings
export function getGeneralSettings(): GeneralSettings | null {
  try {
    const fullPath = path.join(contentDirectory, 'settings', 'general.md')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return data as GeneralSettings
  } catch (error) {
    console.error('Error loading general settings:', error)
    return null
  }
}

// Get prayer times
export function getPrayerTimes(): PrayerTimes | null {
  try {
    const fullPath = path.join(contentDirectory, 'settings', 'prayer-times.md')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return data as PrayerTimes
  } catch (error) {
    console.error('Error loading prayer times:', error)
    return null
  }
}
