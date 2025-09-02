import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for ACMSI website e2e tests
 * Focused on testing date formatting functionality and core features
 */
export default defineConfig({
  testDir: './tests/e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Minimal retries for speed */
  retries: process.env.CI ? 1 : 0,

  /* Use more workers for speed */
  workers: process.env.CI ? 2 : undefined,

  /* Simplified reporter for speed */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/html', open: 'never' }],
  ],

  /* Shared settings optimized for speed */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',

    /* Minimal tracing for speed */
    trace: 'retain-on-failure',

    /* Screenshots only on failure */
    screenshot: 'only-on-failure',

    /* No video recording for speed */
    video: 'off',
  },

  /* Single browser project for speed */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60 * 1000, // Reduced timeout
  },

  /* Faster timeouts */
  timeout: 15 * 1000,

  /* Reduced global timeout */
  globalTimeout: 5 * 60 * 1000,

  /* Faster expect timeout */
  expect: {
    timeout: 5 * 1000,
  },

  /* Output directory for test results */
  outputDir: 'test-results/artifacts',
})
