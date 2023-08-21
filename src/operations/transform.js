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
import {
  createAsyncIterable,
  createIterable,
  identity,
} from '../internal/helpers.js'
import { asConcur } from './as.js'
import { curry } from './fn.js'

export const map = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      yield fn(value)
    }
  }),
)

export const mapAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      yield fn(value)
    }
  }),
)

export const mapConcur = curry(
  (fn, concurIterable) => apply =>
    concurIterable(async value => apply(await fn(value))),
)

export const flatMap = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      yield* fn(value)
    }
  }),
)

export const flatMapAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      yield* await fn(value)
    }
  }),
)

export const flatMapConcur = curry(
  (fn, concurIterable) => apply =>
    concurIterable(async value => asConcur(await fn(value))(apply)),
)

export const flatten = flatMap(identity)
export const flattenAsync = flatMapAsync(identity)
export const flattenConcur = flatMapConcur(identity)

export const index = curry(iterable =>
  createIterable(function* () {
    let index = 0
    for (const value of iterable) {
      yield [index++, value]
    }
  }),
)

export const indexAsync = curry(asyncIterable =>
  createAsyncIterable(async function* () {
    let index = 0
    for await (const value of asyncIterable) {
      yield [index++, value]
    }
  }),
)

export const indexConcur = curry(concurIterable => async apply => {
  let index = 0
  await concurIterable(value => apply([index++, value]))
})
