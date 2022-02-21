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

import { expectAssignable, expectNotAssignable, expectType } from 'tsd'
import {
  asAsync,
  asConcur,
  collect,
  collectAsync,
  collectConcur,
  Collector,
  folding,
  grouping,
  MapCollector,
  toArray,
  toMap,
  toObject,
  toSet,
  toWeakMap,
  toWeakSet,
} from '../src'

expectAssignable<Collector>(toArray)
expectNotAssignable<MapCollector>(toArray)
expectType<Array<number>>(collect(toArray, [1, 2, 3]))
expectType<Array<string>>(collect(toArray, ['a', 'b', 'c']))
expectType<Promise<Array<string>>>(
  collectAsync(toArray, asAsync(['a', 'b', 'c'])),
)
expectType<Promise<Array<string>>>(
  collectConcur(toArray, asConcur(['a', 'b', 'c'])),
)

expectAssignable<Collector>(toSet)
expectNotAssignable<MapCollector>(toSet)
expectType<Set<number>>(collect(toSet, [1, 2, 3]))
expectType<Set<string>>(collect(toSet, ['a', 'b', 'c']))
expectType<Promise<Set<string>>>(collectAsync(toSet, asAsync(['a', 'b', 'c'])))
expectType<Promise<Set<string>>>(
  collectConcur(toSet, asConcur(['a', 'b', 'c'])),
)

expectAssignable<Collector>(toWeakSet)
expectNotAssignable<MapCollector>(toWeakSet)
expectType<WeakSet<{}>>(collect(toWeakSet, [{}, {}, {}]))
expectType<WeakSet<() => number>>(collect(toWeakSet, [() => 3]))
expectType<Promise<WeakSet<{}>>>(collectAsync(toWeakSet, asAsync([{}, {}, {}])))
expectType<Promise<WeakSet<{}>>>(
  collectConcur(toWeakSet, asConcur([{}, {}, {}])),
)

const entries1: Array<[string, object]> = [['a', {}]]
const entries2: Array<[object, object]> = [[{}, {}]]

expectAssignable<Collector>(toObject({ writable: true }))
expectAssignable<Collector>(toObject)
expectAssignable<MapCollector>(toObject)
expectType<never>(collect(toObject, ['a', 'b']))
expectType<Record<string, object>>(collect(toObject, entries1))
expectType<Promise<Record<string, object>>>(
  collectAsync(toObject, asAsync(entries1)),
)
expectType<Promise<Record<string, object>>>(
  collectConcur(toObject, asConcur(entries1)),
)

expectAssignable<Collector>(toMap)
expectAssignable<MapCollector>(toMap)
expectType<never>(collect(toMap, ['a', 'b']))
expectType<Map<string, object>>(collect(toMap, entries1))
expectType<Promise<Map<string, object>>>(collectAsync(toMap, asAsync(entries1)))
expectType<Promise<Map<string, object>>>(
  collectConcur(toMap, asConcur(entries1)),
)

expectAssignable<Collector>(toWeakMap)
expectAssignable<MapCollector>(toWeakMap)
expectType<never>(collect(toWeakMap, ['a', 'b']))
expectType<WeakMap<object, object>>(collect(toWeakMap, entries2))
expectType<Promise<WeakMap<object, object>>>(
  collectAsync(toWeakMap, asAsync(entries2)),
)
expectType<Promise<WeakMap<object, object>>>(
  collectConcur(toWeakMap, asConcur(entries2)),
)

const foldingCollector = folding(
  value => [value],
  (acc: object[], value: object) => acc.concat(value),
  toMap,
)
expectAssignable<Collector>(foldingCollector)
expectAssignable<MapCollector>(foldingCollector)
expectType<Map<string, object[]>>(collect(foldingCollector, entries1))
expectType<Promise<Map<string, object[]>>>(
  collectAsync(foldingCollector, asAsync(entries1)),
)
expectType<Promise<Map<string, object[]>>>(
  collectConcur(foldingCollector, asConcur(entries1)),
)

expectType<Record<string, string[]>>(
  collect(grouping(toArray, toObject), [[`string`, `string`]] as [
    string,
    string,
  ][]),
)
