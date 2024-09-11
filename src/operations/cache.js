import { createAsyncIterable, createIterable } from '../internal/helpers.js'
import { asConcur } from './as.js'

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

  return async apply => {
    if (!isResolved) {
      applys.push(apply)

      if (!promise) {
        promise = concurIterable(async value => {
          cache.push(value)
          await asConcur(applys)(apply => apply(value))
        }).then(() => (isResolved = true))
      }
    }

    await Promise.all([asConcur(cache)(apply), promise])
  }
}
