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

import { fc, testProp } from 'ava-fast-check'
import test from 'ava'
import { concat } from '../src/index.js'
import { getIterableArb } from './helpers.js'

testProp(`concat concats`, [fc.array(getIterableArb())], (t, iterables) => {
  t.deepEqual(
    [...concat(...iterables)],
    [].concat(...iterables.map(iterable => [...iterable]))
  )
})

test(`concat returns an empty iterable for zero arguments`, t => {
  const iterable = concat()

  t.is([...iterable].length, 0)
})
