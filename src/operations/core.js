import {
  canEval,
  compareIndices,
  concurIteratorSymbol,
  createAsyncIterable,
  createConcurIterable,
  createIterable,
  identity,
  isThenable,
  noop,
  thenableThen,
  thunk,
} from '../internal/helpers.js'

export { concurIteratorSymbol, curry } from '../internal/helpers.js'

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

export const asAsync = (iterable, options) => {
  if (iterable[Symbol.asyncIterator]) {
    return iterable
  }

  if (iterable[Symbol.iterator]) {
    return asAsyncFromSync(iterable)
  }

  return asAsyncFromConcur(iterable, options)
}

const asAsyncFromSync = iterable =>
  // We write this instead of `() => iterable[Symbol.iterator]()` so that we
  // handle the case of the iterable containing promises, each of which should
  // be awaited, and so that we are compliant with the async iteration protocol,
  // which requires returning a promise.
  createAsyncIterable(() => {
    const iterator = iterable[Symbol.iterator]()
    return {
      // This logic could be written more simply, but minimizing how often
      // we use `await` results in more performant iteration.
      next: () => {
        const result = iterator.next()
        return result.done
          ? Promise.resolve(result)
          : thenableThen(result.value, value => ({ value }))
      },
    }
  })

const asAsyncFromConcur = (concurIterable, { backpressureStrategy } = {}) =>
  createAsyncIterable(() => {
    // TODO: Use a queue here.
    const buffer = []
    let done = false
    let bufferResolvers
    let deferredError

    const { bufferLimit, handleOverflow } =
      normalizeBackpressureStrategy(backpressureStrategy)
    concurIterable[concurIteratorSymbol](value => {
      if (deferredError) {
        return
      }

      if (buffer.length < bufferLimit) {
        buffer.push(value)
      } else {
        try {
          handleOverflow(buffer, value)
        } catch (error) {
          deferredError = error
        }
      }

      if (bufferResolvers) {
        const resolvers = bufferResolvers
        bufferResolvers = undefined
        resolvers.resolve()
      }
    })
      .then(() => {
        done = true
        bufferResolvers?.resolve()
      })
      .catch(error => {
        deferredError = error
        bufferResolvers?.resolve()
      })

    const nextResult = () => {
      if (buffer.length) {
        return { value: buffer.shift() }
      }

      if (deferredError) {
        throw deferredError
      }

      if (done) {
        return { done }
      }

      return null
    }

    return {
      next: async () => {
        const result = nextResult()
        if (result) {
          return result
        }

        bufferResolvers = Promise.withResolvers()
        await bufferResolvers.promise

        return nextResult()
      },
    }
  })

const normalizeBackpressureStrategy = (strategy = {}) => {
  const { bufferLimit = Infinity, overflowStrategy = `error` } = strategy
  let handleOverflow
  switch (overflowStrategy) {
    case `drop-first`:
      handleOverflow = (buffer, value) => {
        buffer.shift()
        buffer.push(value)
      }
      break
    case `drop-last`:
      handleOverflow = noop
      break
    case `error`:
      handleOverflow = () => {
        throw new Error(`Buffer limit exceeded`)
      }
      break
  }

  return { bufferLimit, handleOverflow }
}

export const asConcur = iterable => {
  if (iterable[concurIteratorSymbol]) {
    return iterable
  }

  if (iterable[Symbol.iterator]) {
    return createConcurIterable(async apply => {
      const promises = []
      let index = 0
      for (const value of iterable) {
        const result = safeApply(apply, value, [index++])
        if (isThenable(result)) {
          promises.push(result)
        }
      }
      return handlePromiseResults(await Promise.allSettled(promises))
    })
  }

  return createConcurIterable(async apply => {
    // NOTE: We can't use `Array.fromAsync(iterable, mapper)` here because we
    // don't want to await the result of `mapper` before moving onto the next
    // value in the iterable.
    const promises = []
    let index = 0
    for await (const value of iterable) {
      const result = safeApply(apply, value, [index++])
      if (isThenable(result)) {
        promises.push(result)
      }
    }
    handlePromiseResults(await Promise.allSettled(promises))
  })
}

const safeApply = (apply, value, indices) => {
  if (isThenable(value)) {
    return value.then(value => apply(value, indices))
  }

  try {
    return apply(value, indices)
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

export const orderedConcur = concurIterable =>
  createConcurIterable(async apply => {
    const values = []
    await concurIterable[concurIteratorSymbol]((value, indices) => {
      values.push([value, indices])
    })
    await asConcur(
      values.sort(([, indices1], [, indices2]) =>
        compareIndices(indices1, indices2),
      ),
    )[concurIteratorSymbol](([value, indices]) => apply(value, indices))
  })

const result = { done: true }
const iterator = { next: () => result }
const asyncIterator = { next: () => Promise.resolve(result) }

export const empty = thunk(createIterable(() => iterator))
export const emptyAsync = thunk(createAsyncIterable(() => asyncIterator))
export const emptyConcur = thunk(createConcurIterable(noop))

export const opaque = iterable =>
  createIterable(() => iterable[Symbol.iterator]())
export const opaqueAsync = asyncIterable =>
  createAsyncIterable(() => asyncIterable[Symbol.asyncIterator]())
export const opaqueConcur = concurIterable =>
  createConcurIterable(apply => concurIterable[concurIteratorSymbol](apply))
