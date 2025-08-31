import {
  createAsyncIterable,
  createIterable,
  curry,
  identity,
  mapIterable,
} from '../internal/helpers.js'
import { asConcur } from './core.js'

export const map = curry((fn, iterable) =>
  mapIterable(iterable, iterator => () => {
    const result = iterator.next()
    return result.done ? result : { value: fn(result.value) }
  }),
)

export const mapAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      yield fn(value)
    }
  }),
)

export const mapConcur = curry(
  (fn, concurIterable) => apply =>
    concurIterable(async value => apply(await fn(value))),
)

export const flatMap = curry((fn, iterable) =>
  mapIterable(iterable, iterator => {
    let subIterator
    return () => {
      while (true) {
        if (!subIterator) {
          const result = iterator.next()
          if (result.done) {
            return result
          }
          subIterator = fn(result.value)[Symbol.iterator]()
        }
        const result = subIterator.next()
        if (result.done) {
          subIterator = undefined
        } else {
          return result
        }
      }
    }
  }),
)

export const flatMapAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      yield* await fn(value)
    }
  }),
)

export const flatMapConcur = curry(
  (fn, concurIterable) => apply =>
    concurIterable(async value => asConcur(await fn(value))(apply)),
)

export const flatten = flatMap(identity)
export const flattenAsync = flatMapAsync(identity)
export const flattenConcur = flatMapConcur(identity)

export const index = curry(iterable =>
  createIterable(function* () {
    let index = 0
    for (const value of iterable) {
      yield [index++, value]
    }
  }),
)

export const indexAsync = curry(asyncIterable =>
  createAsyncIterable(async function* () {
    let index = 0
    for await (const value of asyncIterable) {
      yield [index++, value]
    }
  }),
)

export const indexConcur = curry(concurIterable => async apply => {
  let index = 0
  await concurIterable(value => apply([index++, value]))
})
