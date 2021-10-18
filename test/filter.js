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
import {
  filter,
  filterAsync,
  filterConcur,
  without,
  withoutAsync,
  withoutConcur,
} from '../src/filter.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getConcurIterableArb,
  iterableArb,
  maybeAsyncPredicateArb,
  predicateArb,
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `filter returns an iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const filtered = filter(fn, iterable)

    t.iterable(filtered)
  },
)

testProp(`filter filters`, [predicateArb, iterableArb], (t, fn, iterable) => {
  const filtered = filter(fn, iterable)

  t.deepEqual(
    [...filtered],
    iterable.values.filter(value => fn(value) === true),
  )
})

testProp(`filter is lazy`, [iterableArb], (t, iterable) => {
  t.plan(iterable.values.length + 1)

  let count = 0
  const iterator = filter(() => {
    count++
    return true
  }, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < iterable.values.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`filter concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6]

  const filtered = filter(value => value % 2 === 0, iterable)

  t.deepEqual([...filtered], [2, 4, 6])
})

testProp(
  `filterAsync returns an async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const filtered = filterAsync(fn, asyncIterable)

    await t.asyncIterable(filtered)
  },
)

testProp(
  `filterAsync filters asynchronously`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const filtered = filterAsync(fn, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, filtered),
      asyncIterable.values.filter(value => fn.sync(value) === true),
    )
  },
)

testProp(
  `filterAsync is lazy`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    t.plan(asyncIterable.values.length + 1)

    let count = 0
    const asyncIterator = filterAsync(() => {
      count++
      return true
    }, asyncIterable)[Symbol.asyncIterator]()
    t.is(count, 0)

    for (let i = 0; i < asyncIterable.values.length; i++) {
      await asyncIterator.next()
      t.is(count, i + 1)
    }
  },
)

test(`filterAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6])

  const filtered = filterAsync(value => value % 2 === 0, asyncIterable)

  t.deepEqual(await collectAsync(toArray, filtered), [2, 4, 6])
})

testProp(
  `filterConcur returns a concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const filtered = filterConcur(fn, concurIterable)

    await t.concurIterable(filtered)
  },
)

testProp(
  `filterConcur filters concurrently`,
  [maybeAsyncPredicateArb, getConcurIterableArb(fc.integer())],
  async (t, fn, concurIterable) => {
    const filtered = filterConcur(fn, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, filtered),
      concurIterable.iterationOrder.filter(value => fn.sync(value) === true),
    )
  },
)

testProp(`filterConcur is lazy`, [concurIterableArb], (t, concurIterable) => {
  let count = 0
  filterConcur(() => {
    count++
    return true
  }, concurIterable)

  t.is(count, 0)
})

test(`filterConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6])

  const filtered = filterConcur(value => value % 2 === 0, concurIterable)

  t.deepEqual(await collectConcur(toArray, filtered), [2, 4, 6])
})

testProp(
  `without excludes elements from the given iterable`,
  [iterableArb, iterableArb],
  (t, excluded, iterable) => {
    const filtered = without(excluded, iterable)

    t.deepEqual(
      [...filtered],
      iterable.values.filter(value => !excluded.values.includes(value)),
    )
  },
)

test(`without concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const filtered = without([2, 4], iterable)

  t.deepEqual([...filtered], [1, 3, 5])
})

testProp(
  `withoutAsync excludes elements from the given async iterable`,
  [iterableArb, asyncIterableArb],
  async (t, excluded, asyncIterable) => {
    const filtered = withoutAsync(excluded, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, filtered),
      asyncIterable.values.filter(value => !excluded.values.includes(value)),
    )
  },
)

test(`withoutAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const filtered = withoutAsync([2, 4], asyncIterable)

  t.deepEqual(await collectAsync(toArray, filtered), [1, 3, 5])
})

testProp(
  `withoutConcur excludes elements from the given concur iterable`,
  [iterableArb, concurIterableArb],
  async (t, excluded, concurIterable) => {
    const filtered = withoutConcur(excluded, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, filtered),
      concurIterable.iterationOrder.filter(
        value => !excluded.values.includes(value),
      ),
    )
  },
)

test(`withoutConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const filtered = withoutConcur([2, 4], concurIterable)

  t.deepEqual(await collectConcur(toArray, filtered), [1, 3, 5])
})
