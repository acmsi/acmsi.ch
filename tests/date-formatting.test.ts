import { test } from 'node:test'
import assert from 'node:assert'
import {
  formatProjectDate,
  formatDeadlineDate,
  getDateDisplayFormat,
  type BudgetProject,
  type DateDisplayFormat,
} from '../src/lib/content.ts'

/**
 * Unit tests for date formatting functionality
 * Tests the new echeance_format feature that allows per-project date format configuration
 */

test('Date Formatting Functions', async t => {
  await t.test('formatProjectDate handles all format types', () => {
    const testDate = '2025-03-15'

    // Test quarter format
    const quarterResult = formatProjectDate(testDate, 'quarter')
    assert.strictEqual(quarterResult, 'Q1 2025')

    // Test month format
    const monthResult = formatProjectDate(testDate, 'month')
    assert.strictEqual(monthResult, 'mars 2025')

    // Test full format
    const fullResult = formatProjectDate(testDate, 'full')
    assert.strictEqual(fullResult, '15.03.2025')
  })

  await t.test('formatProjectDate handles different quarters', () => {
    assert.strictEqual(formatProjectDate('2025-01-15', 'quarter'), 'Q1 2025')
    assert.strictEqual(formatProjectDate('2025-04-15', 'quarter'), 'Q2 2025')
    assert.strictEqual(formatProjectDate('2025-07-15', 'quarter'), 'Q3 2025')
    assert.strictEqual(formatProjectDate('2025-10-15', 'quarter'), 'Q4 2025')
  })

  await t.test('getDateDisplayFormat uses project echeance_format', () => {
    const projectWithMonth: Partial<BudgetProject> = {
      echeance_format: 'month' as DateDisplayFormat,
    }

    const projectWithFull: Partial<BudgetProject> = {
      echeance_format: 'full' as DateDisplayFormat,
    }

    const projectWithQuarter: Partial<BudgetProject> = {
      echeance_format: 'quarter' as DateDisplayFormat,
    }

    // Test each format preference
    assert.strictEqual(
      getDateDisplayFormat('2025-03-15', projectWithMonth as BudgetProject),
      'month',
    )
    assert.strictEqual(
      getDateDisplayFormat('2025-03-15', projectWithFull as BudgetProject),
      'full',
    )
    assert.strictEqual(
      getDateDisplayFormat('2025-03-15', projectWithQuarter as BudgetProject),
      'quarter',
    )
  })

  await t.test(
    'getDateDisplayFormat defaults to quarter when no project provided',
    () => {
      assert.strictEqual(getDateDisplayFormat('2025-03-15'), 'quarter')
    },
  )

  await t.test(
    'getDateDisplayFormat defaults to quarter when project has no echeance_format',
    () => {
      const projectWithoutFormat: Partial<BudgetProject> = {
        nom: 'Test Project',
      }

      assert.strictEqual(
        getDateDisplayFormat(
          '2025-03-15',
          projectWithoutFormat as BudgetProject,
        ),
        'quarter',
      )
    },
  )

  await t.test('formatDeadlineDate integrates project format correctly', () => {
    const projectWithMonth: Partial<BudgetProject> = {
      echeance_format: 'month' as DateDisplayFormat,
    }

    const projectWithFull: Partial<BudgetProject> = {
      echeance_format: 'full' as DateDisplayFormat,
    }

    const testDate = '2025-11-15'

    // Test with month format
    const monthResult = formatDeadlineDate(
      testDate,
      projectWithMonth as BudgetProject,
    )
    assert.strictEqual(monthResult, 'novembre 2025')

    // Test with full format
    const fullResult = formatDeadlineDate(
      testDate,
      projectWithFull as BudgetProject,
    )
    assert.strictEqual(fullResult, '15.11.2025')

    // Test default (no project)
    const defaultResult = formatDeadlineDate(testDate)
    assert.strictEqual(defaultResult, 'Q4 2025')
  })

  await t.test('formatDeadlineDate handles edge cases', () => {
    // Test with undefined project
    assert.strictEqual(formatDeadlineDate('2025-06-01', undefined), 'Q2 2025')

    // Test with project but no echeance_format
    const projectWithoutFormat: Partial<BudgetProject> = {
      nom: 'Test Project',
    }
    assert.strictEqual(
      formatDeadlineDate('2025-06-01', projectWithoutFormat as BudgetProject),
      'Q2 2025',
    )
  })
})
