import test from 'ava'
import { fc, testProp } from 'ava-fast-check'
import { each, forEach } from './each.js'

testProp(
  `each returns an equivalent iterable`,
  [fc.array(fc.anything()), fc.func(fc.anything())],
  (t, array, fn) => {
    t.deepEqual([...each(fn, array)], array)
  }
)

testProp(
  `each calls the given function for each value in the iterable in the proper order`,
  [fc.array(fc.anything())],
  (t, array) => {
    const parameters = []

    // eslint-disable-next-line no-unused-expressions
    ;[...each(value => parameters.push(value), array)]

    t.deepEqual(parameters, array)
  }
)

testProp(`each is lazy`, [fc.array(fc.anything())], (t, array) => {
  t.plan(array.length + 1)

  let count = 0
  const iterable = each(() => count++, array)
  t.is(count, 0)

  const iterator = iterable[Symbol.iterator]()
  for (let i = 0; i < array.length; i++) {
    iterator.next()
    t.is(count, i + 1)
  }
})

test(`each concrete example`, t => {
  let count = 0

  // eslint-disable-next-line no-unused-expressions
  ;[...each(() => count++, [1, 2, 3])]

  t.is(count, 3)
})

testProp(
  `forEach returns undefined`,
  [fc.array(fc.anything()), fc.func(fc.anything())],
  (t, array, fn) => {
    t.is(forEach(fn, array), undefined)
  }
)

testProp(
  `forEach is eager and calls the given function for each value in the iterable in the proper order`,
  [fc.array(fc.anything())],
  (t, array) => {
    const parameters = []
    forEach(value => parameters.push(value), array)

    t.deepEqual(parameters, array)
  }
)

test(`forEach concrete example`, t => {
  let count = 0
  forEach(() => count++, [1, 2, 3])

  t.is(count, 3)
})
