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

// eslint-disable-next-line ava/use-test
import normalTest from 'ava'
import { testProp as normalTestProp } from 'ava-fast-check'
import { promiseStateSync } from 'p-state'
import objectHash from 'object-hash'
import { collect, toMap, counting } from '../../src/collect.js'
import { map } from '../../src/map.js'
import { clock } from './index.js'

const enhanceTestContext = t => {
  t = {
    ...t,

    unorderedDeepEqual: (actual, expected, message) => {
      const hash = value =>
        typeof value === `object` ? objectHash(value) : value
      const counts = iterable =>
        collect(
          counting(toMap),
          map(
            value => [hash(value), value],
            typeof iterable[Symbol.iterator] === `function`
              ? iterable
              : Object.entries(iterable)
          )
        )
      actual = counts(actual)
      expected = counts(expected)

      t.is(actual.size, expected.size)
      for (const [key, value] of actual.entries()) {
        t.deepEqual(value, expected.get(key), message)
      }
    },

    tick: timeout => clock.tickAsync(timeout),

    iterable: (expectedIterable, { pure = true } = {}) => {
      t.is(typeof expectedIterable[Symbol.iterator], `function`)

      const values1 = [...expectedIterable]

      if (!pure) {
        return
      }

      const values2 = [...expectedIterable]

      t.deepEqual(values1, values2)
    },

    asyncIterable: async (expectedAsyncIterable, { pure = true } = {}) => {
      // Synchronous iterators are also iterable using for-await-of
      t.is(typeof expectedAsyncIterable[Symbol.asyncIterator], `function`)

      const values1 = []
      for await (const value of expectedAsyncIterable) {
        values1.push(value)
      }

      if (!pure) {
        return
      }

      const values2 = []
      for await (const value of expectedAsyncIterable) {
        values2.push(value)
      }

      t.deepEqual(values1, values2)
    },

    concurIterable: async expectedConcurIterable => {
      t.is(typeof expectedConcurIterable, `function`)

      const values1 = []
      const output1 = expectedConcurIterable(value => values1.push(value))

      t.true(output1 instanceof Promise)

      const values2 = []
      const output2 = expectedConcurIterable(value => values2.push(value))

      t.true(output2 instanceof Promise)

      await Promise.all([output1, output2])

      t.unorderedDeepEqual(values1, values2)
    },

    ...Object.fromEntries(
      [`pending`, `fulfilled`, `rejected`].map(state => [
        state,
        promise => t.is(promiseStateSync(promise), state)
      ])
    )
  }

  return t
}

const enhanceImplementation =
  implementation =>
  async (t, ...inputs) => {
    implementation(enhanceTestContext(t), ...inputs)
    await clock.runAllAsync()
  }

export const test = (title, implementation) =>
  normalTest(title, enhanceImplementation(implementation))

export const testProp = (title, arbs, implementation, params) =>
  normalTestProp(title, arbs, enhanceImplementation(implementation), params)
