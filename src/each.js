import { curry } from './shared/curry.js'

export const each = curry(function* (fn, iterable) {
  for (const value of iterable) {
    fn(value)
    yield value
  }
})

export const forEach = curry((fn, iterable) => {
  for (const value of iterable) {
    fn(value)
  }
})
