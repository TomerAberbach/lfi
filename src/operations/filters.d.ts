import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optionals.js'

/**
 * Returns an iterable that contains the values of `iterable` in iteration order
 * excluding the values for which `fn` returns a falsy value.
 *
 * Like `Array.prototype.filter`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth party`, `building`, `sloths in trees`, `city`],
 *     filter(string => string.includes(`sloth`)),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filter: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (iterable: Iterable<From>) => Iterable<To>
  <From, To extends From>(
    fn: (value: From) => value is To,
    iterable: Iterable<From>,
  ): Iterable<To>

  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable that contains the values of `asyncIterable` in
 * iteration order excluding the values for which `fn` returns a value awaitable
 * to a falsy value.
 *
 * Like `Array.prototype.filter`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth party`, `building`, `sloths in trees`, `city`]),
 *     filterAsync(string => string.includes(`sloth`)),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterAsync: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<To>
  <From, To extends From>(
    fn: (value: From) => value is To,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<To>

  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable that contains the values of `concurIterable`
 * excluding the values for which `fn` returns a value awaitable to a falsy
 * value.
 *
 * Like `Array.prototype.filter`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth party`, `building`, `sloths in trees`, `city`]),
 *     filterConcur(string => string.includes(`sloth`)),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterConcur: {
  <From, To extends From>(
    fn: (value: From) => value is To,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<To>
  <From, To extends From>(
    fn: (value: From) => value is To,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<To>

  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` transformed by `fn`
 * in iteration order excluding the values for which `fn` returns `null` or
 * `undefined`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ],
 *     filterMap(object => object.sloth),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMap: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => To | null | undefined,
  ): (iterable: Iterable<From>) => Iterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => To | null | undefined,
    iterable: Iterable<From>,
  ): Iterable<NonNullable<To>>

  <From, To>(
    fn: (value: From) => To | null | undefined,
  ): (iterable: Iterable<From>) => Iterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => To | null | undefined,
    iterable: Iterable<From>,
  ): Iterable<NonNullable<To>>
}

/**
 * Returns an async iterable containing the values of `asyncIterable`
 * transformed by `fn` in iteration order excluding the values for which `fn`
 * returns a value awaitable to null or undefined.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ]),
 *     filterMapAsync(object => object.sloth),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMapAsync: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<NonNullable<To>>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (asyncIterable: AsyncIterable<From>) => AsyncIterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    asyncIterable: AsyncIterable<From>,
  ): AsyncIterable<NonNullable<To>>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`
 * transformed by `fn` excluding the values for which `fn` returns a value
 * awaitable to `null` or `undefined`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([
 *       { sloth: `sloth party` },
 *       { notSloth: `building` },
 *       { sloth: `sloths in trees` },
 *       { notSloth: `city` },
 *     ]),
 *     filterMapConcur(object => object.sloth),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth party', 'sloths in trees' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const filterMapConcur: {
  // These overloads help with inferring tuple types returned from the callback.
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<NonNullable<To>>
  <From, To extends unknown[] | []>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<NonNullable<To>>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
  ): (concurIterable: ConcurIterable<From>) => ConcurIterable<NonNullable<To>>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To | null | undefined>,
    concurIterable: ConcurIterable<From>,
  ): ConcurIterable<NonNullable<To>>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order
 * excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `sleep`, `fast`, `slow`, `mean`],
 *     exclude([`mean`, `fast`]),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
 */
export const exclude: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     excludeAsync([`mean`, `fast`]),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
 */
export const excludeAsync: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order excluding the values of `excluded`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     excludeConcur([`mean`, `fast`]),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'sleep', 'slow' ]
 * ```
 *
 * @category Filters
 * @since v2.0.0
 */
export const excludeConcur: {
  (
    excluded: Iterable<unknown>,
  ): <Value>(concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    excluded: Iterable<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order,
 * except values for which `fn` returns the same value are deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `sleep`, `fast`, `slow`, `mean`],
 *     uniqueBy(word => word.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const uniqueBy: {
  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Iterable<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Iterable<Value>
}

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order, except values for which `fn` returns a value awaitable to
 * the same value are deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     uniqueByAsync(word => word.length),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const uniqueByAsync: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncIterable<Value>
}

/**
 * Returns a concur iterable containing the values of `concurIterable`, except
 * values for which `fn` returns a value awaitable to the same value are
 * deduplicated.
 *
 * When values are deduplicated, the value earlier in iteration order wins.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `sleep`, `fast`, `slow`, `mean`]),
 *     uniqueByConcur(word => word.length),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'fast' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const uniqueByConcur: {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurIterable<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurIterable<Value>
}

/**
 * Returns an iterable containing the values of `iterable` in iteration order,
 * except values are deduplicated if they are equal using `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `not sloth`, `sloth`],
 *     unique,
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const unique: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable containing the values of `asyncIterable` in
 * iteration order, except values are deduplicated if they are equal using
 * `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `not sloth`, `sloth`]),
 *     uniqueAsync,
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const uniqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns a concur iterable containing the values of `concurIterable` in
 * iteration order, except values are deduplicated if they are equal using
 * `Object.is`.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `not sloth`, `sloth`]),
 *     uniqueConcur,
 *     reduceConcur(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'not sloth' ]
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const uniqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>

/** @internal */
type Find = {
  <Value>(
    fn: (value: Value) => unknown,
  ): (iterable: Iterable<Value>) => Optional<Value>
  <Value>(
    fn: (value: Value) => unknown,
    iterable: Iterable<Value>,
  ): Optional<Value>
}

/** @internal */
type FindAsync = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
}

/** @internal */
type FindConcur = {
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurOptional<Value>
  <Value>(
    fn: (value: Value) => MaybePromiseLike<unknown>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
}

/**
 * Returns an iterable containing the first value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * Like `Array.prototype.find`, but for iterables.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     find(value => typeof value === `string`),
 *     or(() => `yawn!`),
 *   )
 * )
 * //=> sloth
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     find(value => Array.isArray(value)),
 *     or(() => `yawn!`),
 *   )
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const find: Find

/**
 * Returns an async iterable containing the first value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * Like `Array.prototype.find`, but for async iterables.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findAsync(value => typeof value === `string`),
 *     orAsync(() => `yawn!`),
 *   )
 * )
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findAsync(value => Array.isArray(value)),
 *     orAsync(() => `yawn!`),
 *   )
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findAsync: FindAsync

/**
 * Returns a concur iterable containing the first value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * Like `Array.prototype.find`, but for concur iterables.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findConcur(value => typeof value === `string`),
 *     orConcur(() => `yawn`),
 *   ),
 * )
 * //=> sloth
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findConcur(value => Array.isArray(value)),
 *     orConcur(() => `yawn`),
 *   ),
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findConcur: FindConcur

/**
 * Returns an iterable containing the last value of `iterable` for which `fn`
 * returns a truthy value. Otherwise, returns an empty iterable.
 *
 * @example
 * ```js
 * const iterable = [1, 2, `sloth`, 4, `other string`]
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     findLast(value => typeof value === `string`),
 *     or(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   pipe(
 *     iterable,
 *     findLast(value => Array.isArray(value)),
 *     or(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findLast: Find

/**
 * Returns an async iterable containing the last value of `asyncIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty async iterable.
 *
 * @example
 * ```js
 * const asyncIterable = asAsync([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findLastAsync(value => typeof value === `string`),
 *     orAsync(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   await pipe(
 *     asyncIterable,
 *     findLastAsync(value => Array.isArray(value)),
 *     orAsync(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.1
 */
export const findLastAsync: FindAsync

/**
 * Returns a concur iterable containing the last value of `concurIterable` for
 * which `fn` returns a value awaitable to a truthy value. Otherwise, returns an
 * empty concur iterable.
 *
 * @example
 * ```js
 * const concurIterable = asConcur([1, 2, `sloth`, 4, `other string`])
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findLastConcur(value => typeof value === `string`),
 *     orConcur(() => `yawn!`),
 *   ),
 * )
 * //=> other string
 *
 * console.log(
 *   await pipe(
 *     concurIterable,
 *     findLastConcur(value => Array.isArray(value)),
 *     orConcur(() => `yawn!`),
 *   ),
 * )
 * //=> yawn!
 * ```
 *
 * @category Filters
 * @since v0.0.2
 */
export const findLastConcur: FindConcur
