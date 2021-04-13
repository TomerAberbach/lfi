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

import { uniqueBy, uniqueByAsync, uniqueByConcur } from '../src/unique.js'
import { count, countAsync, countConcur } from '../src/count.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  fnArb,
  iterableArb,
  maybeAsyncFnArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `uniqueBy returns an iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    t.iterable(uniqueIterable)
  }
)

testProp(
  `uniqueBy returns an iterable containing at least one element (for a non-empty iterable) and no more elements than the given iterable`,
  [fnArb, nonEmptyIterableArb],
  (t, fn, iterable) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    const numberOfElements = count(uniqueIterable)
    t.true(numberOfElements > 0)
    t.true(numberOfElements <= iterable.values.length)
  }
)

testProp(
  `uniqueBy returns a deduplicated iterable based on the given function`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const map = new Map(
      iterable.values
        .map((value, index) => [fn(value), { value, index }])
        .reverse()
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)

    const uniqueIterable = uniqueBy(fn, iterable)

    t.deepEqual([...uniqueIterable], expectedValues)
  }
)

test(`uniqueBy concrete example`, t => {
  const iterable = [1, -2, 3, 2, 10, -10, -2, 3, -4, 4, 10]

  const uniqueIterable = uniqueBy(Math.abs, iterable)

  t.deepEqual([...uniqueIterable], [1, -2, 3, 10, -4])
})

testProp(
  `uniqueByAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const uniqueAsyncIterable = uniqueByAsync(fn, asyncIterable)

    await t.asyncIterable(uniqueAsyncIterable)
  }
)

testProp(
  `uniqueByAsync returns an async iterable containing at least one element (for a non-empty async iterable) and no more elements than the given async iterable`,
  [maybeAsyncFnArb, nonEmptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const uniqueAsyncIterable = uniqueByAsync(fn, asyncIterable)

    const numberOfElements = await countAsync(uniqueAsyncIterable)
    t.true(numberOfElements > 0)
    t.true(numberOfElements <= asyncIterable.values.length)
  }
)

testProp(
  `uniqueByAsync returns a deduplicated async iterable based on the given function`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const map = new Map(
      asyncIterable.values
        .map((value, index) => [fn.sync(value), { value, index }])
        .reverse()
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)

    const uniqueAsyncIterable = uniqueByAsync(fn, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, uniqueAsyncIterable),
      expectedValues
    )
  }
)

test(`uniqueByAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, -2, 3, 2, 10, -10, -2, 3, -4, 4, 10])

  const uniqueAsyncIterable = uniqueByAsync(Math.abs, asyncIterable)

  t.deepEqual(await collectAsync(toArray, uniqueAsyncIterable), [
    1,
    -2,
    3,
    10,
    -4
  ])
})

testProp(
  `uniqueByConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const uniqueConcurIterable = uniqueByConcur(fn, concurIterable)

    await t.concurIterable(uniqueConcurIterable)
  }
)

testProp(
  `uniqueByConcur returns a concur iterable containing at least one element (for a non-empty concur iterable) and no more elements than the given concur iterable`,
  [maybeAsyncFnArb, nonEmptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const uniqueConcurIterable = uniqueByConcur(fn, concurIterable)

    const numberOfElements = await countConcur(uniqueConcurIterable)
    t.true(numberOfElements > 0)
    t.true(numberOfElements <= concurIterable.values.length)
  }
)

testProp(
  `uniqueByConcur returns a deduplicated concur iterable based on the given function`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const map = new Map(
      concurIterable.iterationOrder
        .map((value, index) => [fn.sync(value), { value, index }])
        .reverse()
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)

    const uniqueConcurIterable = uniqueByConcur(fn, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, uniqueConcurIterable),
      expectedValues
    )
  }
)

testProp(
  `uniqueByConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const uniqueConcurIterable = uniqueByConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = uniqueConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`uniqueByConcur concrete example`, async t => {
  const concurIterable = asConcur([1, -2, 3, 2, 10, -10, -2, 3, -4, 4, 10])

  const uniqueConcurIterable = uniqueByConcur(Math.abs, concurIterable)

  t.deepEqual(await collectConcur(toArray, uniqueConcurIterable), [
    1,
    -2,
    3,
    10,
    -4
  ])
})
