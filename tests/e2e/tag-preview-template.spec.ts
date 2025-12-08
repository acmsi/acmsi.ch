import { test, expect } from '@playwright/test'

// Extend Window interface for CMS
interface CMS {
  registerPreviewTemplate?: (name: string, component: unknown) => void
  [key: string]: unknown
}

declare global {
  interface Window {
    CMS?: CMS
  }
}

// Helper to login to CMS
async function loginToCms(page: import('@playwright/test').Page) {
  await page.goto('/admin/index.html')
  await page.waitForLoadState('domcontentloaded')

  // With local_backend: true, CMS shows a Login button that auto-authenticates via the proxy
  const loginButton = page.locator('button:has-text("Login")')
  await expect(loginButton).toBeVisible({ timeout: 10000 })
  await loginButton.click()

  // Wait for CMS to load after login
  await expect(page.locator('text=Collections')).toBeVisible({ timeout: 10000 })
}

test.describe('Tag Custom Preview Template', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport as per project requirements
    await page.setViewportSize({ width: 1024, height: 950 })
  })

  test('should load CMS admin interface', async ({ page }) => {
    await loginToCms(page)
    // If we got here, the CMS loaded successfully
  })

  test('should load custom preview template script', async ({ page }) => {
    await loginToCms(page)

    // Check if our custom preview template script loaded
    const scriptLoaded = await page.evaluate(() => {
      return typeof window.CMS !== 'undefined'
    })

    expect(scriptLoaded).toBe(true)
  })

  test('should show custom preview when editing a tag', async ({ page }) => {
    await loginToCms(page)

    // Navigate to Tags collection
    await page.click('text=Tags')
    await page.waitForTimeout(500)

    // Click on an existing tag to edit it
    const tagEntry = page
      .locator('a[href*="/collections/tags/entries/"]')
      .first()
    await expect(tagEntry).toBeVisible({ timeout: 5000 })
    await tagEntry.click()

    // Wait for editor to load with preview pane
    await page.waitForTimeout(1000)

    // The preview pane should show our custom TagPreview component
    const previewIframe = page.locator('iframe').first()
    const previewFrame = previewIframe.contentFrame()
    await expect(
      previewFrame.locator('text=Articles utilisant ce tag'),
    ).toBeVisible({ timeout: 10000 })
  })
})
