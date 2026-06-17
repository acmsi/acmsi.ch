import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for performance tests.
 *
 * Perf metrics (TBT in particular) are only meaningful against a
 * production build, so this config always runs against `wrangler dev`
 * serving the built output.
 *
 * - Locally: port :4322 (so it doesn't collide with `npm run dev` on :4321)
 * - In CI:   port :4321 (CI already runs `npm run build` up-front)
 */
const isCI = !!process.env.CI

const PORT = isCI ? 4321 : 4322
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './tests/perf',

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/e2e/html', open: 'never' }],
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'performance',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // :4322 is dedicated to perf runs, so it's safe to reuse locally —
    // if a wrangler from a prior run is still up, we skip the rebuild.
    // CI always starts fresh (Playwright's convention when CI=true).
    command: isCI
      ? `wrangler dev --port ${PORT}`
      : `npm run build && wrangler dev --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: isCI ? 120 * 1000 : 180 * 1000,
  },

  timeout: 30 * 1000,
  globalTimeout: 10 * 60 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  outputDir: 'test-results/e2e/artifacts',
})
