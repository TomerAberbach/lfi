import test from 'ava'
import { testProp, fc } from 'ava-fast-check'
import functionWithLength from './function-with-length.js'
import curry from './curry.js'

const functionWithLengthArb = length =>
  fc.func(fc.anything()).map(fn => functionWithLength(fn, length))

const functionAndInputArb = () =>
  fc
    .array(fc.anything())
    .filter(array => array.length > 0)
    .chain(array =>
      fc.tuple(functionWithLengthArb(array.length), fc.clonedConstant(array))
    )

testProp(
  `curry does not modify the given function`,
  [functionAndInputArb()],
  (t, [fn, inputs]) => {
    const resultBeforeCurry = fn(...inputs)

    const curried = curry(fn)
    t.not(curried, fn)

    const resultAfterCurry = fn(...inputs)
    t.deepEqual(resultAfterCurry, resultBeforeCurry)
  }
)

function* partitions(array) {
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      const start = array.slice(0, i + 1)
      const end = array.slice(i + 1)

      for (const partition of partitions(end)) {
        yield [start].concat(partition)
      }
    }
  } else {
    yield []
  }
}

testProp(
  `curry curries the given function if its length is greater than zero`,
  [functionAndInputArb()],
  (t, [fn, inputs]) => {
    const curried = curry(fn)

    t.plan(2 ** (inputs.length - 1))

    for (const partition of partitions(inputs)) {
      t.deepEqual(
        partition.reduce((acc, subInputs) => acc(...subInputs), curried),
        fn(...inputs)
      )
    }
  }
)

testProp(
  `curry does not curry the given function if its length is less than or equal to zero`,
  [fc.func(fc.anything()), fc.nat().map(n => -n)],
  (t, fn, length) => {
    fn = functionWithLength(fn, length)
    t.is(curry(fn), fn)
  }
)

testProp(`curry is idempotent`, [functionAndInputArb()], (t, [fn, inputs]) => {
  const curried = curry(fn)
  const doubleCurried = curry(curried)

  t.deepEqual(curried(...inputs), doubleCurried(...inputs))
})

test(`curry concrete example`, t => {
  const fn = (a, b, c) => a + b + c
  const result = fn(1, 2, 3)

  const curried = curry(fn)

  t.is(curried(1, 2, 3), result)
  t.is(curried(1)(2, 3), result)
  t.is(curried(1, 2)(3), result)
  t.is(curried(1)(2)(3), result)
})
