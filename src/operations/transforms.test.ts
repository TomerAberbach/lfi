import { AsyncBetterator, Betterator } from 'betterator'
import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { asyncFnArb, fnArb, getAsyncFnArb } from '../../test/fast-check/fns.ts'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
} from '../../test/fast-check/iterables.ts'
import { test } from '../../test/fast-check/test-prop.ts'
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
} from '../index.js'
import type { ConcurIterable } from '../index.js'

test.skip(`map types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], map(String))).toExtend<Iterable<string>>()
  expectTypeOf(map(String, [1, 2, 3])).toExtend<Iterable<string>>()

  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(x => [x, x]),
    ),
  ).toExtend<Iterable<[number, number]>>()
  expectTypeOf(map(x => [x, x], [1, 2, 3])).toExtend<
    Iterable<[number, number]>
  >()
})

test.prop([fnArb, iterableArb])(
  `map returns a pure iterable`,
  (fn, { iterable }) => {
    const mappedIterable = map(fn, iterable)

    expect(mappedIterable).toBeIterable()
  },
)

test.prop([fnArb, iterableArb])(
  `map returns an iterable containing the same values in the same order as the given iterable, but transformed using the given callback`,
  (fn, { iterable, values }) => {
    const mappedIterable = map(fn, iterable)

    expect([...mappedIterable]).toStrictEqual(values.map(value => fn(value)))
  },
)

test.prop([fnArb, iterableArb])(`map is lazy`, (fn, { iterable, values }) => {
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
  expectTypeOf(pipe(asAsync([1, 2, 3]), mapAsync(String))).toExtend<
    AsyncIterable<string>
  >()
  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      mapAsync(n => Promise.resolve(String(n))),
    ),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(mapAsync(String, asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<string>
  >()
  expectTypeOf(
    mapAsync(n => Promise.resolve(String(n)), asAsync([1, 2, 3])),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(mapAsync(x => [x, x], asAsync([1, 2, 3]))).toExtend<
    AsyncIterable<[number, number]>
  >()
  expectTypeOf(
    mapAsync(n => Promise.resolve([n, n]), asAsync([1, 2, 3])),
  ).toExtend<AsyncIterable<[number, number]>>()
})

test.prop([asyncFnArb, asyncIterableArb])(
  `mapAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const mappedIterable = mapAsync(asyncFn, iterable)

    await expect(mappedIterable).toBeAsyncIterable()
  },
)

test.prop([asyncFnArb, asyncIterableArb])(
  `mapAsync returns an async iterable containing the same values in the same order as the given async iterable, but transformed using the given callback`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const mappedIterable = mapAsync(asyncFn, iterable)

    await expect(reduceAsync(toArray(), mappedIterable)).resolves.toStrictEqual(
      values.map(value => syncFn(value)),
    )
  },
)

test.prop([asyncFnArb, asyncIterableArb])(
  `mapAsync is lazy`,
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
  expectTypeOf(pipe(asConcur([1, 2, 3]), mapConcur(String))).toExtend<
    ConcurIterable<string>
  >()
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      mapConcur(n => Promise.resolve(String(n))),
    ),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(mapConcur(String, asConcur([1, 2, 3]))).toExtend<
    ConcurIterable<string>
  >()
  expectTypeOf(
    mapConcur(n => Promise.resolve(String(n)), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(mapConcur(x => [x, x], asConcur<number>([1, 2, 3]))).toExtend<
    ConcurIterable<[number, number]>
  >()
  expectTypeOf(
    mapConcur(n => Promise.resolve([n, n]), asConcur<number>([1, 2, 3])),
  ).toExtend<ConcurIterable<[number, number]>>()
})

test.prop([asyncFnArb, concurIterableArb])(
  `mapConcur returns a concur iterable containing the same values in the same order as the given concur iterable, but transformed using the given callback`,
  async ({ asyncFn }, { iterable }) => {
    const mappedIterable = mapConcur(asyncFn, iterable)

    await expect(mappedIterable).toBeConcurIterable()
  },
)

test.prop([asyncFnArb, concurIterableArb])(
  `mapConcur maps concurrently`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const mappedIterable = mapConcur(asyncFn, iterable)

    await expect(
      reduceConcur(toArray(), mappedIterable),
    ).resolves.toIncludeSameMembers(values.map(value => syncFn(value)))
  },
)

test.skip(`flatMap types are correct`, () => {
  expectTypeOf(
    pipe(
      [1, 2, 3],
      flatMap(n => [String(n), String(n)]),
    ),
  ).toExtend<Iterable<string>>()
  expectTypeOf(flatMap(n => [String(n), String(n)], [1, 2, 3])).toExtend<
    Iterable<string>
  >()

  expectTypeOf(
    pipe(
      [1, 2, 3],
      flatMap(n => [
        [n, n],
        [n, n],
      ]),
    ),
  ).toExtend<Iterable<[number, number]>>()
  expectTypeOf(
    flatMap(
      n => [
        [n, n],
        [n, n],
      ],
      [1, 2, 3],
    ),
  ).toExtend<Iterable<[number, number]>>()
})

test.prop([fc.func(iterableArb), iterableArb])(
  `flatMap returns a pure iterable`,
  (fn, { iterable }) => {
    const flatMappedIterable = flatMap(value => fn(value).iterable, iterable)

    expect(flatMappedIterable).toBeIterable()
  },
)

test.prop([fc.func(iterableArb), iterableArb])(
  `flatMap returns an iterable containing the flattened iterables from applying the given function to each value in the given iterable`,
  (fn, { iterable, values }) => {
    const flatMappedIterable = flatMap(value => fn(value).iterable, iterable)

    expect([...flatMappedIterable]).toStrictEqual(
      values.flatMap(value => fn(value).values),
    )
  },
)

test.prop([fc.func(iterableArb), iterableArb])(
  `flatMap is lazy`,
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
  ).toExtend<AsyncIterable<string>>()
  expectTypeOf(
    flatMapAsync(n => [String(n), String(n)], asAsync([1, 2, 3])),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => [
        [n, n],
        [n, n],
      ]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    flatMapAsync(
      n => [
        [n, n],
        [n, n],
      ],
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => Promise.resolve([String(n), String(n)])),
    ),
  ).toExtend<AsyncIterable<string>>()
  expectTypeOf(
    flatMapAsync(
      n => Promise.resolve([String(n), String(n)]),
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n =>
        Promise.resolve([
          [n, n],
          [n, n],
        ]),
      ),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    flatMapAsync(
      n =>
        Promise.resolve([
          [n, n],
          [n, n],
        ]),
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => asAsync([String(n), String(n)])),
    ),
  ).toExtend<AsyncIterable<string>>()
  expectTypeOf(
    flatMapAsync(n => asAsync([String(n), String(n)]), asAsync([1, 2, 3])),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n =>
        asAsync([
          [n, n],
          [n, n],
        ]),
      ),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    flatMapAsync(
      n =>
        asAsync([
          [n, n],
          [n, n],
        ]),
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n => Promise.resolve(asAsync([String(n), String(n)]))),
    ),
  ).toExtend<AsyncIterable<string>>()
  expectTypeOf(
    flatMapAsync(
      n => Promise.resolve(asAsync([String(n), String(n)])),
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<string>>()

  expectTypeOf(
    pipe(
      asAsync([1, 2, 3]),
      flatMapAsync(n =>
        Promise.resolve(
          asAsync([
            [n, n],
            [n, n],
          ]),
        ),
      ),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
  expectTypeOf(
    flatMapAsync(
      n =>
        Promise.resolve(
          asAsync([
            [n, n],
            [n, n],
          ]),
        ),
      asAsync([1, 2, 3]),
    ),
  ).toExtend<AsyncIterable<[number, number]>>()
})

test.prop([
  getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
  asyncIterableArb,
])(
  `flatMapAsync returns a pure async iterable`,
  async ({ asyncFn }, { iterable }) => {
    const flatMappedIterable = flatMapAsync(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(flatMappedIterable).toBeAsyncIterable()
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
  asyncIterableArb,
])(
  `flatMapAsync returns an async iterable containing the flattened iterables from applying the given function to each value in the given async iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const flatMappedIterable = flatMapAsync(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(
      reduceAsync(toArray(), flatMappedIterable),
    ).resolves.toStrictEqual(values.flatMap(value => syncFn(value).values))
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb)),
  asyncIterableArb,
])(`flatMapAsync is lazy`, async ({ asyncFn }, { iterable }) => {
  let count = 0

  const asyncIterator = AsyncBetterator.fromAsyncIterable(
    flatMapAsync(
      async value =>
        mapAsync(
          innerValue => {
            count++
            return innerValue
          },
          asAsync((await asyncFn(value)).iterable),
        ),
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
})

test.skip(`flatMapConcur types are correct`, () => {
  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => [String(n), String(n)]),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(n => [String(n), String(n)], asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => [
        [n, n],
        [n, n],
      ]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n => [
        [n, n],
        [n, n],
      ],
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve([String(n), String(n)])),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(
      n => Promise.resolve([String(n), String(n)]),
      asConcur([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n =>
        Promise.resolve([
          [n, n],
          [n, n],
        ]),
      ),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n =>
        Promise.resolve([
          [n, n],
          [n, n],
        ]),
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => asAsync([String(n), String(n)])),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(n => asAsync([String(n), String(n)]), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n =>
        asAsync([
          [n, n],
          [n, n],
        ]),
      ),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n =>
        asAsync([
          [n, n],
          [n, n],
        ]),
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve(asAsync([String(n), String(n)]))),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(
      n => Promise.resolve(asAsync([String(n), String(n)])),
      asConcur([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n =>
        Promise.resolve(
          asAsync([
            [n, n],
            [n, n],
          ]),
        ),
      ),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n =>
        Promise.resolve(
          asAsync([
            [n, n],
            [n, n],
          ]),
        ),
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => asConcur([String(n), String(n)])),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(n => asConcur([String(n), String(n)]), asConcur([1, 2, 3])),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n =>
        asConcur([
          [n, n],
          [n, n],
        ]),
      ),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n =>
        asConcur([
          [n, n],
          [n, n],
        ]),
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n => Promise.resolve(asConcur([String(n), String(n)]))),
    ),
  ).toExtend<ConcurIterable<string>>()
  expectTypeOf(
    flatMapConcur(
      n => Promise.resolve(asConcur([String(n), String(n)])),
      asConcur([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<string>>()

  expectTypeOf(
    pipe(
      asConcur([1, 2, 3]),
      flatMapConcur(n =>
        Promise.resolve(
          asConcur([
            [n, n],
            [n, n],
          ]),
        ),
      ),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
  expectTypeOf(
    flatMapConcur(
      n =>
        Promise.resolve(
          asConcur([
            [n, n],
            [n, n],
          ]),
        ),
      asConcur<number>([1, 2, 3]),
    ),
  ).toExtend<ConcurIterable<[number, number]>>()
})

test.prop([
  getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
  concurIterableArb,
])(
  `flatMapConcur returns a pure concur iterable`,
  async ({ asyncFn }, { iterable }) => {
    const flatMappedIterable = flatMapConcur(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(flatMappedIterable).toBeConcurIterable()
  },
)

test.prop([
  getAsyncFnArb(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)),
  concurIterableArb,
])(
  `flatMapConcur returns a concur iterable containing the flattened iterables from applying the given function to each value in the given concur iterable`,
  async ({ asyncFn, syncFn }, { iterable, values }) => {
    const flatMappedIterable = flatMapConcur(
      async value => (await asyncFn(value)).iterable,
      iterable,
    )

    await expect(
      reduceConcur(toArray(), flatMappedIterable),
    ).resolves.toIncludeSameMembers(
      values.flatMap(value => syncFn(value).values),
    )
  },
)

test.skip(`flatten types are correct`, () => {
  expectTypeOf(
    flatten([
      [1, 2, 3],
      [1, 2],
      [4, 5],
    ] as Iterable<number>[]),
  ).toExtend<Iterable<number>>()
})

test.prop([getIterableArb(iterableArb)])(
  `flatten returns a pure iterable`,
  ({ iterable }) => {
    const flattenedIterable = flatten(map(({ iterable }) => iterable, iterable))

    expect(flattenedIterable).toBeIterable()
  },
)

test.prop([getIterableArb(iterableArb)])(
  `flatten returns a flattened version of the given iterable`,
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
  ).toExtend<AsyncIterable<number>>()
})

test.prop([getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))])(
  `flattenAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const flattenedIterable = flattenAsync(
      mapAsync(({ iterable }) => iterable, iterable),
    )

    await expect(flattenedIterable).toBeAsyncIterable()
  },
)

test.prop([getAsyncIterableArb(fc.oneof(iterableArb, asyncIterableArb))])(
  `flattenAsync returns a flattened version of the given async iterable`,
  async ({ iterable, values }) => {
    const flattenedIterable = flattenAsync(
      mapAsync(({ iterable }) => iterable, iterable),
    )

    await expect(
      reduceAsync(toArray(), flattenedIterable),
    ).resolves.toStrictEqual(values.flatMap(({ values }) => values))
  },
)

test.skip(`flattenConcur types are correct`, () => {
  expectTypeOf(
    flattenConcur(asConcur([asAsync([1, 2, 3]), asConcur([1, 2]), [4, 5]])),
  ).toExtend<ConcurIterable<number>>()
})

test.prop([
  getConcurIterableArb(
    fc.oneof(iterableArb, asyncIterableArb, concurIterableArb),
  ),
])(`flattenConcur returns a pure concur iterable`, async ({ iterable }) => {
  const flattenedIterable = flattenConcur(
    mapConcur(({ iterable }) => iterable, iterable),
  )

  await expect(flattenedIterable).toBeConcurIterable()
})

test.prop([
  getConcurIterableArb(
    fc.oneof(iterableArb, asyncIterableArb, concurIterableArb),
  ),
])(
  `flattenConcur returns a flattened version of the given concur iterable`,
  async ({ iterable, values }) => {
    const flattenedIterable = flattenConcur(
      mapConcur(({ iterable }) => iterable, iterable),
    )

    await expect(
      reduceConcur(toArray(), flattenedIterable),
    ).resolves.toIncludeSameMembers(values.flatMap(({ values }) => values))
  },
)

test.skip(`index types are correct`, () => {
  expectTypeOf(pipe([`a`, `b`, `c`], index)).toExtend<
    Iterable<[number, string]>
  >()
})

test.prop([iterableArb])(`index returns a pure iterable`, ({ iterable }) => {
  const indexedIterable = index(iterable)

  expect(indexedIterable).toBeIterable()
})

test.prop([iterableArb])(
  `index returns an iterable containing the values of the given iterable in pairs with their indices`,
  ({ iterable, values }) => {
    const indexedIterable = index(iterable)

    expect([...indexedIterable]).toStrictEqual(
      values.map((value, index) => [index, value]),
    )
  },
)

test.skip(`indexAsync types are correct`, () => {
  expectTypeOf(pipe(asAsync([`a`, `b`, `c`]), indexAsync)).toExtend<
    AsyncIterable<[number, string]>
  >()
})

test.prop([asyncIterableArb])(
  `indexAsync returns a pure async iterable`,
  async ({ iterable }) => {
    const indexedIterable = indexAsync(iterable)

    await expect(indexedIterable).toBeAsyncIterable()
  },
)

test.prop([asyncIterableArb])(
  `indexAsync returns an async iterable containing the values of the given async iterable in pairs with their indices`,
  async ({ iterable, values }) => {
    const indexedIterable = indexAsync(iterable)

    await expect(
      reduceAsync(toArray(), indexedIterable),
    ).resolves.toStrictEqual(values.map((value, index) => [index, value]))
  },
)

test.skip(`indexConcur types are correct`, () => {
  expectTypeOf(pipe(asConcur([`a`, `b`, `c`]), indexConcur)).toExtend<
    ConcurIterable<[number, string]>
  >()
})

test.prop([concurIterableArb])(
  `indexConcur returns a concur iterable`,
  async ({ iterable }) => {
    const indexedIterable = indexConcur(iterable)

    await expect(indexedIterable).toBeConcurIterable({ pure: false })
  },
)

test.prop([concurIterableArb])(
  `indexConcur returns a concur iterable containing the values of the given concur iterable in pairs with their indices`,
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
