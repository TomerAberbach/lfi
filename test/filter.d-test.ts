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
  ConcurIterable,
  filter,
  filterAsync,
  filterConcur,
  without,
  withoutAsync,
  withoutConcur
} from '../src'

expectType<Iterable<number>>(filter(value => String(value), [1, 2, 3]))
expectType<Iterable<number>>(filter((value: number) => value > 2)([1, 2, 3]))

expectType<AsyncIterable<number>>(
  filterAsync(value => value > 2, asAsync([1, 2, 3]))
)
expectType<AsyncIterable<number>>(
  filterAsync(async value => String(value), asAsync([1, 2, 3]))
)
expectType<AsyncIterable<number>>(
  filterAsync((value: number) => String(value))(asAsync([1, 2, 3]))
)
expectType<AsyncIterable<number>>(
  filterAsync(async (value: number) => String(value))(asAsync([1, 2, 3]))
)

expectType<ConcurIterable<number>>(
  filterConcur(value => String(value), asConcur([1, 2, 3]))
)
expectType<ConcurIterable<number>>(
  filterConcur(async value => value > 2, asConcur([1, 2, 3]))
)
expectType<ConcurIterable<number>>(
  filterConcur((value: number) => String(value))(asConcur([1, 2, 3]))
)
expectType<ConcurIterable<number>>(
  filterConcur(async (value: number) => String(value))(asConcur([1, 2, 3]))
)

expectType<Iterable<number>>(without(['a', 1], [1, 2, 3]))
expectType<Iterable<number>>(without(['a', 1])([1, 2, 3]))

expectType<AsyncIterable<number>>(withoutAsync(['a', 1], asAsync([1, 2, 3])))
expectType<AsyncIterable<number>>(withoutAsync(['a', 1])(asAsync([1, 2, 3])))

expectType<ConcurIterable<number>>(withoutConcur(['a', 1], asConcur([1, 2, 3])))
expectType<ConcurIterable<number>>(withoutConcur(['a', 1])(asConcur([1, 2, 3])))
