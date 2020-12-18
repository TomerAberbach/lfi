import { curry } from './curry.js'

export const defined = curry(function* (iterable) {
  for (const value of iterable) {
    if (value != null) {
      yield value
    }
  }
})
