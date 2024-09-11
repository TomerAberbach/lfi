import {
  createAsyncIterable,
  deferred,
  isPromise,
} from '../internal/helpers.js'
import { map } from './transform.js'

export const asAsync = iterable => {
  if (iterable[Symbol.asyncIterator]) {
    return iterable
  }

  return createAsyncIterable(
    iterable[Symbol.iterator]
      ? () => iterable[Symbol.iterator]()
      : async function* () {
          let buffer = []
          let done = false
          let nonEmptyBufferDeferred = deferred()
          let deferredError

          iterable(value => {
            buffer.push(value)
            if (nonEmptyBufferDeferred) {
              const currentDeferred = nonEmptyBufferDeferred
              nonEmptyBufferDeferred = null
              currentDeferred._resolve()
            }
          })
            .then(() => {
              done = true
              nonEmptyBufferDeferred?._resolve()
            })
            .catch(error => {
              deferredError = error
              nonEmptyBufferDeferred?._resolve()
            })

          // eslint-disable-next-line no-unmodified-loop-condition
          while (!done) {
            if (deferredError) {
              yield* buffer
              throw deferredError
            }

            if (!buffer.length) {
              await nonEmptyBufferDeferred._promise
              continue
            }

            const currentBuffer = buffer
            buffer = []
            nonEmptyBufferDeferred = deferred()
            yield* currentBuffer
          }
        },
  )
}

export const asConcur = iterable => {
  if (typeof iterable === `function`) {
    return iterable
  }

  if (iterable[Symbol.iterator]) {
    return async apply => {
      await Promise.all(map(apply, iterable))
    }
  }

  return async apply => {
    const promises = []

    for await (const value of iterable) {
      const result = apply(value)
      if (isPromise(result)) {
        promises.push(result)
      }
    }

    await Promise.all(promises)
  }
}
