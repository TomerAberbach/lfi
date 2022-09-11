/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { expectTypeOf, fc } from 'tomer'
import type { ConcurIterable, WindowOptions } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  chunk,
  chunkAsync,
  chunkConcur,
  consumeConcur,
  drop,
  dropAsync,
  dropConcur,
  dropWhile,
  dropWhileAsync,
  dropWhileConcur,
  emptyAsync,
  emptyConcur,
  first,
  firstAsync,
  firstConcur,
  flatMapConcur,
  flatten,
  flattenAsync,
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
} from '../../src/index.js'
import autoAdvance from '../helpers/auto-advance.js'
import { asyncFnArb, fnArb } from '../helpers/fast-check/fn.js'
import {
  negativeIntegerArb,
  nonNegativeIntegerArb,
  nonPositiveIntegerArb,
  nonSafeIntegerDoubleArb,
  positiveIntegerArb,
} from '../helpers/fast-check/integer.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`dropWhile types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      dropWhile(x => x < 3),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `dropWhile returns a pure iterable`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const subIterable = dropWhile(fn, iterable)

    expect(subIterable).toBeIterable()
  },
)

testProp(
  `dropWhile returns the given iterable when the given predicate never returns a truthy value`,
  [iterableArb],
  ({ iterable, values }) => {
    const subIterable = dropWhile(() => false, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

testProp(
  `dropWhile returns an empty iterable when the given predicate always returns a truthy value`,
  [iterableArb],
  ({ iterable }) => {
    const subIterable = dropWhile(() => true, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

testProp(
  `dropWhile returns the given iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(iterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
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
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      dropWhileAsync(x => Promise.resolve(x < 3)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `dropWhileAsync returns a pure async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const subIterable = dropWhileAsync(asyncFn, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

testProp(
  `dropWhileAsync returns the given async iterable when the given predicate never returns a truthy value`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const subIterable = dropWhileAsync(() => false, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(values)
  },
)

testProp(
  `dropWhileAsync returns an empty async iterable when the given predicate always returns a truthy value`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const subIterable = dropWhileAsync(() => true, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `dropWhileAsync returns the given async iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(asyncIterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
  async ([{ iterable, values }, stopDroppingIndex]) => {
    let index = 0
    const subIterable = dropWhileAsync(
      () => index++ !== stopDroppingIndex,
      iterable,
    )

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(
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
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      dropWhileConcur(x => Promise.resolve(x < 3)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `dropWhileConcur returns a concur iterable`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const subIterable = dropWhileConcur(asyncFn, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `dropWhileConcur returns the given concur iterable when the given predicate never returns a truthy value`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const subIterable = dropWhileConcur(() => false, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `dropWhileConcur returns an empty concur iterable when the given predicate always returns a truthy value`,
  [concurIterableArb],
  async ({ iterable }) => {
    const subIterable = dropWhileConcur(() => true, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `dropWhileConcur returns the given concur iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(concurIterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
  async ([{ iterable }, stopDroppingIndex], scheduler) => {
    let index = 0
    const subIterable = dropWhileConcur(
      () => index++ !== stopDroppingIndex,
      iterable,
    )

    expect(await reduceConcur(toArray(), subIterable)).toStrictEqual(
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
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `takeWhile returns a pure iterable`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const subIterable = takeWhile(fn, iterable)

    expect(subIterable).toBeIterable()
  },
)

testProp(
  `takeWhile returns the given iterable when the given predicate always returns a truthy value`,
  [iterableArb],
  ({ iterable, values }) => {
    const subIterable = takeWhile(() => true, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

testProp(
  `takeWhile returns an empty iterable when the given predicate never returns a truthy value`,
  [iterableArb],
  ({ iterable }) => {
    const subIterable = takeWhile(() => false, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

testProp(
  `takeWhile returns the given iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(iterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
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
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      takeWhileAsync(x => Promise.resolve(x < 3)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `takeWhileAsync returns a pure async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const subIterable = takeWhileAsync(asyncFn, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

testProp(
  `takeWhileAsync returns the given async iterable when the given predicate always returns a truthy value`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const subIterable = takeWhileAsync(() => true, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(values)
  },
)

testProp(
  `takeWhileAsync returns an empty async iterable when the given predicate never returns a truthy value`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const subIterable = takeWhileAsync(() => false, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `takeWhileAsync returns the given async iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(asyncIterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
  async ([{ iterable, values }, stopTakingIndex]) => {
    let index = 0
    const subIterable = takeWhileAsync(
      () => index++ !== stopTakingIndex,
      iterable,
    )

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(
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
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      takeWhileConcur(x => Promise.resolve(x < 3)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `takeWhileConcur returns a concur iterable`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const subIterable = takeWhileConcur(asyncFn, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `takeWhileConcur returns the given concur iterable when the given predicate always returns a truthy value`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const subIterable = takeWhileConcur(() => true, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `takeWhileConcur returns an empty concur iterable when the given predicate never returns a truthy value`,
  [concurIterableArb],
  async ({ iterable }) => {
    const subIterable = takeWhileConcur(() => false, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `takeWhileConcur returns the given concur iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(concurIterableArb, nonNegativeIntegerArb)
      .map(
        ([{ iterable, values }, index]) =>
          [{ iterable, values }, index % values.length] as const,
      ),
  ],
  async ([{ iterable }, stopTakingIndex], scheduler) => {
    let index = 0
    const subIterable = takeWhileConcur(
      () => index++ !== stopTakingIndex,
      iterable,
    )

    expect(await reduceConcur(toArray(), subIterable)).toStrictEqual(
      (await scheduler.report()).values().slice(0, stopTakingIndex),
    )
  },
)

test.skip(`drop types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], drop(2))).toMatchTypeOf<Iterable<number>>()

  // @ts-expect-error Not an integer literal
  drop(2.4)

  // @ts-expect-error Not a non-negative integer
  drop(-2)
})

testProp(
  `drop returns a pure iterable`,
  [nonNegativeIntegerArb, iterableArb],
  (count, { iterable }) => {
    const subIterable = drop(count, iterable)

    expect(subIterable).toBeIterable()
  },
)

testProp(
  `drop throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (count, { iterable }) => {
    expect(() => drop(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `drop throws for a negative integer count`,
  [negativeIntegerArb, iterableArb],
  (count, { iterable }) => {
    expect(() => drop(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `drop returns the given iterable for zero`,
  [iterableArb],
  ({ iterable, values }) => {
    const subIterable = drop(0, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

testProp(
  `drop returns an empty iterable for greater than or equal to the given iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, iterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, iterable] as const,
      ),
  ],
  ([count, iterable]) => {
    const subIterable = drop(count, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

testProp(
  `drop drops the given number of elements from the start of the given iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  ([count, { iterable, values }]) => {
    const subIterable = drop(count, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(count))
  },
)

test.skip(`dropAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), dropAsync(2))).toMatchTypeOf<
    AsyncIterable<number>
  >()

  // @ts-expect-error Not an integer literal
  dropAsync(2.4)

  // @ts-expect-error Not a non-negative integer
  dropAsync(-2)
})

testProp(
  `dropAsync returns a pure async iterable`,
  [nonNegativeIntegerArb, asyncIterableArb],
  async (count, { iterable }) => {
    const subIterable = dropAsync(count, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

testProp(
  `dropAsync throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (count, { iterable }) => {
    expect(() => dropAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `dropAsync throws for a negative integer count`,
  [negativeIntegerArb, asyncIterableArb],
  (count, { iterable }) => {
    expect(() => dropAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `dropAsync returns the given async iterable for zero`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const subIterable = dropAsync(0, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(values)
  },
)

testProp(
  `dropAsync returns an empty async iterable for greater than or equal to the given async iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, asyncIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, iterable] as const,
      ),
  ],
  async ([count, iterable]) => {
    const subIterable = dropAsync(count, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `dropAsync drops the given number of elements from the start of the given async iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable, values }]) => {
    const subIterable = dropAsync(count, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(
      values.slice(count),
    )
  },
)

test.skip(`dropConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), dropConcur(2))).toMatchTypeOf<
    ConcurIterable<number>
  >()

  // @ts-expect-error Not an integer literal
  dropConcur(2.4)

  // @ts-expect-error Not a non-negative integer
  dropConcur(-2)
})

testProp(
  `dropConcur returns a concur iterable`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (count, { iterable }) => {
    const subIterable = dropConcur(count, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `dropConcur throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (count, { iterable }) => {
    expect(() => dropConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `dropConcur throws for a negative integer count`,
  [negativeIntegerArb, concurIterableArb],
  (count, { iterable }) => {
    expect(() => dropConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `dropConcur returns the given concur iterable for zero`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const subIterable = dropConcur(0, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `dropConcur returns an empty concur iterable for greater than or equal to the given concur iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, concurIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, iterable] as const,
      ),
  ],
  async ([count, iterable]) => {
    const subIterable = dropConcur(count, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `dropConcur drops the given number of elements from the start of the given concur iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable }], scheduler) => {
    const subIterable = dropConcur(count, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toStrictEqual(
      (await scheduler.report()).values().slice(count),
    )
  },
)

test.skip(`take types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], take(2))).toMatchTypeOf<Iterable<number>>()

  // @ts-expect-error Not an integer literal
  take(2.4)

  // @ts-expect-error Not a non-negative integer
  take(-2)
})

testProp(
  `take returns a pure iterable`,
  [nonNegativeIntegerArb, iterableArb],
  (count, { iterable }) => {
    const subIterable = take(count, iterable)

    expect(subIterable).toBeIterable()
  },
)

testProp(
  `take throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (count, { iterable }) => {
    expect(() => take(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `take throws for a negative integer count`,
  [negativeIntegerArb, iterableArb],
  (count, { iterable }) => {
    expect(() => take(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `take returns the given iterable for greater than or equal to the given iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, iterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, { iterable, values }] as const,
      ),
  ],
  ([count, { iterable, values }]) => {
    const subIterable = take(count, iterable)

    expect([...subIterable]).toStrictEqual(values)
  },
)

testProp(
  `take returns an empty iterable for zero`,
  [iterableArb],
  ({ iterable }) => {
    const subIterable = take(0, iterable)

    expect([...subIterable]).toBeEmpty()
  },
)

testProp(
  `take takes the given number of elements from the start of the given iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  ([count, { iterable, values }]) => {
    const subIterable = take(count, iterable)

    expect([...subIterable]).toStrictEqual(values.slice(0, count))
  },
)

test.skip(`takeAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), takeAsync(2))).toMatchTypeOf<
    AsyncIterable<number>
  >()

  // @ts-expect-error Not an integer literal
  takeAsync(2.4)

  // @ts-expect-error Not a non-negative integer
  takeAsync(-2)
})

testProp(
  `takeAsync returns a pure async iterable`,
  [nonNegativeIntegerArb, asyncIterableArb],
  async (count, { iterable }) => {
    const subIterable = takeAsync(count, iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

testProp(
  `takeAsync throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (count, { iterable }) => {
    expect(() => takeAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `takeAsync throws for a negative integer count`,
  [negativeIntegerArb, asyncIterableArb],
  (count, { iterable }) => {
    expect(() => takeAsync(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `takeAsync returns the given async iterable for greater than or equal to the given async iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, asyncIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable, values }]) => {
    const subIterable = takeAsync(count, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(values)
  },
)

testProp(
  `takeAsync returns an empty async iterable for zero`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const subIterable = takeAsync(0, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `takeAsync takes the given number of elements from the start of the given async iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable, values }]) => {
    const subIterable = takeAsync(count, iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual(
      values.slice(0, count),
    )
  },
)

test.skip(`takeConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), takeConcur(2))).toMatchTypeOf<
    ConcurIterable<number>
  >()

  // @ts-expect-error Not an integer literal
  takeConcur(2.4)

  // @ts-expect-error Not a non-negative integer
  takeConcur(-2)
})

testProp(
  `takeConcur returns a concur iterable`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (count, { iterable }) => {
    const subIterable = takeConcur(count, iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `takeConcur throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (count, { iterable }) => {
    expect(() => takeConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be an integer: ${count}`,
    )
  },
)

testProp(
  `takeConcur throws for a negative integer count`,
  [negativeIntegerArb, concurIterableArb],
  (count, { iterable }) => {
    expect(() => takeConcur(count, iterable)).toThrowWithMessage(
      Error,
      `\`count\` must be a non-negative integer: ${count}`,
    )
  },
)

testProp(
  `takeConcur returns the given concur iterable for greater than or equal to the given concur iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, concurIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count + values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable, values }]) => {
    const subIterable = takeConcur(count, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `takeConcur returns an empty concur iterable for zero`,
  [concurIterableArb],
  async ({ iterable }) => {
    const subIterable = takeConcur(0, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
  },
)

testProp(
  `takeConcur takes the given number of elements from the start of the given concur iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
      .map(
        ([count, { iterable, values }]) =>
          [count % values.length, { iterable, values }] as const,
      ),
  ],
  async ([count, { iterable }], scheduler) => {
    const subIterable = takeConcur(count, iterable)

    expect(await reduceConcur(toArray(), subIterable)).toStrictEqual(
      (await scheduler.report()).values().slice(0, count),
    )
  },
)

test.skip(`first types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], first, get)).toMatchTypeOf<number>()
})

testProp(`first returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const subIterable = first(iterable)

  expect(subIterable).toBeIterable()
})

test(`first returns an empty iterable for an empty iterable`, () => {
  const subIterable = first([])

  expect([...subIterable]).toBeEmpty()
})

testProp(
  `first returns an iterable containing the first element of the given iterable for a non-empty iterable`,
  [nonEmptyIterableArb],
  ({ iterable, values }) => {
    const subIterable = first(iterable)

    expect([...subIterable]).toStrictEqual([values[0]])
  },
)

test.skip(`firstAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), firstAsync, getAsync)).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `firstAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const subIterable = firstAsync(iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test(
  `firstAsync returns an empty async iterable for an empty async iterable`,
  autoAdvance(async () => {
    const subIterable = firstAsync(emptyAsync)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  }),
)

testProp(
  `firstAsync returns an async iterable containing the first element of the given async iterable for a non-empty async iterable`,
  [nonEmptyAsyncIterableArb],
  async ({ iterable, values }) => {
    const subIterable = firstAsync(iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual([values[0]])
  },
)

test.skip(`firstConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), firstConcur, getConcur)).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `firstConcur returns a concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const subIterable = firstConcur(iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test(`firstConcur returns an empty concur iterable for an empty concur iterable`, async () => {
  const subIterable = firstConcur(emptyConcur)

  expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
})

testProp(
  `firstConcur returns a concur iterable containing the first element of the given concur iterable for a non-empty concur iterable`,
  [nonEmptyConcurIterableArb],
  async ({ iterable }, scheduler) => {
    const subIterable = firstConcur(iterable)

    const array = await reduceConcur(toArray(), subIterable)
    expect(array).toBeArrayOfSize(1)
    expect(array).toIncludeAnyMembers((await scheduler.report()).min().values)
  },
)

test.skip(`last types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], last, get)).toMatchTypeOf<number>()
})

testProp(`last returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const subIterable = last(iterable)

  expect(subIterable).toBeIterable()
})

test(`last returns an empty iterable for an empty iterable`, () => {
  const subIterable = last([])

  expect([...subIterable]).toBeEmpty()
})

testProp(
  `last returns an iterable containing the last element of the given iterable for a non-empty iterable`,
  [nonEmptyIterableArb],
  ({ iterable, values }) => {
    const subIterable = last(iterable)

    expect([...subIterable]).toStrictEqual([values[values.length - 1]])
  },
)

test.skip(`lastAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), lastAsync, getAsync)).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `lastAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const subIterable = lastAsync(iterable)

    await expect(subIterable).toBeAsyncIterable()
  },
)

test(
  `lastAsync returns an empty async iterable for an empty async iterable`,
  autoAdvance(async () => {
    const subIterable = lastAsync(emptyAsync)

    expect(await reduceAsync(toArray(), subIterable)).toBeEmpty()
  }),
)

testProp(
  `lastAsync returns an async iterable containing the last element of the given async iterable for a non-empty async iterable`,
  [nonEmptyAsyncIterableArb],
  async ({ iterable, values }) => {
    const subIterable = lastAsync(iterable)

    expect(await reduceAsync(toArray(), subIterable)).toStrictEqual([
      values[values.length - 1],
    ])
  },
)

test.skip(`lastConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), lastConcur, getConcur)).toMatchTypeOf<
    Promise<number>
  >()
})

testProp(
  `lastConcur returns a concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const subIterable = lastConcur(iterable)

    await expect(subIterable).toBeConcurIterable({ pure: false })
  },
)

test(
  `lastConcur returns an empty concur iterable for an empty concur iterable`,
  autoAdvance(async () => {
    const subIterable = lastConcur(emptyConcur)

    expect(await reduceConcur(toArray(), subIterable)).toBeEmpty()
  }),
)

testProp(
  `lastConcur returns a concur iterable containing the last element of the given concur iterable for a non-empty concur iterable`,
  [nonEmptyConcurIterableArb],
  async ({ iterable }, scheduler) => {
    const subIterable = lastConcur(iterable)

    const array = await reduceConcur(toArray(), subIterable)
    expect(array).toBeArrayOfSize(1)
    expect(array).toIncludeAnyMembers((await scheduler.report()).max().values)
  },
)

test.skip(`chunk types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], chunk(2))).toMatchTypeOf<Iterable<number[]>>()

  // @ts-expect-error Not an integer literal
  chunk(2.4)

  // @ts-expect-error Not a non-negative integer
  chunk(-2)
})

testProp(
  `chunk returns a pure iterable`,
  [positiveIntegerArb, iterableArb],
  (size, { iterable }) => {
    const chunkedIterable = chunk(size, iterable)

    expect(chunkedIterable).toBeIterable()
  },
)

testProp(
  `chunk throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (size, { iterable }) => {
    expect(() => chunk(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `chunk throws for a non-positive integer size`,
  [nonPositiveIntegerArb, iterableArb],
  (size, { iterable }) => {
    expect(() => chunk(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `chunk returns an iterable that flattens to contain the same values in the same order as the given iterable`,
  [positiveIntegerArb, iterableArb],
  (size, { iterable, values }) => {
    const chunkedIterable = chunk(size, iterable)

    expect([...flatten(chunkedIterable)]).toStrictEqual(values)
  },
)

testProp(
  `chunk returns an empty iterable for an empty iterable`,
  [positiveIntegerArb],
  size => {
    const chunkedIterable = chunk(size, [])

    expect([...chunkedIterable]).toBeEmpty()
  },
)

testProp(
  `chunk returns an iterable containing chunks of the given size when the iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyIterableArb)
      .filter(([size, { values }]) => values.length % size === 0),
  ],
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

testProp(
  `chunk returns an iterable containing chunks of the given size except for the last chunk when the iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyIterableArb)
      .filter(([size, { values }]) => values.length % size !== 0),
  ],
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
  expectTypeOf(pipe(asAsync([1, 2, 3]), chunkAsync(2))).toMatchTypeOf<
    AsyncIterable<number[]>
  >()

  // @ts-expect-error Not an integer literal
  chunkAsync(2.4)

  // @ts-expect-error Not a non-negative integer
  chunkAsync(-2)
})

testProp(
  `chunkAsync returns a pure async iterable`,
  [positiveIntegerArb, asyncIterableArb],
  async (size, { iterable }) => {
    const chunkedIterable = chunkAsync(size, iterable)

    await expect(chunkedIterable).toBeAsyncIterable()
  },
)

testProp(
  `chunkAsync throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (size, { iterable }) => {
    expect(() => chunkAsync(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `chunkAsync throws for a non-positive integer size`,
  [nonPositiveIntegerArb, asyncIterableArb],
  (size, { iterable }) => {
    expect(() => chunkAsync(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `chunkAsync returns an async iterable that flattens to contain the same values in the same order as the given async iterable`,
  [positiveIntegerArb, asyncIterableArb],
  async (size, { iterable, values }) => {
    const chunkedIterable = chunkAsync(size, iterable)

    expect(
      await pipe(chunkedIterable, flattenAsync, reduceAsync(toArray())),
    ).toStrictEqual(values)
  },
)

testProp(
  `chunkAsync returns an empty async iterable for an empty async iterable`,
  [positiveIntegerArb],
  async size => {
    const chunkedIterable = chunkAsync(size, emptyAsync)

    expect(await reduceAsync(toArray(), chunkedIterable)).toBeEmpty()
  },
)

testProp(
  `chunkAsync returns an async iterable containing chunks of the given size when the async iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
      .filter(([size, { values }]) => values.length % size === 0),
  ],
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkAsync(size, iterable)

    expect(
      await pipe(
        chunkedIterable,
        mapAsync(({ length }) => length),
        reduceAsync(toArray()),
      ),
    ).toStrictEqual(
      pipe(repeat(size), take(values.length / size), reduce(toArray())),
    )
  },
)

testProp(
  `chunkAsync returns an async iterable containing chunks of the given size except for the last chunk when the async iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
      .filter(([size, { values }]) => values.length % size !== 0),
  ],
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkAsync(size, iterable)

    expect(
      await pipe(
        chunkedIterable,
        mapAsync(({ length }) => length),
        reduceAsync(toArray()),
      ),
    ).toStrictEqual([
      ...pipe(repeat(size), take(Math.trunc(values.length / size))),
      values.length % size,
    ])
  },
)

test.skip(`chunkConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), chunkConcur(2))).toMatchTypeOf<
    ConcurIterable<number[]>
  >()

  // @ts-expect-error Not an integer literal
  chunkConcur(2.4)

  // @ts-expect-error Not a non-negative integer
  chunkConcur(-2)
})

testProp(
  `chunkConcur returns a concur iterable`,
  [positiveIntegerArb, concurIterableArb],
  async (size, { iterable }) => {
    const chunkedIterable = chunkConcur(size, iterable)

    await expect(chunkedIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `chunkConcur throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (size, { iterable }) => {
    expect(() => chunkConcur(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `chunkConcur throws for a non-positive integer size`,
  [nonPositiveIntegerArb, concurIterableArb],
  (size, { iterable }) => {
    expect(() => chunkConcur(size, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `chunkConcur returns a concur iterable that flattens to contain the same values as the given concur iterable`,
  [positiveIntegerArb, concurIterableArb],
  async (size, { iterable, values }) => {
    const chunkedIterable = chunkConcur(size, iterable)

    expect(
      await pipe(
        chunkedIterable,
        flatMapConcur(asConcur),
        reduceConcur(toArray()),
      ),
    ).toIncludeSameMembers(values)
  },
)

testProp(
  `chunkConcur returns an empty concur iterable for an empty concur iterable`,
  [positiveIntegerArb],
  async size => {
    const chunkedIterable = chunkConcur(size, emptyConcur)

    expect(await reduceConcur(toArray(), chunkedIterable)).toBeEmpty()
  },
)

testProp(
  `chunkConcur returns a concur iterable containing chunks of the given size when the concur iterable's length is divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
      .filter(([size, { values }]) => values.length % size === 0),
  ],
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkConcur(size, iterable)

    expect(
      await pipe(
        chunkedIterable,
        mapConcur(({ length }) => length),
        reduceConcur(toArray()),
      ),
    ).toStrictEqual(
      pipe(repeat(size), take(values.length / size), reduce(toArray())),
    )
  },
)

testProp(
  `chunkConcur returns a concur iterable containing chunks of the given size except for one chunk when the concur iterable's length is not divisible by the chunk size`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
      .filter(([size, { values }]) => values.length % size !== 0),
  ],
  async ([size, { iterable, values }]) => {
    const chunkedIterable = chunkConcur(size, iterable)

    expect(
      await pipe(
        chunkedIterable,
        mapConcur(({ length }) => length),
        reduceConcur(toArray()),
      ),
    ).toStrictEqual([
      ...pipe(repeat(size), take(Math.trunc(values.length / size))),
      values.length % size,
    ])
  },
)

testProp(
  `chunkConcur returns a concur iterable as concurrent as the given concur iterable`,
  [fc.tuple(positiveIntegerArb, nonEmptyConcurIterableArb)],
  async ([size, { iterable }], scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(chunkConcur(size, iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

const smallPositiveIntegerArb = fc.integer({ min: 1, max: 100 })

test.skip(`window types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3, 4, 5], window(2))).toMatchTypeOf<
    Iterable<number[]>
  >()
  expectTypeOf(pipe([1, 2, 3, 4, 5], window({ size: 2 }))).toMatchTypeOf<
    Iterable<number[]>
  >()
  expectTypeOf(
    pipe([1, 2, 3, 4, 5], window({ size: 2, partialEnd: true })),
  ).toMatchTypeOf<Iterable<number[]>>()
  expectTypeOf(
    pipe([1, 2, 3, 4, 5], window({ size: 2, partialStart: true })),
  ).toMatchTypeOf<Iterable<number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      window({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toMatchTypeOf<Iterable<number[]>>()

  // @ts-expect-error Not an integer literal
  window(2.4)

  // @ts-expect-error Not an integer literal
  window({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer
  window(-2)

  // @ts-expect-error Not an integer literal
  window({ size: -2 })
})

testProp(
  `window returns a pure iterable`,
  [smallPositiveIntegerArb, iterableArb],
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

testProp(
  `window throws for a non-integer size`,
  [getWindowOptionsArb(nonSafeIntegerDoubleArb), iterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => window(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `window throws for a non-positive integer size`,
  [getWindowOptionsArb(nonPositiveIntegerArb), iterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => window(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `window returns an empty iterable when the given size is greater than the given iterable's length`,
  [
    fc
      .tuple(smallPositiveIntegerArb, iterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, iterable] as const,
      ),
  ],
  ([size, iterable]) => {
    const windowedIterable = window(size, iterable)

    expect([...windowedIterable]).toBeEmpty()
  },
)

testProp(
  `window returns an iterable containing only partial windows when the given size is greater than the given iterable's length and partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, iterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, { iterable, values }] as const,
      ),
  ],
  ([size, { iterable, values }]) => {
    const windowedIterable = window({ size, partialEnd: true }, iterable)

    expect([...windowedIterable]).toStrictEqual(
      values.map((_, index) => values.slice(index)),
    )
  },
)

testProp(
  `window returns an iterable containing windows of the given size for the given iterable`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [
            Math.max(1, size % (values.length + 1)),
            { iterable, values },
          ] as const,
      ),
  ],
  ([size, { iterable, values }]) => {
    const windowedIterable = window(size, iterable)

    expect([...windowedIterable]).toStrictEqual(
      Array.from({ length: values.length - size + 1 }, (_, index) =>
        values.slice(index, index + size),
      ),
    )
  },
)

testProp(
  `window returns an iterable containing windows of the given size and partial windows for the given iterable when partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [
            Math.max(1, size % (values.length + 1)),
            { iterable, values },
          ] as const,
      ),
  ],
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
  expectTypeOf(pipe(asAsync([1, 2, 3, 4, 5]), windowAsync(2))).toMatchTypeOf<
    AsyncIterable<number[]>
  >()
  expectTypeOf(
    pipe(asAsync([1, 2, 3, 4, 5]), windowAsync({ size: 2 })),
  ).toMatchTypeOf<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(asAsync([1, 2, 3, 4, 5]), windowAsync({ size: 2, partialEnd: true })),
  ).toMatchTypeOf<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3, 4, 5]),
      windowAsync({ size: 2, partialStart: true }),
    ),
  ).toMatchTypeOf<AsyncIterable<number[]>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3, 4, 5]),
      windowAsync({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toMatchTypeOf<AsyncIterable<number[]>>()

  // @ts-expect-error Not an integer literal
  windowAsync(2.4)

  // @ts-expect-error Not an integer literal
  windowAsync({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer
  windowAsync(-2)

  // @ts-expect-error Not an integer literal
  windowAsync({ size: -2 })
})

testProp(
  `windowAsync returns a pure async iterable`,
  [smallPositiveIntegerArb, asyncIterableArb],
  async (size, { iterable }) => {
    const windowedIterable = windowAsync(size, iterable)

    await expect(windowedIterable).toBeAsyncIterable()
  },
)

testProp(
  `windowAsync throws for a non-integer size`,
  [getWindowOptionsArb(nonSafeIntegerDoubleArb), asyncIterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => windowAsync(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `windowAsync throws for a non-positive integer size`,
  [getWindowOptionsArb(nonPositiveIntegerArb), asyncIterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => windowAsync(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `windowAsync returns an empty async iterable when size is greater than the given async iterable's length`,
  [
    fc
      .tuple(smallPositiveIntegerArb, asyncIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, iterable] as const,
      ),
  ],
  async ([size, asyncIterable]) => {
    const windowedIterable = windowAsync(size, asyncIterable)

    expect(await reduceAsync(toArray(), windowedIterable)).toBeEmpty()
  },
)

testProp(
  `windowAsync returns an async iterable containing only partial windows when the given size is greater than the given async iterable's length and partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, asyncIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, { iterable, values }] as const,
      ),
  ],
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync({ size, partialEnd: true }, iterable)

    expect(await reduceAsync(toArray(), windowedIterable)).toStrictEqual(
      values.map((_, index) => values.slice(index)),
    )
  },
)

testProp(
  `windowAsync returns an async iterable containing windows of the given size for the given async iterable`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyAsyncIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [
            Math.max(1, size % (values.length + 1)),
            { iterable, values },
          ] as const,
      ),
  ],
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync(size, iterable)

    expect(await reduceAsync(toArray(), windowedIterable)).toStrictEqual(
      Array.from({ length: values.length - size + 1 }, (_, index) =>
        values.slice(index, index + size),
      ),
    )
  },
)

testProp(
  `windowAsync returns an async iterable containing windows of the given size and partial windows for the given async iterable when partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyAsyncIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [
            Math.max(1, size % (values.length + 1)),
            { iterable, values },
          ] as const,
      ),
  ],
  async ([size, { iterable, values }]) => {
    const windowedIterable = windowAsync({ size, partialEnd: true }, iterable)

    expect(await reduceAsync(toArray(), windowedIterable)).toStrictEqual(
      values.map((_, index) =>
        values.slice(index, Math.min(index + size, values.length)),
      ),
    )
  },
)

test.skip(`windowConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3, 4, 5]), windowConcur(2))).toMatchTypeOf<
    ConcurIterable<number[]>
  >()
  expectTypeOf(
    pipe(asConcur([1, 2, 3, 4, 5]), windowConcur({ size: 2 })),
  ).toMatchTypeOf<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialEnd: true }),
    ),
  ).toMatchTypeOf<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialStart: true }),
    ),
  ).toMatchTypeOf<ConcurIterable<number[]>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3, 4, 5]),
      windowConcur({ size: 2, partialStart: true, partialEnd: true }),
    ),
  ).toMatchTypeOf<ConcurIterable<number[]>>()

  // @ts-expect-error Not an integer literal
  windowConcur(2.4)

  // @ts-expect-error Not an integer literal
  windowConcur({ size: 2.4 })

  // @ts-expect-error Not a non-negative integer
  windowConcur(-2)

  // @ts-expect-error Not an integer literal
  windowConcur({ size: -2 })
})

testProp(
  `windowConcur returns a concur iterable`,
  [smallPositiveIntegerArb, concurIterableArb],
  async (size, { iterable }) => {
    const windowedIterable = windowConcur(size, iterable)

    await expect(windowedIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `windowConcur throws for a non-integer size`,
  [getWindowOptionsArb(nonSafeIntegerDoubleArb), concurIterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => windowConcur(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be an integer: ${size}`,
    )
  },
)

testProp(
  `windowConcur throws for a non-positive integer size`,
  [getWindowOptionsArb(nonPositiveIntegerArb), concurIterableArb],
  ({ size, options }, { iterable }) => {
    expect(() => windowConcur(options, iterable)).toThrowWithMessage(
      Error,
      `\`size\` must be a positive integer: ${size}`,
    )
  },
)

testProp(
  `windowConcur returns an empty concur iterable when size is greater than the given concur iterable's length`,
  [
    fc
      .tuple(smallPositiveIntegerArb, concurIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, iterable] as const,
      ),
  ],
  async ([size, iterable]) => {
    const windowedIterable = windowConcur(size, iterable)

    expect(await reduceConcur(toArray(), windowedIterable)).toBeEmpty()
  },
)

testProp(
  `windowConcur returns a concur iterable containing only partial windows when the given size is greater than the given concur iterable's length and partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, concurIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [size + values.length, iterable] as const,
      ),
  ],
  async ([size, iterable], scheduler) => {
    const windowedIterable = windowConcur({ size, partialEnd: true }, iterable)

    const windows = await reduceConcur(toArray(), windowedIterable)
    const values = (await scheduler.report()).values()
    expect(windows).toStrictEqual(values.map((_, index) => values.slice(index)))
  },
)

testProp(
  `windowConcur returns a concur iterable containing windows of the given size for the given concur iterable`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyConcurIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [Math.max(1, size % (values.length + 1)), iterable] as const,
      ),
  ],
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

testProp(
  `windowConcur returns a concur iterable containing windows of the given size and partial windows for the given concur iterable when partial is true`,
  [
    fc
      .tuple(smallPositiveIntegerArb, nonEmptyConcurIterableArb)
      .map(
        ([size, { iterable, values }]) =>
          [Math.max(1, size % (values.length + 1)), iterable] as const,
      ),
  ],
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
