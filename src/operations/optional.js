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
import { asAsync } from './as.js'
import { empty, emptyAsync } from './empty.js'
import { curry } from './fn.js'
import { opaque } from './opaque.js'

export const or = curry((fn, iterable) => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()
  return done || !iterator.next().done ? fn() : value
})

export const orAsync = curry(async (fn, asyncIterable) => {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()

  return done || !(await asyncIterator.next()).done ? fn() : value
})

export const orConcur = curry((fn, concurIterable) =>
  promiseWithEarlyResolve(async resolve => {
    let resolved
    let result

    await concurIterable(async value => {
      if (!result) {
        result = { value }
      } else if (!resolved) {
        resolved = true
        resolve(await fn())
      }
    })

    if (!resolved) {
      resolve(result ? result.value : await fn())
    }
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

  return done
    ? [empty, empty]
    : [opaque([value]), createIterable(() => iterator)]
})

export const nextAsync = curry(async asyncIterable => {
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()
  const { done, value } = await asyncIterator.next()

  return done
    ? [emptyAsync, emptyAsync]
    : [asAsync([value]), createAsyncIterable(() => asyncIterator)]
})
