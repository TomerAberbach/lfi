/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

    // This is an empty iterable! Return early to avoid an infinite loop
    if (done) {
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

    // This is an empty iterable! Return early to avoid an infinite loop
    if (done) {
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
