import { curry } from './curry.js'

export const chunked = curry(function* (n, iterable) {
  let chunk = []

  for (const value of iterable) {
    chunk.push(value)

    if (chunk.length === n) {
      yield chunk
      chunk = []
    }
  }

  if (chunk.length > 0) {
    yield chunk
  }
})
