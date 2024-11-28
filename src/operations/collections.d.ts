import type { ConcurIterable } from './core.js'
import type {
  FunctionReducer,
  OptionalReducer,
  RawKeyedReducer,
  RawOptionalReducerWithFinish,
  RawOptionalReducerWithoutFinish,
  RawReducerWithFinish,
  RawReducerWithoutFinish,
  Reducer,
} from './reducers.js'

/**
 * Returns a {@link Reducer} that collects values to an `Array`.
 *
 * @example
 * ```js playground
 * import { cycle, pipe, reduce, take, toArray } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `lazy`, `sleep`]),
 *     take(4),
 *     reduce(toArray()),
 *   ),
 * )
 * //=> [ 'sloth', 'lazy', 'sleep', 'sloth' ]
 * ```
 *
 * @category Collections
 * @since v0.0.1
 */
export const toArray: <Value>() => Reducer<Value, Value[]>

/**
 * Returns a {@link Reducer} that collects values to a `Set`.
 *
 * @example
 * ```js playground
 * import { cycle, pipe, reduce, take, toSet } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `lazy`, `sleep`]),
 *     take(4),
 *     reduce(toSet()),
 *   ),
 * )
 * //=> Set(3) {
 * //=>   'sloth',
 * //=>   'lazy',
 * //=>   'sleep'
 * //=> }
 * ```
 *
 * @category Collections
 * @since v0.0.1
 */
export const toSet: <Value>() => Reducer<Value, Set<Value>>

/**
 * Returns a {@link Reducer} that collects objects to a `WeakSet`.
 *
 * @example
 * ```js playground
 * import { cycle, map, pipe, reduce, take, toWeakSet } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     cycle([`sloth`, `lazy`, `sleep`]),
 *     take(4),
 *     map(string => ({ sloth: string })),
 *     reduce(toWeakSet()),
 *   ),
 * )
 * //=> WeakSet { <items unknown> }
 * ```
 *
 * @category Collections
 * @since v0.0.1
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
 * ```js playground
 * import { map, pipe, reduce, toObject } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => [string, string.length]),
 *     reduce(toObject()),
 *   ),
 * )
 * //=> {
 * //=>   sloth: 5,
 * //=>   lazy: 4,
 * //=>   sleep: 5
 * //=> }
 * ```
 *
 * @category Collections
 * @since v0.0.1
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
 * ```js playground
 * import { map, pipe, reduce, toMap } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => [string, string.length]),
 *     reduce(toMap()),
 *   ),
 * )
 * //=> Map(3) {
 * //=>   'sloth' => 5,
 * //=>   'lazy' => 4,
 * //=>   'sleep' => 5
 * //=> }
 * ```
 *
 * @category Collections
 * @since v0.0.1
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
 * ```js playground
 * import { map, pipe, reduce, toWeakMap } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => [{ sloth: string }, string.length]),
 *     reduce(toWeakMap()),
 *   ),
 * )
 * //=> WeakMap { <items unknown> }
 * ```
 *
 * @category Collections
 * @since v0.0.1
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
 * ```js playground
 * import { map, pipe, reduce, toArray, toGrouped, toMap } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toArray(), toMap())),
 *   ),
 * )
 * //=> Map(2) {
 * //=>   5 => [ 'sloth', 'sleep' ],
 * //=>   4 => [ 'lazy' ]
 * //=> }
 * ```
 *
 * @category Collections
 * @since v2.0.0
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
  <Value>(
    innerReducer: FunctionReducer<Value>,
  ): <Key, OuterAcc, OuterThis>(
    outerReducer: Readonly<RawKeyedReducer<Key, Value, OuterAcc, OuterThis>>,
  ) => Reducer<readonly [Key, Value], never, OuterAcc>
}

/**
 * Returns a {@link Reducer} or {@link OptionalReducer} that reduces values to
 * an object or array of the same shape as `reducers` using all of the reducers
 * in `reducers`.
 *
 * Returns an {@link OptionalReducer} if at least one of the input reducers is
 * an {@link OptionalReducer}. Otherwise, returns a {@link Reducer}.
 *
 * @example
 * ```js playground
 * import { map, pipe, reduce, toCount, toJoin, toMultiple, toSet } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => string.length),
 *     reduce(toMultiple([toSet(), toCount(), toJoin(`,`)])),
 *   ),
 * )
 * //=> [
 * //=>   Set(2) { 5, 4 },
 * //=>   3,
 * //=>   '5,4,5'
 * //=> ]
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
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
 * //=> {
 * //=>   set: Set(2) { 5, 4 },
 * //=>   count: 3,
 * //=>   string: '5,4,5'
 * //=> }
 * ```
 *
 * @category Collections
 * @since v2.0.0
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
 * ```js playground
 * import { map, pipe, reduce, toGrouped, toJoin, toMap } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => [string.length, string]),
 *     reduce(toGrouped(toJoin(`,`), toMap())),
 *   ),
 * )
 * //=> Map(2) {
 * //=>   5 => 'sloth,sleep',
 * //=>   4 => 'lazy'
 * //=> }
 * ```
 *
 * @category Collections
 * @since v2.0.0
 */
export const toJoin: (separator: string) => Reducer<unknown, unknown, string>

/**
 * Returns the string concatenation of the values of `iterable`, separated by
 * `separator`.
 *
 * Like `Array.prototype.join`, but for iterables, except it does not treat
 * `null`, `undefined`, or `[]` specially.
 *
 * @example
 * ```js playground
 * import { join, map, pipe } from 'lfi'
 *
 * console.log(
 *   pipe(
 *     [`sloth`, `lazy`, `sleep`],
 *     map(string => string.toUpperCase()),
 *     join(`, `),
 *   ),
 * )
 * //=> SLOTH, LAZY, SLEEP
 * ```
 *
 * @category Collections
 * @since v0.0.1
 */
export const join: {
  (separator: string): (iterable: Iterable<unknown>) => string
  (separator: string, iterable: Iterable<unknown>): string
}

/**
 * Returns a promise that resolves to the string concatenation of the values of
 * `asyncIterable`, separated by `separator`.
 *
 * Like `Array.prototype.join`, but for async iterables, except it does not
 * treat `null`, `undefined`, or `[]` specially.
 *
 * @example
 * ```js playground
 * import { asAsync, joinAsync, mapAsync, pipe } from 'lfi'
 *
 * const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en`
 *
 * console.log(
 *   await pipe(
 *     asAsync([`sloth`, `lazy`, `sleep`]),
 *     mapAsync(async word => {
 *       const response = await fetch(`${API_URL}/${word}`)
 *       return (await response.json())[0].phonetic
 *     }),
 *     joinAsync(`, `),
 *   ),
 * )
 * //=> /slɑθ/, /ˈleɪzi/, /sliːp/
 * ```
 *
 * @category Collections
 * @since v0.0.1
 */
export const joinAsync: {
  (
    separator: string,
  ): (asyncIterable: AsyncIterable<unknown>) => Promise<string>
  (separator: string, asyncIterable: AsyncIterable<unknown>): Promise<string>
}

/**
 * Returns a promise that resolves to the string concatenation of the values of
 * `concurIterable`, separated by `separator`.
 *
 * Like `Array.prototype.join`, but for concur iterables, except it does not
 * treat `null`, `undefined`, or `[]` specially.
 *
 * WARNING: The iteration order of concur iterables is not deterministic, so the
 * values will be concatenated in an arbitrary order.
 *
 * @example
 * ```js playground
 * import { asConcur, joinConcur, mapConcur, pipe } from 'lfi'
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
 *     joinConcur(`, `),
 *   ),
 * )
 * // NOTE: This order may change between runs
 * //=> /slɑθ/, /ˈleɪzi/, /sliːp/
 * ```
 *
 * @category Collections
 * @since v0.0.2
 */
export const joinConcur: {
  (
    separator: string,
  ): (concurIterable: ConcurIterable<unknown>) => Promise<string>
  (separator: string, concurIterable: ConcurIterable<unknown>): Promise<string>
}
