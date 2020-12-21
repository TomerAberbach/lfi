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

import { fnArb, iterableArb, testReturnsIterable } from '../helpers.js'
import { map } from '../../src/index.js'
import { testProp } from 'ava-fast-check'
import test from 'ava'

testReturnsIterable(map, [fnArb(), iterableArb()])

testProp(`map maps`, [fnArb(), iterableArb()], (t, fn, iterable) => {
  t.deepEqual(
    [...map(fn, iterable)],
    [...iterable].map(value => fn(value))
  )
})

testProp(`map is lazy`, [iterableArb()], (t, iterable) => {
  const array = [...iterable]
  t.plan(array.length + 1)

  let count = 0
  const iterator = map(() => count++, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`map concrete example`, t => {
  const values = [1, 2, 3, 4, 5]

  const mapped = [...map(value => value * 2, values)]

  t.deepEqual(mapped, [2, 4, 6, 8, 10])
})
