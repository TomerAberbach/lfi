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

export const toArray = {
  create: () => [],
  add(acc, value) {
    acc.push(value)
    return acc
  }
}

const setAdd = (acc, value) => acc.add(value)
export const toSet = { create: () => new Set(), add: setAdd }
export const toWeakSet = { create: () => new WeakSet(), add: setAdd }

export const toObject = {
  create: () => ({}),
  add: (acc, [key, value]) =>
    Object.defineProperty(acc, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value
    }),
  has: (acc, key) => Object.prototype.hasOwnProperty.call(acc, key),
  get: (acc, key) => acc[key]
}

const mapAddHasGet = {
  add: (acc, [key, value]) => acc.set(key, value),
  has: (acc, key) => acc.has(key),
  get: (acc, key) => acc.get(key)
}
export const toMap = { create: () => new Map(), ...mapAddHasGet }
export const toWeakMap = { create: () => new WeakMap(), ...mapAddHasGet }

export const folding = curry((lift, merge, { create, add, has, get }) => ({
  create,
  add: (acc, [key, value]) =>
    add(acc, [key, has(acc, key) ? merge(get(acc, key), value) : lift(value)])
}))

export const counting = folding(
  () => 1,
  acc => acc + 1
)

export const grouping = curry(({ create, add }, mapCollector) =>
  folding(value => add(create(), value), add, mapCollector)
)

export const collect = curry(({ add, create }, iterable) => {
  const acc = create()

  for (const value of iterable) {
    add(acc, value)
  }

  return acc
})

export const collectAsync = curry(async ({ add, create }, asyncIterable) => {
  const acc = create()

  for await (const value of asyncIterable) {
    add(acc, value)
  }

  return acc
})

export const collectConcur = curry(async ({ add, create }, concurIterable) => {
  const acc = create()
  await concurIterable(value => {
    add(acc, value)
  })
  return acc
})
