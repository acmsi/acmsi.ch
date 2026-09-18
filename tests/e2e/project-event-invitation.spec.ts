import { test, expect } from '../fixtures/browser'
import { eventAnnouncement } from '../../src/lib/event-announcement'

for (const route of [
  '/',
  '/a-propos',
  '/donation',
  '/contact',
  '/projet-xhamia-nur',
]) {
  test(`${route}: invitation highlights the date and opens the event article`, async ({
    page,
  }) => {
    // The about page fetches membership figures from Google during rendering.
    if (route === '/a-propos') test.slow()
    await page.clock.setFixedTime(new Date('2026-09-14T12:00:00+02:00'))
    await page.setViewportSize({ width: 375, height: 812 })
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)
    const invitation = page.locator('[data-project-event]')
    await expect(invitation).toHaveCount(1)
    await expect(invitation).toBeVisible()
    if (route !== '/projet-xhamia-nur') {
      await expect(
        invitation.locator('xpath=ancestor::section[1]'),
      ).toContainText('Projet Xhamia Nur')
    }
    await expect(invitation.locator('time')).toHaveAttribute(
      'datetime',
      '2026-09-27T14:00:00+02:00',
    )
    await expect(invitation.locator('time')).toContainText('14 h')
    await expect(invitation).not.toContainText('CHF')
    await invitation.scrollIntoViewIfNeeded()
    const box = await invitation.boundingBox()
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(375)
    await invitation
      .getByRole('link', { name: 'Découvrir la rencontre' })
      .click()
    await expect(page).toHaveURL(eventAnnouncement.articleUrl)
  })

  test(`${route}: invitation disappears after the event`, async ({ page }) => {
    // The about page fetches membership figures from Google during rendering.
    if (route === '/a-propos') test.slow()
    await page.clock.setFixedTime(new Date(eventAnnouncement.expiresAt))
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)
    await expect(page.locator('[data-project-event]')).toHaveCount(1)
    await expect(page.locator('[data-project-event]')).toBeHidden()
  })
}
