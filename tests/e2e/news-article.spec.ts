import { test, expect } from '../fixtures/browser'

test('news links open an article with rendered Markdown', async ({ page }) => {
  await page.goto('/actualites')

  const articleLink = page.locator('article h2').getByRole('link', {
    name: "Le nouveau site de l'ACMSI",
    exact: true,
  })
  await expect(articleLink).toBeVisible()
  const title = (await articleLink.innerText()).trim()
  const href = await articleLink.getAttribute('href')
  expect(href).toMatch(/^\/actualites\/[^/]+$/)
  expect(href).not.toContain('undefined')

  await articleLink.click()
  await expect(page).toHaveURL(href!)
  await expect(
    page
      .getByRole('main')
      .getByRole('heading', { level: 1, name: title, exact: true }),
  ).toBeVisible()
  await expect(page.locator('main .prose')).toContainText(
    'Bienvenue sur notre nouveau site web',
  )
  await expect(
    page
      .locator('main .prose')
      .getByRole('link', { name: 'projet d’acquisition de la mosquée Nur' }),
  ).toHaveAttribute('href', '/projet-xhamia-nur')
})
