import { fc } from '@fast-check/vitest'
import { expect, expectTypeOf } from 'vitest'
import { stringifiableArb } from '../../test/fast-check/anything.ts'
import {
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
  getThrowingConcurIterableArb,
  iterableArb,
  nonEmptyIterableArb,
} from '../../test/fast-check/iterables.ts'
import {
  rawOptionalReducerArb,
  rawReducerArb,
} from '../../test/fast-check/reducers.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import { sameValueZero } from '../../test/same-value-zero.ts'
import {
  asAsync,
  asConcur,
  entries,
  get,
  join,
  joinAsync,
  joinConcur,
  map,
  normalizeReducer,
  pipe,
  reduce,
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
} from '../index.js'
import type {
  KeyedReducer,
  OptionalReducer,
  RawKeyedReducer,
  Reducer,
} from '../index.js'

test.skip(`toArray types are correct`, () => {
  expectTypeOf(toArray<string>()).toExtend<Reducer<string, string[]>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toArray()))).toExtend<number[]>()
})

test.skip(`toSet types are correct`, () => {
  expectTypeOf(toSet<string>()).toExtend<Reducer<string, Set<string>>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toSet()))).toExtend<Set<number>>()
})

test.skip(`toWeakSet types are correct`, () => {
  expectTypeOf(toWeakSet<{ a: string }>()).toExtend<
    Reducer<{ a: string }, WeakSet<{ a: string }>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => ({ n })),
      reduce(toWeakSet()),
    ),
  ).toExtend<WeakSet<{ n: number }>>()

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
  expectTypeOf(toObject<string, string>()).toExtend<
    KeyedReducer<string, string, Record<string, string>>
  >()
  expectTypeOf(toObject<number, string>()).toExtend<
    KeyedReducer<number, string, Record<number, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [String(n), n] as const),
      reduce(toObject()),
    ),
  ).toExtend<Record<string, number>>()

  // @ts-expect-error Objects can only have string, symbol, and number keys.
  toObject<object, string>()
})

test.skip(`toMap types are correct`, () => {
  expectTypeOf(toMap<{ a: string }, string>()).toExtend<
    KeyedReducer<{ a: string }, string, Map<{ a: string }, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [String(n), n] as const),
      reduce(toMap()),
    ),
  ).toExtend<Map<string, number>>()
})

test.skip(`toWeakMap types are correct`, () => {
  expectTypeOf(toWeakMap<{ a: string }, string>()).toExtend<
    KeyedReducer<{ a: string }, string, WeakMap<{ a: string }, string>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3],
      map(n => [{ n }, n] as const),
      reduce(toWeakMap()),
    ),
  ).toExtend<WeakMap<{ n: number }, number>>()

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

test.skip(`toGrouped types are correct`, () => {
  expectTypeOf(toGrouped(toArray(), toMap())).toExtend<
    Reducer<readonly [unknown, unknown], never, Map<unknown, unknown[]>>
  >()
  expectTypeOf(toGrouped(toArray())(toMap())).toExtend<
    Reducer<readonly [unknown, unknown], never, Map<unknown, unknown[]>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped(toArray(), toMap())),
    ),
  ).toExtend<Map<number, number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [String(n), n] as const),
      reduce(toGrouped(toArray(), toObject())),
    ),
  ).toExtend<Record<string, number[]>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [{ n }, n] as const),
      reduce(toGrouped(toSet(), toWeakMap())),
    ),
  ).toExtend<WeakMap<{ n: number }, Set<number>>>()

  expectTypeOf(
    toGrouped({ create: () => ``, add: (a, b) => `${a}${String(b)}` }, toMap()),
  ).toExtend<
    Reducer<readonly [unknown, unknown], never, Map<unknown, string>>
  >()
  expectTypeOf(
    toGrouped({ create: () => ``, add: (a, b) => `${a}${String(b)}` })(toMap()),
  ).toExtend<
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
  ).toExtend<Map<number, string>>()

  expectTypeOf(toGrouped(toMax(), toMap())).toExtend<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(toGrouped(toMax())(toMap())).toExtend<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped(toMax(), toMap())),
    ),
  ).toExtend<Map<number, number>>()

  expectTypeOf(
    toGrouped({ add: (a: number, b: number) => a + b }, toMap()),
  ).toExtend<Reducer<readonly [unknown, number], never, Map<unknown, number>>>()
  expectTypeOf(
    toGrouped({ add: (a: number, b: number) => a + b })(toMap()),
  ).toExtend<Reducer<readonly [unknown, number], never, Map<unknown, number>>>()
  expectTypeOf(
    pipe(
      [1, 2, 3, 4, 5],
      map(n => [n, n] as const),
      reduce(toGrouped({ add: (a: number, b: number) => a + b }, toMap())),
    ),
  ).toExtend<Map<number, number>>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toGrouped((a: number, b: number) => a + b, toMap())

  expectTypeOf(toGrouped((a: number, b: number) => a + b)(toMap())).toExtend<
    Reducer<readonly [unknown, number], never, Map<unknown, number>>
  >()
})

test.prop([getIterableArb(fc.tuple(fc.string(), fc.anything()))])(
  `toGrouped(toArray(), toObject()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
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

test.prop([getIterableArb(fc.tuple(fc.anything(), fc.anything()))])(
  `toGrouped(toArray(), toMap()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
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

test.prop([getIterableArb(fc.tuple(fc.anything(), stringifiableArb))])(
  `toGrouped(toJoin(), toMap()) reduces using the outer reducer and reduces values with the same key using the inner reducer`,
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

test.prop([getIterableArb(fc.tuple(fc.anything(), stringifiableArb))])(
  `toGrouped(toConcat(), toMap()) reduces using the outer reducer and reduces values with the same key using the optional inner reducer`,
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
  expectTypeOf(toMultiple([toSet(), toArray()])).toExtend<
    Reducer<unknown, [Set<unknown>, unknown[]]>
  >()
  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toSet(), toArray()]))),
  ).toExtend<[Set<number>, number[]]>()

  expectTypeOf(toMultiple({ set: toSet(), array: toArray() })).toExtend<
    Reducer<unknown, { set: Set<unknown>; array: unknown[] }>
  >()
  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple({ set: toSet(), array: toArray() }))),
  ).toExtend<{ set: Set<number>; array: number[] }>()

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toMax(), toSet()])), get),
  ).toExtend<[number, Set<number>]>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toMultiple([toMax(), toSet()])

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple({ max: toMax(), set: toSet() })), get),
  ).toExtend<{ max: number; set: Set<number> }>()

  // @ts-expect-error TODO: Make this typecheck without generic type arguments.
  toMultiple({ max: toMax(), set: toSet() })

  expectTypeOf(
    pipe([1, 2, 3], reduce(toMultiple([toSet(), (a, b) => a + b])), get),
  ).toExtend<[Set<number>, number]>()

  expectTypeOf(
    pipe(
      [1, 2, 3],
      reduce(toMultiple({ set: toSet(), sum: (a, b) => a + b })),
      get,
    ),
  ).toExtend<{ set: Set<number>; sum: number }>()
})

test.prop([fc.array(rawReducerArb)])(
  `toMultiple returns a reducer for an array of reducers`,
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeReducer()
  },
)

test.prop([fc.dictionary(fc.string(), rawReducerArb)])(
  `toMultiple returns a reducer for an object of reducers`,
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeReducer()
  },
)

const arrayWithAtLeastOneOptionalReducerArb = fc
  .array(fc.oneof(rawReducerArb, rawOptionalReducerArb))
  .filter(reducers => reducers.some(reducer => !(`create` in reducer)))

test.prop([arrayWithAtLeastOneOptionalReducerArb])(
  `toMultiple returns an optional reducer for an array of reducers where at least one is optional`,
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

test.prop([objectWithAtLeastOneOptionalReducerArb])(
  `toMultiple returns an optional reducer for an object of reducers where at least one is optional`,
  reducers => {
    const reducer = toMultiple(reducers)

    expect(reducer).toBeOptionalReducer()
  },
)

test.prop([fc.array(rawReducerArb), iterableArb])(
  `toMultiple reduces to an array tuple using the given array of reducers`,
  (reducers, { iterable }) => {
    const values = reduce(toMultiple(reducers), iterable)

    expect(values).toStrictEqual(
      reducers.map(reducer => reduce(reducer, iterable)),
    )
  },
)

test.prop([fc.dictionary(fc.string(), rawReducerArb), iterableArb])(
  `toMultiple reduces to an object using the given object of reducers`,
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

test.prop([arrayWithAtLeastOneOptionalReducerArb])(
  `toMultiple reduces to an empty optional for an array of reducers where at least one is optional and an empty iterable`,
  reducers => {
    const values = reduce(toMultiple(reducers), [])

    expect([...values]).toBeEmpty()
  },
)

test.prop([arrayWithAtLeastOneOptionalReducerArb, nonEmptyIterableArb])(
  `toMultiple reduces to an array tuple for an array of reducers where at least one is optional and a non-empty iterable`,
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

test.prop([objectWithAtLeastOneOptionalReducerArb])(
  `toMultiple reduces to an empty optional for an object of reducers where at least one is optional and an empty iterable`,
  reducers => {
    const values = reduce(toMultiple(reducers), [])

    expect([...values]).toBeEmpty()
  },
)

test.prop([objectWithAtLeastOneOptionalReducerArb, nonEmptyIterableArb])(
  `toMultiple reduces to an object for an object of reducers where at least one is optional and a non-empty iterable`,
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

test.prop([iterableArb])(
  `toArray reduces to an array`,
  ({ iterable, values }) => {
    const array = reduce(toArray(), iterable)

    expect(array).toStrictEqual(values)
  },
)

test.prop([iterableArb])(`toSet reduces to a set`, ({ iterable, values }) => {
  const set = reduce(toSet(), iterable)

  expect(set).toStrictEqual(new Set(values))
})

test.prop([getIterableArb(fc.object())])(
  `toWeakSet reduces to a weak set`,
  ({ iterable, values }) => {
    const weakSet = reduce(toWeakSet(), iterable)

    for (const value of values) {
      expect(weakSet.has(value)).toBeTrue()
    }
  },
)

test.prop([getIterableArb(fc.tuple(fc.string(), fc.anything()))])(
  `toObject reduces to an object`,
  ({ iterable, values }) => {
    const object = reduce(toObject(), iterable)

    expect(object).toStrictEqual(Object.fromEntries(values))
  },
)

test.prop([getIterableArb(fc.tuple(fc.anything(), fc.anything()))])(
  `toMap reduces to a map`,
  ({ iterable, values }) => {
    const map = reduce(toMap(), iterable)

    expect(map).toStrictEqual(new Map(values))
  },
)

test.prop([getIterableArb(fc.tuple(fc.object(), fc.anything()))])(
  `toWeakMap reduces to a weak map`,
  ({ iterable, values }) => {
    const weakMap = reduce(toWeakMap(), iterable)

    for (const [key, value] of new Map(values)) {
      expect(weakMap.get(key)).toBe(value)
    }
  },
)

test.skip(`toJoin types are correct`, () => {
  expectTypeOf(toJoin(`,`)).toExtend<Reducer<unknown, unknown, string>>()
  expectTypeOf(pipe([1, 2, 3], reduce(toJoin(`,`)))).toExtend<string>()
})

test.prop([fc.string()])(`toJoin returns a reducer`, separator => {
  const reducer = toJoin(separator)

  expect(reducer).toBeReducer()
})

test.prop([fc.string(), getIterableArb(stringifiableArb)])(
  `toJoin reduces to a string`,
  (separator, { iterable, values }) => {
    const string = reduce(toJoin(separator), iterable)

    expect(string).toBe(values.map(String).join(separator))
  },
)

test.skip(`join types are correct`, () => {
  expectTypeOf(pipe([1, 2, 3], join(`,`))).toExtend<string>()
})

test.prop([fc.string(), getIterableArb(stringifiableArb)])(
  `join returns a string containing the string representations of same values in the same order as the given iterable separated by the given separator`,
  (separator, { iterable, values }) => {
    const joined = join(separator, iterable)

    expect(joined).toBe(values.map(String).join(separator))
  },
)

test.skip(`joinAsync types are correct`, async () => {
  expectTypeOf(
    await pipe(asAsync([1, 2, 3]), joinAsync(`,`)),
  ).toExtend<string>()
})

test.prop([fc.string(), getAsyncIterableArb(stringifiableArb)])(
  `joinAsync returns a string containing the string representations of same values in the same order as the given async iterable separated by the given separator`,
  async (separator, { iterable, values }) => {
    const joined = await joinAsync(separator, iterable)

    expect(joined).toBe(values.map(String).join(separator))
  },
)

test.skip(`joinConcur types are correct`, async () => {
  expectTypeOf(
    await pipe(asConcur([1, 2, 3]), joinConcur(`,`)),
  ).toExtend<string>()
})

test.prop([fc.string(), getConcurIterableArb(stringifiableArb)])(
  `joinConcur returns a string containing the string representations of same values as the given concur iterable separated by the given separator`,
  async (separator, { iterable, getIterationOrder }) => {
    const joined = await joinConcur(separator, iterable)

    expect(joined).toStrictEqual(
      getIterationOrder().map(String).join(separator),
    )
  },
)

test.prop([
  fc.string(),
  getThrowingConcurIterableArb(getConcurIterableArb(stringifiableArb)),
])(
  `joinConcur rejects for a throwing concur iterable`,
  async (separator, { iterable }) => {
    const joined = joinConcur(separator, iterable)

    await expect(joined).rejects.toStrictEqual(new Error(`BOOM!`))
  },
)
