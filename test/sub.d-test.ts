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
  drop,
  dropAsync,
  dropConcur,
  dropWhile,
  dropWhileAsync,
  dropWhileConcur,
  first,
  firstAsync,
  firstConcur,
  last,
  lastAsync,
  lastConcur,
  take,
  takeAsync,
  takeConcur,
  takeWhile,
  takeWhileAsync,
  takeWhileConcur
} from '../src'

expectType<Iterable<number>>(dropWhile(value => value < 2, [1, 2, 3]))
expectType<AsyncIterable<number>>(
  dropWhileAsync(value => value < 2, asAsync([1, 2, 3]))
)
expectType<ConcurIterable<number>>(
  dropWhileConcur(value => value < 2, asConcur([1, 2, 3]))
)

expectType<Iterable<number>>(takeWhile(value => value < 2, [1, 2, 3]))
expectType<AsyncIterable<number>>(
  takeWhileAsync(value => value < 2, asAsync([1, 2, 3]))
)
expectType<ConcurIterable<number>>(
  takeWhileConcur(value => value < 2, asConcur([1, 2, 3]))
)

expectType<Iterable<number>>(drop(3, [1, 2, 3]))
expectType<AsyncIterable<number>>(dropAsync(3, asAsync([1, 2, 3])))
expectType<ConcurIterable<number>>(dropConcur(3, asConcur([1, 2, 3])))

expectType<Iterable<number>>(take(3, [1, 2, 3]))
expectType<AsyncIterable<number>>(takeAsync(3, asAsync([1, 2, 3])))
expectType<ConcurIterable<number>>(takeConcur(3, asConcur([1, 2, 3])))

expectType<Iterable<number>>(first([1, 2, 3]))
expectType<AsyncIterable<number>>(firstAsync(asAsync([1, 2, 3])))
expectType<ConcurIterable<number>>(firstConcur(asConcur([1, 2, 3])))

expectType<Iterable<number>>(last([1, 2, 3]))
expectType<AsyncIterable<number>>(lastAsync(asAsync([1, 2, 3])))
expectType<ConcurIterable<number>>(lastConcur(asConcur([1, 2, 3])))
