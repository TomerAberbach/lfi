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
import { flatten } from './flat-map.js'
import { map } from './map.js'
import { pipe } from './pipe.js'

export const syncToAsync = curry(async function* (iterable) {
  for (const value of iterable) {
    yield value
  }
})

export const syncToConcur = map(async value => [await value])

export const asyncToSync = curry(async iterable => {
  const promises = []

  for await (const value of iterable) {
    promises.push(value)
  }

  return Promise.all(promises)
})

export const asyncToConcur = pipe(asyncToSync, syncToConcur)

export const concurToSync = curry(async iterable =>
  flatten(await Promise.all(iterable))
)

export const concurToAsync = pipe(concurToSync, syncToAsync)
