/**
 * Copyright 2022 Google LLC
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

import { identity } from '../internal/helpers.js'
import { curry } from './fn.js'

export const mapReducer = curry((fn, reducer) => {
  const { finish, ...restReducer } = normalizeReducer(reducer)
  return { ...restReducer, finish: value => fn(finish(value)) }
})

export const mapAsyncReducer = curry((fn, asyncReducer) => {
  const { finish, ...restAsyncReducer } = normalizeReducer(asyncReducer)
  return { ...restAsyncReducer, finish: async value => fn(await finish(value)) }
})

export const normalizeReducer = reducer => {
  const normalizedReducer = { finish: identity }
  if (typeof reducer === `function`) {
    normalizedReducer.add = reducer
    return normalizedReducer
  }

  for (const methodName of REDUCER_METHOD_NAMES) {
    const method = reducer[methodName]
    if (method) {
      normalizedReducer[methodName] = method.bind(reducer)
    }
  }

  return normalizedReducer
}

const REDUCER_METHOD_NAMES = [`create`, `add`, `get`, `finish`, `combine`]

export const NO_ENTRY = {}
