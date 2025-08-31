import {
  createAsyncIterable,
  createIterable,
  makeAsync,
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
          let nonEmptyBufferResolvers
          let deferredError

          iterable(value => {
            buffer.push(value)
            if (nonEmptyBufferResolvers) {
              const currentDeferred = nonEmptyBufferResolvers
              nonEmptyBufferResolvers = undefined
              currentDeferred.resolve()
            }
          })
            .then(() => {
              done = true
              nonEmptyBufferResolvers?.resolve()
            })
            .catch(error => {
              deferredError = error
              nonEmptyBufferResolvers?.resolve()
            })

          while (!done) {
            if (!buffer.length) {
              nonEmptyBufferResolvers = Promise.withResolvers()
              await nonEmptyBufferResolvers.promise
            }

            const currentBuffer = buffer
            buffer = []
            yield* currentBuffer

            if (deferredError) {
              throw deferredError
            }
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
      apply = makeAsync(apply)
      return handlePromiseResults(
        await Promise.allSettled(map(value => apply(value), iterable)),
      )
    }
  }

  return async apply => {
    apply = makeAsync(apply)
    // NOTE: We can't use `Array.fromAsync(iterable, mapper)` here because we
    // don't want to await the result of `mapper` before moving onto the next
    // value in the iterable.
    const promises = []
    for await (const value of iterable) {
      promises.push(apply(value))
    }
    handlePromiseResults(await Promise.allSettled(promises))
  }
}

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
