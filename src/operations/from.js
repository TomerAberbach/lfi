import { createIterable } from '../internal/helpers.js'

const iterable = name => object =>
  createIterable(() =>
    (object[name]?.() ?? Object[name](object))[Symbol.iterator](),
  )

export const keys = iterable(`keys`)

export const values = iterable(`values`)

export const entries = iterable(`entries`)
