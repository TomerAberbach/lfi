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
import { fnArb } from '../helpers.js'
import { functionWithLength } from '../../src/shared/function-with-length.js'
import test from 'ava'

testProp(
  `functionWithLength returns the given function`,
  [fnArb(), fc.nat()],
  (t, fn, length) => {
    const returned = functionWithLength(fn, length)

    t.is(returned, fn)
  }
)

testProp(
  `functionWithLength sets the length of the given function to the given length`,
  [fnArb(), fc.nat()],
  (t, fn, length) => {
    const returned = functionWithLength(fn, length)

    t.is(returned.length, length)
  }
)

test(`functionWithLength concrete example`, t => {
  const fn = (...args) => args[0] + args[1] + args[2]

  const returned = functionWithLength(fn, 3)

  t.is(returned.length, 3)
})
