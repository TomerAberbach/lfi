import type {
  MaybePromiseLike,
  NonNegativeInteger,
  PositiveInteger,
} from '../internal/types.js'
import type { ConcurIterable } from './core.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optionals.js'

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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.2
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.2
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.2
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.1
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
 *
 * @category Splices
 * @since v0.0.2
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
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     first,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.1
 */
export const first: <Value>(iterable: Iterable<Value>) => Optional<Value>

/**
 * Returns an async iterable containing the first value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     firstAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.1
 */
export const firstAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncOptional<Value>

/**
 * Returns a concur iterable containing the first value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     firstConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.2
 */
export const firstConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurOptional<Value>

/**
 * Returns an iterable containing the last value of `iterable`, or an empty
 * iterable if `iterable` is empty.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     last,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.1
 */
export const last: <Value>(iterable: Iterable<Value>) => Optional<Value>

/**
 * Returns an async iterable containing the last value of `asyncIterable`, or
 * an empty async iterable if `asyncIterable` is empty.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     lastAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.1
 */
export const lastAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncOptional<Value>

/**
 * Returns a concur iterable containing the last value of `concurIterable`, or
 * an empty concur iterable if `concurIterable` is empty.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     lastConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'even more sloth' ]
 * ```
 *
 * @category Splices
 * @since v0.0.2
 */
export const lastConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurOptional<Value>

/**
 * Returns an iterable containing the values of `iterable` between `start` and
 * `end` (exclusive) of `iterable`.
 *
 * If any part of the range between `start` and `end` is outside the bounds of
 * the iterable, then that part is excluded from the returned iterable. Thus,
 * the returned iterable may be empty.
 *
 * WARNING: This function linearly iterates up to `end` because iterables do
 * not support random access.
 *
 * @throws if either `start` or `end` is not a non-negative integer, or if
 * `start` is greater than `end`.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     slice(0, 3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     slice(0, 42),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     slice(1, 3),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     slice(3, 5),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> []
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const slice: {
  <Start extends number>(
    start: NonNegativeInteger<Start>,
  ): {
    <End extends number>(
      End: NonNegativeInteger<End>,
    ): <Value>(iterable: Iterable<Value>) => Iterable<Value>
    <End extends number, Value>(
      End: NonNegativeInteger<End>,
      iterable: Iterable<Value>,
    ): Iterable<Value>
  }

  <Start extends number, End extends number>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value>

  <Start extends number, End extends number, Value>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` between
 * `start` and `end` (exclusive) of `asyncIterable`.
 *
 * If any part of the range between `start` and `end` is outside the bounds of
 * the async iterable, then that part is excluded from the returned async
 * iterable. Thus, the returned async iterable may be empty.
 *
 * WARNING: This function linearly iterates up to `end` because async iterables
 * do not support random access.
 *
 * @throws if either `start` or `end` is not a non-negative integer, or if
 * `start` is greater than `end`.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     sliceAsync(0, 3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     sliceAsync(0, 42),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     sliceAsync(1, 3),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     sliceAsync(3, 5),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> []
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const sliceAsync: {
  <Start extends number>(
    start: NonNegativeInteger<Start>,
  ): {
    <End extends number>(
      End: NonNegativeInteger<End>,
    ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
    <End extends number, Value>(
      End: NonNegativeInteger<End>,
      asyncIterable: AsyncIterable<Value>,
    ): AsyncIterable<Value>
  }

  <Start extends number, End extends number>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>

  <Start extends number, End extends number, Value>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable` between
 * `start` and `end` (exclusive) of `concurIterable` in iteration order.
 *
 * If any part of the range between `start` and `end` is outside the bounds of
 * the concur iterable, then that part is excluded from the returned concur
 * iterable. Thus, the returned concur iterable may be empty.
 *
 * WARNING: This function linearly iterates up to `end` because concur iterables
 * do not support random access.
 *
 * @throws if either `start` or `end` is not a non-negative integer, or if
 * `start` is greater than `end`.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     sliceConcur(0, 3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     sliceConcur(0, 42),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     sliceConcur(1, 3),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'more sloth', 'even more sloth' ]
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     sliceConcur(3, 5),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> []
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const sliceConcur: {
  <Start extends number>(
    start: NonNegativeInteger<Start>,
  ): {
    <End extends number>(
      End: NonNegativeInteger<End>,
    ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
    <End extends number, Value>(
      End: NonNegativeInteger<End>,
      concurIterable: ConcurIterable<Value>,
    ): ConcurIterable<Value>
  }

  <Start extends number, End extends number>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>

  <Start extends number, End extends number, Value>(
    start: NonNegativeInteger<Start>,
    End: NonNegativeInteger<End>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the value at the given `index` of `iterable`
 * or an empty iterable if `index` is out of bounds.
 *
 * WARNING: This function linearly iterates up to `index` because iterables do
 * not support random access.
 *
 * @throws if `index` is not a non-negative integer.
 *
 * @example
 * ```js
 * const iterable = [`sloth`, `more sloth`, `even more sloth`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     at(1),
 *     get,
 *   ),
 * )
 * //=> 'more sloth'
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const at: {
  <Index extends number>(
    index: NonNegativeInteger<Index>,
  ): <Value>(iterable: Iterable<Value>) => Optional<Value>
  <Index extends number, Value>(
    index: NonNegativeInteger<Index>,
    iterable: Iterable<Value>,
  ): Optional<Value>
}

/**
 * Returns an async iterable containing the value at the given `index` of
 * `asyncIterable` or an empty async iterable if `index` is out of bounds.
 *
 * WARNING: This function linearly iterates up to `index` because async
 * iterables do not support random access.
 *
 * @throws if `index` is not a non-negative integer.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     atAsync(1),
 *     getAsync,
 *   ),
 * )
 * //=> 'more sloth'
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const atAsync: {
  <Index extends number>(
    index: NonNegativeInteger<Index>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncOptional<Value>
  <Index extends number, Value>(
    index: NonNegativeInteger<Index>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
}

/**
 * Returns a concur iterable containing the value at the given `index` of
 * `concurIterable` in iteration order, or an empty concur iterable if `index`
 * is out of bounds.
 *
 * WARNING: This function linearly iterates up to `index` because concur
 * iterables do not support random access.
 *
 * @throws if `index` is not a non-negative integer.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([`sloth`, `more sloth`, `even more sloth`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     atConcur(1),
 *     getConcur,
 *   ),
 * )
 * //=> 'more sloth'
 * ```
 *
 * @category Splices
 * @since v3.5.0
 */
export const atConcur: {
  <Index extends number>(
    index: NonNegativeInteger<Index>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurOptional<Value>
  <Index extends number, Value>(
    index: NonNegativeInteger<Index>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
}

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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
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
 *
 * @category Splices
 * @since v2.0.0
 */
export type WindowOptions<Size extends number = number> =
  | PositiveInteger<Size>
  | Readonly<{
      /**
       * The size of each window. Must be a positive integer.
       *
       * @since v2.0.0
       */
      size: PositiveInteger<Size>

      /**
       * Whether the returned iterable should have partial windows at the start.
       * Defaults to `false`.
       *
       * @since v2.0.0
       */
      partialStart?: boolean

      /**
       * Whether the returned iterable should have partial windows at the end.
       * Defaults to `false`.
       *
       * @since v2.0.0
       */
      partialEnd?: boolean
    }>

/**
 * Returns an iterable that contains the values of each iterable in `iterables`
 * in iteration order.
 *
 * Like `Array.prototype.concat`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     concat([1, 2], [3, `sloth`, 5], [6, 7]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Splices
 * @since v0.0.2
 */
export const concat: <Value>(
  ...iterables: readonly Iterable<Value>[]
) => Iterable<Value>

/**
 * Returns an async iterable that contains the values of each iterable in
 * `iterables` in iteration order.
 *
 * Like `Array.prototype.concat`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     concatAsync(asAsync([1, 2]), [3, `sloth`, 5], asAsync([6, 7])),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Splices
 * @since v0.0.2
 */
export const concatAsync: <Value>(
  ...iterables: readonly (Iterable<Value> | AsyncIterable<Value>)[]
) => AsyncIterable<Value>

/**
 * Returns a concur iterable that contains the values of each iterable in
 * `iterables`.
 *
 * Like `Array.prototype.concat`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     concatConcur(asAsync([1, 2]), [3, `sloth`, 5], asConcur([6, 7])),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 1, 2, 3, 'sloth', 5, 6, 7 ]
 * ```
 *
 * @category Splices
 * @since v0.0.1
 */
export const concatConcur: <Value>(
  ...iterables: readonly (
    | Iterable<Value>
    | AsyncIterable<Value>
    | ConcurIterable<Value>
  )[]
) => ConcurIterable<Value>

/**
 * Returns an iterable that pairs up same-index values from the given
 * `iterables` into tuples.
 *
 * The `iterables` are iterated in parallel until the shortest one is done, at
 * which point the returned iterable is done.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     zip(
 *      [1, 2, 3, 4],
 *      [5, `sloth`, 7],
 *      [8, 9, 10],
 *     ),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 5, 8 ], [ 2, 'sloth', 9 ], [ 3, 7, 10 ] ]
 * ```
 *
 * @category Splices
 * @since v3.8.0
 */
export const zip: <Values extends unknown[] | []>(
  ...iterables: Readonly<{ [Key in keyof Values]: Iterable<Values[Key]> }>
) => Iterable<Values>

/**
 * Returns an async iterable that pairs up same-index values from the given
 * `iterables` into tuples.
 *
 * The `iterables` are iterated in parallel until the shortest one is done, at
 * which point the returned async iterable is done.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     zipAsync(
 *      asAsync([1, 2, 3, 4]),
 *      [5, `sloth`, 7],
 *      asAsync([8, 9, 10]),
 *     ),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 5, 8 ], [ 2, 'sloth', 9 ], [ 3, 7, 10 ] ]
 * ```
 *
 * @category Splices
 * @since v3.8.0
 */
export const zipAsync: <Values extends unknown[] | []>(
  ...iterables: Readonly<{
    [Key in keyof Values]: Iterable<Values[Key]> | AsyncIterable<Values[Key]>
  }>
) => AsyncIterable<Values>

/**
 * Returns a concur iterable that pairs up same-index values, in iteration
 * order, from the given `iterables` into tuples.
 *
 * The `iterables` are iterated in parallel until the shortest one is done, at
 * which point the returned concur iterable is done.
 *
 * WARNING: If one of the concur iterables yields values more quickly than
 * others, then an unbounded number of its values will be buffered so that they
 * can be yielded with the values of other concur iterables at the same index.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     zipConcur(
 *      asAsync([1, 2, 3, 4]),
 *      [5, `sloth`, 7],
 *      asConcur([8, 9, 10]),
 *     ),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ [ 1, 5, 8 ], [ 2, 'sloth', 9 ], [ 3, 7, 10 ] ]
 * ```
 *
 * @category Splices
 * @since v3.8.0
 */
export const zipConcur: <Values extends unknown[] | []>(
  ...iterables: Readonly<{
    [Key in keyof Values]:
      | Iterable<Values[Key]>
      | AsyncIterable<Values[Key]>
      | ConcurIterable<Values[Key]>
  }>
) => ConcurIterable<Values>
