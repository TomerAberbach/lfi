/**
 * Copyright 2022 Google LLC
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
  asConcur,
  concat,
  concatAsync,
  concatConcur,
  consumeConcur,
  count,
  entries,
  get,
  join,
  joinAsync,
  joinConcur,
  map,
  normalizeReducer,
  pipe,
  reduce,
  reduceAsync,
  reduceConcur,
  sum,
  toArray,
  toGrouped,
  toJoin,
  toMap,
  toMax,
  toMultiple,
  toObject,
  toSet,
  toWeakMap,
  toWeakSet,
} from '../../src/index.js'
import type {
  ConcurIterable,
  KeyedReducer,
  OptionalReducer,
  RawKeyedReducer,
  Reducer,
} from '../../src/index.js'
import autoAdvance from '../helpers/auto-advance.js'
import { stringifiableArb } from '../helpers/fast-check/anything.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  iterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
import {
  rawOptionalReducerArb,
  rawReducerArb,
} from '../helpers/fast-check/reducer.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import { sameValueZero } from '../helpers/same-value-zero.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`toArray types are correct`, () => {
  expectTypeOf(toArray<string>()).toMatchTypeOf<Reducer<string, string[]>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toArray()))).toMatchTypeOf<number[]>()
})

test.skip(`toSet types are correct`, () => {
  expectTypeOf(toSet<string>()).toMatchTypeOf<Reducer<string, Set<string>>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toSet()))).toMatchTypeOf<Set<number>>()
})

test.skip(`toWeakSet types are correct`, () => {
  expectTypeOf(toWeakSet<{ a: string }>()).toMatchTypeOf<
    Reducer<{ a: string }, WeakSet<{ a: string }>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => ({ n })),
      reduce(toWeakSet()),
    ),
  ).toMatchTypeOf<WeakSet<{ n: number }>>()

  // @ts-expect-error WeakSets can't contain primitives.
  toWeakSet<string>()
})

const namedTestCases = <TestCase>(
  testCases: readonly Record<string, TestCase>[],
): [string, TestCase][] =>
  testCases.map(testCase => Object.entries(testCase)[0]!)

const reducerTestCases = namedTestCases<() => unknown>([
  { toArray },
  { toSet },
  { toWeakSet },
])
test.each(reducerTestCases)(`%s returns a reducer`, (_, getReducer) => {
  const reducer = getReducer()

  expect(reducer).toBeReducer()
})

test.skip(`toObject types are correct`, () => {
  expectTypeOf(toObject<string, string>()).toMatchTypeOf<
    KeyedReducer<string, string, Record<string, string>>
  >()
  expectTypeOf(toObject<number, string>()).toMatchTypeOf<
    KeyedReducer<number, string, Record<number, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [String(n), n] as const),
      reduce(toObject()),
    ),
  ).toMatchTypeOf<Record<string, number>>()

  // @ts-expect-error Objects can only have string, symbol, and number keys.
  toObject<object, string>()
})

test.skip(`toMap types are correct`, () => {
  expectTypeOf(toMap<{ a: string }, string>()).toMatchTypeOf<
    KeyedReducer<{ a: string }, string, Map<{ a: string }, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [String(n), n] as const),
      reduce(toMap()),
    ),
  ).toMatchTypeOf<Map<string, number>>()
})

test.skip(`toWeakMap types are correct`, () => {
  expectTypeOf(toWeakMap<{ a: string }, string>()).toMatchTypeOf<
    KeyedReducer<{ a: string }, string, WeakMap<{ a: string }, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [{ n }, n] as const),
      reduce(toWeakMap()),
    ),
  ).toMatchTypeOf<WeakMap<{ n: number }, number>>()

  // @ts-expect-error WeakMaps can't have primitive keys.
  toWeakMap<string, string>()
})

const keyedReducerTestCases = namedTestCases<() => unknown>([
  { toObject },
  { toMap },
  { toWeakMap },
])
test.each(keyedReducerTestCases)(
  `%s returns a keyed reducer`,
  (_, getKeyedReducer) => {
    const keyedReducer = getKeyedReducer()

    expect(keyedReducer).toBeReducer({ keyed: true })
  },
)

test.skip(`toGrouped types are correct`, () => {
  expectTypeOf(toGrouped(toArray(), toMap())).toMatchTypeOf<
    Reducer<readonly [unknown, unknown], never, Map<unknown, unknown[]>>
  >()
  expectTypeOf(toGrouped(toArray())(toMap())).toMatchTypeOf<
    Reducer<readonly [unknown, unknown], never, Map<unknown, unknown[]>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped(toArray(), toMap())),
    ),
  ).toMatchTypeOf<Map<number, number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [String(n), n] as const),
      reduce(toGrouped(toArray(), toObject())),
    ),
  ).toMatchTypeOf<Record<string, number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [{ n }, n] as const),
      reduce(toGrouped(toSet(), toWeakMap())),
    ),
  ).toMatchTypeOf<WeakMap<{ n: number }, Set<number>>>()

  expectTypeOf(
    toGrouped({ create: () => ``, add: (a, b) => `${a}${String(b)}` }, toMap()),
  ).toMatchTypeOf<
    Reducer<readonly [unknown, unknown], never, Map<unknown, string>>
  >()
  expectTypeOf(
    toGrouped({ create: () => ``, add: (a, b) => `${a}${String(b)}` })(toMap()),
  ).toMatchTypeOf<
    Reducer<readonly [unknown, unknown], never, Map<unknown, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(
        toGrouped({ create: () => ``, add: (a, b) => `${a}${b}` }, toMap()),
      ),
    ),
  ).toMatchTypeOf<Map<number, string>>()

  expectTypeOf(toGrouped(toMax(), toMap())).toMatchTypeOf<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(toGrouped(toMax())(toMap())).toMatchTypeOf<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped(toMax(), toMap())),
    ),
  ).toMatchTypeOf<Map<number, number>>()

  expectTypeOf(
    toGrouped({ add: (a: number, b: number) => a + b }, toMap()),
  ).toMatchTypeOf<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(
    toGrouped({ add: (a: number, b: number) => a + b })(toMap()),
  ).toMatchTypeOf<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped({ add: (a: number, b: number) => a + b }, toMap())),
    ),
  ).toMatchTypeOf<Map<number, number>>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toGrouped((a: number, b: number) => a + b, toMap())

  expectTypeOf(
    toGrouped((a: number, b: number) => a + b)(toMap()),
  ).toMatchTypeOf<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
})

const toConcat = () =>
  normalizeReducer(
    (a: unknown, b: unknown) => (String(a) + String(b)) as unknown,
  )
const groupedReducerTestCases = [
  ...reducerTestCases,
  ...namedTestCases([{ toConcat }]),
].flatMap(([innerReducerName, getInnerReducer]) =>
  keyedReducerTestCases.map(
    ([outerReducerName, getOuterReducer]) =>
      [
        innerReducerName,
        outerReducerName,
        getInnerReducer,
        getOuterReducer,
      ] as [
        string,
        string,
        () => Reducer | OptionalReducer,
        () => RawKeyedReducer,
      ],
  ),
)
test.each(groupedReducerTestCases)(
  `toGrouped(%s(), %s()) returns a reducer`,
  (
    unusedInnerReducerName,
    unusedOuterReducerName,
    getInnerReducer,
    getOuterReducer,
  ) => {
    const reducer = toGrouped(getInnerReducer(), getOuterReducer())

    expect(reducer).toBeReducer()
  },
)

testProp(
  `toArray reduces to an array`,
  [iterableArb],
  ({ iterable, values }) => {
    const array = reduce(toArray(), iterable)

    expect(array).toStrictEqual(values)
  },
)

testProp(`toSet reduces to a set`, [iterableArb], ({ iterable, values }) => {
  const set = reduce(toSet(), iterable)

  expect(set).toStrictEqual(new Set(values))
})

testProp(
  `toWeakSet reduces to a weak set`,
  [getIterableArb(fc.object())],
  ({ iterable, values }) => {
    const weakSet = reduce(toWeakSet(), iterable)

    for (const value of values) {
      expect(weakSet.has(value)).toBeTrue()
    }
  },
)

testProp(
  `toObject reduces to an object`,
  [getIterableArb(fc.tuple(fc.string(), fc.anything()))],
  ({ iterable, values }) => {
    const object = reduce(toObject(), iterable)

    expect(object).toStrictEqual(Object.fromEntries(values))
  },
)

testProp(
  `toMap reduces to a map`,
  [getIterableArb(fc.tuple(fc.anything(), fc.anything()))],
  ({ iterable, values }) => {
    const map = reduce(toMap(), iterable)

    expect(map).toStrictEqual(new Map(values))
  },
)

testProp(
  `toWeakMap reduces to a weak map`,
  [getIterableArb(fc.tuple(fc.object(), fc.anything()))],
  ({ iterable, values }) => {
    const weakMap = reduce(toWeakMap(), iterable)

    for (const [key, value] of new Map(values)) {
      expect(weakMap.get(key)).toBe(value)
    }
  },
)

testProp(
  `toGrouped(toArray(), toObject()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
  [getIterableArb(fc.tuple(fc.string(), fc.anything()))],
  ({ iterable, values }) => {
    const object = reduce(toGrouped(toArray(), toObject()), iterable)

    expect(object).toContainAllKeys([...new Set(values.map(([key]) => key))])
    expect(Object.values(object).flat()).toIncludeSameMembers(
      values.map(([, value]) => value),
    )
    for (const [key, value] of values) {
      expect(object[key]).toSatisfyAny(item => sameValueZero(item, value))
    }
  },
)

testProp(
  `toGrouped(toArray(), toMap()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
  [getIterableArb(fc.tuple(fc.anything(), fc.anything()))],
  ({ iterable, values }) => {
    const map = reduce(toGrouped(toArray(), toMap()), iterable)

    expect([...map.keys()]).toStrictEqual([
      ...new Set(values.map(([key]) => key)),
    ])
    expect([...map.values()].flat()).toIncludeSameMembers(
      values.map(([, value]) => value),
    )
    for (const [key, value] of values) {
      expect(map.get(key)).toSatisfyAny(item => sameValueZero(item, value))
    }
  },
)

testProp(
  `toGrouped(toJoin(), toMap()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
  [getIterableArb(fc.tuple(fc.anything(), stringifiableArb))],
  ({ iterable, values }) => {
    const map = reduce(toGrouped(toJoin(`,`), toMap()), iterable)

    expect([...map.keys()]).toStrictEqual([
      ...new Set(values.map(([key]) => key)),
    ])
    const groups = reduce(toGrouped(toArray(), toMap()), iterable)
    for (const [key, group] of groups) {
      expect(map.get(key)).toBe(group.map(String).join(`,`))
    }
  },
)

testProp(
  `toGrouped(toConcat(), toMap()) reduces using the outer reducer and reduces values with the same key using the optional inner reducer`,
  [getIterableArb(fc.tuple(fc.anything(), stringifiableArb))],
  ({ iterable, values }) => {
    const map = reduce(toGrouped(toConcat(), toMap()), iterable)

    expect([...map.keys()]).toStrictEqual([
      ...new Set(values.map(([key]) => key)),
    ])
    const groups = reduce(toGrouped(toArray(), toMap()), iterable)
    for (const [key, group] of groups) {
      expect(map.get(key)).toBe(
        group.length === 1 ? group[0] : group.map(String).join(``),
      )
    }
  },
)

test.skip(`toMultiple types are correct`, () => {
  expectTypeOf(toMultiple([toSet(), toArray()])).toMatchTypeOf<
    Reducer<unknown, [Set<unknown>, unknown[]]>
  >()
  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toSet(), toArray()]))),
  ).toMatchTypeOf<[Set<number>, number[]]>()

  expectTypeOf(toMultiple({ set: toSet(), array: toArray() })).toMatchTypeOf<
    Reducer<unknown, { set: Set<unknown>; array: unknown[] }>
  >()
  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple({ set: toSet(), array: toArray() }))),
  ).toMatchTypeOf<{ set: Set<number>; array: number[] }>()

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toMax(), toSet()])), get),
  ).toMatchTypeOf<[number, Set<number>]>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toMultiple([toMax(), toSet()])

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple({ max: toMax(), set: toSet() })), get),
  ).toMatchTypeOf<{ max: number; set: Set<number> }>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toMultiple({ max: toMax(), set: toSet() })

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toSet(), (a, b) => a + b])), get),
  ).toMatchTypeOf<[Set<number>, number]>()

  expectTypeOf(
    pipe(
      [1, 2, 3],
      reduce(toMultiple({ set: toSet(), sum: (a, b) => a + b })),
      get,
    ),
  ).toMatchTypeOf<{ set: Set<number>; sum: number }>()
})

testProp(
  `toMultiple returns a reducer for an array of reducers`,
  [fc.array(rawReducerArb)],
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeReducer()
  },
)

testProp(
  `toMultiple returns a reducer for an object of reducers`,
  [fc.dictionary(fc.string(), rawReducerArb)],
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeReducer()
  },
)

const arrayWithAtLeastOneOptionalReducerArb = fc
  .array(fc.oneof(rawReducerArb, rawOptionalReducerArb))
  .filter(reducers => reducers.some(reducer => !(`create` in reducer)))

testProp(
  `toMultiple returns an optional reducer for an array of reducers where at least one is optional`,
  [arrayWithAtLeastOneOptionalReducerArb],
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeOptionalReducer()
  },
)

const objectWithAtLeastOneOptionalReducerArb = fc
  .dictionary(fc.string(), fc.oneof(rawReducerArb, rawOptionalReducerArb))
  .filter(reducers =>
    Object.values(reducers).some(reducer => !(`create` in reducer)),
  )

testProp(
  `toMultiple returns an optional reducer for an object of reducers where at least one is optional`,
  [objectWithAtLeastOneOptionalReducerArb],
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeOptionalReducer()
  },
)

testProp(
  `toMultiple reduces to an array tuple using the given array of reducers`,
  [fc.array(rawReducerArb), iterableArb],
  (reducers, { iterable }) => {
    const values = reduce(toMultiple(reducers), iterable)

    expect(values).toStrictEqual(
      reducers.map(reducer => reduce(reducer, iterable)),
    )
  },
)

testProp(
  `toMultiple reduces to an object using the given object of reducers`,
  [fc.dictionary(fc.string(), rawReducerArb), iterableArb],
  (reducers, { iterable }) => {
    const values = reduce(toMultiple(reducers), iterable)

    expect(values).toStrictEqual(
      pipe(
        entries(reducers),
        map(([key, reducer]) => [key, reduce(reducer, iterable)] as const),
        reduce(toObject()),
      ),
    )
  },
)

testProp(
  `toMultiple reduces to an empty optional for an array of reducers where at least one is optional and an empty iterable`,
  [arrayWithAtLeastOneOptionalReducerArb],
  reducers => {
    const values = reduce(toMultiple(reducers), [])

    expect([...values]).toBeEmpty()
  },
)

testProp(
  `toMultiple reduces to an array tuple for an array of reducers where at least one is optional and a non-empty iterable`,
  [arrayWithAtLeastOneOptionalReducerArb, nonEmptyIterableArb],
  (reducers, { iterable }) => {
    const values = reduce(toMultiple(reducers), iterable)

    expect(get(values)).toStrictEqual(
      reducers.map(reducer => {
        const reduced = reduce(reducer, iterable)
        return `create` in reducer ? reduced : get(reduced)
      }),
    )
  },
)

testProp(
  `toMultiple reduces to an empty optional for an object of reducers where at least one is optional and an empty iterable`,
  [objectWithAtLeastOneOptionalReducerArb],
  reducers => {
    const values = reduce(toMultiple(reducers), [])

    expect([...values]).toBeEmpty()
  },
)

testProp(
  `toMultiple reduces to an object for an object of reducers where at least one is optional and a non-empty iterable`,
  [objectWithAtLeastOneOptionalReducerArb, nonEmptyIterableArb],
  (reducers, { iterable }) => {
    const values = reduce(toMultiple(reducers), iterable)

    expect(get(values)).toStrictEqual(
      pipe(
        entries(reducers),
        map(([key, reducer]) => {
          const reduced = reduce(reducer, iterable)
          return [key, `create` in reducer ? reduced : get(reduced)] as const
        }),
        reduce(toObject()),
      ),
    )
  },
)

test.skip(`toJoin types are correct`, () => {
  expectTypeOf(toJoin(`,`)).toMatchTypeOf<Reducer<unknown, unknown, string>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toJoin(`,`)))).toMatchTypeOf<string>()
})

testProp(`toJoin returns a reducer`, [fc.string()], separator => {
  const reducer = toJoin(separator)

  expect(reducer).toBeReducer()
})

testProp(
  `toJoin reduces to a string`,
  [fc.string(), getIterableArb(stringifiableArb)],
  (separator, { iterable, values }) => {
    const string = reduce(toJoin(separator), iterable)

    expect(string).toBe(values.map(String).join(separator))
  },
)

test.skip(`join types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], join(`,`))).toMatchTypeOf<string>()
})

testProp(
  `join returns a string containing the string representations of same values in the same order as the given iterable separated by the given separator`,
  [fc.string(), getIterableArb(stringifiableArb)],
  (separator, { iterable, values }) => {
    const joined = join(separator, iterable)

    expect(joined).toBe(values.map(String).join(separator))
  },
)

test.skip(`joinAsync types are correct`, async () => {
  expectTypeOf(
    await pipe(asAsync([1, 2, 3]), joinAsync(`,`)),
  ).toMatchTypeOf<string>()
})

testProp(
  `joinAsync returns a string containing the string representations of same values in the same order as the given async iterable separated by the given separator`,
  [fc.string(), getAsyncIterableArb(stringifiableArb)],
  async (separator, { iterable, values }) => {
    const joined = await joinAsync(separator, iterable)

    expect(joined).toBe(values.map(String).join(separator))
  },
)

test.skip(`joinConcur types are correct`, async () => {
  expectTypeOf(
    await pipe(asConcur([1, 2, 3]), joinConcur(`,`)),
  ).toMatchTypeOf<string>()
})

testProp(
  `joinConcur returns a string containing the string representations of same values as the given concur iterable separated by the given separator`,
  [fc.string(), getConcurIterableArb(stringifiableArb)],
  async (separator, { iterable, values }) => {
    const joined = await joinConcur(separator, iterable)

    for (const value of values) {
      expect(joined).toContain(String(value))
    }
    // Max.max is needed in case the iterable is empty.
    const expectedSeparatorCount =
      separator === `` ? 0 : Math.max(values.length - 1, 0)
    // The number of occurrences of the separator exceeds the "expected" count
    // when a string representation of a value in the iterable contains the
    // separator.
    expect(count(indicesOf(joined, separator))).toBeGreaterThanOrEqual(
      expectedSeparatorCount,
    )
    expect(joined).toHaveLength(
      pipe(
        values,
        map(value => String(value).length),
        sum,
      ) +
        expectedSeparatorCount * separator.length,
    )
  },
)

const indicesOf = (string: string, substring: string): Iterable<number> => {
  if (substring === ``) {
    return []
  }

  return {
    *[Symbol.iterator](): Iterator<number> {
      let index = 0
      while ((index = string.indexOf(substring, index)) !== -1) {
        yield index++
      }
    },
  }
}

test.skip(`concat types are correct`, () => {
  expectTypeOf(concat([1, 2, 3], [1, 2, 3], [1, 2, 3])).toMatchTypeOf<
    Iterable<number>
  >()
})

testProp(
  `concat returns a pure iterable`,
  [fc.array(iterableArb)],
  iterables => {
    const concatenatedIterable = concat(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect(concatenatedIterable).toBeIterable()
  },
)

testProp(
  `concat returns an iterable concatenated from the given iterables`,
  [fc.array(iterableArb)],
  iterables => {
    const concatenatedIterable = concat(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect([...concatenatedIterable]).toStrictEqual(
      iterables.flatMap(({ values }) => values),
    )
  },
)

test(`concat returns an empty iterable for zero arguments`, () => {
  const iterable = concat()

  expect([...iterable]).toBeEmpty()
})

test.skip(`concatAsync types are correct`, () => {
  expectTypeOf(
    concatAsync([1, 2, 3], asAsync([1, 2, 3]), [1, 2, 3]),
  ).toMatchTypeOf<AsyncIterable<number>>()
})

testProp(
  `concatAsync returns a pure async iterable`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb))],
  async iterables => {
    const concatenatedIterable = concatAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(concatenatedIterable).toBeAsyncIterable()
  },
)

testProp(
  `concatAsync returns an async iterable concatenated from the given iterables`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb))],
  async iterables => {
    const concatenatedIterable = concatAsync(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect(await reduceAsync(toArray(), concatenatedIterable)).toStrictEqual(
      iterables.flatMap(({ values }) => values),
    )
  },
)

test(
  `concatAsync returns an empty async iterable for zero arguments`,
  autoAdvance(async () => {
    const asyncIterable = concatAsync()

    expect(await reduceAsync(toArray(), asyncIterable)).toBeEmpty()
  }),
)

test.skip(`concatConcur types are correct`, () => {
  expectTypeOf(
    concatConcur([1, 2, 3], asAsync([1, 2, 3]), asConcur([1, 2, 3])),
  ).toMatchTypeOf<ConcurIterable<number>>()
})

testProp(
  `concatConcur returns a pure concur iterable`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb))],
  async iterables => {
    const concatenatedIterable = concatConcur(
      ...iterables.map(({ iterable }) => iterable),
    )

    await expect(concatenatedIterable).toBeConcurIterable()
  },
)

testProp(
  `concatConcur returns a concur iterable concatenated from the given iterables`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb))],
  async iterables => {
    const concatenatedIterable = concatConcur(
      ...iterables.map(({ iterable }) => iterable),
    )

    expect(
      await reduceConcur(toArray(), concatenatedIterable),
    ).toIncludeSameMembers(iterables.flatMap(({ values }) => values))
  },
)

test(
  `concatConcur returns an empty concur iterable for zero arguments`,
  autoAdvance(async () => {
    const concurIterable = concatConcur()

    expect(await reduceConcur(toArray(), concurIterable)).toBeEmpty()
  }),
)

testProp(
  `concatConcur returns a concur iterable as concurrent as the given iterables`,
  [fc.array(fc.oneof(iterableArb, asyncIterableArb, concurIterableArb))],
  async (iterables, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(concatConcur(...iterables.map(({ iterable }) => iterable))),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)
