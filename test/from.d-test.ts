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

import { expectType } from 'tsd'
import { keys, values, entries } from '../src'

expectType<Iterable<number>>(
  keys(
    new Map<number, any>([
      [1, 2],
      [1, `sdfsd`]
    ])
  )
)
expectType<Iterable<number>>(
  keys(
    new Map<number, string>([
      [1, `sdf`],
      [1, `sdfsd`]
    ])
  )
)
expectType<Iterable<string>>(
  values(
    new Map<number, string>([
      [1, `sdf`],
      [1, `sdfsd`]
    ])
  )
)
expectType<Iterable<string>>(values(new Set([`dsfsd`, `sdfs`])))
expectType<Iterable<[number, string]>>(
  entries(
    new Map<number, string>([
      [1, `sdf`],
      [1, `sdfsd`]
    ])
  )
)
