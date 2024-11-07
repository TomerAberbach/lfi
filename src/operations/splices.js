import {
  createAsyncIterable,
  createIterable,
  curry,
  promiseWithEarlyResolve,
} from '../internal/helpers.js'
import {
  assertNonNegativeInteger,
  assertPositiveInteger,
  assertRange,
} from '../internal/preconditions.js'
import {
  asAsync,
  asConcur,
  empty,
  emptyAsync,
  emptyConcur,
  pipe,
} from './core.js'
import { findLast, findLastAsync, findLastConcur } from './filters.js'
import {
  flatten,
  flattenAsync,
  flattenConcur,
  index,
  indexAsync,
  indexConcur,
  map,
  mapAsync,
  mapConcur,
} from './transforms.js'

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

const createSlice = (empty, drop, take) =>
  curry((start, end, iterable) => {
    assertNonNegativeInteger({ start })
    assertNonNegativeInteger({ end })
    assertRange({ [`start,end`]: [start, end] })
    return start === end
      ? empty
      : pipe(iterable, drop(start), take(end - start))
  })
export const slice = createSlice(empty, drop, take)
export const sliceAsync = createSlice(emptyAsync, dropAsync, takeAsync)
export const sliceConcur = createSlice(emptyConcur, dropConcur, takeConcur)

const createAt = slice =>
  curry((index, iterable) => {
    assertNonNegativeInteger({ index })
    return slice(index, index + 1, iterable)
  })
export const at = createAt(slice)
export const atAsync = createAt(sliceAsync)
export const atConcur = createAt(sliceConcur)

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

const normalizeWindowOptions = options => {
  const {
    size,
    partialStart = false,
    partialEnd = false,
  } = typeof options === `number` ? { size: options } : options
  return { _size: size, _partialStart: partialStart, _partialEnd: partialEnd }
}

const createWindow = size => {
  let nextValueIndex = 0
  let count = 0
  const window = Array.from({ length: size })

  return {
    _push: value => {
      window[nextValueIndex] = value
      nextValueIndex = (nextValueIndex + 1) % size

      count = Math.min(count + 1, size)
      return count
    },
    _get: (index = 0) => {
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

export const concat = (...iterables) => flatten(iterables)
export const concatAsync = (...iterables) => flattenAsync(asAsync(iterables))
export const concatConcur = (...iterables) => flattenConcur(asConcur(iterables))
