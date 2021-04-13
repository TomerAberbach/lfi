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
import { map } from './map.js'
import { asConcur } from './as.js'

export const concat = (...iterables) => ({
  *[Symbol.iterator]() {
    for (const iterable of iterables) {
      yield* iterable
    }
  }
})

export const concatAsync = (...iterables) => ({
  async *[Symbol.asyncIterator]() {
    for await (const asyncIterable of iterables) {
      yield* asyncIterable
    }
  }
})

export const concatConcur = (...iterables) => async apply => {
  await Promise.all(map(iterable => asConcur(iterable)(apply), iterables))
}
