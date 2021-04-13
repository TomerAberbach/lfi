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

import { AsyncBetterator, Betterator } from 'betterator'
import { asConcur } from './as.js'

export const cached = iterable => {
  const cache = []
  const iterator = Betterator.fromIterable(iterable)

  return {
    *[Symbol.iterator]() {
      let i = 0

      while (true) {
        if (i < cache.length) {
          yield cache[i++]
        } else if (iterator.hasNext()) {
          const value = iterator.getNext()
          cache.push(value)
          i++
          yield value
        } else {
          break
        }
      }
    }
  }
}

export const cachedAsync = asyncIterable => {
  const cache = []
  const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)

  return {
    async *[Symbol.asyncIterator]() {
      let i = 0

      while (true) {
        if (i < cache.length) {
          yield cache[i++]
        } else if (await asyncIterator.hasNext()) {
          const value = await asyncIterator.getNext()
          cache.push(value)
          i++
          yield value
        } else {
          break
        }
      }
    }
  }
}

export const cachedConcur = concurIterable => {
  let promise
  const cache = []
  const applys = []
  let isResolved = false

  return async apply => {
    if (!isResolved) {
      applys.push(apply)

      if (promise == null) {
        promise = concurIterable(async value => {
          cache.push(value)
          await asConcur(applys)(apply => apply(value))
        }).then(() => (isResolved = true))
      }
    }

    await Promise.all([asConcur(cache)(apply), promise])
  }
}
