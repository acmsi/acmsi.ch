import { test, expect } from '../fixtures/browser'

const articleUrl = '/actualites/2026-09-14-rencontre-soutien-mosquee-nur'

test('one news entry links to all translations and their matching flyers', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/actualites')
  await expect(page.locator('article')).toHaveCount(2)
  await page
    .getByRole('heading', {
      name: 'Le 27 septembre, retrouvons-nous pour la mosquée Nur',
    })
    .getByRole('link')
    .click()
  for (const [language, name, title] of [
    ['sq', 'Shqip', 'Më 27 shtator, të mblidhemi për xhaminë Nur'],
    ['de', 'Deutsch', 'Am 27. September treffen wir uns für die Nur-Moschee'],
    ['bs', 'Bosanski', 'Okupimo se 27. septembra za džamiju Nur'],
    ['fr', 'Français', 'Le 27 septembre, retrouvons-nous pour la mosquée Nur'],
  ]) {
    await page
      .locator('nav[aria-label]')
      .getByRole('link', { name, exact: true })
      .click()
    await expect(page).toHaveURL(
      language === 'fr' ? articleUrl : `${articleUrl}/${language}`,
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page.locator('nav a[hreflang]')).toHaveText([
      'Bosanski',
      'Deutsch',
      'Français',
      'Shqip',
    ])
    const flyer = await page.locator('section[lang] img').boundingBox()
    const paragraph = await page.locator('.prose > p').first().boundingBox()
    const gap = paragraph!.y - flyer!.y - flyer!.height
    expect(gap).toBeGreaterThanOrEqual(24)
    expect(gap).toBeLessThanOrEqual(80)
    const breadcrumb = page.getByRole('navigation', { name: 'Fil d’Ariane' })
    const parent = await breadcrumb.getByRole('link').boundingBox()
    const current = await breadcrumb
      .locator('[aria-current="page"]')
      .boundingBox()
    const separator = await breadcrumb
      .locator('[aria-hidden="true"]')
      .boundingBox()
    expect(Math.abs(parent!.y - separator!.y)).toBeLessThan(1)
    expect(separator!.x).toBeGreaterThan(parent!.x + parent!.width)
    expect(current!.y).toBeGreaterThan(parent!.y)
    expect(current!.x).toBe(parent!.x)
    expect(current!.x + current!.width).toBeLessThanOrEqual(375)
    await expect(
      page.locator(`section[lang="${language}"] img`),
    ).toHaveAttribute('src', new RegExp(`${language}\\.jpeg`))
    await expect(page.locator('a[aria-current="page"]')).toHaveText(name)
    await expect(page.locator('head link[rel="alternate"]')).toHaveCount(4)
  }
  await page.goto('/actualites/2024-12-22-bienvenue-nouveau-site')
  await expect(
    page.getByRole('navigation', { name: 'Langue de l’article' }),
  ).toHaveCount(0)
})

test('a shared translation URL and language links work without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(`http://localhost:4321${articleUrl}/de`)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Am 27. September treffen wir uns für die Nur-Moschee',
  )
  await page
    .getByRole('navigation', { name: 'Sprache des Artikels' })
    .getByRole('link', { name: 'Français' })
    .click()
  await expect(page).toHaveURL(`http://localhost:4321${articleUrl}`)
  await context.close()
})
