import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { asyncPredicateArb, predicateArb } from '../../test/fast-check/fns.ts'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import {
  all,
  allAsync,
  allConcur,
  any,
  anyAsync,
  anyConcur,
  asAsync,
  asConcur,
  includes,
  includesAsync,
  includesConcur,
  none,
  noneAsync,
  noneConcur,
  pipe,
} from '../index.js'

test.skip(`all types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      all(a => a > 0),
    ),
  ).toExtend<boolean>()
})

test.prop([predicateArb, iterableArb])(
  `all returns whether the given function returns a truthy value for all values of the given iterable`,
  (fn, { iterable, values }) => {
    const result = all(fn, iterable)

    expect(result).toBe(values.every(value => fn(value)))
  },
)

test.skip(`allAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      allAsync(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      allAsync(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `allAsync returns whether the given function returns a truthy value for all values of the given async iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await allAsync(asyncFn, iterable)

    expect(result).toBe(values.every(value => syncFn(value)))
  },
)

test.skip(`allConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      allConcur(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      allConcur(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `allConcur returns whether the given function returns a truthy value for all values of the given concur iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await allConcur(asyncFn, iterable)

    expect(result).toBe(values.every(value => syncFn(value)))
  },
)

test.skip(`any types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      any(a => a > 0),
    ),
  ).toExtend<boolean>()
})

test.prop([predicateArb, iterableArb])(
  `any returns whether the given function returns a truthy value for any value of the given iterable`,
  (fn, { iterable, values }) => {
    const result = any(fn, iterable)

    expect(result).toBe(values.some(value => fn(value)))
  },
)

test.skip(`anyAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      anyAsync(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      anyAsync(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `anyAsync returns whether the given function returns a truthy value for any value of the given async iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await anyAsync(asyncFn, iterable)

    expect(result).toBe(values.some(value => syncFn(value)))
  },
)

test.skip(`anyConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      anyConcur(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      anyConcur(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `anyConcur returns whether the given function returns a truthy value for any value of the given concur iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await anyConcur(asyncFn, iterable)

    expect(result).toBe(values.some(value => syncFn(value)))
  },
)

test.skip(`none types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      none(a => a > 0),
    ),
  ).toExtend<boolean>()
})

test.prop([predicateArb, iterableArb])(
  `none returns whether the given function returns a truthy value for no value of the given iterable`,
  (fn, { iterable, values }) => {
    const result = none(fn, iterable)

    expect(result).toBe(!values.some(value => fn(value)))
  },
)

test.skip(`noneAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      noneAsync(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      noneAsync(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, asyncIterableArb])(
  `noneAsync returns whether the given function returns a truthy value for no value of the given async iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await noneAsync(asyncFn, iterable)

    expect(result).toBe(!values.some(value => syncFn(value)))
  },
)

test.skip(`noneConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      noneConcur(a => a > 0),
    ),
  ).toExtend<Promise<boolean>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      noneConcur(a => Promise.resolve(a > 0)),
    ),
  ).toExtend<Promise<boolean>>()
})

test.prop([asyncPredicateArb, concurIterableArb])(
  `noneConcur returns whether the given function returns a truthy value for no value of the given concur iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const result = await noneConcur(asyncFn, iterable)

    expect(result).toBe(!values.some(value => syncFn(value)))
  },
)

test.skip(`includes types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], includes(2))).toExtend<boolean>()
  expectTypeOf(pipe([1, 2, 3], includes(`sdfs`))).toExtend<boolean>()
})

test.prop([
  fc.oneof(
    fc.tuple(fc.anything(), iterableArb),
    fc
      .tuple(fc.nat(), iterableArb)
      .map(
        ([n, { iterable, values }]) =>
          [values[n % values.length], { iterable, values }] as const,
      ),
  ),
])(
  `includes returns whether the given element is in the given iterable`,
  ([searchElement, { iterable, values }]) => {
    const result = includes(searchElement, iterable)

    expect(result).toBe(values.includes(searchElement))
  },
)

test.skip(`includesAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), includesAsync(2))).toExtend<
    Promise<boolean>
  >()
  expectTypeOf(pipe(asAsync([1, 2, 3]), includesAsync(`sdfs`))).toExtend<
    Promise<boolean>
  >()
})

test.prop([
  fc.oneof(
    fc.tuple(fc.anything(), asyncIterableArb),
    fc
      .tuple(fc.nat(), asyncIterableArb)
      .map(
        ([n, { iterable, values }]) =>
          [values[n % values.length], { iterable, values }] as const,
      ),
  ),
])(
  `includesAsync returns whether the given element is in the given async iterable`,
  async ([searchElement, { iterable, values }]) => {
    const result = await includesAsync(searchElement, iterable)

    expect(result).toBe(values.includes(searchElement))
  },
)

test.skip(`includesConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), includesConcur(2))).toExtend<
    Promise<boolean>
  >()
  expectTypeOf(pipe(asConcur([1, 2, 3]), includesConcur(`sdfs`))).toExtend<
    Promise<boolean>
  >()
})

test.prop([
  fc.oneof(
    fc.tuple(fc.anything(), concurIterableArb),
    fc
      .tuple(fc.nat(), concurIterableArb)
      .map(
        ([n, { iterable, values }]) =>
          [values[n % values.length], { iterable, values }] as const,
      ),
  ),
])(
  `includesConcur returns whether the given element is in the given async iterable`,
  async ([searchElement, { iterable, values }]) => {
    const result = await includesConcur(searchElement, iterable)

    expect(result).toBe(values.includes(searchElement))
  },
)
