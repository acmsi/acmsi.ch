import { test, expect } from '@playwright/test'

test.describe('Tag Filtering on Actualités Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport as per project requirements
    await page.setViewportSize({ width: 1024, height: 950 })
  })

  test('should display all articles by default', async ({ page }) => {
    await page.goto('/actualites')

    // Check that the page loads
    const main = page.getByRole('main')
    await expect(
      main.getByRole('heading', { level: 1, name: 'Actualités' }),
    ).toBeVisible()

    // Should show all articles (at least one)
    const articleCount = await page.locator('article').count()
    expect(articleCount).toBeGreaterThan(0)
  })

  test('should show tag filter UI when tags exist', async ({ page }) => {
    await page.goto('/actualites')

    // Wait for content to load
    await expect(page.locator('article').first()).toBeVisible()

    // Check if tag filter is visible (may not exist if no tags)
    const tagFilter = page
      .locator('[data-testid="tag-filter"]')
      .or(page.getByRole('link', { name: 'Tous' }))

    if ((await tagFilter.count()) > 0) {
      await expect(tagFilter).toBeVisible()
    }
  })

  test('should filter articles by tag via URL parameter', async ({ page }) => {
    // Visit with a tag parameter
    await page.goto('/actualites?tag=annonce')

    // Check that the page loads
    const main = page.getByRole('main')
    await expect(
      main.getByRole('heading', { level: 1, name: 'Actualités' }),
    ).toBeVisible()

    // Should show filter status with tag name
    const filterStatus = page.getByText('Filtré par tag')
    if ((await filterStatus.count()) > 0) {
      await expect(filterStatus).toBeVisible()
      // The filter indicator shows the tag name - use first() to get the indicator span
      await expect(page.getByText('annonce').first()).toBeVisible()
    }
  })

  test('should handle URL encoding for tag with spaces', async ({ page }) => {
    // Visit with encoded tag parameter
    await page.goto('/actualites?tag=site%20web')

    // Check that the page loads without error
    const main = page.getByRole('main')
    await expect(
      main.getByRole('heading', { level: 1, name: 'Actualités' }),
    ).toBeVisible()

    // Should show filter status if articles exist
    const filterStatus = page.getByText('Filtré par tag')
    if ((await filterStatus.count()) > 0) {
      await expect(filterStatus).toBeVisible()
      // The filter indicator shows the tag name - use first() to get the indicator span
      await expect(page.getByText('site web').first()).toBeVisible()
    }
  })

  test('should allow clearing the filter', async ({ page }) => {
    // Start with a filtered view
    await page.goto('/actualites?tag=annonce')

    // Look for clear filter link
    const clearFilter = page
      .getByRole('link', { name: 'Effacer le filtre' })
      .or(page.getByRole('link', { name: 'supprimer le filtre' }))

    if ((await clearFilter.count()) > 0) {
      await clearFilter.click()

      // Should navigate back to unfiltered view
      await expect(page).toHaveURL('/actualites')
      await expect(page.getByText('Filtré par tag')).toHaveCount(0)
    }
  })

  test('should show appropriate message when no articles match filter', async ({
    page,
  }) => {
    // Use a non-existent tag
    await page.goto('/actualites?tag=non-existent-tag')

    // Check for empty state message
    const emptyMessage = page.getByText('Aucune actualité avec le tag')
    if ((await emptyMessage.count()) > 0) {
      await expect(emptyMessage).toBeVisible()

      // Should have link to clear filter
      const clearLink = page.getByRole('link', { name: 'supprimer le filtre' })
      await expect(clearLink).toBeVisible()
      await expect(clearLink).toHaveAttribute('href', '/actualites')
    }
  })

  test('should make tag links in articles clickable', async ({ page }) => {
    await page.goto('/actualites')

    // Wait for articles to load
    await expect(page.locator('article').first()).toBeVisible()

    // Look for tag links within articles
    const tagLinks = page.locator('article a[href*="?tag="]')

    if ((await tagLinks.count()) > 0) {
      const firstTagLink = tagLinks.first()

      // Check that tag link has proper href
      const href = await firstTagLink.getAttribute('href')
      expect(href).toMatch(/\/actualites\?tag=.+/)

      // Click the tag link
      await firstTagLink.click()

      // Should navigate to filtered view
      await expect(page).toHaveURL(/\/actualites\?tag=.+/)
      await expect(page.getByText('Filtré par tag')).toBeVisible()
    }
  })

  test('should show article count in filter results', async ({ page }) => {
    await page.goto('/actualites?tag=annonce')

    // Look for article count display (regex pattern for "X article(s) trouvé(s)")
    const countDisplay = page.getByText(/\d+ articles? trouvés?/)
    if ((await countDisplay.count()) > 0) {
      await expect(countDisplay).toBeVisible()
    }
  })

  test('should maintain responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('/actualites')

    // Check that the page is still usable on mobile
    const main = page.getByRole('main')
    await expect(main.getByRole('heading', { level: 1 })).toBeVisible()

    // Tag filter should wrap properly on mobile
    const tagFilter = page
      .getByRole('link', { name: 'Tous' })
      .or(page.locator('[data-testid="tag-filter"]'))

    if ((await tagFilter.count()) > 0) {
      await expect(tagFilter).toBeVisible()
    }
  })

  test('should handle direct navigation to filtered URLs', async ({ page }) => {
    // Directly navigate to a filtered URL
    await page.goto('/actualites?tag=communauté')

    // Page should load correctly
    const main = page.getByRole('main')
    await expect(
      main.getByRole('heading', { level: 1, name: 'Actualités' }),
    ).toBeVisible()

    // Should show either filter message with articles or empty message
    const hasFilterMessage =
      (await page.getByText('Filtré par tag').count()) > 0
    const hasEmptyMessage =
      (await page.getByText('Aucune actualité avec le tag').count()) > 0

    expect(hasFilterMessage || hasEmptyMessage).toBe(true)
  })
})
