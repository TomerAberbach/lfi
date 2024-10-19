import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { test } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'
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
} from '~/index.js'
import type { ConcurIterable } from '~/index.js'

test.skip(`cache types are correct`, () => {
  expectTypeOf(cache([1, 2, 3])).toMatchTypeOf<Iterable<number>>()
})

test.prop([iterableArb])(`cache returns a pure iterable`, ({ iterable }) => {
  const cachedIterable = cache(iterable)

  expect(cachedIterable).toBeIterable()
})

test.prop([iterableArb])(
  `cache returns an iterable containing the same values in the same order as the given iterable`,
  ({ iterable, values }) => {
    const cachedIterable = cache(iterable)

    expect([...cachedIterable]).toStrictEqual(values)
  },
)

test.prop([
  nonEmptyIterableArb,
  fc.integer({ min: 1, max: 100 }),
  fc.infiniteStream(fc.nat()),
])(
  `cache ensures the underlying iterable is iterated at most once`,
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
      if (iterators[index]!.next().done) {
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

test.prop([asyncIterableArb])(
  `cacheAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const cachedIterable = cacheAsync(iterable)

    await expect(cachedIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `cacheAsync returns an async iterable containing the same values in the same order as the given async iterable`,
  async ({ iterable, values }) => {
    const cachedIterable = cacheAsync(iterable)

    await expect(reduceAsync(toArray(), cachedIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([
  nonEmptyAsyncIterableArb,
  fc.integer({ min: 1, max: 100 }),
  fc.infiniteStream(fc.nat()),
])(
  `cacheAsync ensures the underlying async iterable is iterated at most once`,
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
      if ((await iterators[index]!.next()).done) {
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

test.prop([concurIterableArb])(
  `cacheConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const cachedIterable = cacheConcur(iterable)

    await expect(cachedIterable).toBeConcurIterable()
  },
)

test.prop([concurIterableArb])(
  `cacheConcur returns a concur iterable containing the same values as the given concur iterable`,
  async ({ iterable, values }) => {
    const cachedIterable = cacheConcur(iterable)

    await expect(
      reduceConcur(toArray(), cachedIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([nonEmptyConcurIterableArb])(
  `cacheConcur ensures the underlying concur iterable is iterated at most once`,
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

test.prop([concurIterableArb])(
  `cacheConcur returns a concur iterable as concurrent as the given concur iterable`,
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(cacheConcur(iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)
