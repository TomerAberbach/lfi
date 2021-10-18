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
  all,
  allAsync,
  allConcur,
  any,
  anyConcur,
  anyAsync,
  none,
  noneAsync,
  noneConcur,
  includes,
  includesAsync,
  includesConcur,
} from '../src'

expectType<boolean>(all(x => x > 2, [1, 2, 3]))
expectType<Promise<boolean>>(allAsync(y => y > 2, asAsync([1, 2, 3])))
expectType<Promise<boolean>>(
  allConcur(async (x: number) => x > 2, asConcur([1, 2, 3])),
)

expectType<boolean>(any(x => x > 2, [1, 2, 3]))
expectType<Promise<boolean>>(anyAsync(y => y > 2, asAsync([1, 2, 3])))
expectType<Promise<boolean>>(
  anyConcur(async (x: number) => x > 2, asConcur([1, 2, 3])),
)

expectType<boolean>(none(x => x > 2, [1, 2, 3]))
expectType<Promise<boolean>>(noneAsync(y => y > 2, asAsync([1, 2, 3])))
expectType<Promise<boolean>>(
  noneConcur(async (x: number) => x > 2, asConcur([1, 2, 3])),
)

expectType<boolean>(includes(5, [1, 2, 3]))
expectType<Promise<boolean>>(includesAsync('sdfsdf', asAsync([1, 2, 3])))
expectType<Promise<boolean>>(includesConcur({}, asConcur([1, 2, 3])))
