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
import { asAsync, asConcur } from '../src/as.js'
import { collectAsync, collectConcur, toArray } from '../src/collect.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
} from './helpers/arbs.js'

testProp(
  `asAsync returns an async iterable`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async (t, iterable) => {
    const asyncIterable = asAsync(iterable)

    await t.asyncIterable(asyncIterable)
  },
)

testProp(
  `asAsync returns an equivalent async iterable`,
  [fc.oneof(iterableArb, asyncIterableArb)],
  async (t, iterable) => {
    const asyncIterable = asAsync(iterable)

    t.deepEqual(await collectAsync(toArray, asyncIterable), iterable.values)
  },
)

test(`asAsync concrete example`, async t => {
  const iterable = [1, 2, 3]

  const asyncIterable = asAsync(iterable)

  t.deepEqual(await collectAsync(toArray, asyncIterable), [1, 2, 3])
})

testProp(
  `asConcur returns a concur iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async (t, iterable) => {
    const concurIterable = asConcur(iterable)

    await t.concurIterable(concurIterable)
  },
)

testProp(
  `asConcur returns an equivalent concur iterable`,
  [fc.oneof(iterableArb, asyncIterableArb, concurIterableArb)],
  async (t, iterable) => {
    const concurIterable = asConcur(iterable)

    t.unorderedDeepEqual(
      await collectConcur(toArray, concurIterable),
      iterable.values,
    )
  },
)

test(`asConcur concrete example`, async t => {
  const iterable = [1, 2, 3]

  const concurIterable = asConcur(iterable)

  t.unorderedDeepEqual(await collectConcur(toArray, concurIterable), [1, 2, 3])
})
