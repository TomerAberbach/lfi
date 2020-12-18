import { curry, partitions } from '../../src/index.js'
import { fc, testProp } from 'ava-fast-check'
import { fnArb } from '../helpers.js'
import { functionWithLength } from '../../src/shared/function-with-length.js'
import test from 'ava'

const functionAndInputArb = () =>
  fc
    .array(fc.anything())
    .filter(array => array.length > 0)
    .chain(array =>
      fc.tuple(fnArb({ length: array.length }), fc.clonedConstant(array))
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

testProp(
  `curry curries the given function if its length is greater than zero`,
  [functionAndInputArb()],
  (t, [fn, inputs]) => {
    t.plan(2 ** (inputs.length - 1))

    const curried = curry(fn)

    for (const partition of partitions(inputs)) {
      const returned = partition.reduce(
        (acc, subInputs) => acc(...subInputs),
        curried
      )

      t.deepEqual(returned, fn(...inputs))
    }
  }
)

testProp(
  `curry does not curry the given function if its length is less than or equal to zero`,
  [fnArb(), fc.nat().map(n => -n)],
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
