import { curry } from './shared/curry.js'

export const find = curry(function* (fn, iterable) {
  for (const value of iterable) {
    if (fn(value) === true) {
      yield value
      return
    }
  }
})

export const findLast = curry(function* (fn, iterable) {
  let last

  for (const value of iterable) {
    if (fn(value) === true) {
      last = { value }
    }
  }

  if (last != null) {
    yield last.value
  }
})
