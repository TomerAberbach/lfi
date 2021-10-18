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
import {
  collect,
  collectAsync,
  collectConcur,
  counting,
  grouping,
  toArray,
  toMap,
  toObject,
  toSet,
  toWeakMap,
  toWeakSet,
} from '../src/collect.js'
import { asAsync, asConcur } from '../src/as.js'
import { map, mapAsync, mapConcur } from '../src/map.js'
import { test, testProp } from './helpers/macros.js'
import {
  getAsyncIterableArb,
  getConcurIterableArb,
  getIterableArb,
} from './helpers/arbs.js'

const getArrayArb = getIterableArb =>
  getIterableArb(fc.anything()).map(iterable => [
    toArray,
    iterable,
    [...iterable.iterationOrder],
  ])
const getSetArb = getIterableArb =>
  getIterableArb(fc.anything()).map(iterable => [
    toSet,
    iterable,
    new Set([...iterable.iterationOrder]),
  ])
const getWeakSetArb = getIterableArb =>
  getIterableArb(fc.object()).map(iterable => [
    toWeakSet,
    iterable,
    new WeakSet([...iterable.iterationOrder]),
  ])

const getObjectArb = getIterableArb =>
  getIterableArb(fc.tuple(fc.string(), fc.anything())).map(iterable => [
    toObject,
    iterable,
    Object.fromEntries(iterable.iterationOrder),
  ])
const getMapArb = getIterableArb =>
  getIterableArb(fc.tuple(fc.anything(), fc.anything())).map(iterable => [
    toMap,
    iterable,
    new Map(iterable.iterationOrder),
  ])
const getWeakMapArb = getIterableArb =>
  getIterableArb(fc.tuple(fc.object(), fc.anything())).map(iterable => [
    toWeakMap,
    iterable,
    new WeakMap(iterable.iterationOrder),
  ])

testProp(
  `collect collects`,
  [
    fc.oneof(
      ...[
        getArrayArb,
        getSetArb,
        getWeakSetArb,
        getObjectArb,
        getMapArb,
        getWeakMapArb,
      ].map(getArb => getArb(getIterableArb)),
    ),
  ],
  (t, [to, iterable, expectedCollection]) => {
    const actualCollection = collect(to, iterable)

    t.deepEqual(actualCollection, expectedCollection)
  },
)

testProp(
  `collectAsync collects asynchronously`,
  [
    fc.oneof(
      ...[
        getArrayArb,
        getSetArb,
        getWeakSetArb,
        getObjectArb,
        getMapArb,
        getWeakMapArb,
      ].map(getArb => getArb(getAsyncIterableArb)),
    ),
  ],
  async (t, [to, asyncIterable, expectedCollection]) => {
    const actualCollection = await collectAsync(to, asyncIterable)

    t.deepEqual(actualCollection, expectedCollection)
  },
)

testProp(
  `collectConcur collects concurrently`,
  [
    fc
      .oneof(
        ...[getArrayArb, getSetArb, getObjectArb, getMapArb].map(getArb =>
          getArb(getConcurIterableArb),
        ),
      )
      .filter(
        ([, concurIterable, collection]) =>
          concurIterable.values.length ===
          (`size` in collection ? collection.size : collection.length),
      ),
  ],
  async (t, [to, concurIterable, expectedCollection]) => {
    const actualCollection = await collectConcur(to, concurIterable)

    t.deepEqual(actualCollection, expectedCollection)
  },
)

test(`collect counting concrete example`, t => {
  const iterable = [1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7]

  const aMap = collect(
    counting(toMap),
    map(value => [value, value], iterable),
  )

  t.deepEqual(
    aMap,
    new Map([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 2],
      [6, 5],
      [7, 1],
    ]),
  )
})

test(`collectAsync counting concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7])

  const map = await collectAsync(
    counting(toMap),
    mapAsync(value => [value, value], asyncIterable),
  )

  t.deepEqual(
    map,
    new Map([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 2],
      [6, 5],
      [7, 1],
    ]),
  )
})

test(`collectConcur counting concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7])

  const map = await collectConcur(
    counting(toMap),
    mapConcur(value => [value, value], concurIterable),
  )

  t.deepEqual(
    map,
    new Map([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 2],
      [6, 5],
      [7, 1],
    ]),
  )
})

test(`collect grouping concrete example 1`, t => {
  const iterable = [1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7]

  const aMap = collect(
    grouping(toArray, toMap),
    map(value => [value, value], iterable),
  )

  t.deepEqual(
    aMap,
    new Map([
      [1, [1]],
      [2, [2]],
      [3, [3]],
      [4, [4, 4]],
      [6, [6, 6, 6, 6, 6]],
      [7, [7]],
    ]),
  )
})

test(`collect grouping concrete example 2`, t => {
  const iterable = [1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7]

  const object = collect(
    grouping(toArray, toObject),
    map(value => [String(value), value], iterable),
  )

  t.deepEqual(object, {
    1: [1],
    2: [2],
    3: [3],
    4: [4, 4],
    6: [6, 6, 6, 6, 6],
    7: [7],
  })
})

test(`collectAsync grouping concrete example`, async t => {
  const asyncIterable = asAsync([1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7])

  const map = await collectAsync(
    grouping(toArray, toMap),
    mapAsync(value => [value, value], asyncIterable),
  )

  t.deepEqual(
    map,
    new Map([
      [1, [1]],
      [2, [2]],
      [3, [3]],
      [4, [4, 4]],
      [6, [6, 6, 6, 6, 6]],
      [7, [7]],
    ]),
  )
})

test(`collectConcur grouping concrete example`, async t => {
  const concurIterable = asConcur([1, 2, 3, 4, 4, 6, 6, 6, 6, 6, 7])

  const map = await collectConcur(
    grouping(toArray, toMap),
    mapConcur(value => [value, value], concurIterable),
  )

  t.deepEqual(
    map,
    new Map([
      [1, [1]],
      [2, [2]],
      [3, [3]],
      [4, [4, 4]],
      [6, [6, 6, 6, 6, 6]],
      [7, [7]],
    ]),
  )
})
