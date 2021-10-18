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

import { curry } from './curry.js'
import { flatMap, flatMapAsync, flatMapConcur } from './flat-map.js'
import { asAsync, asConcur } from './as.js'

export const filter = curry((fn, iterable) =>
  flatMap(value => (fn(value) === true ? [value] : []), iterable),
)

const createAsyncFilter = (flatMap, as) =>
  curry((fn, iterable) =>
    flatMap(
      async value => as((await fn(value)) === true ? [value] : []),
      iterable,
    ),
  )

export const filterAsync = createAsyncFilter(flatMapAsync, asAsync)
export const filterConcur = createAsyncFilter(flatMapConcur, asConcur)

const createWithout = filter =>
  curry((excluded, iterable) => {
    const set = new Set(excluded)
    return filter(value => !set.has(value), iterable)
  })

export const without = createWithout(filter)
export const withoutAsync = createWithout(filterAsync)
export const withoutConcur = createWithout(filterConcur)
