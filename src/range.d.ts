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
 * An iterable that yields integers in a range. Has a method for obtaining a new
 * iterable that skips numbers in steps.
 */
type RangeIterable = Iterable<number> & {
  /**
   * Returns an iterable that yields integers in the same range as the original
   * {@link RangeIterable}, but steps through the range in increments of `step`
   * instead of 1.
   *
   * @throws if `step` is not a positive integer.
   */
  step: (step: number) => Iterable<number>
}

/** @internal */
type Range = {
  (start: number): (end: number) => RangeIterable
  (start: number, end: number): RangeIterable
}

/**
 * Returns a {@link RangeIterable} that yields the integers between `start` and
 * `end` (including `start` and `end`).
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js
 * console.log([...rangeTo(0, 6)])
 * //=> [ 0, 1, 2, 3, 4, 5, 6 ]
 *
 * console.log([...rangeTo(0, 6).step(2)])
 * //=> [ 0, 2, 4, 6 ]
 * ```
 */
export const rangeTo: Range

/**
 * Returns a {@link RangeIterable} that yields the integers between `start` and
 * `end` (including `start`, but excluding `end`).
 *
 * @throws if either `start` or `end` is not an integer.
 *
 * @example
 * ```js
 * console.log([...rangeUntil(0, 6)])
 * //=> [ 0, 1, 2, 3, 4, 5 ]
 *
 * console.log([...rangeUntil(0, 6).step(2)])
 * //=> [ 0, 2, 4 ]
 * ```
 */
export const rangeUntil: Range
