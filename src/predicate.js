import { curry } from './shared/curry.js'

export const all = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) !== true) {
      return false
    }
  }

  return true
})

export const any = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) === true) {
      return true
    }
  }

  return false
})

export const none = curry((fn, iterable) => !any(fn, iterable))

export const contains = curry((searchValue, iterable) =>
  any(value => Object.is(value, searchValue), iterable)
)
