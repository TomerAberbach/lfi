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

/**
 * A {@link Collector} that collects the values of an iterable to an array.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
 *   collectConcur(toArray)
 * )
 *
 * console.log(slothMemoirs)
 * //=> [ ..., ..., ... ] (an array containing the content of each file)
 * ```
 */
export const toArray: unique symbol

/**
 * A {@link Collector} that collects the values of an iterable to a set.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => fs.promises.readFile(filename, `utf8`)),
 *   collectConcur(toSet)
 * )
 *
 * console.log(slothMemoirs)
 * //=> Set(3) { ..., ..., ... } (a set containing the content of each file)
 * ```
 */
export const toSet: unique symbol

/**
 * A {@link Collector} that collects the values of an iterable to a weak set.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => {
 *     const content = await fs.promises.readFile(filename, `utf8`)
 *     return { filename, content }
 *   }),
 *   collectConcur(toWeakSet)
 * )
 *
 * console.log(slothMemoirs)
 * //=> WeakSet { <items unknown> } (a weak set containing the contents of each file)
 * ```
 */
export const toWeakSet: unique symbol

declare const ToObject: unique symbol

/**
 * A {@link MapCollector} that collects the key-value pairs of an iterable of
 * entries to an object.
 *
 * When there are multiple entries with the same key, the value of the last
 * entry collected wins.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => {
 *     const content = await fs.promises.readFile(filename, `utf8`)
 *     return [filename, content]
 *   }),
 *   collectConcur(toObject)
 * )
 *
 * console.log(slothMemoirs)
 * //=> (an object containing the name and content of each file)
 * // {
 * //   'my-sloth-story.txt': ...,
 * //   'lazy-sloth.txt': ...,
 * //   'tree-life.txt': ...
 * // }
 * ```
 */
export const toObject: typeof ToObject &
  (({ writable }: { writable: boolean }) => typeof ToObject)

/**
 * A {@link MapCollector} that collects the key-value pairs of an iterable of
 * entries to a map.
 *
 * When there are multiple entries with the same key, the value of the last
 * entry collected wins.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => {
 *     const content = await fs.promises.readFile(filename, `utf8`)
 *     return [filename, content]
 *   }),
 *   collectConcur(toMap)
 * )
 *
 * console.log(slothMemoirs)
 * //=> (a map containing the name and content of each file)
 * // Map(3) {
 * //   'my-sloth-story.txt' => ...,
 * //   'lazy-sloth.txt' => ...,
 * //   'tree-life.txt' => ...
 * // }
 * ```
 */
export const toMap: unique symbol

/**
 * A {@link MapCollector} that collects the key-value pairs of an iterable of
 * entries to a weak map.
 *
 * When there are multiple entries with the same key, the value of the last
 * entry collected wins.
 *
 * @example
 * ```js
 * const slothMemoirs = await pipe(
 *   asConcur([`my-sloth-story.txt`, `lazy-sloth.txt`, `tree-life.txt`]),
 *   mapConcur(filename => {
 *     const content = await fs.promises.readFile(filename, `utf8`)
 *     return [{}, content]
 *   }),
 *   collectConcur(toWeakMap)
 * )
 *
 * console.log(slothMemoirs)
 * //=> WeakMap { <items unknown> } (a weak map containing the content of each file)
 * ```
 */
export const toWeakMap: unique symbol

/** @internal */
type Folding<Acc, C extends MapCollector> = {
  readonly _: unique symbol
  acc: Acc
  mapCollector: C
}

/**
 * Returns a {@link Collector} that collects the key-value pairs of an iterable
 * of entries using `mapCollector`, but uses `lift` and `merge` to fold multiple
 * entries with the same key.
 *
 * As entries are collected, if the current entry's key has not been seen
 * before, then it is collected and its value is transformed using `lift`.
 * Otherwise, the existing value associated with the entry's key is merged with
 * the new entry's value using `merge`.
 *
 * @example
 * ```js
 * const slothFoodInventory = [
 *   [`leaves`, 3],
 *   [`twigs`, 5],
 *   [`fruit`, 2],
 *   [`leaves`, 10],
 *   [`twigs`, 11]
 * ]
 *
 * const foldedSlothFoodInventory = collect(
 *   folding(value => value, (acc, value) => acc + value, toMap),
 *   slothFoodInventory
 * )
 *
 * console.log(foldedSlothFoodInventory)
 * //=> (a map containing the folded inventory)
 * // Map(3) {
 * //   'leaves' => 13,
 * //   'twigs' => 16,
 * //   'fruit' => 2
 * // }
 * ```
 */
export const folding: {
  <Acc, Value>(lift: (value: Value) => Acc): {
    (merge: (acc: Acc, value: Value) => Acc): <C extends MapCollector>(
      mapCollector: C,
    ) => Folding<Acc, C>
    <C extends MapCollector>(
      merge: (acc: Acc, value: Value) => Acc,
      mapCollector: C,
    ): Folding<Acc, C>
  }
  <Acc, Value>(
    lift: (value: Value) => Acc,
    merge: (acc: Acc, value: Value) => Acc,
  ): <C extends MapCollector>(mapCollector: C) => Folding<Acc, C>
  <Acc, Value, C extends MapCollector>(
    lift: (value: Value) => Acc,
    merge: (acc: Acc, value: Value) => Acc,
    mapCollector: C,
  ): Folding<Acc, C>
}

/**
 * Returns a {@link Collector} that collects the key-value pairs of an iterable
 * of entries using `mapCollector` such that each key in the resulting
 * collection is mapped to the number of times it appeared in the iterable.
 *
 * @example
 * ```js
 * const slothDiaryEntries = [
 *   [`carl`, `slept`],
 *   [`phil`, `ate`],
 *   [`carl`, `climbed`],
 *   [`frank`, `ate`],
 *   [`frank`, `strolled`],
 *   [`carl`, `slept`]
 * ]
 *
 * const slothDiaryEntryCounts = collect(counting(toMap), slothDiaryEntries)
 *
 * console.log(slothDiaryEntryCounts)
 * //=> (a map containing the diary entry counts by sloth)
 * // Map(3) {
 * //   'carl' => 3,
 * //   'phil' => 1,
 * //   'frank' => 2
 * // }
 * ```
 */
export const counting: <C extends MapCollector>(
  mapCollector: C,
) => Folding<number, C>

/**
 * Returns a {@link Collector} that collects the key-value pairs of an iterable
 * of entries using `mapCollector` such that each key in the resulting
 * collection is mapped to a "group" containing the values of all entries with
 * that key. Each group is collected using `groupCollector`.
 *
 * @example
 * ```js
 * const slothDiaryEntries = [
 *   [`carl`, `slept`],
 *   [`phil`, `ate`],
 *   [`carl`, `climbed`],
 *   [`frank`, `ate`],
 *   [`frank`, `strolled`],
 *   [`carl`, `slept`]
 * ]
 *
 * const slothDiaryEntryGroups = collect(
 *   grouping(toArray, toMap),
 *   slothDiaryEntries
 * )
 *
 * console.log(slothDiaryEntryGroups)
 * //=> (a map containing the diary entry groups by sloth)
 * // Map(3) {
 * //   'carl' => [ 'slept', 'climbed', 'slept' ],
 * //   'phil' => [ 'ate' ],
 * //   'frank' => [ 'ate', 'strolled' ]
 * // }
 * ```
 */
export const grouping: {
  <GroupCollector extends Collector>(groupCollector: GroupCollector): <
    C extends MapCollector,
  >(
    mapCollector: C,
  ) => Folding<GroupCollector, C>
  <GroupCollector extends Collector, C extends MapCollector>(
    groupCollector: GroupCollector,
    mapCollector: C,
  ): Folding<GroupCollector, C>
}

/**
 * An object that specifies how to collect values of an iterable to some
 * collection.
 */
export type Collector =
  | typeof toArray
  | typeof toSet
  | typeof toWeakSet
  | MapCollector

/** @internal */
type CollectorToCollection<
  C extends Collector,
  Value,
> = C extends typeof toArray
  ? Array<Value>
  : C extends typeof toSet
  ? Set<Value>
  : C extends typeof toWeakSet
  ? Value extends object
    ? WeakSet<Value>
    : never
  : C extends MapCollector
  ? Value extends readonly [infer EntryKey, infer EntryValue]
    ? MapCollectorToCollection<C, EntryKey, EntryValue>
    : never
  : never

/**
 * An object that specifies how to collect an iterable of entries to some
 * (typically keyed) collection.
 */
export type MapCollector =
  | typeof ToObject
  | typeof toMap
  | typeof toWeakMap
  | Folding<any, any>

/** @internal */
type MapCollectorToCollection<
  C extends MapCollector,
  Key,
  Value,
> = C extends typeof ToObject
  ? Key extends keyof any
    ? Record<Key, Value>
    : never
  : C extends typeof toMap
  ? Map<Key, Value>
  : C extends typeof toWeakMap
  ? Key extends object
    ? WeakMap<Key, Value>
    : never
  : C extends Folding<infer Acc, infer InnerC>
  ? MapCollectorToCollection<
      InnerC,
      Key,
      Acc extends Collector ? CollectorToCollection<Acc, Value> : Acc
    >
  : never

/**
 * Returns a collection (collected by `collector`) containing the values of
 * `iterable` in iteration order.
 *
 * @example
 * ```js
 * function* getSloths(n) {
 *   for (let i = 0; i < n; i++) {
 *     yield `sloth ${i}`
 *   }
 * }
 *
 * console.log(collect(toSet, getSloths(4)))
 * //=> Set(4) { 'sloth 0', 'sloth 1', 'sloth 2', 'sloth 3'  }
 * ```
 */
export const collect: {
  <C extends Collector>(collector: C): <Value>(
    iterable: Iterable<Value>,
  ) => CollectorToCollection<C, Value>
  <C extends Collector, Value>(
    collector: C,
    iterable: Iterable<Value>,
  ): CollectorToCollection<C, Value>
}

/**
 * Returns a promise that resolves to a collection (collected by `collector`)
 * containing the values of `asyncIterable` in iteration order.
 *
 * @example
 * ```js
 * async function* getSlothFilenames() {
 *   const dir = await fs.promises.opendir(`./city-of-sloths`)
 *
 *   for await (const dirent await dir) {
 *     yield dirent.name
 *   }
 * }
 *
 * console.log(await collectAsync(toArray, getSlothFilenames()))
 * //=> [ ... ] (an array containing sloth filenames)
 * ```
 */
export const collectAsync: {
  <C extends Collector>(collector: C): <Value>(
    asyncIterable: AsyncIterable<Value>,
  ) => Promise<CollectorToCollection<C, Value>>
  <C extends Collector, Value>(
    collector: C,
    asyncIterable: AsyncIterable<Value>,
  ): Promise<CollectorToCollection<C, Value>>
}

/**
 * Returns a promise that resolves to a collection (collected by `collector`)
 * containing the values of `concurIterable`.
 *
 * @example
 * ```js
 * const slothFileContents = await pipe(
 *   asConcur(await fs.promises.opendir(`./city-of-sloths`)),
 *   filterConcur(dirent => dirent.isFile()),
 *   mapConcur(dirent => fs.promises.readFile(dirent.path, `utf8`)),
 *   collectConcur(toArray)
 * )
 *
 * console.log(slothFileContents)
 * //=> [ ... ] (an array containing sloth file contents)
 * ```
 */
export const collectConcur: {
  <C extends Collector>(collector: C): <Value>(
    concurIterable: ConcurIterable<Value>,
  ) => Promise<CollectorToCollection<C, Value>>
  <C extends Collector, Value>(
    collector: C,
    concurIterable: ConcurIterable<Value>,
  ): Promise<CollectorToCollection<C, Value>>
}
