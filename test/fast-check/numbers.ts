import { fc } from '@fast-check/vitest'

export const nonIntegerDoubleArb = fc.double({ noInteger: true })
export const negativeIntegerArb = fc.integer({ max: -1 })
export const nonPositiveIntegerArb = fc.integer({ max: 0 })
export const nonNegativeIntegerArb = fc.integer({ min: 0 })
export const positiveIntegerArb = fc.integer({ min: 1 })

export const getIntervalArb = (
  numberArb: fc.Arbitrary<number>,
): fc.Arbitrary<[number, number]> =>
  fc.tuple(numberArb, numberArb).map(([a, b]) => (a <= b ? [a, b] : [b, a]))
