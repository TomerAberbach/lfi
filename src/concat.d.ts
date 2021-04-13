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

import { ConcurIterable } from './types'

/**
 * Returns an iterable that contains the values of each iterable in `iterables`
 * in iteration order.
 *
 * Like `Array.prototype.concat`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = concat([1, 2], [3, `sloth`, 5], [6, 7])
 *
 * console.log([...iterable])
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 */
export const concat: <Value>(
  ...iterables: ReadonlyArray<Iterable<Value>>
) => Iterable<Value>

/**
 * Returns an async iterable that contains the values of each iterable in
 * `iterables` in iteration order.
 *
 * Like `Array.prototype.concat`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = concatAsync(
 *   asAsync([1, 2]),
 *   [3, `sloth`, 5],
 *   asAsync([6, 7])
 * )
 *
 * console.log(await collectAsync(toArray, asyncIterable))
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 */
export const concatAsync: <Value>(
  ...iterables: ReadonlyArray<Iterable<Value> | AsyncIterable<Value>>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable that contains the values of each iterable in
 * `iterables`.
 *
 * Unlike {@link concat} and {@link concatAsync}, this function does not
 * necessarily iterate over each iterable in sequence.
 *
 * Like `Array.prototype.concat`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = concatConcur(
 *   asConcur([1, 2, 3]),
 *   asAsync([`sloth`, 5, 6]),
 *   [7, 8, 9]
 * )
 *
 * console.log(await collectConcur(toArray, concurIterable))
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7, 8, 9 ] (not necessarily in this order)
 * ```
 */
export const concatConcur: <Value>(
  ...iterables: ReadonlyArray<
    Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>
  >
) => ConcurIterable<Value>
