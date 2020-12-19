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

export const partitions = curry(function* (array) {
  if (array.length === 0) {
    yield []
    return
  }

  for (let i = 0; i < array.length; i++) {
    const start = array.slice(0, i + 1)
    const end = array.slice(i + 1)

    for (const partition of partitions(end)) {
      yield [start].concat(partition)
    }
  }
})
