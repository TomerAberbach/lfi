import { fc, testProp } from 'ava-fast-check'
import { filter } from '../src/index.js'
import { fnArb, iterableArb, testReturnsIterable } from './helpers.js'
import test from 'ava'

testReturnsIterable(filter, [fnArb(), iterableArb()])

testProp(
  `filter filters`,
  [fnArb({ valueArb: fc.oneof(fc.anything(), fc.boolean()) }), iterableArb()],
  (t, fn, iterable) => {
    t.deepEqual(
      [...filter(fn, iterable)],
      [...iterable].filter(value => fn(value) === true)
    )
  }
)

testProp(`filter is lazy`, [iterableArb()], (t, iterable) => {
  const array = [...iterable]
  t.plan(array.length + 1)

  let count = 0
  const iterator = filter(() => {
    count++
    return true
  }, array)[Symbol.iterator]()
  t.is(count, 0)

  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`filter concrete example`, t => {
  const values = [1, 2, 3, 4, 5, 6]

  const filtered = [...filter(value => value % 2 === 0, values)]

  t.deepEqual(filtered, [2, 4, 6])
})
