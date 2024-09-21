import type { ConcurIterable } from './as.js'

/**
 * Returns an iterable equivalent, but not referentially equal, to `iterable`.
 */
export const opaque: <Value>(iterable: Iterable<Value>) => Iterable<Value>

/**
 * Returns an async iterable equivalent, but not referentially equal, to
 * `asyncIterable`.
 */
export const opaqueAsync: <Value>(
  asyncIterable: AsyncIterable<Value>,
) => AsyncIterable<Value>

/**
 * Returns an concur iterable equivalent, but not referentially equal, to
 * `concurIterable`.
 */
export const opaqueConcur: <Value>(
  concurIterable: ConcurIterable<Value>,
) => ConcurIterable<Value>
