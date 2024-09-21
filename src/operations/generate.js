import { createAsyncIterable, createIterable } from '../internal/helpers.js'
import {
  assertInteger,
  assertPositiveInteger,
  assertPureIterable,
} from '../internal/preconditions.js'
import { curry } from './fn.js'

export const generate = curry((fn, seed) =>
  createIterable(function* () {
    for (let value = seed; value != null; value = fn(value)) {
      yield value
    }
  }),
)

export const generateAsync = curry((fn, seed) =>
  createAsyncIterable(async function* () {
    for (let value = seed; value != null; value = await fn(value)) {
      yield value
    }
  }),
)

export const repeat = value =>
  createIterable(function* () {
    while (true) {
      yield value
    }
  })

export const cycle = iterable => {
  assertPureIterable({
    iterable: { _value: iterable, _symbol: Symbol.iterator },
  })

  return createIterable(function* () {
    const iterator = iterable[Symbol.iterator]()
    const { value, done } = iterator.next()
    if (done) {
      // This is an empty iterable! Return early to avoid an infinite loop.
      return
    }

    yield value
    yield* createIterable(() => iterator)

    while (true) {
      yield* iterable
    }
  })
}

export const cycleAsync = asyncIterable => {
  assertPureIterable({
    asyncIterable: { _value: asyncIterable, _symbol: Symbol.asyncIterator },
  })

  return createAsyncIterable(async function* () {
    const asyncIterator = asyncIterable[Symbol.asyncIterator]()
    const { value, done } = await asyncIterator.next()
    if (done) {
      // This is an empty iterable! Return early to avoid an infinite loop.
      return
    }

    yield value
    yield* { [Symbol.asyncIterator]: () => asyncIterator }

    while (true) {
      yield* asyncIterable
    }
  })
}

const createExclusiveRangeIterable = (start, end, step) =>
  createIterable(
    start < end
      ? function* () {
          for (let i = start; i < end; i += step) {
            yield i
          }
        }
      : function* () {
          for (let i = start; i > end; i -= step) {
            yield i
          }
        },
  )

const createInclusiveRangeIterable = (start, end, step) =>
  createIterable(
    start < end
      ? function* () {
          for (let i = start; i <= end; i += step) {
            yield i
          }
        }
      : function* () {
          for (let i = start; i >= end; i -= step) {
            yield i
          }
        },
  )

const createRange = createRangeIterable =>
  curry((start, end) => {
    assertInteger({ start, end })

    const iterable = createRangeIterable(start, end, 1)
    iterable.step = step => {
      assertPositiveInteger({ step })
      return createRangeIterable(start, end, step)
    }

    return iterable
  })

export const rangeUntil = createRange(createExclusiveRangeIterable)
export const rangeTo = createRange(createInclusiveRangeIterable)
