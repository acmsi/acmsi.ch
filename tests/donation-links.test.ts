import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Test to ensure that donation links are working and accessible
 */
test('Donation Links', async t => {
  const donationPagePath = path.join(__dirname, '../src/pages/donation.astro')
  const projectPagePath = path.join(
    __dirname,
    '../src/pages/projet-xhamia-nur/index.astro',
  )

  await t.test('donation page file exists', () => {
    assert.strictEqual(fs.existsSync(donationPagePath), true)
  })

  await t.test('project page file exists', () => {
    assert.strictEqual(fs.existsSync(projectPagePath), true)
  })

  const donationPageContent = fs.readFileSync(donationPagePath, 'utf8')
  const projectPageContent = fs.readFileSync(projectPagePath, 'utf8')

  await t.test('contains online payment link in donation page', () => {
    assert.ok(
      donationPageContent.includes('https://donate.raisenow.io/fnsym'),
      'Should contain online payment link',
    )
  })

  await t.test('contains online payment link in project page', () => {
    assert.ok(
      projectPageContent.includes('https://pay.raisenow.io/fnsym'),
      'Should contain online payment link',
    )
  })

  await t.test('online payment link is accessible', async () => {
    const donationUrl = 'https://donate.raisenow.io/fnsym'

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch(donationUrl, {
        method: 'HEAD', // Use HEAD to avoid downloading the full page
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      assert.ok(
        response.ok,
        `Online payment link should be accessible (status: ${response.status})`,
      )
      assert.strictEqual(
        response.status,
        200,
        `Online payment link should return 200 status (got: ${response.status})`,
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      assert.fail(`Failed to fetch online payment link: ${errorMessage}`)
    }
  })

  await t.test('donation links have proper attributes', () => {
    // Check for proper external link attributes in donation page
    assert.ok(
      donationPageContent.includes('target="_blank"') &&
        donationPageContent.includes('rel="noopener noreferrer"'),
      'Donation page should have proper external link attributes',
    )

    // Check for proper external link attributes in project page
    assert.ok(
      projectPageContent.includes('target="_blank"') &&
        projectPageContent.includes('rel="noopener noreferrer"'),
      'Project page should have proper external link attributes',
    )
  })

  await t.test('online payment sections are properly labeled', () => {
    assert.ok(
      donationPageContent.includes('Paiement en ligne'),
      'Donation page should have proper online payment label',
    )

    assert.ok(
      projectPageContent.includes('Paiement en ligne'),
      'Project page should have proper online payment label',
    )
  })
})
