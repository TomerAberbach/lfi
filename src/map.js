import { curry } from './curry.js'

export const map = curry(function* (fn, iterable) {
  for (const value of iterable) {
    yield fn(value)
  }
})
