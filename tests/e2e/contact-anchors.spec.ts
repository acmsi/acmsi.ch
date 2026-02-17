import { test, expect } from '@playwright/test'

/**
 * Tests for contact page anchor links and short URL redirects.
 * Ensures anchors use ASCII-only IDs (no accented characters)
 * and that convenience redirects like /parking work correctly.
 */

test.describe('Contact page anchors', () => {
  test('parking-info anchor exists', async ({ page }) => {
    await page.goto('/contact')
    const section = page.locator('#parking-info')
    await expect(section).toBeAttached()
  })

  test('horaires-prieres anchor exists (no accents)', async ({ page }) => {
    await page.goto('/contact')
    const section = page.locator('#horaires-prieres')
    await expect(section).toBeAttached()
  })

  test('no element IDs contain accented characters', async ({ page }) => {
    await page.goto('/contact')
    const accentedIds = await page.evaluate(() => {
      const allWithId = document.querySelectorAll('[id]')
      // Match any character outside basic ASCII printable range in IDs
      const nonAscii = /[^\x20-\x7E]/
      return Array.from(allWithId)
        .filter(el => nonAscii.test(el.id))
        .map(el => el.id)
    })
    expect(accentedIds, 'IDs with accented characters found').toEqual([])
  })
})

test.describe('/parking redirect', () => {
  test('redirects to /contact#parking-info', async ({ page }) => {
    await page.goto('/parking')
    await expect(page).toHaveURL(/\/contact#parking-info/)
  })
})
