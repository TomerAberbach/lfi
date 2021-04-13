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
import {
  assertInteger,
  assertPositiveInteger
} from './internal/preconditions.js'

const exclusiveRangeIterable = (start, end, step) =>
  start < end
    ? {
        *[Symbol.iterator]() {
          for (let i = start; i < end; i += step) {
            yield i
          }
        }
      }
    : {
        *[Symbol.iterator]() {
          for (let i = start; i > end; i -= step) {
            yield i
          }
        }
      }

const inclusiveRangeIterable = (start, end, step) =>
  start < end
    ? {
        *[Symbol.iterator]() {
          for (let i = start; i <= end; i += step) {
            yield i
          }
        }
      }
    : {
        *[Symbol.iterator]() {
          for (let i = start; i >= end; i -= step) {
            yield i
          }
        }
      }

const createRange = createRangeIterable =>
  curry((start, end) => {
    assertInteger(`start`, start)
    assertInteger(`end`, end)

    const iterable = createRangeIterable(start, end, 1)
    iterable.step = step => {
      assertPositiveInteger(`step`, step)
      return createRangeIterable(start, end, step)
    }

    return iterable
  })

export const rangeUntil = createRange(exclusiveRangeIterable)
export const rangeTo = createRange(inclusiveRangeIterable)
