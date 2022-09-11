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

import { AsyncBetterator, Betterator } from 'betterator'
import { expectTypeOf, fc } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  flatMap,
  flatMapAsync,
  flatMapConcur,
  flatten,
  flattenAsync,
  flattenConcur,
  index,
  indexAsync,
  indexConcur,
  map,
  mapAsync,
  mapConcur,
  pipe,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../../src/index.js'
import { asyncFnArb, fnArb, getAsyncFnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'

test.skip(`map types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], map(String))).toMatchTypeOf<Iterable<string>>()
})

testProp(
  `map returns a pure iterable`,
  [fnArb, iterableArb],
  (fn, { iterable }) => {
    const mappedIterable = map(fn, iterable)

    expect(mappedIterable).toBeIterable()
  },
)

testProp(
  `map returns an iterable containing the same values in the same order as the given iterable, but transformed using the given callback`,
  [fnArb, iterableArb],
  (fn, { iterable, values }) => {
    const mappedIterable = map(fn, iterable)

    expect([...mappedIterable]).toStrictEqual(values.map(value => fn(value)))
  },
)

testProp(`map is lazy`, [fnArb, iterableArb], (fn, { iterable, values }) => {
  let count = 0
  const iterator = map(value => {
    count++
    return fn(value)
  }, iterable)[Symbol.iterator]()

  expect(count).toBe(0)
  for (let i = 0; i < values.length; i++) {
    iterator.next()
    expect(count).toBe(i + 1)
  }
})

test.skip(`mapAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([1, 2, 3]), mapAsync(String))).toMatchTypeOf<
    AsyncIterable<string>
  >()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      mapAsync(n => Promise.resolve(String(n))),
    ),
  ).toMatchTypeOf<AsyncIterable<string>>()
})

testProp(
  `mapAsync returns a pure async iterable`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const mappedIterable = mapAsync(asyncFn, iterable)

    await expect(mappedIterable).toBeAsyncIterable()
  },
)

testProp(
  `mapAsync returns an async iterable containing the same values in the same order as the given async iterable, but transformed using the given callback`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const mappedIterable = mapAsync(asyncFn, iterable)

    expect(await reduceAsync(toArray(), mappedIterable)).toStrictEqual(
      values.map(value => syncFn(value)),
    )
  },
)

testProp(
  `mapAsync is lazy`,
  [asyncFnArb, asyncIterableArb],
  async ({ asyncFn }, { iterable, values }) => {
    let count = 0
    const asyncIterator = mapAsync(value => {
      count++
      return asyncFn(value)
    }, iterable)[Symbol.asyncIterator]()

    expect(count).toBe(0)
    for (let i = 0; i < values.length; i++) {
      await asyncIterator.next()
      expect(count).toBe(i + 1)
    }
  },
)

test.skip(`mapConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([1, 2, 3]), mapConcur(String))).toMatchTypeOf<
    ConcurIterable<string>
  >()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      mapConcur(n => Promise.resolve(String(n))),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
})

testProp(
  `mapConcur returns a concur iterable containing the same values in the same order as the given concur iterable, but transformed using the given callback`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const mappedIterable = mapConcur(asyncFn, iterable)

    await expect(mappedIterable).toBeConcurIterable()
  },
)

testProp(
  `mapConcur maps concurrently`,
  [asyncFnArb, concurIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const mappedIterable = mapConcur(asyncFn, iterable)

    expect(await reduceConcur(toArray(), mappedIterable)).toIncludeSameMembers(
      values.map(value => syncFn(value)),
    )
  },
)

test.skip(`flatMap types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      flatMap(n => [String(n), String(n)]),
    ),
  ).toMatchTypeOf<Iterable<string>>()
})

testProp(
  `flatMap returns a pure iterable`,
  [fc.func(iterableArb), iterableArb],
  (fn, { iterable }) => {
    const flatMappedIterable = flatMap(value => fn(value).iterable, iterable)

    expect(flatMappedIterable).toBeIterable()
  },
)

testProp(
  `flatMap returns an iterable containing the flattened iterables from applying the given function to each value in the given iterable`,
  [fc.func(iterableArb), iterableArb],
  (fn, { iterable, values }) => {
    const flatMappedIterable = flatMap(value => fn(value).iterable, iterable)

    expect([...flatMappedIterable]).toStrictEqual(
      values.flatMap(value => fn(value).values),
    )
  },
)

testProp(
  `flatMap is lazy`,
  [fc.func(iterableArb), iterableArb],
  (fn, { iterable }) => {
    let count = 0

    const iterator = Betterator.fromIterable(
      flatMap(
        value =>
          map(innerValue => {
            count++
            return innerValue
          }, fn(value).iterable),
        iterable,
      ),
    )

    expect(count).toBe(0)
    let i = 0
    while (iterator.hasNext()) {
      iterator.getNext()

      expect(count).toBe(i + 1)

      i++
    }
  },
)

test.skip(`flatMapAsync types are correct`, () => {
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => [String(n), String(n)]),
    ),
  ).toMatchTypeOf<AsyncIterable<string>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => Promise.resolve([String(n), String(n)])),
    ),
  ).toMatchTypeOf<AsyncIterable<string>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => asAsync([String(n), String(n)])),
    ),
  ).toMatchTypeOf<AsyncIterable<string>>()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => Promise.resolve(asAsync([String(n), String(n)]))),
    ),
  ).toMatchTypeOf<AsyncIterable<string>>()
})

testProp(
  `flatMapAsync returns a pure async iterable`,
  [getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)), asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    const flatMappedIterable = flatMapAsync(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(flatMappedIterable).toBeAsyncIterable()
  },
)

testProp(
  `flatMapAsync returns an async iterable containing the flattened iterables from applying the given function to each value in the given async iterable`,
  [getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)), asyncIterableArb],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const flatMappedIterable = flatMapAsync(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    expect(await reduceAsync(toArray(), flatMappedIterable)).toStrictEqual(
      values.flatMap(value => syncFn(value).values),
    )
  },
)

testProp(
  `flatMapAsync is lazy`,
  [getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)), asyncIterableArb],
  async ({ asyncFn }, { iterable }) => {
    let count = 0

    const asyncIterator = AsyncBetterator.fromAsyncIterable(
      flatMapAsync(
        async value =>
          mapAsync(innerValue => {
            count++
            return innerValue
          }, asAsync((await asyncFn(value)).iterable)),
        iterable,
      ),
    )

    expect(count).toBe(0)
    let i = 0
    while (await asyncIterator.hasNext()) {
      await asyncIterator.getNext()

      expect(count).toBe(i + 1)

      i++
    }
  },
)

test.skip(`flatMapConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => [String(n), String(n)]),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve([String(n), String(n)])),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => asAsync([String(n), String(n)])),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve(asAsync([String(n), String(n)]))),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => asConcur([String(n), String(n)])),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve(asConcur([String(n), String(n)]))),
    ),
  ).toMatchTypeOf<ConcurIterable<string>>()
})

testProp(
  `flatMapConcur returns a pure concur iterable`,
  [
    getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
    concurIterableArb,
  ],
  async ({ asyncFn }, { iterable }) => {
    const flatMappedIterable = flatMapConcur(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(flatMappedIterable).toBeConcurIterable()
  },
)

testProp(
  `flatMapConcur returns a concur iterable containing the flattened iterables from applying the given function to each value in the given concur iterable`,
  [
    getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
    concurIterableArb,
  ],
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const flatMappedIterable = flatMapConcur(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    expect(
      await reduceConcur(toArray(), flatMappedIterable),
    ).toIncludeSameMembers(values.flatMap(value => syncFn(value).values))
  },
)

test.skip(`flatten types are correct`, () => {
  expectTypeOf(
    flatten([
      [1, 2, 3],
      [1, 2],
      [4, 5],
    ] as Iterable<number>[]),
  ).toMatchTypeOf<Iterable<number>>()
})

testProp(
  `flatten returns a pure iterable`,
  [getIterableArb(iterableArb)],
  ({ iterable }) => {
    const flattenedIterable = flatten(map(({ iterable }) => iterable, iterable))

    expect(flattenedIterable).toBeIterable()
  },
)

testProp(
  `flatten returns a flattened version of the given iterable`,
  [getIterableArb(iterableArb)],
  ({ iterable, values }) => {
    const flattenedIterable = flatten(map(({ iterable }) => iterable, iterable))

    expect([...flattenedIterable]).toStrictEqual(
      values.flatMap(({ values }) => values),
    )
  },
)

test.skip(`flattenAsync types are correct`, () => {
  expectTypeOf(
    flattenAsync(asAsync([asAsync([1, 2, 3]), [1, 2], [4, 5]])),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `flattenAsync returns a pure async iterable`,
  [getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))],
  async ({ iterable }) => {
    const flattenedIterable = flattenAsync(
      mapAsync(({ iterable }) => iterable, iterable),
    )

    await expect(flattenedIterable).toBeAsyncIterable()
  },
)

testProp(
  `flattenAsync returns a flattened version of the given async iterable`,
  [getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))],
  async ({ iterable, values }) => {
    const flattenedIterable = flattenAsync(
      mapAsync(({ iterable }) => iterable, iterable),
    )

    expect(await reduceAsync(toArray(), flattenedIterable)).toStrictEqual(
      values.flatMap(({ values }) => values),
    )
  },
)

test.skip(`flattenConcur types are correct`, () => {
  expectTypeOf(
    flattenConcur(asConcur([asAsync([1, 2, 3]), asConcur([1, 2]), [4, 5]])),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `flattenConcur returns a pure concur iterable`,
  [
    getConcurIterableArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb),
    ),
  ],
  async ({ iterable }) => {
    const flattenedIterable = flattenConcur(
      mapConcur(({ iterable }) => iterable, iterable),
    )

    await expect(flattenedIterable).toBeConcurIterable()
  },
)

testProp(
  `flattenConcur returns a flattened version of the given concur iterable`,
  [
    getConcurIterableArb(
      fc.oneof(iterableArb, asyncIterableArb, concurIterableArb),
    ),
  ],
  async ({ iterable, values }) => {
    const flattenedIterable = flattenConcur(
      mapConcur(({ iterable }) => iterable, iterable),
    )

    expect(
      await reduceConcur(toArray(), flattenedIterable),
    ).toIncludeSameMembers(values.flatMap(({ values }) => values))
  },
)

test.skip(`index types are correct`, () => {
  expectTypeOf(pipe([`a`, `b`, `c`], index)).toMatchTypeOf<
    Iterable<[number, string]>
  >()
})

testProp(`index returns a pure iterable`, [iterableArb], ({ iterable }) => {
  const indexedIterable = index(iterable)

  expect(indexedIterable).toBeIterable()
})

testProp(
  `index returns an iterable containing the values of the given iterable in pairs with their indices`,
  [iterableArb],
  ({ iterable, values }) => {
    const indexedIterable = index(iterable)

    expect([...indexedIterable]).toStrictEqual(
      values.map((value, index) => [index, value]),
    )
  },
)

test.skip(`indexAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([`a`, `b`, `c`]), indexAsync)).toMatchTypeOf<
    AsyncIterable<[number, string]>
  >()
})

testProp(
  `indexAsync returns a pure async iterable`,
  [asyncIterableArb],
  async ({ iterable }) => {
    const indexedIterable = indexAsync(iterable)

    await expect(indexedIterable).toBeAsyncIterable()
  },
)

testProp(
  `indexAsync returns an async iterable containing the values of the given async iterable in pairs with their indices`,
  [asyncIterableArb],
  async ({ iterable, values }) => {
    const indexedIterable = indexAsync(iterable)

    expect(await reduceAsync(toArray(), indexedIterable)).toStrictEqual(
      values.map((value, index) => [index, value]),
    )
  },
)

test.skip(`indexConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([`a`, `b`, `c`]), indexConcur)).toMatchTypeOf<
    ConcurIterable<[number, string]>
  >()
})

testProp(
  `indexConcur returns a concur iterable`,
  [concurIterableArb],
  async ({ iterable }) => {
    const indexedIterable = indexConcur(iterable)

    await expect(indexedIterable).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `indexConcur returns a concur iterable containing the values of the given concur iterable in pairs with their indices`,
  [concurIterableArb],
  async ({ iterable, values }) => {
    const indexedIterable = indexConcur(iterable)

    const pairs = await reduceConcur(
      toArray<[number, unknown]>(),
      indexedIterable,
    )
    expect(pairs.map(([index]) => index)).toIncludeSameMembers(
      values.map((_, index) => index),
    )
    expect(pairs.map(([, value]) => value)).toIncludeSameMembers(values)
  },
)
