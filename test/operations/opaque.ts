import { expectTypeOf } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  opaque,
  opaqueAsync,
  opaqueConcur,
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

test.skip(`opaque types are correct`, () => {
  expectTypeOf(opaque([1, 2, 3])).toMatchTypeOf<Iterable<number>>()
})

testProp(`opaque returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const opaqueIterable = opaque(iterable)

  expect(opaqueIterable).toBeIterable()
})

testProp(
  `opaque returns an iterable deeply equal, but not referentially equal, to the given iterable`,
  [iterableArb],
  ({ iterable, values }) => {
    const opaqueIterable = opaque(iterable)

    expect([...opaqueIterable]).toStrictEqual(values)
    expect(opaqueIterable).not.toBe(iterable)
  },
)

test.skip(`opaqueAsync types are correct`, () => {
  expectTypeOf(opaqueAsync(asAsync([1, 2, 3]))).toMatchTypeOf<
    AsyncIterable<number>
  >()
})

testProp(
  `opaqueAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const opaqueIterable = opaqueAsync(iterable)

    await expect(opaqueIterable).toBeAsyncIterable()
  },
)

testProp(
  `opaqueAsync returns an async iterable deeply equal, but not referentially equal, to the given async iterable`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueAsync(iterable)

    expect(await reduceAsync(toArray(), opaqueIterable)).toStrictEqual(values)
    expect(opaqueIterable).not.toBe(iterable)
  },
)

test.skip(`opaqueConcur types are correct`, () => {
  expectTypeOf(opaqueConcur(asConcur([1, 2, 3]))).toMatchTypeOf<
    ConcurIterable<number>
  >()
})

testProp(
  `opaqueConcur returns a pure concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const opaqueIterable = opaqueConcur(iterable)

    await expect(opaqueIterable).toBeConcurIterable()
  },
)

testProp(
  `opaqueConcur returns a concur iterable deeply equal, but not referentially equal, to the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueConcur(iterable)

    expect(await reduceConcur(toArray(), opaqueIterable)).toIncludeSameMembers(
      values,
    )
    expect(opaqueIterable).not.toBe(iterable)
  },
)
