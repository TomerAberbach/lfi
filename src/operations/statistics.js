/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { identity, thunk } from '../internal/helpers.js'
import { curry } from './fn.js'
import { reduce, reduceAsync, reduceConcur } from './reduce.js'
import { mapAsyncReducer, mapReducer, normalizeReducer } from './reducer.js'

export const toCount = thunk({ create: () => 0, add: acc => acc + 1 })
export const count = reduce(toCount())
export const countAsync = reduceAsync(toCount())
export const countConcur = reduceConcur(toCount())

export const toSum = thunk({
  create: () => 0,
  add: (acc, value) => acc + value,
})
export const sum = reduce(toSum())
export const sumAsync = reduceAsync(toSum())
export const sumConcur = reduceConcur(toSum())

const minMaxSet = new WeakSet()
const asMinMax = value => {
  if (minMaxSet.has(value)) {
    return value
  }

  const minMax = { _min: value, _max: value }
  minMaxSet.add(minMax)
  return minMax
}
const ensureMinMax = value =>
  minMaxSet.has(value)
    ? { min: value._min, max: value._max }
    : { min: value, max: value }

export const toMinBy = fn =>
  normalizeReducer((acc, value) => (fn(acc, value) <= 0 ? acc : value))
export const toMaxBy = fn =>
  normalizeReducer((acc, value) => (fn(acc, value) >= 0 ? acc : value))
export const toMinMaxBy = fn =>
  mapReducer(ensureMinMax, (acc, value) => {
    const minMax = asMinMax(acc)

    if (fn(value, minMax._min) < 0) {
      minMax._min = value
    } else if (fn(value, minMax._max) > 0) {
      minMax._max = value
    }

    return minMax
  })
export const toMinByAsync = fn =>
  normalizeReducer(async (acc, value) =>
    (await fn(acc, value)) <= 0 ? acc : value,
  )
export const toMaxByAsync = fn =>
  normalizeReducer(async (acc, value) =>
    (await fn(acc, value)) >= 0 ? acc : value,
  )
export const toMinMaxByAsync = fn => {
  const addMin = toMinByAsync(fn).add
  const addMax = toMaxByAsync(fn).add

  return mapAsyncReducer(ensureMinMax, async (acc, value) => {
    const minMax = asMinMax(acc)

    if (minMaxSet.has(value)) {
      ;[minMax._min, minMax._max] = await Promise.all([
        addMin(value._min, minMax._min),
        addMax(value._max, minMax._max),
      ])
    } else if ((await fn(value, minMax._min)) < 0) {
      minMax._min = value
    } else if ((await fn(value, minMax._max)) > 0) {
      minMax._max = value
    }

    return minMax
  })
}

const createToWith = toBy => fn => toBy((acc, value) => fn(acc) - fn(value))
export const toMinWith = createToWith(toMinBy)
export const toMaxWith = createToWith(toMaxBy)
export const toMinMaxWith = createToWith(toMinMaxBy)

const createToWithAsync = toByAsync => fn =>
  toByAsync(async (acc, value) => {
    const [accBy, valueBy] = await Promise.all([fn(acc), fn(value)])
    return accBy - valueBy
  })
export const toMinWithAsync = createToWithAsync(toMinByAsync)
export const toMaxWithAsync = createToWithAsync(toMaxByAsync)
export const toMinMaxWithAsync = createToWithAsync(toMinMaxByAsync)

export const toMin = thunk(toMinWith(identity))
export const toMax = thunk(toMaxWith(identity))
export const toMinMax = thunk(toMinMaxWith(identity))

const createReduce = (reduce, to) =>
  curry((fn, iterable) => reduce(to(fn), iterable))

export const minBy = createReduce(reduce, toMinBy)
export const maxBy = createReduce(reduce, toMaxBy)
export const minMaxBy = createReduce(reduce, toMinMaxBy)
export const minByAsync = createReduce(reduceAsync, toMinByAsync)
export const maxByAsync = createReduce(reduceAsync, toMaxByAsync)
export const minMaxByAsync = createReduce(reduceAsync, toMinMaxByAsync)
export const minByConcur = createReduce(reduceConcur, toMinByAsync)
export const maxByConcur = createReduce(reduceConcur, toMaxByAsync)
export const minMaxByConcur = createReduce(reduceConcur, toMinMaxByAsync)

export const minWith = createReduce(reduce, toMinWith)
export const maxWith = createReduce(reduce, toMaxWith)
export const minMaxWith = createReduce(reduce, toMinMaxWith)
export const minWithAsync = createReduce(reduceAsync, toMinWithAsync)
export const maxWithAsync = createReduce(reduceAsync, toMaxWithAsync)
export const minMaxWithAsync = createReduce(reduceAsync, toMinMaxWithAsync)
export const minWithConcur = createReduce(reduceConcur, toMinWithAsync)
export const maxWithConcur = createReduce(reduceConcur, toMaxWithAsync)
export const minMaxWithConcur = createReduce(reduceConcur, toMinMaxWithAsync)

export const min = minWith(identity)
export const max = maxWith(identity)
export const minMax = minMaxWith(identity)
export const minAsync = minWithAsync(identity)
export const maxAsync = maxWithAsync(identity)
export const minMaxAsync = minMaxWithAsync(identity)
export const minConcur = minWithConcur(identity)
export const maxConcur = maxWithConcur(identity)
export const minMaxConcur = minMaxWithConcur(identity)
