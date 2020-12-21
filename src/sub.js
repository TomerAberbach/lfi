/**
 * Copyright 2020 Google LLC
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

import { Iterator } from './shared/iterator.js'
import { curry } from './shared/curry.js'

export const dropWhile = curry(function* (fn, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  while (iterator.hasNext()) {
    const value = iterator.getNext()

    if (fn(value) !== true) {
      yield value
      break
    }
  }

  while (iterator.hasNext()) {
    yield iterator.getNext()
  }
})

export const drop = curry((n, iterable) => {
  let count = 0
  return dropWhile(() => count++ < n, iterable)
})

export const takeWhile = curry(function* (fn, iterable) {
  for (const value of iterable) {
    if (fn(value) !== true) {
      return
    }

    yield value
  }
})

export const take = curry((n, iterable) => {
  let count = 0
  return takeWhile(() => count++ < n, iterable)
})

export const first = take(1)

export const last = curry(function* (iterable) {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return
  }

  let value = iterator.getNext()

  while (iterator.hasNext()) {
    value = iterator.getNext()
  }

  yield value
})