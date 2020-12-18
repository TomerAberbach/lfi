import { curry } from './shared/curry.js'
import { empty } from './shared/empty.js'
import { toExtendedIterator } from './shared/to-extended-iterator.js'

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

export const get = curry(function* (index, iterable) {
  if (Array.isArray(iterable)) {
    if (index < iterable.length) {
      yield iterable[index]
    }

    return
  }

  const iterator = toExtendedIterator(iterable[Symbol.iterator]())

  for (let i = 0; i < index && iterator.hasNext(); i++) {
    iterator.getNext()
  }

  yield iterator.getNext()
})
