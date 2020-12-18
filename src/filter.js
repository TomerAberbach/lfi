import { curry } from './shared/curry.js'

export const filter = curry(function* (fn, iterable) {
  for (const value of iterable) {
    if (fn(value) === true) {
      yield value
    }
  }
})
