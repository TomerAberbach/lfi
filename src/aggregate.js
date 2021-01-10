/**
 * Copyright 2020 Google LLC
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
import { forEachConcur } from './each.js'
import {
  fold,
  foldAsync,
  foldConcur,
  reduce,
  reduceAsync,
  reduceConcur
} from './fold.js'

const countFn = acc => acc + 1
export const count = fold(countFn, 0)
export const countAsync = foldAsync(countFn, 0)
export const countConcur = foldConcur(countFn, 0)

const sumFn = (acc, value) => acc + value
export const sum = fold(sumFn, 0)
export const sumAsync = foldAsync(sumFn, 0)
export const sumConcur = foldConcur(sumFn, 0)

export const mean = curry(iterable => {
  let acc = 0
  let n = 0

  for (const value of iterable) {
    acc += value
    n++
  }

  return n > 0 ? acc / n : 0
})

export const meanAsync = curry(async iterable => {
  let acc = 0
  let n = 0

  for await (const value of iterable) {
    acc += value
    n++
  }

  return n > 0 ? acc / n : 0
})

export const meanConcur = curry(async iterable => {
  let acc = 0
  let n = 0

  await forEachConcur(value => {
    acc += value
    n++
  }, iterable)

  return n > 0 ? acc / n : 0
})

export const maxBy = curry((fn, iterable) =>
  reduce((max, value) => (fn(max, value) <= 0 ? value : max), iterable)
)

export const maxByAsync = curry((fn, iterable) =>
  reduceAsync(
    async (max, value) => ((await fn(max, value)) <= 0 ? value : max),
    iterable
  )
)

export const maxByConcur = curry((fn, iterable) =>
  reduceConcur(
    async (max, value) => ((await fn(max, value)) <= 0 ? value : max),
    iterable
  )
)

export const maxWith = curry((fn, iterable) =>
  maxBy((a, b) => fn(a) - fn(b), iterable)
)

export const maxWithAsync = curry((fn, iterable) =>
  maxByAsync(async (a, b) => {
    const [x, y] = await Promise.all([fn(a), fn(b)])
    return x - y
  }, iterable)
)

export const maxWithConcur = curry((fn, iterable) =>
  maxByConcur(async (a, b) => {
    const [x, y] = await Promise.all([fn(a), fn(b)])
    return x - y
  }, iterable)
)

export const max = maxWith(value => value)

export const maxAsync = maxWithAsync(value => value)

export const maxConcur = maxWithConcur(value => value)

export const minBy = curry((fn, iterable) =>
  maxBy((a, b) => -fn(a, b), iterable)
)

export const minByAsync = curry((fn, iterable) =>
  maxByAsync(async (a, b) => -(await fn(a, b)), iterable)
)

export const minByConcur = curry((fn, iterable) =>
  maxByConcur(async (a, b) => -(await fn(a, b)), iterable)
)

export const minWith = curry((fn, iterable) =>
  minBy((a, b) => fn(a) - fn(b), iterable)
)

export const minWithAsync = curry((fn, iterable) =>
  minByAsync(async (a, b) => {
    const [x, y] = await Promise.all([fn(a), fn(b)])
    return x - y
  }, iterable)
)

export const minWithConcur = curry((fn, iterable) =>
  minByConcur(async (a, b) => {
    const [x, y] = await Promise.all([fn(a), fn(b)])
    return x - y
  }, iterable)
)

export const min = minWith(value => value)

export const minAsync = minWithAsync(value => value)

export const minConcur = minWithConcur(value => value)
