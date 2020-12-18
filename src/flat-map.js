import { curry } from './curry.js'

export const flatMap = curry(function* (fn, iterable) {
  for (const value of iterable) {
    yield* fn(value)
  }
})

export const flatten = flatMap(value => value)
