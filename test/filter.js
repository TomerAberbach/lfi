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

import { fc, testProp } from 'ava-fast-check'
import { filter } from '../src/index.js'
import { getFnArb, getIterableArb, testReturnsIterable } from './helpers.js'
import test from 'ava'

testReturnsIterable(filter, [getFnArb(), getIterableArb()])

testProp(
  `filter filters`,
  [
    getFnArb({ valueArb: fc.oneof(fc.anything(), fc.boolean()) }),
    getIterableArb()
  ],
  (t, fn, iterable) => {
    t.deepEqual(
      [...filter(fn, iterable)],
      [...iterable].filter(value => fn(value) === true)
    )
  }
)

testProp(`filter is lazy`, [getIterableArb()], (t, iterable) => {
  const array = [...iterable]
  t.plan(array.length + 1)

  let count = 0
  const iterator = filter(() => {
    count++
    return true
  }, array)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`filter concrete example`, t => {
  const values = [1, 2, 3, 4, 5, 6]

  const filtered = [...filter(value => value % 2 === 0, values)]

  t.deepEqual(filtered, [2, 4, 6])
})
