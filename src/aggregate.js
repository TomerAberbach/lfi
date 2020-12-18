import { curry } from './shared/curry.js'
import { toExtendedIterator } from './shared/to-extended-iterator.js'

export const count = curry(iterable => {
  let n = 0

  // eslint-disable-next-line no-unused-vars
  for (const value of iterable) {
    n++
  }

  return n
})

export const sum = curry(iterable => {
  let acc = 0

  for (const value of iterable) {
    acc += value
  }

  return acc
})

export const mean = curry(iterable => {
  let acc = 0
  let n = 0

  for (const value of iterable) {
    acc += value
    n++
  }

  return n > 0 ? acc / n : 0
})

export const maxBy = curry(function* (fn, iterable) {
  const iterator = toExtendedIterator(iterable[Symbol.iterator]())

  if (!iterable.hasNext()) {
    return
  }

  let max = iterator.getNext()

  while (iterator.hasNext()) {
    const value = iterator.getNext()

    if (fn(max, value) <= 0) {
      max = value
    }
  }

  yield max
})

export const maxWith = curry((fn, iterable) =>
  maxBy((a, b) => fn(a) - fn(b), iterable)
)

export const max = maxWith(value => value)

export const minBy = curry((fn, iterable) =>
  maxBy((a, b) => -fn(a, b), iterable)
)

export const minWith = curry((fn, iterable) =>
  minBy((a, b) => fn(a) - fn(b), iterable)
)

export const min = minWith(value => value)
