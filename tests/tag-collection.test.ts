import { describe, it } from 'node:test'
import assert from 'node:assert'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

// Type definitions for CMS configuration
interface CMSField {
  name: string
  widget: string
  label?: string
  [key: string]: unknown
}

interface CMSCollection {
  name: string
  label: string
  folder?: string
  create?: boolean
  fields: CMSField[]
  [key: string]: unknown
}

interface CMSConfig {
  collections: CMSCollection[]
  backend: {
    name: string
    branch: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

interface TagFrontmatter {
  name: string
  slug: string
  description: string
  [key: string]: unknown
}

describe('Tag Collection Configuration', () => {
  const configPath = join(process.cwd(), 'public/admin/config.yml')

  it('should have valid CMS configuration file', () => {
    assert.strictEqual(existsSync(configPath), true)
  })

  it('should have tags collection configured', () => {
    const configContent = readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as CMSConfig

    assert.ok(config.collections)

    const tagsCollection = config.collections.find(
      (c: CMSCollection) => c.name === 'tags',
    )
    assert.ok(tagsCollection)
    assert.strictEqual(tagsCollection.label, 'Tags')
    assert.strictEqual(tagsCollection.folder, 'content/tags')
    assert.strictEqual(tagsCollection.create, true)
  })

  it('should have correct tags collection fields', () => {
    const configContent = readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as CMSConfig

    const tagsCollection = config.collections.find(
      (c: CMSCollection) => c.name === 'tags',
    )
    assert.ok(tagsCollection, 'Tags collection should exist')
    assert.ok(tagsCollection.fields)

    const fields = tagsCollection.fields
    const nameField = fields.find((f: CMSField) => f.name === 'name')
    const slugField = fields.find((f: CMSField) => f.name === 'slug')
    const descField = fields.find((f: CMSField) => f.name === 'description')

    assert.ok(nameField)
    assert.strictEqual(nameField.widget, 'string')

    assert.ok(slugField)
    assert.strictEqual(slugField.widget, 'string')

    assert.ok(descField)
    assert.strictEqual(descField.widget, 'text')
    assert.strictEqual(descField.required, false)
  })

  it('should have actualites collection using relation widget for tags', () => {
    const configContent = readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as CMSConfig

    const actualitesCollection = config.collections.find(
      (c: CMSCollection) => c.name === 'actualites',
    )
    assert.ok(actualitesCollection)

    const tagsField = actualitesCollection.fields.find(
      (f: CMSField) => f.name === 'tags',
    )
    assert.ok(tagsField)
    assert.strictEqual(tagsField.widget, 'relation')
    assert.strictEqual(tagsField.collection, 'tags')
    assert.deepStrictEqual(tagsField.search_fields, ['name'])
    assert.strictEqual(tagsField.value_field, 'name')
    assert.deepStrictEqual(tagsField.display_fields, ['name'])
    assert.strictEqual(tagsField.multiple, true)
    assert.strictEqual(tagsField.required, false)
  })

  it('should have existing tag files in correct location', () => {
    const tagFiles = [
      'content/tags/annonce.md',
      'content/tags/site-web.md',
      'content/tags/communaute.md',
    ]

    tagFiles.forEach(filePath => {
      const fullPath = join(process.cwd(), filePath)
      assert.strictEqual(existsSync(fullPath), true)
    })
  })

  it('should have valid tag file structure', () => {
    const tagFilePath = join(process.cwd(), 'content/tags/annonce.md')
    const content = readFileSync(tagFilePath, 'utf8')

    // Should have frontmatter
    assert.strictEqual(content.startsWith('---'), true)

    // Parse frontmatter
    const frontmatterEnd = content.indexOf('---', 3)
    const frontmatterContent = content.slice(3, frontmatterEnd).trim()
    const frontmatter = yaml.load(frontmatterContent) as TagFrontmatter

    assert.ok(frontmatter.name)
    assert.ok(frontmatter.slug)
    assert.ok(frontmatter.description)

    // Name should be a string
    assert.strictEqual(typeof frontmatter.name, 'string')
    assert.ok(frontmatter.name.length > 0)
  })

  it('should have consistent tag data across files', () => {
    const tagData = [
      { file: 'annonce.md', name: 'annonce', slug: 'annonce' },
      { file: 'site-web.md', name: 'site web', slug: 'site-web' },
      { file: 'communaute.md', name: 'communauté', slug: 'communaute' },
    ]

    tagData.forEach(({ file, name, slug }) => {
      const filePath = join(process.cwd(), 'content/tags', file)
      const content = readFileSync(filePath, 'utf8')

      const frontmatterEnd = content.indexOf('---', 3)
      const frontmatterContent = content.slice(3, frontmatterEnd).trim()
      const frontmatter = yaml.load(frontmatterContent) as TagFrontmatter

      assert.strictEqual(frontmatter.name, name)
      assert.strictEqual(frontmatter.slug, slug)
      assert.ok(frontmatter.description)
      assert.strictEqual(typeof frontmatter.description, 'string')
    })
  })

  it('should have tags directory structure', () => {
    const tagsDir = join(process.cwd(), 'content/tags')
    assert.strictEqual(existsSync(tagsDir), true)
  })

  it('should validate CMS config is valid YAML', () => {
    const configContent = readFileSync(configPath, 'utf8')

    // Should not throw an error when parsing
    assert.doesNotThrow(() => {
      yaml.load(configContent)
    })
  })

  it('should have backend configuration for git-gateway', () => {
    const configContent = readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as CMSConfig

    assert.ok(config.backend)
    assert.strictEqual(config.backend.name, 'git-gateway')
    assert.strictEqual(config.backend.branch, 'main')
  })

  it('should have media folder configuration', () => {
    const configContent = readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as CMSConfig

    assert.strictEqual(config.media_folder, 'public/images/uploads')
    assert.strictEqual(config.public_folder, '/images/uploads')
  })
})
