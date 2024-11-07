import { curry, promiseWithEarlyResolve } from '../internal/helpers.js'

export const all = curry((fn, iterable) => {
  for (const value of iterable) {
    if (!fn(value)) {
      return false
    }
  }

  return true
})

export const allAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    if (!(await fn(value))) {
      return false
    }
  }

  return true
})

export const allConcur = curry((fn, concurIterable) =>
  promiseWithEarlyResolve(async resolve => {
    let resolved = false
    await concurIterable(async value => {
      if (!resolved && !(await fn(value)) && !resolved) {
        resolved = true
        resolve(false)
      }
    })
    return true
  }),
)

export const any = curry((fn, iterable) => {
  for (const value of iterable) {
    if (fn(value)) {
      return true
    }
  }

  return false
})

export const anyAsync = curry(async (fn, asyncIterable) => {
  for await (const value of asyncIterable) {
    if (await fn(value)) {
      return true
    }
  }

  return false
})

export const anyConcur = curry((fn, concurIterable) =>
  promiseWithEarlyResolve(async resolve => {
    let resolved = false
    await concurIterable(async value => {
      if (!resolved && (await fn(value)) && !resolved) {
        resolved = true
        resolve(true)
      }
    })
    return false
  }),
)

export const none = curry((fn, iterable) => !any(fn, iterable))

const createAsyncNone = any =>
  curry(async (fn, iterable) => !(await any(fn, iterable)))

export const noneAsync = createAsyncNone(anyAsync)
export const noneConcur = createAsyncNone(anyConcur)

const createIncludes = any =>
  curry((searchElement, iterable) =>
    any(value => Object.is(value, searchElement), iterable),
  )

export const includes = createIncludes(any)
export const includesAsync = createIncludes(anyAsync)
export const includesConcur = createIncludes(anyConcur)
