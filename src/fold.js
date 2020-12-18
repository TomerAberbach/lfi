import { Iterator } from './shared/iterator.js'
import { curry } from './shared/curry.js'

export const fold = curry((fn, acc, iterable) => {
  for (const value of iterable) {
    acc = fn(acc, value)
  }

  return acc
})

export const reduce = curry(function* (fn, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc = fn(acc, iterator.getNext())
  }

  yield acc
})
