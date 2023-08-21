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

import { createAsyncIterable, createIterable } from '../internal/helpers.js'
import { asConcur } from './as.js'

export const cache = iterable => {
  const cache = []
  const iterator = iterable[Symbol.iterator]()

  return createIterable(function* () {
    let index = 0

    while (true) {
      if (index < cache.length) {
        yield cache[index++]
        continue
      }

      const { value, done } = iterator.next()

      if (done) {
        break
      }

      cache.push(value)
      index++
      yield value
    }
  })
}

export const cacheAsync = asyncIterable => {
  const cache = []
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()

  return createAsyncIterable(async function* () {
    let index = 0

    while (true) {
      if (index < cache.length) {
        yield cache[index++]
        continue
      }

      const { value, done } = await asyncIterator.next()

      if (done) {
        break
      }

      cache.push(value)
      index++
      yield value
    }
  })
}

export const cacheConcur = concurIterable => {
  let promise
  const cache = []
  const applys = []
  let isResolved = false

  return async apply => {
    if (!isResolved) {
      applys.push(apply)

      if (!promise) {
        promise = concurIterable(async value => {
          cache.push(value)
          await asConcur(applys)(apply => apply(value))
        }).then(() => (isResolved = true))
      }
    }

    await Promise.all([asConcur(cache)(apply), promise])
  }
}
