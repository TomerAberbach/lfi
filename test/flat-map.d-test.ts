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
  flatMap,
  flatMapAsync,
  flatMapConcur,
  flatten,
  flattenAsync,
  flattenConcur
} from '../src'

expectType<Iterable<number>>(flatMap(value => [value, value * 2], [1, 2, 4]))
expectType<Iterable<number>>(
  flatMap((value: number) => [value, value * 2])([1, 2, 4])
)
expectType<Iterable<string>>(
  flatMap((value: number) => [String(value), String(value * 2)])([1, 2, 4])
)

expectType<AsyncIterable<number>>(
  flatMapAsync(value => [value, value * 2], asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync(async value => [value, value * 2], asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync(value => asAsync([value, value * 2]), asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync(async value => asAsync([value, value * 2]), asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync((value: number) => [value, value * 2])(asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync(async (value: number) => [value, value * 2])(asAsync([1, 2, 4]))
)
expectType<AsyncIterable<number>>(
  flatMapAsync((value: number) => asAsync([value, value * 2]))(
    asAsync([1, 2, 4])
  )
)
expectType<AsyncIterable<number>>(
  flatMapAsync(async (value: number) => asAsync([value, value * 2]))(
    asAsync([1, 2, 4])
  )
)
expectType<AsyncIterable<string>>(
  flatMapAsync((value: number) => [String(value), String(value * 2)])(
    asAsync([1, 2, 4])
  )
)
expectType<AsyncIterable<string>>(
  flatMapAsync(async (value: number) => [String(value), String(value * 2)])(
    asAsync([1, 2, 4])
  )
)
expectType<AsyncIterable<string>>(
  flatMapAsync((value: number) => asAsync([String(value), String(value * 2)]))(
    asAsync([1, 2, 4])
  )
)
expectType<AsyncIterable<string>>(
  flatMapAsync(async (value: number) =>
    asAsync([String(value), String(value * 2)])
  )(asAsync([1, 2, 4]))
)

expectType<ConcurIterable<number>>(
  flatMapConcur(value => [value, value * 2], asConcur<number>([1, 2, 4]))
)
expectType<ConcurIterable<number>>(
  flatMapConcur(async value => [value, value * 2], asConcur<number>([1, 2, 4]))
)
expectType<ConcurIterable<number>>(
  flatMapConcur(
    value => asAsync([value, value * 2]),
    asConcur<number>([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur(
    async value => asAsync([value, value * 2]),
    asConcur<number>([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur(
    value => asConcur([value, value * 2]),
    asConcur<number>([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur(
    async value => asConcur([value, value * 2]),
    asConcur<number>([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur((value: number) => [value, value * 2])(asConcur([1, 2, 4]))
)
expectType<ConcurIterable<number>>(
  flatMapConcur(async (value: number) => [value, value * 2])(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur((value: number) => asAsync([value, value * 2]))(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur(async (value: number) => asAsync([value, value * 2]))(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur((value: number) => asConcur([value, value * 2]))(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<number>>(
  flatMapConcur(async (value: number) => asConcur([value, value * 2]))(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<string>>(
  flatMapConcur((value: number) => [String(value), String(value * 2)])(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<string>>(
  flatMapConcur(async (value: number) => [String(value), String(value * 2)])(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<string>>(
  flatMapConcur((value: number) => asAsync([String(value), String(value * 2)]))(
    asConcur([1, 2, 4])
  )
)
expectType<ConcurIterable<string>>(
  flatMapConcur(async (value: number) =>
    asAsync([String(value), String(value * 2)])
  )(asConcur([1, 2, 4]))
)
expectType<ConcurIterable<string>>(
  flatMapConcur((value: number) =>
    asConcur([String(value), String(value * 2)])
  )(asConcur([1, 2, 4]))
)
expectType<ConcurIterable<string>>(
  flatMapConcur(async (value: number) =>
    asConcur([String(value), String(value * 2)])
  )(asConcur([1, 2, 4]))
)

expectType<Iterable<number>>(
  flatten([
    [1, 2, 3],
    [1, 2, 3]
  ])
)

expectType<AsyncIterable<number>>(
  flattenAsync(
    asAsync([
      [1, 2, 3],
      [1, 2, 3]
    ])
  )
)
expectType<AsyncIterable<number>>(
  flattenAsync(asAsync([asAsync([1, 2, 3]), [1, 2, 3]]))
)

expectType<AsyncIterable<number>>(
  flattenAsync(
    asAsync([
      [1, 2, 3],
      [1, 2, 3]
    ])
  )
)
expectType<AsyncIterable<number>>(
  flattenAsync(asAsync([asAsync([1, 2, 3]), [1, 2, 3]]))
)

expectType<ConcurIterable<number>>(
  flattenConcur(
    asConcur([
      [1, 2, 3],
      [1, 2, 3]
    ])
  )
)
expectType<ConcurIterable<number>>(
  flattenConcur(asConcur([asAsync([1, 2, 3]), [1, 2, 3]]))
)
expectType<ConcurIterable<number>>(
  flattenConcur(asConcur([asConcur([1, 2, 3]), asAsync([1, 2, 3]), [1, 2, 3]]))
)
