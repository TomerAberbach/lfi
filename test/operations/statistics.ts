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
import {
  asAsync,
  asConcur,
  count,
  countAsync,
  countConcur,
  emptyAsync,
  emptyConcur,
  get,
  getAsync,
  getConcur,
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
  pipe,
  reduceAsync,
  reduceConcur,
  sum,
  sumAsync,
  sumConcur,
  toArray,
} from '../../src/index.js'
import { asyncCompareFnArb, getAsyncFnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`count types are correct`, () => {
  expectTypeOf(count([1, 2, 3])).toMatchTypeOf<number>()
})

testProp(
  `count returns the number of values in the given iterable`,
  [iterableArb],
  ({ iterable, values }) => {
    const numberOfValues = count(iterable)

    expect(numberOfValues).toBe(values.length)
  },
)

test.skip(`countAsync types are correct`, () => {
  expectTypeOf(countAsync(asAsync([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

testProp(
  `countAsync returns the number of values in the given async iterable`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const numberOfValues = await countAsync(iterable)

    expect(numberOfValues).toBe(values.length)
  },
)

test.skip(`countConcur types are correct`, () => {
  expectTypeOf(countConcur(asConcur([1, 2, 3]))).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `countConcur returns the number of values in the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const numberOfValues = await countConcur(iterable)

    expect(numberOfValues).toBe(values.length)
  },
)

testProp(
  `countConcur is as concurrent as the given concur iterable`,
  [concurIterableArb],
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() => countConcur(iterable))

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

test.skip(`minBy types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      minBy((a, b) => a.localeCompare(b)),
      get,
    ),
  ).toMatchTypeOf<string>()
})

testProp(
  `minBy returns a pure iterable`,
  [fc.compareFunc(), iterableArb],
  (fn, { iterable }) => {
    const minimum = minBy(fn, iterable)

    expect(minimum).toBeIterable()
  },
)

testProp(
  `minBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc()],
  fn => {
    const minimum = minBy(fn, [])

    expect([...minimum]).toBeEmpty()
  },
)

testProp(
  `minBy returns the minimum element based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable, values }) => {
    const minimum = minBy(fn, iterable)

    expect(get(minimum)).toStrictEqual([...values].sort(fn)[0])
  },
)

test.skip(`minByAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minByAsync((a, b) => a.localeCompare(b)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minByAsync((a, b) => Promise.resolve(a.localeCompare(b))),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `minByAsync returns an async iterable`,
  [asyncCompareFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimum = minByAsync(asyncFn, iterable)

    await expect(minimum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `minByAsync returns an empty async iterable for an empty async iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const minimum = minByAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), minimum)).toBeEmpty()
  },
)

testProp(
  `minByAsync returns the minimum element based on the comparison function for a non-empty async iterable`,
  [
    asyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const minimum = minByAsync(asyncFn, iterable)

    expect(syncFn(await getAsync(minimum), [...values].sort(syncFn)[0])).toBe(0)
  },
)

test.skip(`minByConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minByConcur((a, b) => a.localeCompare(b)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minByConcur((a, b) => Promise.resolve(a.localeCompare(b))),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `minByConcur returns a concur iterable`,
  [asyncCompareFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimum = minByConcur(asyncFn, iterable)

    await expect(minimum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `minByConcur returns an empty concur iterable for an empty concur iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const minimum = minByConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), minimum)).toBeEmpty()
  },
)

testProp(
  `minByConcur returns the minimum element based on the comparison function for a non-empty concur iterable`,
  [
    asyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const minimum = minByConcur(asyncFn, iterable)

    expect(syncFn(await getConcur(minimum), [...values].sort(syncFn)[0])).toBe(
      0,
    )
  },
)

test.skip(`maxBy types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      maxBy((a, b) => a.localeCompare(b)),
      get,
    ),
  ).toMatchTypeOf<string>()
})

testProp(
  `maxBy returns a pure iterable`,
  [fc.compareFunc(), iterableArb],
  (fn, { iterable }) => {
    const maximum = maxBy(fn, iterable)

    expect(maximum).toBeIterable()
  },
)

testProp(
  `maxBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc()],
  fn => {
    const maximum = maxBy(fn, [])

    expect([...maximum]).toBeEmpty()
  },
)

testProp(
  `maxBy returns the maximum element based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable, values }) => {
    const maximum = maxBy(fn, iterable)

    expect(get(maximum)).toStrictEqual([...values].sort((a, b) => fn(b, a))[0])
  },
)

test.skip(`maxByAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      maxByAsync((a, b) => a.localeCompare(b)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      maxByAsync((a, b) => Promise.resolve(a.localeCompare(b))),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `maxByAsync returns an async iterable`,
  [asyncCompareFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxByAsync(asyncFn, iterable)

    await expect(maximum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `maxByAsync returns an empty async iterable for an empty async iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const maximum = maxByAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), maximum)).toBeEmpty()
  },
)

testProp(
  `maxByAsync returns the maximum element based on the comparison function for a non-empty async iterable`,
  [
    asyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const maximum = maxByAsync(asyncFn, iterable)

    expect(
      syncFn(
        await getAsync(maximum),
        [...values].sort((a, b) => syncFn(b, a))[0],
      ),
    ).toBe(0)
  },
)

test.skip(`maxByConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      maxByConcur((a, b) => a.localeCompare(b)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      maxByConcur((a, b) => Promise.resolve(a.localeCompare(b))),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `maxByConcur returns a concur iterable`,
  [asyncCompareFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxByConcur(asyncFn, iterable)

    await expect(maximum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `maxByConcur returns an empty concur iterable for an empty concur iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const maximum = maxByConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), maximum)).toBeEmpty()
  },
)

testProp(
  `maxByConcur returns the maximum element based on the comparison function for a non-empty concur iterable`,
  [
    asyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const maximum = maxByConcur(asyncFn, iterable)

    expect(
      syncFn(
        await getConcur(maximum),
        [...values].sort((a, b) => syncFn(b, a))[0],
      ),
    ).toBe(0)
  },
)

test.skip(`minMaxBy types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      minMaxBy((a, b) => a.localeCompare(b)),
      get,
    ),
  ).toMatchTypeOf<{ min: string; max: string }>()
})

testProp(
  `minMaxBy returns a pure iterable`,
  [fc.compareFunc(), iterableArb],
  (fn, { iterable }) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

testProp(
  `minMaxBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc()],
  fn => {
    const minimumMaximum = minMaxBy(fn, [])

    expect([...minimumMaximum]).toBeEmpty()
  },
)

testProp(
  `minMaxBy returns the minimum and maximum elements based on the comparison function for a non-empty iterable`,
  [
    fc.compareFunc(),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable }) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    expect(get(minimumMaximum)).toStrictEqual({
      min: get(minBy(fn, iterable)),
      max: get(maxBy(fn, iterable)),
    })
  },
)

test.skip(`minMaxByAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minMaxByAsync((a, b) => a.localeCompare(b)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minMaxByAsync((a, b) => Promise.resolve(a.localeCompare(b))),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
})

testProp(
  `minMaxByAsync returns an async iterable`,
  [asyncCompareFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxByAsync(asyncFn, iterable)

    await expect(minimumMaximum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `minMaxByAsync returns an empty async iterable for an empty async iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxByAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), minimumMaximum)).toBeEmpty()
  },
)

testProp(
  `minMaxByAsync returns the minimum and maximum elements based on the comparison function for a non-empty async iterable`,
  [
    asyncCompareFnArb,
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const minimumMaximum = await getAsync(minMaxByAsync(asyncFn, iterable))

    expect(
      syncFn(minimumMaximum.min, await getAsync(minByAsync(asyncFn, iterable))),
    ).toBe(0)
    expect(
      syncFn(minimumMaximum.max, await getAsync(maxByAsync(asyncFn, iterable))),
    ).toBe(0)
  },
)

test.skip(`minMaxByConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minMaxByConcur((a, b) => a.localeCompare(b)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minMaxByConcur((a, b) => Promise.resolve(a.localeCompare(b))),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
})

testProp(
  `minMaxByConcur returns a concur iterable`,
  [asyncCompareFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxByConcur(asyncFn, iterable)

    await expect(minimumMaximum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `minMaxByConcur returns an empty concur iterable for an empty concur iterable`,
  [asyncCompareFnArb],
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxByConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), minimumMaximum)).toBeEmpty()
  },
)

testProp(
  `minMaxByConcur returns the minimum and maximum elements based on the comparison function for a non-empty concur iterable`,
  [
    asyncCompareFnArb,
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const minimumMaximum = await getConcur(minMaxByConcur(asyncFn, iterable))

    expect(
      syncFn(
        minimumMaximum.min,
        await getConcur(minByConcur(asyncFn, iterable)),
      ),
    ).toBe(0)
    expect(
      syncFn(
        minimumMaximum.max,
        await getConcur(maxByConcur(asyncFn, iterable)),
      ),
    ).toBe(0)
  },
)

test.skip(`minWith types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      minWith(s => s.length),
      get,
    ),
  ).toMatchTypeOf<string>()
})

testProp(
  `minWith returns a pure iterable`,
  [fc.func(fc.integer()), iterableArb],
  (fn, { iterable }) => {
    const minimum = minWith(fn, iterable)

    expect(minimum).toBeIterable()
  },
)

testProp(
  `minWith returns an empty iterable for an empty iterable`,
  [fc.func(fc.integer())],
  fn => {
    const minimum = minWith(fn, [])

    expect([...minimum]).toBeEmpty()
  },
)

testProp(
  `minWith returns the minimum element based on the selector function for a non-empty iterable`,
  [
    fc.func(fc.integer()),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable, values }) => {
    const minimum = minWith(fn, iterable)

    expect(get(minimum)).toStrictEqual(
      [...values].sort((a, b) => fn(a) - fn(b))[0],
    )
  },
)

test.skip(`minWithAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minWithAsync(s => s.length),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minWithAsync(s => Promise.resolve(s.length)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `minWithAsync returns an async iterable`,
  [getAsyncFnArb(fc.integer()), asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimum = minWithAsync(asyncFn, iterable)

    await expect(minimum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `minWithAsync returns an empty async iterable for an empty async iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const minimum = minWithAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), minimum)).toBeEmpty()
  },
)

testProp(
  `minWithAsync returns the minimum element based on the selector function for a non-empty async iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const minimum = minWithAsync(asyncFn, iterable)

    expect(syncFn(await getAsync(minimum))).toBe(
      syncFn([...values].sort((a, b) => syncFn(a) - syncFn(b))[0]),
    )
  },
)

test.skip(`minWithConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minWithConcur(s => s.length),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minWithConcur(s => Promise.resolve(s.length)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `minWithConcur returns a concur iterable`,
  [getAsyncFnArb(fc.integer()), concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimum = minWithConcur(asyncFn, iterable)

    await expect(minimum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `minWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const minimum = minWithConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), minimum)).toBeEmpty()
  },
)

testProp(
  `minWithConcur returns the minimum element based on the selector function for a non-empty concur iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const minimum = minWithConcur(asyncFn, iterable)

    expect(syncFn(await getConcur(minimum))).toBe(
      syncFn([...values].sort((a, b) => syncFn(a) - syncFn(b))[0]),
    )
  },
)

test.skip(`maxWith types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      maxWith(s => s.length),
      get,
    ),
  ).toMatchTypeOf<string>()
})

testProp(
  `maxWith returns a pure iterable`,
  [fc.func(fc.integer()), iterableArb],
  (fn, { iterable }) => {
    const maximum = maxWith(fn, iterable)

    expect(maximum).toBeIterable()
  },
)

testProp(
  `maxWith returns an empty iterable for an empty iterable`,
  [fc.func(fc.integer())],
  fn => {
    const maximum = maxWith(fn, [])

    expect([...maximum]).toBeEmpty()
  },
)

testProp(
  `maxWith returns the maximum element based on the selector function for a non-empty iterable`,
  [
    fc.func(fc.integer()),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable, values }) => {
    const maximum = maxWith(fn, iterable)

    expect(get(maximum)).toStrictEqual(
      [...values].sort((a, b) => fn(b) - fn(a))[0],
    )
  },
)

test.skip(`maxWithAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      maxWithAsync(s => s.length),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      maxWithAsync(s => Promise.resolve(s.length)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `maxWithAsync returns an async iterable`,
  [getAsyncFnArb(fc.integer()), asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxWithAsync(asyncFn, iterable)

    await expect(maximum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `maxWithAsync returns an empty async iterable for an empty async iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const maximum = maxWithAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), maximum)).toBeEmpty()
  },
)

testProp(
  `maxWithAsync returns the maximum element based on the selector function for a non-empty async iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const maximum = maxWithAsync(asyncFn, iterable)

    expect(syncFn(await getAsync(maximum))).toBe(
      syncFn([...values].sort((a, b) => syncFn(b) - syncFn(a))[0]),
    )
  },
)

test.skip(`maxWithConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      maxWithConcur(s => s.length),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      maxWithConcur(s => Promise.resolve(s.length)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<string>>()
})

testProp(
  `maxWithConcur returns a concur iterable`,
  [getAsyncFnArb(fc.integer()), concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxWithConcur(asyncFn, iterable)

    await expect(maximum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `maxWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const maximum = maxWithConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), maximum)).toBeEmpty()
  },
)

testProp(
  `maxWithConcur returns the maximum element based on the selector function for a non-empty concur iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const maximum = maxWithConcur(asyncFn, iterable)

    expect(syncFn(await getConcur(maximum))).toBe(
      syncFn([...values].sort((a, b) => syncFn(b) - syncFn(a))[0]),
    )
  },
)

test.skip(`minMaxWith types are correct`, () => {
  expectTypeOf(
    pipe(
      [`a`, `b`, `c`],
      minMaxWith(s => s.length),
      get,
    ),
  ).toMatchTypeOf<{ min: string; max: string }>()
})

testProp(
  `minMaxWith returns a pure iterable`,
  [fc.func(fc.integer()), iterableArb],
  (fn, { iterable }) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

testProp(
  `minMaxWith returns an empty iterable for an empty iterable`,
  [fc.func(fc.integer())],
  fn => {
    const minimumMaximum = minMaxWith(fn, [])

    expect([...minimumMaximum]).toBeEmpty()
  },
)

testProp(
  `minMaxWith returns the minimum and maximum elements based on the selector function for a non-empty iterable`,
  [
    fc.func(fc.integer()),
    nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
  ],
  (fn, { iterable }) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    expect(get(minimumMaximum)).toStrictEqual({
      min: get(minWith(fn, iterable)),
      max: get(maxWith(fn, iterable)),
    })
  },
)

test.skip(`minMaxWithAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minMaxWithAsync(s => s.length),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
  expectTypeOf(
    pipe(
      asAsync([`a`, `b`, `c`]),
      minMaxWithAsync(s => Promise.resolve(s.length)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
})

testProp(
  `minMaxWithAsync returns an async iterable`,
  [getAsyncFnArb(fc.integer()), asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxWithAsync(asyncFn, iterable)

    await expect(minimumMaximum).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `minMaxWithAsync returns an empty async iterable for an empty async iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxWithAsync(asyncFn, emptyAsync)

    expect(await reduceAsync(toArray(), minimumMaximum)).toBeEmpty()
  },
)

testProp(
  `minMaxWithAsync returns the minimum and maximum elements based on the selector function for a non-empty async iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyAsyncIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const minimumMaximum = await getAsync(minMaxWithAsync(asyncFn, iterable))

    expect(syncFn(minimumMaximum.min)).toBe(
      syncFn(await getAsync(minWithAsync(syncFn, iterable))),
    )
    expect(syncFn(minimumMaximum.max)).toBe(
      syncFn(await getAsync(maxWithAsync(syncFn, iterable))),
    )
  },
)

test.skip(`minMaxWithConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minMaxWithConcur(s => s.length),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
  expectTypeOf(
    pipe(
      asConcur([`a`, `b`, `c`]),
      minMaxWithConcur(s => Promise.resolve(s.length)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<{ min: string; max: string }>>()
})

testProp(
  `minMaxWithConcur returns a concur iterable`,
  [getAsyncFnArb(fc.integer()), concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxWithConcur(asyncFn, iterable)

    await expect(minimumMaximum).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `minMaxWithConcur returns an empty concur iterable for an empty concur iterable`,
  [getAsyncFnArb(fc.integer())],
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxWithConcur(asyncFn, emptyConcur)

    expect(await reduceConcur(toArray(), minimumMaximum)).toBeEmpty()
  },
)

testProp(
  `minMaxWithConcur returns the minimum and maximum elements based on the selector function for a non-empty concur iterable`,
  [
    getAsyncFnArb(fc.integer()),
    nonEmptyConcurIterableArb.filter(
      ({ values }) => !values.includes(undefined),
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const minimumMaximum = await getConcur(minMaxWithConcur(asyncFn, iterable))

    expect(syncFn(minimumMaximum.min)).toBe(
      syncFn(await getConcur(minWithConcur(syncFn, iterable))),
    )
    expect(syncFn(minimumMaximum.max)).toBe(
      syncFn(await getConcur(maxWithConcur(syncFn, iterable))),
    )
  },
)

test.skip(`min types are correct`, () => {
  expectTypeOf(get(min([1, 2, 3]))).toMatchTypeOf<number>()
})

testProp(
  `min returns a pure iterable`,
  [getIterableArb(fc.integer())],
  ({ iterable }) => {
    const minimum = min(iterable)

    expect(minimum).toBeIterable()
  },
)

test(`min returns an empty iterable for an empty iterable`, () => {
  const minimum = min([])

  expect([...minimum]).toBeEmpty()
})

testProp(
  `min returns the minimum element based on the selector function for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  ({ iterable, values }) => {
    const minimum = min(iterable)

    expect(get(minimum)).toBe(Math.min(...values))
  },
)

test.skip(`minAsync types are correct`, () => {
  expectTypeOf(getAsync(minAsync(asAsync([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `minAsync returns a pure async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async ({ iterable }) => {
    const minimum = minAsync(iterable)

    await expect(minimum).toBeAsyncIterable()
  },
)

test(`minAsync returns an empty async iterable for an empty async iterable`, async () => {
  const minimum = minAsync(emptyAsync)

  expect(await reduceAsync(toArray(), minimum)).toBeEmpty()
})

testProp(
  `minAsync returns the minimum element for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable, values }) => {
    const minimum = minAsync(iterable)

    expect(await getAsync(minimum)).toBe(Math.min(...values))
  },
)

test.skip(`minConcur types are correct`, () => {
  expectTypeOf(getConcur(minConcur(asConcur([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `minConcur returns a pure concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async ({ iterable }) => {
    const minimum = minConcur(iterable)

    await expect(minimum).toBeConcurIterable()
  },
)

test(`minConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const minimum = minConcur(emptyConcur)

  expect(await reduceConcur(toArray(), minimum)).toBeEmpty()
})

testProp(
  `minConcur returns the minimum element for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable, values }) => {
    const minimum = minConcur(iterable)

    expect(await getConcur(minimum)).toBe(Math.min(...values))
  },
)

test.skip(`max types are correct`, () => {
  expectTypeOf(get(max([1, 2, 3]))).toMatchTypeOf<number>()
})

testProp(
  `max returns a pure iterable`,
  [getIterableArb(fc.integer())],
  ({ iterable }) => {
    const maximum = max(iterable)

    expect(maximum).toBeIterable()
  },
)

test(`max returns an empty iterable for an empty iterable`, () => {
  const maximum = max([])

  expect([...maximum]).toBeEmpty()
})

testProp(
  `max returns the maximum element for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  ({ iterable, values }) => {
    const maximum = max(iterable)

    expect(get(maximum)).toBe(Math.max(...values))
  },
)

test.skip(`maxAsync types are correct`, () => {
  expectTypeOf(getAsync(maxAsync(asAsync([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `maxAsync returns a pure async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async ({ iterable }) => {
    const maximum = maxAsync(iterable)

    await expect(maximum).toBeAsyncIterable()
  },
)

test(`maxAsync returns an empty async iterable for an empty async iterable`, async () => {
  const maximum = maxAsync(emptyAsync)

  expect(await reduceAsync(toArray(), maximum)).toBeEmpty()
})

testProp(
  `maxAsync returns the maximum element for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable, values }) => {
    const maximum = maxAsync(iterable)

    expect(await getAsync(maximum)).toBe(Math.max(...values))
  },
)

test.skip(`maxConcur types are correct`, () => {
  expectTypeOf(getConcur(maxConcur(asConcur([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `maxConcur returns a pure concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async ({ iterable }) => {
    const maximum = maxConcur(iterable)

    await expect(maximum).toBeConcurIterable()
  },
)

test(`maxConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const maximum = maxConcur(emptyConcur)

  expect(await reduceConcur(toArray(), maximum)).toBeEmpty()
})

testProp(
  `maxConcur returns the maximum element for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable, values }) => {
    const maximum = maxConcur(iterable)

    expect(await getConcur(maximum)).toBe(Math.max(...values))
  },
)

test.skip(`minMax types are correct`, () => {
  expectTypeOf(get(minMax([1, 2, 3]))).toMatchTypeOf<{
    min: number
    max: number
  }>()
})

testProp(
  `minMax returns a pure iterable`,
  [getIterableArb(fc.integer())],
  ({ iterable }) => {
    const minimumMaximum = minMax(iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

test(`minMax returns an empty iterable for an empty iterable`, () => {
  const minimumMaximum = minMax([])

  expect([...minimumMaximum]).toBeEmpty()
})

testProp(
  `minMax returns the minimum and maximum elements for a non-empty iterable`,
  [getIterableArb(fc.integer(), { minLength: 1 })],
  ({ iterable }) => {
    const minimumMaximum = minMax(iterable)

    expect(get(minimumMaximum)).toStrictEqual({
      min: get(min(iterable)),
      max: get(max(iterable)),
    })
  },
)

test.skip(`minMaxAsync types are correct`, () => {
  expectTypeOf(getAsync(minMaxAsync(asAsync([1, 2, 3])))).toMatchTypeOf<
    Promise<{
      min: number
      max: number
    }>
  >()
})

testProp(
  `minMaxAsync returns a pure async iterable`,
  [getAsyncIterableArb(fc.integer())],
  async ({ iterable }) => {
    const minimumMaximum = minMaxAsync(iterable)

    await expect(minimumMaximum).toBeAsyncIterable()
  },
)

test(`minMaxAsync returns an empty async iterable for an empty async iterable`, async () => {
  const minimumMaximum = minMaxAsync(emptyAsync)

  expect(await reduceAsync(toArray(), minimumMaximum)).toBeEmpty()
})

testProp(
  `minMaxAsync returns the minimum and maximum elements for a non-empty async iterable`,
  [getAsyncIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable }) => {
    const minimumMaximum = minMaxAsync(iterable)

    expect(await getAsync(minimumMaximum)).toStrictEqual({
      min: await getAsync(minAsync(iterable)),
      max: await getAsync(maxAsync(iterable)),
    })
  },
)

test.skip(`minMaxConcur types are correct`, () => {
  expectTypeOf(getConcur(minMaxConcur(asConcur([1, 2, 3])))).toMatchTypeOf<
    Promise<{
      min: number
      max: number
    }>
  >()
})

testProp(
  `minMaxConcur returns a pure concur iterable`,
  [getConcurIterableArb(fc.integer())],
  async ({ iterable }) => {
    const minimumMaximum = minMaxConcur(iterable)

    await expect(minimumMaximum).toBeConcurIterable()
  },
)

test(`minMaxConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const minimumMaximum = minMaxConcur(emptyConcur)

  expect(await reduceConcur(toArray(), minimumMaximum)).toBeEmpty()
})

testProp(
  `minMaxConcur returns the minimum and maximum elements for a non-empty concur iterable`,
  [getConcurIterableArb(fc.integer(), { minLength: 1 })],
  async ({ iterable }) => {
    const minimumMaximum = minMaxConcur(iterable)

    expect(await getConcur(minimumMaximum)).toStrictEqual({
      min: await getConcur(minConcur(iterable)),
      max: await getConcur(maxConcur(iterable)),
    })
  },
)

test.skip(`sum types are correct`, () => {
  expectTypeOf(sum([1, 2, 3])).toMatchTypeOf<number>()
})

testProp(
  `sum returns the sum of all numbers in the given iterable`,
  [getIterableArb(fc.double())],
  ({ iterable, values }) => {
    const iterableSum = sum(iterable)

    expect(iterableSum).toBe(values.reduce((a, b) => a + b, 0))
  },
)

test.skip(`sumAsync types are correct`, () => {
  expectTypeOf(sumAsync(asAsync([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

testProp(
  `sumAsync returns the sum of all numbers in the given async iterable`,
  [getAsyncIterableArb(fc.double())],
  async ({ iterable, values }) => {
    const sum = await sumAsync(iterable)

    expect(sum).toBe(values.reduce((a, b) => a + b, 0))
  },
)

test.skip(`sumConcur types are correct`, () => {
  expectTypeOf(sumConcur(asConcur([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

testProp(
  `sumConcur returns the sum of all numbers in the given concur iterable`,
  [getConcurIterableArb(fc.double())],
  async ({ iterable }, scheduler) => {
    const sum = await sumConcur(iterable)

    expect(sum).toBe(
      (await scheduler.report())
        .values()
        .reduce((a, b) => Number(a) + Number(b), 0),
    )
  },
)
