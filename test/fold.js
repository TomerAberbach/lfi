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
  fold,
  foldAsync,
  foldConcur,
  reduce,
  reduceAsync,
  reduceConcur,
} from '../src/fold.js'
import { asAsync, asConcur } from '../src/as.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { getAsync, getConcur } from '../src/optional.js'
import {
  asyncIterableArb,
  concurIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb,
  emptyIterableArb,
  fnArb,
  getConcurIterableArb,
  iterableArb,
  maybeAsyncFnArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `fold folds`,
  [fnArb, fc.anything(), iterableArb],
  (t, fn, initial, iterable) => {
    const folded = fold(fn, initial, iterable)

    t.deepEqual(
      folded,
      iterable.values.reduce((a, b) => fn(a, b), initial),
    )
  },
)

test(`fold concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const folded = fold((a, b) => a + b, 0, iterable)

  t.is(folded, 15)
})

testProp(
  `foldAsync folds asynchronously`,
  [maybeAsyncFnArb, fc.anything(), asyncIterableArb],
  async (t, fn, initial, asyncIterable) => {
    const folded = foldAsync(fn, initial, asyncIterable)

    t.deepEqual(
      await folded,
      asyncIterable.values.reduce((a, b) => fn.sync(a, b), initial),
    )
  },
)

test(`foldAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const folded = await foldAsync((a, b) => a + b, 0, asyncIterable)

  t.is(folded, 15)
})

testProp(
  `foldConcur folds concurrently for an associative and commutative function`,
  [
    fc.constantFrom(
      (a, b) => a + b,
      (a, b) => Math.max(a, b),
      (a, b) => Math.min(a, b),
    ),
    fc.integer(),
    getConcurIterableArb(fc.integer()),
  ],
  async (t, fn, initial, concurIterable) => {
    const folded = await foldConcur(fn, initial, concurIterable)

    t.deepEqual(
      folded,
      concurIterable.values.reduce((a, b) => fn(a, b), initial),
    )
  },
)

testProp(
  `foldConcur is concurrent`,
  [maybeAsyncFnArb, fc.anything(), concurIterableArb],
  async (t, fn, initial, concurIterable) => {
    const promise = foldConcur(fn, initial, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`foldConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const folded = await foldConcur((a, b) => a + b, 0, concurIterable)

  t.is(folded, 15)
})

testProp(
  `reduce returns an iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const reduced = reduce(fn, iterable)

    t.iterable(reduced)
  },
)

testProp(
  `reduce returns an empty iterable for an empty iterable`,
  [fnArb, emptyIterableArb],
  (t, fn, iterable) => {
    const reduced = reduce(fn, iterable)

    t.deepEqual([...reduced], [])
  },
)

testProp(`reduce reduces`, [fnArb, nonEmptyIterableArb], (t, fn, iterable) => {
  const reduced = reduce(fn, iterable)

  t.deepEqual([...reduced], [iterable.values.reduce((a, b) => fn(a, b))])
})

test(`reduce concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5]

  const reduced = reduce((a, b) => a + b, iterable)

  t.deepEqual([...reduced], [15])
})

testProp(
  `reduceAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const reduced = reduceAsync(fn, asyncIterable)

    await t.asyncIterable(reduced)
  },
)

testProp(
  `reduceAsync returns an empty async iterable for an empty async iterable`,
  [maybeAsyncFnArb, emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const reduced = reduceAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, reduced), [])
  },
)

testProp(
  `reduceAsync reduces asynchronously`,
  [maybeAsyncFnArb, nonEmptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const reduced = reduceAsync(fn, asyncIterable)

    t.deepEqual(
      await getAsync(reduced),
      asyncIterable.values.reduce((a, b) => fn.sync(a, b)),
    )
  },
)

test(`reduceAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5])

  const reduced = reduceAsync((a, b) => a + b, asyncIterable)

  t.deepEqual(await getAsync(reduced), 15)
})

testProp(
  `reduceConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const reduced = reduceConcur(fn, concurIterable)

    await t.concurIterable(reduced)
  },
)

testProp(
  `reduceConcur returns an empty concur iterable for an empty concur iterable`,
  [maybeAsyncFnArb, emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const reduced = reduceConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, reduced), [])
  },
)

testProp(
  `reduceConcur reduces concurrently for an associative and commutative function`,
  [
    fc.constantFrom(
      (a, b) => a + b,
      (a, b) => Math.max(a, b),
      (a, b) => Math.min(a, b),
    ),
    getConcurIterableArb(fc.integer(), { minLength: 1 }),
  ],
  async (t, fn, concurIterable) => {
    const reduced = reduceConcur(fn, concurIterable)

    t.deepEqual(
      await getConcur(reduced),
      concurIterable.values.reduce((a, b) => fn(a, b)),
    )
  },
)

testProp(
  `reduceConcur is concurrent`,
  [maybeAsyncFnArb, nonEmptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const promise = getConcur(reduceConcur(fn, concurIterable))

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`reduceConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5])

  const reduced = reduceConcur((a, b) => a + b, concurIterable)

  t.deepEqual(await getConcur(reduced), 15)
})
