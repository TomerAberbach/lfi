import {
  concurIteratorSymbol,
  createAsyncIterable,
  createConcurIterable,
  createIterable,
  curry,
  noop,
} from '../internal/helpers.js'
import { asConcur } from './core.js'
import { map, mapAsync, mapConcur } from './transforms.js'

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

export const forEachConcur = curry((fn, concurIterable) =>
  concurIterable[concurIteratorSymbol](fn),
)

const createConsume = forEach => iterable => forEach(noop, iterable)

export const consume = createConsume(forEach)
export const consumeAsync = createConsume(forEachAsync)
export const consumeConcur = createConsume(forEachConcur)

export const cache = iterable => {
  const cache = []
  const iterator = iterable[Symbol.iterator]()

  return createIterable(function* () {
    let index = 0

    while (true) {
      if (index < cache.length) {
        yield cache[index++]
        continue
      }

      const { value, done } = iterator.next()
      if (done) {
        break
      }

      cache.push(value)
      index++
      yield value
    }
  })
}

export const cacheAsync = asyncIterable => {
  const cache = []
  const asyncIterator = asyncIterable[Symbol.asyncIterator]()

  return createAsyncIterable(async function* () {
    let index = 0

    while (true) {
      if (index < cache.length) {
        yield cache[index++]
        continue
      }

      const { value, done } = await asyncIterator.next()
      if (done) {
        break
      }

      cache.push(value)
      index++
      yield value
    }
  })
}

export const cacheConcur = concurIterable => {
  let promise
  const cache = []
  const applys = []
  let isResolved = false

  return createConcurIterable(async apply => {
    if (!isResolved) {
      applys.push(apply)

      if (!promise) {
        promise = concurIterable[concurIteratorSymbol](
          async (value, indices) => {
            cache.push([value, indices])
            await asConcur(applys)[concurIteratorSymbol](apply =>
              apply(value, indices),
            )
          },
        ).then(() => (isResolved = true))
      }
    }

    await Promise.all([
      asConcur(cache)[concurIteratorSymbol](([value, indices]) =>
        apply(value, indices),
      ),
      promise,
    ])
  })
}
