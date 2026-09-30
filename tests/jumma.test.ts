import { it } from 'node:test'
import assert from 'node:assert/strict'

it('displays the summer Jumma prayer at 16:20 on both pages', async () => {
  const RealDate = Date
  class SummerDate extends RealDate {
    constructor() {
      super('2026-09-30T12:00:00Z')
    }
  }
  globalThis.Date = SummerDate as DateConstructor
  try {
    const { jummaShort, jummaTime, jummaAltTime } =
      await import('../src/lib/jumma.ts')
    assert.equal(jummaShort('prayer'), '16h20')
    assert.equal(jummaTime('prayer'), '16:20')
    assert.equal(jummaTime('khutba'), '16:20')
    assert.equal(jummaAltTime('prayer'), '12:30')
  } finally {
    globalThis.Date = RealDate
  }
})
