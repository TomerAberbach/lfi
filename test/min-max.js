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
  max,
  maxAsync,
  maxBy,
  maxByAsync,
  maxByConcur,
  maxConcur,
  maxWith,
  maxWithAsync,
  maxWithConcur,
  min,
  minAsync,
  minBy,
  minByAsync,
  minByConcur,
  minConcur,
  minMax,
  minMaxAsync,
  minMaxBy,
  minMaxByAsync,
  minMaxByConcur,
  minMaxConcur,
  minMaxWith,
  minMaxWithAsync,
  minMaxWithConcur,
  minWith,
  minWithAsync,
  minWithConcur,
} from '../src/min-max.js'
import { get, getAsync, getConcur } from '../src/optional.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb,
  emptyIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getFnArb,
  getIterableArb,
  getMaybeAsyncFnArb,
  iterableArb,
  maybeAsyncCompareFnArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from './helpers/arbs.js'

testProp(
  `minBy returns an iterable`,
  [fc.compareFunc(), iterableArb],
  (t, fn, iterable) => {
    const minimum = minBy(fn, iterable)

    t.iterable(minimum)
  },
)

testProp(
  `minBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc(), emptyIterableArb],
  (t, fn, iterable) => {
    const minimum = minBy(fn, iterable)

    t.deepEqual([...minimum], [])
  },
)

testProp(
  `minBy returns the minimum element based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const minimum = minBy(fn, iterable)

    t.deepEqual(get(minimum), [...iterable.values].sort(fn)[0])
  },
)

testProp(
  `minByAsync returns an async iterable`,
  [maybeAsyncCompareFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minByAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMinimum)
  },
)

testProp(
  `minByAsync returns an empty async iterable for an empty async iterable`,
  [maybeAsyncCompareFnArb, emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minByAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimum), [])
  },
)

testProp(
  `minByAsync returns the minimum element based on the comparison function for a non-empty async iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minByAsync(fn, asyncIterable)

    t.deepEqual(
      await getAsync(asyncMinimum),
      [...asyncIterable.values].sort(fn.sync)[0],
    )
  },
)

testProp(
  `minByConcur returns a concur iterable`,
  [maybeAsyncCompareFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimum = minByConcur(fn, concurIterable)

    await t.concurIterable(concurMinimum)
  },
)

testProp(
  `minByConcur returns an empty concur iterable for an empty concur iterable`,
  [maybeAsyncCompareFnArb, emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimum = minByConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimum), [])
  },
)

testProp(
  `minByConcur returns the minimum element based on the comparison function for a non-empty concur iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMinimum = minByConcur(fn, concurIterable)

    t.is(
      fn.sync(
        await getConcur(concurMinimum),
        [...concurIterable.values].sort(fn.sync)[0],
      ),
      0,
    )
  },
)

testProp(
  `maxBy returns an iterable`,
  [fc.compareFunc(), iterableArb],
  (t, fn, iterable) => {
    const maximum = maxBy(fn, iterable)

    t.iterable(maximum)
  },
)

testProp(
  `maxBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc(), emptyIterableArb],
  (t, fn, iterable) => {
    const maximum = maxBy(fn, iterable)

    t.deepEqual([...maximum], [])
  },
)

testProp(
  `maxBy returns the maximum element based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const maximum = maxBy(fn, iterable)

    t.deepEqual(get(maximum), [...iterable.values].sort((a, b) => fn(b, a))[0])
  },
)

testProp(
  `maxByAsync returns an async iterable`,
  [maybeAsyncCompareFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxByAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMaximum)
  },
)

testProp(
  `maxByAsync returns an empty async iterable for an empty async iterable`,
  [maybeAsyncCompareFnArb, emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxByAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMaximum), [])
  },
)

testProp(
  `maxByAsync returns the maximum element based on the comparison function for a non-empty async iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxByAsync(fn, asyncIterable)

    t.deepEqual(
      await getAsync(asyncMaximum),
      [...asyncIterable.values].sort((a, b) => fn.sync(b, a))[0],
    )
  },
)

testProp(
  `maxByConcur returns a concur iterable`,
  [maybeAsyncCompareFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxByConcur(fn, concurIterable)

    await t.concurIterable(concurMaximum)
  },
)

testProp(
  `maxByConcur returns an empty concur iterable for an empty concur iterable`,
  [maybeAsyncCompareFnArb, emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxByConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMaximum), [])
  },
)

testProp(
  `maxByConcur returns the maximum element based on the comparison function for a non-empty concur iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxByConcur(fn, concurIterable)

    t.is(
      fn.sync(
        await getConcur(concurMaximum),
        [...concurIterable.values].sort((a, b) => fn.sync(b, a))[0],
      ),
      0,
    )
  },
)

testProp(
  `minMaxBy returns an iterable`,
  [fc.compareFunc(), iterableArb],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    t.iterable(minimumMaximum)
  },
)

testProp(
  `minMaxBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc(), emptyIterableArb],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    t.deepEqual([...minimumMaximum], [])
  },
)

testProp(
  `minMaxBy returns the maximum element based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    t.deepEqual(get(minimumMaximum), {
      min: get(minBy(fn, iterable)),
      max: get(maxBy(fn, iterable)),
    })
  },
)

testProp(
  `minMaxByAsync returns an async iterable`,
  [maybeAsyncCompareFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxByAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMinimumMaximum)
  },
)

testProp(
  `minMaxByAsync returns an empty async iterable for an empty async iterable`,
  [maybeAsyncCompareFnArb, emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxByAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimumMaximum), [])
  },
)

testProp(
  `minMaxByAsync returns the maximum element based on the comparison function for a non-empty async iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxByAsync(fn, asyncIterable)

    t.deepEqual(await getAsync(asyncMinimumMaximum), {
      min: await getAsync(minByAsync(fn, asyncIterable)),
      max: await getAsync(maxByAsync(fn, asyncIterable)),
    })
  },
)

testProp(
  `minMaxByConcur returns a concur iterable`,
  [maybeAsyncCompareFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxByConcur(fn, concurIterable)

    await t.concurIterable(concurMinimumMaximum)
  },
)

testProp(
  `minMaxByConcur returns an empty concur iterable for an empty concur iterable`,
  [maybeAsyncCompareFnArb, emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxByConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimumMaximum), [])
  },
)

testProp(
  `minMaxByConcur returns the maximum element based on the comparison function for a non-empty concur iterable`,
  [
    maybeAsyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxByConcur(fn, concurIterable)

    const minimumMaximum = await getConcur(concurMinimumMaximum)

    t.is(
      fn.sync(
        minimumMaximum.min,
        await getConcur(minByConcur(fn, concurIterable)),
      ),
      0,
    )
    t.is(
      fn.sync(
        minimumMaximum.max,
        await getConcur(maxByConcur(fn, concurIterable)),
      ),
      0,
    )
  },
)

testProp(
  `minWith returns an iterable`,
  [getFnArb(fc.integer()), iterableArb],
  (t, fn, iterable) => {
    const minimum = minWith(fn, iterable)

    t.iterable(minimum)
  },
)

testProp(
  `minWith returns an empty iterable for an empty iterable`,
  [getFnArb(fc.integer()), emptyIterableArb],
  (t, fn, iterable) => {
    const minimum = minWith(fn, iterable)

    t.deepEqual([...minimum], [])
  },
)

testProp(
  `minWith returns the minimum element based on the selector function for a non-empty iterable`,
  [
    getFnArb(fc.integer()),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const minimum = minWith(fn, iterable)

    t.deepEqual(
      get(minimum),
      [...iterable.values].sort((a, b) => fn(a) - fn(b))[0],
    )
  },
)

testProp(
  `minWithAsync returns an async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minWithAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMinimum)
  },
)

testProp(
  `minWithAsync returns an empty async iterable for an empty async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minWithAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimum), [])
  },
)

testProp(
  `minWithAsync returns the minimum element based on the selector function for a non-empty async iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMinimum = minWithAsync(fn, asyncIterable)

    t.deepEqual(
      await getAsync(asyncMinimum),
      [...asyncIterable.values].sort((a, b) => fn.sync(a) - fn.sync(b))[0],
    )
  },
)

testProp(
  `minWithConcur returns a concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimum = minWithConcur(fn, concurIterable)

    await t.concurIterable(concurMinimum)
  },
)

testProp(
  `minWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimum = minWithConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimum), [])
  },
)

testProp(
  `minWithConcur returns the minimum element based on the selector function for a non-empty concur iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMinimum = minWithConcur(fn, concurIterable)

    t.is(
      fn.sync(await getConcur(concurMinimum)),
      fn.sync(
        [...concurIterable.values].sort((a, b) => fn.sync(a) - fn.sync(b))[0],
      ),
    )
  },
)

testProp(
  `maxWith returns an iterable`,
  [getFnArb(fc.integer()), iterableArb],
  (t, fn, iterable) => {
    const maximum = maxWith(fn, iterable)

    t.iterable(maximum)
  },
)

testProp(
  `maxWith returns an empty iterable for an empty iterable`,
  [getFnArb(fc.integer()), emptyIterableArb],
  (t, fn, iterable) => {
    const maximum = maxWith(fn, iterable)

    t.deepEqual([...maximum], [])
  },
)

testProp(
  `maxWith returns the maximum element based on the selector function for a non-empty iterable`,
  [
    getFnArb(fc.integer()),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const maximum = maxWith(fn, iterable)

    t.deepEqual(
      get(maximum),
      [...iterable.values].sort((a, b) => fn(b) - fn(a))[0],
    )
  },
)

testProp(
  `maxWithAsync returns an async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxWithAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMaximum)
  },
)

testProp(
  `maxWithAsync returns an empty async iterable for an empty async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxWithAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMaximum), [])
  },
)

testProp(
  `maxWithAsync returns the maximum element based on the selector function for a non-empty async iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMaximum = maxWithAsync(fn, asyncIterable)

    t.deepEqual(
      await getAsync(asyncMaximum),
      [...asyncIterable.values].sort((a, b) => fn.sync(b) - fn.sync(a))[0],
    )
  },
)

testProp(
  `maxWithConcur returns a concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxWithConcur(fn, concurIterable)

    await t.concurIterable(concurMaximum)
  },
)

testProp(
  `maxWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxWithConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMaximum), [])
  },
)

testProp(
  `maxWithConcur returns the maximum element based on the selector function for a non-empty concur iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMaximum = maxWithConcur(fn, concurIterable)

    t.is(
      fn.sync(await getConcur(concurMaximum)),
      fn.sync(
        [...concurIterable.values].sort((a, b) => fn.sync(b) - fn.sync(a))[0],
      ),
    )
  },
)

testProp(
  `minMaxWith returns an iterable`,
  [getFnArb(fc.integer()), iterableArb],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    t.iterable(minimumMaximum)
  },
)

testProp(
  `minMaxWith returns an empty iterable for an empty iterable`,
  [getFnArb(fc.integer()), emptyIterableArb],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    t.deepEqual([...minimumMaximum], [])
  },
)

testProp(
  `minMaxWith returns the maximum element based on the selector function for a non-empty iterable`,
  [
    getFnArb(fc.integer()),
    nonEmptyIterableArb.filter(
      iterable => !iterable.values.includes(undefined),
    ),
  ],
  (t, fn, iterable) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    t.deepEqual(get(minimumMaximum), {
      min: get(minWith(fn, iterable)),
      max: get(maxWith(fn, iterable)),
    })
  },
)

testProp(
  `minMaxWithAsync returns an async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxWithAsync(fn, asyncIterable)

    await t.asyncIterable(asyncMinimumMaximum)
  },
)

testProp(
  `minMaxWithAsync returns an empty async iterable for an empty async iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyAsyncIterableArb],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxWithAsync(fn, asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimumMaximum), [])
  },
)

testProp(
  `minMaxWithAsync returns the maximum element based on the selector function for a non-empty async iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      asyncIterable => !asyncIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, asyncIterable) => {
    const asyncMinimumMaximum = minMaxWithAsync(fn, asyncIterable)

    t.deepEqual(await getAsync(asyncMinimumMaximum), {
      min: await getAsync(minWithAsync(fn, asyncIterable)),
      max: await getAsync(maxWithAsync(fn, asyncIterable)),
    })
  },
)

testProp(
  `minMaxWithConcur returns a concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), concurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxWithConcur(fn, concurIterable)

    await t.concurIterable(concurMinimumMaximum)
  },
)

testProp(
  `minMaxWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getMaybeAsyncFnArb(fc.integer()), emptyConcurIterableArb],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxWithConcur(fn, concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimumMaximum), [])
  },
)

testProp(
  `minMaxWithConcur returns the maximum element based on the selector function for a non-empty concur iterable`,
  [
    getMaybeAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      concurIterable => !concurIterable.values.includes(undefined),
    ),
  ],
  async (t, fn, concurIterable) => {
    const concurMinimumMaximum = minMaxWithConcur(fn, concurIterable)

    const minimumMaximum = await getConcur(concurMinimumMaximum)

    t.is(
      fn.sync(minimumMaximum.min),
      fn.sync(await getConcur(minWithConcur(fn, concurIterable))),
    )
    t.is(
      fn.sync(minimumMaximum.max),
      fn.sync(await getConcur(maxWithConcur(fn, concurIterable))),
    )
  },
)

testProp(
  `min returns an iterable`,
  [getIterableArb(fc.integer())],
  (t, iterable) => {
    const minimum = min(iterable)

    t.iterable(minimum)
  },
)

testProp(
  `min returns an empty iterable for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const minimum = min(iterable)

    t.deepEqual([...minimum], [])
  },
)

testProp(
  `min returns the minimum element based on the selector function for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  (t, iterable) => {
    const minimum = min(iterable)

    t.is(get(minimum), Math.min(...iterable.values))
  },
)

testProp(
  `minAsync returns an async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async (t, asyncIterable) => {
    const asyncMinimum = minAsync(asyncIterable)

    await t.asyncIterable(asyncMinimum)
  },
)

testProp(
  `minAsync returns an empty async iterable for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const asyncMinimum = minAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimum), [])
  },
)

testProp(
  `minAsync returns the minimum element for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async (t, asyncIterable) => {
    const asyncMinimum = minAsync(asyncIterable)

    t.is(await getAsync(asyncMinimum), Math.min(...asyncIterable.values))
  },
)

testProp(
  `minConcur returns a concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async (t, concurIterable) => {
    const concurMinimum = minConcur(concurIterable)

    await t.concurIterable(concurMinimum)
  },
)

testProp(
  `minConcur returns an empty concur iterable for an empty concur iterable`,
  [emptyConcurIterableArb],
  async (t, concurIterable) => {
    const concurMinimum = minConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimum), [])
  },
)

testProp(
  `minConcur returns the minimum element for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async (t, concurIterable) => {
    const concurMinimum = minConcur(concurIterable)

    t.is(await getConcur(concurMinimum), Math.min(...concurIterable.values))
  },
)

testProp(
  `max returns an iterable`,
  [getIterableArb(fc.integer())],
  (t, iterable) => {
    const maximum = max(iterable)

    t.iterable(maximum)
  },
)

testProp(
  `max returns an empty iterable for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const maximum = max(iterable)

    t.deepEqual([...maximum], [])
  },
)

testProp(
  `max returns the maximum element for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  (t, iterable) => {
    const maximum = max(iterable)

    t.is(get(maximum), Math.max(...iterable.values))
  },
)

testProp(
  `maxAsync returns an async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async (t, asyncIterable) => {
    const asyncMaximum = maxAsync(asyncIterable)

    await t.asyncIterable(asyncMaximum)
  },
)

testProp(
  `maxAsync returns an empty async iterable for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const asyncMaximum = maxAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMaximum), [])
  },
)

testProp(
  `maxAsync returns the maximum element for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async (t, asyncIterable) => {
    const asyncMaximum = maxAsync(asyncIterable)

    t.is(await getAsync(asyncMaximum), Math.max(...asyncIterable.values))
  },
)

testProp(
  `maxConcur returns a concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async (t, concurIterable) => {
    const concurMaximum = maxConcur(concurIterable)

    await t.concurIterable(concurMaximum)
  },
)

testProp(
  `maxConcur returns an empty concur iterable for an empty concur iterable`,
  [emptyConcurIterableArb],
  async (t, concurIterable) => {
    const concurMaximum = maxConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMaximum), [])
  },
)

testProp(
  `maxConcur returns the maximum element for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async (t, concurIterable) => {
    const concurMaximum = maxConcur(concurIterable)

    t.is(await getConcur(concurMaximum), Math.max(...concurIterable.values))
  },
)

testProp(
  `minMax returns an iterable`,
  [getIterableArb(fc.integer())],
  (t, iterable) => {
    const minimumMaximum = minMax(iterable)

    t.iterable(minimumMaximum)
  },
)

testProp(
  `minMax returns an empty iterable for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const minimumMaximum = minMax(iterable)

    t.deepEqual([...minimumMaximum], [])
  },
)

testProp(
  `minMax returns the maximum element for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  (t, iterable) => {
    const minimumMaximum = minMax(iterable)

    t.deepEqual(get(minimumMaximum), {
      min: get(min(iterable)),
      max: get(max(iterable)),
    })
  },
)

testProp(
  `minMaxAsync returns an async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async (t, asyncIterable) => {
    const asyncMinimumMaximum = minMaxAsync(asyncIterable)

    await t.asyncIterable(asyncMinimumMaximum)
  },
)

testProp(
  `minMaxAsync returns an empty async iterable for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const asyncMinimumMaximum = minMaxAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, asyncMinimumMaximum), [])
  },
)

testProp(
  `minMaxAsync returns the maximum element for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async (t, asyncIterable) => {
    const asyncMinimumMaximum = minMaxAsync(asyncIterable)

    t.deepEqual(await getAsync(asyncMinimumMaximum), {
      min: await getAsync(minAsync(asyncIterable)),
      max: await getAsync(maxAsync(asyncIterable)),
    })
  },
)

testProp(
  `minMaxConcur returns a concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async (t, concurIterable) => {
    const concurMinimumMaximum = minMaxConcur(concurIterable)

    await t.concurIterable(concurMinimumMaximum)
  },
)

testProp(
  `minMaxConcur returns an empty concur iterable for an empty concur iterable`,
  [emptyConcurIterableArb],
  async (t, concurIterable) => {
    const concurMinimumMaximum = minMaxConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, concurMinimumMaximum), [])
  },
)

testProp(
  `minMaxConcur returns the maximum element for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async (t, concurIterable) => {
    const concurMinimumMaximum = minMaxConcur(concurIterable)

    t.deepEqual(await getConcur(concurMinimumMaximum), {
      min: await getConcur(minConcur(concurIterable)),
      max: await getConcur(maxConcur(concurIterable)),
    })
  },
)
