import {
  canEval,
  createAsyncIterable,
  createIterable,
  identity,
  isPromise,
  thunk,
} from '../internal/helpers.js'

export { curry } from '../internal/helpers.js'

export const pipe = (value, ...fns) => {
  for (const fn of fns) {
    value = fn(value)
  }
  return value
}

export const compose = (...fns) => {
  switch (fns.length) {
    case 0:
      return identity
    case 1:
      return fns[0]
    case 2: {
      const [fn0, fn1] = fns
      return value => fn1(fn0(value))
    }
    case 3: {
      const [fn0, fn1, fn2] = fns
      return value => fn2(fn1(fn0(value)))
    }
    case 4: {
      const [fn0, fn1, fn2, fn3] = fns
      return value => fn3(fn2(fn1(fn0(value))))
    }
    case 5: {
      const [fn0, fn1, fn2, fn3, fn4] = fns
      return value => fn4(fn3(fn2(fn1(fn0(value)))))
    }
    case 6: {
      const [fn0, fn1, fn2, fn3, fn4, fn5] = fns
      return value => fn5(fn4(fn3(fn2(fn1(fn0(value))))))
    }
    default:
      return canEval
        ? // eslint-disable-next-line no-new-func
          new Function(
            ...fns.map((_, index) => `f${index}`),
            `return v=>${fns.reduce((acc, _, index) => `f${index}(${acc})`, `v`)}`,
          )(...fns)
        : value => pipe(value, ...fns)
  }
}

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
      const promises = []
      for (const value of iterable) {
        const result = safeApply(apply, value)
        if (isPromise(result)) {
          promises.push(result)
        }
      }
      return handlePromiseResults(await Promise.allSettled(promises))
    }
  }

  return async apply => {
    // NOTE: We can't use `Array.fromAsync(iterable, mapper)` here because we
    // don't want to await the result of `mapper` before moving onto the next
    // value in the iterable.
    const promises = []
    for await (const value of iterable) {
      const result = safeApply(apply, value)
      if (isPromise(result)) {
        promises.push(result)
      }
    }
    handlePromiseResults(await Promise.allSettled(promises))
  }
}

const safeApply = (apply, value) => {
  if (isPromise(value)) {
    return value.then(apply)
  }

  try {
    return apply(value)
  } catch (error) {
    return Promise.reject(error)
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
