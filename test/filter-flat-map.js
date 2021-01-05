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

import { testProp, fc } from 'ava-fast-check'
import test from 'ava'
import { filterFlatMap } from '../src/index.js'
import { getFnArb, getIterableArb, testReturnsIterable } from './helpers.js'

const iterableArb = getIterableArb()
const filterFlatMapArbs = [
  getFnArb({
    valueArb: fc.oneof(iterableArb, fc.constantFrom(undefined, null))
  }),
  iterableArb
]

testReturnsIterable(filterFlatMap, filterFlatMapArbs)

testProp(
  `filterFlatMap filter flat maps`,
  filterFlatMapArbs,
  (t, fn, iterable) => {
    t.deepEqual(
      [...filterFlatMap(fn, iterable)],
      [...iterable].flatMap(value => [...(fn(value) ?? [])])
    )
  }
)

test(`filterFlatMap concrete example`, t => {
  const values = [
    new Set([1, 2, 3]),
    5,
    new Map([
      [1, 4],
      [5, 5],
      [8, 6]
    ])
  ]

  const filterFlatMapped = [...filterFlatMap(value => value.keys?.(), values)]

  t.deepEqual(filterFlatMapped, [1, 2, 3, 1, 5, 8])
})
