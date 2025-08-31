export const canEval = (() => {
  try {
    // eslint-disable-next-line no-eval, stylistic/quotes
    eval('')
    return true
    /* c8 ignore start */
  } catch {
    return false
  }
  /* c8 ignore end */
})()

export const identity = value => value

export const thunk = value => () => value

export const createIterable = fn => ({ [Symbol.iterator]: fn })

export const mapIterable = (iterable, fn) =>
  createIterable(() => ({ next: fn(iterable[Symbol.iterator]()) }))

export const createAsyncIterable = fn => ({ [Symbol.asyncIterator]: fn })

export const isPromise = value =>
  Boolean(value && typeof value.then === `function`)

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
