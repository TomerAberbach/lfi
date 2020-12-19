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

import { curry } from './shared/curry.js'

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

export const group = curry((fn, iterable) => groupTo(fn, new Map(), iterable))

export const groupByTo = curry((fn, map, iterable) =>
  groupTo(value => [fn(value), value], map, iterable)
)
export const groupBy = curry((fn, iterable) =>
  groupByTo(fn, new Map(), iterable)
)

export const groupWithTo = curry((fn, map, iterable) =>
  groupTo(value => [value, fn(value)], map, iterable)
)

export const groupWith = curry((fn, iterable) =>
  groupWithTo(fn, new Map(), iterable)
)
