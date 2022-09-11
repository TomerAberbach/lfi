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

export const identity = value => value

export const thunk = value => () => value

export const wrapFunction = (previousFn, newFn) =>
  Object.defineProperties(newFn, {
    length: { value: previousFn.length },
    name: { value: previousFn.name },
  })

export const createIterable = fn => ({ [Symbol.iterator]: fn })

export const createAsyncIterable = fn => ({ [Symbol.asyncIterator]: fn })

export const promiseWithEarlyResolve = fn => {
  const { _promise: promise, _resolve: resolve } = deferred()
  return Promise.race([promise, fn(resolve)])
}

export const deferred = () => {
  let resolve
  return { _promise: new Promise(r => (resolve = r)), _resolve: resolve }
}
