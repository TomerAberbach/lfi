import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import autoAdvance from '../../test/auto-advance.ts'
import delay from '../../test/delay.ts'
import { fnArb } from '../../test/fast-check/fns.ts'
import {
  nonIntegerDoubleArb,
  nonPositiveIntegerArb,
} from '../../test/fast-check/numbers.ts'
import {
  asyncIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import {
  asAsync,
  cycle,
  cycleAsync,
  entries,
  generate,
  generateAsync,
  keys,
  pipe,
  rangeTo,
  rangeUntil,
  reduceAsync,
  repeat,
  take,
  takeAsync,
  toArray,
  values,
} from '../index.js'

const objectArb = fc.dictionary(fc.string(), fc.anything())
const mapArb = fc
  .array(fc.tuple(fc.anything(), fc.anything()))
  .map(values => new Map(values))
const setArb = fc.array(fc.anything()).map(values => new Set(values))

test.skip(`keys types are correct`, () => {
  const numberKeyObject: Record<number, number> = { 1: 2, 2: 3 }
  expectTypeOf([...keys(numberKeyObject)]).toExtend<number[]>()

  const stringKeyObject: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...keys(stringKeyObject)]).toExtend<string[]>()

  expectTypeOf([
    ...keys(
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ),
  ]).toExtend<number[]>()
})

test.prop([objectArb])(`keys returns a pure iterable for an object`, object => {
  const iterable = keys(object)

  expect(iterable).toBeIterable()
})

test.prop([objectArb])(
  `keys returns an iterable containing the keys of the given object`,
  object => {
    const iterable = keys(object)

    expect([...iterable]).toStrictEqual(Object.keys(object))
  },
)

test.prop([mapArb])(`keys returns a pure iterable for a map`, map => {
  const iterable = keys(map)

  expect(iterable).toBeIterable()
})

test.prop([mapArb])(
  `keys returns an iterable containing the keys of the given map`,
  map => {
    const iterable = keys(map)

    expect([...iterable]).toStrictEqual([...map.keys()])
  },
)

test.skip(`values types are correct`, () => {
  const object: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...values(object)]).toExtend<number[]>()

  expectTypeOf([
    ...values(
      new Map([
        [`a`, 2],
        [`b`, 4],
      ]),
    ),
  ]).toExtend<number[]>()
  expectTypeOf([...values(new Set([1, 2]))]).toExtend<number[]>()
})

test.prop([objectArb])(
  `values returns a pure iterable for an object`,
  object => {
    const iterable = values(object)

    expect(iterable).toBeIterable()
  },
)

test.prop([objectArb])(
  `values returns an iterable containing the values of the given object`,
  object => {
    const iterable = values(object)

    expect([...iterable]).toStrictEqual(Object.values(object))
  },
)

test.prop([fc.oneof(mapArb, setArb)])(
  `values returns a pure iterable for a map or set`,
  object => {
    const iterable = values(object)

    expect(iterable).toBeIterable()
  },
)

test.prop([fc.oneof(mapArb, setArb)])(
  `values returns an iterable containing the values of the given map or set`,
  object => {
    const iterable = values(object)

    expect([...iterable]).toStrictEqual([...object.values()])
  },
)

test.skip(`entries types are correct`, () => {
  const numberKeyObject: Record<number, number> = { 1: 2, 2: 3 }
  expectTypeOf([...entries(numberKeyObject)]).toExtend<[number, number][]>()

  const stringKeyObject: Record<string, number> = { a: 2, b: 3 }
  expectTypeOf([...entries(stringKeyObject)]).toExtend<[string, number][]>()

  expectTypeOf([
    ...entries(
      new Map([
        [1, 2],
        [3, 4],
      ]),
    ),
  ]).toExtend<[number, number][]>()
})

test.prop([objectArb])(
  `entries returns a pure iterable for an object`,
  object => {
    const iterable = entries(object)

    expect(iterable).toBeIterable()
  },
)

test.prop([objectArb])(
  `entries returns an iterable containing the entries of the given object`,
  object => {
    const iterable = entries(object)

    expect([...iterable]).toStrictEqual(Object.entries(object))
  },
)

test.prop([mapArb])(`entries returns a pure iterable for a map`, map => {
  const iterable = entries(map)

  expect(iterable).toBeIterable()
})

test.prop([mapArb])(
  `entries returns an iterable containing the entries of the given map`,
  map => {
    const iterable = entries(map)

    expect([...iterable]).toStrictEqual([...map.entries()])
  },
)

test.skip(`generate types are correct`, () => {
  expectTypeOf(generate(a => a + 1, 0)).toExtend<Iterable<number>>()
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
  expectTypeOf(generateAsync(a => a + 1, 0)).toExtend<AsyncIterable<number>>()
  expectTypeOf(generateAsync(a => Promise.resolve(a + 1), 0)).toExtend<
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

    expect(
      await pipe(asyncIterable, takeAsync(10), reduceAsync(toArray())),
    ).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  }),
)

test.skip(`repeat types are correct`, () => {
  expectTypeOf(repeat(2)).toExtend<Iterable<number>>()
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
  expectTypeOf(cycle([1, 2, 3])).toExtend<Iterable<number>>()
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
      // eslint-disable-next-line typescript/no-base-to-string
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
  expectTypeOf(cycleAsync(asAsync([1, 2, 3]))).toExtend<AsyncIterable<number>>()
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
      // eslint-disable-next-line typescript/no-base-to-string
      `\`asyncIterable\` must be a pure iterable: ${String(impureIterable)}`,
    )
  },
)

test.prop([nonEmptyAsyncIterableArb])(
  `cycleAsync returns an async iterable that repeats the given async iterable`,
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
  expectTypeOf(rangeUntil(0, 5)).toExtend<Iterable<number>>()
  expectTypeOf(rangeUntil(0, 5).step(2)).toExtend<Iterable<number>>()

  // @ts-expect-error Non-integer literals.
  rangeUntil(0.2, 5)

  // @ts-expect-error Non-integer literals.
  rangeUntil(0.2, 5.2)

  // @ts-expect-error A non-integer literal.
  rangeUntil(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeUntil(0, decimal)).toExtend<Iterable<number>>()
  expectTypeOf(rangeUntil(decimal, 5)).toExtend<Iterable<number>>()
})

test.prop([reasonableIntegerArb, reasonableIntegerArb])(
  `rangeUntil returns a pure iterable`,
  (start, end) => {
    const range = rangeUntil(start, end)

    expect(range).toBeIterable()
  },
)

test.prop([nonIntegerDoubleArb, reasonableIntegerArb])(
  `rangeUntil throws for a non-integer start`,
  (start, end) => {
    expect(() => rangeUntil(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

test.prop([reasonableIntegerArb, nonIntegerDoubleArb])(
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

test.prop([reasonableIntegerArb, reasonableIntegerArb, nonIntegerDoubleArb])(
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
  expectTypeOf(rangeTo(0, 5)).toExtend<Iterable<number>>()
  expectTypeOf(rangeTo(0, 5).step(2)).toExtend<Iterable<number>>()

  // @ts-expect-error Non-integer literals.
  rangeTo(0.2, 5)

  // @ts-expect-error Non-integer literals.
  rangeTo(0.2, 5.2)

  // @ts-expect-error A non-integer literal.
  rangeTo(0, 5.2)

  const decimal = 2.4 as number

  expectTypeOf(rangeTo(0, decimal)).toExtend<Iterable<number>>()
  expectTypeOf(rangeTo(decimal, 5)).toExtend<Iterable<number>>()
})

test.prop([reasonableIntegerArb, reasonableIntegerArb])(
  `rangeTo returns a pure iterable`,
  (start, end) => {
    const range = rangeTo(start, end)

    expect(range).toBeIterable()
  },
)

test.prop([nonIntegerDoubleArb, reasonableIntegerArb])(
  `rangeTo throws for a non-integer start`,
  (start, end) => {
    expect(() => rangeTo(start, end)).toThrowWithMessage(
      Error,
      `\`start\` must be an integer: ${start}`,
    )
  },
)

test.prop([reasonableIntegerArb, nonIntegerDoubleArb])(
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

test.prop([reasonableIntegerArb, reasonableIntegerArb, nonIntegerDoubleArb])(
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
