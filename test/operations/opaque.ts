import { expect, expectTypeOf } from 'vitest'
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
import { test } from '../helpers/fast-check/test-prop.js'

test.skip(`opaque types are correct`, () => {
  expectTypeOf(opaque([1, 2, 3])).toMatchTypeOf<Iterable<number>>()
})

test.prop([iterableArb])(`opaque returns a pure iterable`, ({ iterable }) => {
  const opaqueIterable = opaque(iterable)

  expect(opaqueIterable).toBeIterable()
})

test.prop([iterableArb])(
  `opaque returns an iterable deeply equal, but not referentially equal, to the given iterable`,
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

test.prop([asyncIterableArb])(
  `opaqueAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const opaqueIterable = opaqueAsync(iterable)

    await expect(opaqueIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `opaqueAsync returns an async iterable deeply equal, but not referentially equal, to the given async iterable`,
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueAsync(iterable)

    await expect(reduceAsync(toArray(), opaqueIterable)).resolves.toStrictEqual(
      values,
    )
    expect(opaqueIterable).not.toBe(iterable)
  },
)

test.skip(`opaqueConcur types are correct`, () => {
  expectTypeOf(opaqueConcur(asConcur([1, 2, 3]))).toMatchTypeOf<
    ConcurIterable<number>
  >()
})

test.prop([concurIterableArb])(
  `opaqueConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const opaqueIterable = opaqueConcur(iterable)

    await expect(opaqueIterable).toBeConcurIterable()
  },
)

test.prop([concurIterableArb])(
  `opaqueConcur returns a concur iterable deeply equal, but not referentially equal, to the given concur iterable`,
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueConcur(iterable)

    await expect(
      reduceConcur(toArray(), opaqueIterable),
    ).resolves.toIncludeSameMembers(values)
    expect(opaqueIterable).not.toBe(iterable)
  },
)
