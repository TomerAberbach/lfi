import { curry } from './curry.js'

export const filterFlatMap = curry(function* (fn, iterable) {
  for (const value of iterable) {
    const mapped = fn(value)

    if (mapped != null) {
      yield* mapped
    }
  }
})
