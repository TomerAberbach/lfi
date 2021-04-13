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
import { windowed, windowedAsync, windowedConcur } from '../src/windowed.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { forEachConcur } from '../src/each.js'
import { asAsync, asConcur } from '../src/as.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyConcurIterableArb,
  nonEmptyIterableArb,
  nonPositiveIntegerArb,
  nonSafeIntegerDoubleArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

const positiveIntegerArb = fc.integer({ min: 1, max: 100 })

testProp(
  `windowed returns an iterable`,
  [positiveIntegerArb, iterableArb],
  (t, size, iterable) => {
    const windowedIterable = windowed(size, iterable)

    t.iterable(windowedIterable)
  }
)

testProp(
  `windowed throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, iterableArb],
  (t, size, iterable) => {
    t.throws(() => windowed(size, iterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowed throws for a non-positive integer size`,
  [nonPositiveIntegerArb, iterableArb],
  (t, size, iterable) => {
    t.throws(() => windowed(size, iterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowed returns an empty iterable when size is greater than the given iterable's length`,
  [
    fc
      .tuple(positiveIntegerArb, iterableArb)
      .map(([size, iterable]) => [size + iterable.values.length, iterable])
  ],
  (t, [size, iterable]) => {
    const windowedIterable = windowed(size, iterable)

    t.deepEqual([...windowedIterable], [])
  }
)

testProp(
  `windowed returns windows of the given size for the given iterable`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyIterableArb)
      .map(([size, iterable]) => [
        Math.max(1, size % (iterable.values.length + 1)),
        iterable
      ])
  ],
  (t, [size, iterable]) => {
    const windowedIterable = windowed(size, iterable)

    let index = 0
    for (const window of windowedIterable) {
      t.deepEqual(window, iterable.values.slice(index, index + size))
      index++
    }
  }
)

test(`windowed concrete example`, t => {
  const iterable = [1, 2, 3, 4, 5, 6, 7, 8]

  const windowedIterable = windowed(3, iterable)

  t.deepEqual(
    [...windowedIterable],
    [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [5, 6, 7],
      [6, 7, 8]
    ]
  )
})

testProp(
  `windowedAsync returns an async iterable`,
  [positiveIntegerArb, asyncIterableArb],
  async (t, size, asyncIterable) => {
    const windowedAsyncIterable = windowedAsync(size, asyncIterable)

    await t.asyncIterable(windowedAsyncIterable)
  }
)

testProp(
  `windowedAsync throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, asyncIterableArb],
  (t, size, asyncIterable) => {
    t.throws(() => windowedAsync(size, asyncIterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowedAsync throws for a non-positive integer size`,
  [nonPositiveIntegerArb, asyncIterableArb],
  (t, size, asyncIterable) => {
    t.throws(() => windowedAsync(size, asyncIterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowedAsync returns an empty async iterable when size is greater than the given async iterable's length`,
  [
    fc
      .tuple(positiveIntegerArb, asyncIterableArb)
      .map(([size, asyncIterable]) => [
        size + asyncIterable.values.length,
        asyncIterable
      ])
  ],
  async (t, [size, asyncIterable]) => {
    const windowedAsyncIterable = windowedAsync(size, asyncIterable)

    t.deepEqual(await collectAsync(toArray, windowedAsyncIterable), [])
  }
)

testProp(
  `windowedAsync returns windows of the given size for the given async iterable`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyAsyncIterableArb)
      .map(([size, asyncIterable]) => [
        Math.max(1, size % (asyncIterable.values.length + 1)),
        asyncIterable
      ])
  ],
  async (t, [size, asyncIterable]) => {
    const windowedAsyncIterable = windowedAsync(size, asyncIterable)

    let index = 0
    for await (const window of windowedAsyncIterable) {
      t.deepEqual(window, asyncIterable.values.slice(index, index + size))
      index++
    }
  }
)

test(`windowedAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7, 8])

  const windowedAsyncIterable = windowedAsync(3, asyncIterable)

  t.deepEqual(await collectAsync(toArray, windowedAsyncIterable), [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8]
  ])
})

testProp(
  `windowedConcur returns a concur iterable`,
  [positiveIntegerArb, concurIterableArb],
  async (t, size, concurIterable) => {
    const windowedConcurIterable = windowedConcur(size, concurIterable)

    await t.concurIterable(windowedConcurIterable)
  }
)

testProp(
  `windowedConcur throws for a non-integer size`,
  [nonSafeIntegerDoubleArb, concurIterableArb],
  (t, size, concurIterable) => {
    t.throws(() => windowedConcur(size, concurIterable), {
      message: `\`size\` must be an integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowedConcur throws for a non-positive integer size`,
  [nonPositiveIntegerArb, concurIterableArb],
  (t, size, concurIterable) => {
    t.throws(() => windowedConcur(size, concurIterable), {
      message: `\`size\` must be a positive integer: ${size}`,
      instanceOf: Error
    })
  }
)

testProp(
  `windowedConcur returns an empty async iterable when size is greater than the given async iterable's length`,
  [
    fc
      .tuple(positiveIntegerArb, concurIterableArb)
      .map(([size, concurIterable]) => [
        size + concurIterable.values.length,
        concurIterable
      ])
  ],
  async (t, [size, concurIterable]) => {
    const windowedConcurIterable = windowedConcur(size, concurIterable)

    t.deepEqual(await collectConcur(toArray, windowedConcurIterable), [])
  }
)

testProp(
  `windowedConcur returns windows of the given size for the given concur iterable`,
  [
    fc
      .tuple(positiveIntegerArb, nonEmptyConcurIterableArb)
      .map(([size, concurIterable]) => [
        Math.max(1, size % (concurIterable.values.length + 1)),
        concurIterable
      ])
  ],
  async (t, [size, concurIterable]) => {
    const windowedConcurIterable = windowedConcur(size, concurIterable)

    let index = 0
    await forEachConcur(window => {
      t.deepEqual(
        window,
        concurIterable.iterationOrder.slice(index, index + size)
      )
      index++
    }, windowedConcurIterable)
  }
)

testProp(
  `windowedConcur is concurrent`,
  [positiveIntegerArb, concurIterableArb],
  async (t, size, concurIterable) => {
    const windowedConcurIterable = windowedConcur(size, concurIterable)

    // eslint-disable-next-line no-empty-function
    const promise = windowedConcurIterable(() => {})

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  }
)

test(`windowedConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7, 8])

  const windowedConcurIterable = windowedConcur(3, concurIterable)

  t.deepEqual(await collectConcur(toArray, windowedConcurIterable), [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5],
    [4, 5, 6],
    [5, 6, 7],
    [6, 7, 8]
  ])
})
