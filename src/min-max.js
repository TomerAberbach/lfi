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

import { curry } from './curry.js'
import { reduce, reduceAsync, reduceConcur } from './fold.js'
import { identity } from './internal/identity.js'
import { map, mapAsync, mapConcur } from './map.js'

const createMinCompare = fn => (left, right) =>
  fn(left, right) <= 0 ? left : right
const createMaxCompare = fn => (left, right) =>
  fn(left, right) >= 0 ? left : right
const createAsyncMinCompare = fn => async (left, right) =>
  (await fn(left, right)) <= 0 ? left : right
const createAsyncMaxCompare = fn => async (left, right) =>
  (await fn(left, right)) >= 0 ? left : right

const minMaxSet = new WeakSet()
const asMinMax = value => {
  if (minMaxSet.has(value)) {
    return value
  }

  const minMax = { min: value, max: value }
  minMaxSet.add(minMax)
  return minMax
}

const createMinMaxCompare = fn => {
  const minCompare = createMinCompare(fn)
  const maxCompare = createMaxCompare(fn)

  return (left, right) => {
    const minMax = asMinMax(left)

    if (minMaxSet.has(right)) {
      minMax.min = minCompare(minMax.min, right.min)
      minMax.max = maxCompare(minMax.max, right.max)
    } else if (fn(right, minMax.min) < 0) {
      minMax.min = right
    } else if (fn(right, minMax.max) > 0) {
      minMax.max = right
    }

    return minMax
  }
}

const createAsyncMinMaxCompare = fn => {
  const minCompare = createAsyncMinCompare(fn)
  const maxCompare = createAsyncMaxCompare(fn)

  return async (left, right) => {
    const minMax = asMinMax(left)

    if (minMaxSet.has(right)) {
      ;[minMax.min, minMax.max] = await Promise.all([
        minCompare(minMax.min, right.min),
        maxCompare(minMax.max, right.max),
      ])
    } else if ((await fn(right, minMax.min)) < 0) {
      minMax.min = right
    } else if ((await fn(right, minMax.max)) > 0) {
      minMax.max = right
    }

    return minMax
  }
}

const ensureMinMax = value => {
  if (minMaxSet.has(value)) {
    minMaxSet.delete(value)
    return value
  }
  return { min: value, max: value }
}

const createReduceToMinMax = (map, reduce) => (fn, iterable) =>
  map(ensureMinMax, reduce(fn, iterable))
const reduceToMinMaxSync = createReduceToMinMax(map, reduce)
const reduceToMinMaxAsync = createReduceToMinMax(mapAsync, reduceAsync)
const reduceToMinMaxConcur = createReduceToMinMax(mapConcur, reduceConcur)

const createBy = curry((reduce, createCompare) =>
  curry((fn, iterable) => reduce(createCompare(fn), iterable)),
)

const createBySync = createBy(reduce)
export const minBy = createBySync(createMinCompare)
export const maxBy = createBySync(createMaxCompare)
export const minMaxBy = createBy(reduceToMinMaxSync, createMinMaxCompare)

const createByAsync = createBy(reduceAsync)
export const minByAsync = createByAsync(createAsyncMinCompare)
export const maxByAsync = createByAsync(createAsyncMaxCompare)
export const minMaxByAsync = createBy(
  reduceToMinMaxAsync,
  createAsyncMinMaxCompare,
)

const createByConcur = createBy(reduceConcur)
export const minByConcur = createByConcur(createAsyncMinCompare)
export const maxByConcur = createByConcur(createAsyncMaxCompare)
export const minMaxByConcur = createBy(
  reduceToMinMaxConcur,
  createAsyncMinMaxCompare,
)

const createWith = by =>
  curry((fn, iterable) => by((left, right) => fn(left) - fn(right), iterable))

export const minWith = createWith(minBy)
export const maxWith = createWith(maxBy)
export const minMaxWith = createWith(minMaxBy)

export const createAsyncWith = by =>
  curry((fn, iterable) =>
    by(async (left, right) => {
      const [x, y] = await Promise.all([fn(left), fn(right)])
      return x - y
    }, iterable),
  )

export const minWithAsync = createAsyncWith(minByAsync)
export const maxWithAsync = createAsyncWith(maxByAsync)
export const minMaxWithAsync = createAsyncWith(minMaxByAsync)

export const minWithConcur = createAsyncWith(minByConcur)
export const maxWithConcur = createAsyncWith(maxByConcur)
export const minMaxWithConcur = createAsyncWith(minMaxByConcur)

export const min = minWith(identity)
export const max = maxWith(identity)
export const minMax = minMaxWith(identity)

export const minAsync = minWithAsync(identity)
export const maxAsync = maxWithAsync(identity)
export const minMaxAsync = minMaxWithAsync(identity)

export const minConcur = minWithConcur(identity)
export const maxConcur = maxWithConcur(identity)
export const minMaxConcur = minMaxWithConcur(identity)
