import { curry } from './curry.js'
import { map } from './map.js'

export const indexed = curry(iterable => {
  let index = 0
  return map(value => [index++, value], iterable)
})
