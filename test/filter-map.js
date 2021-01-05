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
import { filterMap } from '../src/index.js'
import { getFnArb, getIterableArb, testReturnsIterable } from './helpers.js'

const iterableArb = getIterableArb()
const filterMapArbs = [
  getFnArb({
    valueArb: fc.oneof(fc.anything(), fc.constantFrom(undefined, null))
  }),
  iterableArb
]

testReturnsIterable(filterMap, filterMapArbs)

testProp(`filterMap filter maps`, filterMapArbs, (t, fn, iterable) => {
  t.deepEqual(
    [...filterMap(fn, iterable)],
    [...iterable].flatMap(value => {
      const mapped = fn(value)
      return mapped == null ? [] : [mapped]
    })
  )
})

test(`filterMap concrete example`, t => {
  const values = [`ab`, 1, `sdfsd`, [1, 2]]

  const filterMapped = [...filterMap(value => value.length, values)]

  t.deepEqual(filterMapped, [2, 5, 2])
})
