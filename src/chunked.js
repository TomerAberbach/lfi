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
import { curry } from './curry.js'
import { assertPositiveInteger } from './internal/preconditions.js'

export const chunked = curry((size, iterable) => {
  assertPositiveInteger(`size`, size)

  return {
    *[Symbol.iterator]() {
      const iterator = Betterator.fromIterable(iterable)

      while (iterator.hasNext()) {
        const chunk = [iterator.getNext()]

        while (chunk.length < size && iterator.hasNext()) {
          chunk.push(iterator.getNext())
        }

        yield chunk
      }
    },
  }
})

export const chunkedAsync = curry((size, asyncIterable) => {
  assertPositiveInteger(`size`, size)

  return {
    async *[Symbol.asyncIterator]() {
      const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)

      while (await asyncIterator.hasNext()) {
        const chunk = [await asyncIterator.getNext()]

        while (chunk.length < size && (await asyncIterator.hasNext())) {
          chunk.push(await asyncIterator.getNext())
        }

        yield chunk
      }
    },
  }
})

export const chunkedConcur = curry((size, concurIterable) => {
  assertPositiveInteger(`size`, size)

  return async apply => {
    let chunk = []

    await concurIterable(async value => {
      chunk.push(value)

      if (chunk.length === size) {
        const previousChunk = chunk
        chunk = []
        await apply(previousChunk)
      }
    })

    if (chunk.length > 0) {
      await apply(chunk)
    }
  }
})
