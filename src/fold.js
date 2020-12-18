import { curry } from './shared/curry.js'
import { toExtendedIterator } from './shared/to-extended-iterator.js'

export const fold = curry((fn, acc, iterable) => {
  for (const value of iterable) {
    acc = fn(acc, value)
  }

  return acc
})

export const reduce = curry(function* (fn, iterable) {
  const iterator = toExtendedIterator(iterable[Symbol.iterator]())

  if (!iterator.hasNext()) {
    return
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc = fn(acc, iterator.getNext())
  }

  yield acc
})
