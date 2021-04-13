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

import { empty, emptyAsync, emptyConcur } from '../src/empty.js'
import { count, countAsync, countConcur } from '../src/count.js'
import { test } from './helpers/macros.js'

test(`the empty iterable is empty`, t => {
  const length = count(empty)

  t.is(length, 0)
})

test(`the emptyAsync iterable is empty`, async t => {
  const length = await countAsync(emptyAsync)

  t.is(length, 0)
})

test(`the emptyConcur iterable is empty`, async t => {
  const length = await countConcur(emptyConcur)

  t.is(length, 0)
})
