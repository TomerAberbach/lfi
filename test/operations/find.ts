import { expectTypeOf } from 'tomer'
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
} from '../../src/index.js'
import { asyncPredicateArb, predicateArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'

test.skip(`find types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      find(a => a > 1),
      get,
    ),
  ).toMatchTypeOf<number>()
})

testProp(
  `find returns a pure iterable`,
  [predicateArb, iterableArb],
  (fn, { iterable }) => {
    const found = find(fn, iterable)

    expect(found).toBeIterable()
  },
)

testProp(
  `find returns an optional corresponding to the first value in the given iterable for which the given predicate returns a truthy value`,
  [predicateArb, iterableArb],
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

testProp(
  `findAsync returns a pure async iterable`,
  [asyncPredicateArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const found = findAsync(asyncFn, iterable)

    await expect(found).toBeAsyncIterable()
  },
)

testProp(
  `findAsync returns an optional corresponding to the first value in the given async iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, asyncIterableArb],
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
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
})

testProp(
  `findConcur returns a concur iterable`,
  [asyncPredicateArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const found = findConcur(asyncFn, iterable)

    await expect(found).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `findConcur returns an optional corresponding to the first value in the given concur iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, concurIterableArb],
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

testProp(
  `findLast returns a pure iterable`,
  [predicateArb, iterableArb],
  (fn, { iterable }) => {
    const found = findLast(fn, iterable)

    expect(found).toBeIterable()
  },
)

testProp(
  `findLast returns an optional corresponding to the last value in the given iterable for which the given predicate returns a truthy value`,
  [predicateArb, iterableArb],
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

testProp(
  `findLastAsync returns a pure async iterable`,
  [asyncPredicateArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const found = findLastAsync(asyncFn, iterable)

    await expect(found).toBeAsyncIterable()
  },
)

testProp(
  `findLastAsync returns an optional corresponding to the last value in the given async iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, asyncIterableArb],
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
  ).toMatchTypeOf<Promise<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      findLastConcur(a => Promise.resolve(a > 1)),
      getConcur,
    ),
  ).toMatchTypeOf<Promise<number>>()
})

testProp(
  `findLastConcur returns a concur iterable`,
  [asyncPredicateArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const found = findLastConcur(asyncFn, iterable)

    await expect(found).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `findLastConcur returns an optional corresponding to the last value in the given concur iterable for which the given predicate returns a truthy value`,
  [asyncPredicateArb, concurIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const expected = values.filter(value => syncFn(value))

    const found = findLastConcur(asyncFn, iterable)

    const foundArray = await reduceConcur(toArray(), found)
    expect(Math.sign(foundArray.length)).toBe(Math.sign(expected.length))
    expect(expected).toIncludeAllMembers(foundArray)
  },
)
