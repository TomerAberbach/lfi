import { curry } from './curry.js'
import { filter } from './filter.js'
import { first, last } from './trim.js'

export const find = curry((fn, iterable) =>
  first(filter(fn, iterable), iterable)
)

export const findLast = curry((fn, iterable) =>
  last(filter(fn, iterable), iterable)
)
