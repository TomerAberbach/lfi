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

import {
  assertNonNegativeInteger,
  assertPositiveInteger,
} from '../internal/preconditions.js'
import {
  createAsyncIterable,
  createIterable,
  promiseWithEarlyResolve,
} from '../internal/helpers.js'
import { curry, pipe } from './fn.js'
import { findLast, findLastAsync, findLastConcur } from './find.js'
import {
  index,
  indexAsync,
  indexConcur,
  map,
  mapAsync,
  mapConcur,
} from './transform.js'

export const dropWhile = curry((fn, iterable) =>
  createIterable(function* () {
    let dropping = true
    for (const value of iterable) {
      if (!dropping || !fn(value)) {
        dropping = false
        yield value
      }
    }
  }),
)

export const dropWhileAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    let dropping = true
    for await (const value of asyncIterable) {
      if (!dropping || !(await fn(value)) || !dropping) {
        dropping = false
        yield value
      }
    }
  }),
)

export const dropWhileConcur = curry((fn, concurIterable) => apply => {
  let dropping = true
  return concurIterable(async value => {
    if (!dropping || !(await fn(value)) || !dropping) {
      // eslint-disable-next-line require-atomic-updates
      dropping = false
      await apply(value)
    }
  })
})

export const takeWhile = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      if (!fn(value)) {
        break
      }

      yield value
    }
  }),
)

export const takeWhileAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      if (!(await fn(value))) {
        break
      }

      yield value
    }
  }),
)

export const takeWhileConcur = curry(
  (fn, concurIterable) => apply =>
    promiseWithEarlyResolve(resolve => {
      let taking = true
      return concurIterable(async value => {
        if (taking && (await fn(value)) && taking) {
          await apply(value)
        } else {
          // eslint-disable-next-line require-atomic-updates
          taking = false
          resolve()
        }
      })
    }),
)

const createTakeOrDrop = (dropOrTakeWhile, map, index) =>
  curry((count, iterable) => {
    assertNonNegativeInteger({ count })

    return pipe(
      index(iterable),
      dropOrTakeWhile(([index]) => index < count),
      map(([, value]) => value),
    )
  })

export const drop = createTakeOrDrop(dropWhile, map, index)
export const dropAsync = createTakeOrDrop(dropWhileAsync, mapAsync, indexAsync)
export const dropConcur = createTakeOrDrop(
  dropWhileConcur,
  mapConcur,
  indexConcur,
)
export const take = createTakeOrDrop(takeWhile, map, index)
export const takeAsync = createTakeOrDrop(takeWhileAsync, mapAsync, indexAsync)
export const takeConcur = createTakeOrDrop(
  takeWhileConcur,
  mapConcur,
  indexConcur,
)

export const first = take(1)
export const firstAsync = takeAsync(1)
export const firstConcur = takeConcur(1)

export const last = findLast(() => true)
export const lastAsync = findLastAsync(() => true)
export const lastConcur = findLastConcur(() => true)

export const chunk = curry((size, iterable) => {
  assertPositiveInteger({ size })

  return createIterable(function* () {
    let chunk = []
    for (const value of iterable) {
      chunk.push(value)

      if (chunk.length < size) {
        continue
      }

      yield chunk
      chunk = []
    }

    if (chunk.length) {
      yield chunk
    }
  })
})

export const chunkAsync = curry((size, asyncIterable) => {
  assertPositiveInteger({ size })

  return createAsyncIterable(async function* () {
    let chunk = []
    for await (const value of asyncIterable) {
      chunk.push(value)

      if (chunk.length < size) {
        continue
      }

      yield chunk
      chunk = []
    }

    if (chunk.length) {
      yield chunk
    }
  })
})

export const chunkConcur = curry((size, concurIterable) => {
  assertPositiveInteger({ size })

  return async apply => {
    let chunk = []
    await concurIterable(async value => {
      chunk.push(value)

      if (chunk.length < size) {
        return
      }

      const previousChunk = chunk
      chunk = []
      await apply(previousChunk)
    })

    if (chunk.length) {
      await apply(chunk)
    }
  }
})

export const window = curry((options, iterable) => {
  const {
    _size: size,
    _partialStart: partialStart,
    _partialEnd: partialEnd,
  } = normalizeWindowOptions(options)
  assertPositiveInteger({ size })

  return createIterable(function* () {
    const window = createWindow(size)

    for (const value of iterable) {
      if (window._push(value) === size || partialStart) {
        yield window._get()
      }
    }

    if (partialEnd) {
      yield* window._partialEnd(partialStart)
    }
  })
})

export const windowAsync = curry((options, asyncIterable) => {
  const {
    _size: size,
    _partialStart: partialStart,
    _partialEnd: partialEnd,
  } = normalizeWindowOptions(options)
  assertPositiveInteger({ size })

  return createAsyncIterable(async function* () {
    const window = createWindow(size)

    for await (const value of asyncIterable) {
      if (window._push(value) === size || partialStart) {
        yield window._get()
      }
    }

    if (partialEnd) {
      yield* window._partialEnd(partialStart)
    }
  })
})

export const windowConcur = curry((options, concurIterable) => {
  const {
    _size: size,
    _partialStart: partialStart,
    _partialEnd: partialEnd,
  } = normalizeWindowOptions(options)
  assertPositiveInteger({ size })

  return async apply => {
    const window = createWindow(size)

    await concurIterable(async value => {
      if (window._push(value) === size || partialStart) {
        await apply(window._get())
      }
    })

    if (partialEnd) {
      await Promise.all(map(apply, window._partialEnd(partialStart)))
    }
  }
})

function normalizeWindowOptions(options) {
  const {
    size,
    partialStart = false,
    partialEnd = false,
  } = typeof options === `number` ? { size: options } : options
  return { _size: size, _partialStart: partialStart, _partialEnd: partialEnd }
}

function createWindow(size) {
  let nextValueIndex = 0
  let count = 0
  const window = Array.from({ length: size })

  return {
    _push(value) {
      window[nextValueIndex] = value
      nextValueIndex = (nextValueIndex + 1) % size

      count = Math.min(count + 1, size)
      return count
    },
    _get(index = 0) {
      const offset = size - count + nextValueIndex + index
      return Array.from(
        { length: count - index },
        (_, index) => window[(offset + index) % size],
      )
    },
    *_partialEnd(partialStart) {
      for (
        let index = count < size && !partialStart ? 0 : 1;
        index < count;
        index++
      ) {
        yield this._get(index)
      }
    },
  }
}
