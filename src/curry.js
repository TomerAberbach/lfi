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

import { wrapFunction } from './internal/wrap-function.js'

const curriedFunctions = new WeakSet()

export const curry = fn => {
  if (fn.length <= 1 || curriedFunctions.has(fn)) {
    return fn
  }

  const curried = wrapFunction(fn, (...args) =>
    args.length < fn.length ? curry(fn.bind(null, ...args)) : fn(...args)
  )
  curriedFunctions.add(curried)

  return curried
}
