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
 * Returns an iterable containing the keys of `object`.
 *
 * This differs from `Map.prototype.keys` in that the returned iterable can be
 * iterated multiple times and differs from `Object.keys` in that the returned
 * iterable is opaque.
 */
export const keys: {
  <Key>(object: Map<Key, unknown>): Iterable<Key>
  <Key extends keyof never>(object: Record<Key, unknown>): Iterable<Key>
}

/**
 * Returns an iterable containing the values of `object`.
 *
 * This differs from `Map.prototype.values` and `Set.prototype.values` in that
 * the returned iterable can be iterated multiple times and differs from
 * `Object.values` in that the returned iterable is opaque.
 */
export const values: <Value>(
  object: Map<unknown, Value> | Set<Value> | Record<keyof never, Value>,
) => Iterable<Value>

/**
 * Returns an iterable containing the entries of `object`.
 *
 * This differs from `Map.prototype.entries` in that the returned iterable can
 * be iterated multiple times and differs from `Object.entries` in that the
 * returned iterable is opaque.
 */
export const entries: {
  <Key, Value>(object: { entries: () => Iterable<[Key, Value]> }): Iterable<
    [Key, Value]
  >
  <Key extends keyof never, Value>(object: Record<Key, Value>): Iterable<
    [Key, Value]
  >
}
