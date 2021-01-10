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

import { AsyncIterator, Iterator } from './iterator.js'
import { curry } from './curry.js'
import { forEachConcur } from './each.js'

export const fold = curry((fn, acc, iterable) => {
  for (const value of iterable) {
    acc = fn(acc, value)
  }

  return acc
})

export const foldAsync = curry(async (fn, acc, iterable) => {
  for await (const value of iterable) {
    acc = await fn(acc, value)
  }

  return acc
})

export const foldConcur = curry(async (fn, acc, iterable) => {
  acc = Promise.resolve(acc)

  await forEachConcur(
    value => (acc = acc.then(inner => fn(inner, value))),
    iterable
  )

  return acc
})

export const reduce = curry(function* (fn, iterable) {
  const iterator = Iterator.fromIterable(iterable)

  if (!iterator.hasNext()) {
    return
  }

  let acc = iterator.getNext()

  while (iterator.hasNext()) {
    acc = fn(acc, iterator.getNext())
  }

  yield acc
})

export const reduceAsync = curry(async function* (fn, iterable) {
  const iterator = AsyncIterator.fromAsyncIterable(iterable)

  if (!(await iterator.hasNext())) {
    return
  }

  let acc = await iterator.getNext()

  while (await iterator.hasNext()) {
    acc = await fn(acc, await iterator.getNext())
  }

  yield acc
})

export const reduceConcur = curry(async (fn, iterable) => {
  const acc = []

  await forEachConcur(value => {
    if (acc.length === 0) {
      acc.push(Promise.resolve(value))
    } else {
      acc[0] = acc[0].then(inner => fn(inner, value))
    }
  }, iterable)

  return acc
})
