import { test, expect } from '@playwright/test'
import { eventAnnouncement } from '../../src/lib/event-announcement'

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-09-14T12:00:00+02:00'))
})

test('opens in the browser language, switches flyers and closes for the session', async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'languages', { value: ['de-CH', 'fr'] }),
  )
  await page.goto('/')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(
    dialog.getByRole('button', { name: 'Deutsch', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /de\.jpeg$/)
  await dialog.getByRole('button', { name: 'Shqip', exact: true }).click()
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /sq\.jpeg$/)
  await expect(
    dialog.getByRole('link', { name: 'Shkarko', exact: true }),
  ).toHaveAttribute('download', /-sq\.jpeg$/)
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await page.goto('/contact')
  await expect(dialog).not.toBeVisible()
  await page.getByRole('button', { name: 'Voir l’invitation' }).click()
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Fermer l’invitation' }).click()
  await expect(
    page.getByRole('button', { name: 'Voir l’invitation' }),
  ).toBeFocused()
})

test('French fallback, zoom and article work on a narrow screen', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'languages', { value: ['en-US'] }),
  )
  await page.goto('/')
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('img')).toHaveAttribute('src', /fr\.jpeg$/)
  await dialog.getByRole('button', { name: 'Agrandir le flyer' }).click()
  await expect(
    dialog.getByRole('button', { name: 'Voir le flyer entier' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await dialog.getByRole('button', { name: 'Voir le flyer entier' }).click()
  await dialog.getByRole('link', { name: 'Découvrir la rencontre' }).click()
  await expect(page).toHaveURL(eventAnnouncement.articleUrl)
  await expect(dialog).not.toBeVisible()
  await expect(page.getByRole('main')).toContainText(
    'dimanche 27 septembre 2026 à 14 h',
  )
  await expect(
    page.getByRole('main').getByRole('link', { name: 'Shqip — albanais' }),
  ).toHaveAttribute('href', /sq\.jpeg$/)
  await expect(
    page.getByRole('link', { name: 'Accéder à la télévision de RTV Pendimi' }),
  ).toHaveAttribute('href', 'https://www.rtvpendimi.com/tv1/')
  await page.goto('/actualites')
  await expect(
    page.getByRole('heading', { name: "Le nouveau site de l'ACMSI" }),
  ).toBeVisible()
  await page
    .getByRole('link', { name: 'événement', exact: true })
    .first()
    .click()
  await expect(page).toHaveURL(/tag=/)
  await expect(
    page.getByRole('heading', {
      name: 'Rencontre du 27 septembre : merci pour votre soutien à la mosquée Nur',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: "Le nouveau site de l'ACMSI",
    }),
  ).not.toBeVisible()
})

test('does not promote an expired event', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-09-28T00:00:00+02:00'))
  await page.goto('/')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Voir l’invitation' }),
  ).not.toBeVisible()
})

test('blocked session storage does not prevent opening or closing', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError')
      },
    })
  })
  await page.goto('/')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Fermer l’invitation' }).click()
  await expect(page.getByRole('dialog')).not.toBeVisible()
})

test('banner changes language and action together and respects reduced motion', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-09-14T12:00:00+02:00') })
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Fermer l’invitation' }).click()
  await page.mouse.move(370, 800)
  const banner = page.locator('.event-invitation')
  const message = banner.locator('.invitation-message')
  for (const [lang, action] of [
    ['sq', 'Shiko ftesën'],
    ['de', 'Einladung ansehen'],
    ['bs', 'Pogledajte poziv'],
    ['fr', 'Voir l’invitation'],
  ]) {
    await page.clock.runFor(7000)
    await expect(message).toHaveAttribute('lang', lang)
    await expect(banner.getByRole('button')).toHaveText(action)
    await expect(message).toHaveCSS('opacity', '1')
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.runFor(7000)
  await expect(message).toHaveAttribute('lang', 'fr')
  await expect(banner.getByRole('button')).toHaveCount(1)
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  await banner.getByRole('button').click()
  await expect(page.getByRole('dialog')).toBeVisible()
})

test('viewer translates its interface and article link but preserves language names', async ({
  page,
}) => {
  await page.goto('/')
  const dialog = page.getByRole('dialog')
  for (const [lang, name, title, download, zoom] of [
    ['sq', 'Shqip', 'Ftesa e 27 shtatorit', 'Shkarko', 'Zmadho fletushkën'],
    [
      'de',
      'Deutsch',
      'Die Einladung zum 27. September',
      'Herunterladen',
      'Flyer vergrössern',
    ],
    ['bs', 'Bosanski', 'Poziv za 27. septembar', 'Preuzmi', 'Povećaj letak'],
    [
      'fr',
      'Français',
      'L’invitation du 27 septembre',
      'Télécharger',
      'Agrandir le flyer',
    ],
  ]) {
    await dialog.getByRole('button', { name, exact: true }).click()
    await expect(dialog).toHaveAttribute('lang', lang)
    await expect(dialog.getByRole('heading', { level: 2 })).toHaveText(title)
    await expect(
      dialog.getByRole('link', { name: download, exact: true }),
    ).toHaveAttribute('href', new RegExp(`${lang}\\.jpeg$`))
    await expect(dialog.locator('.article-link')).toHaveAttribute(
      'href',
      eventAnnouncement.articleUrl + (lang === 'fr' ? '' : `/${lang}`),
    )
    await expect(
      dialog.getByRole('button', { name: zoom, exact: true }),
    ).toBeVisible()
    await expect(dialog.locator('[data-language]')).toHaveText([
      'Bosanski',
      'Deutsch',
      'Français',
      'Shqip',
    ])
  }
  await dialog.getByRole('button', { name: 'Agrandir le flyer' }).click()
  await dialog.getByRole('button', { name: 'Shqip', exact: true }).click()
  await expect(
    dialog.getByRole('button', { name: 'Shiko fletushkën e plotë' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await dialog.getByRole('link', { name: 'Më shumë për takimin' }).click()
  await expect(page).toHaveURL(`${eventAnnouncement.articleUrl}/sq`)
})

test('language buttons wrap inside the viewer at an extreme narrow width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 240, height: 812 })
  await page.goto('/')
  const dialog = page.getByRole('dialog')
  await dialog.getByRole('button', { name: 'Deutsch', exact: true }).click()
  const bounds = await dialog.boundingBox()
  const buttons = await dialog.locator('[data-language]').all()
  const rows = new Set<number>()
  for (const button of buttons) {
    const box = await button.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(bounds!.x)
    expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width)
    rows.add(Math.round(box!.y))
  }
  expect(rows.size).toBeGreaterThan(1)
  await expect(
    dialog.getByRole('button', { name: 'Einladung schliessen' }),
  ).toBeInViewport()
})
