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

import { curry } from './curry.js'
import { mapConcur } from './map.js'

export const each = curry(function* (fn, iterable) {
  for (const value of iterable) {
    fn(value)
    yield value
  }
})

export const eachAsync = curry(async function* (fn, asyncIterable) {
  for await (const value of asyncIterable) {
    fn(value)
    yield value
  }
})

export const eachConcur = curry((fn, concurIterable) =>
  mapConcur(value => {
    fn(value)
    return value
  }, concurIterable)
)

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

export const forEachConcur = curry(async (fn, concurIterable) => {
  await Promise.all(mapConcur(fn, concurIterable))
})
