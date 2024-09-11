import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './as.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optional.js'

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
 */
export const findLastConcur: FindConcur
