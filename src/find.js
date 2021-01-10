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
import { filterConcur } from './filter.js'
import { map } from './map.js'

export const find = curry(function* (fn, iterable) {
  for (const value of iterable) {
    if (fn(value) === true) {
      yield value
      return
    }
  }
})

export const findAsync = curry(async function* (fn, iterable) {
  for await (const value of iterable) {
    if ((await fn(value)) === true) {
      yield value
      return
    }
  }
})

export const findConcur = curry(async (fn, iterable) => {
  try {
    return [
      await Promise.any(
        map(value => Promise.any(value), filterConcur(fn, iterable))
      )
    ]
  } catch {
    return []
  }
})

export const findLast = curry(function* (fn, iterable) {
  let last

  for (const value of iterable) {
    if (fn(value) === true) {
      last = { value }
    }
  }

  if (last != null) {
    yield last.value
  }
})

export const findLastAsync = curry(async function* (fn, iterable) {
  let last

  for await (const value of iterable) {
    if ((await fn(value)) === true) {
      last = { value }
    }
  }

  if (last != null) {
    yield last.value
  }
})
