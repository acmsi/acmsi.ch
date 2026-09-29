import { test, expect } from '../fixtures/browser'

test('page assets load and interactive islands hydrate', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 375, height: 812 })
  const response = await page.goto('/projet-xhamia-nur', {
    waitUntil: 'domcontentloaded',
  })
  expect(response?.ok()).toBe(true)

  const icon = await page.locator('link[rel="icon"]').getAttribute('href')
  expect(icon).toBeTruthy()
  const favicon = await page.request.get(icon!)
  expect(favicon.ok()).toBe(true)
  expect(favicon.headers()['content-type']).toContain('image/svg+xml')
  await expect(page.locator('body')).toHaveCSS('font-family', /^Mada,/)
  await page.evaluate(() => document.fonts.ready)
  expect(await page.evaluate(() => document.fonts.check('16px Mada'))).toBe(
    true,
  )

  const menu = page
    .getByRole('banner')
    .getByRole('button', { name: 'Menu', exact: true })
  await expect(
    menu.locator('xpath=ancestor::astro-island'),
  ).not.toHaveAttribute('ssr')
  await menu.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()

  const photo = page
    .locator('main [role="button"]')
    .filter({ has: page.locator('img') })
    .first()
  await photo.scrollIntoViewIfNeeded()
  await expect(
    photo.locator('xpath=ancestor::astro-island'),
  ).not.toHaveAttribute('ssr')
  await photo.click()
  await expect(
    page.getByRole('button', { name: 'Fermer la galerie' }).first(),
  ).toBeVisible()
  expect(errors).toEqual([])
})
