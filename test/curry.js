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
import { curry } from '../src/curry.js'
import { test, testProp } from './helpers/macros.js'
import { fnArb, getFnArb } from './helpers/arbs.js'

const fnAndArgsArb = fc
  .array(fc.anything(), { minLength: 1, maxLength: 10 })
  .chain(array =>
    fc.tuple(
      getFnArb(fc.anything(), { length: array.length }),
      fc.clonedConstant(array)
    )
  )

testProp(
  `curry does not modify the given function`,
  [fnAndArgsArb],
  (t, [fn, args]) => {
    const resultBeforeCurry = fn(...args)

    curry(fn)

    const resultAfterCurry = fn(...args)
    t.deepEqual(resultAfterCurry, resultBeforeCurry)
  }
)

const partitions = array => ({
  *[Symbol.iterator]() {
    if (array.length === 0) {
      yield []
      return
    }

    for (let i = 0; i < array.length; i++) {
      const start = array.slice(0, i + 1)
      const end = array.slice(i + 1)

      for (const partition of partitions(end)) {
        yield [start, ...partition]
      }
    }
  }
})

testProp(
  `curry curries the given function if its length is greater than zero`,
  [fnAndArgsArb],
  (t, [fn, inputs]) => {
    t.plan(2 ** (inputs.length - 1))

    const curried = curry(fn)

    for (const partition of partitions(inputs)) {
      const returned = partition.reduce(
        (acc, inputs) => acc(...inputs),
        curried
      )

      t.deepEqual(returned, fn(...inputs))
    }
  }
)

testProp(
  `curry does not curry the given function if its length is less than or equal to zero`,
  [getFnArb(fc.anything(), { length: fc.nat().map(n => -n) })],
  (t, fn) => {
    t.is(curry(fn), fn)
  }
)

testProp(`curry is idempotent`, [fnAndArgsArb], (t, [fn, inputs]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  t.deepEqual(curried(...inputs), doubleCurried(...inputs))
})

testProp(
  `curry returns a function with the same name and length as the given function`,
  [fnArb],
  (t, fn) => {
    const curried = curry(fn)

    t.is(curried.name, fn.name)
    t.is(curried.length, fn.length)
  }
)

test(`curry concrete example`, t => {
  const fn = (a, b, c) => a + b + c
  const result = fn(1, 2, 3)

  const curried = curry(fn)

  t.is(curried(1, 2, 3), result)
  t.is(curried(1)(2, 3), result)
  t.is(curried(1, 2)(3), result)
  t.is(curried(1)(2)(3), result)
})
