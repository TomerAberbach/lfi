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

export const find = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    for (const value of iterable) {
      if (fn(value) === true) {
        yield value
        return
      }
    }
  }
}))

export const findAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    for await (const value of asyncIterable) {
      if ((await fn(value)) === true) {
        yield value
        return
      }
    }
  }
}))

export const findConcur = curry(
  (fn, concurIterable) => apply =>
    new Promise(resolve => {
      let found = false
      concurIterable(async value => {
        if (!found && (await fn(value)) === true && !found) {
          found = true
          resolve()
          await apply(value)
        }
      }).then(() => resolve())
    })
)

export const findLast = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    let last

    for (const value of iterable) {
      if (fn(value) === true) {
        last = { value }
      }
    }

    if (last != null) {
      yield last.value
    }
  }
}))

export const findLastAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    let last

    for await (const value of asyncIterable) {
      if ((await fn(value)) === true) {
        last = { value }
      }
    }

    if (last != null) {
      yield last.value
    }
  }
}))

export const findLastConcur = curry((fn, concurIterable) => async apply => {
  let last

  await concurIterable(async value => {
    if ((await fn(value)) === true) {
      last = { value }
    }
  })

  if (last != null) {
    await apply(last.value)
  }
})
