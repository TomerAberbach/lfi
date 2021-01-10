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

import { testProp } from 'ava-fast-check'
import test from 'ava'
import { each, eachAsync, forEach } from '../src/index.js'
import {
  getAsyncIterableArb,
  getFnArb,
  getIterableArb,
  testReturnsAsyncIterable,
  testReturnsIterable
} from './helpers.js'

testReturnsIterable(each, [getFnArb(), getIterableArb()])

testProp(
  `each returns an equivalent iterable`,
  [getFnArb(), getIterableArb()],
  (t, fn, iterable) => {
    const returned = each(fn, iterable)

    t.deepEqual([...returned], [...iterable])
  }
)

testProp(
  `each calls the given function for each value in the iterable in their iteration order`,
  [getIterableArb()],
  (t, iterable) => {
    const parameters = []

    // eslint-disable-next-line no-unused-expressions
    ;[...each(value => parameters.push(value), iterable)]

    t.deepEqual(parameters, [...iterable])
  }
)

testProp(`each is lazy`, [getIterableArb()], (t, iterable) => {
  const array = [...iterable]
  t.plan(array.length + 1)

  let count = 0
  const iterator = each(() => count++, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`each concrete example`, t => {
  let count = 0

  // eslint-disable-next-line no-unused-expressions
  ;[...each(() => count++, [1, 2, 3])]

  t.is(count, 3)
})

testReturnsAsyncIterable(eachAsync, [getFnArb(), getAsyncIterableArb()])

testProp(
  `eachAsync returns an equivalent iterable`,
  [getFnArb(), getAsyncIterableArb()],
  async (t, fn, iterable) => {
    const expected = []
    for await (const value of iterable) {
      expected.push(value)
    }

    const returned = eachAsync(fn, iterable)
    const actual = []
    for await (const value of returned) {
      actual.push(value)
    }

    t.deepEqual(actual, expected)
  }
)

testProp(
  `forEach returns undefined`,
  [getFnArb(), getIterableArb()],
  (t, fn, iterable) => {
    const returned = forEach(fn, iterable)

    t.is(returned, undefined)
  }
)

testProp(
  `forEach is eager and calls the given function for each value in the iterable in their iteration order`,
  [getIterableArb()],
  (t, iterable) => {
    const parameters = []
    forEach(value => parameters.push(value), iterable)

    t.deepEqual(parameters, [...iterable])
  }
)

test(`forEach concrete example`, t => {
  let count = 0

  forEach(() => count++, [1, 2, 3])

  t.is(count, 3)
})
