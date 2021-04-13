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
 * Returns an async iterable wrapper around `iterable`.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, `sloth`, 3])
 *
 * console.log(typeof asyncIterable[Symbol.asyncIterator])
 * //=> function
 *
 * console.log(await collectAsync(toArray, asyncIterable))
 * //=> [ 1, 'sloth', 3 ]
 * ```
 */
export const asAsync: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value>
) => AsyncIterable<Value>

/**
 * Returns a concur iterable wrapper around `iterable`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, `sloth`, 3])
 *
 * console.log(await collectConcur(toArray, concurIterable))
 * //=> [ 1, 'sloth', 3 ] (not necessarily in this order)
 * ```
 */
export const asConcur: <Value>(
  iterable: Iterable<Value> | AsyncIterable<Value> | ConcurIterable<Value>
) => ConcurIterable<Value>
