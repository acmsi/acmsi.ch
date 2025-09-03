import { test } from 'node:test'
import assert from 'node:assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES modules equivalent for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Test to ensure that the footer contains social media icons with correct attributes
 */
test('Footer Social Media Icons', async t => {
  const layoutPath = path.join(__dirname, '../src/app/layout.tsx')

  await t.test('layout.tsx file exists', () => {
    assert.strictEqual(fs.existsSync(layoutPath), true)
  })

  const layoutContent = fs.readFileSync(layoutPath, 'utf8')

  await t.test('imports Instagram and WhatsApp icons from Phosphor', () => {
    assert.ok(
      layoutContent.includes('InstagramLogo'),
      'Should import InstagramLogo from Phosphor icons',
    )
    assert.ok(
      layoutContent.includes('WhatsappLogo'),
      'Should import WhatsappLogo from Phosphor icons',
    )
  })

  await t.test('contains Instagram link with correct attributes', () => {
    // Check for Instagram link
    assert.ok(
      layoutContent.includes(
        'href="https://www.instagram.com/xhamia_nur_stimier"',
      ),
      'Should contain Instagram link to xhamia_nur_stimier profile',
    )

    // Check for proper external link attributes
    assert.ok(
      layoutContent.includes('target="_blank"'),
      'Instagram link should open in new tab',
    )
    assert.ok(
      layoutContent.includes('rel="noopener noreferrer"'),
      'Instagram link should have security attributes',
    )
  })

  await t.test('contains Instagram icon component', () => {
    assert.ok(
      layoutContent.includes('<InstagramLogo'),
      'Should contain InstagramLogo component',
    )
  })

  await t.test('contains WhatsApp icon component', () => {
    assert.ok(
      layoutContent.includes('<WhatsappLogo'),
      'Should contain WhatsappLogo component',
    )
  })

  await t.test('icons are properly sized', () => {
    // Check that both icons have size attributes
    const instagramSizeMatch = layoutContent.match(
      /<InstagramLogo[^>]*size=\{(\d+)\}/,
    )
    const whatsappSizeMatch = layoutContent.match(
      /<WhatsappLogo[^>]*size=\{(\d+)\}/,
    )

    assert.ok(instagramSizeMatch, 'Instagram icon should have a size attribute')
    assert.ok(whatsappSizeMatch, 'WhatsApp icon should have a size attribute')

    // Both icons should have the same size
    assert.strictEqual(
      instagramSizeMatch?.[1],
      whatsappSizeMatch?.[1],
      'Instagram and WhatsApp icons should have the same size',
    )
  })

  await t.test('social icons container has proper styling', () => {
    assert.ok(
      layoutContent.includes('flex space-x-3'),
      'Social icons container should use flexbox with proper spacing',
    )
  })

  await t.test('footer section has proper responsive order', () => {
    // Check for responsive ordering classes
    assert.ok(
      layoutContent.includes('order-3 md:order-first'),
      'ACMSI section should be last on mobile, first on desktop',
    )
  })
})
