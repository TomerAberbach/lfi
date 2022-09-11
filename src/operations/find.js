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
  promiseWithEarlyResolve,
} from '../internal/helpers.js'
import { curry } from './fn.js'

export const find = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      if (fn(value)) {
        yield value
        return
      }
    }
  }),
)

export const findAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      if (await fn(value)) {
        yield value
        return
      }
    }
  }),
)

export const findConcur = curry(
  (fn, concurIterable) => apply =>
    promiseWithEarlyResolve(async resolve => {
      let found = false
      await concurIterable(async value => {
        if (found || !(await fn(value)) || found) {
          return
        }

        found = true
        await apply(value)
        resolve()
      })
    }),
)

export const findLast = curry((fn, iterable) =>
  createIterable(function* () {
    let last

    for (const value of iterable) {
      if (fn(value)) {
        last = { value }
      }
    }

    if (last) {
      yield last.value
    }
  }),
)

export const findLastAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    let last

    for await (const value of asyncIterable) {
      if (await fn(value)) {
        last = { value }
      }
    }

    if (last) {
      yield last.value
    }
  }),
)

export const findLastConcur = curry((fn, concurIterable) => async apply => {
  let last

  await concurIterable(async value => {
    if (await fn(value)) {
      last = { value }
    }
  })

  if (last) {
    await apply(last.value)
  }
})
