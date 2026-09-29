import { test as base, expect } from '@playwright/test'
import { eventAnnouncement } from '../../src/lib/event-announcement'

// Existing page-flow tests start after the event invitation has been seen.
// Its opening and dismissal are covered separately in event-announcement.spec.ts.
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(
      key => sessionStorage.setItem(key, '1'),
      eventAnnouncement.sessionKey,
    )
    await use(page)
  },
})
export { expect }
export type { Page, Locator } from '@playwright/test'
