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
import {
  associate,
  associateBy,
  associateByTo,
  associateTo,
  associateWith,
  associateWithTo
} from '../src/index.js'
import { getFnArb, getIterableArb } from './helpers.js'

testProp(
  `associateTo returns the given map`,
  [
    getFnArb({ valueArb: fc.tuple(fc.string(), fc.anything()) }),
    getIterableArb()
  ],
  (t, fn, iterable) => {
    const map = new Map()

    const returned = associateTo(fn, map, iterable)

    t.is(returned, map)
  }
)

test(`associateTo concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associateTo(
    value => [String(value), String(value).length],
    new Map(),
    values
  )

  t.deepEqual(
    map,
    new Map([
      [`wow`, 3],
      [`1`, 1],
      [`55`, 2],
      [`sdfsd`, 5],
      [`-4`, 2]
    ])
  )
})

test(`associate concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associate(value => [String(value), String(value).length], values)

  t.deepEqual(
    map,
    new Map([
      [`wow`, 3],
      [`1`, 1],
      [`55`, 2],
      [`sdfsd`, 5],
      [`-4`, 2]
    ])
  )
})

test(`associateByTo concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associateByTo(
    value => String(value).toUpperCase(),
    new Map(),
    values
  )

  t.deepEqual(
    map,
    new Map([
      [`WOW`, `wow`],
      [`1`, 1],
      [`55`, `55`],
      [`SDFSD`, `sdfsd`],
      [`-4`, -4]
    ])
  )
})

test(`associateBy concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associateBy(value => String(value).toUpperCase(), values)

  t.deepEqual(
    map,
    new Map([
      [`WOW`, `wow`],
      [`1`, 1],
      [`55`, `55`],
      [`SDFSD`, `sdfsd`],
      [`-4`, -4]
    ])
  )
})

test(`associateWithTo concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associateWithTo(value => String(value).length, new Map(), values)

  t.deepEqual(
    map,
    new Map([
      [`wow`, 3],
      [1, 1],
      [`55`, 2],
      [`sdfsd`, 5],
      [-4, 2]
    ])
  )
})

test(`associateWith concrete example`, t => {
  const values = [`wow`, 1, `55`, `sdfsd`, -4]

  const map = associateWith(value => String(value).length, values)

  t.deepEqual(
    map,
    new Map([
      [`wow`, 3],
      [1, 1],
      [`55`, 2],
      [`sdfsd`, 5],
      [-4, 2]
    ])
  )
})
