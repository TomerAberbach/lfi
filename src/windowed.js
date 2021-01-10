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

import { Iterator } from './iterator.js'
import { curry } from './curry.js'

export const windowed = curry(function* (size, iterable) {
  const iterator = Iterator.fromIterable(iterable)
  const window = []

  for (let i = 0; i < size - 1; i++) {
    if (!iterator.hasNext()) {
      return
    }

    window.push(iterator.getNext())
  }

  let start = 0
  while (iterator.hasNext()) {
    window[(start + size - 1) % size] = iterator.getNext()

    const currentWindow = []
    for (let i = 0; i < size; i++) {
      currentWindow.push(window[(start + i) % size])
    }

    yield currentWindow
    start = (start + 1) % size
  }
})
