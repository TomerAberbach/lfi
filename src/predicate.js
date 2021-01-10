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

export const all = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) !== true) {
      return false
    }
  }

  return true
})

export const allAsync = curry(async (fn, iterable) => {
  for await (const value of iterable) {
    if ((await fn(value)) !== true) {
      return false
    }
  }

  return true
})

export const any = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) === true) {
      return true
    }
  }

  return false
})

export const anyAsync = curry(async (fn, iterable) => {
  for await (const value of iterable) {
    if ((await fn(value)) === true) {
      return true
    }
  }

  return false
})

export const none = curry((fn, iterable) => !any(fn, iterable))

export const noneAsync = curry((fn, iterable) => !anyAsync(fn, iterable))

export const contains = curry((searchValue, iterable) =>
  any(value => Object.is(value, searchValue), iterable)
)

export const containsAsync = curry((searchValue, iterable) =>
  anyAsync(value => Object.is(value, searchValue), iterable)
)
