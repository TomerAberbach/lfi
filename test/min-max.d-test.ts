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
  maxBy,
  maxByAsync,
  maxByConcur,
  minBy,
  minByAsync,
  minByConcur,
  MinMax,
  minMaxBy,
  minMaxByAsync,
  minMaxByConcur,
  asAsync,
  asConcur,
  ConcurIterable,
  minWith,
  maxWith,
  minMaxWith,
  minWithAsync,
  maxWithAsync,
  minMaxWithAsync,
  minWithConcur,
  maxWithConcur,
  minMaxWithConcur,
  min,
  max,
  minMax,
  minAsync,
  maxAsync,
  minMaxAsync,
  minConcur,
  maxConcur,
  minMaxConcur
} from '../src'

expectType<Iterable<string>>(
  minBy((left, right) => left.length - right.length, ['sdf', 'sdf'])
)
expectType<Iterable<string>>(
  maxBy((left, right) => left.length - right.length, ['sdf', 'sdf'])
)
expectType<Iterable<MinMax<string>>>(
  minMaxBy((left, right) => left.length - right.length, ['sdf', 'sdf'])
)

expectType<AsyncIterable<string>>(
  minByAsync(
    (left, right) => left.length - right.length,
    asAsync(['sdf', 'sdf'])
  )
)
expectType<AsyncIterable<string>>(
  maxByAsync(
    async (left, right) => left.length - right.length,
    asAsync(['sdf', 'sdf'])
  )
)
expectType<AsyncIterable<MinMax<string>>>(
  minMaxByAsync(
    (left, right) => left.length - right.length,
    asAsync(['sdf', 'sdf'])
  )
)

expectType<ConcurIterable<string>>(
  minByConcur(
    (left, right) => left.length - right.length,
    asConcur(['sdf', 'sdf'])
  )
)
expectType<ConcurIterable<string>>(
  maxByConcur(
    async (left, right) => left.length - right.length,
    asConcur(['sdf', 'sdf'])
  )
)
expectType<ConcurIterable<MinMax<string>>>(
  minMaxByConcur(
    (left, right) => left.length - right.length,
    asConcur(['sdf', 'sdf'])
  )
)

expectType<Iterable<string>>(minWith(string => string.length, ['sdf', 'sdf']))
expectType<Iterable<string>>(maxWith(string => string.length, ['sdf', 'sdf']))
expectType<Iterable<MinMax<string>>>(
  minMaxWith(string => string.length, ['sdf', 'sdf'])
)

expectType<AsyncIterable<string>>(
  minWithAsync(string => string.length, asAsync(['sdf', 'sdf']))
)
expectType<AsyncIterable<string>>(
  maxWithAsync(async string => string.length, asAsync(['sdf', 'sdf']))
)
expectType<AsyncIterable<MinMax<string>>>(
  minMaxWithAsync(string => string.length, asAsync(['sdf', 'sdf']))
)

expectType<ConcurIterable<string>>(
  minWithConcur(string => string.length, asConcur(['sdf', 'sdf']))
)
expectType<ConcurIterable<string>>(
  maxWithConcur(async string => string.length, asConcur(['sdf', 'sdf']))
)
expectType<ConcurIterable<MinMax<string>>>(
  minMaxWithConcur(string => string.length, asConcur(['sdf', 'sdf']))
)

expectType<Iterable<number>>(min([1, 2, 3]))
expectType<Iterable<number>>(max([1, 2, 3]))
expectType<Iterable<MinMax<number>>>(minMax([1, 2, 3]))

expectType<AsyncIterable<number>>(minAsync(asAsync([1, 2, 3])))
expectType<AsyncIterable<number>>(maxAsync(asAsync([1, 2, 3])))
expectType<AsyncIterable<MinMax<number>>>(minMaxAsync(asAsync([1, 2, 3])))

expectType<ConcurIterable<number>>(minConcur(asConcur([1, 2, 3])))
expectType<ConcurIterable<number>>(maxConcur(asConcur([1, 2, 3])))
expectType<ConcurIterable<MinMax<number>>>(minMaxConcur(asConcur([1, 2, 3])))
