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
  ({ _predicate, _message }) =>
  config =>
    Object.entries(config).every(
      ([name, value]) =>
        _predicate(name, value) ||
        error(`\`${name}\` must be ${_message}: ${value}`),
    )

export const error = message => {
  throw new Error(message)
}

export const assertInteger = createAssert({
  _predicate: (_, value) => Number.isSafeInteger(value),
  _message: `an integer`,
})

export const assertNonNegativeInteger = createAssert({
  _predicate: (name, value) => assertInteger({ [name]: value }) && value >= 0,
  _message: `a non-negative integer`,
})

export const assertPositiveInteger = createAssert({
  _predicate: (name, value) => assertInteger({ [name]: value }) && value > 0,
  _message: `a positive integer`,
})

export const assertPureIterable = createAssert({
  _predicate: (_, { _value: value, _symbol: symbol }) =>
    // eslint-disable-next-line no-self-compare
    value[symbol]() !== value[symbol](),
  _message: `a pure iterable`,
})
