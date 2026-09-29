import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  selectFlyerLanguage,
  isEventAnnouncementActive,
} from '../src/lib/event-announcement.ts'

test('chooses the first supported browser language, including regional variants', () => {
  assert.equal(selectFlyerLanguage(['de-CH', 'fr-CH']), 'de')
  assert.equal(selectFlyerLanguage(['en-US', 'sq-AL', 'fr']), 'sq')
  assert.equal(selectFlyerLanguage(['bs-BA']), 'bs')
  assert.equal(selectFlyerLanguage(['FR-ch', 'de']), 'fr')
})

test('uses French when no browser language is supported', () => {
  assert.equal(selectFlyerLanguage(['en', 'it']), 'fr')
  assert.equal(selectFlyerLanguage([]), 'fr')
})

test('announcement expires at midnight after the event in Swiss local time', () => {
  assert.equal(
    isEventAnnouncementActive(Date.parse('2026-09-27T21:59:59Z')),
    true,
  )
  assert.equal(
    isEventAnnouncementActive(Date.parse('2026-09-27T22:00:00Z')),
    false,
  )
})
