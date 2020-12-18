import { empty } from './empty.js'
import test from 'ava'

test(`the empty iterable is empty`, t => {
  let count = 0

  // eslint-disable-next-line no-unused-vars
  for (const value of empty) {
    count++
  }

  t.is(count, 0)
})
