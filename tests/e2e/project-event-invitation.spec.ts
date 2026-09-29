import { test, expect } from '../fixtures/browser'

for (const route of [
  '/',
  '/a-propos',
  '/donation',
  '/contact',
  '/projet-xhamia-nur',
]) {
  test(`${route}: the completed event is replaced by a provisional project status`, async ({
    page,
  }) => {
    if (route === '/a-propos') test.slow()
    const response = await page.goto(route)
    expect(response?.ok()).toBe(true)
    await expect(page.locator('[data-project-event]')).toHaveCount(0)
    await expect(page.getByText('635 000 CHF')).toHaveCount(0)
    await expect(page.getByText('100,8%')).toHaveCount(0)
    await expect(
      page.getByText('en cours de vérification').first(),
    ).toBeVisible()
  })
}

test('donation pages distinguish free donations from acquisition donations', async ({
  page,
}) => {
  await page.goto('/donation')
  const donationPurpose = page.getByText("Un don libre à l'ACMSI", {
    exact: false,
  })
  await expect(donationPurpose).toContainText('futurs travaux')
  await expect(donationPurpose).toContainText('tout excédent éventuel')
  await expect(page.locator('#coordonnees-bancaires')).toContainText(
    'Projet Xhamia Nur',
  )

  await page.goto('/projet-xhamia-nur')
  await expect(
    page.getByText('Tous les dons collectés dans le cadre de cette campagne', {
      exact: false,
    }),
  ).toContainText(
    'tout excédent éventuel sera réservé uniquement aux futurs travaux',
  )
})
