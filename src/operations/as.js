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

import { createAsyncIterable, deferred } from '../internal/helpers.js'
import { map } from './transform.js'

export const asAsync = iterable => {
  if (iterable[Symbol.asyncIterator]) {
    return iterable
  }

  return createAsyncIterable(
    iterable[Symbol.iterator]
      ? () => iterable[Symbol.iterator]()
      : async function* () {
          let buffer = []
          let done = false
          let nonEmptyBufferDeferred = deferred()
          let deferredError

          iterable(value => {
            buffer.push(value)
            if (nonEmptyBufferDeferred) {
              const currentDeferred = nonEmptyBufferDeferred
              nonEmptyBufferDeferred = null
              currentDeferred._resolve()
            }
          })
            .then(() => {
              done = true
              nonEmptyBufferDeferred?._resolve()
            })
            .catch(error => {
              deferredError = error
              nonEmptyBufferDeferred?._resolve()
            })

          // eslint-disable-next-line no-unmodified-loop-condition
          while (!done) {
            if (!buffer.length) {
              if (deferredError) {
                throw deferredError
              }

              await nonEmptyBufferDeferred._promise
              continue
            }

            const currentBuffer = buffer
            buffer = []
            nonEmptyBufferDeferred = deferred()
            yield* currentBuffer

            if (deferredError) {
              throw deferredError
            }
          }
        },
  )
}

export const asConcur = iterable => {
  if (typeof iterable === `function`) {
    return iterable
  }

  if (iterable[Symbol.iterator]) {
    return async apply => {
      await Promise.all(map(apply, iterable))
    }
  }

  return async apply => {
    const promises = []

    for await (const value of iterable) {
      promises.push(apply(value))
    }

    await Promise.all(promises)
  }
}
