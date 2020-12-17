import test from 'ava'
import { testProp, fc } from 'ava-fast-check'
import { functionWithLength } from './function-with-length.js'

testProp(
  `functionWithLength mutates the given function`,
  [
    fc.func(fc.anything()).chain(fn =>
      fc.tuple(
        fc.clonedConstant(fn),
        fc.nat().filter(length => length !== fn.length)
      )
    )
  ],
  (t, [fn, length]) => {
    const originalLength = fn.length

    t.is(functionWithLength(fn, length), fn)
    t.not(fn.length, originalLength)
  }
)

testProp(
  `functionWithLength sets the length of the given function to the given length`,
  [fc.func(fc.anything()), fc.nat()],
  (t, fn, length) => {
    t.is(functionWithLength(fn, length).length, length)
  }
)

test(`functionWithLength concrete example`, t => {
  const fn = (...args) => args[0] + args[1] + args[2]
  t.is(functionWithLength(fn, 3).length, 3)
})
