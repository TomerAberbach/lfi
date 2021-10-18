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
  all,
  allAsync,
  allConcur,
  any,
  anyAsync,
  anyConcur,
  includes,
  includesAsync,
  includesConcur,
  none,
  noneAsync,
  noneConcur,
} from '../src/predicate.js'
import { asAsync, asConcur } from '../src/as.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  maybeAsyncPredicateArb,
  predicateArb,
} from './helpers/arbs.js'

testProp(
  `all checks whether the given function returns true for all values of the given iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const result = all(fn, iterable)

    t.is(
      result,
      iterable.values.every(value => fn(value) === true),
    )
  },
)

test(`all concrete example`, t => {
  const iterable = [1, 2, 3]

  const result = all(value => value > 0, iterable)

  t.is(result, true)
})

testProp(
  `all checks whether the given function returns true for all values of the given async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const result = await allAsync(fn, asyncIterable)

    t.is(
      result,
      asyncIterable.values.every(value => fn.sync(value) === true),
    )
  },
)

test(`allAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const result = await allAsync(value => value > 0, asyncIterable)

  t.is(result, true)
})

testProp(
  `allConcur checks whether the given function returns true for all values of the given concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const result = await allConcur(fn, concurIterable)

    t.is(
      result,
      concurIterable.values.every(value => fn.sync(value) === true),
    )
  },
)

testProp(
  `allConcur is concurrent`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const promise = allConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`allConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const result = await allConcur(value => value > 0, concurIterable)

  t.is(result, true)
})

testProp(
  `any checks whether the given function returns true for any value of the given iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const result = any(fn, iterable)

    t.is(
      result,
      iterable.values.some(value => fn(value) === true),
    )
  },
)

test(`any concrete example`, t => {
  const iterable = [1, 2, 3]

  const result = any(value => value > 0, iterable)

  t.is(result, true)
})

testProp(
  `any checks whether the given function returns true for any value of the given async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const result = await anyAsync(fn, asyncIterable)

    t.is(
      result,
      asyncIterable.values.some(value => fn.sync(value) === true),
    )
  },
)

test(`anyAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const result = await anyAsync(value => value > 0, asyncIterable)

  t.is(result, true)
})

testProp(
  `anyConcur checks whether the given function returns true for any value of the given concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const result = await anyConcur(fn, concurIterable)

    t.is(
      result,
      concurIterable.values.some(value => fn.sync(value) === true),
    )
  },
)

testProp(
  `anyConcur is concurrent`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const promise = anyConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`anyConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const result = await anyConcur(value => value > 0, concurIterable)

  t.is(result, true)
})

testProp(
  `none checks whether the given function returns true for no value of the given iterable`,
  [predicateArb, iterableArb],
  (t, fn, iterable) => {
    const result = none(fn, iterable)

    t.is(result, !iterable.values.some(value => fn(value) === true))
  },
)

test(`none concrete example`, t => {
  const iterable = [1, 2, 3]

  const result = none(value => value > 0, iterable)

  t.is(result, false)
})

testProp(
  `none checks whether the given function returns true for no value of the given async iterable`,
  [maybeAsyncPredicateArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const result = await noneAsync(fn, asyncIterable)
    t.is(result, !asyncIterable.values.some(value => fn.sync(value) === true))
  },
)

test(`noneAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const result = await noneAsync(value => value > 0, asyncIterable)

  t.is(result, false)
})

testProp(
  `noneConcur checks whether the given function returns true for no value of the given concur iterable`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const result = await noneConcur(fn, concurIterable)

    t.is(result, !concurIterable.values.some(value => fn.sync(value) === true))
  },
)

testProp(
  `noneConcur is concurrent`,
  [maybeAsyncPredicateArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const promise = noneConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`noneConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const result = await noneConcur(value => value > 0, concurIterable)

  t.is(result, false)
})

testProp(
  `includes checks if the given element is in the given iterable`,
  [
    fc.oneof(
      fc.tuple(fc.anything(), iterableArb),
      fc
        .tuple(fc.nat(), iterableArb)
        .map(([n, iterable]) => [
          iterable.values[n % iterable.values.length],
          iterable,
        ]),
    ),
  ],
  (t, [searchElement, iterable]) => {
    const result = includes(searchElement, iterable)

    t.is(result, iterable.values.includes(searchElement))
  },
)

test(`includes concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const result = includes(4, iterable)

  t.is(result, true)
})

testProp(
  `includesAsync checks if the given element is in the given async iterable`,
  [
    fc.oneof(
      fc.tuple(fc.anything(), asyncIterableArb),
      fc
        .tuple(fc.nat(), asyncIterableArb)
        .map(([n, asyncIterable]) => [
          asyncIterable.values[n % asyncIterable.values.length],
          asyncIterable,
        ]),
    ),
  ],
  async (t, [searchElement, asyncIterable]) => {
    const result = await includesAsync(searchElement, asyncIterable)

    t.is(result, asyncIterable.values.includes(searchElement))
  },
)

test(`includesAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const result = await includesAsync(4, asyncIterable)

  t.is(result, true)
})

testProp(
  `includesConcur checks if the given element is in the given async iterable`,
  [
    fc.oneof(
      fc.tuple(fc.anything(), concurIterableArb),
      fc
        .tuple(fc.nat(), concurIterableArb)
        .map(([n, concurIterable]) => [
          concurIterable.values[n % concurIterable.values.length],
          concurIterable,
        ]),
    ),
  ],
  async (t, [searchElement, concurIterable]) => {
    const result = await includesConcur(searchElement, concurIterable)

    t.is(result, concurIterable.values.includes(searchElement))
  },
)

testProp(
  `includesConcur is concurrent`,
  [
    fc.oneof(
      fc.tuple(fc.anything(), concurIterableArb),
      fc
        .tuple(fc.nat(), concurIterableArb)
        .map(([n, concurIterable]) => [
          concurIterable.values[n % concurIterable.values.length],
          concurIterable,
        ]),
    ),
  ],
  async (t, [searchElement, concurIterable]) => {
    const promise = includesConcur(searchElement, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  },
)

test(`includesConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const result = await includesConcur(4, concurIterable)

  t.is(result, true)
})
