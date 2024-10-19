import { curry } from './fn.js'
import { map, mapAsync, mapConcur } from './transform.js'

export const each = curry((fn, iterable) =>
  map(value => {
    fn(value)
    return value
  }, iterable),
)

const createAsyncEach = map =>
  curry((fn, iterable) =>
    map(async value => {
      await fn(value)
      return value
    }, iterable),
  )

export const eachAsync = createAsyncEach(mapAsync)
export const eachConcur = createAsyncEach(mapConcur)

export const forEach = curry((fn, iterable) => {
  for (const value of iterable) {
    fn(value)
  }
})

export const forEachAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    await fn(value)
  }
})

export const forEachConcur = curry((fn, concurIterable) => concurIterable(fn))

const createConsume = forEach => iterable => forEach(() => {}, iterable)

export const consume = createConsume(forEach)
export const consumeAsync = createConsume(forEachAsync)
export const consumeConcur = createConsume(forEachConcur)
