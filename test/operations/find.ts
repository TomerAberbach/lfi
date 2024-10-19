import { expect, expectTypeOf } from 'vitest'
import { asyncPredicateArb, predicateArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../helpers/fast-check/iterable.js'
import { test } from '../helpers/fast-check/test-prop.js'
import {
  asAsync,
  asConcur,
  find,
  findAsync,
  findConcur,
  findLast,
  findLastAsync,
  findLastConcur,
  get,
  getAsync,
  getConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
} from '~/index.js'

test.skip(`find types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      find(a => a > 1),
      get,
    ),
  ).toMatchTypeOf<number>()
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
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findAsync(a => Promise.resolve(a > 1)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<number>>()
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

    await expect(reduceAsync(toArray(), found)).resolves.toStrictEqual(expected)
  },
)

test.skip(`findConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findConcur(a => a > 1),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
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

test.skip(`findLast types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      findLast(a => a > 1),
      get,
    ),
  ).toMatchTypeOf<number>()
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
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      findLastAsync(a => Promise.resolve(a > 1)),
      getAsync,
    ),
  ).toMatchTypeOf<Promise<number>>()
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

    await expect(reduceAsync(toArray(), found)).resolves.toStrictEqual(expected)
  },
)

test.skip(`findLastConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findLastConcur(a => a > 1),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findLastConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
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
