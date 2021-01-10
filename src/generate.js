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

export const generate = curry(fn => generateWithSeed(fn, fn()))

export const generateAsync = curry(async fn => generateWithSeed(fn, await fn()))

export const generateWithSeed = curry(function* (fn, seed) {
  let value = seed

  while (value != null) {
    yield value
    value = fn(value)
  }
})

export const generateWithSeedAsync = curry(async function* (fn, seed) {
  let value = seed

  while (value != null) {
    yield value
    value = await fn(value)
  }
})

export const cycle = curry(function* (iterable) {
  while (true) {
    yield* iterable
  }
})

export const cycleAsync = curry(async function* (iterable) {
  while (true) {
    yield* iterable
  }
})

export const repeat = curry(function* (value) {
  while (true) {
    yield value
  }
})

export const repeatAsync = curry(async function* (value) {
  while (true) {
    yield value
  }
})
