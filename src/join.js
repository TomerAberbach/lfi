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

import { AsyncIterator, Iterator } from './iterator.js'
import { curry } from './curry.js'

export const join = curry((separator, iterable) => {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return ``
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc += `${separator}${iterator.getNext()}`
  }

  return acc
})

export const joinAsync = curry(async (separator, iterable) => {
  const iterator = AsyncIterator.fromAsyncIterable(iterable)

  if (!(await iterator.hasNext())) {
    return ``
  }

  let acc = await iterator.getNext()

  while (await iterator.hasNext()) {
    acc += `${separator}${await iterator.getNext()}`
  }

  return acc
})
