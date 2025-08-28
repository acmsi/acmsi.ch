import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { test } from 'node:test'
import assert from 'node:assert'
import { fileURLToPath } from 'url'

// ES modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Test to ensure that the Decap CMS config doesn't have local_backend set to true
 * This would cause issues in production environments
 */
test('Decap CMS Configuration', async t => {
  // Path to the config file
  const configPath = path.join(__dirname, '../public/admin/config.yml')

  await t.test('config.yml exists', () => {
    assert.strictEqual(fs.existsSync(configPath), true)
  })

  await t.test('config.yml is valid YAML', () => {
    const configContent = fs.readFileSync(configPath, 'utf8')
    assert.doesNotThrow(() => yaml.load(configContent))
  })

  await t.test('local_backend configuration check', () => {
    const configContent = fs.readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as Record<string, unknown>

    // In CI environment, local_backend should not be true
    if (process.env.CI && 'local_backend' in config) {
      assert.notStrictEqual(
        config.local_backend,
        true,
        'local_backend should not be set to true in CI/production',
      )
    }

    // In development, it's OK to have local_backend: true, just log it
    if (!process.env.CI && config.local_backend === true) {
      console.log('ℹ️ local_backend is enabled for local development')
    }
  })

  await t.test('backend configuration is properly set', () => {
    const configContent = fs.readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as Record<string, unknown>

    // Ensure backend configuration exists
    assert.ok('backend' in config, 'config should have backend property')

    const backend = config.backend as Record<string, unknown>
    assert.ok('name' in backend, 'backend should have name property')
    assert.ok('branch' in backend, 'backend should have branch property')
  })

  await t.test('budget_projet collection has echeance_format field', () => {
    const configContent = fs.readFileSync(configPath, 'utf8')
    const config = yaml.load(configContent) as Record<string, unknown>

    // Find budget_projet collection
    const collections = config.collections as Array<Record<string, unknown>>
    const budgetCollection = collections.find(
      col => col.name === 'budget_projet',
    )

    assert.ok(budgetCollection, 'budget_projet collection should exist')

    const fields = budgetCollection.fields as Array<Record<string, unknown>>
    const echeanceFormatField = fields.find(
      field => field.name === 'echeance_format',
    )

    assert.ok(
      echeanceFormatField,
      'echeance_format field should exist in budget_projet collection',
    )
    assert.strictEqual(
      echeanceFormatField.widget,
      'select',
      'echeance_format should be a select widget',
    )
  })
})
