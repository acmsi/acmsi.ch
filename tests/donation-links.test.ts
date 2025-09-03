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
  const donationPagePath = path.join(__dirname, '../src/app/donation/page.tsx')
  const projectPagePath = path.join(
    __dirname,
    '../src/app/projet-xhamia-nur/page.tsx',
  )

  await t.test('donation page file exists', () => {
    assert.strictEqual(fs.existsSync(donationPagePath), true)
  })

  await t.test('project page file exists', () => {
    assert.strictEqual(fs.existsSync(projectPagePath), true)
  })

  const donationPageContent = fs.readFileSync(donationPagePath, 'utf8')
  const projectPageContent = fs.readFileSync(projectPagePath, 'utf8')

  await t.test('contains RaiseNow donation link in donation page', () => {
    assert.ok(
      donationPageContent.includes('https://pay.raisenow.io/jkyys'),
      'Should contain RaiseNow donation link',
    )
  })

  await t.test('contains RaiseNow donation link in project page', () => {
    assert.ok(
      projectPageContent.includes('https://pay.raisenow.io/jkyys'),
      'Should contain RaiseNow donation link',
    )
  })

  await t.test('RaiseNow donation link is accessible', async () => {
    const donationUrl = 'https://pay.raisenow.io/jkyys'

    try {
      const response = await fetch(donationUrl, {
        method: 'HEAD', // Use HEAD to avoid downloading the full page
        timeout: 10000, // 10 second timeout
      })

      assert.ok(
        response.ok,
        `RaiseNow link should be accessible (status: ${response.status})`,
      )
      assert.strictEqual(
        response.status,
        200,
        `RaiseNow link should return 200 status (got: ${response.status})`,
      )
    } catch (error) {
      assert.fail(`Failed to fetch RaiseNow donation link: ${error.message}`)
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

  await t.test('Twint via RaiseNow sections are properly labeled', () => {
    assert.ok(
      donationPageContent.includes('Twint (via RaiseNow)'),
      'Donation page should have proper Twint RaiseNow label',
    )

    assert.ok(
      projectPageContent.includes('Twint (via RaiseNow)'),
      'Project page should have proper Twint RaiseNow label',
    )
  })
})
