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
  or,
  orAsync,
  orConcur,
  get,
  getAsync,
  getConcur,
  next,
  nextAsync
} from '../src'

expectType<number>(or(() => 2, [1, 2, 3]))
expectType<number>(or(() => 2)([1, 2, 3]))

expectType<Promise<number>>(orAsync(() => 2, asAsync([1, 2, 3])))
expectType<Promise<number>>(orAsync<number>(async () => 2, asAsync([1, 2, 3])))
expectType<Promise<number>>(orAsync(() => 2)(asAsync([1, 2, 3])))
expectType<Promise<number>>(orAsync<number>(async () => 2)(asAsync([1, 2, 3])))

expectType<Promise<number>>(orConcur(() => 2, asConcur([1, 2, 3])))
expectType<Promise<number>>(
  orConcur<number>(async () => 2, asConcur([1, 2, 3]))
)
expectType<Promise<number>>(orConcur(() => 2)(asConcur([1, 2, 3])))
expectType<Promise<number>>(
  orConcur<number>(async () => 2)(asConcur([1, 2, 3]))
)

expectType<number>(get([1, 2, 3]))
expectType<Promise<number>>(getAsync(asAsync([1, 2, 3])))
expectType<Promise<number>>(getConcur(asConcur([1, 2, 3])))

expectType<[Iterable<number>, Iterable<number>]>(next([1, 2, 3]))
expectType<Promise<[AsyncIterable<number>, AsyncIterable<number>]>>(
  nextAsync(asAsync([1, 2, 3]))
)
