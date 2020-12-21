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

export const map = curry(function* (fn, iterable) {
  for (const value of iterable) {
    yield fn(value)
  }
})

export const mapAsync = curry(async function* (fn, iterable) {
  for await (const value of iterable) {
    yield fn(value)
  }
})

export const mapConcur = curry(function* (fn, { aggregate, promises }) {
  for (const promise of promises) {
    yield promise.then(values => aggregate(map(fn, values)))
  }
})
