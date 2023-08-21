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
import type { MaybePromiseLike } from '../internal/types.js'

/**
 * A reducer that reduces by combining pairs of values using function
 * application.
 */
export type FunctionReducer<Value = unknown> = (
  acc: Value,
  value: Value,
) => Value

/**
 * A reducer that reduces by combining pairs of values using
 * {@link RawOptionalReducerWithoutFinish.add}.
 */
export type RawOptionalReducerWithoutFinish<Value = unknown, This = unknown> = {
  add: (this: This, acc: Value, value: Value) => Value
}

/**
 * A reducer that reduces by combining pairs of values using
 * {@link RawOptionalReducerWithFinish.add} and then tranforming the final value
 * using {@link RawOptionalReducerWithFinish.finish}.
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
 * {@link OptionalReducer.add} and then tranforming the final value using
 * {@link OptionalReducer.finish}.
 */
export type OptionalReducer<
  Value = unknown,
  Finished = Value,
> = RawOptionalReducerWithFinish<Value, Finished>

/**
 * A reducer that reduces by creating an initial accumulator using
 * {@link RawReducerWithoutFinish.create} and then adding values to the
 * accumulator values using {@link RawReducerWithoutFinish.add}.
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
 * {@link RawReducerWithFinish.create}, then adding values to the accumulator
 * values using {@link RawReducerWithFinish.add}, and then tranforming the final
 * accumulator using {@link RawReducerWithFinish.finish}.
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
 * {@link Reducer.create}, then adding values to the accumulator values using
 * {@link Reducer.add}, and then tranforming the final accumulator using
 * {@link Reducer.finish}.
 */
export type Reducer<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
> = RawReducerWithFinish<Value, Acc, Finished>

/**
 * A keyed reducer that reduces by creating an initial accumulator using
 * {@link RawKeyedReducer.create} and then adding key-value pairs to the
 * accumulator values using {@link RawKeyedReducer.add}. The accumulator can be
 * queried for values by key using {@link RawKeyedReducer.get}.
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
 * {@link KeyedReducer.create} and then adding key-value pairs to the
 * accumulator values using {@link KeyedReducer.add}. The accumulator can be
 * queried for values by key using {@link KeyedReducer.get}.
 */
export type KeyedReducer<
  Key = unknown,
  Value = unknown,
  Acc = [Key, Value],
> = RawKeyedReducer<Key, Value, Acc>

/**
 * An async reducer that reduces by combining pairs of values using function
 * application.
 */
export type AsyncFunctionReducer<Value = unknown> = (
  acc: Value,
  value: Value,
) => MaybePromiseLike<Value>

/**
 * An async reducer that reduces by combining pairs of values using
 * {@link RawAsyncOptionalReducerWithoutFinish.add}.
 */
export type RawAsyncOptionalReducerWithoutFinish<
  Value = unknown,
  This = unknown,
> = {
  add: (this: This, acc: Value, value: Value) => MaybePromiseLike<Value>
}

/**
 * An async reducer that reduces by combining pairs of values using
 * {@link RawAsyncOptionalReducerWithFinish.add} and then tranforming the final
 * value using {@link RawAsyncOptionalReducerWithFinish.finish}.
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
 * {@link AsyncOptionalReducer.add} and then tranforming the final value using
 * {@link AsyncOptionalReducer.finish}.
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
 * {@link RawAsyncReducerWithFinish.create}, then adding values to the
 * accumulator values using {@link RawAsyncReducerWithFinish.add}, and then
 * tranforming the final accumulator using
 * {@link RawAsyncReducerWithFinish.finish}. The async
 * reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncReducerWithFinish.combine}.
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
 * {@link AsyncReducer.create}, then adding values to the accumulator values
 * using {@link AsyncReducer.add}, and then tranforming the final accumulator
 * using {@link AsyncReducer.finish}. The async reducer is optionally able to
 * combine pairs of accumulators using {@link AsyncReducer.combine}.
 */
export type AsyncReducer<
  Value = unknown,
  Acc = Value,
  Finished = Acc,
> = RawAsyncReducerWithFinish<Value, Acc, Finished>

/**
 * An async keyed reducer that reduces by creating an initial accumulator using
 * {@link RawAsyncKeyedReducer.create} and then adding key-value pairs to the
 * accumulator values using {@link RawAsyncKeyedReducer.add}. The async keyed
 * reducer is optionally able to combine pairs of accumulators using
 * {@link RawAsyncKeyedReducer.combine}. The accumulator can be queried for
 * values by key using {@link RawAsyncKeyedReducer.get}.
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
 * {@link AsyncKeyedReducer.create} and then adding key-value pairs to the
 * accumulator values using {@link AsyncKeyedReducer.add}. The async keyed
 * reducer is optionally able to combine pairs of accumulators using
 * {@link AsyncKeyedReducer.combine}. The accumulator can be queried for values
 * by key using {@link AsyncKeyedReducer.get}.
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
 */
export const NO_ENTRY: unique symbol

/**
 * Returns a {@link Reducer} or {@link OptionalReducer} equivalent to `reducer`
 * except its final value is transformed using `fn`.
 */
export const mapReducer: {
  <Value, Acc, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawReducerWithFinish<Value, Acc, From, This>>,
  ): Reducer<Value, Acc, To>
  <From, To>(fn: (value: From) => To): <Value, Acc, This>(
    reducer: Readonly<RawReducerWithFinish<Value, Acc, From, This>>,
  ) => Reducer<Value, Acc, To>

  <Value, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawReducerWithoutFinish<Value, From, This>>,
  ): Reducer<Value, To>
  <From, To>(fn: (value: From) => To): <Value, This>(
    reducer: Readonly<RawReducerWithoutFinish<Value, From, This>>,
  ) => Reducer<Value, To>

  <Value, From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawOptionalReducerWithFinish<Value, From, This>>,
  ): OptionalReducer<Value, To>
  <From, To>(fn: (value: From) => To): <Value, This>(
    reducer: Readonly<RawOptionalReducerWithFinish<Value, From, This>>,
  ) => OptionalReducer<Value, To>

  <From, To, This>(
    fn: (value: From) => To,
    reducer: Readonly<RawOptionalReducerWithoutFinish<From, This>>,
  ): OptionalReducer<To>
  <From, To>(fn: (value: From) => To): <This>(
    reducer: Readonly<RawOptionalReducerWithoutFinish<From, This>>,
  ) => OptionalReducer<To>

  <From, To>(
    fn: (value: From) => To,
    reducer: FunctionReducer<From>,
  ): OptionalReducer<To>
  <From, To>(fn: (value: From) => To): (
    reducer: FunctionReducer<From>,
  ) => OptionalReducer<To>
}

/**
 * Returns an {@link AsyncReducer} equivalent to `reducer` except its final
 * value is transformed using `fn`.
 */
export const mapAsyncReducer: {
  <Value, Acc, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncReducerWithFinish<Value, Acc, From, This>>,
  ): AsyncReducer<Value, Acc, To>
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): <Value, Acc, This>(
    asyncReducer: Readonly<RawAsyncReducerWithFinish<Value, Acc, From, This>>,
  ) => AsyncReducer<Value, Acc, To>

  <Value, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncReducerWithoutFinish<Value, From, This>>,
  ): AsyncReducer<Value, To>
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): <Value, This>(
    asyncReducer: Readonly<RawAsyncReducerWithoutFinish<Value, From, This>>,
  ) => AsyncReducer<Value, To>

  <Value, From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<
      RawAsyncOptionalReducerWithFinish<Value, From, This>
    >,
  ): AsyncOptionalReducer<Value, To>
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): <Value, This>(
    asyncReducer: Readonly<
      RawAsyncOptionalReducerWithFinish<Value, From, This>
    >,
  ) => AsyncOptionalReducer<Value, To>

  <From, To, This>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: Readonly<RawAsyncOptionalReducerWithoutFinish<From, This>>,
  ): AsyncOptionalReducer<To>
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): <This>(
    asyncReducer: Readonly<RawAsyncOptionalReducerWithoutFinish<From, This>>,
  ) => AsyncOptionalReducer<To>

  <From, To>(
    fn: (value: From) => MaybePromiseLike<To>,
    asyncReducer: AsyncFunctionReducer<From>,
  ): AsyncOptionalReducer<To>
  <From, To>(fn: (value: From) => MaybePromiseLike<To>): (
    asyncReducer: AsyncFunctionReducer<From>,
  ) => AsyncOptionalReducer<To>
}

/** Returns a non-raw version of `reducer`. */
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
