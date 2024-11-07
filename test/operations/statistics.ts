import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { asyncCompareFnArb, getAsyncFnArb } from '../helpers/fast-check/fns.js'
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
} from '../helpers/fast-check/iterables.js'
import { test } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'
import {
  asAsync,
  asConcur,
  count,
  countAsync,
  countConcur,
  empty,
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
  mean,
  meanAsync,
  meanConcur,
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
} from '~/index.js'

test.skip(`count types are correct`, () => {
  expectTypeOf(count([1, 2, 3])).toMatchTypeOf<number>()
})

test.prop([iterableArb])(
  `count returns the number of values in the given iterable`,
  ({ iterable, values }) => {
    const numberOfValues = count(iterable)

    expect(numberOfValues).toBe(values.length)
  },
)

test.skip(`countAsync types are correct`, () => {
  expectTypeOf(countAsync(asAsync([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

test.prop([asyncIterableArb])(
  `countAsync returns the number of values in the given async iterable`,
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

test.prop([concurIterableArb])(
  `countConcur returns the number of values in the given concur iterable`,
  async ({ iterable, values }) => {
    const numberOfValues = await countConcur(iterable)

    expect(numberOfValues).toBe(values.length)
  },
)

test.prop([concurIterableArb])(
  `countConcur is as concurrent as the given concur iterable`,
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

test.prop([fc.compareFunc(), iterableArb])(
  `minBy returns a pure iterable`,
  (fn, { iterable }) => {
    const minimum = minBy(fn, iterable)

    expect(minimum).toBeIterable()
  },
)

test.prop([fc.compareFunc()])(
  `minBy returns an empty iterable for an empty iterable`,
  fn => {
    const minimum = minBy(fn, [])

    expect([...minimum]).toBeEmpty()
  },
)

test.prop([
  fc.compareFunc(),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minBy returns the minimum element based on the comparison function for a non-empty iterable`,
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

test.prop([asyncCompareFnArb, asyncIterableArb])(
  `minByAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimum = minByAsync(asyncFn, iterable)

    await expect(minimum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `minByAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const minimum = minByAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), minimum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minByAsync returns the minimum element based on the comparison function for a non-empty async iterable`,
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

test.prop([asyncCompareFnArb, concurIterableArb])(
  `minByConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimum = minByConcur(asyncFn, iterable)

    await expect(minimum).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `minByConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const minimum = minByConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), minimum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minByConcur returns the minimum element based on the comparison function for a non-empty concur iterable`,
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

test.prop([fc.compareFunc(), iterableArb])(
  `maxBy returns a pure iterable`,
  (fn, { iterable }) => {
    const maximum = maxBy(fn, iterable)

    expect(maximum).toBeIterable()
  },
)

test.prop([fc.compareFunc()])(
  `maxBy returns an empty iterable for an empty iterable`,
  fn => {
    const maximum = maxBy(fn, [])

    expect([...maximum]).toBeEmpty()
  },
)

test.prop([
  fc.compareFunc(),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxBy returns the maximum element based on the comparison function for a non-empty iterable`,
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

test.prop([asyncCompareFnArb, asyncIterableArb])(
  `maxByAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxByAsync(asyncFn, iterable)

    await expect(maximum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `maxByAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const maximum = maxByAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), maximum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxByAsync returns the maximum element based on the comparison function for a non-empty async iterable`,
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

test.prop([asyncCompareFnArb, concurIterableArb])(
  `maxByConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxByConcur(asyncFn, iterable)

    await expect(maximum).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `maxByConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const maximum = maxByConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), maximum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxByConcur returns the maximum element based on the comparison function for a non-empty concur iterable`,
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

test.prop([fc.compareFunc(), iterableArb])(
  `minMaxBy returns a pure iterable`,
  (fn, { iterable }) => {
    const minimumMaximum = minMaxBy(fn, iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

test.prop([fc.compareFunc()])(
  `minMaxBy returns an empty iterable for an empty iterable`,
  fn => {
    const minimumMaximum = minMaxBy(fn, [])

    expect([...minimumMaximum]).toBeEmpty()
  },
)

test.prop([
  fc.compareFunc(),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxBy returns the minimum and maximum elements based on the comparison function for a non-empty iterable`,
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

test.prop([asyncCompareFnArb, asyncIterableArb])(
  `minMaxByAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxByAsync(asyncFn, iterable)

    await expect(minimumMaximum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `minMaxByAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxByAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), minimumMaximum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxByAsync returns the minimum and maximum elements based on the comparison function for a non-empty async iterable`,
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

test.prop([asyncCompareFnArb, concurIterableArb])(
  `minMaxByConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxByConcur(asyncFn, iterable)

    await expect(minimumMaximum).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncCompareFnArb])(
  `minMaxByConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxByConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), minimumMaximum)).resolves.toBeEmpty()
  },
)

test.prop([
  asyncCompareFnArb,
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxByConcur returns the minimum and maximum elements based on the comparison function for a non-empty concur iterable`,
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

test.prop([fc.func(fc.integer()), iterableArb])(
  `minWith returns a pure iterable`,
  (fn, { iterable }) => {
    const minimum = minWith(fn, iterable)

    expect(minimum).toBeIterable()
  },
)

test.prop([fc.func(fc.integer())])(
  `minWith returns an empty iterable for an empty iterable`,
  fn => {
    const minimum = minWith(fn, [])

    expect([...minimum]).toBeEmpty()
  },
)

test.prop([
  fc.func(fc.integer()),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minWith returns the minimum element based on the selector function for a non-empty iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), asyncIterableArb])(
  `minWithAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimum = minWithAsync(asyncFn, iterable)

    await expect(minimum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `minWithAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const minimum = minWithAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), minimum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minWithAsync returns the minimum element based on the selector function for a non-empty async iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), concurIterableArb])(
  `minWithConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimum = minWithConcur(asyncFn, iterable)

    await expect(minimum).toBeConcurIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `minWithConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const minimum = minWithConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), minimum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minWithConcur returns the minimum element based on the selector function for a non-empty concur iterable`,
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

test.prop([fc.func(fc.integer()), iterableArb])(
  `maxWith returns a pure iterable`,
  (fn, { iterable }) => {
    const maximum = maxWith(fn, iterable)

    expect(maximum).toBeIterable()
  },
)

test.prop([fc.func(fc.integer())])(
  `maxWith returns an empty iterable for an empty iterable`,
  fn => {
    const maximum = maxWith(fn, [])

    expect([...maximum]).toBeEmpty()
  },
)

test.prop([
  fc.func(fc.integer()),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxWith returns the maximum element based on the selector function for a non-empty iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), asyncIterableArb])(
  `maxWithAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxWithAsync(asyncFn, iterable)

    await expect(maximum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `maxWithAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const maximum = maxWithAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), maximum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxWithAsync returns the maximum element based on the selector function for a non-empty async iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), concurIterableArb])(
  `maxWithConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const maximum = maxWithConcur(asyncFn, iterable)

    await expect(maximum).toBeConcurIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `maxWithConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const maximum = maxWithConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), maximum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `maxWithConcur returns the maximum element based on the selector function for a non-empty concur iterable`,
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

test.prop([fc.func(fc.integer()), iterableArb])(
  `minMaxWith returns a pure iterable`,
  (fn, { iterable }) => {
    const minimumMaximum = minMaxWith(fn, iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

test.prop([fc.func(fc.integer())])(
  `minMaxWith returns an empty iterable for an empty iterable`,
  fn => {
    const minimumMaximum = minMaxWith(fn, [])

    expect([...minimumMaximum]).toBeEmpty()
  },
)

test.prop([
  fc.func(fc.integer()),
  nonEmptyIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxWith returns the minimum and maximum elements based on the selector function for a non-empty iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), asyncIterableArb])(
  `minMaxWithAsync returns an async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxWithAsync(asyncFn, iterable)

    await expect(minimumMaximum).toBeAsyncIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `minMaxWithAsync returns an empty async iterable for an empty async iterable`,
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxWithAsync(asyncFn, emptyAsync)

    await expect(reduceAsync(toArray(), minimumMaximum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyAsyncIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxWithAsync returns the minimum and maximum elements based on the selector function for a non-empty async iterable`,
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

test.prop([getAsyncFnArb(fc.integer()), concurIterableArb])(
  `minMaxWithConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const minimumMaximum = minMaxWithConcur(asyncFn, iterable)

    await expect(minimumMaximum).toBeConcurIterable({ pure: false })
  },
)

test.prop([getAsyncFnArb(fc.integer())])(
  `minMaxWithConcur returns an empty concur iterable for an empty concur iterable`,
  async ({ asyncFn }) => {
    const minimumMaximum = minMaxWithConcur(asyncFn, emptyConcur)

    await expect(reduceConcur(toArray(), minimumMaximum)).resolves.toBeEmpty()
  },
)

test.prop([
  getAsyncFnArb(fc.integer()),
  nonEmptyConcurIterableArb.filter(({ values }) => !values.includes(undefined)),
])(
  `minMaxWithConcur returns the minimum and maximum elements based on the selector function for a non-empty concur iterable`,
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

test.prop([getIterableArb(fc.integer())])(
  `min returns a pure iterable`,
  ({ iterable }) => {
    const minimum = min(iterable)

    expect(minimum).toBeIterable()
  },
)

test(`min returns an empty iterable for an empty iterable`, () => {
  const minimum = min([])

  expect([...minimum]).toBeEmpty()
})

test.prop([getIterableArb(fc.integer(), { minLength: 1 })])(
  `min returns the minimum element based on the selector function for a non-empty iterable`,
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

test.prop([getAsyncIterableArb(fc.integer())])(
  `minAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const minimum = minAsync(iterable)

    await expect(minimum).toBeAsyncIterable()
  },
)

test(`minAsync returns an empty async iterable for an empty async iterable`, async () => {
  // eslint-disable-next-line typescript/no-unsafe-argument
  const minimum = minAsync(emptyAsync)

  await expect(reduceAsync(toArray(), minimum)).resolves.toBeEmpty()
})

test.prop([getAsyncIterableArb(fc.integer(), { minLength: 1 })])(
  `minAsync returns the minimum element for a non-empty async iterable`,
  async ({ iterable, values }) => {
    const minimum = minAsync(iterable)

    await expect(getAsync(minimum)).resolves.toBe(Math.min(...values))
  },
)

test.skip(`minConcur types are correct`, () => {
  expectTypeOf(getConcur(minConcur(asConcur([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

test.prop([getConcurIterableArb(fc.integer())])(
  `minConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const minimum = minConcur(iterable)

    await expect(minimum).toBeConcurIterable()
  },
)

test(`minConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const minimum = minConcur(emptyConcur)

  await expect(reduceConcur(toArray(), minimum)).resolves.toBeEmpty()
})

test.prop([getConcurIterableArb(fc.integer(), { minLength: 1 })])(
  `minConcur returns the minimum element for a non-empty concur iterable`,
  async ({ iterable, values }) => {
    const minimum = minConcur(iterable)

    await expect(getConcur(minimum)).resolves.toBe(Math.min(...values))
  },
)

test.skip(`max types are correct`, () => {
  expectTypeOf(get(max([1, 2, 3]))).toMatchTypeOf<number>()
})

test.prop([getIterableArb(fc.integer())])(
  `max returns a pure iterable`,
  ({ iterable }) => {
    const maximum = max(iterable)

    expect(maximum).toBeIterable()
  },
)

test(`max returns an empty iterable for an empty iterable`, () => {
  const maximum = max([])

  expect([...maximum]).toBeEmpty()
})

test.prop([getIterableArb(fc.integer(), { minLength: 1 })])(
  `max returns the maximum element for a non-empty iterable`,
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

test.prop([getAsyncIterableArb(fc.integer())])(
  `maxAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const maximum = maxAsync(iterable)

    await expect(maximum).toBeAsyncIterable()
  },
)

test(`maxAsync returns an empty async iterable for an empty async iterable`, async () => {
  // eslint-disable-next-line typescript/no-unsafe-argument
  const maximum = maxAsync(emptyAsync)

  await expect(reduceAsync(toArray(), maximum)).resolves.toBeEmpty()
})

test.prop([getAsyncIterableArb(fc.integer(), { minLength: 1 })])(
  `maxAsync returns the maximum element for a non-empty async iterable`,
  async ({ iterable, values }) => {
    const maximum = maxAsync(iterable)

    await expect(getAsync(maximum)).resolves.toBe(Math.max(...values))
  },
)

test.skip(`maxConcur types are correct`, () => {
  expectTypeOf(getConcur(maxConcur(asConcur([1, 2, 3])))).toMatchTypeOf<
    Promise<number>
  >()
})

test.prop([getConcurIterableArb(fc.integer())])(
  `maxConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const maximum = maxConcur(iterable)

    await expect(maximum).toBeConcurIterable()
  },
)

test(`maxConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const maximum = maxConcur(emptyConcur)

  await expect(reduceConcur(toArray(), maximum)).resolves.toBeEmpty()
})

test.prop([getConcurIterableArb(fc.integer(), { minLength: 1 })])(
  `maxConcur returns the maximum element for a non-empty concur iterable`,
  async ({ iterable, values }) => {
    const maximum = maxConcur(iterable)

    await expect(getConcur(maximum)).resolves.toBe(Math.max(...values))
  },
)

test.skip(`minMax types are correct`, () => {
  expectTypeOf(get(minMax([1, 2, 3]))).toMatchTypeOf<{
    min: number
    max: number
  }>()
})

test.prop([getIterableArb(fc.integer())])(
  `minMax returns a pure iterable`,
  ({ iterable }) => {
    const minimumMaximum = minMax(iterable)

    expect(minimumMaximum).toBeIterable()
  },
)

test(`minMax returns an empty iterable for an empty iterable`, () => {
  const minimumMaximum = minMax([])

  expect([...minimumMaximum]).toBeEmpty()
})

test.prop([getIterableArb(fc.integer(), { minLength: 1 })])(
  `minMax returns the minimum and maximum elements for a non-empty iterable`,
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

test.prop([getAsyncIterableArb(fc.integer())])(
  `minMaxAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const minimumMaximum = minMaxAsync(iterable)

    await expect(minimumMaximum).toBeAsyncIterable()
  },
)

test(`minMaxAsync returns an empty async iterable for an empty async iterable`, async () => {
  // eslint-disable-next-line typescript/no-unsafe-argument
  const minimumMaximum = minMaxAsync(emptyAsync)

  await expect(reduceAsync(toArray(), minimumMaximum)).resolves.toBeEmpty()
})

test.prop([getAsyncIterableArb(fc.integer(), { minLength: 1 })])(
  `minMaxAsync returns the minimum and maximum elements for a non-empty async iterable`,
  async ({ iterable }) => {
    const minimumMaximum = minMaxAsync(iterable)

    await expect(getAsync(minimumMaximum)).resolves.toStrictEqual({
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

test.prop([getConcurIterableArb(fc.integer())])(
  `minMaxConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const minimumMaximum = minMaxConcur(iterable)

    await expect(minimumMaximum).toBeConcurIterable()
  },
)

test(`minMaxConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const minimumMaximum = minMaxConcur(emptyConcur)

  await expect(reduceConcur(toArray(), minimumMaximum)).resolves.toBeEmpty()
})

test.prop([getConcurIterableArb(fc.integer(), { minLength: 1 })])(
  `minMaxConcur returns the minimum and maximum elements for a non-empty concur iterable`,
  async ({ iterable }) => {
    const minimumMaximum = minMaxConcur(iterable)

    await expect(getConcur(minimumMaximum)).resolves.toStrictEqual({
      min: await getConcur(minConcur(iterable)),
      max: await getConcur(maxConcur(iterable)),
    })
  },
)

test.skip(`sum types are correct`, () => {
  expectTypeOf(sum([1, 2, 3])).toMatchTypeOf<number>()
})

test.prop([getIterableArb(fc.double())])(
  `sum returns the sum of all numbers in the given iterable`,
  ({ iterable, values }) => {
    const iterableSum = sum(iterable)

    expect(iterableSum).toBe(values.reduce((a, b) => a + b, 0))
  },
)

test.skip(`sumAsync types are correct`, () => {
  expectTypeOf(sumAsync(asAsync([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

test.prop([getAsyncIterableArb(fc.double())])(
  `sumAsync returns the sum of all numbers in the given async iterable`,
  async ({ iterable, values }) => {
    const sum = await sumAsync(iterable)

    expect(sum).toBe(values.reduce((a, b) => a + b, 0))
  },
)

test.skip(`sumConcur types are correct`, () => {
  expectTypeOf(sumConcur(asConcur([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

test.prop([getConcurIterableArb(fc.double())])(
  `sumConcur returns the sum of all numbers in the given concur iterable`,
  async ({ iterable }, scheduler) => {
    const sum = await sumConcur(iterable)

    expect(sum).toBe(
      (await scheduler.report())
        .values()
        .reduce((a, b) => Number(a) + Number(b), 0),
    )
  },
)

test.skip(`mean types are correct`, () => {
  expectTypeOf(mean([1, 2, 3])).toMatchTypeOf<number>()
})

test(`mean returns NaN for an empty iterable`, () => {
  // eslint-disable-next-line typescript/no-unsafe-argument
  const iterableMean = mean(empty)

  expect(iterableMean).toBeNaN()
})

test.prop([getIterableArb(fc.double(), { minLength: 1 })])(
  `mean returns the mean of all numbers in the given iterable`,
  ({ iterable, values }) => {
    const iterableMean = mean(iterable)

    expect(iterableMean).toBe(values.reduce((a, b) => a + b, 0) / values.length)
  },
)

test.skip(`meanAsync types are correct`, () => {
  expectTypeOf(meanAsync(asAsync([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

test(`meanAsync returns NaN for an empty async iterable`, async () => {
  // eslint-disable-next-line typescript/no-unsafe-argument
  const mean = await meanAsync(emptyAsync)

  expect(mean).toBeNaN()
})

test.prop([getAsyncIterableArb(fc.double(), { minLength: 1 })])(
  `meanAsync returns the mean of all numbers in the given async iterable`,
  async ({ iterable, values }) => {
    const mean = await meanAsync(iterable)

    expect(mean).toBe(values.reduce((a, b) => a + b, 0) / values.length)
  },
)

test.skip(`meanConcur types are correct`, () => {
  expectTypeOf(meanConcur(asConcur([1, 2, 3]))).toMatchTypeOf<Promise<number>>()
})

test(`meanConcur returns NaN for an empty concur iterable`, async () => {
  const mean = await meanConcur(emptyConcur)

  expect(mean).toBeNaN()
})

test.prop([getConcurIterableArb(fc.double(), { minLength: 1 })])(
  `meanConcur returns the mean of all numbers in the given concur iterable`,
  async ({ iterable, values }, scheduler) => {
    const mean = await meanConcur(iterable)

    expect(mean).toBe(
      (await scheduler.report())
        .values()
        .reduce<number>((a, b) => Number(a) + Number(b), 0) / values.length,
    )
  },
)
