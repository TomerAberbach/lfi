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

export const uniqueByWith = curry(function* (fn, set, iterable) {
  for (const value of iterable) {
    const by = fn(value)

    if (!set.has(by)) {
      set.add(by)
      yield value
    }
  }
})

export const uniqueBy = curry((fn, iterable) =>
  uniqueByWith(fn, new Set(), iterable)
)

export const uniqueWith = uniqueByWith(value => value)

export const unique = uniqueBy(value => value)
