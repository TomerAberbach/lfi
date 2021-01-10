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

export function* zip(...iterables) {
  const iterators = iterables.map(Iterator.fromIterable)

  while (iterators.every(iterator => iterator.hasNext())) {
    yield iterators.map(iterator => iterator.getNext())
  }
}

export async function* zipAsync(...iterables) {
  const iterators = iterables.map(AsyncIterator.fromAsyncIterable)

  while (true) {
    let resolve
    const promise = new Promise(r => (resolve = r))

    const cont = await Promise.race([
      promise,
      Promise.all(
        iterators.map(async iterator => {
          if (!(await iterator.hasNext())) {
            resolve(false)
          }
        })
      ).then(() => false)
    ])

    if (!cont) {
      return
    }

    yield Promise.all(iterators.map(iterator => iterator.getNext()))
  }
}
