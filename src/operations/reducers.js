import {
  concurIteratorSymbol,
  createAsyncIterable,
  createConcurIterable,
  createIterable,
  curry,
  identity,
} from '../internal/helpers.js'
import { asConcur } from './core.js'
import { next } from './optionals.js'
import { map } from './transforms.js'

export const mapReducer = curry((fn, reducer) => {
  const { finish, ...restReducer } = normalizeReducer(reducer)
  return { ...restReducer, finish: value => fn(finish(value)) }
})

export const mapAsyncReducer = curry((fn, asyncReducer) => {
  const { finish, ...restAsyncReducer } = normalizeReducer(asyncReducer)
  return { ...restAsyncReducer, finish: async value => fn(await finish(value)) }
})

export const normalizeReducer = reducer => {
  const normalizedReducer = { finish: identity }
  if (typeof reducer === `function`) {
    normalizedReducer.add = reducer
    return normalizedReducer
  }

  for (const methodName of REDUCER_METHOD_NAMES) {
    const method = reducer[methodName]
    if (method) {
      normalizedReducer[methodName] = method.bind(reducer)
    }
  }

  return normalizedReducer
}

const REDUCER_METHOD_NAMES = [`create`, `add`, `get`, `finish`, `combine`]

export const NO_ENTRY = {}

export const reduce = curry((reducer, iterable) => {
  const { create, add, finish } = normalizeReducer(reducer)
  if (create) {
    return reduceInternal(create(), add, finish, iterable)
  }

  return createIterable(function* () {
    const [first, rest] = next(iterable)
    yield* map(value => reduceInternal(value, add, finish, rest), first)
  })
})

const reduceInternal = (acc, add, finish, iterable) => {
  for (const value of iterable) {
    acc = add(acc, value)
  }

  return finish(acc)
}

export const reduceAsync = curry((asyncReducer, asyncIterable) => {
  const { create, add, combine, finish } = normalizeReducer(asyncReducer)
  const concurIterable = asConcur(asyncIterable)
  if (!create) {
    return createAsyncIterable(async function* () {
      yield* await reduceConcurWithoutCreate(add, finish, concurIterable)
    })
  }
  if (!combine) {
    return reduceConcurWithCreateWithoutCombine(
      create,
      add,
      finish,
      concurIterable,
    )
  }
  return reduceConcurWithCreateWithCombine(
    create,
    add,
    combine,
    finish,
    concurIterable,
  )
})

export const reduceConcur = curry((asyncReducer, concurIterable) => {
  const { create, add, combine, finish } = normalizeReducer(asyncReducer)
  if (!create) {
    return createConcurIterable(async apply => {
      const accs = await reduceConcurWithoutCreate(add, finish, concurIterable)
      if (accs.length) {
        await apply(accs[0])
      }
    })
  }
  if (!combine) {
    return reduceConcurWithCreateWithoutCombine(
      create,
      add,
      finish,
      concurIterable,
    )
  }
  return reduceConcurWithCreateWithCombine(
    create,
    add,
    combine,
    finish,
    concurIterable,
  )
})

const reduceConcurWithoutCreate = async (add, finish, concurIterable) => {
  const accs = []

  await concurIterable[concurIteratorSymbol](async acc => {
    while (accs.length) {
      acc = await add(acc, accs.pop())
    }

    accs.push(acc)
  })

  return accs.length ? [await finish(accs[0])] : accs
}

const reduceConcurWithCreateWithCombine = async (
  create,
  add,
  combine,
  finish,
  concurIterable,
) => {
  const accs = [create()]

  await concurIterable[concurIteratorSymbol](async value => {
    let acc = await add(await (accs.length ? accs.pop() : create()), value)

    while (accs.length) {
      acc = await combine(acc, accs.pop())
    }

    accs.push(acc)
  })

  return finish(await accs[0])
}

const reduceConcurWithCreateWithoutCombine = async (
  create,
  add,
  finish,
  concurIterable,
) => {
  let accPromise = Promise.resolve(create())
  await concurIterable[concurIteratorSymbol](value => {
    accPromise = accPromise.then(acc => add(acc, value))
  })
  return finish(await accPromise)
}
