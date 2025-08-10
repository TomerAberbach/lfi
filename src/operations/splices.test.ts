import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import autoAdvance from '../../test/auto-advance.ts'
import { asyncFnArb, fnArb } from '../../test/fast-check/fns.ts'
import {
  getIntervalArb,
  negativeIntegerArb,
  nonIntegerDoubleArb,
  nonNegativeIntegerArb,
  nonPositiveIntegerArb,
  positiveIntegerArb,
} from '../../test/fast-check/numbers.ts'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import withElapsed from '../../test/with-elapsed.ts'
import {
  asAsync,
  asConcur,
  at,
  atAsync,
  atConcur,
  chunk,
  chunkAsync,
  chunkConcur,
  concat,
  concatAsync,
  concatConcur,
  consumeConcur,
  drop,
  dropAsync,
  dropConcur,
  dropWhile,
  dropWhileAsync,
  dropWhileConcur,
  each,
  eachAsync,
  emptyAsync,
  emptyConcur,
  first,
  firstAsync,
  firstConcur,
  flatMapConcur,
  flatten,
  flattenAsync,
  forEach,
  forEachAsync,
  get,
  getAsync,
  getConcur,
  last,
  lastAsync,
  lastConcur,
  map,
  mapAsync,
  mapConcur,
  pipe,
  reduce,
  reduceAsync,
  reduceConcur,
  repeat,
  slice,
  sliceAsync,
  sliceConcur,
  take,
  takeAsync,
  takeConcur,
  takeWhile,
  takeWhileAsync,
  takeWhileConcur,
  toArray,
  window,
  windowAsync,
  windowConcur,
  zip,
  zipAsync,
  zipConcur,
} from '../index.js'
import type {
  AsyncOptional,
  ConcurIterable,
  ConcurOptional,
  Optional,
  WindowOptions,
} from '../index.js'

test.skip(`dropWhile types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      dropWhile(x => x < 3),
    ),
  ).toExtend<Iterable<number>>()
})

test.prop([fnArb, iterableArb])(
  `dropWhile returns a pure iterable`,
  (fn, { iterable }) => {
    const subIterable = dropWhile(fn, iterable)

    expect(subIterable).toBeIterable()
  },
)

test.prop([iterableArb])(
  `dropWhile returns the given iterable when the given predicate never returns a truthy value`,
  ({ iterable, values }) => {
    const subIterable = dropWhile(() => false, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

test.prop([iterableArb])(
  `dropWhile returns an empty iterable when the given predicate always returns a truthy value`,
  ({ iterable }) => {
    const subIterable = dropWhile(() => true, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(iterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `dropWhile returns the given iterable's elements starting from the first element for which the given function does not return true`,
  ([{ iterable, values }, stopDroppingIndex]) => {
    let index = 0
    const subIterable = dropWhile(() => index++ !== stopDroppingIndex, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(stopDroppingIndex))
  },
)

test.skip(`dropWhileAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      dropWhileAsync(x => x < 3),
    ),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      dropWhileAsync(x => Promise.resolve(x < 3)),
    ),
  ).toExtend<AsyncIterable<number>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `dropWhileAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const subIterable = dropWhileAsync(asyncFn, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `dropWhileAsync returns the given async iterable when the given predicate never returns a truthy value`,
  async ({ iterable, values }) => {
    const subIterable = dropWhileAsync(() => false, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([asyncIterableArb])(
  `dropWhileAsync returns an empty async iterable when the given predicate always returns a truthy value`,
  async ({ iterable }) => {
    const subIterable = dropWhileAsync(() => true, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(asyncIterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `dropWhileAsync returns the given async iterable's elements starting from the first element for which the given function does not return true`,
  async ([{ iterable, values }, stopDroppingIndex]) => {
    let index = 0
    const subIterable = dropWhileAsync(
      () => index++ !== stopDroppingIndex,
      iterable,
    )

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values.slice(stopDroppingIndex),
    )
  },
)

test.skip(`dropWhileConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      dropWhileConcur(x => x < 3),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      dropWhileConcur(x => Promise.resolve(x < 3)),
    ),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `dropWhileConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const subIterable = dropWhileConcur(asyncFn, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([concurIterableArb])(
  `dropWhileConcur returns the given concur iterable when the given predicate never returns a truthy value`,
  async ({ iterable, values }) => {
    const subIterable = dropWhileConcur(() => false, iterable)

    await expect(
      reduceConcur(toArray(), subIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([concurIterableArb])(
  `dropWhileConcur returns an empty concur iterable when the given predicate always returns a truthy value`,
  async ({ iterable }) => {
    const subIterable = dropWhileConcur(() => true, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(concurIterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `dropWhileConcur returns the given concur iterable's elements starting from the first element for which the given function does not return true`,
  async ([{ iterable }, stopDroppingIndex], scheduler) => {
    let index = 0
    const subIterable = dropWhileConcur(
      () => index++ !== stopDroppingIndex,
      iterable,
    )

    await expect(reduceConcur(toArray(), subIterable)).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(stopDroppingIndex),
    )
  },
)

test.skip(`takeWhile types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      takeWhile(x => x < 3),
    ),
  ).toExtend<Iterable<number>>()
})

test.prop([fnArb, iterableArb])(
  `takeWhile returns a pure iterable`,
  (fn, { iterable }) => {
    const subIterable = takeWhile(fn, iterable)

    expect(subIterable).toBeIterable()
  },
)

test.prop([iterableArb])(
  `takeWhile returns the given iterable when the given predicate always returns a truthy value`,
  ({ iterable, values }) => {
    const subIterable = takeWhile(() => true, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

test.prop([iterableArb])(
  `takeWhile returns an empty iterable when the given predicate never returns a truthy value`,
  ({ iterable }) => {
    const subIterable = takeWhile(() => false, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(iterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `takeWhile returns the given iterable's elements up to the first element for which the given function does not return true`,
  ([{ iterable, values }, stopTakingIndex]) => {
    let index = 0
    const subIterable = takeWhile(() => index++ !== stopTakingIndex, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(0, stopTakingIndex))
  },
)

test.skip(`takeWhileAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      takeWhileAsync(x => x < 3),
    ),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      takeWhileAsync(x => Promise.resolve(x < 3)),
    ),
  ).toExtend<AsyncIterable<number>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `takeWhileAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const subIterable = takeWhileAsync(asyncFn, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `takeWhileAsync returns the given async iterable when the given predicate always returns a truthy value`,
  async ({ iterable, values }) => {
    const subIterable = takeWhileAsync(() => true, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([asyncIterableArb])(
  `takeWhileAsync returns an empty async iterable when the given predicate never returns a truthy value`,
  async ({ iterable }) => {
    const subIterable = takeWhileAsync(() => false, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(asyncIterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `takeWhileAsync returns the given async iterable's elements up to the first element for which the given function does not return true`,
  async ([{ iterable, values }, stopTakingIndex]) => {
    let index = 0
    const subIterable = takeWhileAsync(
      () => index++ !== stopTakingIndex,
      iterable,
    )

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values.slice(0, stopTakingIndex),
    )
  },
)

test.skip(`takeWhileConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      takeWhileConcur(x => x < 3),
    ),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      takeWhileConcur(x => Promise.resolve(x < 3)),
    ),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `takeWhileConcur returns a concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const subIterable = takeWhileConcur(asyncFn, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([concurIterableArb])(
  `takeWhileConcur returns the given concur iterable when the given predicate always returns a truthy value`,
  async ({ iterable, values }) => {
    const subIterable = takeWhileConcur(() => true, iterable)

    await expect(
      reduceConcur(toArray(), subIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([concurIterableArb])(
  `takeWhileConcur returns an empty concur iterable when the given predicate never returns a truthy value`,
  async ({ iterable }) => {
    const subIterable = takeWhileConcur(() => false, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(concurIterableArb, nonNegativeIntegerArb)
    .map(
      ([{ iterable, values }, index]) =>
        [{ iterable, values }, index % values.length] as const,
    ),
])(
  `takeWhileConcur returns the given concur iterable's elements up to the first element for which the given function does not return true`,
  async ([{ iterable }, stopTakingIndex], scheduler) => {
    let index = 0
    const subIterable = takeWhileConcur(
      () => index++ !== stopTakingIndex,
      iterable,
    )

    await expect(reduceConcur(toArray(), subIterable)).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(0, stopTakingIndex),
    )
  },
)

test.skip(`drop types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], drop(2))).toExtend<Iterable<number>>()

  // @ts-expect-error Not an integer literal.
  drop(2.4)

  // @ts-expect-error Not a non-negative integer.
  drop(-2)
})

test.prop([nonNegativeIntegerArb, iterableArb])(
  `drop returns a pure iterable`,
  (count, { iterable }) => {
    const subIterable = drop(count, iterable)

    expect(subIterable).toBeIterable()
  },
)

test.prop([nonIntegerDoubleArb, iterableArb])(
  `drop throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => drop(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, iterableArb])(
  `drop throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => drop(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([iterableArb])(
  `drop returns the given iterable for zero`,
  ({ iterable, values }) => {
    const subIterable = drop(0, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, iterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, iterable] as const,
    ),
])(
  `drop returns an empty iterable for greater than or equal to the given iterable's length`,
  ([count, iterable]) => {
    const subIterable = drop(count, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `drop drops the given number of elements from the start of the given iterable`,
  ([count, { iterable, values }]) => {
    const subIterable = drop(count, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(count))
  },
)

test.skip(`dropAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), dropAsync(2))).toExtend<
    AsyncIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  dropAsync(2.4)

  // @ts-expect-error Not a non-negative integer.
  dropAsync(-2)
})

test.prop([nonNegativeIntegerArb, asyncIterableArb])(
  `dropAsync returns a pure async iterable`,
  async (count, { iterable }) => {
    const subIterable = dropAsync(count, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test.prop([nonIntegerDoubleArb, asyncIterableArb])(
  `dropAsync throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => dropAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, asyncIterableArb])(
  `dropAsync throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => dropAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([asyncIterableArb])(
  `dropAsync returns the given async iterable for zero`,
  async ({ iterable, values }) => {
    const subIterable = dropAsync(0, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, asyncIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, iterable] as const,
    ),
])(
  `dropAsync returns an empty async iterable for greater than or equal to the given async iterable's length`,
  async ([count, iterable]) => {
    const subIterable = dropAsync(count, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `dropAsync drops the given number of elements from the start of the given async iterable`,
  async ([count, { iterable, values }]) => {
    const subIterable = dropAsync(count, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values.slice(count),
    )
  },
)

test.skip(`dropConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), dropConcur(2))).toExtend<
    ConcurIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  dropConcur(2.4)

  // @ts-expect-error Not a non-negative integer.
  dropConcur(-2)
})

test.prop([nonNegativeIntegerArb, concurIterableArb])(
  `dropConcur returns a concur iterable`,
  async (count, { iterable }) => {
    const subIterable = dropConcur(count, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([nonIntegerDoubleArb, concurIterableArb])(
  `dropConcur throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => dropConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, concurIterableArb])(
  `dropConcur throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => dropConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([concurIterableArb])(
  `dropConcur returns the given concur iterable for zero`,
  async ({ iterable, values }) => {
    const subIterable = dropConcur(0, iterable)

    await expect(
      reduceConcur(toArray(), subIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, concurIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, iterable] as const,
    ),
])(
  `dropConcur returns an empty concur iterable for greater than or equal to the given concur iterable's length`,
  async ([count, iterable]) => {
    const subIterable = dropConcur(count, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `dropConcur drops the given number of elements from the start of the given concur iterable`,
  async ([count, { iterable }], scheduler) => {
    const subIterable = dropConcur(count, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(count),
    )
  },
)

test.skip(`take types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], take(2))).toExtend<Iterable<number>>()

  // @ts-expect-error Not an integer literal.
  take(2.4)

  // @ts-expect-error Not a non-negative integer.
  take(-2)
})

test.prop([nonNegativeIntegerArb, iterableArb])(
  `take returns a pure iterable`,
  (count, { iterable }) => {
    const subIterable = take(count, iterable)

    expect(subIterable).toBeIterable()
  },
)

test.prop([nonIntegerDoubleArb, iterableArb])(
  `take throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => take(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, iterableArb])(
  `take throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => take(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, iterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, { iterable, values }] as const,
    ),
])(
  `take returns the given iterable for greater than or equal to the given iterable's length`,
  ([count, { iterable, values }]) => {
    const subIterable = take(count, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

test.prop([iterableArb])(
  `take returns an empty iterable for zero`,
  ({ iterable }) => {
    const subIterable = take(0, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `take takes the given number of elements from the start of the given iterable`,
  ([count, { iterable, values }]) => {
    const subIterable = take(count, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(0, count))
  },
)

test.skip(`takeAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), takeAsync(2))).toExtend<
    AsyncIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  takeAsync(2.4)

  // @ts-expect-error Not a non-negative integer.
  takeAsync(-2)
})

test.prop([nonNegativeIntegerArb, asyncIterableArb])(
  `takeAsync returns a pure async iterable`,
  async (count, { iterable }) => {
    const subIterable = takeAsync(count, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test.prop([nonIntegerDoubleArb, asyncIterableArb])(
  `takeAsync throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => takeAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, asyncIterableArb])(
  `takeAsync throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => takeAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, asyncIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, { iterable, values }] as const,
    ),
])(
  `takeAsync returns the given async iterable for greater than or equal to the given async iterable's length`,
  async ([count, { iterable, values }]) => {
    const subIterable = takeAsync(count, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([asyncIterableArb])(
  `takeAsync returns an empty async iterable for zero`,
  async ({ iterable }) => {
    const subIterable = takeAsync(0, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `takeAsync takes the given number of elements from the start of the given async iterable`,
  async ([count, { iterable, values }]) => {
    const subIterable = takeAsync(count, iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual(
      values.slice(0, count),
    )
  },
)

test.skip(`takeConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), takeConcur(2))).toExtend<
    ConcurIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  takeConcur(2.4)

  // @ts-expect-error Not a non-negative integer.
  takeConcur(-2)
})

test.prop([nonNegativeIntegerArb, concurIterableArb])(
  `takeConcur returns a concur iterable`,
  async (count, { iterable }) => {
    const subIterable = takeConcur(count, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([nonIntegerDoubleArb, concurIterableArb])(
  `takeConcur throws for a non-integer count`,
  (count, { iterable }) => {
    expect(() => takeConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

test.prop([negativeIntegerArb, concurIterableArb])(
  `takeConcur throws for a negative integer count`,
  (count, { iterable }) => {
    expect(() => takeConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, concurIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count + values.length, { iterable, values }] as const,
    ),
])(
  `takeConcur returns the given concur iterable for greater than or equal to the given concur iterable's length`,
  async ([count, { iterable, values }]) => {
    const subIterable = takeConcur(count, iterable)

    await expect(
      reduceConcur(toArray(), subIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([concurIterableArb])(
  `takeConcur returns an empty concur iterable for zero`,
  async ({ iterable }) => {
    const subIterable = takeConcur(0, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
    .map(
      ([count, { iterable, values }]) =>
        [count % values.length, { iterable, values }] as const,
    ),
])(
  `takeConcur takes the given number of elements from the start of the given concur iterable`,
  async ([count, { iterable }], scheduler) => {
    const subIterable = takeConcur(count, iterable)

    await expect(reduceConcur(toArray(), subIterable)).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(0, count),
    )
  },
)

test.skip(`first types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], first, get)).toExtend<number>()
})

test.prop([iterableArb])(`first returns a pure iterable`, ({ iterable }) => {
  const subIterable = first(iterable)

  expect(subIterable).toBeIterable()
})

test(`first returns an empty iterable for an empty iterable`, () => {
  const subIterable = first([])

  expect([...subIterable]).toBeEmpty()
})

test.prop([nonEmptyIterableArb])(
  `first returns an iterable containing the first element of the given iterable for a non-empty iterable`,
  ({ iterable, values }) => {
    const subIterable = first(iterable)

    expect([...subIterable]).toStrictEqual([values[0]])
  },
)

test.skip(`firstAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), firstAsync, getAsync)).toExtend<
    Promise<number>
  >()
})

test.prop([asyncIterableArb])(
  `firstAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const subIterable = firstAsync(iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test(
  `firstAsync returns an empty async iterable for an empty async iterable`,
  autoAdvance(async () => {
    const subIterable = firstAsync(emptyAsync())

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  }),
)

test.prop([nonEmptyAsyncIterableArb])(
  `firstAsync returns an async iterable containing the first element of the given async iterable for a non-empty async iterable`,
  async ({ iterable, values }) => {
    const subIterable = firstAsync(iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual([
      values[0],
    ])
  },
)

test.skip(`firstConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), firstConcur, getConcur)).toExtend<
    Promise<number>
  >()
})

test.prop([concurIterableArb])(
  `firstConcur returns a concur iterable`,
  async ({ iterable }) => {
    const subIterable = firstConcur(iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test(`firstConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const subIterable = firstConcur(emptyConcur())

  await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
})

test.prop([nonEmptyConcurIterableArb])(
  `firstConcur returns a concur iterable containing the first element of the given concur iterable for a non-empty concur iterable`,
  async ({ iterable }, scheduler) => {
    const subIterable = firstConcur(iterable)

    const array = await reduceConcur(toArray(), subIterable)
    expect(array).toBeArrayOfSize(1)
    expect(array).toIncludeAnyMembers((await scheduler.report()).min().values)
  },
)

test.skip(`last types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], last, get)).toExtend<number>()
})

test.prop([iterableArb])(`last returns a pure iterable`, ({ iterable }) => {
  const subIterable = last(iterable)

  expect(subIterable).toBeIterable()
})

test(`last returns an empty iterable for an empty iterable`, () => {
  const subIterable = last([])

  expect([...subIterable]).toBeEmpty()
})

test.prop([nonEmptyIterableArb])(
  `last returns an iterable containing the last element of the given iterable for a non-empty iterable`,
  ({ iterable, values }) => {
    const subIterable = last(iterable)

    expect([...subIterable]).toStrictEqual([values.at(-1)])
  },
)

test.skip(`lastAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), lastAsync, getAsync)).toExtend<
    Promise<number>
  >()
})

test.prop([asyncIterableArb])(
  `lastAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const subIterable = lastAsync(iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test(
  `lastAsync returns an empty async iterable for an empty async iterable`,
  autoAdvance(async () => {
    const subIterable = lastAsync(emptyAsync())

    await expect(reduceAsync(toArray(), subIterable)).resolves.toBeEmpty()
  }),
)

test.prop([nonEmptyAsyncIterableArb])(
  `lastAsync returns an async iterable containing the last element of the given async iterable for a non-empty async iterable`,
  async ({ iterable, values }) => {
    const subIterable = lastAsync(iterable)

    await expect(reduceAsync(toArray(), subIterable)).resolves.toStrictEqual([
      values.at(-1),
    ])
  },
)

test.skip(`lastConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), lastConcur, getConcur)).toExtend<
    Promise<number>
  >()
})

test.prop([concurIterableArb])(
  `lastConcur returns a concur iterable`,
  async ({ iterable }) => {
    const subIterable = lastConcur(iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test(
  `lastConcur returns an empty concur iterable for an empty concur iterable`,
  autoAdvance(async () => {
    const subIterable = lastConcur(emptyConcur())

    await expect(reduceConcur(toArray(), subIterable)).resolves.toBeEmpty()
  }),
)

test.prop([nonEmptyConcurIterableArb])(
  `lastConcur returns a concur iterable containing the last element of the given concur iterable for a non-empty concur iterable`,
  async ({ iterable }, scheduler) => {
    const subIterable = lastConcur(iterable)

    const array = await reduceConcur(toArray(), subIterable)
    expect(array).toBeArrayOfSize(1)
    expect(array).toIncludeAnyMembers((await scheduler.report()).max().values)
  },
)

const reasonableNonNegativeIntegerArb = fc.integer({ min: 0, max: 200 })
const intervalArb = getIntervalArb(reasonableNonNegativeIntegerArb)
const invertedIntervalArb = intervalArb
  .filter(([start, end]) => start !== end)
  .map(([start, end]): [number, number] => [end, start])

test.skip(`slice types are correct`, () => {
  expectTypeOf(slice(1)(2, [1, 2, 3])).toExtend<Iterable<number>>()
  expectTypeOf(slice(1)(2)([1, 2, 3])).toExtend<Iterable<number>>()
  expectTypeOf(slice(1, 2)([1, 2, 3])).toExtend<Iterable<number>>()
  expectTypeOf(slice(1, 2, [1, 2, 3])).toExtend<Iterable<number>>()

  // @ts-expect-error Not an integer literal.
  slice(1.2)
  slice(
    1,
    // @ts-expect-error Not an integer literal.
    1.2,
  )
  // @ts-expect-error Not a non-negative integer.
  slice(-1)
  slice(
    1,
    // @ts-expect-error Not a non-negative integer.
    -1,
  )
})

test.prop([intervalArb, iterableArb])(
  `slice returns a pure iterable`,
  ([start, end], { iterable }) => {
    const slicedIterable = slice(start, end, iterable)

    expect(slicedIterable).toBeIterable()
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), iterableArb])(
  `slice throws for a non-integer start`,
  (start, { iterable }) => {
    expect(() => slice(start, Math.ceil(start), iterable)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

test.prop([negativeIntegerArb, iterableArb])(
  `slice throws for a negative integer start`,
  (start, { iterable }) => {
    expect(() => slice(start, 1, iterable)).toThrowWithMessage(
      Error,
      `\`start\` must be a non-negative integer: ${start}`,
    )
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), iterableArb])(
  `slice throws for a non-integer end`,
  (end, { iterable }) => {
    expect(() => slice(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

test.prop([negativeIntegerArb, iterableArb])(
  `slice throws for a negative integer end`,
  (end, { iterable }) => {
    expect(() => slice(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be a non-negative integer: ${end}`,
    )
  },
)

test.prop([invertedIntervalArb, iterableArb])(
  `slice throws for an inverted range`,
  ([start, end], { iterable }) => {
    expect(() => slice(start, end, iterable)).toThrowWithMessage(
      Error,
      `\`start,end\` must be a range: ${start},${end}`,
    )
  },
)

test.prop([intervalArb, iterableArb])(
  `slice returns an iterable containing the values between start and end`,
  ([start, end], { iterable, values }) => {
    const slicedIterable = slice(start, end, iterable)

    expect([...slicedIterable]).toStrictEqual(values.slice(start, end))
  },
)

test.skip(`sliceAsync types are correct`, () => {
  expectTypeOf(sliceAsync(1)(2, asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<number>
  >()
  expectTypeOf(sliceAsync(1)(2)(asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<number>
  >()
  expectTypeOf(sliceAsync(1, 2)(asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<number>
  >()
  expectTypeOf(sliceAsync(1, 2, asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  sliceAsync(1.2)
  sliceAsync(
    1,
    // @ts-expect-error Not an integer literal.
    1.2,
  )
  // @ts-expect-error Not a non-negative integer.
  sliceAsync(-1)
  sliceAsync(
    1,
    // @ts-expect-error Not a non-negative integer.
    -1,
  )
})

test.prop([intervalArb, asyncIterableArb])(
  `sliceAsync returns a pure async iterable`,
  async ([start, end], { iterable }) => {
    const slicedIterable = sliceAsync(start, end, iterable)

    await expect(slicedIterable).toBeAsyncIterable()
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), asyncIterableArb])(
  `sliceAsync throws for a non-integer start`,
  (start, { iterable }) => {
    expect(() =>
      sliceAsync(start, Math.ceil(start), iterable),
    ).toThrowWithMessage(Error, `\`start\` must be an integer: ${start}`)
  },
)

test.prop([negativeIntegerArb, asyncIterableArb])(
  `sliceAsync throws for a negative integer start`,
  (start, { iterable }) => {
    expect(() => sliceAsync(start, 1, iterable)).toThrowWithMessage(
      Error,
      `\`start\` must be a non-negative integer: ${start}`,
    )
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), asyncIterableArb])(
  `sliceAsync throws for a non-integer end`,
  (end, { iterable }) => {
    expect(() => sliceAsync(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

test.prop([negativeIntegerArb, asyncIterableArb])(
  `sliceAsync throws for a negative integer end`,
  (end, { iterable }) => {
    expect(() => sliceAsync(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be a non-negative integer: ${end}`,
    )
  },
)

test.prop([invertedIntervalArb, asyncIterableArb])(
  `sliceAsync throws for an inverted range`,
  ([start, end], { iterable }) => {
    expect(() => sliceAsync(start, end, iterable)).toThrowWithMessage(
      Error,
      `\`start,end\` must be a range: ${start},${end}`,
    )
  },
)

test.prop([intervalArb, asyncIterableArb])(
  `sliceAsync returns an async iterable containing the values between start and end`,
  async ([start, end], { iterable, values }) => {
    const slicedIterable = sliceAsync(start, end, iterable)

    await expect(reduceAsync(toArray(), slicedIterable)).resolves.toStrictEqual(
      values.slice(start, end),
    )
  },
)

test.skip(`sliceConcur types are correct`, () => {
  expectTypeOf(sliceConcur(1)(2, asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<number>
  >()
  expectTypeOf(sliceConcur(1)(2)(asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<number>
  >()
  expectTypeOf(sliceConcur(1, 2)(asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<number>
  >()
  expectTypeOf(sliceConcur(1, 2, asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<number>
  >()

  // @ts-expect-error Not an integer literal.
  sliceConcur(1.2)
  sliceConcur(
    1,
    // @ts-expect-error Not an integer literal.
    1.2,
  )
  // @ts-expect-error Not a non-negative integer.
  sliceConcur(-1)
  sliceConcur(
    1,
    // @ts-expect-error Not a non-negative integer.
    -1,
  )
})

test.prop([intervalArb, concurIterableArb])(
  `sliceConcur returns a concur iterable`,
  async ([start, end], { iterable }) => {
    const slicedIterable = sliceConcur(start, end, iterable)

    await expect(slicedIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), concurIterableArb])(
  `sliceConcur throws for a non-integer start`,
  (start, { iterable }) => {
    expect(() =>
      sliceConcur(start, Math.ceil(start), iterable),
    ).toThrowWithMessage(Error, `\`start\` must be an integer: ${start}`)
  },
)

test.prop([negativeIntegerArb, concurIterableArb])(
  `sliceConcur throws for a negative integer start`,
  (start, { iterable }) => {
    expect(() => sliceConcur(start, 1, iterable)).toThrowWithMessage(
      Error,
      `\`start\` must be a non-negative integer: ${start}`,
    )
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), concurIterableArb])(
  `sliceConcur throws for a non-integer end`,
  (end, { iterable }) => {
    expect(() => sliceConcur(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

test.prop([negativeIntegerArb, concurIterableArb])(
  `sliceConcur throws for a negative integer end`,
  (end, { iterable }) => {
    expect(() => sliceConcur(0, end, iterable)).toThrowWithMessage(
      Error,
      `\`end\` must be a non-negative integer: ${end}`,
    )
  },
)

test.prop([invertedIntervalArb, concurIterableArb])(
  `sliceConcur throws for an inverted range`,
  ([start, end], { iterable }) => {
    expect(() => sliceConcur(start, end, iterable)).toThrowWithMessage(
      Error,
      `\`start,end\` must be a range: ${start},${end}`,
    )
  },
)

test.prop([intervalArb, concurIterableArb])(
  `sliceConcur returns a concur iterable containing the values between start and end in iteration order`,
  async ([start, end], { iterable }, scheduler) => {
    const slicedIterable = sliceConcur(start, end, iterable)

    await expect(
      reduceConcur(toArray(), slicedIterable),
    ).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(start, end),
    )
  },
)

test.skip(`at types are correct`, () => {
  expectTypeOf(at(1)([1, 2, 3])).toExtend<Optional<number>>()
  expectTypeOf(at(1, [1, 2, 3])).toExtend<Optional<number>>()

  // @ts-expect-error Not an integer literal.
  at(1.2)
  // @ts-expect-error Not a non-negative integer.
  at(-1)
})

test.prop([reasonableNonNegativeIntegerArb, iterableArb])(
  `at returns a pure iterable`,
  (index, { iterable }) => {
    const atIterable = at(index, iterable)

    expect(atIterable).toBeIterable()
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), iterableArb])(
  `at throws for a non-integer index`,
  (index, { iterable }) => {
    expect(() => at(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be an integer: ${index}`,
    )
  },
)

test.prop([negativeIntegerArb, iterableArb])(
  `at throws for a negative integer start`,
  (index, { iterable }) => {
    expect(() => at(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be a non-negative integer: ${index}`,
    )
  },
)

test.prop([reasonableNonNegativeIntegerArb, iterableArb])(
  `at returns an iterable containing the value at index`,
  (index, { iterable, values }) => {
    const atIterable = at(index, iterable)

    expect([...atIterable]).toStrictEqual(values.slice(index, index + 1))
  },
)

test.skip(`atAsync types are correct`, () => {
  expectTypeOf(atAsync(1)(asAsync([1, 2, 3]))).toExtend<AsyncOptional<number>>()
  expectTypeOf(atAsync(1, asAsync([1, 2, 3]))).toExtend<AsyncIterable<number>>()

  // @ts-expect-error Not an integer literal.
  atAsync(1.2)
  // @ts-expect-error Not a non-negative integer.
  atAsync(-1)
})

test.prop([reasonableNonNegativeIntegerArb, asyncIterableArb])(
  `atAsync returns a pure async iterable`,
  async (index, { iterable }) => {
    const atIterable = atAsync(index, iterable)

    await expect(atIterable).toBeAsyncIterable()
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), asyncIterableArb])(
  `atAsync throws for a non-integer index`,
  (index, { iterable }) => {
    expect(() => atAsync(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be an integer: ${index}`,
    )
  },
)

test.prop([negativeIntegerArb, asyncIterableArb])(
  `atAsync throws for a negative integer index`,
  (index, { iterable }) => {
    expect(() => atAsync(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be a non-negative integer: ${index}`,
    )
  },
)

test.prop([reasonableNonNegativeIntegerArb, asyncIterableArb])(
  `atAsync returns an async iterable containing the value at index`,
  async (index, { iterable, values }) => {
    const atIterable = atAsync(index, iterable)

    await expect(reduceAsync(toArray(), atIterable)).resolves.toStrictEqual(
      values.slice(index, index + 1),
    )
  },
)

test.skip(`atConcur types are correct`, () => {
  expectTypeOf(atConcur(1)(asConcur([1, 2, 3]))).toExtend<
    ConcurOptional<number>
  >()
  expectTypeOf(atConcur(1, asConcur([1, 2, 3]))).toExtend<
    ConcurOptional<number>
  >()

  // @ts-expect-error Not an integer literal.
  atConcur(1.2)
  // @ts-expect-error Not a non-negative integer.
  atConcur(-1)
})

test.prop([reasonableNonNegativeIntegerArb, concurIterableArb])(
  `atConcur returns a concur iterable`,
  async (index, { iterable }) => {
    const atIterable = atConcur(index, iterable)

    await expect(atIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([fc.double({ min: 0, noInteger: true }), concurIterableArb])(
  `atConcur throws for a non-integer index`,
  (index, { iterable }) => {
    expect(() => atConcur(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be an integer: ${index}`,
    )
  },
)

test.prop([negativeIntegerArb, concurIterableArb])(
  `atConcur throws for a negative integer start`,
  (index, { iterable }) => {
    expect(() => atConcur(index, iterable)).toThrowWithMessage(
      Error,
      `\`index\` must be a non-negative integer: ${index}`,
    )
  },
)

test.prop([reasonableNonNegativeIntegerArb, concurIterableArb])(
  `atConcur returns a concur iterable containing the value at index in iteration order`,
  async (index, { iterable }, scheduler) => {
    const atIterable = atConcur(index, iterable)

    await expect(reduceConcur(toArray(), atIterable)).resolves.toStrictEqual(
      (await scheduler.report()).values().slice(index, index + 1),
    )
  },
)

test.skip(`chunk types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], chunk(2))).toExtend<Iterable<number[]>>()

  // @ts-expect-error Not an integer literal.
  chunk(2.4)

  // @ts-expect-error Not a non-negative integer.
  chunk(-2)
})

test.prop([positiveIntegerArb, iterableArb])(
  `chunk returns a pure iterable`,
  (size, { iterable }) => {
    const chunkedIterable = chunk(size, iterable)

    expect(chunkedIterable).toBeIterable()
  },
)

test.prop([nonIntegerDoubleArb, iterableArb])(
  `chunk throws for a non-integer size`,
  (size, { iterable }) => {
    expect(() => chunk(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([nonPositiveIntegerArb, iterableArb])(
  `chunk throws for a non-positive integer size`,
  (size, { iterable }) => {
    expect(() => chunk(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([positiveIntegerArb, iterableArb])(
  `chunk returns an iterable that flattens to contain the same values in the same order as the given iterable`,
  (size, { iterable, values }) => {
    const chunkedIterable = chunk(size, iterable)

    expect([...flatten(chunkedIterable)]).toStrictEqual(values)
  },
)

test.prop([positiveIntegerArb])(
  `chunk returns an empty iterable for an empty iterable`,
  size => {
    const chunkedIterable = chunk(size, [])

    expect([...chunkedIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyIterableArb)
    .filter(([size, { values }]) => values.length % size === 0),
])(
  `chunk returns an iterable containing chunks of the given size when the iterable's length is divisible by the chunk size`,
  ([size, { iterable, values }]) => {
    const chunkedIterable = chunk(size, iterable)

    expect(
      pipe(
        chunkedIterable,
        map(({ length }) => length),
        reduce(toArray()),
      ),
    ).toStrictEqual(
      pipe(repeat(size), take(values.length / size), reduce(toArray())),
    )
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyIterableArb)
    .filter(([size, { values }]) => values.length % size !== 0),
])(
  `chunk returns an iterable containing chunks of the given size except for the last chunk when the iterable's length is not divisible by the chunk size`,
  ([size, { iterable, values }]) => {
    const chunkedIterable = chunk(size, iterable)

    expect(
      pipe(
        chunkedIterable,
        map(({ length }) => length),
        reduce(toArray()),
      ),
    ).toStrictEqual([
      ...pipe(repeat(size), take(Math.trunc(values.length / size))),
      values.length % size,
    ])
  },
)

test.skip(`chunkAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), chunkAsync(2))).toExtend<
    AsyncIterable<number[]>
  >()

  // @ts-expect-error Not an integer literal.
  chunkAsync(2.4)

  // @ts-expect-error Not a non-negative integer.
  chunkAsync(-2)
})

test.prop([positiveIntegerArb, asyncIterableArb])(
  `chunkAsync returns a pure async iterable`,
  async (size, { iterable }) => {
    const chunkedIterable = chunkAsync(size, iterable)

    await expect(chunkedIterable).toBeAsyncIterable()
  },
)

test.prop([nonIntegerDoubleArb, asyncIterableArb])(
  `chunkAsync throws for a non-integer size`,
  (size, { iterable }) => {
    expect(() => chunkAsync(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([nonPositiveIntegerArb, asyncIterableArb])(
  `chunkAsync throws for a non-positive integer size`,
  (size, { iterable }) => {
    expect(() => chunkAsync(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([positiveIntegerArb, asyncIterableArb])(
  `chunkAsync returns an async iterable that flattens to contain the same values in the same order as the given async iterable`,
  async (size, { iterable, values }) => {
    const chunkedIterable = chunkAsync(size, iterable)

    await expect(
      pipe(chunkedIterable, flattenAsync, reduceAsync(toArray())),
    ).resolves.toStrictEqual(values)
  },
)

test.prop([positiveIntegerArb])(
  `chunkAsync returns an empty async iterable for an empty async iterable`,
  async size => {
    const chunkedIterable = chunkAsync(size, emptyAsync())

    await expect(reduceAsync(toArray(), chunkedIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
    .filter(([size, { values }]) => values.length % size === 0),
])(
  `chunkAsync returns an async iterable containing chunks of the given size when the async iterable's length is divisible by the chunk size`,
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkAsync(size, iterable)

    await expect(
      pipe(
        chunkedIterable,
        mapAsync(({ length }) => length),
        reduceAsync(toArray()),
      ),
    ).resolves.toStrictEqual(
      pipe(repeat(size), take(values.length / size), reduce(toArray())),
    )
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
    .filter(([size, { values }]) => values.length % size !== 0),
])(
  `chunkAsync returns an async iterable containing chunks of the given size except for the last chunk when the async iterable's length is not divisible by the chunk size`,
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkAsync(size, iterable)

    await expect(
      pipe(
        chunkedIterable,
        mapAsync(({ length }) => length),
        reduceAsync(toArray()),
      ),
    ).resolves.toStrictEqual([
      ...pipe(repeat(size), take(Math.trunc(values.length / size))),
      values.length % size,
    ])
  },
)

test.skip(`chunkConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), chunkConcur(2))).toExtend<
    ConcurIterable<number[]>
  >()

  // @ts-expect-error Not an integer literal.
  chunkConcur(2.4)

  // @ts-expect-error Not a non-negative integer.
  chunkConcur(-2)
})

test.prop([positiveIntegerArb, concurIterableArb])(
  `chunkConcur returns a concur iterable`,
  async (size, { iterable }) => {
    const chunkedIterable = chunkConcur(size, iterable)

    await expect(chunkedIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([nonIntegerDoubleArb, concurIterableArb])(
  `chunkConcur throws for a non-integer size`,
  (size, { iterable }) => {
    expect(() => chunkConcur(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([nonPositiveIntegerArb, concurIterableArb])(
  `chunkConcur throws for a non-positive integer size`,
  (size, { iterable }) => {
    expect(() => chunkConcur(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([positiveIntegerArb, concurIterableArb])(
  `chunkConcur returns a concur iterable that flattens to contain the same values as the given concur iterable`,
  async (size, { iterable, values }) => {
    const chunkedIterable = chunkConcur(size, iterable)

    await expect(
      pipe(chunkedIterable, flatMapConcur(asConcur), reduceConcur(toArray())),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([positiveIntegerArb])(
  `chunkConcur returns an empty concur iterable for an empty concur iterable`,
  async size => {
    const chunkedIterable = chunkConcur(size, emptyConcur())

    await expect(reduceConcur(toArray(), chunkedIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
    .filter(([size, { values }]) => values.length % size === 0),
])(
  `chunkConcur returns a concur iterable containing chunks of the given size when the concur iterable's length is divisible by the chunk size`,
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkConcur(size, iterable)

    await expect(
      pipe(
        chunkedIterable,
        mapConcur(({ length }) => length),
        reduceConcur(toArray()),
      ),
    ).resolves.toStrictEqual(
      pipe(repeat(size), take(values.length / size), reduce(toArray())),
    )
  },
)

test.prop([
  fc
    .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
    .filter(([size, { values }]) => values.length % size !== 0),
])(
  `chunkConcur returns a concur iterable containing chunks of the given size except for one chunk when the concur iterable's length is not divisible by the chunk size`,
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkConcur(size, iterable)

    await expect(
      pipe(
        chunkedIterable,
        mapConcur(({ length }) => length),
        reduceConcur(toArray()),
      ),
    ).resolves.toStrictEqual([
      ...pipe(repeat(size), take(Math.trunc(values.length / size))),
      values.length % size,
    ])
  },
)

test.prop([fc.tuple(positiveIntegerArb, nonEmptyConcurIterableArb)])(
  `chunkConcur returns a concur iterable as concurrent as the given concur iterable`,
  async ([size, { iterable }], scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(chunkConcur(size, iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

const smallPositiveIntegerArb = fc.integer({ min: 1, max: 100 })

test.skip(`window types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3, 4, 5], window(2))).toExtend<Iterable<number[]>>()
  expectTypeOf(pipe([1, 2, 3, 4, 5], window({ size: 2 }))).toExtend<
    Iterable<number[]>
  >()
  expectTypeOf(
    pipe([1, 2, 3, 4, 5], window({ size: 2, partialEnd: true })),
  ).toExtend<Iterable<number[]>>()
  expectTypeOf(
    pipe([1, 2, 3, 4, 5], window({ size: 2, partialStart: true })),
  ).toExtend<Iterable<number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      window({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toExtend<Iterable<number[]>>()

  // @ts-expect-error Not an integer literal.
  window(2.4)

  // @ts-expect-error Not an integer literal.
  window({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer.
  window(-2)

  // @ts-expect-error Not an integer literal.
  window({ size: -2 })
})

test.prop([smallPositiveIntegerArb, iterableArb])(
  `window returns a pure iterable`,
  (size, { iterable }) => {
    const windowedIterable = window(size, iterable)

    expect(windowedIterable).toBeIterable()
  },
)

test(`window partial`, () => {
  const windowedIterable = window(
    { size: 3, partialEnd: true },
    [1, 2, 3, 4, 5],
  )

  expect([...windowedIterable]).toStrictEqual([
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5],
    [5],
  ])

  const windowedIterable2 = window(
    { size: 10, partialEnd: true },
    [1, 2, 3, 4, 5],
  )

  expect([...windowedIterable2]).toStrictEqual([
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5],
    [3, 4, 5],
    [4, 5],
    [5],
  ])
})

const getWindowOptionsArb = (
  sizeArb: fc.Arbitrary<number>,
): fc.Arbitrary<{ size: number; options: WindowOptions }> =>
  fc.oneof(
    sizeArb.map(size => ({ size, options: size })),
    fc
      .record(
        { size: sizeArb, partialEnd: fc.boolean() },
        { requiredKeys: [`size`] },
      )
      .map(options => ({ size: options.size, options })),
  )

test.prop([getWindowOptionsArb(nonIntegerDoubleArb), iterableArb])(
  `window throws for a non-integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => window(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([getWindowOptionsArb(nonPositiveIntegerArb), iterableArb])(
  `window throws for a non-positive integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => window(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, iterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, iterable] as const,
    ),
])(
  `window returns an empty iterable when the given size is greater than the given iterable's length`,
  ([size, iterable]) => {
    const windowedIterable = window(size, iterable)

    expect([...windowedIterable]).toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, iterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, { iterable, values }] as const,
    ),
])(
  `window returns an iterable containing only partial windows when the given size is greater than the given iterable's length and partial is true`,
  ([size, { iterable, values }]) => {
    const windowedIterable = window({ size, partialEnd: true }, iterable)

    expect([...windowedIterable]).toStrictEqual(
      values.map((_, index) => values.slice(index)),
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [
          Math.max(1, size % (values.length + 1)),
          { iterable, values },
        ] as const,
    ),
])(
  `window returns an iterable containing windows of the given size for the given iterable`,
  ([size, { iterable, values }]) => {
    const windowedIterable = window(size, iterable)

    expect([...windowedIterable]).toStrictEqual(
      Array.from({ length: values.length - size + 1 }, (_, index) =>
        values.slice(index, index + size),
      ),
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [
          Math.max(1, size % (values.length + 1)),
          { iterable, values },
        ] as const,
    ),
])(
  `window returns an iterable containing windows of the given size and partial windows for the given iterable when partial is true`,
  ([size, { iterable, values }]) => {
    const windowedIterable = window({ size, partialEnd: true }, iterable)

    expect([...windowedIterable]).toStrictEqual(
      values.map((_, index) =>
        values.slice(index, Math.min(index + size, values.length)),
      ),
    )
  },
)

test.skip(`windowAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3, 4, 5]), windowAsync(2))).toExtend<
    AsyncIterable<number[]>
  >()
  expectTypeOf(
    pipe(asAsync([1, 2, 3, 4, 5]), windowAsync({ size: 2 })),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(asAsync([1, 2, 3, 4, 5]), windowAsync({ size: 2, partialEnd: true })),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3, 4, 5]),
      windowAsync({ size: 2, partialStart: true }),
    ),
  ).toExtend<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3, 4, 5]),
      windowAsync({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toExtend<AsyncIterable<number[]>>()

  // @ts-expect-error Not an integer literal.
  windowAsync(2.4)

  // @ts-expect-error Not an integer literal.
  windowAsync({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer.
  windowAsync(-2)

  // @ts-expect-error Not an integer literal.
  windowAsync({ size: -2 })
})

test.prop([smallPositiveIntegerArb, asyncIterableArb])(
  `windowAsync returns a pure async iterable`,
  async (size, { iterable }) => {
    const windowedIterable = windowAsync(size, iterable)

    await expect(windowedIterable).toBeAsyncIterable()
  },
)

test.prop([getWindowOptionsArb(nonIntegerDoubleArb), asyncIterableArb])(
  `windowAsync throws for a non-integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => windowAsync(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([getWindowOptionsArb(nonPositiveIntegerArb), asyncIterableArb])(
  `windowAsync throws for a non-positive integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => windowAsync(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, asyncIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, iterable] as const,
    ),
])(
  `windowAsync returns an empty async iterable when size is greater than the given async iterable's length`,
  async ([size, asyncIterable]) => {
    const windowedIterable = windowAsync(size, asyncIterable)

    await expect(reduceAsync(toArray(), windowedIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, asyncIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, { iterable, values }] as const,
    ),
])(
  `windowAsync returns an async iterable containing only partial windows when the given size is greater than the given async iterable's length and partial is true`,
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync({ size, partialEnd: true }, iterable)

    await expect(
      reduceAsync(toArray(), windowedIterable),
    ).resolves.toStrictEqual(values.map((_, index) => values.slice(index)))
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyAsyncIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [
          Math.max(1, size % (values.length + 1)),
          { iterable, values },
        ] as const,
    ),
])(
  `windowAsync returns an async iterable containing windows of the given size for the given async iterable`,
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync(size, iterable)

    await expect(
      reduceAsync(toArray(), windowedIterable),
    ).resolves.toStrictEqual(
      Array.from({ length: values.length - size + 1 }, (_, index) =>
        values.slice(index, index + size),
      ),
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyAsyncIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [
          Math.max(1, size % (values.length + 1)),
          { iterable, values },
        ] as const,
    ),
])(
  `windowAsync returns an async iterable containing windows of the given size and partial windows for the given async iterable when partial is true`,
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync({ size, partialEnd: true }, iterable)

    await expect(
      reduceAsync(toArray(), windowedIterable),
    ).resolves.toStrictEqual(
      values.map((_, index) =>
        values.slice(index, Math.min(index + size, values.length)),
      ),
    )
  },
)

test.skip(`windowConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3, 4, 5]), windowConcur(2))).toExtend<
    ConcurIterable<number[]>
  >()
  expectTypeOf(
    pipe(asConcur([1, 2, 3, 4, 5]), windowConcur({ size: 2 })),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialEnd: true }),
    ),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialStart: true }),
    ),
  ).toExtend<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toExtend<ConcurIterable<number[]>>()

  // @ts-expect-error Not an integer literal.
  windowConcur(2.4)

  // @ts-expect-error Not an integer literal.
  windowConcur({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer.
  windowConcur(-2)

  // @ts-expect-error Not an integer literal.
  windowConcur({ size: -2 })
})

test.prop([smallPositiveIntegerArb, concurIterableArb])(
  `windowConcur returns a concur iterable`,
  async (size, { iterable }) => {
    const windowedIterable = windowConcur(size, iterable)

    await expect(windowedIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([getWindowOptionsArb(nonIntegerDoubleArb), concurIterableArb])(
  `windowConcur throws for a non-integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => windowConcur(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

test.prop([getWindowOptionsArb(nonPositiveIntegerArb), concurIterableArb])(
  `windowConcur throws for a non-positive integer size`,
  ({ size, options }, { iterable }) => {
    expect(() => windowConcur(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, concurIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, iterable] as const,
    ),
])(
  `windowConcur returns an empty concur iterable when size is greater than the given concur iterable's length`,
  async ([size, iterable]) => {
    const windowedIterable = windowConcur(size, iterable)

    await expect(reduceConcur(toArray(), windowedIterable)).resolves.toBeEmpty()
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, concurIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [size + values.length, iterable] as const,
    ),
])(
  `windowConcur returns a concur iterable containing only partial windows when the given size is greater than the given concur iterable's length and partial is true`,
  async ([size, iterable], scheduler) => {
    const windowedIterable = windowConcur({ size, partialEnd: true }, iterable)

    const windows = await reduceConcur(toArray(), windowedIterable)
    const values = (await scheduler.report()).values()
    expect(windows).toStrictEqual(values.map((_, index) => values.slice(index)))
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyConcurIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [Math.max(1, size % (values.length + 1)), iterable] as const,
    ),
])(
  `windowConcur returns a concur iterable containing windows of the given size for the given concur iterable`,
  async ([size, iterable], scheduler) => {
    const windowedIterable = windowConcur(size, iterable)

    const windows = await reduceConcur(toArray(), windowedIterable)
    const values = (await scheduler.report()).values()
    expect(windows).toStrictEqual(
      Array.from({ length: values.length - size + 1 }, (_, index) =>
        values.slice(index, index + size),
      ),
    )
  },
)

test.prop([
  fc
    .tuple(smallPositiveIntegerArb, nonEmptyConcurIterableArb)
    .map(
      ([size, { iterable, values }]) =>
        [Math.max(1, size % (values.length + 1)), iterable] as const,
    ),
])(
  `windowConcur returns a concur iterable containing windows of the given size and partial windows for the given concur iterable when partial is true`,
  async ([size, iterable], scheduler) => {
    const windowedIterable = windowConcur({ size, partialEnd: true }, iterable)

    const windows = await reduceConcur(toArray(), windowedIterable)
    const values = (await scheduler.report()).values()
    expect(windows).toStrictEqual(
      values.map((_, index) =>
        values.slice(index, Math.min(index + size, values.length)),
      ),
    )
  },
)

test.skip(`concat types are correct`, () => {
  expectTypeOf(concat([1, 2, 3], [1, 2, 3], [1, 2, 3])).toExtend<
    Iterable<number>
  >()
})

test.prop([fc.array(iterableArb)])(
  `concat returns a pure iterable`,
  iterables => {
    const concatenatedIterable = concat(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect(concatenatedIterable).toBeIterable()
  },
)

test.prop([fc.array(iterableArb)])(
  `concat returns an iterable concatenated from the given iterables`,
  iterables => {
    const concatenatedIterable = concat(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect([...concatenatedIterable]).toStrictEqual(
      iterables.flatMap(({ values }) => values),
    )
  },
)

test(`concat returns an empty iterable for zero arguments`, () => {
  const iterable = concat()

  expect([...iterable]).toBeEmpty()
})

test.skip(`concatAsync types are correct`, () => {
  expectTypeOf(concatAsync([1, 2, 3], asAsync([1, 2, 3]), [1, 2, 3])).toExtend<
    AsyncIterable<number>
  >()
})

test.prop([fc.array(fc.oneof(iterableArb, asyncIterableArb))])(
  `concatAsync returns a pure async iterable`,
  async iterables => {
    const concatenatedIterable = concatAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(concatenatedIterable).toBeAsyncIterable()
  },
)

test.prop([fc.array(fc.oneof(iterableArb, asyncIterableArb))])(
  `concatAsync returns an async iterable concatenated from the given iterables`,
  async iterables => {
    const concatenatedIterable = concatAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(
      reduceAsync(toArray(), concatenatedIterable),
    ).resolves.toStrictEqual(iterables.flatMap(({ values }) => values))
  },
)

test(
  `concatAsync returns an empty async iterable for zero arguments`,
  autoAdvance(async () => {
    const asyncIterable = concatAsync()

    await expect(reduceAsync(toArray(), asyncIterable)).resolves.toBeEmpty()
  }),
)

test.skip(`concatConcur types are correct`, () => {
  expectTypeOf(
    concatConcur([1, 2, 3], asAsync([1, 2, 3]), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
])(`concatConcur returns a pure concur iterable`, async iterables => {
  const concatenatedIterable = concatConcur(
    ...iterables.map(({ iterable }) => iterable),
  )

  await expect(concatenatedIterable).toBeConcurIterable()
})

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
])(
  `concatConcur returns a concur iterable concatenated from the given iterables`,
  async iterables => {
    const concatenatedIterable = concatConcur(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(
      reduceConcur(toArray(), concatenatedIterable),
    ).resolves.toIncludeSameMembers(iterables.flatMap(({ values }) => values))
  },
)

test(
  `concatConcur returns an empty concur iterable for zero arguments`,
  autoAdvance(async () => {
    const concurIterable = concatConcur()

    await expect(reduceConcur(toArray(), concurIterable)).resolves.toBeEmpty()
  }),
)

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
])(
  `concatConcur returns a concur iterable as concurrent as the given iterables`,
  async (iterables, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(concatConcur(...iterables.map(({ iterable }) => iterable))),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

test.skip(`zip types are correct`, () => {
  expectTypeOf(zip([1, 2, 3], [`a`, `b`, `c`], [1, 2, 3])).toExtend<
    Iterable<[number, string, number]>
  >()
})

test.prop([fc.array(iterableArb)])(`zip returns a pure iterable`, iterables => {
  const zippedIterable = zip(...iterables.map(({ iterable }) => iterable))

  expect(zippedIterable).toBeIterable()
})

test.prop([fc.array(iterableArb, { minLength: 1 })])(
  `zip returns an iterable zipped from the given non-empty iterables`,
  iterables => {
    const zippedIterable = zip(...iterables.map(({ iterable }) => iterable))

    expect([...zippedIterable]).toStrictEqual(
      Array.from(
        { length: Math.min(...iterables.map(({ values }) => values.length)) },
        (_, index) => iterables.map(({ values }) => values[index]),
      ),
    )
  },
)

test(`zip returns an empty iterable for zero arguments`, () => {
  const iterable = zip()

  expect([...iterable]).toBeEmpty()
})

test.prop([fc.array(iterableArb)])(`zip is lazy`, iterables => {
  const counts = iterables.map(() => 0)

  const zippedIterable = zip(
    ...iterables.map(({ iterable }, index) =>
      each(() => counts[index]!++, iterable),
    ),
  )

  let expectedCount = 0
  expect(counts).toStrictEqual(iterables.map(() => expectedCount))
  forEach(() => {
    expectedCount++
    expect(counts).toStrictEqual(iterables.map(() => expectedCount))
  }, zippedIterable)
})

test.skip(`zipAsync types are correct`, () => {
  expectTypeOf(zipAsync([1, 2, 3], [`a`, `b`, `c`], [1, 2, 3])).toExtend<
    AsyncIterable<[number, string, number]>
  >()
  expectTypeOf(
    zipAsync(asAsync([1, 2, 3]), [`a`, `b`, `c`], [1, 2, 3]),
  ).toExtend<AsyncIterable<[number, string, number]>>()
  expectTypeOf(
    zipAsync(asAsync([1, 2, 3]), asAsync([`a`, `b`, `c`]), [1, 2, 3]),
  ).toExtend<AsyncIterable<[number, string, number]>>()
  expectTypeOf(
    zipAsync(asAsync([1, 2, 3]), asAsync([`a`, `b`, `c`]), asAsync([1, 2, 3])),
  ).toExtend<AsyncIterable<[number, string, number]>>()
})

test.prop([fc.array(fc.oneof(iterableArb, asyncIterableArb))])(
  `zipAsync returns a pure async iterable`,
  async iterables => {
    const zippedIterable = zipAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(zippedIterable).toBeAsyncIterable()
  },
)

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb), { minLength: 1 }),
])(
  `zipAsync returns an async iterable zipped from the given non-empty iterables`,
  async iterables => {
    const zippedIterable = zipAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(reduceAsync(toArray(), zippedIterable)).resolves.toStrictEqual(
      Array.from(
        { length: Math.min(...iterables.map(({ values }) => values.length)) },
        (_, index) => iterables.map(({ values }) => values[index]),
      ),
    )
  },
)

test(`zipAsync returns an empty async iterable for zero arguments`, async () => {
  const asyncIterable = zipAsync()

  await expect(reduceAsync(toArray(), asyncIterable)).resolves.toBeEmpty()
})

test.prop([fc.array(fc.oneof(iterableArb, asyncIterableArb))])(
  `zipAsync is lazy`,
  async iterables => {
    const counts = iterables.map(() => 0)

    const zippedIterable = zipAsync(
      ...iterables.map(({ iterable }, index) =>
        eachAsync(() => counts[index]!++, asAsync(iterable)),
      ),
    )

    let expectedCount = 0
    expect(counts).toStrictEqual(iterables.map(() => expectedCount))
    await forEachAsync(() => {
      expectedCount++
      expect(counts).toStrictEqual(iterables.map(() => expectedCount))
    }, zippedIterable)
  },
)

test.skip(`zipConcur types are correct`, () => {
  expectTypeOf(zipConcur([1, 2, 3], [`a`, `b`, `c`], [1, 2, 3])).toExtend<
    ConcurIterable<[number, string, number]>
  >()
  expectTypeOf(
    zipConcur([1, 2, 3], asAsync([`a`, `b`, `c`]), [1, 2, 3]),
  ).toExtend<ConcurIterable<[number, string, number]>>()
  expectTypeOf(
    zipConcur([1, 2, 3], asAsync([`a`, `b`, `c`]), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<[number, string, number]>>()
  expectTypeOf(
    zipConcur([1, 2, 3], asConcur([`a`, `b`, `c`]), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<[number, string, number]>>()
  expectTypeOf(
    zipConcur(
      asAsync([1, 2, 3]),
      asConcur([`a`, `b`, `c`]),
      asConcur([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, string, number]>>()
})

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
])(`zipConcur returns a concur iterable`, async iterables => {
  const zippedIterable = zipConcur(...iterables.map(({ iterable }) => iterable))

  await expect(zippedIterable).toBeConcurIterable({ pure: false })
})

test.prop([
  fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb), {
    minLength: 1,
  }),
])(
  `zipConcur returns a concur iterable zipped from the given non-empty iterables`,
  async iterables => {
    const zippedIterable = zipConcur(
      ...iterables.map(({ iterable }) => iterable),
    )

    const array = await reduceConcur(toArray(), zippedIterable)
    expect(array).toStrictEqual(
      Array.from(
        { length: Math.min(...iterables.map(({ values }) => values.length)) },
        (_, index) =>
          iterables.map(({ iterationOrder }) => iterationOrder[index]),
      ),
    )
  },
)

test(`zipConcur returns an empty async iterable for zero arguments`, async () => {
  const concurIterable = zipConcur()

  await expect(reduceConcur(toArray(), concurIterable)).resolves.toBeEmpty()
})
