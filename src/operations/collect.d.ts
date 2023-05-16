/**
 * Copyright 2022 Google LLC
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
import type {
  FunctionReducer,
  OptionalReducer,
  RawKeyedReducer,
  RawOptionalReducerWithFinish,
  RawOptionalReducerWithoutFinish,
  RawReducerWithFinish,
  RawReducerWithoutFinish,
  Reducer,
} from './reducer.js'

/**
 * Returns a {@link Reducer} that collects values to an `Array`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `more sloth`]),
 *     take(4),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'more sloth', 'sloth', 'more sloth' ]
 * ```
 */
export const toArray: <Value>() => Reducer<Value, Value[]>

/**
 * Returns a {@link Reducer} that collects values to a `Set`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `more sloth`]),
 *     take(4),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> Set(2) { 'sloth', 'more sloth' }
 * ```
 */
export const toSet: <Value>() => Reducer<Value, Set<Value>>

/**
 * Returns a {@link Reducer} that collects objects to a `WeakSet`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `more sloth`]),
 *     take(4),
 *     map(string => ({ sloth: string })),
 *     reduce(toWeakSet()),
 *   ),
 * )
 * //=> WeakSet { <items unknown> }
 * ```
 */
export const toWeakSet: <Value extends object>() => Reducer<
  Value,
  WeakSet<Value>
>

/**
 * Returns a {@link KeyedReducer} that collects key-value pairs to an object.
 *
 * In the case of pairs with duplicate keys, the value of the last one wins.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     map(string => [string, string.length]),
 *     reduce(toObject()),
 *   ),
 * )
 * //=> { sloth: 5, 'more sloth': 10, 'even more sloth': 15 }
 * ```
 */
export const toObject: <Key extends keyof never, Value>() => RawKeyedReducer<
  Key,
  Value,
  Record<Key, Value>
>

/**
 * Returns a {@link KeyedReducer} that collects key-value pairs to a `Map`.
 *
 * In the case of pairs with duplicate keys, the value of the last one wins.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     map(string => [string, string.length]),
 *     reduce(toMap()),
 *   ),
 * )
 * //=> Map(3) { 'sloth' => 5, 'more sloth' => 10, 'even more sloth' => 15 }
 * ```
 */
export const toMap: <Key, Value>() => RawKeyedReducer<
  Key,
  Value,
  Map<Key, Value>
>

/**
 * Returns a {@link KeyedReducer} that collects key-value pairs to a `WeakMap`.
 *
 * In the case of pairs with duplicate keys, the value of the last one wins.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     map(string => [{ sloth: string }, string.length]),
 *     reduce(toWeakMap()),
 *   ),
 * )
 * //=> WeakMap { <items unknown> }
 * ```
 */
export const toWeakMap: <Key extends object, Value>() => RawKeyedReducer<
  Key,
  Value,
  WeakMap<Key, Value>
>

/**
 * Returns a {@link Reducer} that reduces key-value pairs using `outerReducer`
 * and reduces values with the same key using `innerReducer`.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toArray(), toMap())),
 *   ),
 * )
 * //=> Map(3) {
 * //=>   5 => [ 'sloth', 'sleep' ],
 * //=>   10 => [ 'some sloth', 'more sloth' ],
 * //=>   15 => [ 'even more sloth' ]
 * //=> }
 * ```
 */
export const toGrouped: {
  <Key, Value, InnerAcc, InnerFinished, InnerThis, OuterAcc, OuterThis>(
    innerReducer: Readonly<
      RawReducerWithFinish<Value, InnerAcc, InnerFinished, InnerThis>
    >,
    outerReducer: Readonly<
      RawKeyedReducer<Key, InnerAcc | InnerFinished, OuterAcc, OuterThis>
    >,
  ): Reducer<readonly [Key, Value], never, OuterAcc>
  <Value, InnerAcc, InnerFinished, InnerThis>(
    innerReducer: Readonly<
      RawReducerWithFinish<Value, InnerAcc, InnerFinished, InnerThis>
    >,
  ): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<
      RawKeyedReducer<Key, InnerAcc | InnerFinished, OuterAcc, OuterThis>
    >,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>

  <Key, Value, InnerAcc, InnerThis, OuterAcc, OuterThis>(
    innerReducer: Readonly<RawReducerWithoutFinish<Value, InnerAcc, InnerThis>>,
    outerReducer: Readonly<RawKeyedReducer<Key, InnerAcc, OuterAcc, OuterThis>>,
  ): Reducer<readonly [Key, Value], never, OuterAcc>
  <Value, InnerAcc, InnerThis>(
    innerReducer: Readonly<RawReducerWithoutFinish<Value, InnerAcc, InnerThis>>,
  ): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<RawKeyedReducer<Key, InnerAcc, OuterAcc, OuterThis>>,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>

  <Key, Value, InnerFinished, InnerThis, OuterAcc, OuterThis>(
    innerReducer: Readonly<
      RawOptionalReducerWithFinish<Value, InnerFinished, InnerThis>
    >,
    outerReducer: Readonly<
      RawKeyedReducer<Key, Value | InnerFinished, OuterAcc, OuterThis>
    >,
  ): Reducer<readonly [Key, Value], never, OuterAcc>
  <Value, InnerFinished, InnerThis>(
    innerReducer: Readonly<
      RawOptionalReducerWithFinish<Value, InnerFinished, InnerThis>
    >,
  ): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<
      RawKeyedReducer<Key, Value | InnerFinished, OuterAcc, OuterThis>
    >,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>

  <Key, Value, InnerThis, OuterAcc, OuterThis>(
    innerReducer: Readonly<RawOptionalReducerWithoutFinish<Value, InnerThis>>,
    outerReducer: Readonly<RawKeyedReducer<Key, Value, OuterAcc, OuterThis>>,
  ): Reducer<readonly [Key, Value], never, OuterAcc>
  <Value, InnerThis>(
    innerReducer: Readonly<RawOptionalReducerWithoutFinish<Value, InnerThis>>,
  ): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<RawKeyedReducer<Key, Value, OuterAcc, OuterThis>>,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>

  <Key, Value, OuterAcc, OuterThis>(
    innerReducer: FunctionReducer<Value>,
    outerReducer: Readonly<RawKeyedReducer<Key, Value, OuterAcc, OuterThis>>,
  ): Reducer<readonly [Key, Value], never, OuterAcc>
  <Value>(innerReducer: FunctionReducer<Value>): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<RawKeyedReducer<Key, Value, OuterAcc, OuterThis>>,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>
}

/* eslint-disable typescript/no-explicit-any */
/**
 * Returns a {@link Reducer} or {@link OptionalReducer} that reduces values to
 * an object or array of the same shape as `reducers` using all of the reducers
 * in `reducers`.
 *
 * Returns an {@link OptionalReducer} if at least one of the input reducers is
 * an {@link OptionalReducer}. Otherwise, returns a {@link Reducer}.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
 *     map(string => string.length),
 *     reduce(toMultiple([toSet(), toCount(), toJoin(`,`)])),
 *   ),
 * )
 * //=> [ Set(3) { 5, 10, 15 }, 5, '5,10,5,10,15' ]
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `some sloth`, `sleep`, `more sloth`, `even more sloth`],
 *     map(string => string.length),
 *     reduce(
 *       toMultiple({
 *         set: toSet(),
 *         count: toCount(),
 *         string: toJoin(`,`),
 *       }),
 *     ),
 *   ),
 * )
 * //=> { set: Set(3) { 5, 10, 15 }, count: 5, string: '5,10,5,10,15' }
 * ```
 */
export const toMultiple: {
  <
    Value,
    Reducers extends
      | readonly [RawReducerWithoutFinish<Value, any>]
      | readonly RawReducerWithoutFinish<Value, any>[]
      | Readonly<Record<keyof never, RawReducerWithoutFinish<Value, any>>>,
  >(
    reducers: Reducers,
  ): Reducer<
    Value,
    {
      -readonly [Key in keyof Reducers]: Reducers[Key] extends RawReducerWithoutFinish<
        Value,
        infer Acc
      >
        ? Acc
        : never
    },
    {
      -readonly [Key in keyof Reducers]: Reducers[Key] extends RawReducerWithFinish<
        Value,
        any,
        infer Finished
      >
        ? Finished
        : Reducers[Key] extends RawReducerWithoutFinish<Value, infer Acc>
        ? Acc
        : never
    }
  >

  <
    Value,
    Reducers extends
      | readonly [
          | RawReducerWithoutFinish<Value, any>
          | RawOptionalReducerWithoutFinish<Value>
          | FunctionReducer<Value>,
        ]
      | readonly (
          | RawReducerWithoutFinish<Value, any>
          | RawOptionalReducerWithoutFinish<Value>
          | FunctionReducer<Value>
        )[]
      | Readonly<
          Record<
            keyof never,
            | RawReducerWithoutFinish<Value, any>
            | RawOptionalReducerWithoutFinish<Value>
            | FunctionReducer<Value>
          >
        >,
  >(
    reducers: Reducers,
  ): OptionalReducer<
    Value,
    {
      -readonly [Key in keyof Reducers]: Reducers[Key] extends RawReducerWithFinish<
        Value,
        any,
        infer Finished
      >
        ? Finished
        : Reducers[Key] extends RawOptionalReducerWithFinish<
            Value,
            infer Finished
          >
        ? Finished
        : Value
    }
  >
}
/* eslint-enable typescript/no-explicit-any */

/**
 * Returns a {@link Reducer} that concatenates values to a string where values
 * are separated by `separator`.
 *
 * Joins like `Array.prototype.join`, but does not treat `null`, `undefined`,
 * or `[]` specially.
 *
 * Use when composing reducers. Prefer {@link join}, {@link joinAsync}, and
 * {@link joinConcur} for direct use on iterables.
 *
 * @example
 * ```
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `sleep`, `some sloth`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toJoin(`,`), toMap())),
 *   ),
 * )
 * //=> Map(2) { 5 => 'sloth,sleep', 10 => 'more sloth,some sloth' }
 * ```
 */
export const toJoin: (
  separator: string,
) => Reducer<unknown, unknown | string, string>

/**
 * Returns the result of concatenating the values of `iterable` to a string
 * where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for iterables, but does not treat `null`,
 * `undefined`, or `[]` specially.
 *
 * @example
 * ```js
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     join(`, `),
 *   ),
 * )
 * //=> sloth, more sloth, even more sloth
 * ```
 */
export const join: {
  (separator: string): (iterable: Iterable<unknown>) => string
  (separator: string, iterable: Iterable<unknown>): string
}

/**
 * Returns a promise that resolves to the result of concatenating the values of
 * `asyncIterable` to a string where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for async iterables, but does not treat
 * `null`, `undefined`, or `[]` specially.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `more sloth`, `even more sloth`]),
 *     joinAsync(`, `),
 *   ),
 * )
 * //=> sloth, more sloth, even more sloth
 * ```
 */
export const joinAsync: {
  (separator: string): (
    asyncIterable: AsyncIterable<unknown>,
  ) => Promise<string>
  (separator: string, asyncIterable: AsyncIterable<unknown>): Promise<string>
}

/**
 * Returns a promise that resolves to the result of concatenating the values of
 * `concurIterable` to a string where values are separated by `separator`.
 *
 * Like `Array.prototype.join`, but for concur iterables, but does not treat
 * `null`, `undefined`, or `[]` specially.
 *
 * @example
 * ```js
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `more sloth`, `even more sloth`]),
 *     joinConcur(`, `),
 *   ),
 * )
 * //=> sloth, more sloth, even more sloth
 * ```
 */
export const joinConcur: {
  (separator: string): (
    concurIterable: ConcurIterable<unknown>,
  ) => Promise<string>
  (separator: string, concurIterable: ConcurIterable<unknown>): Promise<string>
}

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
 */
export const concatConcur: <Value>(
  ...iterables: readonly (
    | Iterable<Value>
    | AsyncIterable<Value>
    | ConcurIterable<Value>
  )[]
) => ConcurIterable<Value>
