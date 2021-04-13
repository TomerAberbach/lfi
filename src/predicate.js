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

export const all = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) !== true) {
      return false
    }
  }

  return true
})

export const allAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    if ((await fn(value)) !== true) {
      return false
    }
  }

  return true
})

export const allConcur = curry(
  (fn, concurIterable) =>
    new Promise(resolve => {
      let resolved = false
      concurIterable(async value => {
        if (!resolved && (await fn(value)) !== true && !resolved) {
          resolved = true
          resolve(false)
        }
      }).then(() => resolve(true))
    })
)

export const any = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value) === true) {
      return true
    }
  }

  return false
})

export const anyAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    if ((await fn(value)) === true) {
      return true
    }
  }

  return false
})

export const anyConcur = curry(
  (fn, concurIterable) =>
    new Promise(resolve => {
      let resolved = false
      concurIterable(async value => {
        if (!resolved && (await fn(value)) === true && !resolved) {
          resolved = true
          resolve(true)
        }
      }).then(() => resolve(false))
    })
)

export const none = curry((fn, iterable) => !any(fn, iterable))

const createAsyncNone = any =>
  curry(async (fn, iterable) => !(await any(fn, iterable)))

export const noneAsync = createAsyncNone(anyAsync)
export const noneConcur = createAsyncNone(anyConcur)

const createIncludes = any =>
  curry((searchElement, iterable) =>
    any(value => Object.is(value, searchElement), iterable)
  )

export const includes = createIncludes(any)
export const includesAsync = createIncludes(anyAsync)
export const includesConcur = createIncludes(anyConcur)
