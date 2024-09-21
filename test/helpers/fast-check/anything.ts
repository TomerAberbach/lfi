import { fc } from 'tomer'

export const stringifiableArb = fc.anything().filter(value => {
  try {
    String(value)
    return true
  } catch {
    return false
  }
})
