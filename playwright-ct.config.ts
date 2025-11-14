import { defineConfig, devices } from '@playwright/experimental-ct-react'
import path from 'path'

export default defineConfig({
  testDir: './src/components',
  testMatch: '**/*.test.tsx',
  snapshotDir: './__snapshots__',
  outputDir: 'test-results/components/artifacts',
  timeout: 10 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'test-results/components/html', open: 'never' }],
  ],

  use: {
    trace: 'on-first-retry',
    ctPort: 3100,
    ctViteConfig: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      css: {
        postcss: {
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          plugins: [require('@tailwindcss/postcss')],
        },
      },
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
