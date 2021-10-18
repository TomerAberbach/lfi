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

const assert = predicate => (name, value) => {
  const output = predicate(name, value)

  if (output) {
    throw new Error(output)
  }
}

export const assertInteger = assert(
  (name, value) =>
    !Number.isSafeInteger(value) && `\`${name}\` must be an integer: ${value}`,
)

export const assertNonNegativeInteger = assert(
  (name, value) =>
    assertInteger(name, value) ||
    (value < 0 && `\`${name}\` must be a non-negative integer: ${value}`),
)

export const assertPositiveInteger = assert(
  (name, value) =>
    assertInteger(name, value) ||
    (value <= 0 && `\`${name}\` must be a positive integer: ${value}`),
)
