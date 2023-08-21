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
import {
  asAsync,
  cycle,
  cycleAsync,
  generate,
  generateAsync,
  pipe,
  rangeTo,
  rangeUntil,
  reduceAsync,
  repeat,
  take,
  takeAsync,
  toArray,
} from '../../src/index.js'
import autoAdvance from '../helpers/auto-advance.js'
import delay from '../helpers/delay.js'
import { fnArb } from '../helpers/fast-check/fn.js'
import {
  nonPositiveIntegerArb,
  nonSafeIntegerDoubleArb,
} from '../helpers/fast-check/integer.js'
import {
  asyncIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'

test.skip(`generate types are correct`, () => {
  expectTypeOf(generate(a => a + 1, 0)).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `generate returns a pure iterable`,
  [fnArb, fc.anything()],
  (fn, seed) => {
    const iterable = generate(fn, seed)

    expect(take(10, iterable)).toBeIterable()
  },
)

test(`generate concrete example`, () => {
  const iterable = generate(value => value + 1, 0)

  expect([...take(10, iterable)]).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

test.skip(`generateAsync types are correct`, () => {
  expectTypeOf(generateAsync(a => a + 1, 0)).toMatchTypeOf<
    AsyncIterable<number>
  >()
  expectTypeOf(generateAsync(a => Promise.resolve(a + 1), 0)).toMatchTypeOf<
    AsyncIterable<number>
  >()
})

testProp(
  `generateAsync returns an pure async iterable`,
  [fnArb, fc.anything()],
  async (fn, seed) => {
    const asyncIterable = generateAsync(fn, seed)

    await expect(takeAsync(10, asyncIterable)).toBeAsyncIterable()
  },
)

test(
  `generateAsync concrete example`,
  autoAdvance(async () => {
    const asyncIterable = generateAsync(async value => {
      await delay(1)
      return value + 1
    }, 0)

    expect(
      await pipe(asyncIterable, takeAsync(10), reduceAsync(toArray())),
    ).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  }),
)

test.skip(`repeat types are correct`, () => {
  expectTypeOf(repeat(2)).toMatchTypeOf<Iterable<number>>()
})

testProp(`repeat returns a pure iterable`, [fc.anything()], value => {
  const iterable = repeat(value)

  expect(take(10, iterable)).toBeIterable()
})

testProp(
  `repeat returns an iterable that repeats the same value forever`,
  [fc.anything()],
  value => {
    const iterable = repeat(value)

    expect([...take(100, iterable)]).toStrictEqual(
      Array.from({ length: 100 }, () => value),
    )
  },
)

test(`repeat concrete example`, () => {
  const iterable = repeat(1)

  expect([...take(10, iterable)]).toStrictEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
})

test.skip(`cycle types are correct`, () => {
  expectTypeOf(cycle([1, 2, 3])).toMatchTypeOf<Iterable<number>>()
})

testProp(`cycle returns an iterable`, [iterableArb], ({ iterable }) => {
  const cyclingIterable = cycle(iterable)

  expect(take(10, cyclingIterable)).toBeIterable()
})

testProp(
  `cycle throws for an impure iterable`,
  [iterableArb],
  ({ iterable }) => {
    const iterator = iterable[Symbol.iterator]()
    const impureIterable = {
      [Symbol.iterator]: (): Iterator<unknown> => iterator,
    }

    expect(() => cycle(impureIterable)).toThrowWithMessage(
      Error,
      `\`iterable\` must be a pure iterable: ${impureIterable}`,
    )
  },
)

testProp(
  `cycle returns an iterable that repeats the given iterable`,
  [nonEmptyIterableArb],
  ({ iterable, values }) => {
    const cyclingIterable = cycle(iterable)

    expect([...take(100, cyclingIterable)]).toStrictEqual([
      ...Array.from(
        { length: Math.trunc(100 / values.length) },
        () => values,
      ).flat(),
      ...values.slice(0, 100 % values.length),
    ])
  },
)

test(`cycle concrete example`, () => {
  const iterable = [1, 2, 3]

  const cyclingIterable = cycle(iterable)

  expect([...take(10, cyclingIterable)]).toStrictEqual([
    1, 2, 3, 1, 2, 3, 1, 2, 3, 1,
  ])
})

test.skip(`cycleAsync types are correct`, () => {
  expectTypeOf(cycleAsync(asAsync([1, 2, 3]))).toMatchTypeOf<
    AsyncIterable<number>
  >()
})

testProp(
  `cycleAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const cyclingIterable = cycleAsync(iterable)

    await expect(takeAsync(10, cyclingIterable)).toBeAsyncIterable()
  },
)

testProp(
  `cycleAsync throws for an impure async iterable`,
  [asyncIterableArb],
  ({ iterable }) => {
    const iterator = iterable[Symbol.asyncIterator]()
    const impureIterable = {
      [Symbol.asyncIterator]: (): AsyncIterator<unknown> => iterator,
    }

    expect(() => cycleAsync(impureIterable)).toThrowWithMessage(
      Error,
      `\`asyncIterable\` must be a pure iterable: ${impureIterable}`,
    )
  },
)

testProp(
  `cycleAsync returns an async iterable that repeats the given async iterable`,
  [nonEmptyAsyncIterableArb],
  async ({ iterable, values }) => {
    const cyclingIterable = cycleAsync(iterable)

    expect(
      await pipe(cyclingIterable, takeAsync(100), reduceAsync(toArray())),
    ).toStrictEqual([
      ...Array.from(
        { length: Math.trunc(100 / values.length) },
        () => values,
      ).flat(),
      ...values.slice(0, 100 % values.length),
    ])
  },
)

test(
  `cycleAsync concrete example`,
  autoAdvance(async () => {
    const asyncIterable = asAsync([1, 2, 3])

    const cyclingIterable = cycleAsync(asyncIterable)

    expect(
      await pipe(cyclingIterable, takeAsync(10), reduceAsync(toArray())),
    ).toStrictEqual([1, 2, 3, 1, 2, 3, 1, 2, 3, 1])
  }),
)

const reasonableIntegerArb = fc.integer({ min: -100, max: 100 })
const stepIntegerArb = fc.integer({ min: 1, max: 100 })

const ascendingIntervalArb = fc
  .tuple(reasonableIntegerArb, reasonableIntegerArb)
  .map(([a, b]): [number, number] => (a < b ? [a, b] : [b, a]))
const descendingIntervalArb = fc
  .tuple(reasonableIntegerArb, reasonableIntegerArb)
  .map(([a, b]): [number, number] => (a > b ? [a, b] : [b, a]))

test.skip(`rangeUntil types are correct`, () => {
  expectTypeOf(rangeUntil(0, 5)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeUntil(0, 5).step(2)).toMatchTypeOf<Iterable<number>>()

  // @ts-expect-error Non-integer literals
  rangeUntil(0.2, 5)

  // @ts-expect-error Non-integer literals
  rangeUntil(0.2, 5.2)

  // @ts-expect-error A non-integer literal
  rangeUntil(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeUntil(0, decimal)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeUntil(decimal, 5)).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `rangeUntil returns a pure iterable`,
  [reasonableIntegerArb, reasonableIntegerArb],
  (start, end) => {
    const range = rangeUntil(start, end)

    expect(range).toBeIterable()
  },
)

testProp(
  `rangeUntil throws for a non-integer start`,
  [nonSafeIntegerDoubleArb, reasonableIntegerArb],
  (start, end) => {
    expect(() => rangeUntil(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

testProp(
  `rangeUntil throws for a non-integer end`,
  [reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (start, end) => {
    expect(() => rangeUntil(start, end)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

testProp(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start <= end`,
  [ascendingIntervalArb],
  ([start, end]) => {
    const range = rangeUntil(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: end - start }, (_, index) => start + index),
    )
  },
)

testProp(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start >= end`,
  [descendingIntervalArb],
  ([start, end]) => {
    const range = rangeUntil(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: start - end }, (_, index) => start - index),
    )
  },
)

testProp(
  `rangeUntil's step function returns a pure iterable`,
  [reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb],
  (start, end, step) => {
    const range = rangeUntil(start, end).step(step)

    expect(range).toBeIterable()
  },
)

testProp(
  `rangeUntil's step function throws for a non-integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (start, end, step) => {
    const range = rangeUntil(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be an integer: ${step}`,
    )
  },
)

testProp(
  `rangeUntil's step function throws for a non-positive integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb],
  (start, end, step) => {
    const range = rangeUntil(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be a positive integer: ${step}`,
    )
  },
)

testProp(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start <= end`,
  [ascendingIntervalArb, stepIntegerArb],
  ([start, end], step) => {
    const range = rangeUntil(start, end).step(step)

    expect([...range]).toStrictEqual(
      Array.from(
        { length: Math.ceil((end - start) / step) },
        (_, index) => start + index * step,
      ),
    )
  },
)

testProp(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start >= end`,
  [descendingIntervalArb, stepIntegerArb],
  ([start, end], step) => {
    const range = rangeUntil(start, end).step(step)

    expect([...range]).toStrictEqual(
      Array.from(
        { length: Math.ceil((start - end) / step) },
        (_, index) => start - index * step,
      ),
    )
  },
)

test.skip(`rangeTo types are correct`, () => {
  expectTypeOf(rangeTo(0, 5)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeTo(0, 5).step(2)).toMatchTypeOf<Iterable<number>>()

  // @ts-expect-error Non-integer literals
  rangeTo(0.2, 5)

  // @ts-expect-error Non-integer literals
  rangeTo(0.2, 5.2)

  // @ts-expect-error A non-integer literal
  rangeTo(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeTo(0, decimal)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeTo(decimal, 5)).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `rangeTo returns a pure iterable`,
  [reasonableIntegerArb, reasonableIntegerArb],
  (start, end) => {
    const range = rangeTo(start, end)

    expect(range).toBeIterable()
  },
)

testProp(
  `rangeTo throws for a non-integer start`,
  [nonSafeIntegerDoubleArb, reasonableIntegerArb],
  (start, end) => {
    expect(() => rangeTo(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

testProp(
  `rangeTo throws for a non-integer end`,
  [reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (start, end) => {
    expect(() => rangeTo(start, end)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

testProp(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start <= end`,
  [ascendingIntervalArb],
  ([start, end]) => {
    const range = rangeTo(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: end - start + 1 }, (_, index) => start + index),
    )
  },
)

testProp(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start >= end`,
  [descendingIntervalArb],
  ([start, end]) => {
    const range = rangeTo(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: start - end + 1 }, (_, index) => start - index),
    )
  },
)

testProp(
  `rangeTo's step function returns a pure iterable`,
  [reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb],
  (start, end, step) => {
    const range = rangeTo(start, end).step(step)

    expect(range).toBeIterable()
  },
)

testProp(
  `rangeTo's step function throws for a non-integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonSafeIntegerDoubleArb],
  (start, end, step) => {
    const range = rangeTo(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be an integer: ${step}`,
    )
  },
)

testProp(
  `rangeTo's step function throws for a non-positive integer step`,
  [reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb],
  (start, end, step) => {
    const range = rangeTo(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be a positive integer: ${step}`,
    )
  },
)

testProp(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start <= end`,
  [ascendingIntervalArb, stepIntegerArb],
  ([start, end], step) => {
    const range = rangeTo(start, end).step(step)

    expect([...range]).toStrictEqual(
      Array.from(
        { length: Math.ceil((end - start + 1) / step) },
        (_, index) => start + index * step,
      ),
    )
  },
)

testProp(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start >= end`,
  [descendingIntervalArb, stepIntegerArb],
  ([start, end], step) => {
    const range = rangeTo(start, end).step(step)

    expect([...range]).toStrictEqual(
      Array.from(
        { length: Math.ceil((start - end + 1) / step) },
        (_, index) => start - index * step,
      ),
    )
  },
)
