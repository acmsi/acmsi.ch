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
