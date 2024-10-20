/* eslint-disable typescript/no-confusing-void-expression */
import { expect, expectTypeOf } from 'vitest'
import { asyncFnArb, fnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  uniqueConcurIterableArb,
} from '../helpers/fast-check/iterable.js'
import { test } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'
import {
  asAsync,
  asConcur,
  consume,
  consumeAsync,
  consumeConcur,
  each,
  eachAsync,
  eachConcur,
  forEach,
  forEachAsync,
  forEachConcur,
  mapConcur,
  maxConcur,
  orConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
} from '~/index.js'
import type { ConcurIterable } from '~/index.js'

test.skip(`each types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      each(a => console.log(a)),
    ),
  ).toMatchTypeOf<Iterable<number>>()

  expectTypeOf(
    pipe(
      [1, 2, null],
      each((a): asserts a is number => {
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

test.prop([fnArb, iterableArb])(
  `each returns a pure iterable`,
  (fn, { iterable }) => {
    const iteratedIterable = each(fn, iterable)

    expect(iteratedIterable).toBeIterable()
  },
)

test.prop([fnArb, iterableArb])(
  `each returns an iterable containing the same values in the same order as the given iterable`,
  (fn, { iterable, values }) => {
    const iteratedIterable = each(fn, iterable)

    expect([...iteratedIterable]).toStrictEqual(values)
  },
)

test.prop([iterableArb])(
  `each calls the given function for each value in the given iterable in iteration order`,
  ({ iterable, values }) => {
    const parameters: unknown[] = []

    consume(each(value => parameters.push(value), iterable))

    expect(parameters).toStrictEqual(values)
  },
)

test.prop([iterableArb])(`each is lazy`, ({ iterable, values }) => {
  let count = 0
  const iterator = each(() => count++, iterable)[Symbol.iterator]()

  expect(count).toBe(0)
  for (let i = 0; i < values.length; i++) {
    iterator.next()
    expect(count).toBe(i + 1)
  }
})

test.skip(`eachAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      eachAsync(a => console.log(a)),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      eachAsync(a => Promise.resolve(console.log(a))),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, null]),
      eachAsync((a): asserts a is number => {
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `eachAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const iteratedIterable = eachAsync(asyncFn, iterable)

    await expect(iteratedIterable).toBeAsyncIterable()
  },
)

test.prop([asyncFnArb, asyncIterableArb])(
  `eachAsync returns an async iterable containing the same values in the same order as the given async iterable`,
  async ({ asyncFn }, { iterable, values }) => {
    const iteratedIterable = eachAsync(asyncFn, iterable)

    await expect(
      reduceAsync(toArray(), iteratedIterable),
    ).resolves.toStrictEqual(values)
  },
)

test.prop([asyncIterableArb])(
  `eachAsync calls the given function for each value in the given async iterable in iteration order`,
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await consumeAsync(eachAsync(value => parameters.push(value), iterable))

    expect(parameters).toStrictEqual(values)
  },
)

test.prop([asyncIterableArb])(
  `eachAsync is lazy`,
  async ({ iterable, values }) => {
    let count = 0
    const iterator = eachAsync(() => count++, iterable)[Symbol.asyncIterator]()

    expect(count).toBe(0)
    for (let i = 0; i < values.length; i++) {
      await iterator.next()
      expect(count).toBe(i + 1)
    }
  },
)

test.skip(`eachConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      eachConcur(a => console.log(a)),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      eachConcur(a => Promise.resolve(console.log(a))),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, null]),
      eachConcur((a): asserts a is number => {
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `eachConcur returns a pure concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const iteratedIterable = eachConcur(asyncFn, iterable)

    await expect(iteratedIterable).toBeConcurIterable()
  },
)

test.prop([asyncFnArb, concurIterableArb])(
  `eachConcur returns a concur iterable containing the same values as the given concur iterable`,
  async ({ asyncFn }, { iterable, values }) => {
    const iteratedIterable = eachConcur(asyncFn, iterable)

    await expect(
      reduceConcur(toArray(), iteratedIterable),
    ).resolves.toIncludeSameMembers(values)
  },
)

test.prop([concurIterableArb])(
  `eachConcur calls the given function for each value in the given concur iterable`,
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await consumeConcur(eachConcur(value => parameters.push(value), iterable))

    expect(parameters).toIncludeSameMembers(values)
  },
)

test.prop([concurIterableArb])(`eachConcur is lazy`, ({ iterable }) => {
  let count = 0

  eachConcur(() => count++, iterable)

  expect(count).toBe(0)
})

test.prop([asyncFnArb, uniqueConcurIterableArb])(
  `eachConcur returns a concur iterable as concurrent as the given function and concur iterable`,
  async ({ asyncFn }, { iterable, values }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(eachConcur(asyncFn, iterable)),
    )

    expect(elapsed).toBe(
      await pipe(
        asConcur(values),
        mapConcur(async value => (await scheduler.report(value)).sum()),
        maxConcur,
        orConcur(() => 0),
      ),
    )
  },
)

test.skip(`forEach types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      forEach(a => console.log(a)),
    ),
  )
    // eslint-disable-next-line typescript/no-invalid-void-type
    .toMatchTypeOf<void>()
})

test.prop([fnArb, iterableArb])(
  `forEach returns undefined`,
  (fn, { iterable }) => {
    const value = forEach(fn, iterable)

    expect(value).toBeUndefined()
  },
)

test.prop([iterableArb])(
  `forEach is eager and calls the given function for each value in the given iterable in iteration order`,
  ({ iterable, values }) => {
    const parameters: unknown[] = []

    forEach(value => parameters.push(value), iterable)

    expect(parameters).toStrictEqual(values)
  },
)

test.skip(`forEachAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      forEachAsync(a => console.log(a)),
    ),
  ).toMatchTypeOf<Promise<void>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      forEachAsync(a => Promise.resolve(console.log(a))),
    ),
  ).toMatchTypeOf<Promise<void>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `forEachAsync returns undefined`,
  async ({ asyncFn }, { iterable }) => {
    const value = await forEachAsync(asyncFn, iterable)

    expect(value).toBeUndefined()
  },
)

test.prop([asyncIterableArb])(
  `forEachAsync is eager and calls the given function for each value in the given async iterable in iteration order`,
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await forEachAsync(value => parameters.push(value), iterable)

    expect(parameters).toStrictEqual(values)
  },
)

test.skip(`forEachConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      forEachConcur(a => console.log(a)),
    ),
  ).toMatchTypeOf<Promise<void>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      forEachConcur(a => Promise.resolve(console.log(a))),
    ),
  ).toMatchTypeOf<Promise<void>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `forEachConcur returns undefined`,
  async ({ asyncFn }, { iterable }) => {
    const value = await forEachConcur(asyncFn, iterable)

    expect(value).toBeUndefined()
  },
)

test.prop([concurIterableArb])(
  `forEachConcur is eager and calls the given function for each value in the given concur iterable`,
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await forEachConcur(value => parameters.push(value), iterable)

    expect(parameters).toIncludeSameMembers(values)
  },
)

test.prop([asyncFnArb, uniqueConcurIterableArb])(
  `forEachConcur is as concurrent as the given function and concur iterable`,
  async ({ asyncFn }, { iterable, values }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      forEachConcur(asyncFn, iterable),
    )

    expect(elapsed).toBe(
      await pipe(
        asConcur(values),
        mapConcur(async value => (await scheduler.report(value)).sum()),
        maxConcur,
        orConcur(() => 0),
      ),
    )
  },
)
