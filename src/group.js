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
import { forEachConcur } from './each.js'

export const groupTo = curry((fn, map, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    let array = map.get(k)

    if (array == null) {
      map.set(k, (array = []))
    }

    array.push(v)
  }

  return map
})

export const groupToAsync = curry(async (fn, map, iterable) => {
  for await (const value of iterable) {
    const [k, v] = await fn(value)
    let array = map.get(k)

    if (array == null) {
      map.set(k, (array = []))
    }

    array.push(v)
  }

  return map
})

export const groupToConcur = curry(async (fn, map, iterable) => {
  await forEachConcur(async value => {
    const [k, v] = await fn(value)
    let array = map.get(k)

    if (array == null) {
      map.set(k, (array = []))
    }

    array.push(v)
  }, iterable)

  return map
})

export const group = curry((fn, iterable) => groupTo(fn, new Map(), iterable))

export const groupAsync = curry((fn, iterable) =>
  groupToAsync(fn, new Map(), iterable)
)

export const groupConcur = curry((fn, iterable) =>
  groupToConcur(fn, new Map(), iterable)
)

export const groupByTo = curry((fn, map, iterable) =>
  groupTo(value => [fn(value), value], map, iterable)
)

export const groupByToAsync = curry((fn, map, iterable) =>
  groupToAsync(async value => [await fn(value), value], map, iterable)
)

export const groupByToConcur = curry((fn, map, iterable) =>
  groupToConcur(async value => [await fn(value), value], map, iterable)
)

export const groupBy = curry((fn, iterable) =>
  groupByTo(fn, new Map(), iterable)
)

export const groupByAsync = curry((fn, iterable) =>
  groupByToAsync(fn, new Map(), iterable)
)

export const groupByConcur = curry((fn, iterable) =>
  groupByToConcur(fn, new Map(), iterable)
)

export const groupWithTo = curry((fn, map, iterable) =>
  groupTo(value => [value, fn(value)], map, iterable)
)

export const groupWithToAsync = curry((fn, map, iterable) =>
  groupToAsync(async value => [value, await fn(value)], map, iterable)
)

export const groupWithToConcur = curry((fn, map, iterable) =>
  groupToConcur(async value => [value, await fn(value)], map, iterable)
)

export const groupWith = curry((fn, iterable) =>
  groupWithTo(fn, new Map(), iterable)
)

export const groupWithAsync = curry((fn, iterable) =>
  groupWithToAsync(fn, new Map(), iterable)
)

export const groupWithConcur = curry((fn, iterable) =>
  groupWithToConcur(fn, new Map(), iterable)
)
