/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AsyncIterator, Iterator } from '../../src/shared/iterator.js'
import { getAsyncIterableArb, getIterableArb } from '../helpers.js'
import { testProp } from 'ava-fast-check'
import test from 'ava'

testProp(
  `Iterator iterates like a native iterator`,
  [getIterableArb()],
  (t, iterable) => {
    const iterator = Iterator.fromIterable(iterable)
    const nativeIterator = iterable[Symbol.iterator]()

    while (iterator.hasNext()) {
      const value = iterator.getNext()
      const result = nativeIterator.next()

      t.false(result.done)
      t.is(value, result.value)
    }

    t.false(iterator.hasNext())
    t.true(nativeIterator.next().done)
  }
)

testProp(
  `Iterator#getNext throws an error when the iterator has been exhausted`,
  [getIterableArb()],
  (t, iterable) => {
    const iterator = Iterator.fromIterable(iterable)

    while (iterator.hasNext()) {
      iterator.getNext()
    }

    t.throws(() => iterator.getNext(), {
      instanceOf: Error,
      message: `Iterator doesn't have next`
    })
  }
)

test(`Iterator concrete example`, t => {
  const values = [1, 2, 3, 4]

  const iterator = Iterator.fromIterable(values)

  t.true(iterator.hasNext())
  t.is(iterator.getNext(), 1)

  t.true(iterator.hasNext())
  t.is(iterator.getNext(), 2)

  t.true(iterator.hasNext())
  t.is(iterator.getNext(), 3)

  t.true(iterator.hasNext())
  t.is(iterator.getNext(), 4)

  t.throws(() => iterator.getNext(), {
    instanceOf: Error,
    message: `Iterator doesn't have next`
  })
})

testProp(
  `AsyncIterator iterates like a native async iterator`,
  [getAsyncIterableArb()],
  async (t, iterable) => {
    const asyncIterator = AsyncIterator.fromIterable(iterable)
    const nativeAsyncIterator = iterable[Symbol.asyncIterator]()

    while (await asyncIterator.hasNext()) {
      const value = await asyncIterator.getNext()
      const result = await nativeAsyncIterator.next()

      t.false(result.done)
      t.is(value, result.value)
    }

    t.false(await asyncIterator.hasNext())
    t.true((await nativeAsyncIterator.next()).done)
  }
)

testProp(
  `AsyncIterator#getNext throws an error when the async iterator has been exhausted`,
  [getAsyncIterableArb()],
  async (t, iterable) => {
    const iterator = AsyncIterator.fromIterable(iterable)

    while (await iterator.hasNext()) {
      await iterator.getNext()
    }

    await t.throwsAsync(() => iterator.getNext(), {
      instanceOf: Error,
      message: `AsyncIterator doesn't have next`
    })
  }
)

test(`AsyncIterator concrete example`, async t => {
  const values = [1, 2, 3, 4]

  const asyncIterator = AsyncIterator.fromIterable(
    (async function* () {
      for (const value of values) {
        yield value
      }
    })()
  )

  t.true(await asyncIterator.hasNext())
  t.is(await asyncIterator.getNext(), 1)

  t.true(await asyncIterator.hasNext())
  t.is(await asyncIterator.getNext(), 2)

  t.true(await asyncIterator.hasNext())
  t.is(await asyncIterator.getNext(), 3)

  t.true(await asyncIterator.hasNext())
  t.is(await asyncIterator.getNext(), 4)

  await t.throwsAsync(() => asyncIterator.getNext(), {
    instanceOf: Error,
    message: `AsyncIterator doesn't have next`
  })
})
