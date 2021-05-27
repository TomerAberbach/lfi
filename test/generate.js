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
  cycle,
  cycleAsync,
  generate,
  generateAsync,
  repeat
} from '../src/generate.js'
import { take, takeAsync } from '../src/sub.js'
import { chunked, chunkedAsync } from '../src/chunked.js'
import { collectAsync, toArray } from '../src/collect.js'
import {
  asyncIterableArb,
  fnArb,
  iterableArb,
  nonEmptyAsyncIterableArb,
  nonEmptyIterableArb
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `generate returns an iterable`,
  [fnArb, fc.anything()],
  (t, fn, seed) => {
    const iterable = generate(fn, seed)

    t.iterable(take(100, iterable))
  }
)

test(`generate concrete example`, t => {
  const iterable = generate(value => value + 1, 0)

  t.deepEqual([...take(10, iterable)], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
})

testProp(
  `generateAsync returns an async iterable`,
  [fnArb, fc.anything()],
  async (t, fn, seed) => {
    const asyncIterable = generateAsync(fn, seed)

    await t.asyncIterable(takeAsync(100, asyncIterable))
  }
)

test(`generateAsync concrete example`, async t => {
  const asyncIterable = generateAsync(value => value + 1, 0)

  t.deepEqual(
    await collectAsync(toArray, takeAsync(10, asyncIterable)),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  )
})

testProp(`repeat returns an iterable`, [fc.anything()], (t, value) => {
  const iterable = repeat(value)

  t.iterable(take(100, iterable))
})

testProp(
  `repeat returns an iterable that repeats the same value forever`,
  [fc.anything()],
  (t, value) => {
    const iterable = repeat(value)

    for (const currentValue of take(1000, iterable)) {
      t.is(currentValue, value)
    }
  }
)

test(`repeat concrete example`, t => {
  const iterable = repeat(1)

  t.deepEqual([...take(10, iterable)], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
})

testProp(`cycle returns an iterable`, [iterableArb], (t, iterable) => {
  const cyclingIterable = cycle(iterable)

  t.iterable(take(100, cyclingIterable))
})

testProp(
  `cycle returns an iterable that repeats the given iterable`,
  [nonEmptyIterableArb],
  (t, iterable) => {
    const cyclingIterable = cycle(iterable)

    for (const values of take(
      100,
      chunked(iterable.values.length, cyclingIterable)
    )) {
      t.deepEqual(values, iterable.values)
    }
  }
)

test(`cycle concrete example`, t => {
  const iterable = [1, 2, 3]

  const cyclingIterable = cycle(iterable)

  t.deepEqual([...take(9, cyclingIterable)], [1, 2, 3, 1, 2, 3, 1, 2, 3])
})

testProp(
  `cycleAsync returns an iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const cyclingAsyncIterable = cycleAsync(asyncIterable)

    await t.asyncIterable(takeAsync(100, cyclingAsyncIterable))
  }
)

testProp(
  `cycleAsync returns an async iterable that repeats the given async iterable`,
  [nonEmptyAsyncIterableArb],
  async (t, asyncIterable) => {
    const cyclingAsyncIterable = cycleAsync(asyncIterable)

    for await (const values of takeAsync(
      100,
      chunkedAsync(asyncIterable.values.length, cyclingAsyncIterable)
    )) {
      t.deepEqual(values, asyncIterable.values)
    }
  }
)

test(`cycleAsync concrete example`, async t => {
  const asyncIterable = [1, 2, 3]

  const cyclingAsyncIterable = cycle(asyncIterable)

  t.deepEqual(
    await collectAsync(toArray, takeAsync(9, cyclingAsyncIterable)),
    [1, 2, 3, 1, 2, 3, 1, 2, 3]
  )
})
