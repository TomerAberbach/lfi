import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { asyncFnArb, fnArb } from 'test/helpers/fast-check/fns.js'
import {
  asyncIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb,
} from 'test/helpers/fast-check/iterables.js'
import { test } from 'test/helpers/fast-check/test-prop.js'
import {
  asAsync,
  asConcur,
  emptyAsync,
  get,
  getAsync,
  getConcur,
  next,
  nextAsync,
  or,
  orAsync,
  orConcur,
  pipe,
  reduceAsync,
  toArray,
} from '~/index.js'

test.skip(`or types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      or(() => 2),
    ),
  ).toMatchTypeOf<number>()
})

test.prop([
  fnArb,
  getIterableArb(fc.anything()).filter(({ values }) => values.length !== 1),
])(
  `or calls the given function and returns its output for an iterable not containing exactly one value`,
  (fn, { iterable }) => {
    const value = or(fn, iterable)

    expect(value).toBe(fn())
  },
)

test.prop([
  fnArb,
  getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
])(
  `or returns the iterable's only value for an iterable containing one value`,
  (fn, { iterable, values }) => {
    const value = or(fn, iterable)

    expect(value).toBe(values[0])
  },
)

test.skip(`orAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      orAsync(() => 2),
    ),
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      orAsync(() => Promise.resolve(2)),
    ),
  ).toMatchTypeOf<Promise<number>>()
})

test.prop([
  asyncFnArb,
  getAsyncIterableArb(fc.anything()).filter(
    ({ values }) => values.length !== 1,
  ),
])(
  `orAsync calls the given function and returns its output for an async iterable not containing exactly one value`,
  async ({ asyncFn, syncFn }, { iterable }) => {
    const value = await orAsync(asyncFn, iterable)

    expect(value).toBe(syncFn())
  },
)

test.prop([
  asyncFnArb,
  getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
])(
  `orAsync returns the async iterable's only value for an async iterable containing one value`,
  async ({ asyncFn }, { iterable, values }) => {
    const value = await orAsync(asyncFn, iterable)

    expect(value).toBe(values[0])
  },
)

test.skip(`orConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      orConcur(() => 2),
    ),
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      orConcur(() => Promise.resolve(2)),
    ),
  ).toMatchTypeOf<Promise<number>>()
})

test.prop([
  asyncFnArb,
  getConcurIterableArb(fc.anything()).filter(
    ({ values }) => values.length !== 1,
  ),
])(
  `orConcur calls the given function and returns its output for a concur iterable not containing exactly one value`,
  async ({ asyncFn, syncFn }, { iterable }) => {
    const value = await orConcur(asyncFn, iterable)

    expect(value).toBe(syncFn())
  },
)

test.prop([
  asyncFnArb,
  getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
])(
  `orConcur returns the concur iterable's only value for a concur iterable containing one value`,
  async ({ asyncFn }, { iterable, values }) => {
    const value = await orConcur(asyncFn, iterable)

    expect(value).toBe(values[0])
  },
)

test.prop([
  getIterableArb(fc.anything()).filter(({ values }) => values.length !== 1),
])(
  `get throws an error for an iterable not containing exactly one value`,
  ({ iterable }) => {
    expect(() => get(iterable)).toThrowWithMessage(
      Error,
      `Did not contain exactly one value`,
    )
  },
)

test.skip(`get types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], get)).toMatchTypeOf<number>()
})

test.prop([getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })])(
  `get returns the iterable's only value for an iterable containing one value`,
  ({ iterable, values }) => {
    const value = get(iterable)

    expect(value).toBe(values[0])
  },
)

test.skip(`getAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), getAsync)).toMatchTypeOf<
    Promise<number>
  >()
})

test.prop([
  getAsyncIterableArb(fc.anything()).filter(
    ({ values }) => values.length !== 1,
  ),
])(
  `getAsync throws an error for an async iterable not containing exactly one value`,
  async ({ iterable }) => {
    await expect(() => getAsync(iterable)).rejects.toThrowWithMessage(
      Error,
      `Did not contain exactly one value`,
    )
  },
)

test.prop([getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })])(
  `getAsync returns the async iterable's only value for an async iterable containing one value`,
  async ({ iterable, values }) => {
    const value = await getAsync(iterable)

    expect(value).toBe(values[0])
  },
)

test.skip(`getConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), getConcur)).toMatchTypeOf<
    Promise<number>
  >()
})

test.prop([
  getConcurIterableArb(fc.anything()).filter(
    ({ values }) => values.length !== 1,
  ),
])(
  `getConcur throws an error for a concur iterable not containing exactly one value`,
  async ({ iterable }) => {
    await expect(() => getConcur(iterable)).rejects.toThrowWithMessage(
      Error,
      `Did not contain exactly one value`,
    )
  },
)

test.prop([
  getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
])(
  `getConcur returns the concur iterable's only value for a concur iterable containing one value`,
  async ({ iterable, values }) => {
    const value = await getConcur(iterable)

    expect(value).toBe(values[0])
  },
)

test.skip(`next types are correct`, () => {
  const array = next([1, 2])
  expectTypeOf(array[0]).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(array[1]).toMatchTypeOf<Iterable<number>>()
})

test.prop([iterableArb])(
  `next returns a pair of iterables, the second of which isn't pure`,
  ({ iterable }) => {
    const pair = next(iterable)

    expect(pair).toBeArrayOfSize(2)

    const [iterable1, iterable2] = pair

    expect(iterable1).toBeIterable()
    expect(iterable2).toBeIterable({ pure: false })
  },
)

test(`next returns a pair containing two empty iterables for an empty iterable`, () => {
  const [iterable1, iterable2] = next([])

  expect([...iterable1]).toBeEmpty()
  expect([...iterable2]).toBeEmpty()
})

test.prop([nonEmptyIterableArb])(
  `next returns a pair containing an iterable containing the first value of the given iterable followed by an iterable containing the rest of the given iterable, for a nonempty iterable`,
  ({ iterable, values }) => {
    const [iterable1, iterable2] = next(iterable)

    expect([...iterable1]).toStrictEqual([values[0]])
    expect([...iterable2]).toStrictEqual(values.slice(1))
  },
)

test.skip(`nextAsync types are correct`, async () => {
  const array = await nextAsync(asAsync([1, 2]))
  expectTypeOf(array[0]).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(array[1]).toMatchTypeOf<AsyncIterable<number>>()
})

test.prop([asyncIterableArb])(
  `nextAsync returns a pair of async iterables, the second of which isn't pure`,
  async ({ iterable }) => {
    const pair = await nextAsync(iterable)

    expect(pair).toBeArrayOfSize(2)

    const [asyncIterable1, asyncIterable2] = pair

    await expect(asyncIterable1).toBeAsyncIterable()
    await expect(asyncIterable2).toBeAsyncIterable({ pure: false })
  },
)

test(`nextAsync returns a pair containing two empty async iterables for an empty async iterable`, async () => {
  const [asyncIterable1, asyncIterable2] = await nextAsync(emptyAsync)

  await expect(reduceAsync(toArray(), asyncIterable1)).resolves.toBeEmpty()
  await expect(reduceAsync(toArray(), asyncIterable2)).resolves.toBeEmpty()
})

test.prop([nonEmptyAsyncIterableArb])(
  `nextAsync returns a pair containing an async iterable containing the first value of the given async iterable followed by an async iterable containing the rest of the given async iterable, for a nonempty async iterable`,
  async ({ iterable, values }) => {
    const [asyncIterable1, asyncIterable2] = await nextAsync(iterable)

    await expect(reduceAsync(toArray(), asyncIterable1)).resolves.toStrictEqual(
      [values[0]],
    )
    await expect(reduceAsync(toArray(), asyncIterable2)).resolves.toStrictEqual(
      values.slice(1),
    )
  },
)
