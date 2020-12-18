import { curry } from './curry.js'

export const uniqueByWith = curry(function* (fn, set, iterable) {
  for (const value of iterable) {
    const by = fn(value)

    if (!set.has(by)) {
      set.add(by)
      yield value
    }
  }
})

export const uniqueBy = curry((fn, iterable) =>
  uniqueByWith(fn, new Set(), iterable)
)

export const uniqueWith = uniqueByWith(value => value)

export const unique = uniqueBy(value => value)
