export const identity = value => value

export const thunk = value => () => value

export const wrapFunction = (previousFn, newFn) =>
  Object.defineProperties(newFn, {
    length: { value: previousFn.length },
    name: { value: previousFn.name },
  })

export const createIterable = fn => ({ [Symbol.iterator]: fn })

export const createAsyncIterable = fn => ({ [Symbol.asyncIterator]: fn })

export const promiseWithEarlyResolve = fn => {
  const { _promise: promise, _resolve: resolve } = deferred()
  return Promise.race([promise, fn(resolve)])
}

export const deferred = () => {
  let resolve
  return {
    _promise: new Promise(r => {
      resolve = r
    }),
    _resolve: resolve,
  }
}

export const isPromise = value =>
  Boolean(value && typeof value.then === `function`)
