/**
 * Copyright 2020 Google LLC
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

import { chunked } from '../src/index.js'
import { fc, testProp } from 'ava-fast-check'
import { getIterableArb, testReturnsIterable } from './helpers.js'
import test from 'ava'

const positiveNatArb = fc.nat().filter(n => n > 0)

testReturnsIterable(chunked, [positiveNatArb, getIterableArb()])

testProp(
  `chunked returns an iterable containing the given iterable's value in their iteration order`,
  [positiveNatArb, getIterableArb()],
  (t, n, iterable) => {
    const array = [...iterable]

    const flattenedChunks = [...chunked(n, iterable)].flat()

    t.deepEqual(flattenedChunks, array)
  }
)

testProp(
  `chunked returns an empty iterable for an empty iterable`,
  [positiveNatArb, getIterableArb({ minLength: 0, maxLength: 0 })],
  (t, n, iterable) => {
    const count = [...chunked(n, iterable)].length

    t.is(count, 0)
  }
)

testProp(
  `chunked returns an iterable containing chunks of the given size except for the last chunk`,
  [positiveNatArb, getIterableArb({ minLength: 1 })],
  (t, n, iterable) => {
    const chunksExceptForLast = [...chunked(n, iterable)].slice(0, -1)

    t.plan(chunksExceptForLast.length)
    for (const chunk of chunksExceptForLast) {
      t.is(chunk.length, n)
    }
  }
)

test(`chunked concrete example`, t => {
  const values = [`a`, `b`, `c`, `d`, `e`, `f`, `g`]

  const chunks = [...chunked(3, values)]

  t.deepEqual(chunks, [[`a`, `b`, `c`], [`d`, `e`, `f`], [`g`]])
})
