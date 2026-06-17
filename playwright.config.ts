import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for ACMSI functional e2e tests.
 *
 * - Locally: runs against `astro dev` on :4321 for fast iteration.
 * - In CI: runs against the production `wrangler dev` on :4321.
 *
 * Performance tests live in `playwright-perf.config.ts` — they need a
 * production build and shouldn't slow down local functional runs.
 */
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './tests/e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,

  /* Minimal retries for speed */
  retries: isCI ? 1 : 0,

  /* Use more workers for speed */
  workers: isCI ? 2 : undefined,

  /* Simplified reporter for speed */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/e2e/html', open: 'never' }],
  ],

  /* Shared settings optimized for speed */
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      command: isCI ? 'npm run preview' : 'npm run dev',
      url: 'http://localhost:4321',
      reuseExistingServer: !isCI,
      timeout: isCI ? 120 * 1000 : 60 * 1000,
    },
    {
      command: 'npm run cms-proxy',
      port: 8081,
      reuseExistingServer: true,
      timeout: 30 * 1000,
    },
  ],

  /* Faster timeouts */
  timeout: 15 * 1000,

  /* Reduced global timeout */
  globalTimeout: 5 * 60 * 1000,

  /* Faster expect timeout */
  expect: {
    timeout: 5 * 1000,
  },

  /* Output directory for test results */
  outputDir: 'test-results/e2e/artifacts',
})
