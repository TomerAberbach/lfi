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
import test from 'ava'
import floatEqual from 'float-equal'
import {
  count,
  max,
  maxBy,
  maxWith,
  mean,
  min,
  minBy,
  minWith,
  sum
} from '../src/index.js'
import { getIterableArb } from './helpers.js'

const iterableArb = getIterableArb()

testProp(`count counts`, [iterableArb], (t, iterable) => {
  t.is(count(iterable), [...iterable].length)
})

test(`count concrete example`, t => {
  const values = [1, 2, 3, 4]

  t.is(count(values), 4)
})

const emptyIterableArb = getIterableArb({ minLength: 0, maxLength: 0 })

testProp(
  `sum returns 0 for an empty iterable`,
  [emptyIterableArb],
  (t, iterable) => {
    t.is(sum(iterable), 0)
  }
)

const numberArb = fc.oneof(fc.integer(), fc.float())

testProp(
  `sum returns N for an iterable containing N once and 0 for all other elements`,
  [
    fc.tuple(fc.nat(100), fc.nat(100), numberArb).map(([n1, n2, value]) => {
      const [length, index] = n1 > n2 ? [n1, n2] : [n2, n1]
      const array = Array.from({ length }, () => 0)
      array.splice(index, 0, value)
      return [array, value]
    })
  ],
  (t, [array, value]) => {
    t.is(sum(array), value)
  }
)

testProp(
  `sum returns the number of items in the iterable for iterables containing only 1`,
  [getIterableArb({ valueArb: fc.constant(1) })],
  (t, iterable) => {
    t.is(sum(iterable), [...iterable].length)
  }
)

test(`sum concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  t.is(sum(values), 9.8)
})

testProp(
  `mean of the empty iterable is zero`,
  [emptyIterableArb],
  (t, iterable) => {
    t.is(mean(iterable), 0)
  }
)

test(`mean concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  t.true(floatEqual(mean(values), 1.96))
})

testProp(
  `maxBy returns an empty iterable for an empty iterable`,
  [fc.compareFunc(), emptyIterableArb],
  (t, fn, iterable) => {
    t.is([...maxBy(fn, iterable)].length, 0)
  }
)

test(`maxBy concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...maxBy((a, b) => a - b, values)]

  t.deepEqual(results, [5])
})

test(`maxWith concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...maxWith(a => -a, values)]

  t.deepEqual(results, [-2])
})

test(`max concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...max(values)]

  t.deepEqual(results, [5])
})

test(`minBy concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...minBy((a, b) => a - b, values)]

  t.deepEqual(results, [-2])
})

test(`minWith concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...minWith(Math.abs, values)]

  t.deepEqual(results, [1])
})

test(`min concrete example`, t => {
  const values = [1, 1.3, 4.5, -2, 5]

  const results = [...min(values)]

  t.deepEqual(results, [-2])
})
