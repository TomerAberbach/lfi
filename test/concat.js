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

import { fc } from 'ava-fast-check'
import { concat, concatAsync, concatConcur } from '../src/concat.js'
import { count, countAsync, countConcur } from '../src/count.js'
import { asAsync, asConcur } from '../src/as.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from './helpers/arbs.js'

testProp(
  `concat returns an iterable`,
  [fc.array(iterableArb)],
  (t, iterables) => {
    const concatenatedIterable = concat(...iterables)

    t.iterable(concatenatedIterable)
  },
)

testProp(
  `concat concatenates iterables`,
  [fc.array(iterableArb)],
  (t, iterables) => {
    const concatenatedIterable = concat(...iterables)

    t.deepEqual(
      [...concatenatedIterable],
      iterables.flatMap(({ values }) => values),
    )
  },
)

test(`concat returns an empty iterable for zero arguments`, t => {
  const iterable = concat()

  t.is(count(iterable), 0)
})

test(`concat concrete example`, t => {
  const iterable1 = [1, 2, 3]
  const iterable2 = [4, 5, 6]

  const concatenatedIterable = concat(iterable1, iterable2)

  t.deepEqual([...concatenatedIterable], [1, 2, 3, 4, 5, 6])
})

testProp(
  `concatAsync returns an async iterable`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb))],
  async (t, iterables) => {
    const concatenatedAsyncIterable = concatAsync(...iterables)

    await t.asyncIterable(concatenatedAsyncIterable)
  },
)

testProp(
  `concatAsync concatenates async iterables`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb))],
  async (t, iterables) => {
    const concatenatedAsyncIterable = concatAsync(...iterables)

    t.deepEqual(
      await collectAsync(toArray, concatenatedAsyncIterable),
      iterables.flatMap(({ values }) => values),
    )
  },
)

test(`concatAsync returns an empty async iterable for zero arguments`, async t => {
  const asyncIterable = concatAsync()

  t.is(await countAsync(asyncIterable), 0)
})

test(`concatAsync concrete example`, async t => {
  const asyncIterable1 = asAsync([1, 2, 3])
  const asyncIterable2 = asAsync([4, 5, 6])

  const concatenatedAsyncIterable = concatAsync(asyncIterable1, asyncIterable2)

  t.deepEqual(
    await collectAsync(toArray, concatenatedAsyncIterable),
    [1, 2, 3, 4, 5, 6],
  )
})

testProp(
  `concatConcur returns a concur iterable`,
  [fc.array(concurIterableArb)],
  async (t, concurIterables) => {
    const concatenatedConcurIterable = concatConcur(...concurIterables)

    await t.concurIterable(concatenatedConcurIterable)
  },
)

testProp(
  `concatConcur concatenates concur iterables`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb))],
  async (t, iterables) => {
    const concatenatedConcurIterable = concatConcur(...iterables)

    t.unorderedDeepEqual(
      await collectConcur(toArray, concatenatedConcurIterable),
      iterables.flatMap(({ iterationOrder }) => iterationOrder),
    )
  },
)

testProp(
  `concatConcur is concurrent`,
  [fc.array(concurIterableArb, { minLength: 1 })],
  async (t, concurIterables) => {
    const concatenatedConcurIterable = concatConcur(...concurIterables)

    // eslint-disable-next-line no-empty-function
    const promise = concatenatedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(
      Math.max(...concurIterables.map(({ maxTimeout }) => maxTimeout)),
    )

    t.fulfilled(promise)
  },
)

test(`concatConcur returns an empty concur iterable for zero arguments`, async t => {
  const concurIterable = concatConcur()

  t.is(await countConcur(concurIterable), 0)
})

test(`concatConcur concrete example`, async t => {
  const concurIterable1 = asConcur([1, 2, 3])
  const concurIterable2 = asConcur([4, 5, 6])

  const concatenatedConcurIterable = concatConcur(
    concurIterable1,
    concurIterable2,
  )

  t.unorderedDeepEqual(
    await collectConcur(toArray, concatenatedConcurIterable),
    [1, 2, 3, 4, 5, 6],
  )
})
