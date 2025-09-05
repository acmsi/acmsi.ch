import { describe, it } from 'node:test'
import assert from 'node:assert'

// Type definitions for Decap CMS data structures
interface ArticleData {
  toJS(): {
    title: string
    tags?: string[]
    author: string
    date: string
  }
}

interface MockArticle {
  get(key: string): ArticleData | string
}

// Mock data structures similar to what Decap CMS provides
const mockArticles: MockArticle[] = [
  {
    get(key: string): ArticleData | string {
      const mockData = {
        data: {
          toJS: () => ({
            title: 'Article avec tag annonce',
            tags: ['annonce', 'communauté'],
            author: 'ACMSI',
            date: '2024-01-01',
          }),
        },
        slug: 'article-1',
      }
      return key === 'data' ? mockData.data : mockData.slug
    },
  },
  {
    get(key: string): ArticleData | string {
      const mockData = {
        data: {
          toJS: () => ({
            title: 'Article avec tag site web',
            tags: ['site web', 'annonce'],
            author: 'ACMSI',
            date: '2024-01-02',
          }),
        },
        slug: 'article-2',
      }
      return key === 'data' ? mockData.data : mockData.slug
    },
  },
  {
    get(key: string): ArticleData | string {
      const mockData = {
        data: {
          toJS: () => ({
            title: 'Article sans tags',
            tags: [],
            author: 'ACMSI',
            date: '2024-01-03',
          }),
        },
        slug: 'article-3',
      }
      return key === 'data' ? mockData.data : mockData.slug
    },
  },
  {
    get(key: string): ArticleData | string {
      const mockData = {
        data: {
          toJS: () => ({
            title: 'Article avec tags undefined',
            tags: undefined,
            author: 'ACMSI',
            date: '2024-01-04',
          }),
        },
        slug: 'article-4',
      }
      return key === 'data' ? mockData.data : mockData.slug
    },
  },
]

describe('Tag Preview Logic', () => {
  it('should filter articles by tag name correctly', () => {
    const tagName = 'annonce'

    // Simulate the filtering logic from the preview template
    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    assert.strictEqual(related.length, 2)

    // Verify the correct articles were selected
    const slugs = related.map(article => article.get('slug'))
    assert.deepStrictEqual(slugs, ['article-1', 'article-2'])
  })

  it('should handle tags with spaces correctly', () => {
    const tagName = 'site web'

    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    assert.strictEqual(related.length, 1)
    assert.strictEqual(related[0].get('slug'), 'article-2')
  })

  it('should handle articles with undefined or empty tags', () => {
    const tagName = 'any-tag'

    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    // Should not crash and should not include articles with undefined/empty tags
    assert.strictEqual(related.length, 0)
  })

  it('should return empty array for non-existent tag', () => {
    const tagName = 'non-existent-tag'

    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    assert.strictEqual(related.length, 0)
  })

  it('should extract article data correctly for display', () => {
    const article = mockArticles[0]
    const articleData = article.get('data') as ArticleData
    const dataObj = articleData.toJS()
    const slug = article.get('slug')

    assert.strictEqual(dataObj.title, 'Article avec tag annonce')
    assert.strictEqual(dataObj.author, 'ACMSI')
    assert.strictEqual(dataObj.date, '2024-01-01')
    assert.deepStrictEqual(dataObj.tags, ['annonce', 'communauté'])
    assert.strictEqual(slug, 'article-1')
  })

  it('should generate correct URLs for articles', () => {
    const article = mockArticles[0]
    const slug = article.get('slug')
    const expectedUrl = '/actualites/' + slug

    assert.strictEqual(expectedUrl, '/actualites/article-1')
  })

  it('should generate correct filter URLs with tag encoding', () => {
    const tagName = 'site web'
    const filterUrl = '/actualites?tag=' + encodeURIComponent(tagName)

    assert.strictEqual(filterUrl, '/actualites?tag=site%20web')
  })

  it('should calculate usage statistics correctly', () => {
    const tagName = 'annonce'

    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    const usageText =
      'Utilisé par ' +
      related.length +
      ' article' +
      (related.length !== 1 ? 's' : '')

    assert.strictEqual(usageText, 'Utilisé par 2 articles')
  })

  it('should handle singular usage count correctly', () => {
    const tagName = 'site web'

    const related = mockArticles.filter(article => {
      const articleData = article.get('data') as ArticleData
      const dataObj = articleData.toJS()
      const tags = dataObj.tags

      if (!tags || !Array.isArray(tags)) return false

      return tags.includes(tagName)
    })

    const usageText =
      'Utilisé par ' +
      related.length +
      ' article' +
      (related.length !== 1 ? 's' : '')

    assert.strictEqual(usageText, 'Utilisé par 1 article')
  })
})
