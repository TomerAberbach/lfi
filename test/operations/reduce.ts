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
import { fc } from 'tomer'
import {
  emptyAsync,
  emptyConcur,
  reduce,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../../src/index.js'
import { asyncAbelianGroupFnArb } from '../helpers/fast-check/fn.js'
import {
  asyncIterableArb,
  concurIterableArb,
  getAsyncIterableArb,
  getConcurIterableArb,
  iterableArb,
  nonEmptyIterableArb,
} from '../helpers/fast-check/iterable.js'
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
  rawOptionalReducerWithFinishArb,
  rawOptionalReducerWithoutFinishArb,
  rawReducerWithFinishArb,
  rawReducerWithoutFinishArb,
} from '../helpers/fast-check/reducer.js'
import { testProp } from '../helpers/fast-check/test-prop.js'

testProp(
  `reduce returns a pure iterable for a function reducer`,
  [functionReducerArb, iterableArb],
  (fn, { iterable }) => {
    const reduced = reduce(fn, iterable)

    expect(reduced).toBeIterable()
  },
)

testProp(
  `reduce returns an empty iterable for a function reducer and empty iterable`,
  [functionReducerArb],
  fn => {
    const reduced = reduce(fn, [])

    expect([...reduced]).toStrictEqual([])
  },
)

testProp(
  `reduce reduces the given non-empty iterable using the given function reducer`,
  [functionReducerArb, nonEmptyIterableArb],
  (fn, { iterable, values }) => {
    const reduced = reduce(fn, iterable)

    expect([...reduced]).toStrictEqual([values.reduce(fn)])
  },
)

testProp(
  `reduce returns a pure iterable for an optional reducer without finish`,
  [rawOptionalReducerWithoutFinishArb, iterableArb],
  (reducer, { iterable }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toBeIterable()
  },
)

testProp(
  `reduce returns an empty iterable for a optional reducer without finish and empty iterable`,
  [rawOptionalReducerWithoutFinishArb],
  reducer => {
    const reduced = reduce(reducer, [])

    expect([...reduced]).toStrictEqual([])
  },
)

testProp(
  `reduce reduces the given non-empty iterable using the given optional reducer without finish`,
  [rawOptionalReducerWithoutFinishArb, nonEmptyIterableArb],
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect([...reduced]).toStrictEqual([
      values.reduce((a, b) => reducer.add(a, b)),
    ])
  },
)

testProp(
  `reduce returns a pure iterable for an optional reducer with finish`,
  [rawOptionalReducerWithFinishArb, iterableArb],
  (reducer, { iterable }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toBeIterable()
  },
)

testProp(
  `reduce returns an empty iterable for a optional reducer with finish and empty iterable`,
  [rawOptionalReducerWithFinishArb],
  reducer => {
    const reduced = reduce(reducer, [])

    expect([...reduced]).toStrictEqual([])
  },
)

testProp(
  `reduce reduces the given non-empty iterable using the given optional reducer with finish`,
  [rawOptionalReducerWithFinishArb, nonEmptyIterableArb],
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect([...reduced]).toStrictEqual([
      reducer.finish(values.reduce((a, b) => reducer.add(a, b))),
    ])
  },
)

testProp(
  `reduce reduces the given iterable using the given reducer without finish`,
  [rawReducerWithoutFinishArb, iterableArb],
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => reducer.add(a, b), reducer.create()),
    )
  },
)

testProp(
  `reduce reduces the given iterable using the given reducer with finish`,
  [rawReducerWithFinishArb, iterableArb],
  (reducer, { iterable, values }) => {
    const reduced = reduce(reducer, iterable)

    expect(reduced).toStrictEqual(
      reducer.finish(
        values.reduce((a, b) => reducer.add(a, b), reducer.create()),
      ),
    )
  },
)

testProp(
  `reduceAsync returns an async iterable for an async function reducer`,
  [asyncFunctionReducerArb, asyncIterableArb],
  async ({ asyncFunctionReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncFunctionReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `reduceAsync returns an empty async iterable for an async function reducer and empty async iterable`,
  [asyncFunctionReducerArb],
  async ({ asyncFunctionReducer }) => {
    const reduced = reduceAsync(asyncFunctionReducer, emptyAsync)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceAsync reduces the given non-empty async iterable using the given async abelian group function reducer`,
  [
    getAsyncFunctionReducerArb(asyncAbelianGroupFnArb),
    getAsyncIterableArb(fc.integer(), { minLength: 1 }),
  ],
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

testProp(
  `reduceAsync returns an async iterable for an async optional reducer without finish`,
  [rawAsyncOptionalReducerWithoutFinishArb, asyncIterableArb],
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `reduceAsync returns an empty async iterable for an async optional reducer without finish and empty async iterable`,
  [rawAsyncOptionalReducerWithoutFinishArb],
  async ({ asyncReducer }) => {
    const reduced = reduceAsync(asyncReducer, emptyAsync)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceAsync reduces the given non-empty async iterable using the given abelian group async optional reducer without finish`,
  [
    getRawAsyncOptionalReducerWithoutFinishArb(asyncAbelianGroupFnArb),
    getAsyncIterableArb(fc.integer(), { minLength: 1 }),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([
      values.reduce((a, b) => Number(syncReducer.add(a, b))),
    ])
  },
)

testProp(
  `reduceAsync returns an async iterable for an async optional reducer with finish`,
  [rawAsyncOptionalReducerWithFinishArb, asyncIterableArb],
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    await expect(reduced).toBeAsyncIterable({ pure: false })
  },
)

testProp(
  `reduceAsync returns an empty async iterable for an async optional reducer with finish and empty async iterable`,
  [rawAsyncOptionalReducerWithFinishArb],
  async ({ asyncReducer }) => {
    const reduced = reduceAsync(asyncReducer, emptyAsync)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceAsync reduces the given non-empty async iterable using the given abelian group async optional reducer with finish`,
  [
    getRawAsyncOptionalReducerWithFinishArb(asyncAbelianGroupFnArb),
    getAsyncIterableArb(fc.integer(), { minLength: 1 }),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceAsync(asyncReducer, iterable)

    expect(await reduceAsync(toArray(), reduced)).toStrictEqual([
      syncReducer.finish(
        values.reduce((a, b) => Number(syncReducer.add(a, b))),
      ),
    ])
  },
)

testProp(
  `reduceAsync reduces the given async iterable using the given abelian group async reducer without finish`,
  [
    getRawAsyncReducerWithoutFinishArb(asyncAbelianGroupFnArb),
    getAsyncIterableArb(fc.integer()),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceAsync(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
    )
  },
)

testProp(
  `reduceAsync reduces the given async iterable using the given async reducer with combine and without finish`,
  [asyncIterableArb],
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
        create: () => scheduler.schedule().then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler.schedule().then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler.schedule().then(() => syncReducer.combine(acc1, acc2)),
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

testProp(
  `reduceAsync reduces the given async iterable using the given abelian group async reducer with finish`,
  [
    getRawAsyncReducerWithFinishArb(asyncAbelianGroupFnArb),
    getAsyncIterableArb(fc.integer()),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceAsync(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      syncReducer.finish(
        values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
      ),
    )
  },
)

testProp(
  `reduceAsync reduces the given async iterable using the given async reducer with combine and finish`,
  [asyncIterableArb],
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
        create: () => scheduler.schedule().then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler.schedule().then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler.schedule().then(() => syncReducer.combine(acc1, acc2)),
        finish: acc => scheduler.schedule().then(() => syncReducer.finish(acc)),
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

testProp(
  `reduceConcur returns an concur iterable for an async function reducer`,
  [asyncFunctionReducerArb, concurIterableArb],
  async ({ asyncFunctionReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncFunctionReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `reduceConcur returns an empty concur iterable for an async function reducer and empty concur iterable`,
  [asyncFunctionReducerArb],
  async ({ asyncFunctionReducer }) => {
    const reduced = reduceConcur(asyncFunctionReducer, emptyConcur)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceConcur reduces the given non-empty concur iterable using the given async abelian group function reducer`,
  [
    getAsyncFunctionReducerArb(asyncAbelianGroupFnArb),
    getConcurIterableArb(fc.integer(), { minLength: 1 }),
  ],
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

testProp(
  `reduceConcur returns an concur iterable for an async optional reducer without finish`,
  [rawAsyncOptionalReducerWithoutFinishArb, concurIterableArb],
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `reduceConcur returns an empty concur iterable for an async optional reducer without finish and empty concur iterable`,
  [rawAsyncOptionalReducerWithoutFinishArb],
  async ({ asyncReducer }) => {
    const reduced = reduceConcur(asyncReducer, emptyConcur)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceConcur reduces the given non-empty concur iterable using the given abelian group async optional reducer without finish`,
  [
    getRawAsyncOptionalReducerWithoutFinishArb(asyncAbelianGroupFnArb),
    getConcurIterableArb(fc.integer(), { minLength: 1 }),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([
      values.reduce((a, b) => Number(syncReducer.add(a, b))),
    ])
  },
)

testProp(
  `reduceConcur returns an concur iterable for an async optional reducer with finish`,
  [rawAsyncOptionalReducerWithFinishArb, concurIterableArb],
  async ({ asyncReducer }, { iterable }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    await expect(reduced).toBeConcurIterable({ pure: false })
  },
)

testProp(
  `reduceConcur returns an empty concur iterable for an async optional reducer with finish and empty concur iterable`,
  [rawAsyncOptionalReducerWithFinishArb],
  async ({ asyncReducer }) => {
    const reduced = reduceConcur(asyncReducer, emptyConcur)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([])
  },
)

testProp(
  `reduceConcur reduces the given non-empty concur iterable using the given abelian group async optional reducer with finish`,
  [
    getRawAsyncOptionalReducerWithFinishArb(asyncAbelianGroupFnArb),
    getConcurIterableArb(fc.integer(), { minLength: 1 }),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = reduceConcur(asyncReducer, iterable)

    expect(await reduceConcur(toArray(), reduced)).toStrictEqual([
      syncReducer.finish(
        values.reduce((a, b) => Number(syncReducer.add(a, b))),
      ),
    ])
  },
)

testProp(
  `reduceConcur reduces the given concur iterable using the given abelian group async reducer without finish`,
  [
    getRawAsyncReducerWithoutFinishArb(asyncAbelianGroupFnArb),
    getConcurIterableArb(fc.integer()),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceConcur(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
    )
  },
)

testProp(
  `reduceConcur reduces the given concur iterable using the given async reducer with combine and without finish`,
  [concurIterableArb],
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
        create: () => scheduler.schedule().then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler.schedule().then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler.schedule().then(() => syncReducer.combine(acc1, acc2)),
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

testProp(
  `reduceConcur reduces the given concur iterable using the given abelian group async reducer with finish`,
  [
    getRawAsyncReducerWithFinishArb(asyncAbelianGroupFnArb),
    getConcurIterableArb(fc.integer()),
  ],
  async ({ asyncReducer, syncReducer }, { iterable, values }) => {
    const reduced = await reduceConcur(asyncReducer, iterable)

    expect(reduced).toStrictEqual(
      syncReducer.finish(
        values.reduce((a, b) => syncReducer.add(a, b), syncReducer.create()),
      ),
    )
  },
)

testProp(
  `reduceConcur reduces the given async iterable using the given concur reducer with combine and finish`,
  [concurIterableArb],
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
        create: () => scheduler.schedule().then(() => syncReducer.create()),
        add: (acc, value) =>
          scheduler.schedule().then(() => syncReducer.add(acc, value)),
        combine: (acc1, acc2) =>
          scheduler.schedule().then(() => syncReducer.combine(acc1, acc2)),
        finish: acc => scheduler.schedule().then(() => syncReducer.finish(acc)),
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
