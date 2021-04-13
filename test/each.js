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

import {
  each,
  eachAsync,
  eachConcur,
  forEach,
  forEachAsync,
  forEachConcur
} from '../src/each.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  fnArb,
  iterableArb,
  maybeAsyncFnArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `each returns an iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const iteratedIterable = each(fn, iterable)

    t.iterable(iteratedIterable)
  }
)

testProp(
  `each returns an equivalent iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const iteratedIterable = each(fn, iterable)

    t.deepEqual([...iteratedIterable], iterable.values)
  }
)

testProp(
  `each calls the given function for each value in the iterable in iteration order`,
  [iterableArb],
  (t, iterable) => {
    const parameters = []

    // eslint-disable-next-line no-unused-expressions
    ;[...each(value => parameters.push(value), iterable)]

    t.deepEqual(parameters, iterable.values)
  }
)

testProp(`each is lazy`, [iterableArb], (t, iterable) => {
  t.plan(iterable.values.length + 1)

  let count = 0
  const iterator = each(() => count++, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < iterable.values.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`each concrete example`, t => {
  let count = 0

  // eslint-disable-next-line no-unused-expressions
  ;[...each(() => count++, [1, 2, 3])]

  t.is(count, 3)
})

testProp(
  `eachAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const iteratedAsyncIterable = eachAsync(fn, asyncIterable)

    await t.asyncIterable(iteratedAsyncIterable)
  }
)

testProp(
  `eachAsync returns an equivalent async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const iteratedAsyncIterable = eachAsync(fn, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, iteratedAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `eachAsync calls the given function for each value in the async iterable in iteration order`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const parameters = []

    await collectAsync(
      toArray,
      eachAsync(value => parameters.push(value), asyncIterable)
    )

    t.deepEqual(parameters, asyncIterable.values)
  }
)

testProp(`eachAsync is lazy`, [asyncIterableArb], async (t, asyncIterable) => {
  t.plan(asyncIterable.values.length + 1)

  let count = 0
  const asyncIterator = eachAsync(() => count++, asyncIterable)[
    Symbol.asyncIterator
  ]()
  t.is(count, 0)

  for (let i = 0; i < asyncIterable.values.length; i++) {
    await asyncIterator.next()
    t.is(count, i + 1)
  }
})

test(`eachAsync concrete example`, async t => {
  let count = 0

  await collectAsync(
    toArray,
    eachAsync(() => count++, asAsync([1, 2, 3]))
  )

  t.is(count, 3)
})

testProp(
  `eachConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const iteratedConcurIterable = eachConcur(fn, concurIterable)

    await t.concurIterable(iteratedConcurIterable)
  }
)

testProp(
  `eachConcur returns an equivalent concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const iteratedConcurIterable = eachConcur(fn, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, iteratedConcurIterable),
      concurIterable.iterationOrder
    )
  }
)

testProp(
  `eachConcur calls the given function for each value in the concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const parameters = []

    await collectConcur(
      toArray,
      eachConcur(value => parameters.push(value), concurIterable)
    )

    t.deepEqual(parameters, concurIterable.iterationOrder)
  }
)

testProp(`eachConcur is lazy`, [concurIterableArb], (t, concurIterable) => {
  let count = 0

  eachConcur(() => count++, concurIterable)

  t.is(count, 0)
})

testProp(
  `eachConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const iteratedConcurIterable = eachConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = iteratedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`eachConcur concrete example`, async t => {
  let count = 0

  await collectConcur(
    toArray,
    eachConcur(() => count++, asConcur([1, 2, 3]))
  )

  t.is(count, 3)
})

testProp(
  `forEach returns undefined`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const value = forEach(fn, iterable)

    t.is(value, undefined)
  }
)

testProp(
  `forEach is eager and calls the given function for each value in the iterable in iteration order`,
  [iterableArb],
  (t, iterable) => {
    const parameters = []

    forEach(value => parameters.push(value), iterable)

    t.deepEqual(parameters, iterable.values)
  }
)

test(`forEach concrete example`, t => {
  let count = 0

  forEach(() => count++, [1, 2, 3])

  t.is(count, 3)
})

testProp(
  `forEachAsync returns undefined`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const value = await forEachAsync(fn, asyncIterable)

    t.is(value, undefined)
  }
)

testProp(
  `forEachAsync is eager and calls the given function for each value in the async iterable in iteration order`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const parameters = []

    await forEachAsync(value => parameters.push(value), asyncIterable)

    t.deepEqual(parameters, asyncIterable.values)
  }
)

test(`forEachAsync concrete example`, async t => {
  let count = 0

  await forEachAsync(() => count++, asAsync([1, 2, 3]))

  t.is(count, 3)
})

testProp(
  `forEachConcur returns undefined`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const value = await forEachConcur(fn, concurIterable)

    t.is(value, undefined)
  }
)

testProp(
  `forEachConcur is eager and calls the given function for each value in the concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const parameters = []

    await forEachConcur(value => parameters.push(value), concurIterable)

    t.deepEqual(parameters, concurIterable.iterationOrder)
  }
)

testProp(
  `forEachConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    // eslint-disable-next-line no-empty-function
    const promise = forEachConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`forEachConcur concrete example`, async t => {
  let count = 0

  await forEachConcur(() => count++, asConcur([1, 2, 3]))

  t.is(count, 3)
})
