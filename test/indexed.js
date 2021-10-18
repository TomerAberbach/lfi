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

import { indexed, indexedAsync, indexedConcur } from '../src/indexed.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from './helpers/arbs.js'

testProp(`indexed returns an iterable`, [iterableArb], (t, iterable) => {
  const indexedIterable = indexed(iterable)

  t.iterable(indexedIterable)
})

testProp(
  `indexed returns an iterable containing the values of the given iterable in pairs with their indices`,
  [iterableArb],
  (t, iterable) => {
    const indexedIterable = indexed(iterable)

    t.deepEqual(
      [...indexedIterable],
      iterable.values.map((value, index) => [index, value]),
    )
  },
)

test(`indexed concrete example`, t => {
  const iterable = [1, 2, 3]

  const indexedIterable = indexed(iterable)

  t.deepEqual(
    [...indexedIterable],
    [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
  )
})

testProp(
  `indexedAsync returns an async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const indexedAsyncIterable = indexedAsync(asyncIterable)

    await t.asyncIterable(indexedAsyncIterable)
  },
)

testProp(
  `indexedAsync returns an async iterable containing the values of the given async iterable in pairs with their indices`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const indexedAsyncIterable = indexedAsync(asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, indexedAsyncIterable),
      asyncIterable.values.map((value, index) => [index, value]),
    )
  },
)

test(`indexedAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const indexedAsyncIterable = indexedAsync(asyncIterable)

  t.deepEqual(await collectAsync(toArray, indexedAsyncIterable), [
    [0, 1],
    [1, 2],
    [2, 3],
  ])
})

testProp(
  `indexedConcur returns a concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const indexedConcurIterable = indexedConcur(concurIterable)

    await t.concurIterable(indexedConcurIterable)
  },
)

testProp(
  `indexedConcur returns a concur iterable containing the values of the given concur iterable in pairs with their indices`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const indexedConcurIterable = indexedConcur(concurIterable)

    t.deepEqual(
      await collectConcur(toArray, indexedConcurIterable),
      concurIterable.iterationOrder.map((value, index) => [index, value]),
    )
  },
)

testProp(
  `indexedConcur is concurrent`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const indexedConcurIterable = indexedConcur(concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = indexedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  },
)

test(`indexedConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const indexedConcurIterable = indexedConcur(concurIterable)

  t.deepEqual(await collectConcur(toArray, indexedConcurIterable), [
    [0, 1],
    [1, 2],
    [2, 3],
  ])
})
