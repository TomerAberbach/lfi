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
  get,
  getAsync,
  getConcur,
  next,
  nextAsync,
  or,
  orAsync,
  orConcur,
} from '../src/optional.js'
import { asAsync, asConcur } from '../src/as.js'
import { count, countAsync } from '../src/count.js'
import { collectAsync, toArray } from '../src/collect.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb,
  emptyIterableArb,
  fnArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
  maybeAsyncFnArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb,
} from './helpers/arbs.js'

testProp(
  `or calls the given function and returns its output for an iterable not containing exactly one value`,
  [
    fnArb,
    fc.oneof(emptyIterableArb, getIterableArb(fc.anything(), { minLength: 2 })),
  ],
  (t, fn, iterable) => {
    const value = or(fn, iterable)

    t.is(value, fn())
  },
)

testProp(
  `or returns the iterable's only value for an iterable containing one value`,
  [fnArb, getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
  (t, fn, iterable) => {
    const value = or(fn, iterable)

    t.is(value, iterable.values[0])
  },
)

test(`or concrete example`, t => {
  const iterable = [1, 2, 3]

  const value = or(() => 4, iterable)

  t.is(value, 4)
})

testProp(
  `orAsync calls the given function and returns its output for an async iterable not containing exactly one value`,
  [
    maybeAsyncFnArb,
    fc.oneof(
      emptyAsyncIterableArb,
      getAsyncIterableArb(fc.anything(), { minLength: 2 }),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const value = await orAsync(fn, asyncIterable)

    t.is(value, fn.sync())
  },
)

testProp(
  `orAsync returns the async iterable's only value for an async iterable containing one value`,
  [
    maybeAsyncFnArb,
    getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
  ],
  async (t, fn, asyncIterable) => {
    const value = await orAsync(fn, asyncIterable)

    t.is(value, asyncIterable.values[0])
  },
)

test(`orAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const value = await orAsync(() => 4, asyncIterable)

  t.is(value, 4)
})

testProp(
  `orConcur calls the given function and returns its output for a concur iterable not containing exactly one value`,
  [
    maybeAsyncFnArb,
    fc.oneof(
      emptyConcurIterableArb,
      getConcurIterableArb(fc.anything(), { minLength: 2 }),
    ),
  ],
  async (t, fn, concurIterable) => {
    const value = await orConcur(fn, concurIterable)

    t.is(value, fn.sync())
  },
)

testProp(
  `orConcur returns the concur iterable's only value for a concur iterable containing one value`,
  [
    maybeAsyncFnArb,
    getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
  ],
  async (t, fn, concurIterable) => {
    const value = await orConcur(fn, concurIterable)

    t.is(value, concurIterable.values[0])
  },
)

testProp(
  `orConcur takes only as much time as the given function for an empty concur iterable`,
  [maybeAsyncFnArb, emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const promise = orConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(fn.timeout)

    t.fulfilled(promise)
  },
)

testProp(
  `orConcur takes only as much time as the concur iterable for a concur iterable containing one value`,
  [
    maybeAsyncFnArb,
    getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
  ],
  async (t, fn, concurIterable) => {
    const promise = orConcur(fn, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  },
)

testProp(
  `orConcur takes only as much time as the fastest two values and the given function for a concur iterable containing at least 2 values`,
  [maybeAsyncFnArb, getConcurIterableArb(fc.anything(), { minLength: 2 })],
  async (t, fn, concurIterable) => {
    const promise = orConcur(fn, concurIterable)

    t.pending(promise)

    const [minTimeout, secondMinTimeout] = [...concurIterable.timeouts].sort(
      (a, b) => a - b,
    )
    await t.tick(minTimeout + secondMinTimeout + fn.timeout)

    t.fulfilled(promise)
  },
)

test(`orConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const value = await orConcur(() => 4, concurIterable)

  t.is(value, 4)
})

testProp(
  `get throws an error for an iterable not containing exactly one value`,
  [fc.oneof(emptyIterableArb, getIterableArb(fc.anything(), { minLength: 2 }))],
  (t, iterable) => {
    t.throws(
      () => {
        get(iterable)
      },
      {
        message: `Did not contain exactly one value`,
        instanceOf: Error,
      },
    )
  },
)

testProp(
  `get returns the iterable's only value for an iterable containing one value`,
  [getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
  (t, iterable) => {
    const value = get(iterable)

    t.is(value, iterable.values[0])
  },
)

test(`get concrete example`, t => {
  const iterable = [1]

  const value = get(iterable)

  t.is(value, 1)
})

testProp(
  `getAsync throws an error for an async iterable not containing exactly one value`,
  [
    fc.oneof(
      emptyAsyncIterableArb,
      getAsyncIterableArb(fc.anything(), { minLength: 2 }),
    ),
  ],
  async (t, asyncIterable) => {
    await t.throwsAsync(
      async () => {
        await getAsync(asyncIterable)
      },
      {
        message: `Did not contain exactly one value`,
        instanceOf: Error,
      },
    )
  },
)

testProp(
  `getAsync returns the async iterable's only value for an async iterable containing one value`,
  [getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
  async (t, asyncIterable) => {
    const value = await getAsync(asyncIterable)

    t.is(value, asyncIterable.values[0])
  },
)

test(`getAsync concrete example`, async t => {
  const asyncIterable = asAsync([1])

  const value = await getAsync(asyncIterable)

  t.is(value, 1)
})

testProp(
  `getConcur throws an error for a concur iterable not containing exactly one value`,
  [
    fc.oneof(
      emptyConcurIterableArb,
      getConcurIterableArb(fc.anything(), { minLength: 2 }),
    ),
  ],
  async (t, concurIterable) => {
    await t.throwsAsync(() => getConcur(concurIterable), {
      message: `Did not contain exactly one value`,
      instanceOf: Error,
    })
  },
)

testProp(
  `getConcur returns the concur iterable's only value for a concur iterable containing one value`,
  [getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
  async (t, concurIterable) => {
    const value = await getConcur(concurIterable)

    t.is(value, concurIterable.values[0])
  },
)

test(`getConcur concrete example`, async t => {
  const concurIterable = asConcur([1])

  const value = await getConcur(concurIterable)

  t.is(value, 1)
})

testProp(
  `next returns a pair of iterables, the second of which isn't pure`,
  [iterableArb],
  (t, iterable) => {
    const pair = next(iterable)

    t.true(Array.isArray(pair))
    t.is(pair.length, 2)

    const [iterable1, iterable2] = pair

    t.iterable(iterable1)
    t.iterable(iterable2, { pure: false })
  },
)

testProp(
  `next returns a pair containing two empty iterables for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const [iterable1, iterable2] = next(iterable)

    t.is(count(iterable1), 0)
    t.is(count(iterable2), 0)
  },
)

testProp(
  `next returns a pair containing an iterable containing the first value of the given iterable followed by an iterable containing the rest of the given iterable, for a nonempty iterable`,
  [nonEmptyIterableArb],
  (t, iterable) => {
    const [iterable1, iterable2] = next(iterable)

    t.is(get(iterable1), iterable.values[0])
    t.deepEqual([...iterable2], iterable.values.slice(1))
  },
)

test(`next concrete example`, t => {
  const iterable = [1, 2, 3, 4]

  const [first, rest] = next(iterable)

  t.is(get(first), 1)
  t.deepEqual([...rest], [2, 3, 4])
})

testProp(
  `nextAsync returns a pair of async iterables, the second of which isn't pure`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const pair = await nextAsync(asyncIterable)

    t.true(Array.isArray(pair))
    t.is(pair.length, 2)

    const [asyncIterable1, asyncIterable2] = pair

    await t.asyncIterable(asyncIterable1)
    await t.asyncIterable(asyncIterable2, { pure: false })
  },
)

testProp(
  `nextAsync returns a pair containing two empty async iterables for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, iterable) => {
    const [asyncIterable1, asyncIterable2] = await nextAsync(iterable)

    t.is(await countAsync(asyncIterable1), 0)
    t.is(await countAsync(asyncIterable2), 0)
  },
)

testProp(
  `nextAsync returns a pair containing an async iterable containing the first value of the given async iterable followed by an async iterable containing the rest of the given async iterable, for a nonempty async iterable`,
  [nonEmptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const [asyncIterable1, asyncIterable2] = await nextAsync(asyncIterable)

    t.is(await getAsync(asyncIterable1), asyncIterable.values[0])
    t.deepEqual(
      await collectAsync(toArray, asyncIterable2),
      asyncIterable.values.slice(1),
    )
  },
)

test(`nextAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4])

  const [first, rest] = await nextAsync(asyncIterable)

  t.is(await getAsync(first), 1)
  t.deepEqual(await collectAsync(toArray, rest), [2, 3, 4])
})
