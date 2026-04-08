/** Jumma (Friday prayer) schedules — single source of truth */
const winter = { khutba: { h: 12, m: 15 }, prayer: { h: 12, m: 30 } } as const
const summer = { khutba: { h: 16, m: 20 }, prayer: { h: 16, m: 30 } } as const

function isSummerTime(date: Date = new Date()): boolean {
  const offset = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Zurich',
    timeZoneName: 'shortOffset',
  })
    .format(date)
    .match(/GMT\+(\d+)/)
  return offset?.[1] === '2'
}

export const isSummer = isSummerTime()
export const jumma = isSummer ? summer : winter
export const jummaAlt = isSummer ? winter : summer

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** e.g. "16h20" */
export function jummaShort(slot: 'khutba' | 'prayer') {
  const t = jumma[slot]
  return `${t.h}h${pad(t.m)}`
}

/** e.g. "16:20" */
export function jummaTime(slot: 'khutba' | 'prayer') {
  const t = jumma[slot]
  return `${t.h}:${pad(t.m)}`
}

/** Alternate schedule time, e.g. "12:15" when current is summer */
export function jummaAltTime(slot: 'khutba' | 'prayer') {
  const t = jummaAlt[slot]
  return `${t.h}:${pad(t.m)}`
}
