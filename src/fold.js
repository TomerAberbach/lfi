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

import { AsyncBetterator } from 'betterator'
import { curry } from './curry.js'
import { next, nextAsync } from './optional.js'
import { map, mapAsync } from './map.js'

export const fold = curry((fn, initial, iterable) => {
  let acc = initial

  for (const value of iterable) {
    acc = fn(acc, value)
  }

  return acc
})

export const foldAsync = curry(async (fn, initial, asyncIterable) => {
  const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)
  let acc = initial

  while (await asyncIterator.hasNext()) {
    const value = await asyncIterator.getNext()

    // Kick off the promise for the next value, but don't wait on it
    asyncIterator.hasNext()

    acc = await fn(acc, value)
  }

  return acc
})

const runPool = async (values, fn, concurIterable) => {
  const promises = []

  const process = async value => {
    let currentValue = value
    while (values.length > 0) {
      currentValue = await fn(values.pop(), currentValue)
    }

    values.push(currentValue)
  }

  await concurIterable(value => promises.push(process(value)))
  await Promise.all(promises)

  return values
}

export const foldConcur = curry(
  async (fn, initial, concurIterable) =>
    (await runPool([initial], fn, concurIterable))[0]
)

export const reduce = curry((fn, iterable) => ({
  *[Symbol.iterator]() {
    const [first, rest] = next(iterable)
    yield* map(initial => fold(fn, initial, rest), first)
  }
}))

export const reduceAsync = curry((fn, asyncIterable) => ({
  async *[Symbol.asyncIterator]() {
    const [first, rest] = await nextAsync(asyncIterable)
    yield* mapAsync(initial => foldAsync(fn, initial, rest), first)
  }
}))

export const reduceConcur = curry((fn, concurIterable) => async apply => {
  const values = await runPool([], fn, concurIterable)

  if (values.length > 0) {
    await apply(values[0])
  }
})
