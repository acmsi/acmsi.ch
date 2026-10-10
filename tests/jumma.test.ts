import { it } from 'node:test'
import assert from 'node:assert/strict'
import { getJummaSchedule } from '../src/lib/jumma.ts'

it('uses the announced October schedules for the upcoming Friday', () => {
  for (const [date, h, m] of [
    ['2026-10-10', 16, 10],
    ['2026-10-16', 16, 10],
    ['2026-10-17', 16, 5],
    ['2026-10-23', 16, 5],
    ['2026-10-24', 12, 30],
    ['2026-10-30', 12, 30],
  ] as const) {
    assert.deepEqual(getJummaSchedule(new Date(`${date}T12:00:00Z`)).prayer, {
      h,
      m,
    })
  }
})

it('preserves the regular summer schedule before the October changes', () => {
  assert.deepEqual(getJummaSchedule(new Date('2026-09-30T12:00:00Z')).prayer, {
    h: 16,
    m: 20,
  })
})
