import { fc } from '@fast-check/vitest'
import { expect } from 'vitest'
import {
  asyncAbelianGroupFnArb,
  asyncFnArb,
  fnArb,
} from '../../test/fast-check/fns.ts'
import {
  asyncFunctionReducerArb,
  functionReducerArb,
  getAsyncFunctionReducerArb,
  getRawAsyncOptionalReducerWithFinishArb,
  getRawAsyncOptionalReducerWithoutFinishArb,
  getRawAsyncReducerWithFinishArb,
  getRawAsyncReducerWithoutFinishArb,
  rawAsyncOptionalReducerWithFinishArb,
  rawAsyncOptionalReducerWithoutFinishArb,
  rawAsyncReducerWithFinishArb,
  rawOptionalReducerWithFinishArb,
  rawOptionalReducerWithoutFinishArb,
  rawReducerWithFinishArb,
  rawReducerWithoutFinishArb,
} from '../../test/fast-check/reducers.ts'
import { test } from '../../test/fast-check/test-prop.ts'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  iterableArb,
  nonEmptyIterableArb,
} from '../../test/fast-check/iterables.ts'
import {
  emptyAsync,
  emptyConcur,
  mapAsyncReducer,
  mapReducer,
  normalizeReducer,
  reduce,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../index.js'

test.prop([functionReducerArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a function reducer`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer(value1, value2))
    expect(finish(value1)).toBe(value1)
  },
)

test.prop([rawOptionalReducerWithoutFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw optional reducer without finish`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

test.prop([rawOptionalReducerWithFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw optional reducer with finish`,
  (reducer, value1, value2) => {
    const { add, finish } = normalizeReducer(reducer)

    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

test.prop([rawReducerWithoutFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw reducer without finish`,
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(value1)
    expect(finish(value2)).toBe(value2)
  },
)

test.prop([rawReducerWithFinishArb, fc.anything(), fc.anything()])(
  `normalizeReducer normalizes a raw reducer with finish`,
  (reducer, value1, value2) => {
    const { create, add, finish } = normalizeReducer(reducer)

    expect(create()).toBe(reducer.create())
    expect(add(value1, value2)).toBe(reducer.add(value1, value2))
    expect(finish(value1)).toBe(reducer.finish(value1))
    expect(finish(value2)).toBe(reducer.finish(value2))
  },
)

test.prop([fnArb, functionReducerArb, fc.anything()])(
  `mapReducer maps the given function reducer using the finish method`,
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(value))
  },
)

test.prop([fnArb, rawReducerWithFinishArb, fc.anything()])(
  `mapReducer maps the given reducer with finish using the finish method`,
  (fn, reducer, value) => {
    const { finish } = mapReducer(fn, reducer)

    expect(finish(value)).toBe(fn(reducer.finish(value)))
  },
)

test.prop([asyncFnArb, asyncFunctionReducerArb, fc.anything()])(
  `mapAsyncReducer maps the given async function reducer using the finish method`,
  async ({ asyncFn, syncFn }, { asyncFunctionReducer }, value) => {
    const { finish } = mapAsyncReducer(asyncFn, asyncFunctionReducer)

    expect(await finish(value)).toBe(syncFn(value))
  },
)

test.prop([asyncFnArb, rawAsyncReducerWithFinishArb, fc.anything()])(
  `mapAsyncReducer maps the given async reducer with finish using the finish method`,
  async ({ asyncFn, syncFn }, { asyncReducer, syncReducer }, value) => {
    const mappedReducer = mapAsyncReducer(asyncFn, asyncReducer)

    expect(await mappedReducer.finish(value)).toBe(
      syncFn(syncReducer.finish(value)),
    )
  },
)

test.prop([functionReducerArb, iterableArb])(
  `reduce returns a pure iterable for a function reducer`,
  (fn, { iterable }) => {
    const reduced = reduce(fn, iterable)

    expect(reduced).toBeIterable()
  },
)

test.prop([functionReducerArb])(
  `reduce returns an empty iterable for a function reducer and empty iterable`,
  fn => {
    const reduced = reduce(fn, [])

    expect([...reduced]).toStrictEqual([])
  },
)

test.prop([functionReducerArb, nonEmptyIterableArb])(
  `reduce reduces the given non-empty iterable using the given function reducer`,
  (fn, { iterable, values }) => {
    const reduced = reduce(fn, iterable)

    expect([...reduced]).toStrictEqual([values.reduce(fn)])
  },
)

test.prop([rawOptionalReducerWithoutFinishArb, iterableArb])(
  `reduce returns a pure iterable for an optional reducer without finish`,
  (reducer, { iterable }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toBeIterable()
  },
)

test.prop([rawOptionalReducerWithoutFinishArb])(
  `reduce returns an empty iterable for a optional reducer without finish and empty iterable`,
  reducer => {
    const reduced = reduce(reducer, [])

    expect([...reduced]).toStrictEqual([])
  },
)

test.prop([rawOptionalReducerWithoutFinishArb, nonEmptyIterableArb])(
  `reduce reduces the given non-empty iterable using the given optional reducer without finish`,
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect([...reduced]).toStrictEqual([
      values.reduce((a, b) => reducer.add(a, b)),
    ])
  },
)

test.prop([rawOptionalReducerWithFinishArb, iterableArb])(
  `reduce returns a pure iterable for an optional reducer with finish`,
  (reducer, { iterable }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toBeIterable()
  },
)

test.prop([rawOptionalReducerWithFinishArb])(
  `reduce returns an empty iterable for a optional reducer with finish and empty iterable`,
  reducer => {
    const reduced = reduce(reducer, [])

    expect([...reduced]).toStrictEqual([])
  },
)

test.prop([rawOptionalReducerWithFinishArb, nonEmptyIterableArb])(
  `reduce reduces the given non-empty iterable using the given optional reducer with finish`,
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect([...reduced]).toStrictEqual([
      reducer.finish(values.reduce((a, b) => reducer.add(a, b))),
    ])
  },
)

test.prop([rawReducerWithoutFinishArb, iterableArb])(
  `reduce reduces the given iterable using the given reducer without finish`,
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => reducer.add(a, b), reducer.create()),
    )
  },
)

test.prop([rawReducerWithFinishArb, iterableArb])(
  `reduce reduces the given iterable using the given reducer with finish`,
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toStrictEqual(
      reducer.finish(
        values.reduce((a, b) => reducer.add(a, b), reducer.create()),
      ),
    )
  },
)

test.prop([asyncFunctionReducerArb, asyncIterableArb])(
  `reduceAsync returns an async iterable for an async function reducer`,
  async ({ asyncFunctionReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncFunctionReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

test.prop([asyncFunctionReducerArb])(
  `reduceAsync returns an empty async iterable for an async function reducer and empty async iterable`,
  async ({ asyncFunctionReducer }) => {
    const reduced = reduceAsync(asyncFunctionReducer, emptyAsync())

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getAsyncFunctionReducerArb(asyncAbelianGroupFnArb),
  getAsyncIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceAsync reduces the given non-empty async iterable using the given async abelian group function reducer`,
  async (
    { asyncFunctionReducer, syncFunctionReducer },
    { iterable, values },
  ) => {
    const reduced = reduceAsync(asyncFunctionReducer, iterable)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([
      values.reduce(syncFunctionReducer),
    ])
  },
)

test.prop([rawAsyncOptionalReducerWithoutFinishArb, asyncIterableArb])(
  `reduceAsync returns an async iterable for an async optional reducer without finish`,
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

test.prop([rawAsyncOptionalReducerWithoutFinishArb])(
  `reduceAsync returns an empty async iterable for an async optional reducer without finish and empty async iterable`,
  async ({ asyncReducer }) => {
    const reduced = reduceAsync(asyncReducer, emptyAsync())

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getRawAsyncOptionalReducerWithoutFinishArb(asyncAbelianGroupFnArb),
  getAsyncIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceAsync reduces the given non-empty async iterable using the given abelian group async optional reducer without finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([
      values.reduce((a, b) => Number(syncReducer.add(a, b))),
    ])
  },
)

test.prop([rawAsyncOptionalReducerWithFinishArb, asyncIterableArb])(
  `reduceAsync returns an async iterable for an async optional reducer with finish`,
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

test.prop([rawAsyncOptionalReducerWithFinishArb])(
  `reduceAsync returns an empty async iterable for an async optional reducer with finish and empty async iterable`,
  async ({ asyncReducer }) => {
    const reduced = reduceAsync(asyncReducer, emptyAsync())

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getRawAsyncOptionalReducerWithFinishArb(asyncAbelianGroupFnArb),
  getAsyncIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceAsync reduces the given non-empty async iterable using the given abelian group async optional reducer with finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([
      syncReducer.finish(
        values.reduce((a, b) => Number(syncReducer.add(a, b))),
      ),
    ])
  },
)

test.prop([
  getRawAsyncReducerWithoutFinishArb(asyncAbelianGroupFnArb),
  getAsyncIterableArb(fc.integer()),
])(
  `reduceAsync reduces the given async iterable using the given abelian group async reducer without finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceAsync(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
    )
  },
)

test.prop([asyncIterableArb])(
  `reduceAsync reduces the given async iterable using the given async reducer with combine and without finish`,
  async ({ iterable, values }, scheduler) => {
    const syncReducer = {
      create: () => [] as unknown[],
      add: (acc: unknown[], value: unknown) => {
        acc.push(value)
        return acc
      },
      combine: (acc1: unknown[], acc2: unknown[]) => {
        acc1.push(...acc2)
        return acc1
      },
    }

    const reduced = await reduceAsync(
      {
        create: () =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.combine(acc1, acc2)),
      },
      iterable,
    )

    expect(reduced).toIncludeSameMembers(
      values.reduce(
        (a: unknown[], b) => syncReducer.add(a, b),
        syncReducer.create(),
      ),
    )
  },
)

test.prop([
  getRawAsyncReducerWithFinishArb(asyncAbelianGroupFnArb),
  getAsyncIterableArb(fc.integer()),
])(
  `reduceAsync reduces the given async iterable using the given abelian group async reducer with finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceAsync(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      syncReducer.finish(
        values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
      ),
    )
  },
)

test.prop([asyncIterableArb])(
  `reduceAsync reduces the given async iterable using the given async reducer with combine and finish`,
  async ({ iterable, values }, scheduler) => {
    const syncReducer = {
      create: () => [] as unknown[],
      add: (acc: unknown[], value: unknown) => {
        acc.push(value)
        return acc
      },
      combine: (acc1: unknown[], acc2: unknown[]) => {
        acc1.push(...acc2)
        return acc1
      },
      finish: (acc: unknown[]) => [...acc, ...acc],
    }

    const reduced = await reduceAsync(
      {
        create: () =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.combine(acc1, acc2)),
        finish: acc =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.finish(acc)),
      },
      iterable,
    )

    expect(reduced).toIncludeSameMembers(
      syncReducer.finish(
        values.reduce(
          (a: unknown[], b) => syncReducer.add(a, b),
          syncReducer.create(),
        ),
      ),
    )
  },
)

test.prop([asyncFunctionReducerArb, concurIterableArb])(
  `reduceConcur returns an concur iterable for an async function reducer`,
  async ({ asyncFunctionReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncFunctionReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

test.prop([asyncFunctionReducerArb])(
  `reduceConcur returns an empty concur iterable for an async function reducer and empty concur iterable`,
  async ({ asyncFunctionReducer }) => {
    const reduced = reduceConcur(asyncFunctionReducer, emptyConcur())

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getAsyncFunctionReducerArb(asyncAbelianGroupFnArb),
  getConcurIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceConcur reduces the given non-empty concur iterable using the given async abelian group function reducer`,
  async (
    { asyncFunctionReducer, syncFunctionReducer },
    { iterable, values },
  ) => {
    const reduced = reduceConcur(asyncFunctionReducer, iterable)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([
      values.reduce(syncFunctionReducer),
    ])
  },
)

test.prop([rawAsyncOptionalReducerWithoutFinishArb, concurIterableArb])(
  `reduceConcur returns an concur iterable for an async optional reducer without finish`,
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

test.prop([rawAsyncOptionalReducerWithoutFinishArb])(
  `reduceConcur returns an empty concur iterable for an async optional reducer without finish and empty concur iterable`,
  async ({ asyncReducer }) => {
    const reduced = reduceConcur(asyncReducer, emptyConcur())

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getRawAsyncOptionalReducerWithoutFinishArb(asyncAbelianGroupFnArb),
  getConcurIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceConcur reduces the given non-empty concur iterable using the given abelian group async optional reducer without finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([
      values.reduce((a, b) => Number(syncReducer.add(a, b))),
    ])
  },
)

test.prop([rawAsyncOptionalReducerWithFinishArb, concurIterableArb])(
  `reduceConcur returns an concur iterable for an async optional reducer with finish`,
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

test.prop([rawAsyncOptionalReducerWithFinishArb])(
  `reduceConcur returns an empty concur iterable for an async optional reducer with finish and empty concur iterable`,
  async ({ asyncReducer }) => {
    const reduced = reduceConcur(asyncReducer, emptyConcur())

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

test.prop([
  getRawAsyncOptionalReducerWithFinishArb(asyncAbelianGroupFnArb),
  getConcurIterableArb(fc.integer(), { minLength: 1 }),
])(
  `reduceConcur reduces the given non-empty concur iterable using the given abelian group async optional reducer with finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([
      syncReducer.finish(
        values.reduce((a, b) => Number(syncReducer.add(a, b))),
      ),
    ])
  },
)

test.prop([
  getRawAsyncReducerWithoutFinishArb(asyncAbelianGroupFnArb),
  getConcurIterableArb(fc.integer()),
])(
  `reduceConcur reduces the given concur iterable using the given abelian group async reducer without finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceConcur(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
    )
  },
)

test.prop([concurIterableArb])(
  `reduceConcur reduces the given concur iterable using the given async reducer with combine and without finish`,
  async ({ iterable, values }, scheduler) => {
    const syncReducer = {
      create: () => [] as unknown[],
      add: (acc: unknown[], value: unknown) => {
        acc.push(value)
        return acc
      },
      combine: (acc1: unknown[], acc2: unknown[]) => {
        acc1.push(...acc2)
        return acc1
      },
    }

    const reduced = await reduceConcur(
      {
        create: () =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.combine(acc1, acc2)),
      },
      iterable,
    )

    expect(reduced).toIncludeSameMembers(
      values.reduce(
        (a: unknown[], b) => syncReducer.add(a, b),
        syncReducer.create(),
      ),
    )
  },
)

test.prop([
  getRawAsyncReducerWithFinishArb(asyncAbelianGroupFnArb),
  getConcurIterableArb(fc.integer()),
])(
  `reduceConcur reduces the given concur iterable using the given abelian group async reducer with finish`,
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceConcur(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      syncReducer.finish(
        values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
      ),
    )
  },
)

test.prop([concurIterableArb])(
  `reduceConcur reduces the given async iterable using the given concur reducer with combine and finish`,
  async ({ iterable, values }, scheduler) => {
    const syncReducer = {
      create: () => [] as unknown[],
      add: (acc: unknown[], value: unknown) => {
        acc.push(value)
        return acc
      },
      combine: (acc1: unknown[], acc2: unknown[]) => {
        acc1.push(...acc2)
        return acc1
      },
      finish: (acc: unknown[]) => [...acc, ...acc],
    }

    const reduced = await reduceConcur(
      {
        create: () =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.combine(acc1, acc2)),
        finish: acc =>
          scheduler
            .schedule(Promise.resolve())
            .then(() => syncReducer.finish(acc)),
      },
      iterable,
    )

    expect(reduced).toIncludeSameMembers(
      syncReducer.finish(
        values.reduce(
          (a: unknown[], b) => syncReducer.add(a, b),
          syncReducer.create(),
        ),
      ),
    )
  },
)
