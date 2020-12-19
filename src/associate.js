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

export const associateTo = curry((fn, map, iterable) => {
  for (const value of iterable) {
    const [k, v] = fn(value)
    map.set(k, v)
  }

  return map
})

export const associate = curry((fn, iterable) =>
  associateTo(fn, new Map(), iterable)
)

export const associateByTo = curry((fn, map, iterable) =>
  associateTo(value => [fn(value), value], map, iterable)
)

export const associateBy = curry((fn, iterable) =>
  associateByTo(fn, new Map(), iterable)
)

export const associateWithTo = curry((fn, map, iterable) =>
  associateTo(value => [value, fn(value)], map, iterable)
)

export const associateWith = curry((fn, iterable) =>
  associateWithTo(fn, new Map(), iterable)
)
