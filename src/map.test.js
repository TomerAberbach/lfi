import test from 'ava'
import { fc, testProp } from 'ava-fast-check'
import { map } from './map.js'

testProp(
  `map maps`,
  [fc.array(fc.anything()), fc.func(fc.anything())],
  (t, array, fn) => {
    t.deepEqual(
      [...map(fn, array)],
      array.map(value => fn(value))
    )
  }
)

testProp(`map is lazy`, [fc.array(fc.anything())], (t, array) => {
  t.plan(array.length + 1)

  let count = 0
  const iterable = map(() => count++, array)
  t.is(count, 0)

  const iterator = iterable[Symbol.iterator]()
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
