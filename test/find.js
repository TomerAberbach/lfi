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

import test from 'ava'
import { find, findLast } from '../src/index.js'

test(`find concrete example 1`, t => {
  const values = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = [...find(value => typeof value === `string`, values)]

  t.deepEqual(found, [`wow`])
})

test(`find concrete example 2`, t => {
  const values = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = [...find(value => typeof value === `function`, values)]

  t.deepEqual(found, [])
})

test(`findLast concrete example 1`, t => {
  const values = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = [...findLast(value => typeof value === `string`, values)]

  t.deepEqual(found, [`howdy`])
})

test(`findLast concrete example 2`, t => {
  const values = [5, `wow`, `howdy`, [1, 2, 3]]

  const found = [...findLast(value => typeof value === `function`, values)]

  t.deepEqual(found, [])
})
