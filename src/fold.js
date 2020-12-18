import { curry } from './curry.js'
import { map } from './map.js'
import { next } from './optional.js'

export const fold = curry((fn, acc, iterable) => {
  for (const value of iterable) {
    acc = fn(acc, value)
  }

  return acc
})

export const reduce = curry((fn, iterable) => {
  const [first, rest] = next(iterable)
  return map(acc => fold(fn, acc, rest), first)
})
