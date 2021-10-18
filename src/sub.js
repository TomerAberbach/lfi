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
import { findLast, findLastAsync, findLastConcur } from './find.js'
import { indexed, indexedAsync, indexedConcur } from './indexed.js'
import { assertNonNegativeInteger } from './internal/preconditions.js'
import { pipe } from './pipe.js'
import { map, mapAsync, mapConcur } from './map.js'
import deferred from './internal/deferred.js'

export const dropWhile = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    const iterator = Betterator.fromIterable(iterable)

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
  },
}))

export const dropWhileAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)

    while (await asyncIterator.hasNext()) {
      const value = await asyncIterator.getNext()

      if ((await fn(value)) !== true) {
        yield value
        break
      }
    }

    while (await asyncIterator.hasNext()) {
      yield await asyncIterator.getNext()
    }
  },
}))

export const dropWhileConcur = curry((fn, concurIterable) => apply => {
  let dropping = true
  return concurIterable(async value => {
    if (!dropping) {
      await apply(value)
      return
    }

    if ((await fn(value)) !== true && dropping) {
      dropping = false
      await apply(value)
    }
  })
})

export const takeWhile = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    for (const value of iterable) {
      if (fn(value) !== true) {
        return
      }

      yield value
    }
  },
}))

export const takeWhileAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    for await (const value of asyncIterable) {
      if ((await fn(value)) !== true) {
        return
      }

      yield value
    }
  },
}))

export const takeWhileConcur = curry((fn, concurIterable) => apply => {
  let taking = true
  const { promise, resolve } = deferred()

  return Promise.race([
    concurIterable(async value => {
      if (!taking) {
        return
      }

      const takingNow = (await fn(value)) === true

      if (!taking) {
        return
      }

      if (!takingNow) {
        taking = false
        resolve()
        return
      }

      await apply(value)
    }),
    promise,
  ])
})

const createTakeOrDrop = (dropOrTakeWhile, map, indexed) =>
  curry((count, iterable) => {
    assertNonNegativeInteger(`count`, count)

    return pipe(
      indexed(iterable),
      dropOrTakeWhile(([index]) => index < count),
      map(([, value]) => value),
    )
  })

export const drop = createTakeOrDrop(dropWhile, map, indexed)
export const dropAsync = createTakeOrDrop(
  dropWhileAsync,
  mapAsync,
  indexedAsync,
)
export const dropConcur = createTakeOrDrop(
  dropWhileConcur,
  mapConcur,
  indexedConcur,
)
export const take = createTakeOrDrop(takeWhile, map, indexed)
export const takeAsync = createTakeOrDrop(
  takeWhileAsync,
  mapAsync,
  indexedAsync,
)
export const takeConcur = createTakeOrDrop(
  takeWhileConcur,
  mapConcur,
  indexedConcur,
)

export const first = take(1)
export const firstAsync = takeAsync(1)
export const firstConcur = takeConcur(1)

export const last = findLast(() => true)
export const lastAsync = findLastAsync(() => true)
export const lastConcur = findLastConcur(() => true)
