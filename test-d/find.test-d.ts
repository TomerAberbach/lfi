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
import {
  asAsync,
  asConcur,
  find,
  findAsync,
  findConcur,
  ConcurIterable,
  findLast,
  findLastAsync,
  findLastConcur,
} from '../src'

expectType<Iterable<number>>(find(value => value > 2, [1, 2, 3]))
expectType<AsyncIterable<number>>(
  findAsync(value => value * 2, asAsync([1, 2, 3])),
)
expectType<AsyncIterable<number>>(
  findAsync(async value => value > 10, asAsync([1, 2, 3])),
)
expectType<ConcurIterable<number>>(
  findConcur(value => value > 2, asConcur([1, 2, 3])),
)

expectType<Iterable<number>>(findLast(value => value > 2, [1, 2, 3]))
expectType<AsyncIterable<number>>(
  findLastAsync(value => value * 2, asAsync([1, 2, 3])),
)
expectType<AsyncIterable<number>>(
  findLastAsync(async value => value > 10, asAsync([1, 2, 3])),
)
expectType<ConcurIterable<number>>(
  findLastConcur(value => value > 2, asConcur([1, 2, 3])),
)
