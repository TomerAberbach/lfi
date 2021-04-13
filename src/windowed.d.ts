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
 * Returns an iterable containing a rolling window of the values of `iterable`
 * as arrays of length `size`.
 *
 * @example
 * ```js
 * const iterable = [1, 2, 3, 4, 5, 6, 7]
 *
 * console.log([...windowed(3, iterable)])
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 7 ] ]
 * ```
 */
export const windowed: {
  (size: number): <Value>(iterable: Iterable<Value>) => Iterable<Value[]>
  <Value>(size: number, iterable: Iterable<Value>): Iterable<Value[]>
}

/**
 * Returns an async iterable containing a rolling window of the values of
 * `asyncIterable` as arrays of length `size`.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, 3, 4, 5, 6, 7])
 *
 * console.log(await collectAsync(toArray, windowedAsync(3, asyncIterable)))
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 7 ] ]
 * ```
 */
export const windowedAsync: {
  (size: number): <Value>(
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value[]>
  <Value>(size: number, asyncIterable: AsyncIterable<Value>): AsyncIterable<
    Value[]
  >
}

/**
 * Returns a concur iterable containing a rolling window of the values of
 * `concurIterable` as arrays of length `size`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, 3, 4, 5, 6, 7])
 *
 * console.log(await collectConcur(toArray, windowedConcur(3, concurIterable)))
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 7 ] ]
 * ```
 */
export const windowedConcur: {
  (size: number): <Value>(
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value[]>
  <Value>(size: number, concurIterable: ConcurIterable<Value>): ConcurIterable<
    Value[]
  >
}
