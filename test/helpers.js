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
import { functionWithLength } from '../src/shared/function-with-length.js'

export const iterableArb = ({
  valueArb = fc.anything(),
  minLength,
  maxLength
} = {}) => {
  const arrayArb = fc.array(valueArb, { minLength, maxLength })

  return fc.oneof(
    arrayArb,
    fc.tuple(fc.object(), arrayArb).map(([object, array]) => ({
      ...object,
      [Symbol.iterator]: array[Symbol.iterator]
    }))
  )
}

export const fnArb = ({ valueArb = fc.anything(), length } = {}) => {
  let arb = fc.func(valueArb)

  if (length != null) {
    arb = arb.map(fn => functionWithLength(fn, length))
  }

  return arb
}

export const testReturnsIterable = (fn, inputArbs) =>
  testProp(`${fn.name} returns an iterable`, inputArbs, (t, ...inputs) => {
    const returned = fn(...inputs)

    t.true(returned != null && typeof returned[Symbol.iterator] === `function`)
  })
