import { describe, it } from 'node:test'
import assert from 'node:assert'

// Type definition for articles
interface Article {
  slug: string
  title: string
  tags?: string[]
  date: string
  author: string
  excerpt: string
  published: boolean
}

const mockArticles = [
  {
    slug: 'article-1',
    title: 'Article avec tag annonce',
    tags: ['annonce', 'communauté'],
    date: '2024-01-01',
    author: 'ACMSI',
    excerpt: 'Premier article test',
    published: true,
  },
  {
    slug: 'article-2',
    title: 'Article avec tag site web',
    tags: ['site web', 'annonce'],
    date: '2024-01-02',
    author: 'ACMSI',
    excerpt: 'Deuxième article test',
    published: true,
  },
  {
    slug: 'article-3',
    title: 'Article sans tags',
    tags: [],
    date: '2024-01-03',
    author: 'ACMSI',
    excerpt: 'Troisième article test',
    published: true,
  },
  {
    slug: 'article-4',
    title: 'Article avec tags undefined',
    tags: undefined,
    date: '2024-01-04',
    author: 'ACMSI',
    excerpt: 'Quatrième article test',
    published: true,
  },
]

describe('Tag Filtering Logic', () => {
  it('should return all articles when no tag filter is applied', () => {
    const articles = mockArticles
    const selectedTag = undefined

    const filteredArticles = selectedTag
      ? articles.filter(article => article.tags?.includes(selectedTag))
      : articles

    assert.strictEqual(filteredArticles.length, 4)
    assert.deepStrictEqual(filteredArticles, mockArticles)
  })

  it('should filter articles by specific tag', () => {
    const articles = mockArticles
    const selectedTag = 'annonce'

    const filteredArticles = selectedTag
      ? articles.filter(article => article.tags?.includes(selectedTag))
      : articles

    assert.strictEqual(filteredArticles.length, 2)
    assert.strictEqual(filteredArticles[0].slug, 'article-1')
    assert.strictEqual(filteredArticles[1].slug, 'article-2')
  })

  it('should handle tag filtering with spaces', () => {
    const articles = mockArticles
    const selectedTag = 'site web'

    const filteredArticles = selectedTag
      ? articles.filter(article => article.tags?.includes(selectedTag))
      : articles

    assert.strictEqual(filteredArticles.length, 1)
    assert.strictEqual(filteredArticles[0].slug, 'article-2')
  })

  it('should return empty array for non-existent tag', () => {
    const articles = mockArticles
    const selectedTag = 'non-existent-tag'

    const filteredArticles = selectedTag
      ? articles.filter(article => article.tags?.includes(selectedTag))
      : articles

    assert.strictEqual(filteredArticles.length, 0)
  })

  it('should handle articles with undefined or empty tags', () => {
    const articles = mockArticles
    const selectedTag = 'any-tag'

    const filteredArticles = selectedTag
      ? articles.filter(article => article.tags?.includes(selectedTag))
      : articles

    // Should not crash and should not include articles with undefined/empty tags
    assert.strictEqual(filteredArticles.length, 0)
  })

  it('should extract all unique tags correctly', () => {
    const articles = mockArticles

    const allTags = Array.from(
      new Set(articles.flatMap(article => article.tags || [])),
    ).sort()

    assert.deepStrictEqual(allTags, ['annonce', 'communauté', 'site web'])
  })

  it('should handle empty articles array', () => {
    const articles: Article[] = []

    const allTags = Array.from(
      new Set(articles.flatMap(article => article.tags || [])),
    ).sort()

    const filteredArticles = articles.filter(article =>
      article.tags?.includes('any-tag'),
    )

    assert.deepStrictEqual(allTags, [])
    assert.strictEqual(filteredArticles.length, 0)
  })
})
