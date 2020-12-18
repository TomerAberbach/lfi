import { curry } from './shared/curry.js'

export const generate = curry(fn => generateWithSeed(fn, fn()))

export const generateWithSeed = curry(function* (fn, seed) {
  let value = seed

  while (value != null) {
    yield value
    value = fn(value)
  }
})

export const cycle = curry(function* (iterable) {
  while (true) {
    yield* iterable
  }
})

export const repeat = curry(function* (value) {
  while (true) {
    yield value
  }
})
