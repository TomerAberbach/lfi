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
import { empty } from './shared/empty.js'

export const or = curry((fn, iterable) => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true || iterator.next().done !== true ? fn() : value
})

export const next = curry(iterable => {
  const iterator = iterable[Symbol.iterator]()
  const { done, value } = iterator.next()

  return done === true
    ? [empty, empty]
    : [[value], { [Symbol.iterator]: () => iterator }]
})

export const get = curry(function* (index, iterable) {
  if (Array.isArray(iterable)) {
    if (index < iterable.length) {
      yield iterable[index]
    }

    return
  }

  const iterator = Iterator.fromIterable(iterable)

  for (let i = 0; i < index && iterator.hasNext(); i++) {
    iterator.getNext()
  }

  yield iterator.getNext()
})
