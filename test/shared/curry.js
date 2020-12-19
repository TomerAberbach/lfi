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

import { curry, partitions } from '../../src/index.js'
import { fc, testProp } from 'ava-fast-check'
import { fnArb } from '../helpers.js'
import { functionWithLength } from '../../src/shared/function-with-length.js'
import test from 'ava'

const functionAndInputArb = () =>
  fc
    .array(fc.anything())
    .filter(array => array.length > 0)
    .chain(array =>
      fc.tuple(fnArb({ length: array.length }), fc.clonedConstant(array))
    )

testProp(
  `curry does not modify the given function`,
  [functionAndInputArb()],
  (t, [fn, inputs]) => {
    const resultBeforeCurry = fn(...inputs)

    const curried = curry(fn)

    t.not(curried, fn)

    const resultAfterCurry = fn(...inputs)

    t.deepEqual(resultAfterCurry, resultBeforeCurry)
  }
)

testProp(
  `curry curries the given function if its length is greater than zero`,
  [functionAndInputArb()],
  (t, [fn, inputs]) => {
    t.plan(2 ** (inputs.length - 1))

    const curried = curry(fn)

    for (const partition of partitions(inputs)) {
      const returned = partition.reduce(
        (acc, subInputs) => acc(...subInputs),
        curried
      )

      t.deepEqual(returned, fn(...inputs))
    }
  }
)

testProp(
  `curry does not curry the given function if its length is less than or equal to zero`,
  [fnArb(), fc.nat().map(n => -n)],
  (t, fn, length) => {
    fn = functionWithLength(fn, length)

    t.is(curry(fn), fn)
  }
)

testProp(`curry is idempotent`, [functionAndInputArb()], (t, [fn, inputs]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  t.deepEqual(curried(...inputs), doubleCurried(...inputs))
})

test(`curry concrete example`, t => {
  const fn = (a, b, c) => a + b + c
  const result = fn(1, 2, 3)

  const curried = curry(fn)

  t.is(curried(1, 2, 3), result)
  t.is(curried(1)(2, 3), result)
  t.is(curried(1, 2)(3), result)
  t.is(curried(1)(2)(3), result)
})
