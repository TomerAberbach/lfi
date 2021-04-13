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

import { MaybePromiseLike } from './internal/types'

/**
 * Returns an infinite iterable that yields `seed` for its first value and then
 * yields the result of applying `fn` to its previously yielded value for every
 * subsequent value.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     generate(previousValue => previousValue * 2, 1),
 *     take(5),
 *     collect(toArray)
 *   )
 * )
 * //=> [ 1, 2, 4, 8, 16 ]
 * ```
 */
export const generate: {
  <Value>(fn: (previousValue: Value) => Value): (seed: Value) => Iterable<Value>
  <Value>(fn: (previousValue: Value) => Value, seed: Value): Iterable<Value>
}

/**
 * Returns an infinite async iterable that yields `seed` for its first value and
 * then yields the awaited result of applying `fn` to its previously yielded
 * value for every subsequent value.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     generateAsync(previousValue => previousValue * 2, 1),
 *     takeAsync(5),
 *     collectAsync(toArray)
 *   )
 * )
 * //=> [ 1, 2, 4, 8, 16 ]
 * ```
 */
export const generateAsync: {
  <Value>(fn: (previousValue: Value) => MaybePromiseLike<Value>): (
    seed: Value
  ) => AsyncIterable<Value>
  <Value>(
    fn: (previousValue: Value) => MaybePromiseLike<Value>,
    seed: Value
  ): AsyncIterable<Value>
}

/**
 * Returns an infinite iterable that repeatedly yields `value`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     repeat(`sloth`),
 *     take(3),
 *     join(`, `)
 *   )
 * )
 * //=> sloth, sloth, sloth
 * ```
 */
export const repeat: <Value>(value: Value) => Iterable<Value>

/**
 * Returns an infinite iterable that repeatedly yields the values of `iterable`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `more sloth`]),
 *     take(6),
 *     join(`, `)
 *   )
 * )
 * //=> sloth, more sloth, sloth, more sloth, sloth, more sloth
 * ```
 */
export const cycle: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an infinite async iterable that repeatedly yields the values of
 * `asyncIterable`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     cycleAsync(asAsync([`sloth`, `more sloth`])),
 *     takeAsync(6),
 *     joinAsync(`, `)
 *   )
 * )
 * //=> sloth, more sloth, sloth, more sloth, sloth, more sloth
 * ```
 */
export const cycleAsync: <Value>(
  asyncIterable: AsyncIterable<Value>
) => AsyncIterable<Value>
