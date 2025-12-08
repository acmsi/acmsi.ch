import { test, expect, Page } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

// Performance thresholds (in milliseconds unless noted)
// Note: TBT threshold is higher in dev mode due to HMR/debugging overhead
const THRESHOLDS = {
  fcp: 2500, // First Contentful Paint
  lcp: 4000, // Largest Contentful Paint
  cls: 0.25, // Cumulative Layout Shift (unitless)
  tbt: 600, // Total Blocking Time (relaxed for dev server)
  ttfb: 800, // Time To First Byte
}

// Pages to audit
const PAGES_TO_AUDIT = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/a-propos' },
  { name: 'Contact', path: '/contact' },
  { name: 'Donation', path: '/donation' },
  { name: 'Actualites', path: '/actualites' },
  { name: 'Project', path: '/projet-xhamia-nur' },
]

// Reports directory
const REPORTS_DIR = path.join(process.cwd(), 'test-results', 'performance')

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  cls: number | null // Cumulative Layout Shift
  tbt: number // Total Blocking Time
  ttfb: number | null // Time To First Byte
  domContentLoaded: number | null
  loadComplete: number | null
  resourceCount: number
  totalTransferSize: number
}

/**
 * Collect all performance metrics from a page
 */
async function collectMetrics(page: Page): Promise<PerformanceMetrics> {
  // Wait for page to be fully loaded - use 'load' instead of 'networkidle'
  // as networkidle can hang on pages with persistent connections or analytics
  await page.waitForLoadState('load')

  // Small delay to ensure metrics are captured
  await page.waitForTimeout(500)

  // Get Navigation Timing
  const navigationTiming = await page.evaluate(() => {
    const entries = performance.getEntriesByType(
      'navigation',
    ) as PerformanceNavigationTiming[]
    if (entries.length > 0) {
      const nav = entries[0]
      return {
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        loadComplete: nav.loadEventEnd - nav.startTime,
      }
    }
    return null
  })

  // Get Paint Timing (FCP)
  const paintTiming = await page.evaluate(() => {
    const entries = performance.getEntriesByType(
      'paint',
    ) as PerformancePaintTiming[]
    const fcp = entries.find(e => e.name === 'first-contentful-paint')
    return fcp ? fcp.startTime : null
  })

  // Get Largest Contentful Paint
  const lcp = await page.evaluate(() => {
    return new Promise<number | null>(resolve => {
      let lcpValue: number | null = null

      const observer = new PerformanceObserver(list => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          lcpValue = lastEntry.startTime
        }
      })

      observer.observe({ type: 'largest-contentful-paint', buffered: true })

      // Resolve after a short delay to capture LCP
      setTimeout(() => {
        observer.disconnect()
        resolve(lcpValue)
      }, 500)
    })
  })

  // Get Cumulative Layout Shift
  const cls = await page.evaluate(() => {
    return new Promise<number>(resolve => {
      let clsValue = 0

      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          // Only count layout shifts without recent user input
          if (
            !(entry as PerformanceEntry & { hadRecentInput: boolean })
              .hadRecentInput
          ) {
            clsValue += (entry as PerformanceEntry & { value: number }).value
          }
        }
      })

      observer.observe({ type: 'layout-shift', buffered: true })

      setTimeout(() => {
        observer.disconnect()
        resolve(clsValue)
      }, 500)
    })
  })

  // Get Total Blocking Time (long tasks > 50ms)
  const tbt = await page.evaluate(() => {
    return new Promise<number>(resolve => {
      let totalBlockingTime = 0

      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          // TBT = sum of (duration - 50ms) for all long tasks
          if (entry.duration > 50) {
            totalBlockingTime += entry.duration - 50
          }
        }
      })

      observer.observe({ type: 'longtask', buffered: true })

      setTimeout(() => {
        observer.disconnect()
        resolve(totalBlockingTime)
      }, 500)
    })
  })

  // Get Resource metrics
  const resourceMetrics = await page.evaluate(() => {
    const resources = performance.getEntriesByType(
      'resource',
    ) as PerformanceResourceTiming[]
    return {
      count: resources.length,
      totalTransferSize: resources.reduce(
        (sum, r) => sum + (r.transferSize || 0),
        0,
      ),
    }
  })

  return {
    fcp: paintTiming,
    lcp,
    cls,
    tbt,
    ttfb: navigationTiming?.ttfb ?? null,
    domContentLoaded: navigationTiming?.domContentLoaded ?? null,
    loadComplete: navigationTiming?.loadComplete ?? null,
    resourceCount: resourceMetrics.count,
    totalTransferSize: resourceMetrics.totalTransferSize,
  }
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * Format milliseconds to readable string
 */
function formatMs(ms: number | null): string {
  if (ms === null) return 'N/A'
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

test.describe('Performance Metrics', () => {
  test.beforeAll(() => {
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true })
    }
  })

  for (const pageConfig of PAGES_TO_AUDIT) {
    test(`${pageConfig.name} page performance`, async ({ page }) => {
      const baseURL = process.env.BASE_URL || 'http://localhost:4321'
      await page.goto(`${baseURL}${pageConfig.path}`)

      const metrics = await collectMetrics(page)

      // Log results
      console.log(`\n📊 Performance metrics for ${pageConfig.name}:`)
      console.log(`   FCP (First Contentful Paint): ${formatMs(metrics.fcp)}`)
      console.log(`   LCP (Largest Contentful Paint): ${formatMs(metrics.lcp)}`)
      console.log(
        `   CLS (Cumulative Layout Shift): ${metrics.cls?.toFixed(4) ?? 'N/A'}`,
      )
      console.log(`   TBT (Total Blocking Time): ${formatMs(metrics.tbt)}`)
      console.log(`   TTFB (Time To First Byte): ${formatMs(metrics.ttfb)}`)
      console.log(
        `   DOM Content Loaded: ${formatMs(metrics.domContentLoaded)}`,
      )
      console.log(`   Page Load Complete: ${formatMs(metrics.loadComplete)}`)
      console.log(
        `   Resources: ${metrics.resourceCount} (${formatBytes(metrics.totalTransferSize)})`,
      )

      // Assertions
      if (metrics.fcp !== null) {
        expect(
          metrics.fcp,
          `FCP should be under ${THRESHOLDS.fcp}ms`,
        ).toBeLessThan(THRESHOLDS.fcp)
      }

      if (metrics.lcp !== null) {
        expect(
          metrics.lcp,
          `LCP should be under ${THRESHOLDS.lcp}ms`,
        ).toBeLessThan(THRESHOLDS.lcp)
      }

      if (metrics.cls !== null) {
        expect(
          metrics.cls,
          `CLS should be under ${THRESHOLDS.cls}`,
        ).toBeLessThan(THRESHOLDS.cls)
      }

      expect(
        metrics.tbt,
        `TBT should be under ${THRESHOLDS.tbt}ms`,
      ).toBeLessThan(THRESHOLDS.tbt)

      if (metrics.ttfb !== null) {
        expect(
          metrics.ttfb,
          `TTFB should be under ${THRESHOLDS.ttfb}ms`,
        ).toBeLessThan(THRESHOLDS.ttfb)
      }
    })
  }
})

test.describe('Performance Summary Report', () => {
  test('generate comprehensive report', async ({ page }) => {
    // Increase timeout as we're testing all pages sequentially
    test.setTimeout(60000)

    const baseURL = process.env.BASE_URL || 'http://localhost:4321'
    const results: Array<{ page: string; metrics: PerformanceMetrics }> = []

    for (const pageConfig of PAGES_TO_AUDIT) {
      await page.goto(`${baseURL}${pageConfig.path}`)
      const metrics = await collectMetrics(page)
      results.push({ page: pageConfig.name, metrics })
    }

    // Print summary table
    console.log('\n' + '='.repeat(110))
    console.log('📈 PERFORMANCE SUMMARY REPORT')
    console.log('='.repeat(110))
    console.log(
      'Page'.padEnd(15) +
        'FCP'.padEnd(12) +
        'LCP'.padEnd(12) +
        'CLS'.padEnd(10) +
        'TBT'.padEnd(12) +
        'TTFB'.padEnd(12) +
        'Load'.padEnd(12) +
        'Resources',
    )
    console.log('-'.repeat(110))

    for (const { page: pageName, metrics } of results) {
      console.log(
        pageName.padEnd(15) +
          formatMs(metrics.fcp).padEnd(12) +
          formatMs(metrics.lcp).padEnd(12) +
          (metrics.cls?.toFixed(4) ?? 'N/A').padEnd(10) +
          formatMs(metrics.tbt).padEnd(12) +
          formatMs(metrics.ttfb).padEnd(12) +
          formatMs(metrics.loadComplete).padEnd(12) +
          `${metrics.resourceCount} (${formatBytes(metrics.totalTransferSize)})`,
      )
    }

    console.log('-'.repeat(110))

    // Calculate averages
    const avgFcp =
      results.reduce((sum, r) => sum + (r.metrics.fcp || 0), 0) / results.length
    const avgLcp =
      results.reduce((sum, r) => sum + (r.metrics.lcp || 0), 0) / results.length
    const avgCls =
      results.reduce((sum, r) => sum + (r.metrics.cls || 0), 0) / results.length
    const avgTbt =
      results.reduce((sum, r) => sum + r.metrics.tbt, 0) / results.length
    const avgTtfb =
      results.reduce((sum, r) => sum + (r.metrics.ttfb || 0), 0) /
      results.length

    console.log(
      'AVERAGE'.padEnd(15) +
        formatMs(avgFcp).padEnd(12) +
        formatMs(avgLcp).padEnd(12) +
        avgCls.toFixed(4).padEnd(10) +
        formatMs(avgTbt).padEnd(12) +
        formatMs(avgTtfb).padEnd(12),
    )
    console.log('='.repeat(110))

    // Ensure reports directory exists
    if (!fs.existsSync(REPORTS_DIR)) {
      fs.mkdirSync(REPORTS_DIR, { recursive: true })
    }

    // Save to JSON
    const reportPath = path.join(REPORTS_DIR, 'performance-report.json')
    fs.writeFileSync(
      reportPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          baseURL,
          thresholds: THRESHOLDS,
          results: results.map(r => ({
            page: r.page,
            metrics: {
              fcp: r.metrics.fcp,
              lcp: r.metrics.lcp,
              cls: r.metrics.cls,
              tbt: r.metrics.tbt,
              ttfb: r.metrics.ttfb,
              domContentLoaded: r.metrics.domContentLoaded,
              loadComplete: r.metrics.loadComplete,
              resourceCount: r.metrics.resourceCount,
              totalTransferSize: r.metrics.totalTransferSize,
            },
          })),
          averages: {
            fcp: avgFcp,
            lcp: avgLcp,
            cls: avgCls,
            tbt: avgTbt,
            ttfb: avgTtfb,
          },
        },
        null,
        2,
      ),
    )

    console.log(`\n📁 Report saved to: ${reportPath}`)
  })
})

test.describe('Network Throttled Performance', () => {
  test('Home page on slow 3G', async ({ page }) => {
    // Increase timeout for slow network test
    test.setTimeout(60000)

    // Use CDP to simulate slow 3G network
    const client = await page.context().newCDPSession(page)
    await client.send('Network.enable')
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (500 * 1024) / 8, // 500 Kbps
      uploadThroughput: (500 * 1024) / 8,
      latency: 400, // 400ms RTT
    })

    const baseURL = process.env.BASE_URL || 'http://localhost:4321'
    await page.goto(baseURL, { timeout: 45000 })

    const metrics = await collectMetrics(page)

    console.log('\n📊 Performance on Slow 3G:')
    console.log(`   FCP: ${formatMs(metrics.fcp)}`)
    console.log(`   LCP: ${formatMs(metrics.lcp)}`)
    console.log(`   Load Complete: ${formatMs(metrics.loadComplete)}`)

    // Looser thresholds for slow network
    if (metrics.fcp !== null) {
      expect(metrics.fcp, 'FCP on slow 3G should be under 8s').toBeLessThan(
        8000,
      )
    }

    if (metrics.lcp !== null) {
      expect(metrics.lcp, 'LCP on slow 3G should be under 12s').toBeLessThan(
        12000,
      )
    }
  })
})
