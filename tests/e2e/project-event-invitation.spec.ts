import { test, expect } from '../fixtures/browser'
import { eventAnnouncement } from '../../src/lib/event-announcement'

test('project invitation highlights the date and opens the event article', async ({
  page,
}) => {
  await page.clock.setFixedTime(new Date('2026-09-14T12:00:00+02:00'))
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/projet-xhamia-nur')
  const invitation = page.locator('[data-project-event]')
  await expect(invitation).toBeVisible()
  await expect(invitation.locator('time')).toHaveAttribute(
    'datetime',
    '2026-09-27T14:00:00+02:00',
  )
  await expect(invitation.locator('time')).toContainText('14 h')
  await expect(invitation).not.toContainText('CHF')
  await invitation.scrollIntoViewIfNeeded()
  const box = await invitation.boundingBox()
  expect(box!.x + box!.width).toBeLessThanOrEqual(375)
  await invitation.getByRole('link', { name: 'Découvrir la rencontre' }).click()
  await expect(page).toHaveURL(eventAnnouncement.articleUrl)
})

test('project invitation disappears after the event', async ({ page }) => {
  await page.clock.setFixedTime(new Date(eventAnnouncement.expiresAt))
  await page.goto('/projet-xhamia-nur')
  await expect(page.locator('[data-project-event]')).toBeHidden()
})
