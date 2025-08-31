import type { MaybePromiseLike } from '../internal/types.js'
import type { ConcurIterable } from './core.js'
import type { AsyncOptional, ConcurOptional, Optional } from './optionals.js'

/**
 * A reducer that reduces by combining pairs of values using function
 * application.
 *
 * @example
 * ```js playground
 * import { or, pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This is a `FunctionReducer`
 *       (number1, number2) => number1 + number2,
 *     ),
 *     or(() => 0),
 *   ),
 * )
 * //=> 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type FunctionReducer<Value = unknown> = (
  acc: Value,
  value: Value,
) => Value

/**
 * A reducer that reduces by combining pairs of values using
 * {@link RawOptionalReducerWithoutFinish.add}.
 *
 * @example
 * ```js playground
 * import { or, pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This is a `RawOptionalReducerWithoutFinish`
 *       {
 *         add: (number1, number2) => number1 + number2,
 *       },
 *     ),
 *     or(() => 0),
 *   ),
 * )
 * //=> 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawOptionalReducerWithoutFinish<Value = unknown, This = unknown> = {
  add: (this: This, acc: Value, value: Value) => Value
}

/**
 * A reducer that reduces by combining pairs of values using
 * {@link RawOptionalReducerWithoutFinish.add} and then transforming the final
 * value using {@link RawOptionalReducerWithFinish.finish}.
 *
 * @example
 * ```js playground
 * import { or, pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This is a `RawOptionalReducerWithFinish`
 *       {
 *         add: (number1, number2) => number1 + number2,
 *         finish: sum => `The sum is ${sum}`,
 *       },
 *     ),
 *     or(() => `There are no numbers`),
 *   ),
 * )
 * //=> The sum is 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawOptionalReducerWithFinish<
  Value = unknown,
  Finished = Value,
  This = unknown,
> = RawOptionalReducerWithoutFinish<Value, This> & {
  finish: (this: This, acc: Value) => Finished
}

/**
 * A reducer that reduces by combining pairs of values using
 * {@link RawOptionalReducerWithoutFinish.add} and then transforming the final
 * value using {@link RawOptionalReducerWithFinish.finish}.
 *
 * It's identical to {@link RawOptionalReducerWithFinish} except its `this` is
 * bound by {@link normalizeReducer}.
 *
 * @example
 * ```js playground
 * import { or, pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This will be an `OptionalReducer` once it's normalized by `reduce`
 *       {
 *         add: (number1, number2) => number1 + number2,
 *         finish: sum => `The sum is ${sum}`,
 *       },
 *     ),
 *     or(() => `There are no numbers`),
 *   ),
 * )
 * //=> The sum is 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type OptionalReducer<
  Value = unknown,
  Finished = Value,
> = RawOptionalReducerWithFinish<Value, Finished>

/**
 * A reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create} and then adding values to the
 * accumulator values using {@link RawReducerWithoutFinish.add}.
 *
 * @example
 * ```js playground
 * import { pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This is a `RawReducerWithoutFinish`
 *       {
 *         create: () => 0,
 *         add: (number1, number2) => number1 + number2,
 *       },
 *     ),
 *   ),
 * )
 * //=> 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawReducerWithoutFinish<
  Value = unknown,
  Acc = Value,
  This = unknown,
> = {
  create: (this: This) => Acc
  add: (this: This, acc: Acc, value: Value) => Acc
}

/**
 * A reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create}, then adding values to the accumulator
 * values using {@link RawReducerWithoutFinish.add}, and then transforming the
 * final accumulator using {@link RawReducerWithFinish.finish}.
 *
 * @example
 * ```js playground
 * import { pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This is a `RawReducerWithFinish`
 *       {
 *         create: () => 0,
 *         add: (number1, number2) => number1 + number2,
 *         finish: sum => `The sum is ${sum}`,
 *       },
 *     ),
 *   ),
 * )
 * //=> The sum is 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawReducerWithFinish<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
  This = unknown,
> = RawReducerWithoutFinish<Value, Acc, This> & {
  finish: (this: This, acc: Acc) => Finished
}

/**
 * A reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create}, then adding values to the accumulator
 * values using {@link RawReducerWithoutFinish.add}, and then transforming the
 * final accumulator using {@link RawReducerWithFinish.finish}.
 *
 * It's identical to {@link RawReducerWithFinish} except its `this` is bound by
 * {@link normalizeReducer}.
 *
 * @example
 * ```js playground
 * import { pipe, reduce } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [1, 2, 3, 4],
 *     reduce(
 *       // This will be a `Reducer` once it's normalized by `reduce`
 *       {
 *         create: () => 0,
 *         add: (number1, number2) => number1 + number2,
 *         finish: sum => `The sum is ${sum}`,
 *       },
 *     ),
 *   ),
 * )
 * //=> The sum is 10
 * ```
 *
 * @category Reducers
 * @since v2.0.0
 */
export type Reducer<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
> = RawReducerWithFinish<Value, Acc, Finished>

/**
 * A keyed reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create} and then adding key-value pairs to the
 * accumulator values using {@link RawReducerWithoutFinish.add}. The accumulator can be
 * queried for values by key using {@link RawKeyedReducer.get}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawKeyedReducer<
  Key = unknown,
  Value = unknown,
  Acc = [Key, Value],
  This = unknown,
> = RawReducerWithoutFinish<readonly [Key, Value], Acc, This> & {
  get: (this: This, acc: Acc, key: Key) => Value | typeof NO_ENTRY
}

/**
 * A keyed reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create} and then adding key-value pairs to the
 * accumulator values using {@link RawReducerWithoutFinish.add}. The accumulator
 * can be queried for values by key using {@link RawKeyedReducer.get}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type KeyedReducer<
  Key = unknown,
  Value = unknown,
  Acc = [Key, Value],
> = RawKeyedReducer<Key, Value, Acc>

/**
 * An async reducer that reduces by combining pairs of values using function
 * application.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type AsyncFunctionReducer<Value = unknown> = (
  acc: Value,
  value: Value,
) => MaybePromiseLike<Value>

/**
 * An async reducer that reduces by combining pairs of values using
 * {@link RawAsyncOptionalReducerWithoutFinish.add}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawAsyncOptionalReducerWithoutFinish<
  Value = unknown,
  This = unknown,
> = {
  add: (this: This, acc: Value, value: Value) => MaybePromiseLike<Value>
}

/**
 * An async reducer that reduces by combining pairs of values using
 * {@link RawAsyncOptionalReducerWithoutFinish.add} and then transforming the
 * final value using {@link RawAsyncOptionalReducerWithFinish.finish}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawAsyncOptionalReducerWithFinish<
  Value = unknown,
  Finished = Value,
  This = unknown,
> = RawAsyncOptionalReducerWithoutFinish<Value, This> & {
  finish: (this: This, acc: Value) => MaybePromiseLike<Finished>
}

/**
 * An async reducer that reduces by combining pairs of values using
 * {@link RawAsyncOptionalReducerWithoutFinish.add} and then transforming the
 * final value using {@link RawAsyncOptionalReducerWithFinish.finish}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type AsyncOptionalReducer<
  Value = unknown,
  Finished = Value,
> = RawAsyncOptionalReducerWithFinish<Value, Finished>

/**
 * An async reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncReducerWithoutFinish.create} and then adding values to the
 * accumulator values using {@link RawAsyncReducerWithoutFinish.add}. The async
 * reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithoutFinish.combine}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawAsyncReducerWithoutFinish<
  Value = unknown,
  Acc = Value,
  This = unknown,
> = {
  create: (this: This) => MaybePromiseLike<Acc>
  add: (this: This, acc: Acc, value: Value) => MaybePromiseLike<Acc>
  combine?: (this: This, acc1: Acc, acc2: Acc) => MaybePromiseLike<Acc>
}

/**
 * An async reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncReducerWithoutFinish.create}, then adding values to the
 * accumulator values using {@link RawAsyncReducerWithoutFinish.add}, and then
 * transforming the final accumulator using
 * {@link RawAsyncReducerWithFinish.finish}. The async
 * reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithoutFinish.combine}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawAsyncReducerWithFinish<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
  This = unknown,
> = RawAsyncReducerWithoutFinish<Value, Acc, This> & {
  finish: (this: This, acc: Acc) => MaybePromiseLike<Finished>
}

/**
 * An async reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncReducerWithoutFinish.create}, then adding values to the
 * accumulator values using {@link RawAsyncReducerWithoutFinish.add}, and then
 * transforming the final accumulator using
 * {@link RawAsyncReducerWithFinish.finish}. The async reducer is optionally
 * able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithoutFinish.combine}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type AsyncReducer<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
> = RawAsyncReducerWithFinish<Value, Acc, Finished>

/**
 * An async keyed reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncReducerWithoutFinish.create} and then adding key-value pairs
 * to the accumulator values using {@link RawAsyncReducerWithoutFinish.add}. The
 * async keyed reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithoutFinish.combine}. The accumulator can be queried
 * for values by key using {@link RawAsyncKeyedReducer.get}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type RawAsyncKeyedReducer<
  Key = unknown,
  Value = unknown,
  Acc = [Key, Value],
  This = unknown,
> = RawAsyncReducerWithoutFinish<readonly [Key, Value], Acc, This> & {
  get: (
    this: This,
    acc: Acc,
    key: Key,
  ) => MaybePromiseLike<Value | typeof NO_ENTRY>
}

/**
 * An async keyed reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncReducerWithoutFinish.create} and then adding key-value pairs
 * to the accumulator values using {@link RawAsyncReducerWithoutFinish.add}. The
 * async keyed reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithoutFinish.combine}. The accumulator can be queried
 * for values by key using {@link RawAsyncKeyedReducer.get}.
 *
 * @category Reducers
 * @since v2.0.0
 */
export type AsyncKeyedReducer<
  Key = unknown,
  Value = unknown,
  Acc = [Key, Value],
> = RawAsyncKeyedReducer<Key, Value, Acc>

/**
 * A unique value representing the lack of an entry for some key in a
 * {@link KeyedReducer} or {@link AsyncKeyedReducer}.
 *
 * Keyed reducers use this instead of `null` or `undefined` because they are
 * valid values. Furthermore, introducing a `has` method for the purpose of
 * disambiguation would be less performant due to the need to perform the lookup
 * twice when the entry exists: `has` followed by `get` for the same key.
 *
 * @category Reducers
 * @since v2.0.0
 */
export const NO_ENTRY: unique symbol

/**
 * Returns a {@link Reducer} or {@link OptionalReducer} equivalent to `reducer`
 * except its final value is transformed using `fn`.
 *
 * @category Reducers
 * @since v2.0.0
 */
export const mapReducer: {
  <Value, Acc, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawReducerWithFinish<Value, Acc, From, This>>,
  ): Reducer<Value, Acc, To>
  <From, To>(
    fn: (value: From) => To,
  ): <Value, Acc, This>(
    reducer: Readonly<RawReducerWithFinish<Value, Acc, From, This>>,
  ) => Reducer<Value, Acc, To>

  <Value, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawReducerWithoutFinish<Value, From, This>>,
  ): Reducer<Value, To>
  <From, To>(
    fn: (value: From) => To,
  ): <Value, This>(
    reducer: Readonly<RawReducerWithoutFinish<Value, From, This>>,
  ) => Reducer<Value, To>

  <Value, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawOptionalReducerWithFinish<Value, From, This>>,
  ): OptionalReducer<Value, To>
  <From, To>(
    fn: (value: From) => To,
  ): <Value, This>(
    reducer: Readonly<RawOptionalReducerWithFinish<Value, From, This>>,
  ) => OptionalReducer<Value, To>

  <From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawOptionalReducerWithoutFinish<From, This>>,
  ): OptionalReducer<To>
  <From, To>(
    fn: (value: From) => To,
  ): <This>(
    reducer: Readonly<RawOptionalReducerWithoutFinish<From, This>>,
  ) => OptionalReducer<To>

  <From, To>(
    fn: (value: From) => To,
    reducer: FunctionReducer<From>,
  ): OptionalReducer<To>
  <From, To>(
    fn: (value: From) => To,
  ): (reducer: FunctionReducer<From>) => OptionalReducer<To>
}

/**
 * Returns an {@link AsyncReducer} equivalent to `reducer` except its final
 * value is transformed using `fn`.
 *
 * @category Reducers
 * @since v2.0.0
 */
export const mapAsyncReducer: {
  <Value, Acc, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncReducerWithFinish<Value, Acc, From, This>>,
  ): AsyncReducer<Value, Acc, To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): <Value, Acc, This>(
    asyncReducer: Readonly<RawAsyncReducerWithFinish<Value, Acc, From, This>>,
  ) => AsyncReducer<Value, Acc, To>

  <Value, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncReducerWithoutFinish<Value, From, This>>,
  ): AsyncReducer<Value, To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): <Value, This>(
    asyncReducer: Readonly<RawAsyncReducerWithoutFinish<Value, From, This>>,
  ) => AsyncReducer<Value, To>

  <Value, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<
      RawAsyncOptionalReducerWithFinish<Value, From, This>
    >,
  ): AsyncOptionalReducer<Value, To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): <Value, This>(
    asyncReducer: Readonly<
      RawAsyncOptionalReducerWithFinish<Value, From, This>
    >,
  ) => AsyncOptionalReducer<Value, To>

  <From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncOptionalReducerWithoutFinish<From, This>>,
  ): AsyncOptionalReducer<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): <This>(
    asyncReducer: Readonly<RawAsyncOptionalReducerWithoutFinish<From, This>>,
  ) => AsyncOptionalReducer<To>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: AsyncFunctionReducer<From>,
  ): AsyncOptionalReducer<To>
  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
  ): (asyncReducer: AsyncFunctionReducer<From>) => AsyncOptionalReducer<To>
}

/**
 * Returns a non-raw version of `reducer`.
 *
 * @category Reducers
 * @since v2.0.0
 */
export const normalizeReducer: {
  <Key, Value, Acc, This>(
    reducer: Readonly<RawKeyedReducer<Key, Value, Acc, This>>,
  ): KeyedReducer<Key, Value, Acc>
  <Value, Acc, Finished, This>(
    reducer: Readonly<RawReducerWithFinish<Value, Acc, Finished, This>>,
  ): Reducer<Value, Acc, Finished>
  <Value, Acc, This>(
    reducer: Readonly<RawReducerWithoutFinish<Value, Acc, This>>,
  ): Reducer<Value, Acc>
  <Value, Finished, This>(
    reducer: Readonly<RawOptionalReducerWithFinish<Value, Finished, This>>,
  ): OptionalReducer<Value, Finished>
  <Value, This>(
    reducer: Readonly<RawOptionalReducerWithoutFinish<Value, This>>,
  ): OptionalReducer<Value>
  <Value>(reducer: FunctionReducer<Value>): OptionalReducer<Value>

  <Key, Value, Acc, This>(
    reducer: Readonly<RawAsyncKeyedReducer<Key, Value, Acc, This>>,
  ): AsyncKeyedReducer<Key, Value, Acc>
  <Value, Acc, Finished, This>(
    reducer: Readonly<RawAsyncReducerWithFinish<Value, Acc, Finished, This>>,
  ): AsyncReducer<Value, Acc, Finished>
  <Value, Acc, This>(
    reducer: Readonly<RawAsyncReducerWithoutFinish<Value, Acc, This>>,
  ): AsyncReducer<Value, Acc>
  <Value, Finished, This>(
    reducer: Readonly<RawAsyncOptionalReducerWithFinish<Value, Finished, This>>,
  ): AsyncOptionalReducer<Value, Finished>
  <Value, This>(
    reducer: Readonly<RawAsyncOptionalReducerWithoutFinish<Value, This>>,
  ): AsyncOptionalReducer<Value>
  <Value>(reducer: AsyncFunctionReducer<Value>): AsyncOptionalReducer<Value>
}

/**
 * Returns the result of reducing `iterable` using `reducer`.
 *
 * An initial accumulator is created using
 * {@link RawReducerWithoutFinish.create}. Then each value in `iterable` is
 * added to the accumulator and the current accumulator is updated using
 * {@link RawReducerWithoutFinish.add}. Finally, the resulting accumulator is
 * transformed using {@link RawReducerWithFinish.finish} if specified.
 *
 * If `reducer` is an optional reducer (no
 * {@link RawReducerWithoutFinish.create} method), then an empty iterable is
 * returned if `iterable` is empty. Otherwise, an iterable containing the result
 * of reducing using the first value of the iterable as the initial accumulator
 * is returned.
 *
 * Like `Array.prototype.reduce`, but for iterables.
 *
 * @example
 * ```js playground
 * console.log(
 *   pipe(
 *     [`sloth`, `more sloth`, `even more sloth`],
 *     map(string => string.length),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 5, 10, 15 ]
 * ```
 *
 * @category Reducers
 * @since v0.0.1
 */
export const reduce: {
  <Value, Acc, Finished, This>(
    reducer: Readonly<RawReducerWithFinish<Value, Acc, Finished, This>>,
    iterable: Iterable<Value>,
  ): Finished
  <Value, Acc, Finished, This>(
    reducer: Readonly<RawReducerWithFinish<Value, Acc, Finished, This>>,
  ): (iterable: Iterable<Value>) => Finished

  <Value, Acc, This>(
    reducer: Readonly<RawReducerWithoutFinish<Value, Acc, This>>,
    iterable: Iterable<Value>,
  ): Acc
  <Value, Acc, This>(
    reducer: Readonly<RawReducerWithoutFinish<Value, Acc, This>>,
  ): (iterable: Iterable<Value>) => Acc

  <Value, Finished, This>(
    reducer: Readonly<RawOptionalReducerWithFinish<Value, Finished, This>>,
    iterable: Iterable<Value>,
  ): Optional<Finished>
  <Value, Finished, This>(
    reducer: Readonly<RawOptionalReducerWithFinish<Value, Finished, This>>,
  ): (iterable: Iterable<Value>) => Optional<Finished>

  <Value, This>(
    reducer: Readonly<RawOptionalReducerWithoutFinish<Value, This>>,
    iterable: Iterable<Value>,
  ): Optional<Value>
  <Value, This>(
    reducer: Readonly<RawOptionalReducerWithoutFinish<Value, This>>,
  ): (iterable: Iterable<Value>) => Optional<Value>

  <Value>(
    reducer: FunctionReducer<Value>,
    iterable: Iterable<Value>,
  ): Optional<Value>
  <Value>(
    reducer: FunctionReducer<Value>,
  ): (iterable: Iterable<Value>) => Optional<Value>
}

/**
 * Returns the result of reducing the `asyncIterable` using `asyncReducer`.
 *
 * Informally, an initial accumulator is created using
 * {@link RawAsyncReducerWithoutFinish.create}. Then each value in
 * `asyncIterable` is added to the accumulator and the current accumulator is
 * updated using {@link RawAsyncReducerWithoutFinish.add}. Finally, the
 * resulting accumulator is transformed using
 * {@link RawAsyncReducerWithFinish.finish} if specified. Multiple accumulators
 * may be created, added to, and then combined if supported via
 * {@link RawAsyncReducerWithoutFinish.combine} and the next value of
 * `asyncIterable` is ready before promises from
 * {@link RawAsyncReducerWithoutFinish.add} resolve.
 *
 * If `asyncReducer` is an async optional reducer (no
 * {@link RawAsyncReducerWithoutFinish.create} method), then an empty async
 * iterable is returned if `asyncIterable` is empty. Otherwise, an async
 * iterable containing the result of reducing using the first value of the async
 * iterable as the initial accumulator is returned.
 *
 * Like `Array.prototype.reduce`, but for async iterables.
 *
 * @example
 * ```js playground
 * import { asAsync, mapAsync, pipe, reduceAsync, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 * await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     mapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceAsync(toArray()),
 *   ),
 * )
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Reducers
 * @since v0.0.1
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
  <Value>(
    asyncReducer: AsyncFunctionReducer<Value> | FunctionReducer<Value>,
  ): (asyncIterable: AsyncIterable<Value>) => AsyncOptional<Value>
}

/**
 * Returns the result of reducing the `concurIterable` using `asyncReducer`.
 *
 * The resulting promise or concur iterable rejects if `concurIterable` rejects.
 *
 * Informally, an initial accumulator is created using
 * {@link RawAsyncReducerWithoutFinish.create}. Then each value in
 * `concurIterable` is added to the accumulator and the current accumulator is
 * updated using {@link RawAsyncReducerWithoutFinish.add}. Finally, the
 * resulting accumulator is transformed using
 * {@link RawAsyncReducerWithFinish.finish} if specified. Multiple accumulators
 * may be created, added to, and then combined if supported via
 * {@link RawAsyncReducerWithoutFinish.combine} and the next value of
 * `concurIterable` is ready before promises from
 * {@link RawAsyncReducerWithoutFinish.add} resolve.
 *
 * If `asyncReducer` is an async optional reducer (no
 * {@link RawAsyncReducerWithoutFinish.create} method), then an empty concur
 * iterable is returned if `concurIterable` is empty. Otherwise, an concur
 * iterable containing the result of reducing using the first value of the
 * concur iterable as the initial accumulator is returned.
 *
 * Like `Array.prototype.reduce`, but for concur iterables.
 *
 * @example
 * ```js playground
 * import { asConcur, mapConcur, pipe, reduceConcur, toArray } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asConcur([`sloth`, `lazy`, `sleep`]),
 *     mapConcur(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     reduceConcur(toArray()),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> [ '/slɑθ/', '/ˈleɪzi/', '/sliːp/' ]
 * ```
 *
 * @category Reducers
 * @since v0.0.1
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
  <Value>(
    asyncReducer: AsyncFunctionReducer<Value> | FunctionReducer<Value>,
  ): (concurIterable: ConcurIterable<Value>) => ConcurOptional<Value>
}
