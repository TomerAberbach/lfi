import { fc, testProp } from 'ava-fast-check'
import { fnArb } from '../helpers.js'
import { functionWithLength } from '../../src/shared/function-with-length.js'
import test from 'ava'

testProp(
  `functionWithLength returns the given function`,
  [fnArb(), fc.nat()],
  (t, fn, length) => {
    const returned = functionWithLength(fn, length)

    t.is(returned, fn)
  }
)

testProp(
  `functionWithLength sets the length of the given function to the given length`,
  [fnArb(), fc.nat()],
  (t, fn, length) => {
    const returned = functionWithLength(fn, length)

    t.is(returned.length, length)
  }
)

test(`functionWithLength concrete example`, t => {
  const fn = (...args) => args[0] + args[1] + args[2]

  const returned = functionWithLength(fn, 3)

  t.is(returned.length, 3)
})
