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
import { join, joinAsync, joinConcur } from '../src/join.js'
import { asAsync, asConcur } from '../src/as.js'
import { test, testProp } from './helpers/macros.js'
import {
  asyncIterableArb,
  concurIterableArb,
  iterableArb
} from './helpers/arbs.js'

testProp(`join joins`, [fc.string(), iterableArb], (t, separator, iterable) => {
  const joined = join(separator, iterable)

  t.is(joined, iterable.values.map(String).join(separator))
})

test(`join concrete example`, t => {
  const iterable = [1, 2, 3]

  const joined = join(`, `, iterable)

  t.is(joined, `1, 2, 3`)
})

testProp(
  `joinAsync joins asynchronously`,
  [fc.string(), asyncIterableArb],
  async (t, separator, asyncIterable) => {
    const joined = await joinAsync(separator, asyncIterable)

    t.is(joined, asyncIterable.values.map(String).join(separator))
  }
)

test(`joinAsync concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3])

  const joined = await joinAsync(`, `, asyncIterable)

  t.is(joined, `1, 2, 3`)
})

testProp(
  `joinConcur joins concurrently`,
  [fc.string(), concurIterableArb],
  async (t, separator, concurIterable) => {
    const joined = await joinConcur(separator, concurIterable)

    t.is(joined, concurIterable.iterationOrder.map(String).join(separator))
  }
)

testProp(
  `joinConcur is concurrent`,
  [fc.string(), concurIterableArb],
  async (t, separator, concurIterable) => {
    const promise = joinConcur(separator, concurIterable)

    t.pending(promise)

    await t.tick(concurIterable.maxTimeout)

    t.fulfilled(promise)
  }
)

test(`joinConcur concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3])

  const joined = await joinConcur(`, `, concurIterable)

  t.is(joined, `1, 2, 3`)
})
