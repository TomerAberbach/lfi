import { createAsyncIterable, createIterable } from '../internal/helpers.js'

const result = { done: true }
const iterator = { next: () => result }
const asyncIterator = { next: () => Promise.resolve(result) }

export const empty = createIterable(() => iterator)
export const emptyAsync = createAsyncIterable(() => asyncIterator)
export const emptyConcur = () => Promise.resolve()
