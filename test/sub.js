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

import { fc } from 'ava-fast-check'
import {
  drop,
  dropAsync,
  dropConcur,
  dropWhile,
  dropWhileAsync,
  dropWhileConcur,
  first,
  firstAsync,
  firstConcur,
  last,
  lastAsync,
  lastConcur,
  take,
  takeAsync,
  takeConcur,
  takeWhile,
  takeWhileAsync,
  takeWhileConcur
} from '../src/sub.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  emptyAsyncIterableArb,
  emptyConcurIterableArb,
  emptyIterableArb,
  fnArb,
  iterableArb,
  maybeAsyncFnArb,
  negativeIntegerArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
  nonNegativeIntegerArb,
  nonSafeIntegerDoubleArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `dropWhile returns an iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const subIterable = dropWhile(fn, iterable)

    t.iterable(subIterable)
  }
)

testProp(
  `dropWhile returns the given iterable when the given predicate never returns true`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = dropWhile(() => false, iterable)

    t.deepEqual([...subIterable], iterable.values)
  }
)

testProp(
  `dropWhile returns an empty iterable when the given predicate always returns true`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = dropWhile(() => true, iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `dropWhile returns the given iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(iterableArb, nonNegativeIntegerArb)
      .map(([iterable, index]) => [iterable, index % iterable.values.length])
  ],
  (t, [iterable, stopDroppingIndex]) => {
    let index = 0
    const subIterable = dropWhile(() => index++ !== stopDroppingIndex, iterable)

    t.deepEqual([...subIterable], iterable.values.slice(stopDroppingIndex))
  }
)

test(`dropWhile concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6]

  const subIterable = dropWhile(value => value < 4, iterable)

  t.deepEqual([...subIterable], [4, 5, 6])
})

testProp(
  `dropWhileAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const subAsyncIterable = dropWhileAsync(fn, asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `dropWhileAsync returns the given async iterable when the given predicate never returns true`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = dropWhileAsync(() => false, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `dropWhileAsync returns an empty async iterable when the given predicate always returns true`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = dropWhileAsync(() => true, asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `dropWhileAsync returns the given async iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(asyncIterableArb, nonNegativeIntegerArb)
      .map(([asyncIterable, index]) => [
        asyncIterable,
        index % asyncIterable.values.length
      ])
  ],
  async (t, [asyncIterable, stopDroppingIndex]) => {
    let index = 0
    const subAsyncIterable = dropWhileAsync(
      () => index++ !== stopDroppingIndex,
      asyncIterable
    )

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values.slice(stopDroppingIndex)
    )
  }
)

test(`dropWhileAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6])

  const subAsyncIterable = dropWhileAsync(value => value < 4, asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [4, 5, 6])
})

testProp(
  `dropWhileConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const subConcurIterable = dropWhileConcur(fn, concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `dropWhileConcur returns the given concur iterable when the given predicate never returns true`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = dropWhileConcur(() => false, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder
    )
  }
)

testProp(
  `dropWhileConcur returns an empty concur iterable when the given predicate always returns true`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = dropWhileConcur(() => true, concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `dropWhileConcur returns the given concur iterable's elements starting from the first element for which the given function does not return true`,
  [
    fc
      .tuple(concurIterableArb, nonNegativeIntegerArb)
      .map(([concurIterable, index]) => [
        concurIterable,
        index % concurIterable.values.length
      ])
  ],
  async (t, [concurIterable, stopDroppingIndex]) => {
    let index = 0
    const subConcurIterable = dropWhileConcur(
      () => index++ !== stopDroppingIndex,
      concurIterable
    )

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder.slice(stopDroppingIndex)
    )
  }
)

testProp(
  `dropWhileConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const subConcurIterable = dropWhileConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`dropWhileConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6])

  const subConcurIterable = dropWhileConcur(value => value < 4, concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [4, 5, 6])
})

testProp(
  `takeWhile returns an iterable`,
  [fnArb, iterableArb],
  (t, fn, iterable) => {
    const subIterable = takeWhile(fn, iterable)

    t.iterable(subIterable)
  }
)

testProp(
  `takeWhile returns the given iterable when the given predicate always returns true`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = takeWhile(() => true, iterable)

    t.deepEqual([...subIterable], iterable.values)
  }
)

testProp(
  `takeWhile returns an empty iterable when the given predicate never returns true`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = takeWhile(() => false, iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `takeWhile returns the given iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(iterableArb, nonNegativeIntegerArb)
      .map(([iterable, index]) => [iterable, index % iterable.values.length])
  ],
  (t, [iterable, stopTakingIndex]) => {
    let index = 0
    const subIterable = takeWhile(() => index++ !== stopTakingIndex, iterable)

    t.deepEqual([...subIterable], iterable.values.slice(0, stopTakingIndex))
  }
)

test(`takeWhile concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6]

  const subIterable = takeWhile(value => value < 4, iterable)

  t.deepEqual([...subIterable], [1, 2, 3])
})

testProp(
  `takeWhileAsync returns an async iterable`,
  [maybeAsyncFnArb, asyncIterableArb],
  async (t, fn, asyncIterable) => {
    const subAsyncIterable = takeWhileAsync(fn, asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `takeWhileAsync returns the given async iterable when the given predicate always returns true`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = takeWhileAsync(() => true, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `takeWhileAsync returns an empty async iterable when the given predicate never returns true`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = takeWhileAsync(() => false, asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `takeWhileAsync returns the given async iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(asyncIterableArb, nonNegativeIntegerArb)
      .map(([asyncIterable, index]) => [
        asyncIterable,
        index % asyncIterable.values.length
      ])
  ],
  async (t, [asyncIterable, stopTakingIndex]) => {
    let index = 0
    const subAsyncIterable = takeWhileAsync(
      () => index++ !== stopTakingIndex,
      asyncIterable
    )

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values.slice(0, stopTakingIndex)
    )
  }
)

test(`takeWhileAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6])

  const subAsyncIterable = takeWhileAsync(value => value < 4, asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [1, 2, 3])
})

testProp(
  `takeWhileConcur returns a concur iterable`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const subConcurIterable = takeWhileConcur(fn, concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `takeWhileConcur returns the given concur iterable when the given predicate always returns true`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = takeWhileConcur(() => true, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder
    )
  }
)

testProp(
  `takeWhileConcur returns an empty concur iterable when the given predicate never returns true`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = takeWhileConcur(() => false, concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `takeWhileConcur returns the given concur iterable's elements up to the first element for which the given function does not return true`,
  [
    fc
      .tuple(concurIterableArb, nonNegativeIntegerArb)
      .map(([concurIterable, index]) => [
        concurIterable,
        index % concurIterable.values.length
      ])
  ],
  async (t, [concurIterable, stopTakingIndex]) => {
    let index = 0
    const subConcurIterable = takeWhileConcur(
      () => index++ !== stopTakingIndex,
      concurIterable
    )

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder.slice(0, stopTakingIndex)
    )
  }
)

testProp(
  `takeWhileConcur is concurrent`,
  [maybeAsyncFnArb, concurIterableArb],
  async (t, fn, concurIterable) => {
    const subConcurIterable = takeWhileConcur(fn, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout + fn.timeout)

    t.fulfilled(promise)
  }
)

test(`takeWhileConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6])

  const subConcurIterable = takeWhileConcur(value => value < 4, concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [1, 2, 3])
})

testProp(
  `drop returns an iterable`,
  [nonNegativeIntegerArb, iterableArb],
  (t, count, iterable) => {
    const subIterable = drop(count, iterable)

    t.iterable(subIterable)
  }
)

testProp(
  `drop throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (t, count, iterable) => {
    t.throws(() => drop(count, iterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `drop throws for a negative integer count`,
  [negativeIntegerArb, iterableArb],
  (t, count, iterable) => {
    t.throws(() => drop(count, iterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `drop returns the given iterable for zero`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = drop(0, iterable)

    t.deepEqual([...subIterable], iterable.values)
  }
)

testProp(
  `drop returns an empty iterable for greater than or equal to the given iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, iterableArb)
      .map(([count, iterable]) => [count + iterable.values.length, iterable])
  ],
  (t, [count, iterable]) => {
    const subIterable = drop(count, iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `drop drops the given number of elements from the start of the given iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
      .map(([count, iterable]) => [count % iterable.values.length, iterable])
  ],
  (t, [count, iterable]) => {
    const subIterable = drop(count, iterable)

    t.deepEqual([...subIterable], iterable.values.slice(count))
  }
)

test(`drop concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6, 7]

  const subIterable = drop(3, iterable)

  t.deepEqual([...subIterable], [4, 5, 6, 7])
})

testProp(
  `dropAsync returns an async iterable`,
  [nonNegativeIntegerArb, asyncIterableArb],
  async (t, count, asyncIterable) => {
    const subAsyncIterable = dropAsync(count, asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `dropAsync throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (t, count, asyncIterable) => {
    t.throws(() => dropAsync(count, asyncIterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `dropAsync throws for a negative integer count`,
  [negativeIntegerArb, asyncIterableArb],
  (t, count, asyncIterable) => {
    t.throws(() => dropAsync(count, asyncIterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `dropAsync returns the given async iterable for zero`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = dropAsync(0, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `dropAsync returns an empty async iterable for greater than or equal to the given async iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, asyncIterableArb)
      .map(([count, asyncIterable]) => [
        count + asyncIterable.values.length,
        asyncIterable
      ])
  ],
  async (t, [count, asyncIterable]) => {
    const subAsyncIterable = dropAsync(count, asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `dropAsync drops the given number of elements from the start of the given async iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
      .map(([count, asyncIterable]) => [
        count % asyncIterable.values.length,
        asyncIterable
      ])
  ],
  async (t, [count, asyncIterable]) => {
    const subAsyncIterable = dropAsync(count, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values.slice(count)
    )
  }
)

test(`dropAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7])

  const subAsyncIterable = dropAsync(3, asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [4, 5, 6, 7])
})

testProp(
  `dropConcur returns a concur iterable`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (t, count, concurIterable) => {
    const subConcurIterable = dropConcur(count, concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `dropConcur throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (t, count, concurIterable) => {
    t.throws(() => dropConcur(count, concurIterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `dropConcur throws for a negative integer count`,
  [negativeIntegerArb, concurIterableArb],
  (t, count, concurIterable) => {
    t.throws(() => dropConcur(count, concurIterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `dropConcur returns the given concur iterable for zero`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = dropConcur(0, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder
    )
  }
)

testProp(
  `dropConcur returns an empty concur iterable for greater than or equal to the given concur iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, concurIterableArb)
      .map(([count, concurIterable]) => [
        count + concurIterable.values.length,
        concurIterable
      ])
  ],
  async (t, [count, concurIterable]) => {
    const subConcurIterable = dropConcur(count, concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `dropConcur drops the given number of elements from the start of the given concur iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
      .map(([count, concurIterable]) => [
        count % concurIterable.values.length,
        concurIterable
      ])
  ],
  async (t, [count, concurIterable]) => {
    const subConcurIterable = dropConcur(count, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder.slice(count)
    )
  }
)

testProp(
  `dropConcur is concurrent`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (t, count, concurIterable) => {
    const subConcurIterable = dropConcur(count, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  }
)

test(`dropConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7])

  const subConcurIterable = dropConcur(3, concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [4, 5, 6, 7])
})

testProp(
  `take returns an iterable`,
  [nonNegativeIntegerArb, iterableArb],
  (t, count, iterable) => {
    const subIterable = take(count, iterable)

    t.iterable(subIterable)
  }
)

testProp(
  `take throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (t, count, iterable) => {
    t.throws(() => take(count, iterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `take throws for a negative integer count`,
  [negativeIntegerArb, iterableArb],
  (t, count, iterable) => {
    t.throws(() => take(count, iterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `take returns the given iterable for greater than or equal to the given iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, iterableArb)
      .map(([count, iterable]) => [count + iterable.values.length, iterable])
  ],
  (t, [count, iterable]) => {
    const subIterable = take(count, iterable)

    t.deepEqual([...subIterable], iterable.values)
  }
)

testProp(
  `take returns an empty iterable for zero`,
  [iterableArb],
  (t, iterable) => {
    const subIterable = take(0, iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `take takes the given number of elements from the start of the given iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyIterableArb)
      .map(([count, iterable]) => [count % iterable.values.length, iterable])
  ],
  (t, [count, iterable]) => {
    const subIterable = take(count, iterable)

    t.deepEqual([...subIterable], iterable.values.slice(0, count))
  }
)

test(`take concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6, 7]

  const subIterable = take(3, iterable)

  t.deepEqual([...subIterable], [1, 2, 3])
})

testProp(
  `takeAsync returns an async iterable`,
  [nonNegativeIntegerArb, asyncIterableArb],
  async (t, count, asyncIterable) => {
    const subAsyncIterable = takeAsync(count, asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `takeAsync throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (t, count, asyncIterable) => {
    t.throws(() => takeAsync(count, asyncIterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `takeAsync throws for a negative integer count`,
  [negativeIntegerArb, asyncIterableArb],
  (t, count, asyncIterable) => {
    t.throws(() => takeAsync(count, asyncIterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `takeAsync returns the given async iterable for greater than or equal to the given async iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, asyncIterableArb)
      .map(([count, asyncIterable]) => [
        count + asyncIterable.values.length,
        asyncIterable
      ])
  ],
  async (t, [count, asyncIterable]) => {
    const subAsyncIterable = takeAsync(count, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values
    )
  }
)

testProp(
  `takeAsync returns an empty async iterable for zero`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = takeAsync(0, asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `takeAsync takes the given number of elements from the start of the given async iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyAsyncIterableArb)
      .map(([count, asyncIterable]) => [
        count % asyncIterable.values.length,
        asyncIterable
      ])
  ],
  async (t, [count, asyncIterable]) => {
    const subAsyncIterable = takeAsync(count, asyncIterable)

    t.deepEqual(
      await collectAsync(toArray, subAsyncIterable),
      asyncIterable.values.slice(0, count)
    )
  }
)

test(`takeAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7])

  const subAsyncIterable = takeAsync(3, asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [1, 2, 3])
})

testProp(
  `takeConcur returns a concur iterable`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (t, count, concurIterable) => {
    const subConcurIterable = takeConcur(count, concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `takeConcur throws for a non-integer count`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (t, count, concurIterable) => {
    t.throws(() => takeConcur(count, concurIterable), {
      message: `\`count\` must be an integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `takeConcur throws for a negative integer count`,
  [negativeIntegerArb, concurIterableArb],
  (t, count, concurIterable) => {
    t.throws(() => takeConcur(count, concurIterable), {
      message: `\`count\` must be a non-negative integer: ${count}`,
      instanceOf: Error
    })
  }
)

testProp(
  `takeConcur returns the given concur iterable for greater than or equal to the given concur iterable's length`,
  [
    fc
      .tuple(nonNegativeIntegerArb, concurIterableArb)
      .map(([count, concurIterable]) => [
        count + concurIterable.values.length,
        concurIterable
      ])
  ],
  async (t, [count, concurIterable]) => {
    const subConcurIterable = takeConcur(count, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder
    )
  }
)

testProp(
  `takeConcur returns an empty concur iterable for zero`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = takeConcur(0, concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `takeConcur takes the given number of elements from the start of the given concur iterable`,
  [
    fc
      .tuple(nonNegativeIntegerArb, nonEmptyConcurIterableArb)
      .map(([count, concurIterable]) => [
        count % concurIterable.values.length,
        concurIterable
      ])
  ],
  async (t, [count, concurIterable]) => {
    const subConcurIterable = takeConcur(count, concurIterable)

    t.deepEqual(
      await collectConcur(toArray, subConcurIterable),
      concurIterable.iterationOrder.slice(0, count)
    )
  }
)

testProp(
  `takeConcur is concurrent`,
  [nonNegativeIntegerArb, concurIterableArb],
  async (t, count, concurIterable) => {
    const subConcurIterable = takeConcur(count, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  }
)

test(`takeConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7])

  const subConcurIterable = takeConcur(3, concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [1, 2, 3])
})

testProp(`first returns an iterable`, [iterableArb], (t, iterable) => {
  const subIterable = first(iterable)

  t.iterable(subIterable)
})

testProp(
  `first returns an empty iterable for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const subIterable = first(iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `first returns an iterable containing the first element of the given iterable for a non-empty iterable`,
  [nonEmptyIterableArb],
  (t, iterable) => {
    const subIterable = first(iterable)

    t.deepEqual([...subIterable], [iterable.values[0]])
  }
)

test(`first concrete example`, t => {
  const iterable = [1, 2, 3]

  const subIterable = first(iterable)

  t.deepEqual([...subIterable], [1])
})

testProp(
  `firstAsync returns an async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = firstAsync(asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `firstAsync returns an empty async iterable for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = firstAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `firstAsync returns an async iterable containing the first element of the given async iterable for a non-empty async iterable`,
  [nonEmptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = firstAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [
      asyncIterable.values[0]
    ])
  }
)

test(`firstAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const subAsyncIterable = firstAsync(asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [1])
})

testProp(
  `firstConcur returns a concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = firstConcur(concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `firstConcur returns an empty concur iterable for an empty concur iterable`,
  [emptyConcurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = firstConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `firstConcur returns a concur iterable containing the first element of the given concur iterable for a non-empty concur iterable`,
  [nonEmptyConcurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = firstConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [
      concurIterable.iterationOrder[0]
    ])
  }
)

testProp(
  `firstConcur is concurrent`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = firstConcur(concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.minTimeout)

    t.fulfilled(promise)
  }
)

test(`firstConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const subConcurIterable = firstConcur(concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [1])
})

testProp(`last returns an iterable`, [iterableArb], (t, iterable) => {
  const subIterable = last(iterable)

  t.iterable(subIterable)
})

testProp(
  `last returns an empty iterable for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    const subIterable = last(iterable)

    t.deepEqual([...subIterable], [])
  }
)

testProp(
  `last returns an iterable containing the last element of the given iterable for a non-empty iterable`,
  [nonEmptyIterableArb],
  (t, iterable) => {
    const subIterable = last(iterable)

    t.deepEqual([...subIterable], [iterable.values[iterable.values.length - 1]])
  }
)

test(`last concrete example`, t => {
  const iterable = [1, 2, 3]

  const subIterable = last(iterable)

  t.deepEqual([...subIterable], [3])
})

testProp(
  `lastAsync returns an async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = lastAsync(asyncIterable)

    await t.asyncIterable(subAsyncIterable)
  }
)

testProp(
  `lastAsync returns an empty async iterable for an empty async iterable`,
  [emptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = lastAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [])
  }
)

testProp(
  `lastAsync returns an async iterable containing the last element of the given async iterable for a non-empty async iterable`,
  [nonEmptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const subAsyncIterable = lastAsync(asyncIterable)

    t.deepEqual(await collectAsync(toArray, subAsyncIterable), [
      asyncIterable.values[asyncIterable.values.length - 1]
    ])
  }
)

test(`lastAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const subAsyncIterable = lastAsync(asyncIterable)

  t.deepEqual(await collectAsync(toArray, subAsyncIterable), [3])
})

testProp(
  `lastConcur returns a concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = lastConcur(concurIterable)

    await t.concurIterable(subConcurIterable)
  }
)

testProp(
  `lastConcur returns an empty concur iterable for an empty concur iterable`,
  [emptyConcurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = lastConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [])
  }
)

testProp(
  `lastConcur returns a concur iterable containing the last element of the given concur iterable for a non-empty concur iterable`,
  [nonEmptyConcurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = lastConcur(concurIterable)

    t.deepEqual(await collectConcur(toArray, subConcurIterable), [
      concurIterable.iterationOrder[concurIterable.iterationOrder.length - 1]
    ])
  }
)

testProp(
  `lastConcur is concurrent`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const subConcurIterable = firstConcur(concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = subConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  }
)

test(`lastConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const subConcurIterable = lastConcur(concurIterable)

  t.deepEqual(await collectConcur(toArray, subConcurIterable), [3])
})
