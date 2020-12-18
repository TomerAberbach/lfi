import { Iterator } from './shared/iterator.js'
import { curry } from './shared/curry.js'

export const dropWhile = curry(function* (fn, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  while (iterator.hasNext()) {
    const value = iterator.getNext()

    if (fn(value) !== true) {
      yield value
      break
    }
  }

  while (iterator.hasNext()) {
    yield iterator.getNext()
  }
})

export const drop = curry((n, iterable) => {
  let count = 0
  return dropWhile(() => count++ < n, iterable)
})

export const takeWhile = curry(function* (fn, iterable) {
  for (const value of iterable) {
    if (fn(value) !== true) {
      return
    }

    yield value
  }
})

export const take = curry((n, iterable) => {
  let count = 0
  return takeWhile(() => count++ < n, iterable)
})

export const first = take(1)

export const last = curry(function* (iterable) {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return
  }

  let value = iterator.getNext()

  while (iterator.hasNext()) {
    value = iterator.getNext()
  }

  yield value
})
