import { curry } from './shared/curry.js'

export const filterMap = curry(function* (fn, iterable) {
  for (const value of iterable) {
    const mapped = fn(value)

    if (mapped != null) {
      yield mapped
    }
  }
})
