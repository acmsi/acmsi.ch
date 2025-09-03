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

  await t.test('imports social media icons from Phosphor', () => {
    assert.ok(
      layoutContent.includes('InstagramLogo'),
      'Should import InstagramLogo from Phosphor icons',
    )
    assert.ok(
      layoutContent.includes('FacebookLogo'),
      'Should import FacebookLogo from Phosphor icons',
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

  await t.test('contains Facebook link with correct attributes', () => {
    // Check for Facebook link
    assert.ok(
      layoutContent.includes(
        'href="https://www.facebook.com/share/1Diw8r8WrC/"',
      ),
      'Should contain Facebook link',
    )

    // Check for proper external link attributes
    assert.ok(
      layoutContent.includes('target="_blank"'),
      'Facebook link should open in new tab',
    )
    assert.ok(
      layoutContent.includes('rel="noopener noreferrer"'),
      'Facebook link should have security attributes',
    )
  })

  await t.test('contains social media icon components', () => {
    assert.ok(
      layoutContent.includes('<InstagramLogo'),
      'Should contain InstagramLogo component',
    )
    assert.ok(
      layoutContent.includes('<FacebookLogo'),
      'Should contain FacebookLogo component',
    )
    assert.ok(
      layoutContent.includes('<WhatsappLogo'),
      'Should contain WhatsappLogo component',
    )
  })

  await t.test('icons are properly sized', () => {
    // Check that all icons have size attributes
    const instagramSizeMatch = layoutContent.match(
      /<InstagramLogo[^>]*size=\{(\d+)\}/,
    )
    const facebookSizeMatch = layoutContent.match(
      /<FacebookLogo[^>]*size=\{(\d+)\}/,
    )
    const whatsappSizeMatch = layoutContent.match(
      /<WhatsappLogo[^>]*size=\{(\d+)\}/,
    )

    assert.ok(instagramSizeMatch, 'Instagram icon should have a size attribute')
    assert.ok(facebookSizeMatch, 'Facebook icon should have a size attribute')
    assert.ok(whatsappSizeMatch, 'WhatsApp icon should have a size attribute')

    // All icons should have the same size
    assert.strictEqual(
      instagramSizeMatch?.[1],
      facebookSizeMatch?.[1],
      'Instagram and Facebook icons should have the same size',
    )
    assert.strictEqual(
      facebookSizeMatch?.[1],
      whatsappSizeMatch?.[1],
      'Facebook and WhatsApp icons should have the same size',
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
