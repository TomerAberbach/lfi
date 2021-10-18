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
import { empty, emptyAsync } from './empty.js'
import { asAsync } from './as.js'

export const or = curry((fn, iterable) => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true || iterator.next().done !== true ? fn() : value
})

export const orAsync = curry(async (fn, asyncIterable) => {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()

  return done === true || (await asyncIterator.next()).done !== true
    ? fn()
    : value
})

export const orConcur = curry(
  (fn, concurIterable) =>
    new Promise((resolve, reject) => {
      ;(async () => {
        let resolved = false
        let result

        await concurIterable(async value => {
          if (result == null) {
            result = { value }
          } else if (!resolved) {
            resolved = true

            try {
              resolve(await fn())
            } catch (e) {
              reject(e)
            }
          }
        })

        if (resolved) {
          return
        }

        try {
          resolve(result ? result.value : await fn())
        } catch (e) {
          reject(e)
        }
      })()
    }),
)

const error = () => {
  throw new Error(`Did not contain exactly one value`)
}

export const get = or(error)
export const getAsync = orAsync(error)
export const getConcur = orConcur(error)

export const next = curry(iterable => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true
    ? [empty, empty]
    : [
        {
          *[Symbol.iterator]() {
            yield value
          },
        },
        { [Symbol.iterator]: () => iterator },
      ]
})

export const nextAsync = curry(async asyncIterable => {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()

  return done === true
    ? [emptyAsync, emptyAsync]
    : [asAsync([value]), { [Symbol.asyncIterator]: () => asyncIterator }]
})
