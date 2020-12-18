import { curry } from './shared/curry.js'

export const without = curry(function* (values, iterable) {
  const set = new Set(
    values != null && typeof values[Symbol.iterator] === `function`
      ? values
      : [values]
  )

  for (const value of iterable) {
    if (!set.has(value)) {
      yield value
    }
  }
})
