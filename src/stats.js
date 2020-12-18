import { curry } from './curry.js'
import { fold } from './fold.js'
import { toExtendedIterator } from './to-extended-iterator.js'

export const count = curry(iterable => {
  let n = 0

  // eslint-disable-next-line no-unused-vars
  for (const value of iterable) {
    n++
  }

  return n
})

export const sum = fold((a, b) => a + b, 0)

export const mean = curry(iterable => {
  let t = 0
  let n = 0

  for (const value of iterable) {
    t += value
    n++
  }

  return n > 0 ? t / n : 0
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

export const without = curry(function* (values, iterable) {
  const set = new Set(
    values != null && typeof values[Symbol.iterator] === `function`
      ? values
      : [values]
  )

  for (const value of iterable) {
    if (!set.has(value)) {
      yield value
    }
  }
})

export function* concat(...iterables) {
  for (const iterable of iterables) {
    yield* iterable
  }
}

export const cycle = curry(function* (iterable) {
  while (true) {
    yield* iterable
  }
})

export const repeat = curry(function* (value) {
  while (true) {
    yield value
  }
})
