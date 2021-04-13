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
 * Returns an iterable equivalent to `iterable` except each value of `iterable`
 * is placed in an entry containing the value's 0-based index in the iteration
 * order followed by the value itself.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 *
 * console.log([...indexed(iterable)])
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * ```
 */
export const indexed: <Value>(
  iterable: Iterable<Value>
) => Iterable<[number, Value]>

/**
 * Returns an async iterable equivalent to `asyncIterable` except each value of
 * `asyncIterable` is placed in an entry containing the value's 0-based index in
 * the iteration order followed by the value itself.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await collectAsync(toArray, indexedAsync(asyncIterable)))
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * ```
 */
export const indexedAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<[number, Value]>

/**
 * Returns a concur iterable equivalent to `concurIterable` except each value of
 * `concurIterable` is placed in an entry containing the value's 0-based index
 * in the iteration order followed by the value itself.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(await collectConcur(toArray, indexedConcur(concurIterable)))
 * //=> [ [ 0, 'sloth' ], [ 1, 'more sloth' ], [ 2, 'even more sloth' ] ]
 * // (the indices are necessarily in this order, but not the values!)
 * ```
 */
export const indexedConcur: <Value>(
  concurIterable: ConcurIterable<Value>
) => ConcurIterable<[number, Value]>
