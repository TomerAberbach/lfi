import { expect, expectTypeOf, test } from 'vitest'
import autoAdvance from '../helpers/auto-advance.js'
import type { ConcurIterable } from '~/index.js'
import {
  empty,
  emptyAsync,
  emptyConcur,
  reduceAsync,
  reduceConcur,
  toArray,
} from '~/index.js'

test.skip(`empty types are correct`, () => {
  expectTypeOf(empty).toMatchTypeOf<Iterable<any>>()
  expectTypeOf(empty).toMatchTypeOf<Iterable<number>>()
  expectTypeOf(empty).toMatchTypeOf<Iterable<unknown>>()
})

test(`the empty iterable is empty`, () => {
  expect([...empty]).toBeEmpty()
})

test.skip(`emptyAsync types are correct`, () => {
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<any>>()
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<number>>()
  expectTypeOf(emptyAsync).toMatchTypeOf<AsyncIterable<unknown>>()
})

test(
  `the emptyAsync iterable is empty`,
  autoAdvance(async () => {
    await expect(reduceAsync(toArray(), emptyAsync)).resolves.toBeEmpty()
  }),
)

test.skip(`emptyConcur types are correct`, () => {
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<any>>()
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<number>>()
  expectTypeOf(emptyConcur).toMatchTypeOf<ConcurIterable<unknown>>()
})

test(
  `the emptyConcur iterable is empty`,
  autoAdvance(async () => {
    await expect(reduceConcur(toArray(), emptyConcur)).resolves.toBeEmpty()
  }),
)
