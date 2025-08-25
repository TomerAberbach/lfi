export const identity = value => value

export const thunk = value => () => value

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

export const curry = fn => {
  if (fn.length <= 1 || curriedFunctions.has(fn)) {
    return fn
  }

  const curried = wrapFunction(fn, (...args) =>
    args.length < fn.length ? curry(fn.bind(null, ...args)) : fn(...args),
  )
  curriedFunctions.add(curried)

  return curried
}

const wrapFunction = (previousFn, newFn) =>
  Object.defineProperties(newFn, {
    length: { value: previousFn.length },
    name: { value: previousFn.name },
  })

const curriedFunctions = new WeakSet()
