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

import { map, mapAsync, mapConcur } from '../src/map.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  fnArb,
  iterableArb,
  maybeAsyncFnArb
} from './helpers/arbs.js'

testProp(`map returns an iterable`, [fnArb, iterableArb], (t, fn, iterable) => {
  const mappedIterable = map(fn, iterable)

  t.iterable(mappedIterable)
})

testProp(`map maps`, [fnArb, iterableArb], (t, fn, iterable) => {
  const mappedIterable = map(fn, iterable)

  t.deepEqual(
    [...mappedIterable],
    iterable.values.map(value => fn(value))
  )
})

testProp(`map is lazy`, [fnArb, iterableArb], (t, fn, iterable) => {
  t.plan(iterable.values.length + 1)

  let count = 0
  const iterator = map(value => {
    count++
    return fn(value)
  }, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < iterable.values.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`map concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const mappedIterable = map(value => value * 2, iterable)

  t.deepEqual([...mappedIterable], [2, 4, 6, 8, 10])
})

testProp(
  `mapAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const mappedAsyncIterable = mapAsync(fn, asyncIterable)

    await t.asyncIterable(mappedAsyncIterable)
  }
)

testProp(
  `mapAsync maps asynchronously`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const mappedAsyncIterable = mapAsync(fn, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, mappedAsyncIterable),
      asyncIterable.values.map(value => fn.sync(value))
    )
  }
)

testProp(
  `mapAsync is lazy`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    t.plan(asyncIterable.values.length + 1)

    let count = 0
    const asyncIterator = mapAsync(value => {
      count++
      return fn(value)
    }, asyncIterable)[Symbol.asyncIterator]()
    t.is(count, 0)

    for (let i = 0; i < asyncIterable.values.length; i++) {
      await asyncIterator.next()
      t.is(count, i + 1)
    }
  }
)

test(`mapAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const mappedAsyncIterable = mapAsync(value => value * 2, asyncIterable)

  t.deepEqual(
    await collectAsync(toArray, mappedAsyncIterable),
    [2, 4, 6, 8, 10]
  )
})

testProp(
  `mapConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const mappedConcurIterable = mapConcur(fn, concurIterable)

    await t.concurIterable(mappedConcurIterable)
  }
)

testProp(
  `mapConcur maps concurrently`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const mappedConcurIterable = mapConcur(fn, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, mappedConcurIterable),
      concurIterable.iterationOrder.map(value => fn.sync(value))
    )
  }
)

testProp(
  `mapConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const mappedConcurIterable = mapConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = mappedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`mapConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const mappedConcurIterable = mapConcur(value => value * 2, concurIterable)

  t.deepEqual(
    await collectConcur(toArray, mappedConcurIterable),
    [2, 4, 6, 8, 10]
  )
})
