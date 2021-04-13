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

const result = Object.freeze({ done: true })

const iterator = Object.freeze({
  next: () => result
})

export const empty = Object.freeze({ [Symbol.iterator]: () => iterator })

const asyncIterator = Object.freeze({
  next: () => Promise.resolve(result)
})

export const emptyAsync = Object.freeze({
  [Symbol.asyncIterator]: () => asyncIterator
})

export const emptyConcur = () => Promise.resolve()
