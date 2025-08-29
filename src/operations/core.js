import {
  createAsyncIterable,
  createIterable,
  deferred,
  thunk,
} from '../internal/helpers.js'
import { map } from './transforms.js'

export { curry } from '../internal/helpers.js'

export const pipe = (value, ...fns) => fns.reduce((acc, fn) => fn(acc), value)

export const compose =
  (...fns) =>
  value =>
    pipe(value, ...fns)

export const asAsync = iterable => {
  if (iterable[Symbol.asyncIterator]) {
    return iterable
  }

  return createAsyncIterable(
    iterable[Symbol.iterator]
      ? // We write this instead of `() => iterable[Symbol.iterator]()` so that
        // we handle the case of the iterable containing promises, each of which
        // should be awaited.
        async function* () {
          yield* iterable
        }
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
    return async apply =>
      handlePromiseResults(
        await Promise.allSettled(
          map(value => safeApply(apply, value), iterable),
        ),
      )
  }

  return async apply => {
    // NOTE: We can't use `Array.fromAsync(iterable, mapper)` here because we
    // don't want to await the result of `mapper` before moving onto the next
    // value in the iterable.
    const promises = []
    for await (const value of iterable) {
      promises.push(safeApply(apply, value))
    }
    handlePromiseResults(await Promise.allSettled(promises))
  }
}

// We transform synchronous errors into async ones so that every available value
// makes it into an `apply` call. This way downstream functions can decide
// whether to ignore a concurrent iterable failure.
const safeApply = async (apply, value) => apply(await value)

const handlePromiseResults = results => {
  const errors = results.flatMap(result =>
    result.status === `rejected` ? [result.reason] : [],
  )
  switch (errors.length) {
    case 0:
      return
    case 1:
      throw errors[0]
    default:
      throw new AggregateError(errors, `Concur iterable rejected`)
  }
}

const result = { done: true }
const iterator = { next: () => result }
const asyncIterator = { next: () => Promise.resolve(result) }

export const empty = thunk(createIterable(() => iterator))
export const emptyAsync = thunk(createAsyncIterable(() => asyncIterator))
export const emptyConcur = thunk(() => Promise.resolve())

export const opaque = iterable =>
  createIterable(() => iterable[Symbol.iterator]())
export const opaqueAsync = asyncIterable =>
  createAsyncIterable(() => asyncIterable[Symbol.asyncIterator]())
export const opaqueConcur = concurIterable => apply => concurIterable(apply)
