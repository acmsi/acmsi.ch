import { test, expect, Page } from '@playwright/test'

/**
 * End-to-end tests for navigation functionality
 * Tests both mobile and desktop navigation behavior
 */

/**
 * Helper to open mobile menu reliably
 * Waits for React hydration and ensures the menu opens
 */
async function openMobileMenu(page: Page) {
  const menuButton = page.getByRole('banner').getByRole('button', { name: 'Menu' })
  await expect(menuButton).toBeVisible()
  // Wait for React hydration before clicking
  await page.waitForTimeout(100)
  await menuButton.click()
  const mobileMenu = page.getByRole('dialog')
  await expect(mobileMenu).toBeVisible()
  return mobileMenu
}

const NAVIGATION_LINKS = [
  { text: 'Accueil', href: '/' },
  { text: 'À propos', href: '/a-propos' },
  { text: 'Actualités', href: '/actualites' },
  { text: 'Donation', href: '/donation' },
  { text: 'Contact', href: '/contact' },
]

test.describe('Mobile Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport (iPhone SE size)
    await page.setViewportSize({ width: 375, height: 667 })
  })

  test('displays mobile menu button', async ({ page }) => {
    await page.goto('/')

    // Scope to header to avoid Astro dev toolbar
    const header = page.getByRole('banner')
    const mobileMenuButton = header.getByRole('button', { name: 'Menu' })
    await expect(mobileMenuButton).toBeVisible()
  })

  test('opens and closes mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)

    // Close it
    await mobileMenu.getByRole('button', { name: 'Fermer' }).click()
    await expect(mobileMenu).toBeHidden()
  })

  test('displays all navigation links in mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)

    // Check that all expected navigation links are present
    for (const link of NAVIGATION_LINKS) {
      const linkElement = mobileMenu.getByRole('link', { name: link.text })
      await expect(linkElement).toBeVisible()
      await expect(linkElement).toHaveAttribute('href', link.href)
    }
  })

  test('closes mobile menu when ESC key is pressed', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)

    // Press ESC key to close
    await page.keyboard.press('Escape')

    await expect(mobileMenu).toBeHidden()
  })

  test('navigates to page and closes menu when link is clicked', async ({
    page,
  }) => {
    await page.goto('/')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)
    await mobileMenu.getByRole('link', { name: 'À propos' }).click()

    // Should navigate to the about page
    await expect(page).toHaveURL('/a-propos')

    // Mobile menu should be closed after navigation
    await expect(page.getByRole('dialog')).toBeHidden()
  })

  test('ACMSI logo navigates to home', async ({ page }) => {
    await page.goto('/contact')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)

    // Click on ACMSI logo in mobile menu
    const logoLink = mobileMenu.getByRole('link', { name: 'ACMSI' })
    await logoLink.click()

    await expect(page).toHaveURL('/')
  })

  test('mobile menu has correct accessibility attributes', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu using helper
    const mobileMenu = await openMobileMenu(page)
    await expect(mobileMenu).toHaveAttribute('aria-modal', 'true')

    // Close button should have focus for keyboard navigation
    const closeButton = mobileMenu.getByRole('button', { name: 'Fermer' })
    await expect(closeButton).toBeFocused()
  })
})

test.describe('Desktop Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport (as per project instructions: 1024x950)
    await page.setViewportSize({ width: 1024, height: 950 })
  })

  test('displays desktop navigation and hides mobile menu button', async ({
    page,
  }) => {
    await page.goto('/')

    // Header navigation should be visible
    const header = page.getByRole('banner')
    const nav = header.getByRole('navigation')
    await expect(nav).toBeVisible()

    // Mobile menu button should be hidden (scoped to header)
    const mobileMenuButton = header.getByRole('button', { name: 'Menu' })
    await expect(mobileMenuButton).toBeHidden()
  })

  test('displays all navigation links', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('banner').getByRole('navigation')

    // Check that all expected navigation links are present
    for (const link of NAVIGATION_LINKS) {
      const linkElement = nav.getByRole('link', { name: link.text })
      await expect(linkElement).toBeVisible()
      await expect(linkElement).toHaveAttribute('href', link.href)
    }
  })

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('banner').getByRole('navigation')

    // Test navigation to About page
    await nav.getByRole('link', { name: 'À propos' }).click()
    await expect(page).toHaveURL('/a-propos')

    // Test navigation to Contact page
    await nav.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL('/contact')

    // Test navigation to Donation page
    await nav.getByRole('link', { name: 'Donation' }).click()
    await expect(page).toHaveURL('/donation')
  })

  test('ACMSI logo navigates to home', async ({ page }) => {
    await page.goto('/contact')

    // Click on ACMSI logo in header
    const header = page.getByRole('banner')
    const logoLink = header.getByRole('link', { name: 'ACMSI' })
    await logoLink.click()

    await expect(page).toHaveURL('/')
  })
})

test.describe('Responsive Breakpoints', () => {
  test('switches between mobile and desktop navigation at md breakpoint', async ({
    page,
  }) => {
    await page.goto('/')

    const header = page.getByRole('banner')
    const mobileMenuButton = header.getByRole('button', { name: 'Menu' })

    // At md breakpoint (768px), mobile button should be hidden
    await page.setViewportSize({ width: 768, height: 600 })
    await expect(mobileMenuButton).toBeHidden()

    // Below md breakpoint, mobile menu button should be visible
    await page.setViewportSize({ width: 767, height: 600 })
    await expect(mobileMenuButton).toBeVisible()
  })
})

test.describe('WhatsApp Community Links', () => {
  const WHATSAPP_URL = 'https://chat.whatsapp.com/FsRYOthycLQLCmekiojmQ2'

  test('footer has WhatsApp link', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    const whatsappLink = footer.locator(`a[href="${WHATSAPP_URL}"]`)
    await expect(whatsappLink).toBeVisible()
  })

  test('contact page has WhatsApp link', async ({ page }) => {
    await page.goto('/contact')
    // Use exact name to avoid matching footer link
    const whatsappLink = page.getByRole('link', {
      name: 'Rejoindre la communauté →',
    })
    await expect(whatsappLink).toHaveAttribute('href', WHATSAPP_URL)
  })
})
