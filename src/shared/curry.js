import { functionWithLength } from './function-with-length.js'

const curriedFunctions = new WeakSet()

export const curry = fn => {
  if (fn.length <= 0) {
    return fn
  }

  if (curriedFunctions.has(fn)) {
    return fn
  }

  const curried = functionWithLength(
    (...args) =>
      args.length < fn.length ? curry(fn.bind(null, ...args)) : fn(...args),
    fn.length
  )
  curriedFunctions.add(curried)

  return curried
}
