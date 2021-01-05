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
import { fold, reduce } from '../src/index.js'
import { getFnArb, getIterableArb } from './helpers.js'

const emptyIterableArb = getIterableArb({ minLength: 0, maxLength: 0 })

testProp(
  `fold folds`,
  [getFnArb(), fc.anything(), getIterableArb()],
  (t, fn, acc, iterable) => {
    t.deepEqual(
      fold(fn, acc, iterable),
      [...iterable].reduce((a, b) => fn(a, b), acc)
    )
  }
)

testProp(
  `reduce returns an empty iterable for the empty iterable`,
  [getFnArb(), emptyIterableArb],
  (t, fn, iterable) => {
    t.deepEqual([...reduce(fn, iterable)], [])
  }
)

testProp(
  `reduce reduces`,
  [getFnArb(), getIterableArb({ minLength: 1 })],
  (t, fn, iterable) => {
    t.deepEqual(
      [...reduce(fn, iterable)],
      [[...iterable].reduce((a, b) => fn(a, b))]
    )
  }
)
