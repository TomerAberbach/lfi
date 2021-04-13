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
import { MaybePromiseLike } from './internal/types'

/**
 * Returns the accumulator (initially set to `initial`) after updating the
 * accumulator to the result of applying `fn` to the accumulator's current value
 * and each value in `iterable`.
 *
 * Like `Array.prototype.reduce` with an initial accumulator specified, but for
 * iterables.
 *
 * @example
 * ```js
 * const message = fold(
 *   (acc, string) => `${acc} ${string}`,
 *   `Hello`,
 *   [`World!`, `What`, `an`, `interesting`, `program!`]
 * )
 *
 * console.log(message)
 * //=> Hello World! What an interesting program!
 * ```
 */
export const fold: {
  <Acc, Value>(fn: (acc: Acc, value: Value) => Acc): {
    (initial: Acc): (iterable: Iterable<Value>) => Acc
    (initial: Acc, iterable: Iterable<Value>): Acc
  }
  <Acc, Value>(fn: (acc: Acc, value: Value) => Acc, initial: Acc): (
    iterable: Iterable<Value>
  ) => Acc
  <Acc, Value>(
    fn: (acc: Acc, value: Value) => Acc,
    initial: Acc,
    iterable: Iterable<Value>
  ): Acc
}

/**
 * Returns a promise that resolves to the accumulator (initially set to
 * `initial`) after updating the accumulator to the result, or resolved value of
 * the promise result, of applying `fn` to the accumulator's current value and
 * each value in `asyncIterable`.
 *
 * Like `Array.prototype.reduce` with an initial accumulator specified, but for
 * async iterables.
 *
 * @example
 * ```js
 * const message = await foldAsync(
 *    async (acc, string) => {
 *     await new Promise(resolve => setTimeout(resolve, 1000))
 *     return `${acc} ${string}`
 *   }
 *   `Hello`,
 *   asAsync([`World!`, `What`, `an`, `interesting`, `program!`])
 * )
 *
 * console.log(message)
 * //=> Hello World! What an interesting program!
 * ```
 */
export const foldAsync: {
  <Acc, Value>(fn: (acc: Acc, value: Value) => MaybePromiseLike<Acc>): {
    (initial: Acc): (asyncIterable: AsyncIterable<Value>) => Promise<Acc>
    (initial: Acc, asyncIterable: AsyncIterable<Value>): Promise<Acc>
  }
  <Acc, Value>(
    fn: (acc: Acc, value: Value) => MaybePromiseLike<Acc>,
    initial: Acc
  ): (asyncIterable: AsyncIterable<Value>) => Promise<Acc>
  <Acc, Value>(
    fn: (acc: Acc, value: Value) => MaybePromiseLike<Acc>,
    initial: Acc,
    asyncIterable: AsyncIterable<Value>
  ): Promise<Acc>
}

/**
 * Returns a promise that resolves once `concurIterable` is exhausted and the
 * collection of "available" values only contains one value. The promise
 * resolves to the only remaining available value.
 *
 * The collection of "available" initially contains only `initial`, but as
 * `concurIterable` is iterated, its values are placed in the collection.
 *
 * At the same time, whenever at least two values are "available", two values
 * are removed from the collection of available values and the awaited result of
 * applying `fn` to the two values is placed into the collection of available
 * values.
 *
 * This function will only return a deterministic result if `fn` is associative
 * and commutative.
 *
 * Like `Array.prototype.reduce` with an initial accumulator specified, but for
 * concur iterables.
 *
 * @example
 * ```js
 * const message = await foldConcur(
 *    async (acc, string) => {
 *     await new Promise(resolve => setTimeout(resolve, Math.random() * 1000))
 *     return `${acc} ${string}`
 *   }
 *   `Hello`,
 *   asConcur([`World!`, `What`, `an`, `interesting`, `program!`])
 * )
 *
 * console.log(message)
 * //=> Hello interesting World! What program! an
 * // (the words could end up in any order...)
 * ```
 */
export const foldConcur: {
  <Acc, Value>(fn: (acc: Acc | Value, value: Value) => MaybePromiseLike<Acc>): {
    (initial: Acc): (concurIterable: ConcurIterable<Value>) => Promise<Acc>
    (initial: Acc, concurIterable: ConcurIterable<Value>): Promise<Acc>
  }
  <Acc, Value>(
    fn: (acc: Acc | Value, value: Value) => MaybePromiseLike<Acc>,
    initial: Acc
  ): (concurIterable: ConcurIterable<Value>) => Promise<Acc>
  <Acc, Value>(
    fn: (acc: Acc | Value, value: Value) => MaybePromiseLike<Acc>,
    initial: Acc,
    concurIterable: ConcurIterable<Value>
  ): Promise<Acc>
}

/**
 * Returns an iterable containing the result of folding `iterable` with
 * {@link fold} using `fn` if `iterable` contains at least one value (its first
 * value is used for `initial`). Otherwise, returns an empty iterable.
 *
 * Like `Array.prototype.reduce` without an initial accumulator specified, but
 * for iterables.
 *
 * @example
 * ```js
 * const maybeMessage = reduce(
 *   (acc, string) => `${acc} ${string}`,
 *   [`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]
 * )
 *
 * console.log(get(maybeMessage))
 * //=> Hello World! What an interesting program!
 *
 * get(reduce(() => {}, []))
 * //=> Uncaught Error: Did not contain exactly one value
 * ```
 */
export const reduce: {
  <Acc, Value>(fn: (acc: Acc, value: Value) => Acc): (
    iterable: Iterable<Value>
  ) => Iterable<Value>
  <Acc, Value>(
    fn: (acc: Acc, value: Value) => Acc,
    iterable: Iterable<Value>
  ): Iterable<Acc>
}

/**
 * Returns an async iterable containing the result of folding `asyncIterable`
 * with {@link foldAsync} using `fn` if `asyncIterable` contains at least one
 * value (its first value is used for `initial`). Otherwise, returns an empty
 * async iterable.
 *
 * Like `Array.prototype.reduce` without an initial accumulator specified, but
 * for async iterables.
 *
 * @example
 * ```js
 * const maybeMessage = reduceAsync(
 *    async (acc, string) => {
 *     await new Promise(resolve => setTimeout(resolve, 1000))
 *     return `${acc} ${string}`
 *   },
 *   asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`])
 * )
 *
 * console.log(await getAsync(maybeMessage))
 * //=> Hello World! What an interesting program!
 *
 * getAsync(reduceAsync(() => {}, []))
 * //=> Uncaught Error: Did not contain exactly one value
 * ```
 */
export const reduceAsync: {
  <Acc, Value>(fn: (acc: Acc, value: Value) => MaybePromiseLike<Acc>): (
    asyncIterable: AsyncIterable<Value>
  ) => AsyncIterable<Value>
  <Acc, Value>(
    fn: (acc: Acc, value: Value) => MaybePromiseLike<Acc>,
    asyncIterable: AsyncIterable<Value>
  ): AsyncIterable<Acc>
}

/**
 * Returns a concur iterable containing the result of folding `concurIterable`
 * with {@link foldConcur} using `fn` if `concurIterable` contains at least one
 * value (its first value is used for `initial`). Otherwise, returns an empty
 * concur iterable.
 *
 * Like `Array.prototype.reduce` without an initial accumulator specified, but
 * for concur iterables.
 *
 * @example
 * ```js
 * const maybeMessage = reduceConcur(
 *    async (acc, string) => {
 *     await new Promise(resolve => setTimeout(resolve, Math.random() * 1000))
 *     return `${acc} ${string}`
 *   },
 *   asConcur([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`])
 * )
 *
 * console.log(await getConcur(maybeMessage))
 * //=> Hello interesting World! What program! an
 * // (the words could end up in any order...)
 *
 * getConcur(reduceConcur(() => {}, []))
 * //=> Uncaught Error: Did not contain exactly one value
 * ```
 */
export const reduceConcur: {
  <Acc, Value>(fn: (acc: Acc | Value, value: Value) => MaybePromiseLike<Acc>): (
    concurIterable: ConcurIterable<Value>
  ) => ConcurIterable<Value>
  <Acc, Value>(
    fn: (acc: Acc | Value, value: Value) => MaybePromiseLike<Acc>,
    concurIterable: ConcurIterable<Value>
  ): ConcurIterable<Acc>
}
