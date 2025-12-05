import { test, expect, type Page, type Locator } from '@playwright/test'

/**
 * End-to-end tests for bank details displayed on donation and project pages
 * Ensures correct banking information is shown and copy functionality works
 */

// Expected bank details - canonical values that must be displayed correctly
const EXPECTED_BANK_DETAILS = {
  iban: 'CH97 0079 0042 4236 1827 8',
  swift: 'KBBECH22',
  beneficiary: 'Association Culturelle Musulmane de Saint-Imier',
  address: 'Rue de la Clef 45, 2610 St-Imier',
}

/**
 * Get the bank details section scoped by the "Virement bancaire" heading
 */
function getBankSection(page: Page): Locator {
  return page.getByRole('heading', { name: 'Virement bancaire' }).locator('..')
}

test.describe('Bank Details on Donation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/donation')
  })

  test('displays correct IBAN', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.iban),
    ).toBeVisible()
  })

  test('displays correct SWIFT/BIC code', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(bankSection.getByText('SWIFT/BIC :')).toBeVisible()
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.swift, { exact: true }),
    ).toBeVisible()
  })

  test('displays correct beneficiary', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.beneficiary),
    ).toBeVisible()
  })

  test('displays correct address', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.address),
    ).toBeVisible()
  })
})

test.describe('Bank Details on Projet Xhamia Nur Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projet-xhamia-nur')
  })

  test('displays correct IBAN', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.iban),
    ).toBeVisible()
  })

  test('displays correct SWIFT/BIC code', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(bankSection.getByText('SWIFT/BIC :')).toBeVisible()
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.swift, { exact: true }),
    ).toBeVisible()
  })

  test('displays correct beneficiary', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.beneficiary),
    ).toBeVisible()
  })

  test('displays correct address', async ({ page }) => {
    const bankSection = getBankSection(page)
    await expect(
      bankSection.getByText(EXPECTED_BANK_DETAILS.address),
    ).toBeVisible()
  })
})

test.describe('Copy Button Functionality', () => {
  // Grant clipboard permissions for these tests
  test.use({
    permissions: ['clipboard-read', 'clipboard-write'],
  })

  test('copies IBAN to clipboard when copy button is clicked', async ({
    page,
  }) => {
    await page.goto('/donation')
    const bankSection = getBankSection(page)

    // Find the IBAN copy button by its aria-label
    const ibanCopyButton = bankSection.getByRole('button', {
      name: "Copier l'IBAN",
    })
    await expect(ibanCopyButton).toBeVisible()

    // Click the copy button
    await ibanCopyButton.click()

    // Verify the button shows "copied" state (icon changes to checkmark)
    await expect(
      bankSection.getByRole('button', { name: "l'IBAN copié" }),
    ).toBeVisible()

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardContent).toBe(EXPECTED_BANK_DETAILS.iban)
  })

  test('copies SWIFT to clipboard when copy button is clicked', async ({
    page,
  }) => {
    await page.goto('/donation')
    const bankSection = getBankSection(page)

    // Find the SWIFT copy button by its aria-label
    const swiftCopyButton = bankSection.getByRole('button', {
      name: 'Copier le SWIFT',
    })
    await expect(swiftCopyButton).toBeVisible()

    // Click the copy button
    await swiftCopyButton.click()

    // Verify the button shows "copied" state
    await expect(
      bankSection.getByRole('button', { name: 'le SWIFT copié' }),
    ).toBeVisible()

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardContent).toBe(EXPECTED_BANK_DETAILS.swift)
  })

  test('copies beneficiary to clipboard when copy button is clicked', async ({
    page,
  }) => {
    await page.goto('/donation')
    const bankSection = getBankSection(page)

    // Find the beneficiary copy button
    const beneficiaryCopyButton = bankSection.getByRole('button', {
      name: 'Copier le bénéficiaire',
    })
    await expect(beneficiaryCopyButton).toBeVisible()

    // Click the copy button
    await beneficiaryCopyButton.click()

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardContent).toBe(EXPECTED_BANK_DETAILS.beneficiary)
  })

  test('copies address to clipboard when copy button is clicked', async ({
    page,
  }) => {
    await page.goto('/donation')
    const bankSection = getBankSection(page)

    // Find the address copy button
    const addressCopyButton = bankSection.getByRole('button', {
      name: "Copier l'adresse",
    })
    await expect(addressCopyButton).toBeVisible()

    // Click the copy button
    await addressCopyButton.click()

    // Verify clipboard content
    const clipboardContent = await page.evaluate(() =>
      navigator.clipboard.readText(),
    )
    expect(clipboardContent).toBe(EXPECTED_BANK_DETAILS.address)
  })

  test('copy button resets after 2 seconds', async ({ page }) => {
    await page.goto('/donation')
    const bankSection = getBankSection(page)

    const ibanCopyButton = bankSection.getByRole('button', {
      name: "Copier l'IBAN",
    })
    await ibanCopyButton.click()

    // Should show copied state
    await expect(
      bankSection.getByRole('button', { name: "l'IBAN copié" }),
    ).toBeVisible()

    // Wait for reset (2 seconds + buffer)
    await page.waitForTimeout(2500)

    // Should be back to copy state
    await expect(
      bankSection.getByRole('button', { name: "Copier l'IBAN" }),
    ).toBeVisible()
  })
})
