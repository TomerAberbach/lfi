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

import { curry } from './shared/curry.js'

export const rangeUntil = curry((start, end) => {
  function* iterate(step) {
    if (start < end) {
      for (let i = start; i < end; i += step) {
        yield i
      }
    } else {
      for (let i = start; i > end; i -= step) {
        yield i
      }
    }
  }

  const iterable = iterate(1)
  iterable.step = step => iterate(Math.abs(step))

  return iterable
})

export const rangeTo = curry((start, end) =>
  rangeUntil(start, end + (start < end ? 1 : -1))
)
