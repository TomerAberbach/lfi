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

import { AsyncBetterator, Betterator } from 'betterator'
import { curry } from './curry.js'
import { assertPositiveInteger } from './internal/preconditions.js'

const createWindow = size => {
  let start = 0
  const window = Array.from({ length: size })

  return {
    push(value) {
      start = (start + 1) % size
      window[(start + size - 1) % size] = value
    },
    get: () =>
      Array.from({ length: size }, (_, index) => window[(start + index) % size])
  }
}

export const windowed = curry((size, iterable) => {
  assertPositiveInteger(`size`, size)

  return {
    *[Symbol.iterator]() {
      const iterator = Betterator.fromIterable(iterable)
      const window = createWindow(size)

      for (let i = 0; i < size - 1; i++) {
        if (!iterator.hasNext()) {
          return
        }

        window.push(iterator.getNext())
      }

      while (iterator.hasNext()) {
        window.push(iterator.getNext())
        yield window.get()
      }
    }
  }
})

export const windowedAsync = curry((size, asyncIterable) => {
  assertPositiveInteger(`size`, size)

  return {
    async *[Symbol.asyncIterator]() {
      const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)
      const window = createWindow(size)

      for (let i = 0; i < size - 1; i++) {
        if (!(await asyncIterator.hasNext())) {
          return
        }

        window.push(await asyncIterator.getNext())
      }

      while (await asyncIterator.hasNext()) {
        window.push(await asyncIterator.getNext())
        yield window.get()
      }
    }
  }
})

export const windowedConcur = curry((size, concurIterable) => {
  assertPositiveInteger(`size`, size)

  return apply => {
    let pushed = 0
    const window = createWindow(size)

    return concurIterable(async value => {
      window.push(value)

      if (pushed < size - 1) {
        pushed++
        return
      }

      await apply(window.get())
    })
  }
})
