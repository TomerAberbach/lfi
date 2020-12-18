import { empty } from '../../src/shared/empty.js'
import test from 'ava'

test(`the empty iterable is empty`, t => {
  const count = [...empty].length

  t.is(count, 0)
})
