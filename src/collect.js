import { curry } from './curry.js'

export const toObject = curry(iterable => Object.fromEntries(iterable))

export const toArray = curry(iterable => Array.from(iterable))

export const toSet = curry(iterable => new Set(iterable))

export const toWeakSet = curry(iterable => new WeakSet(iterable))

export const toMap = curry(iterable => new Map(iterable))

export const toWeakMap = curry(iterable => new WeakMap(iterable))
