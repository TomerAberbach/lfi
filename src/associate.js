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

export const associateTo = curry((fn, map, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    map.set(k, v)
  }

  return map
})

export const associateToAsync = curry(async (fn, map, iterable) => {
  for await (const value of iterable) {
    const [k, v] = await fn(value)
    map.set(k, v)
  }

  return map
})

export const associateToConcur = curry(async (fn, map, iterable) => {
  await forEachConcur(async value => {
    const [k, v] = await fn(value)
    map.set(k, v)
  }, iterable)

  return map
})

export const associate = curry((fn, iterable) =>
  associateTo(fn, new Map(), iterable)
)

export const associateAsync = curry((fn, iterable) =>
  associateToAsync(fn, new Map(), iterable)
)

export const associateConcur = curry((fn, iterable) =>
  associateToConcur(fn, new Map(), iterable)
)

export const associateByTo = curry((fn, map, iterable) =>
  associateTo(value => [fn(value), value], map, iterable)
)

export const associateByToAsync = curry((fn, map, iterable) =>
  associateToAsync(async value => [await fn(value), value], map, iterable)
)

export const associateByToConcur = curry((fn, map, iterable) =>
  associateToConcur(async value => [await fn(value), value], map, iterable)
)

export const associateBy = curry((fn, iterable) =>
  associateByTo(fn, new Map(), iterable)
)

export const associateByAsync = curry((fn, iterable) =>
  associateByToAsync(fn, new Map(), iterable)
)

export const associateByConcur = curry((fn, iterable) =>
  associateByToConcur(fn, new Map(), iterable)
)

export const associateWithTo = curry((fn, map, iterable) =>
  associateTo(value => [value, fn(value)], map, iterable)
)

export const associateWithToAsync = curry((fn, map, iterable) =>
  associateToAsync(async value => [value, await fn(value)], map, iterable)
)

export const associateWithToConcur = curry((fn, map, iterable) =>
  associateToConcur(async value => [value, await fn(value)], map, iterable)
)

export const associateWith = curry((fn, iterable) =>
  associateWithTo(fn, new Map(), iterable)
)

export const associateWithAsync = curry((fn, iterable) =>
  associateWithToAsync(fn, new Map(), iterable)
)

export const associateWithConcur = curry((fn, iterable) =>
  associateWithToConcur(fn, new Map(), iterable)
)
