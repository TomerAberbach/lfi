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
  consumeConcur,
  exclude,
  excludeAsync,
  excludeConcur,
  filter,
  filterAsync,
  filterConcur,
  filterMap,
  filterMapAsync,
  filterMapConcur,
  mapConcur,
  maxConcur,
  orConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
  unique,
  uniqueAsync,
  uniqueBy,
  uniqueByAsync,
  uniqueByConcur,
  uniqueConcur,
} from '../../src/index.js'
import {
  asyncFnArb,
  asyncPredicateArb,
  fnArb,
  getAsyncFnArb,
  predicateArb,
} from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getConcurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
  uniqueConcurIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`filter types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      filter(n => n > 2),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `filter returns a pure iterable`,
  [predicateArb, iterableArb],
  (fn, { iterable }) => {
    const filteredIterable = filter(fn, iterable)

    expect(filteredIterable).toBeIterable()
  },
)

testProp(
  `filter returns an iterable containing the same values in the same order as the given iterable for which the given predicate returns a truthy value`,
  [predicateArb, iterableArb],
  (fn, { iterable, values }) => {
    const filteredIterable = filter(fn, iterable)

    expect([...filteredIterable]).toStrictEqual(
      values.filter(value => fn(value)),
    )
  },
)

testProp(`filter is lazy`, [iterableArb], ({ iterable, values }) => {
  let count = 0
  const iterator = filter(() => {
    count++
    return true
  }, iterable)[Symbol.iterator]()

  expect(count).toBe(0)
  for (let i = 0; i < values.length; i++) {
    iterator.next()
    expect(count).toBe(i + 1)
  }
})

test.skip(`filterAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      filterAsync(n => n > 2),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      filterAsync(n => Promise.resolve(n > 2)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `filterAsync returns a pure async iterable`,
  [asyncPredicateArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const filteredIterable = filterAsync(asyncFn, iterable)

    await expect(filteredIterable).toBeAsyncIterable()
  },
)

testProp(
  `filterAsync returns an async iterable containing the same values in the same order as the given async iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, asyncIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filteredIterable = filterAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), filteredIterable)).toStrictEqual(
      values.filter(value => syncFn(value)),
    )
  },
)

testProp(
  `filterAsync is lazy`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    let count = 0
    const asyncIterator = filterAsync(() => {
      count++
      return true
    }, iterable)[Symbol.asyncIterator]()

    expect(count).toBe(0)
    for (let i = 0; i < values.length; i++) {
      await asyncIterator.next()
      expect(count).toBe(i + 1)
    }
  },
)

test.skip(`filterConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      filterConcur(n => n > 2),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      filterConcur(n => Promise.resolve(n > 2)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `filterConcur returns a pure concur iterable`,
  [asyncPredicateArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const filteredIterable = filterConcur(asyncFn, iterable)

    await expect(filteredIterable).toBeConcurIterable()
  },
)

testProp(
  `filterConcur returns an concur iterable containing the same values in the same order as the given concur iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, getConcurIterableArb(fc.integer())],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filteredIterable = filterConcur(asyncFn, iterable)

    expect(
      await reduceConcur(toArray(), filteredIterable),
    ).toIncludeSameMembers(values.filter(value => syncFn(value)))
  },
)

testProp(`filterConcur is lazy`, [concurIterableArb], ({ iterable }) => {
  let count = 0
  filterConcur(() => {
    count++
    return true
  }, iterable)

  expect(count).toBe(0)
})

testProp(
  `filterConcur returns a concur iterable as concurrent as the given predicate and concur iterable`,
  [asyncPredicateArb, uniqueConcurIterableArb],
  async ({ asyncFn }, { iterable, values }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(filterConcur(asyncFn, iterable)),
    )

    expect(elapsed).toBe(
      await pipe(
        asConcur(values),
        mapConcur(async value => (await scheduler.report(value)).sum()),
        maxConcur,
        orConcur(() => 0),
      ),
    )
  },
)

test.skip(`filterMap types are correct`, () => {
  expectTypeOf(
    pipe(
      [{ n: 1 }, { n: 2 }, { m: 3 }],
      filterMap(o => o.n),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `filterMap returns a pure iterable`,
  [
    fc.func(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    iterableArb,
  ],
  (fn, { iterable }) => {
    const filterMappedIterable = filterMap(fn, iterable)

    expect(filterMappedIterable).toBeIterable()
  },
)

testProp(
  `filterMap returns an iterable containing the same values in the same order as the given iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
  [
    fc.func(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    iterableArb,
  ],
  (fn, { iterable, values }) => {
    const filterMappedIterable = filterMap(fn, iterable)

    expect([...filterMappedIterable]).toStrictEqual(
      values.map(value => fn(value)).filter(value => value != null),
    )
  },
)

test.skip(`filterMapAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(o => o.n),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(o => Promise.resolve(o.n)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `filterMapAsync returns a pure async iterable`,
  [
    getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    asyncIterableArb,
  ],
  async ({ asyncFn }, { iterable }) => {
    const filterMappedIterable = filterMapAsync(asyncFn, iterable)

    await expect(filterMappedIterable).toBeAsyncIterable()
  },
)

testProp(
  `filterMapAsync returns an async iterable containing the same values in the same order as the given async iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
  [
    getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    asyncIterableArb,
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filterMappedIterable = filterMapAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), filterMappedIterable)).toStrictEqual(
      values.map(value => syncFn(value)).filter(value => value != null),
    )
  },
)

test.skip(`filterMapConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(o => o.n),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(o => Promise.resolve(o.n)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `filterMapConcur returns a pure concur iterable`,
  [
    getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    concurIterableArb,
  ],
  async ({ asyncFn }, { iterable }) => {
    const filterMappedIterable = filterMapConcur(asyncFn, iterable)

    await expect(filterMappedIterable).toBeConcurIterable()
  },
)

testProp(
  `filterMapConcur returns a concur iterable containing the same values as the given conru iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
  [
    getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
    concurIterableArb,
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filterMappedIterable = filterMapConcur(asyncFn, iterable)

    expect(
      await reduceConcur(toArray(), filterMappedIterable),
    ).toIncludeSameMembers(
      values.map(value => syncFn(value)).filter(value => value != null),
    )
  },
)

test.skip(`exclude types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], exclude([1, 2]))).toMatchTypeOf<
    Iterable<number>
  >()
  expectTypeOf(pipe([1, 2, 3], exclude([`a`, `b`]))).toMatchTypeOf<
    Iterable<number>
  >()
})

testProp(
  `exclude returns a pure iterable`,
  [iterableArb, iterableArb],
  ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = exclude(excludedIterable, iterable)

    expect(filteredIterable).toBeIterable()
  },
)

testProp(
  `exclude returns an iterable containing the same values in the same order as the latter given iterable, but excluding the former given iterable`,
  [iterableArb, iterableArb],
  (
    { iterable: excludedIterable, values: excludedValues },
    { iterable, values },
  ) => {
    const filteredIterable = exclude(excludedIterable, iterable)

    expect([...filteredIterable]).toStrictEqual(
      values.filter(value => !excludedValues.includes(value)),
    )
  },
)

test.skip(`excludeAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), excludeAsync([1, 2]))).toMatchTypeOf<
    AsyncIterable<number>
  >()
  expectTypeOf(
    pipe(asAsync([1, 2, 3]), excludeAsync([`a`, `b`])),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `excludeAsync returns a pure async iterable`,
  [iterableArb, asyncIterableArb],
  async ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = excludeAsync(excludedIterable, iterable)

    await expect(filteredIterable).toBeAsyncIterable()
  },
)

testProp(
  `excludeAsync returns an async iterable containing the same values in the same order as the given async iterable, but excluding the given iterable`,
  [iterableArb, asyncIterableArb],
  async (
    { iterable: excludedIterable, values: excludedValues },
    { iterable, values },
  ) => {
    const filteredIterable = excludeAsync(excludedIterable, iterable)

    expect(await reduceAsync(toArray(), filteredIterable)).toStrictEqual(
      values.filter(value => !excludedValues.includes(value)),
    )
  },
)

test.skip(`excludeConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), excludeConcur([1, 2]))).toMatchTypeOf<
    ConcurIterable<number>
  >()
  expectTypeOf(
    pipe(asConcur([1, 2, 3]), excludeConcur([`a`, `b`])),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `excludeConcur returns a pure concur iterable`,
  [iterableArb, concurIterableArb],
  async ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = excludeConcur(excludedIterable, iterable)

    await expect(filteredIterable).toBeConcurIterable()
  },
)

testProp(
  `excludeConcur returns an concur iterable containing the same values in the same order as the given concur iterable, but excluding the given iterable`,
  [iterableArb, concurIterableArb],
  async (
    { iterable: excludedIterable, values: excludedValues },
    { iterable, values },
  ) => {
    const filteredIterable = excludeConcur(excludedIterable, iterable)

    expect(
      await reduceConcur(toArray(), filteredIterable),
    ).toIncludeSameMembers(
      values.filter(value => !excludedValues.includes(value)),
    )
  },
)

testProp(
  `excludeConcur returns a concur iterable as concurrent as the given concur iterable`,
  [iterableArb, concurIterableArb],
  async ({ iterable: excludedIterable }, { iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(excludeConcur(excludedIterable, iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

test.skip(`uniqueBy types are correct`, () => {
  expectTypeOf(
    pipe(
      [-1, 1, 2, 3],
      uniqueBy(n => Math.abs(n)),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `uniqueBy returns a pure iterable`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    expect(uniqueIterable).toBeIterable()
  },
)

testProp(
  `uniqueBy returns an iterable containing at least one element for a non-empty iterable and only elements from the given iterable`,
  [fnArb, nonEmptyIterableArb],
  (fn, { iterable, values }) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    const array = [...uniqueIterable]
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

testProp(
  `uniqueBy returns a deduplicated iterable based on the given function and iterable`,
  [fnArb, iterableArb],
  (fn, { iterable, values }) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    const map = new Map(
      values
        .map((value, index) => [fn(value), { value, index }] as const)
        .reverse(),
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)
    expect([...uniqueIterable]).toStrictEqual(expectedValues)
  },
)

test.skip(`uniqueByAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([-1, 1, 2, 3]),
      uniqueByAsync(n => Math.abs(n)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([-1, 1, 2, 3]),
      uniqueByAsync(n => Promise.resolve(Math.abs(n))),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `uniqueByAsync returns a pure async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const uniqueIterable = uniqueByAsync(asyncFn, iterable)

    await expect(uniqueIterable).toBeAsyncIterable()
  },
)

testProp(
  `uniqueByAsync returns an async iterable containing at least one element for a non-empty async iterable and only elements from the given async iterable`,
  [asyncFnArb, nonEmptyAsyncIterableArb],
  async ({ asyncFn }, { iterable, values }) => {
    const uniqueIterable = uniqueByAsync(asyncFn, iterable)

    const array = await reduceAsync(toArray(), uniqueIterable)
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

testProp(
  `uniqueByAsync returns a deduplicated async iterable based on the given function and async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const uniqueIterable = uniqueByAsync(asyncFn, iterable)

    const map = new Map(
      values
        .map((value, index) => [syncFn(value), { value, index }] as const)
        .reverse(),
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)
    expect(await reduceAsync(toArray(), uniqueIterable)).toStrictEqual(
      expectedValues,
    )
  },
)

test.skip(`uniqueByConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([-1, 1, 2, 3]),
      uniqueByConcur(n => Math.abs(n)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([-1, 1, 2, 3]),
      uniqueByConcur(n => Promise.resolve(Math.abs(n))),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `uniqueByConcur returns a concur iterable`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const uniqueIterable = uniqueByConcur(asyncFn, iterable)

    await expect(uniqueIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `uniqueByConcur returns a deduplicated concur iterable based on the given function and concur iterable`,
  [asyncFnArb, nonEmptyConcurIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const uniqueIterable = uniqueByConcur(asyncFn, iterable)

    const array = await reduceConcur(toArray(), uniqueIterable)
    expect(values).toIncludeAllMembers(array)
    expect(array).toBeArrayOfSize(
      new Set(array.map(value => syncFn(value))).size,
    )
  },
)

test.skip(`unique types are correct`, () => {
  expectTypeOf(pipe([1, 1, 2, 3], unique)).toMatchTypeOf<Iterable<number>>()
})

testProp(`unique returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const uniqueIterable = unique(iterable)

  expect(uniqueIterable).toBeIterable()
})

testProp(
  `unique returns an iterable containing at least one element for a non-empty iterable and only elements from the given iterable`,
  [nonEmptyIterableArb],
  ({ iterable, values }) => {
    const uniqueIterable = unique(iterable)

    const array = [...uniqueIterable]
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

testProp(
  `unique returns a deduplicated iterable based on the given iterable`,
  [iterableArb],
  ({ iterable, values }) => {
    const uniqueIterable = unique(iterable)

    const map = new Map(
      values
        .map((value, index) => [value, { value, index }] as const)
        .reverse(),
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)
    expect([...uniqueIterable]).toStrictEqual(expectedValues)
  },
)

test.skip(`uniqueAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 1, 2, 3]), uniqueAsync)).toMatchTypeOf<
    AsyncIterable<number>
  >()
})

testProp(
  `uniqueAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const uniqueIterable = uniqueAsync(iterable)

    await expect(uniqueIterable).toBeAsyncIterable()
  },
)

testProp(
  `uniqueAsync returns an async iterable containing at least one element for a non-empty async iterable and only elements from the given async iterable`,
  [nonEmptyAsyncIterableArb],
  async ({ iterable, values }) => {
    const uniqueIterable = uniqueAsync(iterable)

    const array = await reduceAsync(toArray(), uniqueIterable)
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

testProp(
  `uniqueAsync returns a deduplicated async iterable based on the given async iterable`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const uniqueIterable = uniqueAsync(iterable)

    const map = new Map(
      values
        .map((value, index) => [value, { value, index }] as const)
        .reverse(),
    )
    const expectedValues = [...map.values()]
      .sort((a, b) => a.index - b.index)
      .map(({ value }) => value)
    expect(await reduceAsync(toArray(), uniqueIterable)).toStrictEqual(
      expectedValues,
    )
  },
)

test.skip(`uniqueConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 1, 2, 3]), uniqueConcur)).toMatchTypeOf<
    ConcurIterable<number>
  >()
})

testProp(
  `uniqueConcur returns a pure concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const uniqueIterable = uniqueConcur(iterable)

    await expect(uniqueIterable).toBeConcurIterable()
  },
)

testProp(
  `uniqueConcur returns a deduplicated concur iterable based on the given concur iterable`,
  [nonEmptyConcurIterableArb],
  async ({ iterable, values }) => {
    const uniqueIterable = uniqueConcur(iterable)

    const array = await reduceConcur(toArray(), uniqueIterable)
    expect(values).toIncludeAllMembers(array)
    expect(array).toBeArrayOfSize(new Set(array).size)
  },
)
