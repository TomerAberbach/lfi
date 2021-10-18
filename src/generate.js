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

import { AsyncBetterator, Betterator } from 'betterator'
import { curry } from './curry.js'

export const generate = curry((fn, seed) => ({
  *[Symbol.iterator]() {
    let value = seed

    while (value != null) {
      yield value
      value = fn(value)
    }
  },
}))

export const generateAsync = curry((fn, seed) => ({
  async *[Symbol.asyncIterator]() {
    let value = seed

    while (value != null) {
      yield value
      value = await fn(value)
    }
  },
}))

export const repeat = value => ({
  *[Symbol.iterator]() {
    while (true) {
      yield value
    }
  },
})

export const cycle = iterable => ({
  *[Symbol.iterator]() {
    const values = []

    const iterator = Betterator.fromIterable(iterable)
    while (iterator.hasNext()) {
      const value = iterator.getNext()
      values.push(value)
      yield value
    }

    if (values.length === 0) {
      return
    }

    while (true) {
      yield* values
    }
  },
})

export const cycleAsync = asyncIterable => ({
  async *[Symbol.asyncIterator]() {
    const values = []

    const asyncIterator = AsyncBetterator.fromAsyncIterable(asyncIterable)
    while (await asyncIterator.hasNext()) {
      const value = await asyncIterator.getNext()
      values.push(value)
      yield value
    }

    if (values.length === 0) {
      return
    }

    while (true) {
      yield* values
    }
  },
})
