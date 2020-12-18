import { curry } from './curry.js'

export const generate = curry(fn => generateWithSeed(fn, fn()))

export const generateWithSeed = curry(function* (fn, seed) {
  let value = seed

  while (value != null) {
    yield value
    value = fn(value)
  }
})
