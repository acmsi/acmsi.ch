import { test, expect } from '@playwright/test'

/**
 * End-to-end tests for navigation functionality
 * Tests both mobile and desktop navigation behavior
 */

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

  test('displays mobile menu button and hides desktop navigation', async ({
    page,
  }) => {
    await page.goto('/')

    // Mobile menu button should be visible
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await expect(mobileMenuButton).toBeVisible()

    // Verify the button contains DotsThreeOutline icon (by checking for button with specific aria-label)
    await expect(mobileMenuButton).toHaveClass(/md:hidden/)

    // Desktop navigation should be hidden
    const desktopNav = page.locator('.hidden.md\\:block')
    await expect(desktopNav).toBeHidden()
  })

  test('opens mobile menu overlay when menu button is clicked', async ({
    page,
  }) => {
    await page.goto('/')

    // Click the mobile menu button
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Mobile menu overlay should be visible
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeVisible()

    // Check that overlay has correct styling (fullscreen, backdrop blur)
    await expect(mobileMenuOverlay).toHaveClass(/fixed/)
    await expect(mobileMenuOverlay).toHaveClass(/inset-0/)
    await expect(mobileMenuOverlay).toHaveClass(/bg-white\/95/)
    await expect(mobileMenuOverlay).toHaveClass(/backdrop-blur-sm/)
  })

  test('displays all navigation links in mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Check that all expected navigation links are present
    for (const link of NAVIGATION_LINKS) {
      const linkElement = page.locator(
        `[role="dialog"] nav a[href="${link.href}"]`,
      )
      await expect(linkElement).toBeVisible()
      await expect(linkElement).toHaveText(link.text)
    }
  })

  test('closes mobile menu when X button is clicked', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Mobile menu should be open
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeVisible()

    // Click the close button
    const closeButton = page.locator('[aria-label="Fermer"]')
    await expect(closeButton).toBeVisible()
    await closeButton.click()

    // Mobile menu should be closed
    await expect(mobileMenuOverlay).toBeHidden()
  })

  test('closes mobile menu when ESC key is pressed', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Mobile menu should be open
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeVisible()

    // Press ESC key
    await page.keyboard.press('Escape')

    // Mobile menu should be closed
    await expect(mobileMenuOverlay).toBeHidden()
  })

  test('navigates to correct page and closes menu when link is clicked', async ({
    page,
  }) => {
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Click on "À propos" link
    const aboutLink = page.locator('[role="dialog"] nav a[href="/a-propos"]')
    await aboutLink.click()

    // Should navigate to the about page
    await expect(page).toHaveURL('/a-propos')

    // Mobile menu should be closed after navigation
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeHidden()
  })

  test('ACMSI logo in mobile menu navigates to home and closes menu', async ({
    page,
  }) => {
    await page.goto('/contact') // Start from a different page

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Click on ACMSI logo in mobile menu
    const logoLink = page.locator('[role="dialog"] a[href="/"]').first()
    await expect(logoLink).toHaveText('ACMSI')
    await logoLink.click()

    // Should navigate to home page
    await expect(page).toHaveURL('/')

    // Mobile menu should be closed
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeHidden()
  })

  test('mobile menu has correct accessibility attributes', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Check accessibility attributes
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toHaveAttribute('role', 'dialog')
    await expect(mobileMenuOverlay).toHaveAttribute('aria-modal', 'true')

    // Close button should have focus
    const closeButton = page.locator('[aria-label="Fermer"]')
    await expect(closeButton).toHaveAttribute('aria-label', 'Fermer')
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

    // Desktop navigation should be visible
    const desktopNav = page.locator('.hidden.md\\:block')
    await expect(desktopNav).toBeVisible()

    // Mobile menu button should be hidden
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await expect(mobileMenuButton).toBeHidden()
  })

  test('displays all navigation links in desktop navigation', async ({
    page,
  }) => {
    await page.goto('/')

    // Check that all expected navigation links are present in desktop nav
    for (const link of NAVIGATION_LINKS) {
      const linkElement = page.locator(
        `.hidden.md\\:block a[href="${link.href}"]`,
      )
      await expect(linkElement).toBeVisible()
      await expect(linkElement).toHaveText(link.text)
    }
  })

  test('desktop navigation links are functional', async ({ page }) => {
    await page.goto('/')

    // Test navigation to About page
    const aboutLink = page.locator('.hidden.md\\:block a[href="/a-propos"]')
    await aboutLink.click()
    await expect(page).toHaveURL('/a-propos')

    // Go back to home
    await page.goto('/')

    // Test navigation to Contact page
    const contactLink = page.locator('.hidden.md\\:block a[href="/contact"]')
    await contactLink.click()
    await expect(page).toHaveURL('/contact')

    // Test navigation to Donation page
    await page.goto('/')
    const donationLink = page.locator('.hidden.md\\:block a[href="/donation"]')
    await donationLink.click()
    await expect(page).toHaveURL('/donation')
  })

  test('desktop navigation has hover effects', async ({ page }) => {
    await page.goto('/')

    // Test that navigation container has the proper CSS classes with * selectors
    const navContainer = page.locator('.hidden.md\\:block > div')
    await expect(navContainer).toHaveClass(/\*:text-gray-700/)
    await expect(navContainer).toHaveClass(/\*:hover:text-teal-600/)
    await expect(navContainer).toHaveClass(/\*:px-3/)
    await expect(navContainer).toHaveClass(/\*:py-2/)
    await expect(navContainer).toHaveClass(/\*:rounded-md/)
    await expect(navContainer).toHaveClass(/\*:font-medium/)

    // Test that links exist and are functional
    const homeLink = page.locator('.hidden.md\\:block a[href="/"]')
    await expect(homeLink).toBeVisible()
    await expect(homeLink).toHaveText('Accueil')
  })

  test('ACMSI logo is functional in desktop view', async ({ page }) => {
    await page.goto('/contact') // Start from a different page

    // Click on ACMSI logo
    const logoLink = page.locator('header a[href="/"]').first()
    await expect(logoLink).toHaveText('ACMSI')
    await logoLink.click()

    // Should navigate to home page
    await expect(page).toHaveURL('/')
  })

  test('desktop navigation layout is correct', async ({ page }) => {
    await page.goto('/')

    // Check header structure
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check navigation container
    const nav = page.locator('header nav')
    await expect(nav).toHaveClass(/max-w-7xl/)
    await expect(nav).toHaveClass(/mx-auto/)

    // Check navigation flex layout
    const navContent = page.locator('header nav > div')
    await expect(navContent).toHaveClass(/flex/)
    await expect(navContent).toHaveClass(/justify-between/)
    await expect(navContent).toHaveClass(/items-center/)
  })
})

test.describe('Navigation Cross-Device Behavior', () => {
  test('mobile menu does not interfere with desktop navigation', async ({
    page,
  }) => {
    // Start with mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // Open mobile menu
    const mobileMenuButton = page.locator('[aria-label="Menu"]')
    await mobileMenuButton.click()

    // Verify mobile menu is open
    const mobileMenuOverlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(mobileMenuOverlay).toBeVisible()

    // Resize to desktop viewport
    await page.setViewportSize({ width: 1024, height: 950 })

    // Mobile menu should be hidden due to CSS classes
    await expect(mobileMenuOverlay).toHaveClass(/md:hidden/)

    // Desktop navigation should be visible
    const desktopNav = page.locator('.hidden.md\\:block')
    await expect(desktopNav).toBeVisible()

    // Mobile menu button should be hidden
    await expect(mobileMenuButton).toBeHidden()
  })

  test('responsive breakpoints work correctly', async ({ page }) => {
    await page.goto('/')

    // Test at exactly 768px (md breakpoint)
    await page.setViewportSize({ width: 768, height: 600 })

    // At md breakpoint, desktop nav should be visible, mobile button hidden
    const desktopNav = page.locator('.hidden.md\\:block')
    const mobileMenuButton = page.locator('[aria-label="Menu"]')

    await expect(desktopNav).toBeVisible()
    await expect(mobileMenuButton).toBeHidden()

    // Test below md breakpoint
    await page.setViewportSize({ width: 767, height: 600 })

    await expect(desktopNav).toBeHidden()
    await expect(mobileMenuButton).toBeVisible()
  })
})
