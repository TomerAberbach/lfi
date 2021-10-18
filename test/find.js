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
  find,
  findAsync,
  findConcur,
  findLast,
  findLastAsync,
  findLastConcur,
} from '../src/find.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  maybeAsyncPredicateArb,
  predicateArb,
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `find returns an iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const found = find(fn, iterable)

    t.iterable(found)
  },
)

testProp(`find finds`, [predicateArb, iterableArb], (t, fn, iterable) => {
  const index = iterable.values.findIndex(value => fn(value) === true)
  const expected = index === -1 ? [] : [iterable.values[index]]

  const found = find(fn, iterable)

  t.deepEqual([...found], expected)
})

test(`find concrete example 1`, t => {
  const iterable = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = find(value => typeof value === `string`, iterable)

  t.deepEqual([...found], [`wow`])
})

test(`find concrete example 2`, t => {
  const iterable = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = find(value => typeof value === `function`, iterable)

  t.deepEqual([...found], [])
})

testProp(
  `findAsync returns an async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const found = findAsync(fn, asyncIterable)

    await t.asyncIterable(found)
  },
)

testProp(
  `findAsync finds asynchronously`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const index = asyncIterable.values.findIndex(
      value => fn.sync(value) === true,
    )
    const expected = index === -1 ? [] : [asyncIterable.values[index]]

    const found = findAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, found), expected)
  },
)

test(`findAsync concrete example 1`, async t => {
  const asyncIterable = asAsync([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findAsync(value => typeof value === `string`, asyncIterable)

  t.deepEqual(await collectAsync(toArray, found), [`wow`])
})

test(`findAsync concrete example 2`, async t => {
  const asyncIterable = asAsync([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findAsync(value => typeof value === `function`, asyncIterable)

  t.deepEqual(await collectAsync(toArray, found), [])
})

testProp(
  `findConcur returns a concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const found = findConcur(fn, concurIterable)

    await t.concurIterable(found)
  },
)

testProp(
  `findConcur finds concurrently`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const index = concurIterable.iterationOrder.findIndex(
      value => fn.sync(value) === true,
    )
    const expected = index === -1 ? [] : [concurIterable.iterationOrder[index]]

    const found = findConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, found), expected)
  },
)

test(`findConcur concrete example 1`, async t => {
  const concurIterable = asConcur([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findConcur(value => typeof value === `string`, concurIterable)

  t.deepEqual(await collectConcur(toArray, found), [`wow`])
})

test(`findConcur concrete example 2`, async t => {
  const concurIterable = asConcur([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findConcur(value => typeof value === `function`, concurIterable)

  t.deepEqual(await collectConcur(toArray, found), [])
})

testProp(
  `findLast returns an iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const found = findLast(fn, iterable)

    t.iterable(found)
  },
)

testProp(
  `findLast finds last`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const index = iterable.values
      .reverse()
      .findIndex(value => fn(value) === true)
    const expected = index === -1 ? [] : [iterable.values[index]]

    const found = findLast(fn, iterable)

    t.deepEqual([...found], expected)
  },
)

test(`findLast concrete example 1`, t => {
  const iterable = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = findLast(value => typeof value === `string`, iterable)

  t.deepEqual([...found], [`howdy`])
})

test(`findLast concrete example 2`, t => {
  const iterable = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = findLast(value => typeof value === `function`, iterable)

  t.deepEqual([...found], [])
})

testProp(
  `findLastAsync returns an async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const found = findLastAsync(fn, asyncIterable)

    await t.asyncIterable(found)
  },
)

testProp(
  `findLastAsync finds asynchronously`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const index = asyncIterable.values
      .reverse()
      .findIndex(value => fn.sync(value) === true)
    const expected = index === -1 ? [] : [asyncIterable.values[index]]

    const found = findLastAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, found), expected)
  },
)

test(`findLastAsync concrete example 1`, async t => {
  const asyncIterable = asAsync([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findLastAsync(value => typeof value === `string`, asyncIterable)

  t.deepEqual(await collectAsync(toArray, found), [`howdy`])
})

test(`findLastAsync concrete example 2`, async t => {
  const asyncIterable = asAsync([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findLastAsync(
    value => typeof value === `function`,
    asyncIterable,
  )

  t.deepEqual(await collectAsync(toArray, found), [])
})

testProp(
  `findLastConcur returns a concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const found = findLastConcur(fn, concurIterable)

    await t.concurIterable(found)
  },
)

testProp(
  `findLastConcur finds last concurrently`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const index = concurIterable.iterationOrder
      .reverse()
      .findIndex(value => fn.sync(value) === true)
    const expected = index === -1 ? [] : [concurIterable.iterationOrder[index]]

    const found = findLastConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, found), expected)
  },
)

test(`findLastConcur concrete example 1`, async t => {
  const concurIterable = asConcur([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findLastConcur(
    value => typeof value === `string`,
    concurIterable,
  )

  t.deepEqual(await collectConcur(toArray, found), [`howdy`])
})

test(`findLastConcur concrete example 2`, async t => {
  const concurIterable = asConcur([5, `wow`, `howdy`, [1, 2, 3]])

  const found = findLastConcur(
    value => typeof value === `function`,
    concurIterable,
  )

  t.deepEqual(await collectConcur(toArray, found), [])
})
