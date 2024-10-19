import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
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
import { test } from '../helpers/fast-check/test-prop.js'

test.skip(`generate types are correct`, () => {
  expectTypeOf(generate(a => a + 1, 0)).toMatchTypeOf<Iterable<number>>()
})

test.prop([fnArb, fc.anything()])(
  `generate returns a pure iterable`,
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

test.prop([fnArb, fc.anything()])(
  `generateAsync returns an pure async iterable`,
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

    await expect(
      pipe(asyncIterable, takeAsync(10), reduceAsync(toArray())),
    ).resolves.toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  }),
)

test.skip(`repeat types are correct`, () => {
  expectTypeOf(repeat(2)).toMatchTypeOf<Iterable<number>>()
})

test.prop([fc.anything()])(`repeat returns a pure iterable`, value => {
  const iterable = repeat(value)

  expect(take(10, iterable)).toBeIterable()
})

test.prop([fc.anything()])(
  `repeat returns an iterable that repeats the same value forever`,
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

test.prop([iterableArb])(`cycle returns an iterable`, ({ iterable }) => {
  const cyclingIterable = cycle(iterable)

  expect(take(10, cyclingIterable)).toBeIterable()
})

test.prop([iterableArb])(
  `cycle throws for an impure iterable`,
  ({ iterable }) => {
    const iterator = iterable[Symbol.iterator]()
    const impureIterable = {
      [Symbol.iterator]: (): Iterator<unknown> => iterator,
    }

    expect(() => cycle(impureIterable)).toThrowWithMessage(
      Error,
      `\`iterable\` must be a pure iterable: ${String(impureIterable)}`,
    )
  },
)

test.prop([nonEmptyIterableArb])(
  `cycle returns an iterable that repeats the given iterable`,
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

test.prop([asyncIterableArb])(
  `cycleAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const cyclingIterable = cycleAsync(iterable)

    await expect(takeAsync(10, cyclingIterable)).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `cycleAsync throws for an impure async iterable`,
  ({ iterable }) => {
    const iterator = iterable[Symbol.asyncIterator]()
    const impureIterable = {
      [Symbol.asyncIterator]: (): AsyncIterator<unknown> => iterator,
    }

    expect(() => cycleAsync(impureIterable)).toThrowWithMessage(
      Error,
      `\`asyncIterable\` must be a pure iterable: ${String(impureIterable)}`,
    )
  },
)

test.prop([nonEmptyAsyncIterableArb])(
  `cycleAsync returns an async iterable that repeats the given async iterable`,
  async ({ iterable, values }) => {
    const cyclingIterable = cycleAsync(iterable)

    await expect(
      pipe(cyclingIterable, takeAsync(100), reduceAsync(toArray())),
    ).resolves.toStrictEqual([
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

    await expect(
      pipe(cyclingIterable, takeAsync(10), reduceAsync(toArray())),
    ).resolves.toStrictEqual([1, 2, 3, 1, 2, 3, 1, 2, 3, 1])
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

  // @ts-expect-error Non-integer literals.
  rangeUntil(0.2, 5)

  // @ts-expect-error Non-integer literals.
  rangeUntil(0.2, 5.2)

  // @ts-expect-error A non-integer literal.
  rangeUntil(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeUntil(0, decimal)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeUntil(decimal, 5)).toMatchTypeOf<Iterable<number>>()
})

test.prop([reasonableIntegerArb, reasonableIntegerArb])(
  `rangeUntil returns a pure iterable`,
  (start, end) => {
    const range = rangeUntil(start, end)

    expect(range).toBeIterable()
  },
)

test.prop([nonSafeIntegerDoubleArb, reasonableIntegerArb])(
  `rangeUntil throws for a non-integer start`,
  (start, end) => {
    expect(() => rangeUntil(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

test.prop([reasonableIntegerArb, nonSafeIntegerDoubleArb])(
  `rangeUntil throws for a non-integer end`,
  (start, end) => {
    expect(() => rangeUntil(start, end)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

test.prop([ascendingIntervalArb])(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start <= end`,
  ([start, end]) => {
    const range = rangeUntil(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: end - start }, (_, index) => start + index),
    )
  },
)

test.prop([descendingIntervalArb])(
  `rangeUntil returns an iterable that iterates from the given start (inclusive) to the given end (exclusive) for start >= end`,
  ([start, end]) => {
    const range = rangeUntil(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: start - end }, (_, index) => start - index),
    )
  },
)

test.prop([reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb])(
  `rangeUntil's step function returns a pure iterable`,
  (start, end, step) => {
    const range = rangeUntil(start, end).step(step)

    expect(range).toBeIterable()
  },
)

test.prop([
  reasonableIntegerArb,
  reasonableIntegerArb,
  nonSafeIntegerDoubleArb,
])(
  `rangeUntil's step function throws for a non-integer step`,
  (start, end, step) => {
    const range = rangeUntil(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be an integer: ${step}`,
    )
  },
)

test.prop([reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb])(
  `rangeUntil's step function throws for a non-positive integer step`,
  (start, end, step) => {
    const range = rangeUntil(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be a positive integer: ${step}`,
    )
  },
)

test.prop([ascendingIntervalArb, stepIntegerArb])(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start <= end`,
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

test.prop([descendingIntervalArb, stepIntegerArb])(
  `rangeUntil's step function returns a new rangeUntil iterable that iterates with the given step for start >= end`,
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

  // @ts-expect-error Non-integer literals.
  rangeTo(0.2, 5)

  // @ts-expect-error Non-integer literals.
  rangeTo(0.2, 5.2)

  // @ts-expect-error A non-integer literal.
  rangeTo(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeTo(0, decimal)).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(rangeTo(decimal, 5)).toMatchTypeOf<Iterable<number>>()
})

test.prop([reasonableIntegerArb, reasonableIntegerArb])(
  `rangeTo returns a pure iterable`,
  (start, end) => {
    const range = rangeTo(start, end)

    expect(range).toBeIterable()
  },
)

test.prop([nonSafeIntegerDoubleArb, reasonableIntegerArb])(
  `rangeTo throws for a non-integer start`,
  (start, end) => {
    expect(() => rangeTo(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

test.prop([reasonableIntegerArb, nonSafeIntegerDoubleArb])(
  `rangeTo throws for a non-integer end`,
  (start, end) => {
    expect(() => rangeTo(start, end)).toThrowWithMessage(
      Error,
      `\`end\` must be an integer: ${end}`,
    )
  },
)

test.prop([ascendingIntervalArb])(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start <= end`,
  ([start, end]) => {
    const range = rangeTo(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: end - start + 1 }, (_, index) => start + index),
    )
  },
)

test.prop([descendingIntervalArb])(
  `rangeTo returns an iterable that iterates from the given start (inclusive) to the given end (inclusive) for start >= end`,
  ([start, end]) => {
    const range = rangeTo(start, end)

    expect([...range]).toStrictEqual(
      Array.from({ length: start - end + 1 }, (_, index) => start - index),
    )
  },
)

test.prop([reasonableIntegerArb, reasonableIntegerArb, stepIntegerArb])(
  `rangeTo's step function returns a pure iterable`,
  (start, end, step) => {
    const range = rangeTo(start, end).step(step)

    expect(range).toBeIterable()
  },
)

test.prop([
  reasonableIntegerArb,
  reasonableIntegerArb,
  nonSafeIntegerDoubleArb,
])(
  `rangeTo's step function throws for a non-integer step`,
  (start, end, step) => {
    const range = rangeTo(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be an integer: ${step}`,
    )
  },
)

test.prop([reasonableIntegerArb, reasonableIntegerArb, nonPositiveIntegerArb])(
  `rangeTo's step function throws for a non-positive integer step`,
  (start, end, step) => {
    const range = rangeTo(start, end)

    expect(() => range.step(step)).toThrowWithMessage(
      Error,
      `\`step\` must be a positive integer: ${step}`,
    )
  },
)

test.prop([ascendingIntervalArb, stepIntegerArb])(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start <= end`,
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

test.prop([descendingIntervalArb, stepIntegerArb])(
  `rangeTo's step function returns a new rangeTo iterable that iterates with the given step for start >= end`,
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
