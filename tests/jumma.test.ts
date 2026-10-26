import { it } from 'node:test'
import assert from 'node:assert/strict'
import { getJummaSchedule } from '../src/lib/jumma.ts'

it('uses the summer schedule during Swiss daylight saving time', () => {
  assert.deepEqual(getJummaSchedule(new Date('2026-09-30T12:00:00Z')), {
    khutba: { h: 16, m: 20 },
    prayer: { h: 16, m: 20 },
  })
})

it('uses the winter schedule once Swiss winter time starts', () => {
  // Winter time starts on 2026-10-25 at 01:00 UTC.
  assert.equal(getJummaSchedule(new Date('2026-10-25T00:59:00Z')).prayer.h, 16)
  assert.deepEqual(getJummaSchedule(new Date('2026-10-25T01:00:00Z')), {
    khutba: { h: 12, m: 15 },
    prayer: { h: 12, m: 30 },
  })
})
