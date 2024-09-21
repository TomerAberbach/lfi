import { expectTypeOf, fc } from 'tomer'
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
} from '../../src/index.js'
import { asyncFnArb, fnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'

test.skip(`or types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      or(() => 2),
    ),
  ).toMatchTypeOf<number>()
})

testProp(
  `or calls the given function and returns its output for an iterable not containing exactly one value`,
  [
    fnArb,
    getIterableArb(fc.anything()).filter(({ values }) => values.length !== 1),
  ],
  (fn, { iterable }) => {
    const value = or(fn, iterable)

    expect(value).toBe(fn())
  },
)

testProp(
  `or returns the iterable's only value for an iterable containing one value`,
  [fnArb, getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
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

testProp(
  `orAsync calls the given function and returns its output for an async iterable not containing exactly one value`,
  [
    asyncFnArb,
    getAsyncIterableArb(fc.anything()).filter(
      ({ values }) => values.length !== 1,
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const value = await orAsync(asyncFn, iterable)

    expect(value).toBe(syncFn())
  },
)

testProp(
  `orAsync returns the async iterable's only value for an async iterable containing one value`,
  [
    asyncFnArb,
    getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
  ],
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

testProp(
  `orConcur calls the given function and returns its output for a concur iterable not containing exactly one value`,
  [
    asyncFnArb,
    getConcurIterableArb(fc.anything()).filter(
      ({ values }) => values.length !== 1,
    ),
  ],
  async ({ asyncFn, syncFn }, { iterable }) => {
    const value = await orConcur(asyncFn, iterable)

    expect(value).toBe(syncFn())
  },
)

testProp(
  `orConcur returns the concur iterable's only value for a concur iterable containing one value`,
  [
    asyncFnArb,
    getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 }),
  ],
  async ({ asyncFn }, { iterable, values }) => {
    const value = await orConcur(asyncFn, iterable)

    expect(value).toBe(values[0])
  },
)

testProp(
  `get throws an error for an iterable not containing exactly one value`,
  [getIterableArb(fc.anything()).filter(({ values }) => values.length !== 1)],
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

testProp(
  `get returns the iterable's only value for an iterable containing one value`,
  [getIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
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

testProp(
  `getAsync throws an error for an async iterable not containing exactly one value`,
  [
    getAsyncIterableArb(fc.anything()).filter(
      ({ values }) => values.length !== 1,
    ),
  ],
  async ({ iterable }) => {
    await expect(() => getAsync(iterable)).rejects.toThrowWithMessage(
      Error,
      `Did not contain exactly one value`,
    )
  },
)

testProp(
  `getAsync returns the async iterable's only value for an async iterable containing one value`,
  [getAsyncIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
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

testProp(
  `getConcur throws an error for a concur iterable not containing exactly one value`,
  [
    getConcurIterableArb(fc.anything()).filter(
      ({ values }) => values.length !== 1,
    ),
  ],
  async ({ iterable }) => {
    await expect(() => getConcur(iterable)).rejects.toThrowWithMessage(
      Error,
      `Did not contain exactly one value`,
    )
  },
)

testProp(
  `getConcur returns the concur iterable's only value for a concur iterable containing one value`,
  [getConcurIterableArb(fc.anything(), { minLength: 1, maxLength: 1 })],
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

testProp(
  `next returns a pair of iterables, the second of which isn't pure`,
  [iterableArb],
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

testProp(
  `next returns a pair containing an iterable containing the first value of the given iterable followed by an iterable containing the rest of the given iterable, for a nonempty iterable`,
  [nonEmptyIterableArb],
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

testProp(
  `nextAsync returns a pair of async iterables, the second of which isn't pure`,
  [asyncIterableArb],
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

  expect(await reduceAsync(toArray(), asyncIterable1)).toBeEmpty()
  expect(await reduceAsync(toArray(), asyncIterable2)).toBeEmpty()
})

testProp(
  `nextAsync returns a pair containing an async iterable containing the first value of the given async iterable followed by an async iterable containing the rest of the given async iterable, for a nonempty async iterable`,
  [nonEmptyAsyncIterableArb],
  async ({ iterable, values }) => {
    const [asyncIterable1, asyncIterable2] = await nextAsync(iterable)

    expect(await reduceAsync(toArray(), asyncIterable1)).toStrictEqual([
      values[0],
    ])
    expect(await reduceAsync(toArray(), asyncIterable2)).toStrictEqual(
      values.slice(1),
    )
  },
)
