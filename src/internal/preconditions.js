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

const createAssert =
  ({ predicate, message }) =>
  (name, value) => {
    if (!predicate(name, value)) {
      throw new Error(`${message(name)}: ${value}`)
    }

    return true
  }

export const assertInteger = createAssert({
  predicate: (_, value) => Number.isSafeInteger(value),
  message: name => `\`${name}\` must be an integer`,
})

export const assertNonNegativeInteger = createAssert({
  predicate: (name, value) => assertInteger(name, value) && value >= 0,
  message: name => `\`${name}\` must be a non-negative integer`,
})

export const assertPositiveInteger = createAssert({
  predicate: (name, value) => assertInteger(name, value) && value > 0,
  message: name => `\`${name}\` must be a positive integer`,
})
