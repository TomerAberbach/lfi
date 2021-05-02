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

/**
 * Returns an iterable of the keys in `map`.
 *
 * This differs from `Map.prototype.keys` in that the iterable returned by this
 * function can be iterated multiple times.
 */
export const keys: <Key>(map: Map<Key, unknown>) => Iterable<Key>

/**
 * Returns an iterable of the values in `object`.
 *
 * This differs from `Map.prototype.values` and `Set.prototype.values` in that
 * the iterable returned by this function can be iterated multiple times.
 */
export const values: <Value>(
  object: Map<unknown, Value> | Set<Value>
) => Iterable<Value>

/**
 * Returns an iterable of the entries in `map`.
 *
 * This differs from `Map.prototype.entries` in that the iterable returned by
 * this function can be iterated multiple times.
 */
export const entries: <Key, Value>(
  map: Map<Key, Value>
) => Iterable<[Key, Value]>
