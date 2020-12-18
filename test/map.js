import { fnArb, iterableArb, testReturnsIterable } from './helpers.js'
import { map } from '../src/index.js'
import { testProp } from 'ava-fast-check'
import test from 'ava'

testReturnsIterable(map, [fnArb(), iterableArb()])

testProp(`map maps`, [fnArb(), iterableArb()], (t, fn, iterable) => {
  t.deepEqual(
    [...map(fn, iterable)],
    [...iterable].map(value => fn(value))
  )
})

testProp(`map is lazy`, [iterableArb()], (t, iterable) => {
  const array = [...iterable]
  t.plan(array.length + 1)

  let count = 0
  const iterator = map(() => count++, iterable)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`map concrete example`, t => {
  const values = [1, 2, 3, 4, 5]

  const mapped = [...map(value => value * 2, values)]

  t.deepEqual(mapped, [2, 4, 6, 8, 10])
})
