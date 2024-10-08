/**
 * Returns an iterable containing the keys of `object`.
 *
 * This differs from `Map.prototype.keys` in that the returned iterable can be
 * iterated multiple times and differs from `Object.keys` in that the returned
 * iterable is opaque.
 */
export const keys: {
  <Key>(object: ReadonlyMap<Key, unknown>): Iterable<Key>
  <Key extends keyof never>(
    object: Readonly<Record<Key, unknown>>,
  ): Iterable<Key>
}

/**
 * Returns an iterable containing the values of `object`.
 *
 * This differs from `Map.prototype.values` and `Set.prototype.values` in that
 * the returned iterable can be iterated multiple times and differs from
 * `Object.values` in that the returned iterable is opaque.
 */
export const values: <Value>(
  object:
    | ReadonlyMap<unknown, Value>
    | ReadonlySet<Value>
    | Readonly<Record<keyof never, Value>>,
) => Iterable<Value>

/**
 * Returns an iterable containing the entries of `object`.
 *
 * This differs from `Map.prototype.entries` in that the returned iterable can
 * be iterated multiple times and differs from `Object.entries` in that the
 * returned iterable is opaque.
 */
export const entries: {
  <Key, Value>(object: {
    entries: () => Iterable<[Key, Value]>
  }): Iterable<[Key, Value]>
  <Key extends keyof never, Value>(
    object: Readonly<Record<Key, Value>>,
  ): Iterable<[Key, Value]>
}
