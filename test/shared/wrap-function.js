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

import { getFnArb } from '../helpers.js'
import { testProp } from 'ava-fast-check'
import { wrapFunction } from '../../src/shared/wrap-function.js'
import test from 'ava'

const arbs = [getFnArb(), getFnArb()]

testProp(
  `wrapFunction returns the function given for its second parameter`,
  arbs,
  (t, fn1, fn2) => {
    const returned = wrapFunction(fn1, fn2)

    t.is(returned, fn2)
  }
)

testProp(
  `wrapFunction copies the name and length of the function given for its first parameter to the one given for its second`,
  arbs,
  (t, fn1, fn2) => {
    wrapFunction(fn1, fn2)

    t.is(fn2.name, fn1.name)
    t.is(fn2.length, fn1.length)
  }
)

test(`wrapFunction concrete example`, t => {
  function fn(a, b, c) {
    return a + b + c
  }

  // eslint-disable-next-line no-empty-function
  const returned = wrapFunction(fn, () => {})

  t.is(returned.name, `fn`)
  t.is(returned.length, 3)
})
