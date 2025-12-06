import { test, expect } from '@playwright/test'

/**
 * End-to-end tests for Jumma prayer information
 * Ensures consistency between homepage and contact page
 */

test.describe('Jumma Prayer Information', () => {
  test('homepage displays Jumma times in hero section', async ({ page }) => {
    await page.goto('/')

    // Check Jumma time is displayed as a link
    const jummaLink = page.getByRole('main').getByRole('link', {
      name: /Jumma : 12h15/,
    })
    await expect(jummaLink).toBeVisible()
    await expect(jummaLink).toHaveAttribute('href', '/contact#jumma')
    await expect(page.getByText('(Salat 12h30)')).toBeVisible()
  })

  test('homepage has links to prayer times and parking info', async ({
    page,
  }) => {
    await page.goto('/')

    const heroSection = page.getByRole('main')

    // Check prayer times link in hero
    const prayerTimesLink = heroSection.getByRole('link', {
      name: 'Horaires des prières',
    })
    await expect(prayerTimesLink).toBeVisible()
    await expect(prayerTimesLink).toHaveAttribute(
      'href',
      '/contact#horaires-prieres',
    )

    // Check parking info link in hero
    const parkingLink = heroSection.getByRole('link', {
      name: 'Informations Stationnement',
    })
    await expect(parkingLink).toBeVisible()
    await expect(parkingLink).toHaveAttribute('href', '/contact#parking-info')
  })

  test('contact page displays matching Jumma times', async ({ page }) => {
    await page.goto('/contact#jumma')

    // Check Friday prayer section exists and has anchor
    const jummaSection = page.locator('#jumma')
    await expect(jummaSection).toBeVisible()
    await expect(
      jummaSection.getByRole('heading', { name: 'Jumma – Prière du Vendredi' }),
    ).toBeVisible()

    // Check Khutbah time matches homepage (12:15 = 12h15)
    await expect(
      jummaSection.getByRole('term').filter({ hasText: 'Khutbah' }),
    ).toBeVisible()
    await expect(jummaSection.getByText('12:15', { exact: true })).toBeVisible()

    // Check Salat time matches homepage (12:30 = 12h30)
    await expect(
      jummaSection.getByRole('term').filter({ hasText: 'Prière' }),
    ).toBeVisible()
    await expect(jummaSection.getByText('12:30', { exact: true })).toBeVisible()
  })

  test('Jumma times are consistent between homepage and contact page', async ({
    page,
  }) => {
    // Get times from homepage
    await page.goto('/')
    const homepageJummaText = await page
      .locator('text=Jumma : 12h15')
      .textContent()
    const homepageSalatText = await page
      .locator('text=(Salat 12h30)')
      .textContent()

    // Extract times (format: 12h15 -> 12:15)
    const homepageKhutbah = homepageJummaText?.match(/(\d{1,2})h(\d{2})/)
    const homepageSalat = homepageSalatText?.match(/(\d{1,2})h(\d{2})/)

    expect(homepageKhutbah).toBeTruthy()
    expect(homepageSalat).toBeTruthy()

    const expectedKhutbah = `${homepageKhutbah![1]}:${homepageKhutbah![2]}`
    const expectedSalat = `${homepageSalat![1]}:${homepageSalat![2]}`

    // Navigate to contact page and verify times match
    await page.goto('/contact')

    // Find the Friday prayer section and verify times
    const fridaySection = page.locator('text=Prière du Vendredi').locator('..')
    await expect(fridaySection.getByText(expectedKhutbah)).toBeVisible()
    await expect(fridaySection.getByText(expectedSalat)).toBeVisible()
  })

  test('Jumma link navigates to correct section', async ({ page }) => {
    await page.goto('/')

    // Click on Jumma link in hero
    await page
      .getByRole('main')
      .getByRole('link', { name: /Jumma : 12h15/ })
      .click()

    // Should navigate to contact page with anchor
    await expect(page).toHaveURL('/contact#jumma')

    // The Jumma section should be visible
    await expect(
      page.getByRole('heading', { name: 'Jumma – Prière du Vendredi' }),
    ).toBeVisible()
  })

  test('prayer times link navigates to correct section', async ({ page }) => {
    await page.goto('/')

    // Click on prayer times link
    await page.getByRole('link', { name: 'Horaires des prières' }).click()

    // Should navigate to contact page with anchor
    await expect(page).toHaveURL('/contact#horaires-prieres')

    // The prayer times section should be visible
    await expect(page.getByText('Horaires des Prières')).toBeVisible()
  })

  test('parking info link navigates to correct section', async ({ page }) => {
    await page.goto('/')

    // Click on parking info link in hero (not footer)
    await page
      .getByRole('main')
      .getByRole('link', { name: 'Informations Stationnement' })
      .click()

    // Should navigate to contact page with anchor
    await expect(page).toHaveURL('/contact#parking-info')

    // The parking section should be visible
    await expect(
      page.getByRole('heading', { name: 'Informations de Stationnement' }),
    ).toBeVisible()
  })
})
