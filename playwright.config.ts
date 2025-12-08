import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for ACMSI website e2e tests
 * - In CI: Tests run against production build (wrangler pages dev)
 * - Locally: Tests run against dev server (astro dev) for faster iteration
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
    ['html', { outputFolder: 'test-results/e2e/html', open: 'never' }],
  ],

  /* Shared settings optimized for speed */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4321',

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

  /* Run your local dev server or production preview before starting the tests */
  webServer: process.env.CI
    ? [
        {
          // In CI: use production build with wrangler
          command: 'npm run preview',
          url: 'http://localhost:4321',
          reuseExistingServer: false,
          timeout: 120 * 1000,
        },
        {
          command: 'npm run cms-proxy',
          port: 8081,
          reuseExistingServer: false,
          timeout: 30 * 1000,
        },
      ]
    : [
        {
          // Locally: use dev server for faster iteration
          command: 'npm run dev',
          url: 'http://localhost:4321',
          reuseExistingServer: true,
          timeout: 60 * 1000,
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
