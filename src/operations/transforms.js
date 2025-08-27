import {
  concurIteratorSymbol,
  createAsyncIterable,
  createConcurIterable,
  createIterable,
  curry,
  identity,
} from '../internal/helpers.js'
import { asConcur } from './core.js'

export const map = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      yield fn(value)
    }
  }),
)

export const mapAsync = curry((fn, asyncIterable) =>
  createAsyncIterable(async function* () {
    for await (const value of asyncIterable) {
      yield fn(value)
    }
  }),
)

export const mapConcur = curry((fn, concurIterable) =>
  createConcurIterable(apply =>
    concurIterable[concurIteratorSymbol](async value => apply(await fn(value))),
  ),
)

export const flatMap = curry((fn, iterable) =>
  createIterable(function* () {
    for (const value of iterable) {
      yield* fn(value)
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

export const flatMapConcur = curry((fn, concurIterable) =>
  createConcurIterable(apply =>
    concurIterable[concurIteratorSymbol](async value =>
      asConcur(await fn(value))[concurIteratorSymbol](apply),
    ),
  ),
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

export const indexConcur = curry(concurIterable =>
  createConcurIterable(async apply => {
    let index = 0
    await concurIterable[concurIteratorSymbol](value => apply([index++, value]))
  }),
)
