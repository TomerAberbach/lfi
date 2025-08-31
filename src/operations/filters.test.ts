import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import {
  asyncFnArb,
  asyncPredicateArb,
  fnArb,
  getAsyncFnArb,
  predicateArb,
} from '../../test/fast-check/fns.ts'
import {
  asyncIterableArb,
  concurIterableArb,
  getConcurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
  uniqueConcurIterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import { addTimings, timed } from '../../test/timings.ts'
import {
  asAsync,
  asConcur,
  concatConcur,
  consumeAsync,
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
  find,
  findAsync,
  findConcur,
  findLast,
  findLastAsync,
  findLastConcur,
  get,
  getAsync,
  getConcur,
  mapConcur,
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
} from '../index.js'
import type { ConcurIterable } from '../index.js'

test.skip(`filter types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      filter(n => n > 2),
    ),
  ).toExtend<Iterable<number>>()

  expectTypeOf(
    pipe(
      [1, 2, 3, null],
      filter((x): x is number => typeof x === `number`),
    ),
  ).toExtend<Iterable<number>>()
})

test.prop([predicateArb, iterableArb])(
  `filter returns a pure iterable`,
  (fn, { iterable }) => {
    const filteredIterable = filter(fn, iterable)

    expect(filteredIterable).toBeIterable()
  },
)

test.prop([predicateArb, iterableArb])(
  `filter returns an iterable containing the same values in the same order as the given iterable for which the given predicate returns a truthy value`,
  (fn, { iterable, values }) => {
    const filteredIterable = filter(fn, iterable)

    expect([...filteredIterable]).toStrictEqual(
      values.filter(value => fn(value)),
    )
  },
)

test.prop([iterableArb])(`filter is lazy`, ({ iterable, values }) => {
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
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3, null]),
      filterAsync((x): x is number => typeof x === `number`),
    ),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      filterAsync(n => Promise.resolve(n > 2)),
    ),
  ).toExtend<AsyncIterable<number>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `filterAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const filteredIterable = filterAsync(asyncFn, iterable)

    await expect(filteredIterable).toBeAsyncIterable()
  },
)

test.prop([asyncPredicateArb, asyncIterableArb])(
  `filterAsync returns an async iterable containing the same values in the same order as the given async iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filteredIterable = filterAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), filteredIterable)).toStrictEqual(
      values.filter(value => syncFn(value)),
    )
  },
)

test.prop([asyncIterableArb])(
  `filterAsync is lazy`,
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

test.prop([nonEmptyAsyncIterableArb])(
  `filterAsync rejects for a sync throwing function and non-empty async iterable`,
  async ({ iterable }) => {
    const filteredIterable = filterAsync(() => {
      throw new Error(`BOOM!`)
    }, iterable)

    await expect(consumeAsync(filteredIterable)).rejects.toStrictEqual(
      new Error(`BOOM!`),
    )
  },
)

test.prop([nonEmptyAsyncIterableArb])(
  `filterAsync rejects for an async throwing function and non-empty async iterable`,
  async ({ iterable }) => {
    const filteredIterable = filterAsync(
      () => Promise.reject(new Error(`BOOM!`)),
      iterable,
    )

    await expect(consumeAsync(filteredIterable)).rejects.toStrictEqual(
      new Error(`BOOM!`),
    )
  },
)

test.skip(`filterConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      filterConcur(n => n > 2),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, null]),
      filterConcur((x): x is number => typeof x === `number`),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      filterConcur(n => Promise.resolve(n > 2)),
    ),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `filterConcur returns a pure concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const filteredIterable = filterConcur(asyncFn, iterable)

    await expect(filteredIterable).toBeConcurIterable()
  },
)

test.prop([asyncPredicateArb, getConcurIterableArb(fc.integer())])(
  `filterConcur returns an concur iterable containing the same values in the same order as the given concur iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filteredIterable = filterConcur(asyncFn, iterable)

    expect(
      await reduceConcur(toArray(), filteredIterable),
    ).toIncludeSameMembers(values.filter(value => syncFn(value)))
  },
)

test.prop([concurIterableArb])(`filterConcur is lazy`, ({ iterable }) => {
  let count = 0
  filterConcur(() => {
    count++
    return true
  }, iterable)

  expect(count).toBe(0)
})

test.prop([asyncPredicateArb, uniqueConcurIterableArb])(
  `filterConcur returns a concur iterable as concurrent as the given predicate and concur iterable`,
  async ({ asyncFn, fnTimings }, { iterable }) => {
    const { elapsed } = await timed(() =>
      consumeConcur(filterConcur(asyncFn, iterable)),
    )

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)

test.prop([
  fc
    .tuple(nonEmptyConcurIterableArb, fc.nat())
    .map(
      ([concurIterable, throwIndex]) =>
        [concurIterable, throwIndex % concurIterable.values.length] as const,
    ),
])(
  `filterConcur rejects for a sync throwing function and non-empty concur iterable`,
  async ([{ iterable }, throwIndex]) => {
    let index = 0
    const filteredIterable = filterConcur(value => {
      if (index++ === throwIndex) {
        throw new Error(`BOOM!`)
      }
      return value
    }, iterable)

    await expect(consumeConcur(filteredIterable)).rejects.toStrictEqual(
      new Error(`BOOM!`),
    )
  },
)

test.prop([
  fc
    .tuple(nonEmptyConcurIterableArb, asyncPredicateArb, fc.nat())
    .map(
      ([concurIterable, predicate, throwIndex]) =>
        [
          concurIterable,
          predicate,
          throwIndex % concurIterable.values.length,
        ] as const,
    ),
])(
  `filterConcur rejects for an async throwing function and non-empty concur iterable`,
  async ([{ iterable }, { asyncFn }, throwIndex]) => {
    let index = 0
    const filteredIterable = filterConcur(async value => {
      const result = await asyncFn(value)
      return index++ === throwIndex
        ? Promise.reject(new Error(`BOOM!`))
        : result
    }, iterable)

    await expect(consumeConcur(filteredIterable)).rejects.toStrictEqual(
      new Error(`BOOM!`),
    )
  },
)

test.prop([concurIterableArb, asyncPredicateArb])(
  `filterConcur returns a concur iterable as concurrent as the given async predicate and concur iterable`,
  async ({ iterable }, { asyncFn, fnTimings }) => {
    const filteredIterable = filterConcur(asyncFn, iterable)

    const { elapsed } = await timed(() => consumeConcur(filteredIterable))

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)

test.skip(`filterMap types are correct`, () => {
  expectTypeOf(
    pipe(
      [{ n: 1 }, { n: 2 }, { m: 3 }],
      filterMap(o => o.n),
    ),
  ).toExtend<Iterable<number>>()
  expectTypeOf(filterMap(o => o.n, [{ n: 1 }, { n: 2 }, { m: 3 }])).toExtend<
    Iterable<number>
  >()

  expectTypeOf(
    pipe(
      [{ n: 1 }, { n: 2 }, { m: 3 }],
      filterMap(o => (o.n ? Array.from({ length: o.n }, () => 42) : null)),
    ),
  ).toExtend<Iterable<number[]>>()
  expectTypeOf(
    filterMap(
      o => (o.n ? Array.from({ length: o.n }, () => 42) : null),
      [{ n: 1 }, { n: 2 }, { m: 3 }],
    ),
  ).toExtend<Iterable<number[]>>()

  expectTypeOf(
    pipe(
      [{ n: 1 }, { n: 2 }, { m: 3 }],
      filterMap(o => (o.n ? [o.n, 1] : null)),
    ),
  ).toExtend<Iterable<[number, number]>>()
  expectTypeOf(
    filterMap(o => (o.n ? [o.n, 1] : null), [{ n: 1 }, { n: 2 }, { m: 3 }]),
  ).toExtend<Iterable<[number, number]>>()
})

test.prop([
  fc.func(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  iterableArb,
])(`filterMap returns a pure iterable`, (fn, { iterable }) => {
  const filterMappedIterable = filterMap(fn, iterable)

  expect(filterMappedIterable).toBeIterable()
})

test.prop([
  fc.func(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  iterableArb,
])(
  `filterMap returns an iterable containing the same values in the same order as the given iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
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
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    filterMapAsync(o => o.n, asAsync([{ n: 1 }, { n: 2 }, { m: 3 }])),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(async o => o.n),
    ),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    filterMapAsync(async o => o.n, asAsync([{ n: 1 }, { n: 2 }, { m: 3 }])),
  ).toExtend<AsyncIterable<number>>()

  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(o => (o.n ? Array.from({ length: o.n }, () => 42) : null)),
    ),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    filterMapAsync(
      o => (o.n ? Array.from({ length: o.n }, () => 42) : null),
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(async o =>
        o.n ? Array.from({ length: o.n }, () => 42) : null,
      ),
    ),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    filterMapAsync(
      async o => (o.n ? Array.from({ length: o.n }, () => 42) : null),
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<AsyncIterable<number[]>>()

  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(o => (o.n ? [o.n, 1] : null)),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    filterMapAsync(
      o => (o.n ? [o.n, 1] : null),
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    pipe(
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapAsync(async o => (o.n ? [o.n, 1] : null)),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    filterMapAsync(
      async o => (o.n ? [o.n, 1] : null),
      asAsync([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
})

test.prop([
  getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  asyncIterableArb,
])(
  `filterMapAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const filterMappedIterable = filterMapAsync(asyncFn, iterable)

    await expect(filterMappedIterable).toBeAsyncIterable()
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  asyncIterableArb,
])(
  `filterMapAsync returns an async iterable containing the same values in the same order as the given async iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
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
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    filterMapConcur(
      o => o.n,
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(async o => o.n),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    filterMapConcur(
      async o => o.n,
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<number>>()

  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(o =>
        o.n ? Array.from({ length: o.n }, () => 42) : null,
      ),
    ),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    filterMapConcur(
      o => (o.n ? Array.from({ length: o.n }, () => 42) : null),
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(async o =>
        o.n ? Array.from({ length: o.n }, () => 42) : null,
      ),
    ),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    filterMapConcur(
      async o => (o.n ? Array.from({ length: o.n }, () => 42) : null),
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<number[]>>()

  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(o => (o.n ? [o.n, 1] : null)),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    filterMapConcur(
      o => (o.n ? [o.n, 1] : null),
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    pipe(
      asConcur([{ n: 1 }, { n: 2 }, { m: 3 }]),
      filterMapConcur(async o => (o.n ? [o.n, 1] : null)),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    filterMapConcur(
      async o => (o.n ? [o.n, 1] : null),
      asConcur<{ n?: number; m?: number }>([{ n: 1 }, { n: 2 }, { m: 3 }]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
})

test.prop([
  getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  concurIterableArb,
])(
  `filterMapConcur returns a pure concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const filterMappedIterable = filterMapConcur(asyncFn, iterable)

    await expect(filterMappedIterable).toBeConcurIterable()
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  concurIterableArb,
])(
  `filterMapConcur returns a concur iterable containing the same values as the given concur iterable, but transformed using the given callback and excluding the values transformed to null or undefined`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const filterMappedIterable = filterMapConcur(asyncFn, iterable)

    expect(
      await reduceConcur(toArray(), filterMappedIterable),
    ).toIncludeSameMembers(
      values.map(value => syncFn(value)).filter(value => value != null),
    )
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(fc.anything(), fc.constantFrom(undefined, null))),
  concurIterableArb,
])(
  `filterMapConcur returns a concur iterable as concurrent as the given async function and concur iterable`,
  async ({ asyncFn, fnTimings }, { iterable }) => {
    const filterMappedIterable = filterMapConcur(asyncFn, iterable)

    const { elapsed } = await timed(() => consumeConcur(filterMappedIterable))

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)

test.skip(`exclude types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], exclude([1, 2]))).toExtend<Iterable<number>>()
  expectTypeOf(pipe([1, 2, 3], exclude([`a`, `b`]))).toExtend<
    Iterable<number>
  >()
})

test.prop([iterableArb, iterableArb])(
  `exclude returns a pure iterable`,
  ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = exclude(excludedIterable, iterable)

    expect(filteredIterable).toBeIterable()
  },
)

test.prop([iterableArb, iterableArb])(
  `exclude returns an iterable containing the same values in the same order as the latter given iterable, but excluding the former given iterable`,
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
  expectTypeOf(pipe(asAsync([1, 2, 3]), excludeAsync([1, 2]))).toExtend<
    AsyncIterable<number>
  >()
  expectTypeOf(pipe(asAsync([1, 2, 3]), excludeAsync([`a`, `b`]))).toExtend<
    AsyncIterable<number>
  >()
})

test.prop([iterableArb, asyncIterableArb])(
  `excludeAsync returns a pure async iterable`,
  async ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = excludeAsync(excludedIterable, iterable)

    await expect(filteredIterable).toBeAsyncIterable()
  },
)

test.prop([iterableArb, asyncIterableArb])(
  `excludeAsync returns an async iterable containing the same values in the same order as the given async iterable, but excluding the given iterable`,
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
  expectTypeOf(pipe(asConcur([1, 2, 3]), excludeConcur([1, 2]))).toExtend<
    ConcurIterable<number>
  >()
  expectTypeOf(pipe(asConcur([1, 2, 3]), excludeConcur([`a`, `b`]))).toExtend<
    ConcurIterable<number>
  >()
})

test.prop([iterableArb, concurIterableArb])(
  `excludeConcur returns a pure concur iterable`,
  async ({ iterable: excludedIterable }, { iterable }) => {
    const filteredIterable = excludeConcur(excludedIterable, iterable)

    await expect(filteredIterable).toBeConcurIterable()
  },
)

test.prop([iterableArb, concurIterableArb])(
  `excludeConcur returns an concur iterable containing the same values in the same order as the given concur iterable, but excluding the given iterable`,
  async (
    { iterable: excludedIterable, values: excludedValues },
    { iterable, getIterationOrder },
  ) => {
    const filteredIterable = excludeConcur(excludedIterable, iterable)

    expect(await reduceConcur(toArray(), filteredIterable)).toStrictEqual(
      getIterationOrder().filter(value => !excludedValues.includes(value)),
    )
  },
)

test.prop([iterableArb, concurIterableArb])(
  `excludeConcur returns a concur iterable as concurrent as the given concur iterable`,
  async ({ iterable: excludedIterable }, { iterable }) => {
    const { elapsed } = await timed(() =>
      consumeConcur(excludeConcur(excludedIterable, iterable)),
    )

    expect(elapsed).toBe(iterable.yieldTimings.max())
  },
)

test.skip(`uniqueBy types are correct`, () => {
  expectTypeOf(
    pipe(
      [-1, 1, 2, 3],
      uniqueBy(n => Math.abs(n)),
    ),
  ).toExtend<Iterable<number>>()
})

test.prop([fnArb, iterableArb])(
  `uniqueBy returns a pure iterable`,
  (fn, { iterable }) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    expect(uniqueIterable).toBeIterable()
  },
)

test.prop([fnArb, nonEmptyIterableArb])(
  `uniqueBy returns an iterable containing at least one element for a non-empty iterable and only elements from the given iterable`,
  (fn, { iterable, values }) => {
    const uniqueIterable = uniqueBy(fn, iterable)

    const array = [...uniqueIterable]
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

test.prop([fnArb, iterableArb])(
  `uniqueBy returns a deduplicated iterable based on the given function and iterable`,
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
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([-1, 1, 2, 3]),
      uniqueByAsync(n => Promise.resolve(Math.abs(n))),
    ),
  ).toExtend<AsyncIterable<number>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `uniqueByAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const uniqueIterable = uniqueByAsync(asyncFn, iterable)

    await expect(uniqueIterable).toBeAsyncIterable()
  },
)

test.prop([asyncFnArb, nonEmptyAsyncIterableArb])(
  `uniqueByAsync returns an async iterable containing at least one element for a non-empty async iterable and only elements from the given async iterable`,
  async ({ asyncFn }, { iterable, values }) => {
    const uniqueIterable = uniqueByAsync(asyncFn, iterable)

    const array = await reduceAsync(toArray(), uniqueIterable)
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

test.prop([asyncFnArb, asyncIterableArb])(
  `uniqueByAsync returns a deduplicated async iterable based on the given function and async iterable`,
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
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([-1, 1, 2, 3]),
      uniqueByConcur(n => Promise.resolve(Math.abs(n))),
    ),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `uniqueByConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const uniqueIterable = uniqueByConcur(asyncFn, iterable)

    await expect(uniqueIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncFnArb, nonEmptyConcurIterableArb])(
  `uniqueByConcur returns a deduplicated concur iterable based on the given function and concur iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const uniqueIterable = uniqueByConcur(asyncFn, iterable)

    const array = await reduceConcur(toArray(), uniqueIterable)
    expect(values).toIncludeAllMembers(array)
    expect(array).toBeArrayOfSize(
      new Set(array.map(value => syncFn(value))).size,
    )
  },
)

test.prop([asyncFnArb, nonEmptyConcurIterableArb])(
  `uniqueByConcur returns a concur iterable as concurrent as the the given async function and concur iterable`,
  async ({ asyncFn, fnTimings }, { iterable }) => {
    const uniqueIterable = uniqueByConcur(asyncFn, iterable)

    const { elapsed } = await timed(() => consumeConcur(uniqueIterable))

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)

test.skip(`unique types are correct`, () => {
  expectTypeOf(pipe([1, 1, 2, 3], unique)).toExtend<Iterable<number>>()
})

test.prop([iterableArb])(`unique returns a pure iterable`, ({ iterable }) => {
  const uniqueIterable = unique(iterable)

  expect(uniqueIterable).toBeIterable()
})

test.prop([nonEmptyIterableArb])(
  `unique returns an iterable containing at least one element for a non-empty iterable and only elements from the given iterable`,
  ({ iterable, values }) => {
    const uniqueIterable = unique(iterable)

    const array = [...uniqueIterable]
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

test.prop([iterableArb])(
  `unique returns a deduplicated iterable based on the given iterable`,
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
  expectTypeOf(pipe(asAsync([1, 1, 2, 3]), uniqueAsync)).toExtend<
    AsyncIterable<number>
  >()
})

test.prop([asyncIterableArb])(
  `uniqueAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const uniqueIterable = uniqueAsync(iterable)

    await expect(uniqueIterable).toBeAsyncIterable()
  },
)

test.prop([nonEmptyAsyncIterableArb])(
  `uniqueAsync returns an async iterable containing at least one element for a non-empty async iterable and only elements from the given async iterable`,
  async ({ iterable, values }) => {
    const uniqueIterable = uniqueAsync(iterable)

    const array = await reduceAsync(toArray(), uniqueIterable)
    expect(array.length).toBePositive()
    expect(values).toIncludeAllMembers(array)
  },
)

test.prop([asyncIterableArb])(
  `uniqueAsync returns a deduplicated async iterable based on the given async iterable`,
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
  expectTypeOf(pipe(asConcur([1, 1, 2, 3]), uniqueConcur)).toExtend<
    ConcurIterable<number>
  >()
})

test.prop([concurIterableArb])(
  `uniqueConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const uniqueIterable = uniqueConcur(iterable)

    await expect(uniqueIterable).toBeConcurIterable()
  },
)

test.prop([nonEmptyConcurIterableArb])(
  `uniqueConcur returns a deduplicated concur iterable based on the given concur iterable`,
  async ({ iterable, values }) => {
    const uniqueIterable = uniqueConcur(iterable)

    const array = await reduceConcur(toArray(), uniqueIterable)
    expect(values).toIncludeAllMembers(array)
    expect(array).toBeArrayOfSize(new Set(array).size)
  },
)

test.prop([nonEmptyConcurIterableArb])(
  `uniqueConcur returns a concur iterable as concurrent as the given concur iterable`,
  async ({ iterable }) => {
    const uniqueIterable = uniqueConcur(iterable)

    const { elapsed } = await timed(() => consumeConcur(uniqueIterable))

    expect(elapsed).toBe(iterable.yieldTimings.max())
  },
)

test.skip(`find types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      find(a => a > 1),
      get,
    ),
  ).toExtend<number>()
})

test.prop([predicateArb, iterableArb])(
  `find returns a pure iterable`,
  (fn, { iterable }) => {
    const found = find(fn, iterable)

    expect(found).toBeIterable()
  },
)

test.prop([predicateArb, iterableArb])(
  `find returns an optional corresponding to the first value in the given iterable for which the given predicate returns a truthy value`,
  (fn, { iterable, values }) => {
    const index = values.findIndex(value => fn(value))
    const expected = index === -1 ? [] : [values[index]]

    const found = find(fn, iterable)

    expect([...found]).toStrictEqual(expected)
  },
)

test.skip(`findAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findAsync(a => a > 1),
      getAsync,
    ),
  ).toExtend<Promise<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findAsync(a => Promise.resolve(a > 1)),
      getAsync,
    ),
  ).toExtend<Promise<number>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `findAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const found = findAsync(asyncFn, iterable)

    await expect(found).toBeAsyncIterable()
  },
)

test.prop([asyncPredicateArb, asyncIterableArb])(
  `findAsync returns an optional corresponding to the first value in the given async iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const index = values.findIndex(value => syncFn(value))
    const expected = index === -1 ? [] : [values[index]]

    const found = findAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), found)).toStrictEqual(expected)
  },
)

test.skip(`findConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findConcur(a => a > 1),
      getConcur,
    ),
  ).toExtend<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toExtend<Promise<number>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `findConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const found = findConcur(asyncFn, iterable)

    await expect(found).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncPredicateArb, concurIterableArb])(
  `findConcur returns an optional corresponding to the first value in the given concur iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const expected = values.filter(value => syncFn(value))

    const found = findConcur(asyncFn, iterable)

    const foundArray = await reduceConcur(toArray(), found)
    expect(Math.sign(foundArray.length)).toBe(Math.sign(expected.length))
    expect(expected).toIncludeAllMembers(foundArray)
  },
)

test.prop([
  fc
    .tuple(nonEmptyConcurIterableArb, predicateArb)
    .filter(
      ([{ values }, fn]) => values.filter(value => fn(value)).length === 1,
    ),
])(
  `findConcur rejects for a sync throwing function and non-empty concur iterable`,
  async ([{ iterable }, fn]) => {
    const found = findConcur(value => {
      if (fn(value)) {
        throw new Error(`BOOM!`)
      }
      return false
    }, iterable)

    await expect(consumeConcur(found)).rejects.toStrictEqual(new Error(`BOOM!`))
  },
)

test.prop([
  fc
    .tuple(nonEmptyConcurIterableArb, asyncPredicateArb)
    .filter(
      ([{ values }, { syncFn }]) =>
        values.filter(value => syncFn(value)).length === 1,
    ),
])(
  `findConcur rejects for an async throwing function and non-empty concur iterable`,
  async ([{ iterable }, { asyncFn }]) => {
    const found = findConcur(
      async value =>
        (await asyncFn(value)) ? Promise.reject(new Error(`BOOM!`)) : false,
      iterable,
    )

    await expect(consumeConcur(found)).rejects.toStrictEqual(new Error(`BOOM!`))
  },
)

test.prop([
  fc
    .tuple(asyncPredicateArb, nonEmptyConcurIterableArb)
    .filter(([{ syncFn }, { values }]) => values.some(value => syncFn(value))),
])(
  `findConcur ignores errors if predicate returns a truthy value for some value`,
  async ([{ asyncFn }, { iterable }], scheduler) => {
    const throwingIterable = concatConcur(iterable, async () => {
      await scheduler.schedule(Promise.resolve())
      throw new Error(`BOOM!`)
    })

    const found = findConcur(asyncFn, throwingIterable)

    const foundArray = await reduceConcur(toArray(), found)
    expect(foundArray).toHaveLength(1)
  },
)

test.prop([
  fc
    .tuple(asyncPredicateArb, nonEmptyConcurIterableArb)
    .filter(([{ syncFn }, { values }]) =>
      values.every(value => !syncFn(value)),
    ),
])(
  `findConcur rejects with the singular error if the predicate returns a falsy value for every value`,
  async ([{ asyncFn }, { iterable }], scheduler) => {
    const throwingIterable = concatConcur(iterable, async () => {
      await scheduler.schedule(Promise.resolve())
      throw new Error(`BOOM!`)
    })

    const found = findConcur(asyncFn, throwingIterable)

    await expect(consumeConcur(found)).rejects.toStrictEqual(new Error(`BOOM!`))
  },
)

test.prop([
  fc
    .tuple(asyncPredicateArb, asyncPredicateArb, nonEmptyConcurIterableArb)
    .filter(
      ([{ syncFn: predicateFn }, { syncFn: shouldThrow }, { values }]) =>
        values.every(value => !predicateFn(value)) &&
        values.filter(value => shouldThrow(value)).length >= 2,
    ),
])(
  `findConcur rejects with an aggregate error containing all errors if the predicate returns a falsy value for every value`,
  async (
    [{ asyncFn }, { syncFn, asyncFn: shouldThrow }, { iterable, values }],
    scheduler,
  ) => {
    const throwingIterable = mapConcur(async value => {
      await scheduler.schedule(Promise.resolve())
      if (await shouldThrow(value)) {
        throw new Error(`BOOM!`)
      } else {
        return value
      }
    }, iterable)

    const found = findConcur(asyncFn, throwingIterable)

    await expect(consumeConcur(found)).rejects.toStrictEqual(
      new AggregateError(
        values.filter(value => syncFn(value)).map(() => new Error(`BOOM!`)),
        `Concur iterable rejected`,
      ),
    )
  },
)

test.prop([asyncPredicateArb, concurIterableArb])(
  `findConcur returns a concur iterable as current as the given async function and concur iterable`,
  async ({ asyncFn, fnTimings }, { iterable }) => {
    const found = findConcur(asyncFn, iterable)

    const { elapsed } = await timed(() => consumeConcur(found))

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)

test.skip(`findLast types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      findLast(a => a > 1),
      get,
    ),
  ).toExtend<number>()
})

test.prop([predicateArb, iterableArb])(
  `findLast returns a pure iterable`,
  (fn, { iterable }) => {
    const found = findLast(fn, iterable)

    expect(found).toBeIterable()
  },
)

test.prop([predicateArb, iterableArb])(
  `findLast returns an optional corresponding to the last value in the given iterable for which the given predicate returns a truthy value`,
  (fn, { iterable, values }) => {
    const reversedValues = [...values].reverse()
    const index = reversedValues.findIndex(value => fn(value))
    const expected = index === -1 ? [] : [reversedValues[index]]

    const found = findLast(fn, iterable)

    expect([...found]).toStrictEqual(expected)
  },
)

test.skip(`findLastAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findLastAsync(a => a > 1),
      getAsync,
    ),
  ).toExtend<Promise<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findLastAsync(a => Promise.resolve(a > 1)),
      getAsync,
    ),
  ).toExtend<Promise<number>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `findLastAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const found = findLastAsync(asyncFn, iterable)

    await expect(found).toBeAsyncIterable()
  },
)

test.prop([asyncPredicateArb, asyncIterableArb])(
  `findLastAsync returns an optional corresponding to the last value in the given async iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const reversedValues = [...values].reverse()
    const index = reversedValues.findIndex(value => syncFn(value))
    const expected = index === -1 ? [] : [reversedValues[index]]

    const found = findLastAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), found)).toStrictEqual(expected)
  },
)

test.skip(`findLastConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findLastConcur(a => a > 1),
      getConcur,
    ),
  ).toExtend<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findLastConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toExtend<Promise<number>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `findLastConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const found = findLastConcur(asyncFn, iterable)

    await expect(found).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncPredicateArb, concurIterableArb])(
  `findLastConcur returns an optional corresponding to the last value in the given concur iterable for which the given predicate returns a truthy value`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const expected = values.filter(value => syncFn(value))

    const found = findLastConcur(asyncFn, iterable)

    const foundArray = await reduceConcur(toArray(), found)
    expect(Math.sign(foundArray.length)).toBe(Math.sign(expected.length))
    expect(expected).toIncludeAllMembers(foundArray)
  },
)

test.prop([asyncPredicateArb, concurIterableArb])(
  `findLastConcur returns a concur iterable as concurrent as the given async function and concur iterable`,
  async ({ asyncFn, fnTimings }, { iterable }) => {
    const found = findLastConcur(asyncFn, iterable)

    const { elapsed } = await timed(() => consumeConcur(found))

    expect(elapsed).toBe(addTimings(iterable.yieldTimings, fnTimings).max())
  },
)
