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
import { entries, values, keys } from '../src/from.js'
import { testProp } from './helpers/macros.js'

const mapArb = fc
  .array(fc.tuple(fc.anything(), fc.anything()))
  .map(array => new Map(array))
const setArb = fc.array(fc.anything()).map(array => new Set(array))

testProp(`keys returns an iterable`, [mapArb], (t, map) => {
  const iterable = keys(map)

  t.iterable(iterable)
})

testProp(`keys returns the keys of the given map`, [mapArb], (t, map) => {
  const iterable = keys(map)

  t.deepEqual([...iterable], [...map.keys()])
})

testProp(`values returns an iterable`, [mapArb], (t, map) => {
  const iterable = values(map)

  t.iterable(iterable)
})

testProp(
  `values returns the values of the given map`,
  [fc.oneof(mapArb, setArb)],
  (t, object) => {
    const iterable = values(object)

    t.deepEqual([...iterable], [...object.values()])
  }
)

testProp(`entries returns an iterable`, [mapArb], (t, map) => {
  const iterable = entries(map)

  t.iterable(iterable)
})

testProp(`entries returns the entries of the given map`, [mapArb], (t, map) => {
  const iterable = entries(map)

  t.deepEqual([...iterable], [...map.entries()])
})
