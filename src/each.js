import { curry } from './curry.js'
import { map } from './map.js'

export const each = curry((fn, iterable) =>
  map(value => {
    fn(value)
    return value
  }, iterable)
)

export const forEach = curry((fn, iterable) => {
  for (const value of iterable) {
    fn(value)
  }
})
