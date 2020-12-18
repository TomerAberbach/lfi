import { curry } from './curry.js'
import { drop, first } from './trim.js'
import { empty } from './empty.js'

export const or = curry((fn, iterable) => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true || iterator.next().done !== true ? fn() : value
})

export const next = curry(iterable => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true
    ? [empty, empty]
    : [[value], { [Symbol.iterator]: () => iterator }]
})

export const get = curry((index, iterable) => first(drop(index, iterable)))
