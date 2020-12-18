import { curry } from './shared/curry.js'

export const indexed = curry(function* (iterable) {
  let index = 0
  for (const value of iterable) {
    yield [index++, value]
  }
})
