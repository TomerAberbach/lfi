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
import objectHash from 'object-hash'

export const getIterableArb = ({
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

export const getFnArb = ({
  valueArb = fc.anything(),
  nameArb = fc.string(),
  lengthArb = fc.nat()
} = {}) =>
  fc.tuple(fc.func(valueArb), nameArb, lengthArb).map(([fn, name, length]) => {
    Object.defineProperties(fn, {
      length: {
        enumerable: false,
        writable: false,
        value: length
      },
      name: {
        enumerable: false,
        writable: false,
        value: name
      }
    })

    return fn
  })

const getFnName = fn =>
  fn.name.length === 0 ? `Unknown function (${objectHash(fn)})` : fn.name

export const testReturnsIterable = (fn, inputArbs) =>
  testProp(
    `${getFnName(fn)} returns an iterable`,
    inputArbs,
    (t, ...inputs) => {
      const returned = fn(...inputs)

      t.true(
        returned != null && typeof returned[Symbol.iterator] === `function`
      )
    }
  )

export const testReturnsAsyncIterable = (fn, inputArbs) =>
  testProp(
    `${getFnName(fn)} returns an async iterable`,
    inputArbs,
    (t, ...inputs) => {
      const returned = fn(...inputs)

      t.true(
        returned != null && typeof returned[Symbol.asyncIterator] === `function`
      )
    }
  )
