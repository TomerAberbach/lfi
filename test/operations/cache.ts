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

import { expectTypeOf, fc } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  cache,
  cacheAsync,
  cacheConcur,
  consumeConcur,
  each,
  eachAsync,
  eachConcur,
  index,
  indexAsync,
  map,
  pipe,
  reduce,
  reduceAsync,
  reduceConcur,
  toArray,
  toCount,
  toGrouped,
  toMap,
} from '../../src/index.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`cache types are correct`, () => {
  expectTypeOf(cache([1, 2, 3])).toMatchTypeOf<Iterable<number>>()
})

testProp(`cache returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const cachedIterable = cache(iterable)

  expect(cachedIterable).toBeIterable()
})

testProp(
  `cache returns an iterable containing the same values in the same order as the given iterable`,
  [iterableArb],
  ({ iterable, values }) => {
    const cachedIterable = cache(iterable)

    expect([...cachedIterable]).toStrictEqual(values)
  },
)

testProp(
  `cache ensures the underlying iterable is iterated at most once`,
  [
    nonEmptyIterableArb,
    fc.integer({ min: 1, max: 100 }),
    fc.infiniteStream(fc.nat()),
  ],
  ({ iterable, values }, iteratorCount, iteratorIndices) => {
    const iterated = values.map(() => false)
    const expectingIterable = pipe(
      iterable,
      index,
      each(([index]) => {
        expect(iterated[index]).toBeFalse()
        iterated[index] = true
      }),
    )

    const cachedIterable = cache(expectingIterable)

    const iterators = Array.from({ length: iteratorCount }, () =>
      cachedIterable[Symbol.iterator](),
    )
    do {
      const index = iteratorIndices.next().value % iterators.length
      if (iterators[index].next().done) {
        iterators.splice(index, 1)
      }
    } while (iterators.length > 0)
  },
)

test(`cacheAsync types are correct`, () => {
  expectTypeOf(cacheAsync(asAsync([1, 2, 3]))).toMatchTypeOf<
    AsyncIterable<number>
  >()
})

testProp(
  `cacheAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const cachedIterable = cacheAsync(iterable)

    await expect(cachedIterable).toBeAsyncIterable()
  },
)

testProp(
  `cacheAsync returns an async iterable containing the same values in the same order as the given async iterable`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const cachedIterable = cacheAsync(iterable)

    expect(await reduceAsync(toArray(), cachedIterable)).toStrictEqual(values)
  },
)

testProp(
  `cacheAsync ensures the underlying async iterable is iterated at most once`,
  [
    nonEmptyAsyncIterableArb,
    fc.integer({ min: 1, max: 100 }),
    fc.infiniteStream(fc.nat()),
  ],
  async ({ iterable, values }, iteratorCount, iteratorIndices) => {
    const iterated = values.map(() => false)
    const expectngIterable = pipe(
      iterable,
      indexAsync,
      eachAsync(([index]) => {
        expect(iterated[index]).toBeFalse()
        iterated[index] = true
      }),
    )

    const cachedIterable = cacheAsync(expectngIterable)

    const iterators = Array.from({ length: iteratorCount }, () =>
      cachedIterable[Symbol.asyncIterator](),
    )
    do {
      const index = iteratorIndices.next().value % iterators.length
      if ((await iterators[index].next()).done) {
        iterators.splice(index, 1)
      }
    } while (iterators.length > 0)
  },
)

test(`cacheConcur types are correct`, () => {
  expectTypeOf(cacheConcur(asConcur([1, 2, 3]))).toMatchTypeOf<
    ConcurIterable<number>
  >()
})

testProp(
  `cacheConcur returns a pure concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const cachedIterable = cacheConcur(iterable)

    await expect(cachedIterable).toBeConcurIterable()
  },
)

testProp(
  `cacheConcur returns a concur iterable containing the same values as the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const cachedIterable = cacheConcur(iterable)

    expect(await reduceConcur(toArray(), cachedIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `cacheConcur ensures the underlying concur iterable is iterated at most once`,
  [nonEmptyConcurIterableArb],
  async ({ iterable, values }, scheduler) => {
    const iterated = pipe(
      values,
      map(value => [value, value] as const),
      reduce(toGrouped(toCount(), toMap())),
    )
    const expectingIterable = eachConcur(value => {
      expect(iterated.get(value)).toBeGreaterThan(0)
      iterated.set(value, iterated.get(value)! - 1)
    }, iterable)

    const cachedIterable = cacheConcur(expectingIterable)

    await Promise.all(
      values.map(async () => {
        await scheduler.schedule()
        await consumeConcur(cachedIterable)
      }),
    )
  },
)

testProp(
  `cacheConcur returns a concur iterable as concurrent as the given concur iterable`,
  [concurIterableArb],
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(cacheConcur(iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)
