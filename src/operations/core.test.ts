import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import withElapsed from '../../test/with-elapsed.ts'
import delay from '../../test/delay.ts'
import { fnArb } from '../../test/fast-check/fns.ts'
import autoAdvance from '../../test/auto-advance.ts'
import {
  asAsync,
  asConcur,
  compose,
  consumeConcur,
  curry,
  empty,
  emptyAsync,
  emptyConcur,
  opaque,
  opaqueAsync,
  opaqueConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../index.js'
import type { ConcurIterable } from '../index.js'

const fnAndArgsArb = fc
  .tuple(
    fc.func(fc.anything()),
    fc.array(fc.anything(), { minLength: 1, maxLength: 10 }),
  )
  .map(
    ([fn, array]) =>
      [
        Object.defineProperty(fn, `length`, {
          value: array.length,
          enumerable: false,
          writable: false,
        }),
        array,
      ] as const,
  )

test.skip(`curry types are correct`, () => {
  const fn = (a: number, b: string, c: boolean): string => `${a}${b}${c}`
  const curriedFn = curry(fn)

  expectTypeOf(curriedFn(1)(``)(true)).toExtend<string>()
  expectTypeOf(curriedFn(1, ``)(true)).toExtend<string>()
  expectTypeOf(curriedFn(1, ``, true)).toExtend<string>()
  expectTypeOf(curriedFn(1)(``, true)).toExtend<string>()
})

test.prop([fnAndArgsArb])(
  `curry does not modify the given function`,
  ([fn, args]) => {
    const resultBeforeCurry = fn(...args)

    curry(fn)

    const resultAfterCurry = fn(...args)
    expect(resultAfterCurry).toStrictEqual(resultBeforeCurry)
  },
)

test.prop([fnAndArgsArb])(
  `curry returns a curried version of the given function if its length is greater than zero`,
  ([fn, inputs]) => {
    const curried = curry(fn)

    for (const partition of partitions(inputs)) {
      const returned = partition.reduce<(...args: unknown[]) => unknown>(
        (acc, inputs) => acc(...inputs) as (...args: unknown[]) => unknown,
        curried,
      )

      expect(returned).toStrictEqual(fn(...inputs))
    }
  },
)

const partitions = <Value>(array: Value[]): Iterable<Value[][]> => ({
  *[Symbol.iterator](): Iterator<Value[][]> {
    if (array.length === 0) {
      yield []
      return
    }

    for (let i = 0; i < array.length; i++) {
      const start = array.slice(0, i + 1)
      const end = array.slice(i + 1)

      for (const partition of partitions(end)) {
        yield [start, ...partition]
      }
    }
  },
})

test.prop([
  fc
    .tuple(
      fc.func(fc.anything()),
      fc.nat().map(n => -n),
    )
    .map(([fn, length]) =>
      Object.defineProperty(fn, `length`, {
        value: length,
        enumerable: false,
        writable: false,
      }),
    ),
])(
  `curry returns the original function if its length is less than or equal to zero`,
  fn => {
    const curried = curry(fn)

    expect(curried).toBe(fn)
  },
)

test.prop([fnAndArgsArb])(`curry is idempotent`, ([fn, inputs]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  expect(curried(...inputs)).toStrictEqual(doubleCurried(...inputs))
})

test.prop([
  fc.tuple(fnArb, fc.string(), fc.nat()).map(([fn, name, length]) =>
    Object.defineProperties(fn, {
      name: { value: name, enumerable: false, writable: false },
      length: { value: length, enumerable: false, writable: false },
    }),
  ),
])(
  `curry returns a function with the same name and length as the given function`,
  fn => {
    const curried = curry(fn)

    expect(curried.name).toBe(fn.name)
    expect(curried).toHaveLength(fn.length)
  },
)

test.skip(`pipe types are correct`, () => {
  expectTypeOf(pipe(2)).toExtend<number>()
  expectTypeOf(pipe(2, String)).toExtend<string>()
  expectTypeOf(pipe(2, String, Boolean)).toExtend<boolean>()
})

test.prop([fc.anything()])(
  `pipe returns the given value for a single argument`,
  value => {
    const piped = pipe(value)

    expect(piped).toBe(value)
  },
)

test.prop([fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })])(
  `pipe pipes`,
  (value, [firstFn, ...otherFns]) => {
    expect(
      (pipe as (...args: unknown[]) => unknown)(value, firstFn, ...otherFns),
    ).toBe(
      (pipe as (...args: unknown[]) => unknown)(firstFn!(value), ...otherFns),
    )
  },
)

test.skip(`compose types are correct`, () => {
  expectTypeOf(compose(String)).toExtend<(a: any) => string>()
  expectTypeOf(compose(String, Boolean)).toExtend<(a: any) => boolean>()
})

test.prop([fc.anything()])(
  `compose returns the identity function for no arguments`,
  value => {
    const fn = compose()

    expect(fn(value)).toBe(value)
  },
)

test.prop([fc.anything(), fc.array(fc.func(fc.anything()), { minLength: 1 })])(
  `compose composes`,
  (value, [firstFn, ...otherFns]) => {
    expect(
      (compose as (...args: unknown[]) => (arg: unknown) => unknown)(
        firstFn,
        ...otherFns,
      )(value),
    ).toBe(
      (compose as (...args: unknown[]) => (arg: unknown) => unknown)(
        ...otherFns,
      )(firstFn!(value)),
    )
  },
)

test.skip(`asAsync types are correct`, () => {
  expectTypeOf(asAsync([1, 2, 3])).toExtend<AsyncIterable<number>>()
  expectTypeOf(asAsync([1, 2, 3] as Iterable<number>)).toExtend<
    AsyncIterable<number>
  >()
  expectTypeOf(asAsync(asAsync([`a`, `b`, `c`]))).toExtend<
    AsyncIterable<string>
  >()
  expectTypeOf(asAsync(asConcur([`a`, `b`, `c`]))).toExtend<
    AsyncIterable<string>
  >()
})

test.prop([fc.oneof(iterableArb, asyncIterableArb)])(
  `asAsync returns a pure async iterable for non-concur iterables`,
  async ({ iterable }) => {
    const asyncIterable = asAsync(iterable)

    await expect(asyncIterable).toBeAsyncIterable()
  },
)

test.prop([fc.oneof(iterableArb, asyncIterableArb)])(
  `asAsync returns an async iterable containing the same values in the same order as the given iterable or async iterable`,
  async ({ iterable, values }) => {
    const asyncIterable = asAsync(iterable)

    await expect(reduceAsync(toArray(), asyncIterable)).resolves.toStrictEqual(
      values,
    )
  },
)

test.prop([concurIterableArb])(
  `asAsync returns an async iterable containing the same values as the given concur iterable`,
  async ({ iterable, values }) => {
    const asyncIterable = asAsync(iterable)

    await expect(
      reduceAsync(toArray(), asyncIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test(
  `asAsync handles throwing concur iterable`,
  autoAdvance(async () => {
    const concurIterable: ConcurIterable<number> = async apply => {
      await delay(1)
      await apply(1)

      await delay(1)
      await apply(2)

      await delay(1)
      throw new Error(`BOOM!`)
    }

    const asyncIterable = asAsync(concurIterable)

    const values: number[] = []
    await expect(
      (async () => {
        for await (const value of asyncIterable) {
          values.push(value)
        }
      })(),
    ).rejects.toStrictEqual(new Error(`BOOM!`))
    expect(values).toStrictEqual([1, 2])
  }),
)

test.skip(`asConcur types are correct`, () => {
  expectTypeOf(asConcur([1, 2, 3])).toExtend<ConcurIterable<number>>()
  expectTypeOf(asConcur([1, 2, 3] as Iterable<number>)).toExtend<
    ConcurIterable<number>
  >()
  expectTypeOf(asConcur(asAsync([`a`, `b`, `c`]))).toExtend<
    ConcurIterable<string>
  >()
  expectTypeOf(asConcur(asConcur([`a`, `b`, `c`]))).toExtend<
    ConcurIterable<string>
  >()
})

test.prop([fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)])(
  `asConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const concurIterable = asConcur(iterable)

    await expect(concurIterable).toBeConcurIterable()
  },
)

test.prop([fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)])(
  `asConcur returns a concur iterable containing the same values as the given iterable`,
  async ({ iterable, values }) => {
    const concurIterable = asConcur(iterable)

    await expect(
      reduceConcur(toArray(), concurIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([fc.oneof(asyncIterableArb, concurIterableArb)])(
  `asConcur returns a concur iterable as concurrent as the given iterable`,
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(asConcur(iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)

test.skip(`empty types are correct`, () => {
  expectTypeOf(empty).toExtend<Iterable<any>>()
  expectTypeOf(empty).toExtend<Iterable<number>>()
  expectTypeOf(empty).toExtend<Iterable<unknown>>()
})

test(`the empty iterable is empty`, () => {
  expect([...empty]).toBeEmpty()
})

test.skip(`emptyAsync types are correct`, () => {
  expectTypeOf(emptyAsync).toExtend<AsyncIterable<any>>()
  expectTypeOf(emptyAsync).toExtend<AsyncIterable<number>>()
  expectTypeOf(emptyAsync).toExtend<AsyncIterable<unknown>>()
})

test(
  `the emptyAsync iterable is empty`,
  autoAdvance(async () => {
    await expect(reduceAsync(toArray(), emptyAsync)).resolves.toBeEmpty()
  }),
)

test.skip(`emptyConcur types are correct`, () => {
  expectTypeOf(emptyConcur).toExtend<ConcurIterable<any>>()
  expectTypeOf(emptyConcur).toExtend<ConcurIterable<number>>()
  expectTypeOf(emptyConcur).toExtend<ConcurIterable<unknown>>()
})

test(
  `the emptyConcur iterable is empty`,
  autoAdvance(async () => {
    await expect(reduceConcur(toArray(), emptyConcur)).resolves.toBeEmpty()
  }),
)

test.skip(`opaque types are correct`, () => {
  expectTypeOf(opaque([1, 2, 3])).toExtend<Iterable<number>>()
})

test.prop([iterableArb])(`opaque returns a pure iterable`, ({ iterable }) => {
  const opaqueIterable = opaque(iterable)

  expect(opaqueIterable).toBeIterable()
})

test.prop([iterableArb])(
  `opaque returns an iterable deeply equal, but not referentially equal, to the given iterable`,
  ({ iterable, values }) => {
    const opaqueIterable = opaque(iterable)

    expect([...opaqueIterable]).toStrictEqual(values)
    expect(opaqueIterable).not.toBe(iterable)
  },
)

test.skip(`opaqueAsync types are correct`, () => {
  expectTypeOf(opaqueAsync(asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<number>
  >()
})

test.prop([asyncIterableArb])(
  `opaqueAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const opaqueIterable = opaqueAsync(iterable)

    await expect(opaqueIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `opaqueAsync returns an async iterable deeply equal, but not referentially equal, to the given async iterable`,
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueAsync(iterable)

    await expect(reduceAsync(toArray(), opaqueIterable)).resolves.toStrictEqual(
      values,
    )
    expect(opaqueIterable).not.toBe(iterable)
  },
)

test.skip(`opaqueConcur types are correct`, () => {
  expectTypeOf(opaqueConcur(asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<number>
  >()
})

test.prop([concurIterableArb])(
  `opaqueConcur returns a pure concur iterable`,
  async ({ iterable }) => {
    const opaqueIterable = opaqueConcur(iterable)

    await expect(opaqueIterable).toBeConcurIterable()
  },
)

test.prop([concurIterableArb])(
  `opaqueConcur returns a concur iterable deeply equal, but not referentially equal, to the given concur iterable`,
  async ({ iterable, values }) => {
    const opaqueIterable = opaqueConcur(iterable)

    await expect(
      reduceConcur(toArray(), opaqueIterable),
    ).resolves.toIncludeSameMembers(values)
    expect(opaqueIterable).not.toBe(iterable)
  },
)
