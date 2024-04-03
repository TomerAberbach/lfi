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

import type {
  MaybePromiseLike,
  NonNegativeInteger,
  PositiveInteger,
} from '../internal/types.js'
import type { ConcurIterable } from './as.js'

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * starting with the first value for which `fn` returns a falsy value.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
 *     dropWhile(value => value < 5),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 5, 6, 7, 8, 'sloth' ]
 * ```
 */
export const dropWhile: SubWhile

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order starting with the first value for which `fn` returns a value
 * awaitable to a falsy value.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
 *     dropWhileAsync(value => value < 5),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 5, 6, 7, 8, 'sloth' ]
 * ```
 */
export const dropWhileAsync: SubWhileAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order starting with the first value for which `fn` returns a value
 * awaitable to a falsy value.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
 *     dropWhileConcur(value => value < 5),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 5, 6, 7, 8, 'sloth' ]
 * ```
 */
export const dropWhileConcur: SubWhileConcur

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * up until but not including the first value for which `fn` returns a falsy
 * value.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, 7, 8, `sloth`],
 *     takeWhile(value => value < 5),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhile: SubWhile

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order up until but not including the first value for which `fn`
 * returns a value awaitable to a falsy value.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
 *     takeWhileAsync(value => value < 5),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhileAsync: SubWhileAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order up until but not including the first value for which `fn`
 * returns a value awaitable to a falsy value.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, 7, 8, `sloth`]),
 *     takeWhileConcur(value => value < 5),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 4 ]
 * ```
 */
export const takeWhileConcur: SubWhileConcur

/** @internal */
type SubWhile = {
  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/** @internal */
type SubWhileAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/** @internal */
type SubWhileConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `iterable`, then an
 * empty iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, `sloth`],
 *     drop(3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 4, 5, 'sloth' ]
 * ```
 */
export const drop: Sub

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `asyncIterable`, then
 * an empty async iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, `sloth`]),
 *     dropAsync(3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 4, 5, 'sloth' ]
 * ```
 */
export const dropAsync: SubAsync

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order except for the first `count` values.
 *
 * If the `count` is greater than the number of values in `concurIterable`, then
 * an empty concur iterable is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, `sloth`]),
 *     dropConcur(3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 4, 5, 'sloth' ]
 * ```
 */
export const dropConcur: SubConcur

/**
 * Returns an iterable containing the first `count` values of `iterable` in
 * iteration order.
 *
 * If the `count` is greater than the number of values in `iterable`, then an
 * iterable equivalent `iterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, `sloth`],
 *     take(3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const take: Sub

/**
 * Returns an async iterable containing the first `count` values of
 * `asyncIterable` in iteration order.
 *
 * If the `count` is greater than the number of values in `asyncIterable`, then
 * an async iterable equivalent `asyncIterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, `sloth`]),
 *     takeAsync(3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const takeAsync: SubAsync

/**
 * Returns a concur iterable containing the first `count` values of
 * `concurIterable` in iteration order.
 *
 * If the `count` is greater than the number of values in `concurIterable`, then
 * a concur iterable equivalent `concurIterable` is returned.
 *
 * @throws if `count` isn't a non-negative integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, `sloth`]),
 *     takeConcur(3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3 ]
 * ```
 */
export const takeConcur: SubConcur

/** @internal */
type Sub = {
  <Count extends number>(
    count: NonNegativeInteger<Count>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value>
  <Count extends number, Value>(
    count: NonNegativeInteger<Count>,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/** @internal */
type SubAsync = {
  <Count extends number>(
    count: NonNegativeInteger<Count>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Count extends number, Value>(
    count: NonNegativeInteger<Count>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/** @internal */
type SubConcur = {
  <Count extends number>(
    count: NonNegativeInteger<Count>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Count extends number, Value>(
    count: NonNegativeInteger<Count>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the first value of `iterable`, or an empty
 * iterable if `iterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     first,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 */
export const first: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the first value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     firstAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 */
export const firstAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the first value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     firstConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 */
export const firstConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>

/**
 * Returns an iterable containing the last value of `iterable`, or an empty
 * iterable if `iterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     last,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 */
export const last: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the last value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     lastAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 */
export const lastAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the last value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     lastConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 */
export const lastConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>

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
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, 7, 8, 9],
 *     chunk(3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 *
 * console.log(
 *   pipe(
 *     [`S`, `L`, `O`, `T`, `H`],
 *     chunk(2),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
 * ```
 */
export const chunk: {
  <Size extends number>(
    size: PositiveInteger<Size>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value[]>
  <Size extends number, Value>(
    size: PositiveInteger<Size>,
    iterable: Iterable<Value>,
  ): Iterable<Value[]>
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
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, 7, 8, 9]),
 *     chunkAsync(3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 *
 * console.log(
 *   await pipe(
 *     asAsync([`S`, `L`, `O`, `T`, `H`]),
 *     chunkAsync(2),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
 * ```
 */
export const chunkAsync: {
  <Size extends number>(
    size: PositiveInteger<Size>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value[]>
  <Size extends number, Value>(
    size: PositiveInteger<Size>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value[]>
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
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, 7, 8, 9]),
 *     chunkConcur(3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 *
 * console.log(
 *   await pipe(
 *     asConcur([`S`, `L`, `O`, `T`, `H`]),
 *     chunkConcur(2),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 'S', 'L' ], [ 'O', 'T' ], [ 'H' ] ]
 * ```
 */
export const chunkConcur: {
  <Size extends number>(
    size: PositiveInteger<Size>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value[]>
  <Size extends number, Value>(
    size: PositiveInteger<Size>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value[]>
}

/**
 * Returns an iterable containing a rolling window of the values of `iterable`
 * as arrays of length `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, `sloth`],
 *     window(3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, `sloth`],
 *     window({ size: 3, partialStart: true }),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4, 5, 6, `sloth`],
 *     window({ size: 3, partialStart: true, partialEnd: true }),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
 * ```
 */
export const window: {
  <Size extends number>(
    options: WindowOptions<Size>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value[]>
  <Size extends number, Value>(
    options: WindowOptions<Size>,
    iterable: Iterable<Value>,
  ): Iterable<Value[]>
}

/**
 * Returns an async iterable containing a rolling window of the values of
 * `asyncIterable` as arrays of length `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowAsync(3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowAsync({ size: 3, partialStart: true }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   await pipe(
 *     asAsync([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowAsync({ size: 3, partialStart: true, partialEnd: true }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
 * ```
 */
export const windowAsync: {
  <Size extends number>(
    options: WindowOptions<Size>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value[]>
  <Size extends number, Value>(
    options: WindowOptions<Size>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value[]>
}

/**
 * Returns a concur iterable containing a rolling window of the values of
 * `concurIterable` as arrays of length `size`.
 *
 * @throws if `size` is not a positive integer.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowConcur(3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowConcur({ size: 3, partialStart: true }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ] ]
 *
 * console.log(
 *   await pipe(
 *     asConcur([1, 2, 3, 4, 5, 6, `sloth`]),
 *     windowConcur({ size: 3, partialStart: true, partialEnd: true }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 1 ], [ 1, 2 ], [ 1, 2, 3 ], [ 2, 3, 4 ], [ 3, 4, 5 ], [ 4, 5, 6 ], [ 5, 6, 'sloth' ], [ 6, 'sloth' ], [ 'sloth' ] ]
 * ```
 */
export const windowConcur: {
  <Size extends number>(
    options: WindowOptions<Size>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value[]>
  <Size extends number, Value>(
    options: WindowOptions<Size>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value[]>
}

/**
 * Options for {@link window}, {@link windowAsync}, and {@link windowConcur}.
 */
export type WindowOptions<Size extends number = number> =
  | PositiveInteger<Size>
  | Readonly<{
      /** The size of each window. Must be a positive integer. */
      size: PositiveInteger<Size>

      /**
       * Whether the returned iterable should have partial windows at the start.
       * Defaults to `false`.
       */
      partialStart?: boolean

      /**
       * Whether the returned iterable should have partial windows at the end.
       * Defaults to `false`.
       */
      partialEnd?: boolean
    }>
