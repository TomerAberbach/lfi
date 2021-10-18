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

import { asAsync, asConcur } from '../src/as.js'
import { count, countAsync, countConcur } from '../src/count.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb,
  nonEmptyConcurIterableArb,
} from './helpers/arbs.js'
import { test, testProp } from './helpers/macros.js'

testProp(
  `count returns the length of the given iterable`,
  [iterableArb],
  (t, iterable) => {
    const length = count(iterable)

    t.is(length, iterable.values.length)
  },
)

test(`count concrete example`, t => {
  const iterable = [1, 2, 3, 4]

  const length = count(iterable)

  t.is(length, 4)
})

testProp(
  `countAsync returns the length of the given async iterable`,
  [asyncIterableArb],
  async (t, asyncIterable) => {
    const length = await countAsync(asyncIterable)

    t.is(length, asyncIterable.values.length)
  },
)

test(`countAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4])

  const length = await countAsync(asyncIterable)

  t.is(length, 4)
})

testProp(
  `countConcur returns the length of the given concur iterable`,
  [concurIterableArb],
  async (t, concurIterable) => {
    const length = await countConcur(concurIterable)

    t.is(length, concurIterable.values.length)
  },
)

testProp(
  `countConcur is concurrent`,
  [nonEmptyConcurIterableArb],
  async (t, concurIterable) => {
    const promise = countConcur(concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  },
)

test(`countConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4])

  const length = await countConcur(concurIterable)

  t.is(length, 4)
})
