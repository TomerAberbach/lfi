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
import { expectTypeOf, fc } from 'tomer'
import type { ConcurIterable } from '../../src/index.js'
import {
  asAsync,
  asConcur,
  consumeConcur,
  reduceAsync,
  reduceConcur,
  toArray,
} from '../../src/index.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from '../helpers/fast-check/iterable.js'
import { testProp } from '../helpers/fast-check/test-prop.js'
import withElapsed from '../helpers/with-elapsed.js'

test.skip(`asAsync types are correct`, () => {
  expectTypeOf(asAsync([1, 2, 3])).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(asAsync([1, 2, 3] as Iterable<number>)).toMatchTypeOf<
    AsyncIterable<number>
  >()
  expectTypeOf(asAsync(asAsync([`a`, `b`, `c`]))).toMatchTypeOf<
    AsyncIterable<string>
  >()
})

testProp(
  `asAsync returns a pure async iterable`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async ({ iterable }) => {
    const asyncIterable = asAsync(iterable)

    await expect(asyncIterable).toBeAsyncIterable()
  },
)

testProp(
  `asAsync returns an async iterable containing the same values in the same order as the given iterable`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async ({ iterable, values }) => {
    const asyncIterable = asAsync(iterable)

    expect(await reduceAsync(toArray(), asyncIterable)).toStrictEqual(values)
  },
)

test.skip(`asConcur types are correct`, () => {
  expectTypeOf(asConcur([1, 2, 3])).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(asConcur([1, 2, 3] as Iterable<number>)).toMatchTypeOf<
    ConcurIterable<number>
  >()
  expectTypeOf(asConcur(asAsync([`a`, `b`, `c`]))).toMatchTypeOf<
    ConcurIterable<string>
  >()
  expectTypeOf(asConcur(asConcur([`a`, `b`, `c`]))).toMatchTypeOf<
    ConcurIterable<string>
  >()
})

testProp(
  `asConcur returns a pure concur iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async ({ iterable }) => {
    const concurIterable = asConcur(iterable)

    await expect(concurIterable).toBeConcurIterable()
  },
)

testProp(
  `asConcur returns a concur iterable containing the same values as the given iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async ({ iterable, values }) => {
    const concurIterable = asConcur(iterable)

    expect(await reduceConcur(toArray(), concurIterable)).toIncludeSameMembers(
      values,
    )
  },
)

testProp(
  `asConcur returns a concur iterable as concurrent as the given iterable`,
  [fc.oneof(asyncIterableArb, concurIterableArb)],
  async ({ iterable }, scheduler) => {
    const { elapsed } = await withElapsed(() =>
      consumeConcur(asConcur(iterable)),
    )

    expect(elapsed).toBe((await scheduler.report()).max().elapsed)
  },
)
