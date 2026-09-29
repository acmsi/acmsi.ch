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
      name: 'Rencontre du 27 septembre : merci pour votre soutien à la mosquée Nur',
    })
    .getByRole('link')
    .click()
  for (const [language, name, title] of [
    [
      'sq',
      'Shqip',
      'Takimi i 27 shtatorit: faleminderit për mbështetjen ndaj xhamisë Nur',
    ],
    [
      'de',
      'Deutsch',
      'Treffen vom 27. September: Danke für Ihre Unterstützung der Nur-Moschee',
    ],
    ['bs', 'Bosanski', 'Susret od 27. septembra: hvala na podršci džamiji Nur'],
    [
      'fr',
      'Français',
      'Rencontre du 27 septembre : merci pour votre soutien à la mosquée Nur',
    ],
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
    const update = page.locator('.prose > aside').first()
    await expect(update).toBeVisible()
    const updateBox = await update.boundingBox()
    const gap = updateBox!.y - flyer!.y - flyer!.height
    expect(gap).toBeGreaterThanOrEqual(24)
    expect(gap).toBeLessThanOrEqual(80)
    await expect(update).toContainText('630’000 CHF')
    await page.evaluate(() => document.fonts.ready)
    const breadcrumb = page.getByRole('navigation', { name: 'Fil d’Ariane' })
    for (const width of [375, 240]) {
      await page.setViewportSize({ width, height: 812 })
      const parent = await breadcrumb.getByRole('link').boundingBox()
      const current = await breadcrumb
        .locator('[aria-current="page"]')
        .boundingBox()
      const separator = await breadcrumb
        .locator('[aria-hidden="true"]')
        .boundingBox()
      expect(Math.abs(parent!.y - separator!.y)).toBeLessThan(1)
      expect(separator!.x).toBeGreaterThan(parent!.x + parent!.width)
      if (Math.abs(current!.y - parent!.y) < 1) {
        // Short titles can fit beside the parent with the Mada font.
        expect(width).toBe(375)
        expect(current!.x).toBeGreaterThan(separator!.x + separator!.width)
        expect(current!.height).toBeLessThanOrEqual(parent!.height + 1)
      } else {
        expect(current!.y).toBeGreaterThan(parent!.y)
        expect(current!.x).toBe(parent!.x)
      }
      expect(current!.x + current!.width).toBeLessThanOrEqual(width)
    }
    await page.setViewportSize({ width: 375, height: 812 })
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
    'Treffen vom 27. September: Danke für Ihre Unterstützung der Nur-Moschee',
  )
  await page
    .getByRole('navigation', { name: 'Sprache des Artikels' })
    .getByRole('link', { name: 'Français' })
    .click()
  await expect(page).toHaveURL(`http://localhost:4321${articleUrl}`)
  await context.close()
})
