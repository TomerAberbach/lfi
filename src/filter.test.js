import { fc, testProp } from 'ava-fast-check'
import { filter } from './filter.js'
import test from 'ava'

testProp(
  `filter filters`,
  [fc.array(fc.anything()), fc.func(fc.oneof(fc.anything(), fc.boolean()))],
  (t, array, fn) => {
    t.deepEqual(
      [...filter(fn, array)],
      array.filter(value => fn(value) === true)
    )
  }
)

testProp(
  `filter is lazy`,
  [fc.array(fc.anything()).filter(array => array.length > 0)],
  (t, array) => {
    t.plan(array.length + 1)

    let count = 0
    const iterable = filter(() => {
      count++
      return true
    }, array)
    t.is(count, 0)

    const iterator = iterable[Symbol.iterator]()
    for (let i = 0; i < array.length; i++) {
      iterator.next()
      t.is(count, i + 1)
    }
  }
)

test(`filter concrete example`, t => {
  const values = [1, 2, 3, 4, 5, 6]
  const filtered = [...filter(value => value % 2 === 0, values)]
  t.deepEqual(filtered, [2, 4, 6])
})
