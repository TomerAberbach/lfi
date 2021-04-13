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
 * Returns an iterable equivalent to `iterable` except its values are grouped
 * into arrays that each contain `size` values.
 *
 * The last array in the returned iterable will contain fewer than `size` values
 * (but at least one) if the number of values in `iterable` is not divisible by
 * `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * console.log([...chunked(3, numbers)])
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 *
 * const letters = [`S`, `L`, `O`, `T`, `H`]
 *
 * console.log([...chunked(2, letters)])
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
 * ```
 */
export const chunked: {
  (size: number): <Value>(iterable: Iterable<Value>) => Iterable<Value[]>
  <Value>(size: number, iterable: Iterable<Value>): Iterable<Value[]>
}

/**
 * Returns an async iterable equivalent to `asyncIterable` except its values are
 * grouped into arrays that each contain `size` values.
 *
 * The last array in the returned async iterable will contain fewer than `size`
 * values (but at least one) if the number of values in `asyncIterable` is not
 * divisible by `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * const numbers = asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(await collectAsync(toArray, chunkedAsync(3, numbers)]))
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 *
 * const letters = asAsync([`S`, `L`, `O`, `T`, `H`])
 *
 * console.log(await collectAsync(toArray, chunked(2, letters)))
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
 * ```
 */
export const chunkedAsync: {
  (size: number): <Value>(
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value[]>
  <Value>(size: number, asyncIterable: AsyncIterable<Value>): AsyncIterable<
    Value[]
  >
}

/**
 * Returns a concur iterable equivalent to `concurIterable` except its values
 * are grouped into arrays that each contain `size` values.
 *
 * The last array in the returned concur iterable will contain fewer than `size`
 * values (but at least one) if the number of values in `concurIterable` is not
 * divisible by `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * const numbers = asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9])
 *
 * console.log(await collectConcur(toArray, chunkedConcur(3, numbers)))
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ] (not necessarily in this order)
 *
 * const letters = asConcur([`S`, `L`, `O`, `T`, `H`])
 *
 * console.log(await collectConcur(toArray, chunkedConcur(2, letters)))
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ] (not necessarily in this order)
 * ```
 */
export const chunkedConcur: {
  (size: number): <Value>(
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value[]>
  <Value>(size: number, concurIterable: ConcurIterable<Value>): ConcurIterable<
    Value[]
  >
}
