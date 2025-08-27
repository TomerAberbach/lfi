import {
  concurIteratorSymbol,
  createAsyncIterable,
  createConcurIterable,
  createIterable,
  deferred,
  thunk,
} from '../internal/helpers.js'
import { map, mapAsync } from './transforms.js'

export { concurIteratorSymbol, curry } from '../internal/helpers.js'

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
      ? () => iterable[Symbol.iterator]()
      : async function* () {
          let buffer = []
          let done = false
          let nonEmptyBufferDeferred = deferred()
          let deferredError

          iterable[concurIteratorSymbol](value => {
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
  if (iterable[concurIteratorSymbol]) {
    return iterable
  }

  return createConcurIterable(
    iterable[Symbol.iterator]
      ? async apply => {
          await Promise.all(map(apply, iterable))
        }
      : async apply => {
          await Array.fromAsync(mapAsync(apply, iterable))
        },
  )
}

const result = { done: true }
const iterator = { next: () => result }
const asyncIterator = { next: () => Promise.resolve(result) }

export const empty = thunk(createIterable(() => iterator))
export const emptyAsync = thunk(createAsyncIterable(() => asyncIterator))
export const emptyConcur = thunk(createConcurIterable(() => {}))

export const opaque = iterable =>
  createIterable(() => iterable[Symbol.iterator]())
export const opaqueAsync = asyncIterable =>
  createAsyncIterable(() => asyncIterable[Symbol.asyncIterator]())
export const opaqueConcur = concurIterable =>
  createConcurIterable(apply => concurIterable[concurIteratorSymbol](apply))
