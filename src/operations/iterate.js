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

import { curry } from './fn.js'
import { map, mapAsync, mapConcur } from './transform.js'

export const each = curry((fn, iterable) =>
  map(value => {
    fn(value)
    return value
  }, iterable),
)

const createAsyncEach = map =>
  curry((fn, iterable) =>
    map(async value => {
      await fn(value)
      return value
    }, iterable),
  )

export const eachAsync = createAsyncEach(mapAsync)
export const eachConcur = createAsyncEach(mapConcur)

export const forEach = curry((fn, iterable) => {
  for (const value of iterable) {
    fn(value)
  }
})

export const forEachAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    await fn(value)
  }
})

export const forEachConcur = curry((fn, concurIterable) => concurIterable(fn))

// eslint-disable-next-line no-empty-function
const createConsume = forEach => iterable => forEach(() => {}, iterable)

export const consume = createConsume(forEach)
export const consumeAsync = createConsume(forEachAsync)
export const consumeConcur = createConsume(forEachConcur)
