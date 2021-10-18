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
  chunked,
  chunkedAsync,
  chunkedConcur,
  ConcurIterable,
} from '../src'

expectType<Iterable<number[]>>(chunked(4, [1, 2, 3]))
expectType<AsyncIterable<number[]>>(chunkedAsync(2, asAsync([1, 2, 3])))
expectType<ConcurIterable<number[]>>(chunkedConcur(1, asConcur([1, 2, 3])))
