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
import { curry } from './fn.js'
import { flatMap, flatMapAsync, flatMapConcur } from './transform.js'

export const filter = curry((fn, iterable) =>
  flatMap(value => (fn(value) ? [value] : []), iterable),
)

const createAsyncFilter = flatMap =>
  curry((fn, iterable) =>
    flatMap(async value => ((await fn(value)) ? [value] : []), iterable),
  )

export const filterAsync = createAsyncFilter(flatMapAsync)
export const filterConcur = createAsyncFilter(flatMapConcur)

export const filterMap = curry((fn, iterable) =>
  flatMap(value => filterMapInner(fn(value)), iterable),
)

const createAsyncFilterMap = flatMap =>
  curry((fn, iterable) =>
    flatMap(async value => filterMapInner(await fn(value)), iterable),
  )

const filterMapInner = value => (value == null ? [] : [value])

export const filterMapAsync = createAsyncFilterMap(flatMapAsync)
export const filterMapConcur = createAsyncFilterMap(flatMapConcur)

const createExclude = filter =>
  curry((excluded, iterable) => {
    const set = new Set(excluded)
    return filter(value => !set.has(value), iterable)
  })

export const exclude = createExclude(filter)
export const excludeAsync = createExclude(filterAsync)
export const excludeConcur = createExclude(filterConcur)

export const uniqueBy = curry((fn, iterable) =>
  createIterable(function* () {
    const set = new Set()

    for (const value of iterable) {
      const by = fn(value)

      if (set.has(by)) {
        continue
      }

      set.add(by)
      yield value
    }
  }),
)

export const uniqueByAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    const set = new Set()

    for await (const value of asyncIterable) {
      const by = await fn(value)

      if (set.has(by)) {
        continue
      }

      set.add(by)
      yield value
    }
  }),
)

export const uniqueByConcur = curry((fn, concurIterable) => apply => {
  const set = new Set()

  return concurIterable(async value => {
    const by = await fn(value)

    if (set.has(by)) {
      return
    }

    set.add(by)
    await apply(value)
  })
})

export const unique = uniqueBy(identity)
export const uniqueAsync = uniqueByAsync(identity)
export const uniqueConcur = uniqueByConcur(identity)
