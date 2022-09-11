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

import type { ConcurIterable } from './as.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optional.js'
import type {
  AsyncFunctionReducer,
  FunctionReducer,
  RawAsyncOptionalReducerWithFinish,
  RawAsyncOptionalReducerWithoutFinish,
  RawAsyncReducerWithFinish,
  RawAsyncReducerWithoutFinish,
  RawOptionalReducerWithFinish,
  RawOptionalReducerWithoutFinish,
  RawReducerWithFinish,
  RawReducerWithoutFinish,
} from './reducer.js'

/**
 * Returns the result of reducing `iterable` using `reducer`.
 *
 * An initial accumulator is created using {@link Reducer.create}. Then each
 * value in `iterable` is added to the accumulator and the current accumulator
 * is updated using {@link Reducer.add}. Finally, the resulting accumulator is
 * transformed using {@link Reducer.finish} if specified.
 *
 * If `reducer` is an optional reducer (no {@link Reducer.create} method), then
 * an empty iterable is returned if `iterable` is empty. Otherwise, an iterable
 * containing the result of reducing using the first value of the iterable as
 * the initial accumulator is returned.
 *
 * Like `Array.prototype.reduce`, but for iterables.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
 *     reduce((a, b) => `${a} ${b}`),
 *     get,
 *   ),
 * )
 * //=> Hello Sloth! What an interesting program!
 *
 * console.log(
 *   pipe(
 *     [`Hello`, `Sloth!`, `What`, `an`, `interesting`, `program!`],
 *     reduce({ create: () => ``, add: (a, b) => `${a} ${b}` }),
 *   ),
 * )
 * //=> Hello Sloth! What an interesting program!
 * ```
 */
export const reduce: {
  <Value, Acc, Finished, This>(
    reducer: RawReducerWithFinish<Value, Acc, Finished, This>,
    iterable: Iterable<Value>,
  ): Finished
  <Value, Acc, Finished, This>(
    reducer: RawReducerWithFinish<Value, Acc, Finished, This>,
  ): (iterable: Iterable<Value>) => Finished

  <Value, Acc, This>(
    reducer: RawReducerWithoutFinish<Value, Acc, This>,
    iterable: Iterable<Value>,
  ): Acc
  <Value, Acc, This>(reducer: RawReducerWithoutFinish<Value, Acc, This>): (
    iterable: Iterable<Value>,
  ) => Acc

  <Value, Finished, This>(
    reducer: RawOptionalReducerWithFinish<Value, Finished, This>,
    iterable: Iterable<Value>,
  ): Optional<Finished>
  <Value, Finished, This>(
    reducer: RawOptionalReducerWithFinish<Value, Finished, This>,
  ): (iterable: Iterable<Value>) => Optional<Finished>

  <Value, This>(
    reducer: RawOptionalReducerWithoutFinish<Value, This>,
    iterable: Iterable<Value>,
  ): Optional<Value>
  <Value, This>(reducer: RawOptionalReducerWithoutFinish<Value, This>): (
    iterable: Iterable<Value>,
  ) => Optional<Value>

  <Value>(
    reducer: FunctionReducer<Value>,
    iterable: Iterable<Value>,
  ): Optional<Value>
  <Value>(reducer: FunctionReducer<Value>): (
    iterable: Iterable<Value>,
  ) => Optional<Value>
}

/**
 * Returns the result of reducing the `asyncIterable` using `asyncReducer`.
 *
 * Informally, an initial accumulator is created using
 * {@link AsyncReducer.create}. Then each value in `asyncIterable` is added to
 * the accumulator and the current accumulator is updated using
 * {@link AsyncReducer.add}. Finally, the resulting accumulator is transformed
 * using {@link AsyncReducer.finish} if specified. Multiple accumulators may be
 * created, added to, and then combined if supported via
 * {@link AsyncReducer.combine} and the next value of `asyncIterable` is ready
 * before promises from {@link AsyncReducer.add} resolve.
 *
 * If `asyncReducer` is an async optional reducer (no
 * {@link AsyncReducer.create} method), then an empty async iterable is returned
 * if `asyncIterable` is empty. Otherwise, an async iterable containing the
 * result of reducing using the first value of the async iterable as the initial
 * accumulator is returned.
 *
 * Like `Array.prototype.reduce`, but for async iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
 *     reduceAsync((a, b) => `${a} ${b}`),
 *     getAsync,
 *   ),
 * )
 * //=> Hello World! What an interesting program!
 *
 * console.log(
 *   await pipe(
 *     asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
 *     reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
 *   ),
 * )
 * //=> Hello World! What an interesting program!
 * ```
 */
export const reduceAsync: {
  <Value, Acc, Finished, This>(
    asyncReducer:
      | RawAsyncReducerWithFinish<Value, Acc, Finished, This>
      | RawReducerWithFinish<Value, Acc, Finished, This>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<Finished>
  <Value, Acc, Finished, This>(
    asyncReducer:
      | RawAsyncReducerWithFinish<Value, Acc, Finished, This>
      | RawReducerWithFinish<Value, Acc, Finished, This>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<Finished>

  <Value, Acc, This>(
    asyncReducer:
      | RawAsyncReducerWithoutFinish<Value, Acc, This>
      | RawReducerWithoutFinish<Value, Acc, This>,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<Acc>
  <Value, Acc, This>(
    asyncReducer:
      | RawAsyncReducerWithoutFinish<Value, Acc, This>
      | RawReducerWithoutFinish<Value, Acc, This>,
  ): (asyncIterable: AsyncIterable<Value>) => Promise<Acc>

  <Value, Finished, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithFinish<Value, Finished, This>
      | RawOptionalReducerWithFinish<Value, Finished, This>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Finished>
  <Value, Finished, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithFinish<Value, Finished, This>
      | RawOptionalReducerWithFinish<Value, Finished, This>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncOptional<Finished>

  <Value, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithoutFinish<Value, This>
      | RawOptionalReducerWithoutFinish<Value, This>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
  <Value, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithoutFinish<Value, This>
      | RawOptionalReducerWithoutFinish<Value, This>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncOptional<Value>

  <Value>(
    asyncReducer: AsyncFunctionReducer<Value> | FunctionReducer<Value>,
    asyncIterable: AsyncIterable<Value>,
  ): AsyncOptional<Value>
  <Value>(asyncReducer: AsyncFunctionReducer<Value> | FunctionReducer<Value>): (
    asyncIterable: AsyncIterable<Value>,
  ) => AsyncOptional<Value>
}

/**
 * Returns the result of reducing the `concurIterable` using `asyncReducer`.
 *
 * Informally, an initial accumulator is created using
 * {@link AsyncReducer.create}. Then each value in `concurIterable` is added to
 * the accumulator and the current accumulator is updated using
 * {@link AsyncReducer.add}. Finally, the resulting accumulator is transformed
 * using {@link AsyncReducer.finish} if specified. Multiple accumulators may be
 * created, added to, and then combined if supported via
 * {@link AsyncReducer.combine} and the next value of `concurIterable` is ready
 * before promises from {@link AsyncReducer.add} resolve.
 *
 * If `asyncReducer` is an async optional reducer (no
 * {@link AsyncReducer.create} method), then an empty concur iterable is
 * returned if `concurIterable` is empty. Otherwise, an concur iterable
 * containing the result of reducing using the first value of the concur
 * iterable as the initial accumulator is returned.
 *
 * Like `Array.prototype.reduce`, but for concur iterables.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
 *     reduceAsync((a, b) => `${a} ${b}`),
 *     getAsync,
 *   ),
 * )
 * //=> Hello World! What an interesting program!
 *
 * console.log(
 *   await pipe(
 *     asAsync([`Hello`, `World!`, `What`, `an`, `interesting`, `program!`]),
 *     reduceAsync({ create: () => ``, add: (a, b) => `${a} ${b}` }),
 *   ),
 * )
 * //=> Hello World! What an interesting program!
 * ```
 */
export const reduceConcur: {
  <Value, Acc, Finished, This>(
    asyncReducer:
      | RawAsyncReducerWithFinish<Value, Acc, Finished, This>
      | RawReducerWithFinish<Value, Acc, Finished, This>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<Finished>
  <Value, Acc, Finished, This>(
    asyncReducer:
      | RawAsyncReducerWithFinish<Value, Acc, Finished, This>
      | RawReducerWithFinish<Value, Acc, Finished, This>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<Finished>

  <Value, Acc, This>(
    asyncReducer:
      | RawAsyncReducerWithoutFinish<Value, Acc, This>
      | RawReducerWithoutFinish<Value, Acc, This>,
    concurIterable: ConcurIterable<Value>,
  ): Promise<Acc>
  <Value, Acc, This>(
    asyncReducer:
      | RawAsyncReducerWithoutFinish<Value, Acc, This>
      | RawReducerWithoutFinish<Value, Acc, This>,
  ): (concurIterable: ConcurIterable<Value>) => Promise<Acc>

  <Value, Finished, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithFinish<Value, Finished, This>
      | RawOptionalReducerWithFinish<Value, Finished, This>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Finished>
  <Value, Finished, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithFinish<Value, Finished, This>
      | RawOptionalReducerWithFinish<Value, Finished, This>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurOptional<Finished>

  <Value, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithoutFinish<Value, This>
      | RawOptionalReducerWithoutFinish<Value, This>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
  <Value, This>(
    asyncReducer:
      | RawAsyncOptionalReducerWithoutFinish<Value, This>
      | RawOptionalReducerWithoutFinish<Value, This>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurOptional<Value>

  <Value>(
    asyncReducer: FunctionReducer<Value> | AsyncFunctionReducer<Value>,
    concurIterable: ConcurIterable<Value>,
  ): ConcurOptional<Value>
  <Value>(asyncReducer: AsyncFunctionReducer<Value> | FunctionReducer<Value>): (
    concurIterable: ConcurIterable<Value>,
  ) => ConcurOptional<Value>
}
