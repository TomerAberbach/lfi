import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import { timed } from '../../test/timings.ts'
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
  map,
  opaque,
  opaqueAsync,
  opaqueConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../index.js'
import type { ConcurIterable } from '../index.js'
import { createAsyncIterable } from '../internal/helpers.js'

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
  ([fn, args]) => {
    const curried = curry(fn)

    for (const partition of partitions(args)) {
      const returned = partition.reduce<(...args: unknown[]) => unknown>(
        (acc, args) => acc(...args) as (...args: unknown[]) => unknown,
        curried,
      )

      expect(returned).toStrictEqual(fn(...args))
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

test.prop([fnAndArgsArb])(`curry is idempotent`, ([fn, args]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  expect(curried(...args)).toStrictEqual(doubleCurried(...args))
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
      (pipe as (...args: unknown[]) => unknown)(value, firstFn!, ...otherFns),
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

  expectTypeOf(
    asAsync([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(new Error(`BOOM!`)),
    ]),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    asAsync([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(new Error(`BOOM!`)),
    ] as Iterable<Promise<number>>),
  ).toExtend<AsyncIterable<number>>()
  expectTypeOf(
    asAsync(
      asAsync([
        Promise.resolve(`a`),
        Promise.resolve(`b`),
        Promise.reject(new Error(`BOOM!`)),
      ]),
    ),
  ).toExtend<AsyncIterable<string>>()
  expectTypeOf(
    asAsync(
      asConcur([
        Promise.resolve(`a`),
        Promise.resolve(`b`),
        Promise.reject(new Error(`BOOM!`)),
      ]),
    ),
  ).toExtend<AsyncIterable<string>>()
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

    expect(await reduceAsync(toArray(), asyncIterable)).toStrictEqual(values)
  },
)

test.prop([iterableArb])(
  `asAsync returns an async iterable containing the awaited same values in the same order as the given iterable of promises`,
  async ({ iterable, values }, scheduler) => {
    const promiseIterable = map(
      value => scheduler.schedule(Promise.resolve(value), fc.stringify(value)),
      iterable,
    )

    const asyncIterable = asAsync(promiseIterable)

    expect(await reduceAsync(toArray(), asyncIterable)).toStrictEqual(values)
  },
)

test.prop([concurIterableArb])(
  `asAsync returns an async iterable containing the same values in the same order as the given concur iterable`,
  async ({ iterable, getIterationOrder }) => {
    const asyncIterable = asAsync(iterable)

    expect(await reduceAsync(toArray(), asyncIterable)).toStrictEqual(
      getIterationOrder(),
    )
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

  expectTypeOf(
    asConcur([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(new Error(`BOOM!`)),
    ]),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    asConcur([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.reject(new Error(`BOOM!`)),
    ] as Iterable<Promise<number>>),
  ).toExtend<ConcurIterable<number>>()
  expectTypeOf(
    asConcur(
      asAsync([
        Promise.resolve(`a`),
        Promise.resolve(`b`),
        Promise.reject(new Error(`BOOM!`)),
      ]),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    asConcur(
      asConcur([
        Promise.resolve(`a`),
        Promise.resolve(`b`),
        Promise.reject(new Error(`BOOM!`)),
      ]),
    ),
  ).toExtend<ConcurIterable<string>>()
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
  async ({ iterable, getIterationOrder }) => {
    const concurIterable = asConcur(iterable)

    expect(await reduceConcur(toArray(), concurIterable)).toStrictEqual(
      getIterationOrder(),
    )
  },
)

test.prop([iterableArb])(
  `asConcur returns a concur iterable containing the awaited same values in the same order as the given iterable of promises`,
  async ({ iterable, values }, scheduler) => {
    const promiseIterable = map(
      value => scheduler.schedule(Promise.resolve(value), fc.stringify(value)),
      iterable,
    )

    const concurIterable = asConcur(promiseIterable)

    expect(await reduceConcur(toArray(), concurIterable)).toIncludeSameMembers(
      values,
    )
  },
)

test.prop([asyncIterableArb])(
  `asConcur returns a concur iterable containing the awaited same values in the same order as the given async iterable of promises`,
  async ({ iterable, values }, scheduler) => {
    // NOTE: We can't use `mapAsync` because that unwraps promises.
    const promiseIterable = createAsyncIterable(() => {
      const iterator = iterable[Symbol.asyncIterator]()
      return {
        next: async () => {
          const result = await iterator.next()
          if (result.done) {
            return result
          }
          return {
            ...result,
            value: scheduler.schedule(
              Promise.resolve(result.value),
              fc.stringify(result.value),
            ),
          }
        },
      }
    })

    const concurIterable = asConcur(promiseIterable)

    expect(await reduceConcur(toArray(), concurIterable)).toIncludeSameMembers(
      values,
    )
  },
)

test.prop([fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)])(
  `asConcur returns a concur iterable as concurrent as the given iterable`,
  async ({ iterable }) => {
    const concurIterable = asConcur(iterable)

    const { elapsed } = await timed(() => consumeConcur(concurIterable))

    expect(elapsed).toBe(iterable.yieldTimings.max())
  },
)

test.prop([
  fc.oneof(
    nonEmptyIterableArb,
    nonEmptyAsyncIterableArb,
    nonEmptyConcurIterableArb,
  ),
  fc.infiniteStream(fc.boolean()),
])(
  `asConcur returns a concur iterable resilient to synchronous throwing`,
  async ({ iterable, values }, shouldThrowStream) => {
    const concurIterable = asConcur(iterable)

    const appliedValues: unknown[] = []
    await expect(
      concurIterable(value => {
        appliedValues.push(value)
        if (appliedValues.length === 1 || shouldThrowStream.next().value) {
          throw new Error(`BOOM!`)
        }
      }),
    ).toReject()

    expect(appliedValues).toIncludeSameMembers(values)
  },
)

test.skip(`empty types are correct`, () => {
  expectTypeOf(empty()).toExtend<Iterable<unknown>>()
  expectTypeOf(empty<number>()).toExtend<Iterable<number>>()
})

test(`the empty iterable is empty`, () => {
  expect([...empty()]).toBeEmpty()
})

test.skip(`emptyAsync types are correct`, () => {
  expectTypeOf(emptyAsync()).toExtend<AsyncIterable<unknown>>()
  expectTypeOf(emptyAsync<number>()).toExtend<AsyncIterable<number>>()
})

test(
  `the emptyAsync iterable is empty`,
  autoAdvance(async () => {
    expect(await reduceAsync(toArray(), emptyAsync())).toBeEmpty()
  }),
)

test.skip(`emptyConcur types are correct`, () => {
  expectTypeOf(emptyConcur()).toExtend<ConcurIterable<unknown>>()
  expectTypeOf(emptyConcur<number>()).toExtend<ConcurIterable<number>>()
})

test(
  `the emptyConcur iterable is empty`,
  autoAdvance(async () => {
    expect(await reduceConcur(toArray(), emptyConcur())).toBeEmpty()
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

    expect(await reduceAsync(toArray(), opaqueIterable)).toStrictEqual(values)
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
  async ({ iterable, getIterationOrder }) => {
    const opaqueIterable = opaqueConcur(iterable)

    expect(await reduceConcur(toArray(), opaqueIterable)).toStrictEqual(
      getIterationOrder(),
    )
    expect(opaqueIterable).not.toBe(iterable)
  },
)
