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

import { curry } from './curry.js'
import { identity } from './internal/identity.js'

export const uniqueBy = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    const set = new Set()

    for (const value of iterable) {
      const by = fn(value)

      if (set.has(by)) {
        continue
      }

      set.add(by)
      yield value
    }
  },
}))

export const uniqueByAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    const set = new Set()

    for await (const value of asyncIterable) {
      const by = await fn(value)

      if (set.has(by)) {
        continue
      }

      set.add(by)
      yield value
    }
  },
}))

export const uniqueByConcur = curry((fn, concurIterable) => apply => {
  const set = new Set()

  return concurIterable(async value => {
    const by = await fn(value)

    if (set.has(by)) {
      return
    }

    set.add(by)
    await apply(value)
  })
})

export const unique = uniqueBy(identity)
export const uniqueAsync = uniqueByAsync(identity)
export const uniqueConcur = uniqueByConcur(identity)
