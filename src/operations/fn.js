import { wrapFunction } from '../internal/helpers.js'

const curriedFunctions = new WeakSet()

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

export const pipe = (value, ...fns) => fns.reduce((acc, fn) => fn(acc), value)

export const compose =
  (...fns) =>
  value =>
    pipe(value, ...fns)
