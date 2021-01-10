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

export const chunked = curry(function* (n, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  while (iterator.hasNext()) {
    const chunk = [iterator.getNext()]

    while (chunk.length < n && iterator.hasNext()) {
      chunk.push(iterator.getNext())
    }

    yield chunk
  }
})

export const chunkedAsync = curry(async function* (n, iterable) {
  const asyncIterator = AsyncIterator.fromAsyncIterable(iterable)

  while (await asyncIterator.hasNext()) {
    const chunk = [await asyncIterator.getNext()]

    while (chunk.length < n && (await asyncIterator.hasNext())) {
      chunk.push(await asyncIterator.getNext())
    }

    yield chunk
  }
})
