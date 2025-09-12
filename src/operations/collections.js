import { curry, noop, thunk } from '../internal/helpers.js'
import {
  NO_ENTRY,
  normalizeReducer,
  reduce,
  reduceAsync,
  reduceConcur,
} from './reducers.js'
import { map } from './transforms.js'

export const toArray = thunk(
  normalizeReducer({
    create: () => [],
    add: (acc, value) => {
      acc.push(value)
      return acc
    },
  }),
)

const setAdd = (acc, value) => acc.add(value)
export const toSet = thunk(
  normalizeReducer({ create: () => new Set(), add: setAdd }),
)
export const toWeakSet = thunk(
  normalizeReducer({ create: () => new WeakSet(), add: setAdd }),
)

export const toObject = thunk(
  normalizeReducer({
    create: () => ({}),
    add: (acc, [key, value]) =>
      Object.defineProperty(acc, key, {
        configurable: true,
        enumerable: true,
        writable: true,
        value,
      }),
    get: (acc, key) => (hasOwn.call(acc, key) ? acc[key] : NO_ENTRY),
  }),
)
const hasOwn = {}.hasOwnProperty

const mapAddGet = {
  add: (acc, [key, value]) => acc.set(key, value),
  get: (acc, key) => (acc.has(key) ? acc.get(key) : NO_ENTRY),
}
export const toMap = thunk(
  normalizeReducer({ create: () => new Map(), ...mapAddGet }),
)
export const toWeakMap = thunk(
  normalizeReducer({ create: () => new WeakMap(), ...mapAddGet }),
)

export const toGrouped = curry((innerReducer, outerReducer) => {
  const {
    create: createInner,
    add: addInner,
    finish: finishInner,
  } = normalizeReducer(innerReducer)
  const {
    create: createOuter,
    add: addOuter,
    get: getOuter,
  } = normalizeReducer(outerReducer)

  return {
    create: () => ({ _acc: createOuter(), _keys: [] }),
    add: (acc, [key, value]) => {
      let group = getOuter(acc._acc, key)
      if (group === NO_ENTRY) {
        group = createInner ? addInner(createInner(), value) : value
        acc._keys.push(key)
      } else {
        group = addInner(group, value)
      }

      acc._acc = addOuter(acc._acc, [key, group])
      return acc
    },
    finish: ({ _acc, _keys }) =>
      _keys.reduce(
        (acc, key) => addOuter(acc, [key, finishInner(getOuter(acc, key))]),
        _acc,
      ),
  }
})

export const toMultiple = reducers => {
  const mapReducers = Array.isArray(reducers)
    ? fn =>
        reduce(
          toArray(),
          map(([, reducer]) => fn(reducer), reducers),
        )
    : fn =>
        reduce(
          toObject(),
          map(([key, reducer]) => [key, fn(reducer)], reducers),
        )
  reducers = Object.entries(reducers).map(([key, reducer]) => [
    key,
    normalizeReducer(reducer),
  ])

  const applyReducers = (acc, fn) => {
    for (const [key, reducer] of reducers) {
      acc[key] = fn(acc[key], reducer)
    }
    return acc
  }

  const add = (acc, value) =>
    applyReducers(acc, (acc, { add }) => add(acc, value))
  const finish = acc => applyReducers(acc, (acc, { finish }) => finish(acc))
  if (reducers.every(([, { create }]) => create)) {
    return {
      create: () => mapReducers(({ create }) => create()),
      add,
      finish,
    }
  }

  return {
    add: (acc, value) => add(asMultiple(acc, mapReducers), value),
    finish: acc => {
      acc = finish(asMultiple(acc, mapReducers))
      multipleSet.delete(acc)
      return acc
    },
  }
}

const multipleSet = new WeakSet()
const asMultiple = (value, mapReducers) => {
  if (multipleSet.has(value)) {
    return value
  }

  const multiple = mapReducers(({ create, add }) =>
    create ? add(create(), value) : value,
  )
  multipleSet.add(multiple)
  return multiple
}

export const toJoin = separator => ({
  create: noop,
  add: (acc, value) =>
    acc === undefined ? String(value) : String(acc) + separator + String(value),
  finish: acc => acc ?? ``,
})

const createJoin = reduce =>
  curry((separator, iterable) => reduce(toJoin(separator), iterable))

export const join = createJoin(reduce)
export const joinAsync = createJoin(reduceAsync)
export const joinConcur = createJoin(reduceConcur)
