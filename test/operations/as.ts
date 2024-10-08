import { expectTypeOf, fc } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  consumeConcur,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../../src/index.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'
import delay from '../helpers/delay.js'
import autoAdvance from '../helpers/auto-advance.js'

test.skip(`asAsync types are correct`, () => {
  expectTypeOf(asAsync([1, 2, 3])).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(asAsync([1, 2, 3] as Iterable<number>)).toMatchTypeOf<
    AsyncIterable<number>
  >()
  expectTypeOf(asAsync(asAsync([`a`, `b`, `c`]))).toMatchTypeOf<
    AsyncIterable<string>
  >()
  expectTypeOf(asAsync(asConcur([`a`, `b`, `c`]))).toMatchTypeOf<
    AsyncIterable<string>
  >()
})

testProp(
  `asAsync returns a pure async iterable for non-concur iterables`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async ({ iterable }) => {
    const asyncIterable = asAsync(iterable)

    await expect(asyncIterable).toBeAsyncIterable()
  },
)

testProp(
  `asAsync returns an async iterable containing the same values in the same order as the given iterable or async iterable`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async ({ iterable, values }) => {
    const asyncIterable = asAsync(iterable)

    expect(await reduceAsync(toArray(), asyncIterable)).toStrictEqual(values)
  },
)

testProp(
  `asAsync returns an async iterable containing the same values as the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const asyncIterable = asAsync(iterable)

    expect(await reduceAsync(toArray(), asyncIterable)).toIncludeSameMembers(
      values,
    )
  },
)

test(
  `asAsync handles throwing concur iterable`,
  autoAdvance(async () => {
    const concurIterable: ConcurIterable<number> = async apply => {
      await delay(1)
      await apply(1)

      await delay(1)
      await apply(2)

      await delay(1)
      throw new Error(`BOOM!`)
    }

    const asyncIterable = asAsync(concurIterable)

    const values: number[] = []
    await expect(
      (async () => {
        for await (const value of asyncIterable) {
          values.push(value)
        }
      })(),
    ).rejects.toStrictEqual(new Error(`BOOM!`))
    expect(values).toStrictEqual([1, 2])
  }),
)

test.skip(`asConcur types are correct`, () => {
  expectTypeOf(asConcur([1, 2, 3])).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(asConcur([1, 2, 3] as Iterable<number>)).toMatchTypeOf<
    ConcurIterable<number>
  >()
  expectTypeOf(asConcur(asAsync([`a`, `b`, `c`]))).toMatchTypeOf<
    ConcurIterable<string>
  >()
  expectTypeOf(asConcur(asConcur([`a`, `b`, `c`]))).toMatchTypeOf<
    ConcurIterable<string>
  >()
})

testProp(
  `asConcur returns a pure concur iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async ({ iterable }) => {
    const concurIterable = asConcur(iterable)

    await expect(concurIterable).toBeConcurIterable()
  },
)

testProp(
  `asConcur returns a concur iterable containing the same values as the given iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async ({ iterable, values }) => {
    const concurIterable = asConcur(iterable)

    expect(await reduceConcur(toArray(), concurIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `asConcur returns a concur iterable as concurrent as the given iterable`,
  [fc.oneof(asyncIterableArb, concurIterableArb)],
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(asConcur(iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)
