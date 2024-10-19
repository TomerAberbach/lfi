import { fc } from '@fast-check/vitest'

export const nonSafeIntegerDoubleArb = fc
  .double()
  .filter(number => !Number.isSafeInteger(number))
export const negativeIntegerArb = fc.integer({ max: -1 })
export const nonPositiveIntegerArb = fc.integer({ max: 0 })
export const nonNegativeIntegerArb = fc.integer({ min: 0 })
export const positiveIntegerArb = fc.integer({ min: 1 })
