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

/* eslint-disable typescript/no-confusing-void-expression */

import { expectTypeOf } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
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
} from '../../src/index.js'
import { asyncFnArb, fnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  uniqueConcurIterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

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
        // eslint-disable-next-line jest/no-conditional-in-test
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `each returns a pure iterable`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const iteratedIterable = each(fn, iterable)

    expect(iteratedIterable).toBeIterable()
  },
)

testProp(
  `each returns an iterable containing the same values in the same order as the given iterable`,
  [fnArb, iterableArb],
  (fn, { iterable, values }) => {
    const iteratedIterable = each(fn, iterable)

    expect([...iteratedIterable]).toStrictEqual(values)
  },
)

testProp(
  `each calls the given function for each value in the given iterable in iteration order`,
  [iterableArb],
  ({ iterable, values }) => {
    const parameters: unknown[] = []

    consume(each(value => parameters.push(value), iterable))

    expect(parameters).toStrictEqual(values)
  },
)

testProp(`each is lazy`, [iterableArb], ({ iterable, values }) => {
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
        // eslint-disable-next-line jest/no-conditional-in-test
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `eachAsync returns a pure async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const iteratedIterable = eachAsync(asyncFn, iterable)

    await expect(iteratedIterable).toBeAsyncIterable()
  },
)

testProp(
  `eachAsync returns an async iterable containing the same values in the same order as the given async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable, values }) => {
    const iteratedIterable = eachAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), iteratedIterable)).toStrictEqual(values)
  },
)

testProp(
  `eachAsync calls the given function for each value in the given async iterable in iteration order`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await consumeAsync(eachAsync(value => parameters.push(value), iterable))

    expect(parameters).toStrictEqual(values)
  },
)

testProp(
  `eachAsync is lazy`,
  [asyncIterableArb],
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
        // eslint-disable-next-line jest/no-conditional-in-test
        if (a == null) {
          throw new Error(`null`)
        }
      }),
    ),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `eachConcur returns a pure concur iterable`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const iteratedIterable = eachConcur(asyncFn, iterable)

    await expect(iteratedIterable).toBeConcurIterable()
  },
)

testProp(
  `eachConcur returns a concur iterable containing the same values as the given concur iterable`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable, values }) => {
    const iteratedIterable = eachConcur(asyncFn, iterable)

    expect(
      await reduceConcur(toArray(), iteratedIterable),
    ).toIncludeSameMembers(values)
  },
)

testProp(
  `eachConcur calls the given function for each value in the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await consumeConcur(eachConcur(value => parameters.push(value), iterable))

    expect(parameters).toIncludeSameMembers(values)
  },
)

testProp(`eachConcur is lazy`, [concurIterableArb], ({ iterable }) => {
  let count = 0

  eachConcur(() => count++, iterable)

  expect(count).toBe(0)
})

testProp(
  `eachConcur returns a concur iterable as concurrent as the given function and concur iterable`,
  [asyncFnArb, uniqueConcurIterableArb],
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

testProp(
  `forEach returns undefined`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const value = forEach(fn, iterable)

    expect(value).toBeUndefined()
  },
)

testProp(
  `forEach is eager and calls the given function for each value in the given iterable in iteration order`,
  [iterableArb],
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

testProp(
  `forEachAsync returns undefined`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const value = await forEachAsync(asyncFn, iterable)

    expect(value).toBeUndefined()
  },
)

testProp(
  `forEachAsync is eager and calls the given function for each value in the given async iterable in iteration order`,
  [asyncIterableArb],
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

testProp(
  `forEachConcur returns undefined`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const value = await forEachConcur(asyncFn, iterable)

    expect(value).toBeUndefined()
  },
)

testProp(
  `forEachConcur is eager and calls the given function for each value in the given concur iterable`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const parameters: unknown[] = []

    await forEachConcur(value => parameters.push(value), iterable)

    expect(parameters).toIncludeSameMembers(values)
  },
)

testProp(
  `forEachConcur is as concurrent as the given function and concur iterable`,
  [asyncFnArb, uniqueConcurIterableArb],
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
